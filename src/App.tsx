import React from 'react';
import { useAppStore } from './store';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { ApiStatus } from './components/ApiStatus';
import PortalPage from './pages/PortalPage';
import BudgetManagementPage from './pages/BudgetManagementPage';
import ExpenseManagementPage from './pages/ExpenseManagementPage';
import ProjectManagementPage from './pages/ProjectManagementPage';
import PurchaseManagementPage from './pages/PurchaseManagementPage';
import ContractManagementPage from './pages/ContractManagementPage';
import PerformanceEvaluationPage from './pages/PerformanceEvaluationPage';
import IncomeExpenseManagementPage from './pages/IncomeExpenseManagementPage';
import InternalControlPage from './pages/InternalControlPage';
import RiskManagementPage from './pages/RiskManagementPage';
import AssetManagementPage from './pages/AssetManagementPage';
import BiReportsPage from './pages/BiReportsPage';
import PlaceholderPage from './components/PlaceholderPage';

export default function App() {
  const { activePage, sidebarOpen } = useAppStore();

  const renderPage = () => {
    switch (activePage) {
      case 'portal':
        return <PortalPage />;
      case 'internal-control':
        return <InternalControlPage />;
      case 'risk-management':
        return <RiskManagementPage />;
      case 'budget-management':
        return <BudgetManagementPage />;
      case 'income-management':
        return <IncomeExpenseManagementPage />;
      case 'expense-management':
        return <ExpenseManagementPage />;
      case 'procurement-management':
        return <PurchaseManagementPage />;
      case 'asset-management':
        return <AssetManagementPage />;
      case 'project-management':
        return <ProjectManagementPage />;
      case 'performance-management':
        return <PerformanceEvaluationPage />;
      case 'contract-management':
        return <ContractManagementPage />;
      case 'bi-reports':
        return <BiReportsPage />;
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
      <ApiStatus />
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
