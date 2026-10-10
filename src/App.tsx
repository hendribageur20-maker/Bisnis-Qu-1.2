/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AndroidFrame } from './components/AndroidFrame';
import { HomeDashboard } from './components/HomeDashboard';
import { SubMenuPage } from './components/SubMenuPage';
import { QueueModule } from './components/modules/QueueModule';
import { ServiceModule } from './components/modules/ServiceModule';
import { CashierModule } from './components/modules/CashierModule';
import { InventoryModule } from './components/modules/InventoryModule';
import { MarketingModule } from './components/modules/MarketingModule';
import { MechanicModule } from './components/modules/MechanicModule';
import { ReportModule } from './components/modules/ReportModule';
import { RestoModule } from './components/modules/RestoModule';
import { RetailModule } from './components/modules/RetailModule';
import { CollabQuModule } from './components/modules/CollabQuModule';
import { SettingsModule } from './components/modules/SettingsModule';
import { StorageCleanerModal } from './components/modules/StorageCleanerModal';
import { AuthCorporateModal } from './components/modules/AuthCorporateModal';
import { QuickPluginSwitcherModal } from './components/QuickPluginSwitcherModal';
import { ReceiptModal } from './components/ReceiptModal';
import { NotificationModal } from './components/NotificationModal';

import { 
  ViewMode, 
  BusinessType, 
  ThemeType,
  UserAccount,
  MenuCategoryItem,
  QueueItem, 
  ServiceWorkOrder, 
  SparePart, 
  Customer, 
  TransactionReceipt,
  RestaurantTable,
  MenuItem,
  RetailProduct,
  CollabStore,
  ConsignmentStock,
  TableStatus,
  TableOrderItem,
  CartItem
} from './types';

import { THEME_PALETTES } from './utils/themeConfig';
import { generateSQLiteDump, downloadSQLiteFile } from './utils/sqliteExport';

import { 
  BUSINESS_CONFIGS,
  MODULES_BY_BUSINESS,
  SUB_MENUS_MAP, 
  INITIAL_QUEUES, 
  INITIAL_ORDERS, 
  INITIAL_PARTS, 
  INITIAL_CUSTOMERS, 
  INITIAL_MECHANICS, 
  INITIAL_RECEIPTS,
  INITIAL_TABLES,
  INITIAL_MENU_ITEMS,
  INITIAL_RETAIL_PRODUCTS,
  INITIAL_COLLAB_STORES,
  INITIAL_CONSIGNMENT_STOCKS
} from './data/initialData';

export default function App() {
  // Business Plugin Type State with LocalStorage Persistence
  const [businessType, setBusinessType] = useState<BusinessType>(() => {
    const saved = localStorage.getItem('usahaqu_business_type');
    if (saved === 'resto' || saved === 'ritel' || saved === 'bengkel' || saved === 'collabqu') {
      return saved;
    }
    return 'bengkel';
  });

  // Theme State (6 variations)
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(() => {
    const saved = localStorage.getItem('usahaqu_theme');
    if (saved && THEME_PALETTES[saved as ThemeType]) {
      return saved as ThemeType;
    }
    return 'zamrud';
  });

  // User Account & Corporate Tier State
  const [userAccount, setUserAccount] = useState<UserAccount>({
    isLoggedIn: false,
    email: 'hendri.bageur20@gmail.com',
    name: 'Bpk. Hendri',
    tier: 'Freemium',
    corporateName: 'PT Usaha Qu Mandiri'
  });

  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedSubMenuKey, setSelectedSubMenuKey] = useState<string>('servis');
  const [historyStack, setHistoryStack] = useState<ViewMode[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [showPluginSwitcher, setShowPluginSwitcher] = useState(false);
  const [showStorageCleaner, setShowStorageCleaner] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<TransactionReceipt | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  // Operational states (Bengkel)
  const [queues, setQueues] = useState<QueueItem[]>(INITIAL_QUEUES);
  const [orders, setOrders] = useState<ServiceWorkOrder[]>(INITIAL_ORDERS);
  const [parts, setParts] = useState<SparePart[]>(INITIAL_PARTS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [mechanics] = useState(INITIAL_MECHANICS);
  const [receipts, setReceipts] = useState<TransactionReceipt[]>(INITIAL_RECEIPTS);

  // Operational states (Resto)
  const [tables, setTables] = useState<RestaurantTable[]>(INITIAL_TABLES);
  const [menuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);

  // Operational states (Retail)
  const [retailProducts, setRetailProducts] = useState<RetailProduct[]>(INITIAL_RETAIL_PRODUCTS);

  // Operational states (CollabQu)
  const [collabStores, setCollabStores] = useState<CollabStore[]>(INITIAL_COLLAB_STORES);
  const [consignmentStocks, setConsignmentStocks] = useState<ConsignmentStock[]>(INITIAL_CONSIGNMENT_STOCKS);

  // Business Type Switcher
  const handleSelectBusinessType = (type: BusinessType) => {
    setBusinessType(type);
    localStorage.setItem('usahaqu_business_type', type);
    setCurrentView('home');
    setHistoryStack([]);
  };

  // Theme Switcher
  const handleSelectTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);
    localStorage.setItem('usahaqu_theme', theme);
  };

  // Navigation handlers
  const navigateTo = (view: ViewMode) => {
    setHistoryStack((prev) => [...prev, currentView]);
    setCurrentView(view);
  };

  const handleBack = () => {
    if (historyStack.length > 0) {
      const prev = historyStack[historyStack.length - 1];
      setHistoryStack((s) => s.slice(0, -1));
      setCurrentView(prev);
    } else {
      setCurrentView('home');
    }
  };

  const handleSelectCategory = (cat: MenuCategoryItem) => {
    if (cat.targetView && cat.targetView !== 'submenu') {
      navigateTo(cat.targetView);
    } else {
      if (SUB_MENUS_MAP[cat.id]) {
        setSelectedSubMenuKey(cat.id);
        navigateTo('submenu');
      } else if (businessType === 'bengkel') {
        setSelectedSubMenuKey('servis');
        navigateTo('submenu');
      } else if (businessType === 'resto') {
        setSelectedSubMenuKey('meja');
        navigateTo('submenu');
      } else if (businessType === 'collabqu') {
        navigateTo('collabqu');
      } else {
        setSelectedSubMenuKey('scan_pos');
        navigateTo('submenu');
      }
    }
  };

  // Queue Operations
  const handleAddQueue = (newQ: Omit<QueueItem, 'id' | 'number' | 'time'>) => {
    const nextNumIndex = queues.length + 1;
    const prefix = newQ.vehicleType.toLowerCase().includes('motor') ? 'A' : 'B';
    const number = `${prefix}-${String(nextNumIndex).padStart(2, '0')}`;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const created: QueueItem = {
      ...newQ,
      id: `Q-${Date.now()}`,
      number,
      time
    };
    setQueues((prev) => [created, ...prev]);
  };

  const handleUpdateQueueStatus = (id: string, status: QueueItem['status']) => {
    setQueues((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
  };

  // Order Operations
  const handleAddOrder = (newOrder: Omit<ServiceWorkOrder, 'id' | 'spkNumber' | 'createdAt'>) => {
    const spkNumber = `SPK #${String(orders.length + 1).padStart(3, '0')}`;
    const created: ServiceWorkOrder = {
      ...newOrder,
      id: `SPK-${Date.now()}`,
      spkNumber,
      createdAt: `${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`
    };
    setOrders((prev) => [created, ...prev]);
  };

  const handleUpdateOrderStatus = (orderId: string, status: ServiceWorkOrder['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
  };

  // Resto Table Operations
  const handleUpdateTableStatus = (tableId: string, status: TableStatus) => {
    setTables(prev => prev.map(t => t.id === tableId ? { ...t, status } : t));
  };

  const handleAddOrderToTable = (tableId: string, item: TableOrderItem) => {
    setTables(prev => prev.map(t => {
      if (t.id === tableId) {
        const updatedItems = [...t.items, item];
        const newTotal = updatedItems.reduce((sum, i) => sum + i.price * i.qty, 0);
        return {
          ...t,
          items: updatedItems,
          billTotal: newTotal,
          status: t.status === 'Kosong' ? 'Terisi' : t.status
        };
      }
      return t;
    }));
  };

  const handleClearTable = (tableId: string) => {
    setTables(prev => prev.map(t => {
      if (t.id === tableId) {
        return {
          ...t,
          items: [],
          billTotal: 0,
          status: 'Kosong',
          customerName: undefined
        };
      }
      return t;
    }));
  };

  // CollabQu Operations
  const handleAddStore = (newStore: Omit<CollabStore, 'id' | 'totalSold' | 'totalReturned' | 'totalRestocked' | 'joinedDate'>) => {
    const created: CollabStore = {
      ...newStore,
      id: `store-${Date.now()}`,
      totalSold: 0,
      totalReturned: 0,
      totalRestocked: 0,
      joinedDate: 'Hari ini'
    };
    setCollabStores(prev => [created, ...prev]);
  };

  const handleAddConsignmentStock = (newStock: Omit<ConsignmentStock, 'id' | 'soldQty' | 'returnedQty' | 'remainingQty' | 'consignedDate' | 'status'>) => {
    const created: ConsignmentStock = {
      ...newStock,
      id: `cstock-${Date.now()}`,
      soldQty: 0,
      returnedQty: 0,
      remainingQty: newStock.consignedQty,
      consignedDate: 'Hari ini',
      status: 'Titip Aktif'
    };
    setConsignmentStocks(prev => [created, ...prev]);
  };

  const handleUpdateConsignmentStatus = (stockId: string, status: ConsignmentStock['status']) => {
    setConsignmentStocks(prev => prev.map(s => s.id === stockId ? { ...s, status } : s));
  };

  // Inventory Operations
  const handleRestock = (partId: string, amount: number) => {
    setParts((prev) =>
      prev.map((p) => (p.id === partId ? { ...p, stock: p.stock + amount } : p))
    );
  };

  const handleAddPart = (newPart: Omit<SparePart, 'id'>) => {
    setParts((prev) => [{ ...newPart, id: `P-${Date.now()}` }, ...prev]);
  };

  // Customer Operations
  const handleAddCustomer = (newCustomer: Omit<Customer, 'id' | 'points' | 'tier'>) => {
    setCustomers((prev) => [
      {
        ...newCustomer,
        id: `C-${Date.now()}`,
        points: 50,
        tier: 'Bronze'
      },
      ...prev
    ]);
  };

  // Transaction Operations
  const handleFinishTransaction = (receipt: TransactionReceipt) => {
    const enriched = { ...receipt, businessType };
    setReceipts((prev) => [enriched, ...prev]);
    setActiveReceipt(enriched);
  };

  // Auth & Cloud Sync Handlers
  const handleLoginGoogle = (email: string) => {
    setUserAccount(prev => ({
      ...prev,
      isLoggedIn: true,
      email,
      name: email.split('@')[0].replace('.', ' ').toUpperCase()
    }));
  };

  const handleUpgradeCorporate = () => {
    setUserAccount(prev => ({
      ...prev,
      tier: 'Corporate',
      isLoggedIn: true,
      corporateName: 'PT Usaha Qu Multi-Cabang'
    }));
  };

  const handleDowngradeFreemium = () => {
    setUserAccount(prev => ({
      ...prev,
      tier: 'Freemium',
      corporateName: undefined
    }));
  };

  const handleExportSQLite = () => {
    const dump = generateSQLiteDump({
      receipts,
      parts,
      customers,
      consignments: consignmentStocks,
      stores: collabStores
    });
    downloadSQLiteFile(dump, `usahaqu_offline_${Date.now()}.sql`);
  };

  const handleResetData = () => {
    setQueues(INITIAL_QUEUES);
    setOrders(INITIAL_ORDERS);
    setParts(INITIAL_PARTS);
    setTables(INITIAL_TABLES);
    setRetailProducts(INITIAL_RETAIL_PRODUCTS);
    setCollabStores(INITIAL_COLLAB_STORES);
    setConsignmentStocks(INITIAL_CONSIGNMENT_STOCKS);
    setCustomers(INITIAL_CUSTOMERS);
    setReceipts(INITIAL_RECEIPTS);
    setCurrentView('home');
  };

  const activeThemePalette = THEME_PALETTES[currentTheme] || THEME_PALETTES.zamrud;
  const activeQueuesCount = queues.filter((q) => q.status === 'Menunggu' || q.status === 'Dipanggil').length;

  return (
    <AndroidFrame
      currentView={currentView}
      businessType={businessType}
      theme={activeThemePalette}
      onNavigate={(view) => {
        navigateTo(view);
      }}
      onBack={handleBack}
      canGoBack={historyStack.length > 0 || currentView !== 'home'}
      activeBadgeCount={activeQueuesCount}
    >
      {/* View Switcher */}
      {currentView === 'home' && (
        <HomeDashboard
          businessType={businessType}
          businessConfig={BUSINESS_CONFIGS[businessType]}
          theme={activeThemePalette}
          userAccount={userAccount}
          categories={MODULES_BY_BUSINESS[businessType]}
          onSelectCategory={handleSelectCategory}
          onOpenPluginSwitcher={() => setShowPluginSwitcher(true)}
          onOpenAuthModal={() => setShowAuthModal(true)}
          onOpenStorageCleaner={() => setShowStorageCleaner(true)}
          queues={queues}
          onCallQueue={(id) => handleUpdateQueueStatus(id, 'Dipanggil')}
          tables={tables}
          onNavigateToTables={() => navigateTo('tables')}
          retailProducts={retailProducts}
          onNavigateToRetail={() => navigateTo('retail_pos')}
          collabStores={collabStores}
          onNavigateToCollab={() => navigateTo('collabqu')}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      )}

      {currentView === 'submenu' && (
        <SubMenuPage
          data={SUB_MENUS_MAP[selectedSubMenuKey] || SUB_MENUS_MAP.servis}
          onBack={handleBack}
          onSelectSubItem={(target) => navigateTo(target)}
        />
      )}

      {/* Bengkel specific modules */}
      {currentView === 'queue' && (
        <QueueModule
          queues={queues}
          onBack={handleBack}
          onAddQueue={handleAddQueue}
          onUpdateStatus={handleUpdateQueueStatus}
        />
      )}

      {(currentView === 'service_list' || currentView === 'service_process') && (
        <ServiceModule
          orders={orders}
          onBack={handleBack}
          onUpdateStatus={handleUpdateOrderStatus}
          onAddOrder={handleAddOrder}
          onSendToCashier={() => navigateTo('cashier')}
        />
      )}

      {currentView === 'inventory' && (
        <InventoryModule
          parts={parts}
          onBack={handleBack}
          onRestock={handleRestock}
          onAddPart={handleAddPart}
        />
      )}

      {currentView === 'mechanic' && (
        <MechanicModule
          mechanics={mechanics}
          onBack={handleBack}
        />
      )}

      {/* Resto specific modules */}
      {(currentView === 'tables' || currentView === 'kitchen' || currentView === 'menu_dishes') && (
        <RestoModule
          tables={tables}
          menuItems={menuItems}
          onBack={handleBack}
          onUpdateTableStatus={handleUpdateTableStatus}
          onAddOrderToTable={handleAddOrderToTable}
          onClearTable={handleClearTable}
          onSendToCashier={() => navigateTo('cashier')}
        />
      )}

      {/* Retail specific modules */}
      {(currentView === 'retail_pos' || currentView === 'retail_aisles' || currentView === 'retail_stock') && (
        <RetailModule
          products={retailProducts}
          onBack={handleBack}
          onSendToCashierWithCart={() => navigateTo('cashier')}
        />
      )}

      {/* CollabQu Module (Konsinyasi & Kemitraan) */}
      {currentView === 'collabqu' && (
        <CollabQuModule
          stores={collabStores}
          stocks={consignmentStocks}
          theme={activeThemePalette}
          onBack={handleBack}
          onAddStore={handleAddStore}
          onAddStock={handleAddConsignmentStock}
          onUpdateStockStatus={handleUpdateConsignmentStatus}
        />
      )}

      {/* Universal Managerial Modules */}
      {currentView === 'cashier' && (
        <CashierModule
          orders={orders}
          parts={parts}
          onBack={handleBack}
          onFinishTransaction={handleFinishTransaction}
        />
      )}

      {currentView === 'marketing' && (
        <MarketingModule
          customers={customers}
          onBack={handleBack}
          onAddCustomer={handleAddCustomer}
        />
      )}

      {currentView === 'report' && (
        <ReportModule
          receipts={receipts}
          onBack={handleBack}
          onViewReceipt={(r) => setActiveReceipt(r)}
        />
      )}

      {currentView === 'settings' && (
        <SettingsModule
          currentType={businessType}
          currentTheme={currentTheme}
          themePalette={activeThemePalette}
          userAccount={userAccount}
          onSelectType={handleSelectBusinessType}
          onSelectTheme={handleSelectTheme}
          onOpenStorageCleaner={() => setShowStorageCleaner(true)}
          onOpenAuthModal={() => setShowAuthModal(true)}
          onExportSQLite={handleExportSQLite}
          onBack={handleBack}
          onResetData={handleResetData}
        />
      )}

      {/* Quick Plugin Switcher Modal */}
      {showPluginSwitcher && (
        <QuickPluginSwitcherModal
          currentType={businessType}
          onSelect={handleSelectBusinessType}
          onClose={() => setShowPluginSwitcher(false)}
        />
      )}

      {/* Storage Cleaner & Camera Compressor Modal */}
      {showStorageCleaner && (
        <StorageCleanerModal
          onClose={() => setShowStorageCleaner(false)}
        />
      )}

      {/* Auth & Corporate Sync Modal */}
      {showAuthModal && (
        <AuthCorporateModal
          userAccount={userAccount}
          onLoginGoogle={handleLoginGoogle}
          onUpgradeCorporate={handleUpgradeCorporate}
          onDowngradeFreemium={handleDowngradeFreemium}
          onMergeLocalData={() => {}}
          onUseCorporateDataOnly={() => {}}
          onExportSQLite={handleExportSQLite}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      {/* Receipt Modal */}
      {activeReceipt && (
        <ReceiptModal
          receipt={activeReceipt}
          onClose={() => setActiveReceipt(null)}
        />
      )}

      {/* Notification Modal */}
      {showNotifications && (
        <NotificationModal
          onClose={() => setShowNotifications(false)}
          onNavigateToModule={(v) => {
            setShowNotifications(false);
            navigateTo(v);
          }}
        />
      )}
    </AndroidFrame>
  );
}
