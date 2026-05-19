import React, { useEffect } from 'react';
import { Plus, Download, Filter, Check, X } from 'lucide-react';
import { useAppStore } from '../store';
import { api } from '../lib/api';

export default function ExpenseManagementPage() {
  const { expenses, setExpenses, updateExpenseStatus, loading, setLoading } = useAppStore();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await api.getExpenses();
        setExpenses(res.data);
      } catch (error) {
        console.error('Failed to load expenses:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [setExpenses, setLoading]);

  const handleApprove = async (id: string) => {
    try {
      await api.approveExpense(id);
      updateExpenseStatus(id, 'approved');
    } catch (error) {
      console.error('Failed to approve expense:', error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await api.rejectExpense(id);
      updateExpenseStatus(id, 'rejected');
    } catch (error) {
      console.error('Failed to reject expense:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return '已审批';
      case 'pending':
        return '待审批';
      case 'rejected':
        return '已拒绝';
      default:
        return '未知';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">支出管理</h1>
          <p className="text-gray-500 mt-1">管理费用申请、报销审批与资金支付</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <Download size={18} />
            导出报表
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={18} />
            新增报销
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">待审批</p>
          <p className="text-2xl font-bold text-yellow-600 mt-2">
            {expenses.filter(e => e.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">已审批</p>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {expenses.filter(e => e.status === 'approved').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">已拒绝</p>
          <p className="text-2xl font-bold text-red-600 mt-2">
            {expenses.filter(e => e.status === 'rejected').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">总金额</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            ¥{expenses.reduce((sum, e) => sum + e.amount, 0).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">支出明细</h3>
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <Filter size={16} />
              筛选
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">报销项目</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">申请人</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类别</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">金额</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日期</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{expense.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.applicant}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ¥{expense.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(expense.status)}`}
                    >
                      {getStatusText(expense.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {expense.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(expense.id)}
                          className="flex items-center gap-1 px-3 py-1 text-green-700 bg-green-50 rounded hover:bg-green-100"
                        >
                          <Check size={14} />
                          通过
                        </button>
                        <button
                          onClick={() => handleReject(expense.id)}
                          className="flex items-center gap-1 px-3 py-1 text-red-700 bg-red-50 rounded hover:bg-red-100"
                        >
                          <X size={14} />
                          拒绝
                        </button>
                      </div>
                    )}
                    {expense.status !== 'pending' && (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
