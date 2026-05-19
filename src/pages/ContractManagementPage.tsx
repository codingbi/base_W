import React, { useEffect, useState } from 'react';
import { Plus, Download, Upload, Filter, Search, X, FileText, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { useAppStore } from '../store';
import { api } from '../lib/api';

export default function ContractManagementPage() {
  const { contracts, contractTemplates, setContracts, setContractTemplates, loading, setLoading } = useAppStore();
  const [activeTab, setActiveTab] = useState('templates');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState<string | null>(null);
  const [newContract, setNewContract] = useState({
    name: '',
    partyB: '',
    amount: 0,
    startDate: '',
    endDate: '',
    templateId: '',
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [contractsRes, templatesRes] = await Promise.all([
          api.getContracts(),
          api.getContractTemplates(),
        ]);
        setContracts(contractsRes.data);
        setContractTemplates(templatesRes.data);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [setContracts, setContractTemplates, setLoading]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '执行中';
      case 'expired':
        return '已到期';
      case 'draft':
        return '草稿';
      default:
        return '未知';
    }
  };

  const contractStats = {
    total: contracts.length,
    active: contracts.filter(c => c.status === 'active').length,
    expired: contracts.filter(c => c.status === 'expired').length,
    totalAmount: contracts.reduce((sum, c) => sum + c.amount, 0),
  };

  const filteredContracts = contracts.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">合同管理</h1>
          <p className="text-gray-500 mt-1">管理合同签订、审批、履行与归档全生命周期</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <Download size={18} />
            导出报表
          </button>
          <button onClick={() => setShowModal('create')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={18} />
            新建合同
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">合同总数</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{contractStats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">执行中</p>
          <p className="text-2xl font-bold text-green-600 mt-2">{contractStats.active}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">已到期</p>
          <p className="text-2xl font-bold text-gray-600 mt-2">{contractStats.expired}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">合同总金额</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">¥{(contractStats.totalAmount / 10000).toFixed(1)}万</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-100 overflow-x-auto">
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'templates' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            合同模板
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'create' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            合同拟定
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'tracking' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            合同履行跟踪
          </button>
          <button
            onClick={() => setActiveTab('ledger')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'ledger' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            合同台账
          </button>
        </div>

        {activeTab === 'templates' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">合同模板管理</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus size={18} />
                添加模板
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contractTemplates.map((template) => (
                <div key={template.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <FileText size={18} className="text-blue-500" />
                        <span className="font-medium text-gray-900">{template.name}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">类型: {template.type}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">编辑</button>
                      <button className="px-3 py-1 text-sm text-red-600 hover:text-red-900">删除</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'create' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">合同拟定</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">选择模板</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">请选择模板</option>
                      {contractTemplates.map(template => (
                        <option key={template.id} value={template.id}>{template.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">合同名称</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="输入合同名称" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">乙方名称</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="输入乙方名称" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">合同金额</label>
                      <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="输入合同金额" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">合同期限</label>
                      <div className="flex gap-2">
                        <input type="date" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <span className="flex items-center text-gray-500">至</span>
                        <input type="date" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">合同内容</label>
                    <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows={5} placeholder="请输入合同内容..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">合同附件</label>
                    <div className="flex items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                      <Upload size={20} className="text-gray-400" />
                      <span className="text-sm text-gray-500">点击或拖拽上传合同附件</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100">
                      保存草稿
                    </button>
                    <button className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                      发起会签
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">履约保证金</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">保证金金额</span>
                      <input type="number" className="w-32 px-3 py-1 border border-gray-300 rounded-lg text-right" placeholder="0" />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">保证金比例</span>
                      <span className="font-medium text-gray-900">10%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">质保金</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">质保金金额</span>
                      <input type="number" className="w-32 px-3 py-1 border border-gray-300 rounded-lg text-right" placeholder="0" />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">质保期</span>
                      <input type="text" className="w-32 px-3 py-1 border border-gray-300 rounded-lg text-right" placeholder="1年" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tracking' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {contracts.filter(c => c.status === 'active').map((contract) => (
                  <div key={contract.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{contract.name}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <span>乙方: {contract.partyB}</span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                            {getStatusText(contract.status)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">¥{(contract.amount / 10000).toFixed(1)}万</p>
                        <p className="text-sm text-gray-500">已付: ¥{(contract.paidAmount / 10000).toFixed(1)}万</p>
                      </div>
                    </div>

                    {contract.paymentSchedule.length > 0 && (
                      <div className="mt-4">
                        <h5 className="text-sm font-medium text-gray-700">付款计划</h5>
                        <div className="space-y-2 mt-2">
                          {contract.paymentSchedule.map((schedule) => (
                            <div key={schedule.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                              <div>
                                <span className="text-sm text-gray-900">付款期次 #{schedule.id}</span>
                                <span className="text-xs text-gray-500 ml-2">{schedule.dueDate}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="font-medium text-gray-900">¥{schedule.amount.toLocaleString()}</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                  schedule.status === 'paid' ? 'bg-green-100 text-green-800' : 
                                  schedule.status === 'overdue' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {schedule.status === 'paid' ? '已付' : schedule.status === 'overdue' ? '逾期' : '待付'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">合同统计</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">待付款</span>
                      <span className="font-medium text-yellow-600">¥50万</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">逾期款项</span>
                      <span className="font-medium text-red-600">¥10万</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">履约保证金</span>
                      <span className="font-medium text-gray-900">¥4.5万</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ledger' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">合同台账</h3>
              <div className="flex gap-3">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="搜索合同..."
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  <Filter size={18} />
                  筛选
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">合同名称</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">乙方</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">金额</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">已付金额</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">签订日期</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredContracts.map((contract) => (
                    <tr key={contract.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{contract.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contract.partyB}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">¥{contract.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">¥{contract.paidAmount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contract.startDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                          {getStatusText(contract.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-sm text-blue-600 hover:text-blue-800">查看详情</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showModal === 'create' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">新建合同</h3>
              <button onClick={() => setShowModal(null)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">合同名称</label>
                <input
                  type="text"
                  value={newContract.name}
                  onChange={(e) => setNewContract({ ...newContract, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="输入合同名称"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">乙方名称</label>
                <input
                  type="text"
                  value={newContract.partyB}
                  onChange={(e) => setNewContract({ ...newContract, partyB: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="输入乙方名称"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">合同金额</label>
                  <input
                    type="number"
                    value={newContract.amount}
                    onChange={(e) => setNewContract({ ...newContract, amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入金额"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">选择模板</label>
                  <select
                    value={newContract.templateId}
                    onChange={(e) => setNewContract({ ...newContract, templateId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">请选择模板</option>
                    {contractTemplates.map(template => (
                      <option key={template.id} value={template.id}>{template.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowModal(null)} className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100">
                  取消
                </button>
                <button onClick={() => setShowModal(null)} className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  创建合同
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}