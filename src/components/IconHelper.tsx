import React from 'react';
import {
  Wrench,
  Calculator,
  Users,
  Package,
  UserCheck,
  BarChart3,
  ListOrdered,
  ClipboardList,
  Cog,
  CheckCircle2,
  Receipt,
  History,
  QrCode,
  Contact,
  MessageSquareShare,
  Sparkles,
  Boxes,
  AlertTriangle,
  PlusCircle,
  ShieldCheck,
  Coins,
  TrendingUp,
  FileSpreadsheet,
  HelpCircle,
  LayoutGrid,
  Flame,
  Utensils,
  Barcode,
  Store,
  ShoppingBag,
  Building2,
  SlidersHorizontal,
  LucideProps
} from 'lucide-react';

interface IconHelperProps extends LucideProps {
  name: string;
}

export const IconHelper: React.FC<IconHelperProps> = ({ name, ...props }) => {
  switch (name) {
    case 'Wrench':
      return <Wrench {...props} />;
    case 'Calculator':
      return <Calculator {...props} />;
    case 'Users':
      return <Users {...props} />;
    case 'Package':
      return <Package {...props} />;
    case 'UserCheck':
      return <UserCheck {...props} />;
    case 'BarChart3':
      return <BarChart3 {...props} />;
    case 'ListOrdered':
      return <ListOrdered {...props} />;
    case 'ClipboardList':
      return <ClipboardList {...props} />;
    case 'Cog':
      return <Cog {...props} />;
    case 'CheckCircle2':
      return <CheckCircle2 {...props} />;
    case 'Receipt':
      return <Receipt {...props} />;
    case 'History':
      return <History {...props} />;
    case 'QrCode':
      return <QrCode {...props} />;
    case 'Contact2':
      return <Contact {...props} />;
    case 'MessageSquareShare':
      return <MessageSquareShare {...props} />;
    case 'Sparkles':
      return <Sparkles {...props} />;
    case 'Boxes':
      return <Boxes {...props} />;
    case 'AlertTriangle':
      return <AlertTriangle {...props} />;
    case 'PlusCircle':
      return <PlusCircle {...props} />;
    case 'ShieldCheck':
      return <ShieldCheck {...props} />;
    case 'Coins':
      return <Coins {...props} />;
    case 'TrendingUp':
      return <TrendingUp {...props} />;
    case 'FileSpreadsheet':
      return <FileSpreadsheet {...props} />;
    case 'LayoutGrid':
      return <LayoutGrid {...props} />;
    case 'Flame':
      return <Flame {...props} />;
    case 'Utensils':
      return <Utensils {...props} />;
    case 'Barcode':
      return <Barcode {...props} />;
    case 'Store':
      return <Store {...props} />;
    case 'ShoppingBag':
      return <ShoppingBag {...props} />;
    case 'Building2':
      return <Building2 {...props} />;
    case 'SlidersHorizontal':
      return <SlidersHorizontal {...props} />;
    default:
      return <HelpCircle {...props} />;
  }
};
