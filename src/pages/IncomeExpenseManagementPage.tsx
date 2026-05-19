import React, { useEffect, useState } from 'react';
import { Plus, Download, Upload, Filter, Search, X, CreditCard, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAppStore } from '../store';
import { api } from '../lib/api';

export default function IncomeExpenseManagementPage() {
  const { accounts, incomeRecords, preApplications, setAccounts, setIncomeRecords, setPreApplications, loading, setLoading } = useAppStore();
  const [activeTab, setActiveTab] = useState('accounts');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [accountsRes, incomeRecordsRes, preApplicationsRes] = await Promise.all([
          api.getAccounts(),
          api.getIncomeRecords(),
          api.getPreApplications(),
        ]);
        setAccounts(accountsRes.data);
        setIncomeRecords(incomeRecordsRes.data);
        setPreApplications(preApplicationsRes.data);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [setAccounts, setIncomeRecords, setPreApplications, setLoading]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'canceled':
        return 'bg-gray-100 text-gray-800';
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
      case 'canceled':
        return '已撤销';
      default:
        return '未知';
    }
  };

  const stats = {
    totalAccounts: accounts.length,
    totalIncome: incomeRecords.reduce((sum, r) => sum + r.amount, 0),
    pendingApplications: preApplications.filter(p => p.status === 'pending').length,
    approvedApplications: preApplications.filter(p => p.status === 'approved').length,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">收支管理</h1>
          <p className="text-gray-500 mt-1">管理收入登记、事前申请与费用报销</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <Download size={18} />
            导出报表
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={18} />
            新增记录
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">银行账户数</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalAccounts}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">收入总额</p>
          <p className="text-2xl font-bold text-green-600 mt-2">¥{(stats.totalIncome / 10000).toFixed(1)}万</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">待审批申请</p>
          <p className="text-2xl font-bold text-yellow-600 mt-2">{stats.pendingApplications}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">已通过申请</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">{stats.approvedApplications}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-100 overflow-x-auto">
          <button
            onClick={() => setActiveTab('accounts')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'accounts' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            账户管理
          </button>
          <button
            onClick={() => setActiveTab('income')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'income' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            收入登记
          </button>
          <button
            onClick={() => setActiveTab('pre-application')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'pre-application' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            事前申请
          </button>
          <button
            onClick={() => setActiveTab('prepayment')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'prepayment' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            预付申请
          </button>
          <button
            onClick={() => setActiveTab('reimbursement')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'reimbursement' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            报销管理
          </button>
        </div>

        {activeTab === 'accounts' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">银行账户管理</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus size={18} />
                添加账户
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {accounts.map((account) => (
                <div key={account.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <CreditCard size={24} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{account.name}</span>
                      <span className="text-xs text-gray-500">{account.type}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{account.bank} • {account.accountNumber}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">编辑</button>
                    <button className="px-3 py-1 text-sm text-red-600 hover:text-red-900">删除</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'income' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">收入登记</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus size={18} />
                新增登记
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">收入登记表</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">预算指标</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">请选择预算指标</option>
                      <option value="1">ZWFY-2024-001</option>
                      <option value="2">ZWFY-2024-002</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">分配金额</label>
                      <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="输入金额" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">收款账户</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">请选择账户</option>
                        {accounts.map(account => (
                          <option key={account.id} value={account.id}>{account.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">登记日期</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    提交登记
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">收入记录</h4>
                  <div className="space-y-3">
                    {incomeRecords.map((record) => (
                      <div key={record.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium text-gray-900">收入 #{record.id}</p>
                            <p className="text-xs text-gray-500">{record.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">¥{(record.amount / 10000).toFixed(1)}万</p>
                            <span className={`text-xs ${getStatusColor(record.status)} px-2 py-0.5 rounded-full`}>
                              {getStatusText(record.status)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pre-application' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">事前申请</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus size={18} />
                发起申请
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {preApplications.map((app) => (
                  <div key={app.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-gray-900">{app.applicant}</h4>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                            {getStatusText(app.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{app.reason}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">¥{app.amount.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{app.type}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                      <Clock size={14} />
                      <span>{app.createTime}</span>
                    </div>
                    {app.status === 'pending' && (
                      <div className="mt-3 flex gap-2">
                        <button className="px-3 py-1 text-sm text-green-700 border border-green-300 rounded-lg hover:bg-green-50">
                          批准
                        </button>
                        <button className="px-3 py-1 text-sm text-red-700 border border-red-300 rounded-lg hover:bg-red-50">
                          拒绝
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">申请类型统计</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">培训费</span>
                      <span className="font-medium text-gray-900">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">维修费</span>
                      <span className="font-medium text-gray-900">2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">会议费</span>
                      <span className="font-medium text-gray-900">5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'prepayment' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">预付申请表</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">关联事前申请</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">请选择事前申请</option>
                      {preApplications.filter(p => p.status === 'approved').map(p => (
                        <option key={p.id} value={p.id}>{p.applicant} - {p.reason}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">预付金额</label>
                      <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="输入金额" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">支付方式</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">请选择方式</option>
                        <option value="bank">银行转账</option>
                        <option value="cash">现金</option>
                        <option value="transfer">对公转账</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">预付事由</label>
                    <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows={2} placeholder="请描述预付事由..." />
                  </div>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    提交申请
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">预付记录</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium text-gray-900">预付申请 #P001</p>
                          <p className="text-xs text-gray-500">张三 - 设备采购</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">¥50,000</p>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">已审批</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium text-gray-900">预付申请 #P002</p>
                          <p className="text-xs text-gray-500">李四 - 会议订金</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">¥10,000</p>
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">待审批</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reimbursement' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">报销管理</h3>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  <Upload size={18} />
                  发票导入
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Plus size={18} />
                  新建报销
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">报销申请</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">报销类型</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">请选择类型</option>
                        <option value="travel">差旅费</option>
                        <option value="meeting">会议费</option>
                        <option value="training">培训费</option>
                        <option value="labor">劳务费</option>
                        <option value="official">公务接待</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">报销金额</label>
                        <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="输入金额" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">关联事前申请</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">无事前申请</option>
                          {preApplications.filter(p => p.status === 'approved').map(p => (
                            <option key={p.id} value={p.id}>{p.applicant} - {p.reason}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">报销事由</label>
                      <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} placeholder="请描述报销事由..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">发票附件</label>
                      <div className="flex items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                        <Upload size={20} className="text-gray-400" />
                        <span className="text-sm text-gray-500">点击或拖拽上传发票</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100">
                        保存草稿
                      </button>
                      <button className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                        提交审批
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">报销统计</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">本月报销</span>
                      <span className="font-medium text-gray-900">¥85,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">待审批</span>
                      <span className="font-medium text-yellow-600">3笔</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">已完成</span>
                      <span className="font-medium text-green-600">12笔</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}