import React from 'react';
import { useAppStore } from '../store';
import {
  LayoutDashboard,
  Shield,
  AlertTriangle,
  Calculator,
  Wallet,
  CreditCard,
  ShoppingCart,
  FileText,
  TrendingUp,
  Building2,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Activity,
} from 'lucide-react';

const menuItems = [
  { id: 'portal', label: '工作门户', icon: LayoutDashboard },
  { id: 'internal-control', label: '内控评价', icon: Shield },
  { id: 'risk-management', label: '风险管理', icon: AlertTriangle },
  { id: 'budget-management', label: '预算管理', icon: Calculator },
  { id: 'income-management', label: '收支管理', icon: Wallet },
  { id: 'expense-management', label: '费用报销', icon: CreditCard },
  { id: 'procurement-management', label: '采购管理', icon: ShoppingCart },
  { id: 'project-management', label: '项目管理', icon: FileText },
  { id: 'contract-management', label: '合同管理', icon: FileText },
  { id: 'asset-management', label: '资产管理', icon: Building2 },
  { id: 'performance-management', label: '绩效评价', icon: TrendingUp },
  { id: 'bi-reports', label: 'BI报表', icon: Activity },
  { id: 'mobile-app', label: '移动应用', icon: Smartphone },
];

export default function Sidebar() {
  const { activePage, setActivePage, sidebarOpen, toggleSidebar } = useAppStore();

  return (
    <div
      className={`${
        sidebarOpen ? 'w-64' : 'w-20'
      } bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white transition-all duration-300 ease-in-out relative flex flex-col`}
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse-glow">
            <Shield className="w-6 h-6 text-white" />
          </div>
          {sidebarOpen && (
            <div className="flex flex-col">
              <span className="font-bold text-lg bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                内控系统
              </span>
              <span className="text-xs text-slate-400">Internal Control</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 scrollbar-thin">
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur-lg opacity-30" />
                )}
                
                <div className={`p-2 rounded-lg ${
                  isActive
                    ? 'bg-white/20'
                    : 'bg-slate-700 group-hover:bg-slate-600'
                } transition-all duration-300`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
                </div>
                
                {sidebarOpen && (
                  <span className="font-medium flex-1 text-left">{item.label}</span>
                )}
                
                {!sidebarOpen && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap shadow-xl z-50">
                    {item.label}
                    <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-8 border-transparent border-r-slate-800" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Collapse Button */}
      <div className="p-4 border-t border-slate-700/50">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-800/50 hover:bg-slate-700 rounded-xl transition-all duration-300 group"
        >
          {sidebarOpen ? (
            <>
              <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
              <span className="text-sm text-slate-400 group-hover:text-white transition-colors">收起菜单</span>
            </>
          ) : (
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
          )}
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-20 right-0 w-32 h-32 bg-gradient-to-t from-indigo-600/20 to-transparent rounded-full blur-2xl" />
      <div className="absolute top-32 left-0 w-24 h-24 bg-gradient-to-b from-purple-600/20 to-transparent rounded-full blur-2xl" />
    </div>
  );
}
