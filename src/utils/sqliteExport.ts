import { TransactionReceipt, SparePart, Customer, ConsignmentStock, CollabStore } from '../types';

export const generateSQLiteDump = (data: {
  receipts: TransactionReceipt[];
  parts: SparePart[];
  customers: Customer[];
  consignments: ConsignmentStock[];
  stores: CollabStore[];
}): string => {
  const timestamp = new Date().toISOString();

  let sql = `-- ========================================================\n`;
  sql += `-- Usaha Qu 1.0 - SQLite Local Offline-First Database Dump\n`;
  sql += `-- Export Timestamp: ${timestamp}\n`;
  sql += `-- Target: SQLite 3 / Android SQLite DB Storage\n`;
  sql += `-- ========================================================\n\n`;

  sql += `PRAGMA foreign_keys = ON;\nBEGIN TRANSACTION;\n\n`;

  // 1. Stores Table
  sql += `-- Table: collab_stores\n`;
  sql += `CREATE TABLE IF NOT EXISTS collab_stores (\n`;
  sql += `  id TEXT PRIMARY KEY,\n`;
  sql += `  name TEXT NOT NULL,\n`;
  sql += `  owner_name TEXT,\n`;
  sql += `  phone TEXT,\n`;
  sql += `  address TEXT,\n`;
  sql += `  commission_rate REAL,\n`;
  sql += `  total_sold INTEGER DEFAULT 0,\n`;
  sql += `  total_returned INTEGER DEFAULT 0,\n`;
  sql += `  total_restocked INTEGER DEFAULT 0,\n`;
  sql += `  joined_date TEXT\n`;
  sql += `);\n\n`;

  for (const s of data.stores) {
    sql += `INSERT INTO collab_stores VALUES ('${s.id}', '${escapeSQL(s.name)}', '${escapeSQL(s.ownerName)}', '${s.phone}', '${escapeSQL(s.address)}', ${s.commissionRate}, ${s.totalSold}, ${s.totalReturned}, ${s.totalRestocked}, '${s.joinedDate}');\n`;
  }
  sql += `\n`;

  // 2. Consignment Stocks Table
  sql += `-- Table: consignment_stocks\n`;
  sql += `CREATE TABLE IF NOT EXISTS consignment_stocks (\n`;
  sql += `  id TEXT PRIMARY KEY,\n`;
  sql += `  store_id TEXT,\n`;
  sql += `  store_name TEXT,\n`;
  sql += `  product_name TEXT NOT NULL,\n`;
  sql += `  consigned_qty INTEGER,\n`;
  sql += `  sold_qty INTEGER,\n`;
  sql += `  returned_qty INTEGER,\n`;
  sql += `  remaining_qty INTEGER,\n`;
  sql += `  price_per_unit REAL,\n`;
  sql += `  consigned_date TEXT,\n`;
  sql += `  status TEXT\n`;
  sql += `);\n\n`;

  for (const c of data.consignments) {
    sql += `INSERT INTO consignment_stocks VALUES ('${c.id}', '${c.storeId}', '${escapeSQL(c.storeName)}', '${escapeSQL(c.productName)}', ${c.consignedQty}, ${c.soldQty}, ${c.returnedQty}, ${c.remainingQty}, ${c.pricePerUnit}, '${c.consignedDate}', '${c.status}');\n`;
  }
  sql += `\n`;

  // 3. Transactions Table
  sql += `-- Table: transactions\n`;
  sql += `CREATE TABLE IF NOT EXISTS transactions (\n`;
  sql += `  id TEXT PRIMARY KEY,\n`;
  sql += `  receipt_number TEXT NOT NULL,\n`;
  sql += `  date TEXT,\n`;
  sql += `  customer_name TEXT,\n`;
  sql += `  subtotal REAL,\n`;
  sql += `  discount REAL,\n`;
  sql += `  total REAL,\n`;
  sql += `  payment_method TEXT,\n`;
  sql += `  business_type TEXT\n`;
  sql += `);\n\n`;

  for (const r of data.receipts) {
    sql += `INSERT INTO transactions VALUES ('${r.id}', '${r.receiptNumber}', '${r.date}', '${escapeSQL(r.customerName)}', ${r.subtotal}, ${r.discount}, ${r.total}, '${r.paymentMethod}', '${r.businessType || 'general'}');\n`;
  }
  sql += `\n`;

  sql += `COMMIT;\n`;
  sql += `-- Export completed successfully.\n`;

  return sql;
};

const escapeSQL = (str: string): string => {
  if (!str) return '';
  return str.replace(/'/g, "''");
};

export const downloadSQLiteFile = (content: string, filename: string = 'usahaqu_backup_sqlite.sql') => {
  const blob = new Blob([content], { type: 'application/sql;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
