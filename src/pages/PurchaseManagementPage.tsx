import React, { useEffect, useState } from 'react';
import { Plus, Download, Upload, Filter, Search, X, Calendar, FileText, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { useAppStore } from '../store';
import { api } from '../lib/api';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

export default function PurchaseManagementPage() {
  const { purchaseTypes, purchaseIntentions, purchaseApplications, setPurchaseTypes, setPurchaseIntentions, setPurchaseApplications, loading, setLoading } = useAppStore();
  const [activeTab, setActiveTab] = useState('intentions');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState<string | null>(null);
  const [newIntention, setNewIntention] = useState({
    projectId: '',
    projectName: '',
    budgetAmount: 0,
    description: '',
    expectedDate: '',
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [typesRes, intentionsRes, applicationsRes] = await Promise.all([
          api.getPurchaseTypes(),
          api.getPurchaseIntentions(),
          api.getPurchaseApplications(),
        ]);
        setPurchaseTypes(typesRes.data);
        setPurchaseIntentions(intentionsRes.data);
        setPurchaseApplications(applicationsRes.data);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [setPurchaseTypes, setPurchaseIntentions, setPurchaseApplications, setLoading]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return '已公示';
      case 'approved':
        return '已审批';
      case 'draft':
        return '草稿';
      case 'submitted':
        return '已提交';
      default:
        return '未知';
    }
  };

  const intentionStats = {
    total: purchaseIntentions.length,
    published: purchaseIntentions.filter(i => i.status === 'published').length,
    approved: purchaseIntentions.filter(i => i.status === 'approved').length,
    draft: purchaseIntentions.filter(i => i.status === 'draft').length,
  };

  const filteredIntentions = purchaseIntentions.filter(i =>
    i.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">采购管理</h1>
          <p className="text-gray-500 mt-1">管理采购预算、采购意向公示与采购实施审批</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <Download size={18} />
            导出报表
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={18} />
            新增采购
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">采购意向总数</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{intentionStats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">已公示</p>
          <p className="text-2xl font-bold text-green-600 mt-2">{intentionStats.published}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">已审批</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">{intentionStats.approved}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">草稿</p>
          <p className="text-2xl font-bold text-yellow-600 mt-2">{intentionStats.draft}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-100 overflow-x-auto">
          <button
            onClick={() => setActiveTab('types')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'types' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            采购类型
          </button>
          <button
            onClick={() => setActiveTab('intentions')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'intentions' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            采购意向公示
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'applications' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            采购实施审批
          </button>
          <button
            onClick={() => setActiveTab('records')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'records' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            采购台账
          </button>
        </div>

        {activeTab === 'types' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">采购类型管理</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus size={18} />
                添加类型
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {purchaseTypes.map((type) => (
                <div key={type.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{type.name}</span>
                        <span className="text-sm text-gray-500">{type.code}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{type.description}</p>
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

        {activeTab === 'intentions' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">政府采购意向公示</h3>
              <div className="flex gap-3">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="搜索项目..."
                  />
                </div>
                <button onClick={() => setShowModal('create')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Plus size={18} />
                  新增意向
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {filteredIntentions.map((intention) => (
                  <div key={intention.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-gray-900">{intention.projectName}</h4>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(intention.status)}`}>
                            {getStatusText(intention.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{intention.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">¥{(intention.budgetAmount / 10000).toFixed(1)}万</p>
                        <p className="text-sm text-gray-500">预计: {intention.expectedDate}</p>
                      </div>
                    </div>
                    {intention.publishUrl && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <a href={intention.publishUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800">
                          查看公示链接
                        </a>
                      </div>
                    )}
                    <div className="mt-3 flex gap-2">
                      <button className="px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100">
                        编辑
                      </button>
                      {intention.status === 'approved' && (
                        <button className="px-3 py-1 text-sm text-green-700 border border-green-300 rounded-lg hover:bg-green-50">
                          发布公示
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">统计信息</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">待公示</span>
                      <span className="font-medium text-gray-900">{purchaseIntentions.filter(i => i.status === 'approved').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">已公示</span>
                      <span className="font-medium text-gray-900">{purchaseIntentions.filter(i => i.status === 'published').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">总预算</span>
                      <span className="font-medium text-gray-900">¥{(purchaseIntentions.reduce((sum, i) => sum + i.budgetAmount, 0) / 10000).toFixed(1)}万</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">公示说明</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>1. 采购意向审批通过后可进行公示</p>
                    <p>2. 公示时间不少于30天</p>
                    <p>3. 公示期间接受社会监督</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">采购实施审批</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus size={18} />
                发起申请
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">采购实施申请表</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">关联采购意向</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">请选择采购意向</option>
                      {purchaseIntentions.filter(i => i.status === 'published').map(i => (
                        <option key={i.id} value={i.id}>{i.projectName}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">采购类型</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">请选择类型</option>
                        {purchaseTypes.map(type => (
                          <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">采购方式</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">请选择方式</option>
                        <option value="公开招标">公开招标</option>
                        <option value="竞争性磋商">竞争性磋商</option>
                        <option value="竞争性谈判">竞争性谈判</option>
                        <option value="单一来源">单一来源</option>
                        <option value="询价">询价</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">估算金额</label>
                      <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="输入估算金额" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">预计日期</label>
                      <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                      <span className="text-sm text-gray-700">面向中小企业</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                      <span className="text-sm text-gray-700">重点项目</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                      <span className="text-sm text-gray-700">分包</span>
                    </label>
                  </div>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    提交审批
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">申请列表</h4>
                  <div className="space-y-3">
                    {purchaseApplications.map((app) => (
                      <div key={app.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">采购申请 #{app.id}</p>
                            <p className="text-xs text-gray-500">{app.createTime}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                            {getStatusText(app.status)}
                          </span>
                        </div>
                        <div className="mt-2 flex justify-between text-sm">
                          <span className="text-gray-500">{app.method}</span>
                          <span className="font-medium text-gray-900">¥{(app.estimatedAmount / 10000).toFixed(1)}万</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'records' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">采购台账</h3>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <Download size={18} />
                导出台账
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-gray-50 rounded-xl p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">采购项目列表</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-blue-500" />
                      <div>
                        <p className="font-medium text-gray-900">服务器采购项目</p>
                        <p className="text-xs text-gray-500">信息化建设项目</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">¥10万</p>
                      <span className="text-xs text-green-600">已完成</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-yellow-500" />
                      <div>
                        <p className="font-medium text-gray-900">建筑材料采购</p>
                        <p className="text-xs text-gray-500">办公楼改造工程</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">¥20万</p>
                      <span className="text-xs text-blue-600">进行中</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">采购统计</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">已完成采购</span>
                      <span className="font-medium text-gray-900">15项</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">进行中</span>
                      <span className="font-medium text-gray-900">8项</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">采购总额</span>
                      <span className="font-medium text-blue-600">¥350万</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showModal === 'create' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">新增采购意向</h3>
              <button onClick={() => setShowModal(null)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">项目名称</label>
                <input
                  type="text"
                  value={newIntention.projectName}
                  onChange={(e) => setNewIntention({ ...newIntention, projectName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="输入项目名称"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">预算金额</label>
                <input
                  type="number"
                  value={newIntention.budgetAmount}
                  onChange={(e) => setNewIntention({ ...newIntention, budgetAmount: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="输入预算金额"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">采购需求概括</label>
                <textarea
                  value={newIntention.description}
                  onChange={(e) => setNewIntention({ ...newIntention, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="请描述采购需求..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">预计采购时间</label>
                <input
                  type="date"
                  value={newIntention.expectedDate}
                  onChange={(e) => setNewIntention({ ...newIntention, expectedDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowModal(null)} className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100">
                  取消
                </button>
                <button onClick={() => setShowModal(null)} className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  提交申请
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}