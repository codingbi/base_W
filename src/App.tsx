import React from 'react';
import { useAppStore } from './store';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PortalPage from './pages/PortalPage';
import BudgetManagementPage from './pages/BudgetManagementPage';
import ExpenseManagementPage from './pages/ExpenseManagementPage';
import ProjectManagementPage from './pages/ProjectManagementPage';
import PlaceholderPage from './components/PlaceholderPage';

export default function App() {
  const { activePage, sidebarOpen } = useAppStore();

  const renderPage = () => {
    switch (activePage) {
      case 'portal':
        return <PortalPage />;
      case 'internal-control':
        return (
          <PlaceholderPage
            title="单位层面内控"
            description="此模块将提供组织架构管理、内控流程设计、沟通协调机制等功能，帮助单位建立全面的内部控制体系。"
          />
        );
      case 'risk-management':
        return (
          <PlaceholderPage
            title="风险管理"
            description="此模块将提供风险识别、风险评估、风险应对策略和风险监控等功能，帮助单位有效管理各类风险。"
          />
        );
      case 'budget-management':
        return <BudgetManagementPage />;
      case 'income-management':
        return (
          <PlaceholderPage
            title="收入管理"
            description="此模块将提供收入登记、收入确认、收入分析和票据管理等功能，实现对单位收入的全面管理。"
          />
        );
      case 'expense-management':
        return <ExpenseManagementPage />;
      case 'procurement-management':
        return (
          <PlaceholderPage
            title="采购管理"
            description="此模块将提供采购预算、采购计划、采购申请和采购执行等功能，实现对政府采购业务的规范管理。"
          />
        );
      case 'asset-management':
        return (
          <PlaceholderPage
            title="资产管理"
            description="此模块将提供资产台账、资产配置、资产使用和资产处置等功能，实现对行政事业资产的全生命周期管理。"
          />
        );
      case 'project-management':
        return <ProjectManagementPage />;
      case 'performance-management':
        return (
          <PlaceholderPage
            title="绩效管理"
            description="此模块将提供绩效指标、绩效评估、绩效报告和绩效分析等功能，帮助单位提升工作效能。"
          />
        );
      case 'contract-management':
        return (
          <PlaceholderPage
            title="合同管理"
            description="此模块将提供合同签订、合同履行、合同变更和合同归档等功能，加强合同业务的法律风险防范。"
          />
        );
      case 'bi-reports':
        return (
          <PlaceholderPage
            title="BI报表决策分析"
            description="此模块将提供数据大屏、多维分析、报表定制和数据导出等功能，为决策提供数据支持。"
          />
        );
      case 'mobile-app':
        return (
          <PlaceholderPage
            title="内控移动应用"
            description="此模块将提供移动填单、移动审批、项目展示和预算分析等功能，支持随时随地办公。"
          />
        );
      default:
        return <PortalPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
