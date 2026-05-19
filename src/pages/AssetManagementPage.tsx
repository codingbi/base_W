import React, { useState } from 'react';
import { Plus, Download, Upload, Search, X, Package, BarChart3, MapPin, History, Edit2, Trash2, ChevronRight, CheckCircle, AlertTriangle, Wrench, Tag, FileText, ClipboardList, BarChart, PieChart } from 'lucide-react';

const assetTypes = [
  { id: '1', name: '办公设备', description: '电脑、打印机、复印机等', count: 120 },
  { id: '2', name: '家具', description: '桌椅、柜子、沙发等', count: 85 },
  { id: '3', name: '车辆', description: '公务用车、通勤车等', count: 15 },
  { id: '4', name: '仪器设备', description: '实验仪器、检测设备等', count: 60 },
  { id: '5', name: '房产', description: '办公楼、宿舍等', count: 8 },
];

const assetCategories = [
  { id: '1', code: '01', name: '土地、房屋及构筑物' },
  { id: '2', code: '02', name: '通用设备' },
  { id: '3', code: '03', name: '专用设备' },
  { id: '4', code: '04', name: '文物和陈列品' },
  { id: '5', code: '05', name: '图书、档案' },
  { id: '6', code: '06', name: '家具、用具、装具及动植物' },
];

const assetList = [
  { id: '1', code: 'ZC-2024-001', name: '联想台式电脑', type: '办公设备', category: '通用设备', department: '财务部', status: '在用', purchaseDate: '2024-01-15', value: 5000 },
  { id: '2', code: 'ZC-2024-002', name: '惠普打印机', type: '办公设备', category: '通用设备', department: '办公室', status: '在用', purchaseDate: '2024-02-20', value: 2500 },
  { id: '3', code: 'ZC-2024-003', name: '办公桌', type: '家具', category: '家具、用具', department: '业务部', status: '在用', purchaseDate: '2024-03-10', value: 800 },
  { id: '4', code: 'ZC-2024-004', name: '公务轿车', type: '车辆', category: '专用设备', department: '办公室', status: '在用', purchaseDate: '2023-12-01', value: 200000 },
  { id: '5', code: 'ZC-2024-005', name: '实验分析仪', type: '仪器设备', category: '专用设备', department: '实验室', status: '维修中', purchaseDate: '2024-01-05', value: 150000 },
];

const assetRecords = [
  { id: '1', assetCode: 'ZC-2024-001', action: '领用', user: '张三', date: '2024-01-20', remark: '日常办公使用' },
  { id: '2', assetCode: 'ZC-2024-001', action: '维修', user: '李四', date: '2024-03-15', remark: '更换硬盘' },
  { id: '3', assetCode: 'ZC-2024-004', action: '调拨', user: '王五', date: '2024-04-10', remark: '从办公室调拨至业务部' },
];

const repairOrders = [
  { id: '1', code: 'WX-2024-001', assetCode: 'ZC-2024-005', assetName: '实验分析仪', status: '维修中', applicant: '赵六', date: '2024-05-18' },
  { id: '2', code: 'WX-2024-002', assetCode: 'ZC-2024-002', assetName: '惠普打印机', status: '已完工', applicant: '孙七', date: '2024-05-15' },
];

const depreciationList = [
  { id: '1', assetCode: 'ZC-2024-001', assetName: '联想台式电脑', month: '2024-05', amount: 125, accumulated: 500 },
  { id: '2', assetCode: 'ZC-2024-002', assetName: '惠普打印机', month: '2024-05', amount: 62.5, accumulated: 187.5 },
  { id: '3', assetCode: 'ZC-2024-004', assetName: '公务轿车', month: '2024-05', amount: 4166.67, accumulated: 25000 },
];

const assetStats = {
  total: 288,
  inUse: 265,
  maintenance: 15,
  disposed: 8,
  totalValue: 5200000,
};

const getStatusColor = (status: string) => {
  switch (status) {
    case '在用': return 'bg-green-100 text-green-800';
    case '维修中': return 'bg-yellow-100 text-yellow-800';
    case '闲置': return 'bg-gray-100 text-gray-800';
    case '已处置': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function AssetManagementPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState<string | null>(null);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">资产管理</h1>
          <p className="text-gray-500 mt-1">资产全生命周期管理，包含配置、使用、处置等环节</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <Download size={18} />
            导出报表
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={18} />
            新增资产
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Package size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">资产总数</p>
              <p className="text-2xl font-bold text-gray-900">{assetStats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">在用资产</p>
              <p className="text-2xl font-bold text-green-600">{assetStats.inUse}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Wrench size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">维修中</p>
              <p className="text-2xl font-bold text-yellow-600">{assetStats.maintenance}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Trash2 size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">已处置</p>
              <p className="text-2xl font-bold text-red-600">{assetStats.disposed}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <BarChart size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">资产总值</p>
              <p className="text-2xl font-bold text-purple-600">{(assetStats.totalValue / 10000).toFixed(2)}万</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-100 overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'dashboard' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            业务导航
          </button>
          <button
            onClick={() => setActiveTab('types')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'types' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            资产类型管理
          </button>
          <button
            onClick={() => setActiveTab('assets')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'assets' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            资产档案
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'transactions' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            资产变动
          </button>
          <button
            onClick={() => setActiveTab('depreciation')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'depreciation' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            资产折旧
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'inventory' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            资产盘点
          </button>
          <button
            onClick={() => setActiveTab('repair')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'repair' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            维修管理
          </button>
          <button
            onClick={() => setActiveTab('analysis')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'analysis' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            资产分析
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">可视化业务导航</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <Package size={24} className="text-blue-600" />
                </div>
                <span className="font-medium text-gray-900">资产登记</span>
                <span className="text-sm text-gray-500">新增资产档案</span>
              </button>
              <button className="flex flex-col items-center p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <ClipboardList size={24} className="text-green-600" />
                </div>
                <span className="font-medium text-gray-900">资产领用</span>
                <span className="text-sm text-gray-500">领用资产使用</span>
              </button>
              <button className="flex flex-col items-center p-6 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
                  <Wrench size={24} className="text-yellow-600" />
                </div>
                <span className="font-medium text-gray-900">维修申请</span>
                <span className="text-sm text-gray-500">申请资产维修</span>
              </button>
              <button className="flex flex-col items-center p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <BarChart3 size={24} className="text-purple-600" />
                </div>
                <span className="font-medium text-gray-900">资产分析</span>
                <span className="text-sm text-gray-500">统计分析报表</span>
              </button>
              <button className="flex flex-col items-center p-6 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
                  <Tag size={24} className="text-red-600" />
                </div>
                <span className="font-medium text-gray-900">标签管理</span>
                <span className="text-sm text-gray-500">条码二维码设置</span>
              </button>
              <button className="flex flex-col items-center p-6 bg-cyan-50 rounded-xl hover:bg-cyan-100 transition-colors">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mb-3">
                  <MapPin size={24} className="text-cyan-600" />
                </div>
                <span className="font-medium text-gray-900">GIS地图</span>
                <span className="text-sm text-gray-500">资产位置分布</span>
              </button>
              <button className="flex flex-col items-center p-6 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                  <History size={24} className="text-orange-600" />
                </div>
                <span className="font-medium text-gray-900">资产履历</span>
                <span className="text-sm text-gray-500">查看变动记录</span>
              </button>
              <button className="flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <FileText size={24} className="text-gray-600" />
                </div>
                <span className="font-medium text-gray-900">资产盘点</span>
                <span className="text-sm text-gray-500">定期盘点资产</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'types' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">资产类型管理</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Plus size={18} />
                    添加类型
                  </button>
                </div>
                <div className="space-y-3">
                  {assetTypes.map((type) => (
                    <div key={type.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h4 className="font-medium text-gray-900">{type.name}</h4>
                        <p className="text-sm text-gray-500">{type.description}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {type.count}件
                        </span>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">固定资产分类</h3>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    <Upload size={18} />
                    批量导入
                  </button>
                </div>
                <div className="space-y-2">
                  {assetCategories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">{category.code}</span>
                        <span className="text-gray-900">{category.name}</span>
                      </div>
                      <button className="text-gray-500 hover:text-gray-700">
                        <Edit2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'assets' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">资产档案列表</h3>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  <Upload size={18} />
                  导入资产
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Plus size={18} />
                  新增资产
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">资产编号</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">资产名称</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">类型</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">使用部门</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">状态</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">购置日期</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">原值</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {assetList.map((asset) => (
                    <tr key={asset.id} className="border-b border-gray-100">
                      <td className="px-4 py-3 text-sm text-gray-900">{asset.code}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{asset.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{asset.type}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{asset.department}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                          {asset.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{asset.purchaseDate}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{asset.value.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <button className="text-blue-600 hover:text-blue-800 mr-3">查看</button>
                        <button className="text-gray-600 hover:text-gray-800 mr-3">编辑</button>
                        <button className="text-red-600 hover:text-red-800">处置</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">资产领用</h3>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">领用单号: LY-2024-001</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">已完成</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">资产编号</span>
                        <span className="text-gray-900">ZC-2024-001</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">资产名称</span>
                        <span className="text-gray-900">联想台式电脑</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">领用人</span>
                        <span className="text-gray-900">张三</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="mt-4 w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  <Plus size={18} className="inline mr-2" />
                  发起领用申请
                </button>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">资产调拨</h3>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">调拨单号: DB-2024-001</span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">进行中</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">资产编号</span>
                        <span className="text-gray-900">ZC-2024-004</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">调出部门</span>
                        <span className="text-gray-900">办公室</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">调入部门</span>
                        <span className="text-gray-900">业务部</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="mt-4 w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  <Plus size={18} className="inline mr-2" />
                  发起调拨申请
                </button>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">资产处置</h3>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">处置单号: CZ-2024-001</span>
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">已完成</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">资产编号</span>
                        <span className="text-gray-900">ZC-2023-015</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">处置方式</span>
                        <span className="text-gray-900">报废</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">处置原因</span>
                        <span className="text-gray-900">设备老化</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="mt-4 w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  <Plus size={18} className="inline mr-2" />
                  发起处置申请
                </button>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">资产减值</h3>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">减值单号: JZ-2024-001</span>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">待审批</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">资产编号</span>
                        <span className="text-gray-900">ZC-2024-005</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">减值金额</span>
                        <span className="text-gray-900">20000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">减值原因</span>
                        <span className="text-gray-900">市场价值下降</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="mt-4 w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  <Plus size={18} className="inline mr-2" />
                  发起减值申请
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'depreciation' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">计提折旧</h3>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                      单个计提
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      批量计提
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">计提期间</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option>2024年05月</option>
                        <option>2024年04月</option>
                        <option>2024年03月</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">资产范围</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option>全部资产</option>
                        <option>按部门筛选</option>
                        <option>按类型筛选</option>
                      </select>
                    </div>
                    <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      执行计提
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">计提清单</h3>
                <div className="space-y-3">
                  {depreciationList.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{item.assetName}</h4>
                          <span className="text-sm text-gray-500">{item.assetCode}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">本月折旧</p>
                          <p className="font-semibold text-gray-900">{item.amount.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between text-sm">
                        <span className="text-gray-500">累计折旧: {item.accumulated.toFixed(2)}</span>
                        <button className="text-blue-600 hover:text-blue-800">查看计算逻辑</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-4">盘点任务</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-lg">
                    <h5 className="font-medium text-gray-900">2024年度资产盘点</h5>
                    <p className="text-sm text-gray-500 mt-1">状态: 进行中</p>
                    <button className="mt-2 w-full py-1.5 text-sm text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50">
                      开始盘点
                    </button>
                  </div>
                </div>
                <button className="mt-4 w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  <Plus size={18} className="inline mr-2" />
                  创建盘点任务
                </button>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-4">盘点执行</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">已扫描资产</span>
                      <span className="font-semibold text-gray-900">156/288</span>
                    </div>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: '54%' }} />
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-white rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-3">识别方式</h5>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="scanType" defaultChecked className="text-blue-600" />
                      <span className="text-sm text-gray-700">条形码</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="scanType" className="text-blue-600" />
                      <span className="text-sm text-gray-700">二维码</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="scanType" className="text-blue-600" />
                      <span className="text-sm text-gray-700">RFID</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-4">盘点报告</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-lg">
                    <h5 className="font-medium text-gray-900">2024年度资产盘点报告</h5>
                    <p className="text-sm text-gray-500 mt-1">差异数: 3</p>
                    <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                      查看详情
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'repair' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">维修申请</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Plus size={18} />
                    申请维修
                  </button>
                </div>
                <div className="space-y-3">
                  {repairOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">{order.code}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                          <h4 className="font-medium text-gray-900 mt-1">{order.assetName}</h4>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">维修完工</h3>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">报修单号</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option>WX-2024-001 - 实验分析仪</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">资产编号</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" value="ZC-2024-005" readOnly />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">资产名称</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" value="实验分析仪" readOnly />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">维修结果</label>
                      <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows={3} placeholder="请输入维修结果..."></textarea>
                    </div>
                    <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      确认完工
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">资产类型分布</h3>
                <div className="h-64">
                  <div className="flex justify-center items-center h-full">
                    <div className="relative w-48 h-48">
                      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="10" strokeDasharray={`${(120/288)*251} 251`} />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="10" strokeDasharray={`${(85/288)*251} 251`} strokeDashoffset={-(120/288)*251} />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="10" strokeDasharray={`${(15/288)*251} 251`} strokeDashoffset={-((120+85)/288)*251} />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="10" strokeDasharray={`${(60/288)*251} 251`} strokeDashoffset={-((120+85+15)/288)*251} />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">288</p>
                          <p className="text-sm text-gray-500">总资产</p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-8 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-gray-700">办公设备 (120)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-gray-700">家具 (85)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <span className="text-gray-700">车辆 (15)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="text-gray-700">仪器设备 (60)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500" />
                        <span className="text-gray-700">房产 (8)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-4">部门资产统计</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">财务部</span>
                        <span className="font-medium text-gray-900">45</span>
                      </div>
                      <div className="mt-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '45%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">办公室</span>
                        <span className="font-medium text-gray-900">38</span>
                      </div>
                      <div className="mt-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 rounded-full" style={{ width: '38%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">业务部</span>
                        <span className="font-medium text-gray-900">27</span>
                      </div>
                      <div className="mt-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-600 rounded-full" style={{ width: '27%' }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-4">资产履历</h4>
                  <div className="space-y-2">
                    {assetRecords.slice(0, 3).map((record) => (
                      <div key={record.id} className="p-3 bg-white rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-900">{record.action}</span>
                          <span className="text-xs text-gray-500">{record.date}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{record.assetCode} · {record.user}</p>
                      </div>
                    ))}
                  </div>
                  <button className="mt-3 w-full py-1.5 text-sm text-blue-600 hover:text-blue-800">
                    查看全部履历
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">新增资产</h3>
              <button onClick={() => setShowModal(null)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">资产名称</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="输入资产名称" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">资产类型</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  {assetTypes.map((type) => (
                    <option key={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowModal(null)} className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100">
                  取消
                </button>
                <button onClick={() => setShowModal(null)} className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}