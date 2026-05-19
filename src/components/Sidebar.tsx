import React from 'react';
import {
  LayoutDashboard,
  Shield,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Box,
  Briefcase,
  Award,
  FileText,
  BarChart3,
  Smartphone,
} from 'lucide-react';
import { useAppStore } from '../store';
import { cn } from '../lib/utils';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  { id: 'portal', label: '系统门户', icon: <LayoutDashboard size={20} /> },
  { id: 'internal-control', label: '单位层面内控', icon: <Shield size={20} /> },
  { id: 'risk-management', label: '风险管理', icon: <AlertTriangle size={20} /> },
  { id: 'budget-management', label: '预算管理', icon: <DollarSign size={20} /> },
  { id: 'income-management', label: '收入管理', icon: <TrendingUp size={20} /> },
  { id: 'expense-management', label: '支出管理', icon: <DollarSign size={20} /> },
  { id: 'procurement-management', label: '采购管理', icon: <ShoppingCart size={20} /> },
  { id: 'asset-management', label: '资产管理', icon: <Box size={20} /> },
  { id: 'project-management', label: '项目管理', icon: <Briefcase size={20} /> },
  { id: 'performance-management', label: '绩效管理', icon: <Award size={20} /> },
  { id: 'contract-management', label: '合同管理', icon: <FileText size={20} /> },
  { id: 'bi-reports', label: 'BI报表分析', icon: <BarChart3 size={20} /> },
  { id: 'mobile-app', label: '内控移动应用', icon: <Smartphone size={20} /> },
];

export default function Sidebar() {
  const { activePage, setActivePage, sidebarOpen } = useAppStore();

  return (
    <aside
      className={cn(
        'bg-slate-900 text-white transition-all duration-300 flex flex-col',
        sidebarOpen ? 'w-64' : 'w-20'
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Shield size={20} />
          </div>
          {sidebarOpen && (
            <span className="font-bold text-lg">内控系统</span>
          )}
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 py-4 space-y-1 px-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={cn(
                'w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200',
                activePage === item.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              )}
          >
            {item.icon}
            {sidebarOpen && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}
