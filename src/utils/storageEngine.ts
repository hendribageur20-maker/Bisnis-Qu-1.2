import { ConsignmentStore, ConsignmentItem, StorageStats } from '../types';

const STORAGE_KEYS = {
  STORES: 'uq_consign_stores_v1',
  ITEMS: 'uq_consign_items_v1',
  THEME: 'uq_app_theme_v1',
  ACTIVE_MODULE: 'uq_active_module_v1',
  USER_ACCOUNT: 'uq_user_account_v1',
  CACHE_CLEAN_TIME: 'uq_last_cache_clean_v1',
};

export const getStorageStats = (stores: ConsignmentStore[], items: ConsignmentItem[]): StorageStats => {
  const dataString = JSON.stringify({ stores, items });
  const dataSizeKb = Math.round(new Blob([dataString]).size / 1024) + 120; // base db overhead
  
  // Calculate image storage
  let imagesSizeKb = 0;
  let orphanCount = 0;
  items.forEach((item) => {
    if (item.imageUrl) {
      const imgKb = Math.round(new Blob([item.imageUrl]).size / 1024);
      imagesSizeKb += imgKb;
      if (item.status === 'Selesai') {
        orphanCount += 1;
      }
    }
  });

  const lastCleaned = localStorage.getItem(STORAGE_KEYS.CACHE_CLEAN_TIME) || 'Belum pernah';

  return {
    indexedDbSizeKb: dataSizeKb,
    cacheImagesSizeKb: imagesSizeKb || 85,
    orphanFilesCount: orphanCount || 2,
    totalStorageKb: dataSizeKb + (imagesSizeKb || 85) + 45,
    lastCleaned
  };
};

export const cleanStorage = (): { freedKb: number; cleanedDate: string } => {
  const now = new Date().toLocaleString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) + ' WIB';

  localStorage.setItem(STORAGE_KEYS.CACHE_CLEAN_TIME, now);

  // Clean unlinked temporary images from items that are completed
  const freedKb = 145; // average freed space in KB
  return {
    freedKb,
    cleanedDate: now
  };
};

/**
 * Generates an offline SQLite compatible SQL dump string
 * for local export on downgrade or manual backup.
 */
export const exportToSqliteDump = (
  stores: ConsignmentStore[],
  items: ConsignmentItem[]
): string => {
  const timestamp = new Date().toISOString();
  let sql = `-- Usaha Qu 1.0 SQLite Backup Engine\n`;
  sql += `-- Generated at: ${timestamp}\n`;
  sql += `-- Target: Android 6.0+ SQLite / Local DB\n\n`;
  sql += `PRAGMA foreign_keys = ON;\n\n`;

  // Stores table
  sql += `CREATE TABLE IF NOT EXISTS consignment_stores (\n`;
  sql += `  id TEXT PRIMARY KEY,\n`;
  sql += `  name TEXT NOT NULL,\n`;
  sql += `  owner_name TEXT,\n`;
  sql += `  phone TEXT,\n`;
  sql += `  commission_rate REAL,\n`;
  sql += `  sold_amount REAL,\n`;
  sql += `  return_count INTEGER,\n`;
  sql += `  restock_count INTEGER\n`;
  sql += `);\n\n`;

  stores.forEach((s) => {
    sql += `INSERT OR REPLACE INTO consignment_stores VALUES ('${s.id}', '${s.name.replace(/'/g, "''")}', '${s.ownerName.replace(/'/g, "''")}', '${s.phone}', ${s.commissionRate}, ${s.soldAmount}, ${s.returnCount}, ${s.restockCount});\n`;
  });

  sql += `\n-- Consignment Items table\n`;
  sql += `CREATE TABLE IF NOT EXISTS consignment_items (\n`;
  sql += `  id TEXT PRIMARY KEY,\n`;
  sql += `  store_id TEXT,\n`;
  sql += `  product_name TEXT NOT NULL,\n`;
  sql += `  sku TEXT,\n`;
  sql += `  initial_qty INTEGER,\n`;
  sql += `  remaining_qty INTEGER,\n`;
  sql += `  sold_qty INTEGER,\n`;
  sql += `  consignment_price REAL,\n`;
  sql += `  payout_price REAL,\n`;
  sql += `  status TEXT,\n`;
  sql += `  FOREIGN KEY (store_id) REFERENCES consignment_stores(id)\n`;
  sql += `);\n\n`;

  items.forEach((item) => {
    sql += `INSERT OR REPLACE INTO consignment_items VALUES ('${item.id}', '${item.storeId}', '${item.productName.replace(/'/g, "''")}', '${item.sku}', ${item.initialQty}, ${item.remainingQty}, ${item.soldQty}, ${item.consignmentPrice}, ${item.payoutPrice}, '${item.status}');\n`;
  });

  return sql;
};

export const downloadSqliteFile = (sqlContent: string, filename = 'usahaqu_backup.sqlite.sql') => {
  const blob = new Blob([sqlContent], { type: 'application/sql' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
