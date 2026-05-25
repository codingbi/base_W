import React from 'react';
import { useAppStore } from '../store';
import { Bell, User, Settings, Search, Menu } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function Header() {
  const { toggleSidebar } = useAppStore();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 flex items-center justify-between px-6 shadow-sm relative z-10">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-slate-100 rounded-lg transition-all duration-200 group"
        >
          <Menu className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
        </button>

        {/* Search Bar */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-96 pl-10 pr-3 py-2 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50 hover:bg-white transition-all duration-200"
            placeholder="搜索功能、文档或帮助..."
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2.5 hover:bg-slate-100 rounded-xl transition-all duration-200 group">
          <Bell className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-pulse" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 hover:bg-slate-100 rounded-xl transition-all duration-200 group"
        >
          <Settings className="w-5 h-5 text-slate-600 group-hover:text-slate-900 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-slate-200" />

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right">
            <div className="text-sm font-semibold text-slate-900">管理员</div>
            <div className="text-xs text-slate-500">系统管理员</div>
          </div>
          <div className="relative group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg group-hover:shadow-xl transition-all duration-200 cursor-pointer">
              管
            </div>
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    管
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">管理员</div>
                    <div className="text-sm text-slate-500">admin@company.com</div>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 transition-colors">
                  个人设置
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 transition-colors">
                  帮助文档
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors">
                  退出登录
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
