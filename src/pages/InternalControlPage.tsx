import React, { useState } from 'react';
import { Plus, Download, Upload, Filter, Search, X, Users, Settings, FileText, AlertTriangle, Briefcase, CheckCircle, ChevronDown, ChevronRight, BarChart3, BookOpen } from 'lucide-react';

const orgData = [
  { id: '1', name: '办公室', parentId: null, children: [
    { id: '1-1', name: '综合科', parentId: '1', children: [] },
    { id: '1-2', name: '人事科', parentId: '1', children: [] },
  ]},
  { id: '2', name: '财务部', parentId: null, children: [
    { id: '2-1', name: '预算科', parentId: '2', children: [] },
    { id: '2-2', name: '会计科', parentId: '2', children: [] },
  ]},
  { id: '3', name: '业务部', parentId: null, children: [] },
  { id: '4', name: '信息中心', parentId: null, children: [] },
];

const meetingData = [
  { id: '1', name: '党组会议', frequency: '每周', leader: '党委书记', scope: '重大决策' },
  { id: '2', name: '院长办公会', frequency: '每周', leader: '院长', scope: '日常管理' },
  { id: '3', name: '专题会议', frequency: '按需', leader: '分管领导', scope: '专项工作' },
];

const tripleMajorData = [
  { id: '1', title: '重大项目投资决策', type: '重大项目', amount: '500万', date: '2024-05-15', status: 'completed' },
  { id: '2', title: '重要人事任免', type: '重要人事', amount: '-', date: '2024-05-10', status: 'completed' },
  { id: '3', title: '大额资金使用', type: '大额资金', amount: '200万', date: '2024-05-20', status: 'pending' },
];

const positionData = [
  { id: '1', name: '出纳', incompatible: ['会计', '审计'], rotation: '3年', responsibility: '资金收付' },
  { id: '2', name: '会计', incompatible: ['出纳'], rotation: '3年', responsibility: '账务处理' },
  { id: '3', name: '采购专员', incompatible: ['验收员'], rotation: '2年', responsibility: '采购执行' },
];

const auditData = [
  { id: '1', type: '内部审计', department: '内审部', period: '季度', status: 'completed', report: '2024Q2内审报告.pdf' },
  { id: '2', type: '外部审计', department: '会计师事务所', period: '年度', status: 'pending', report: '-' },
];

const reportData = [
  { id: '1', title: '2024年度内控报告', date: '2024-01-15', status: 'published' },
  { id: '2', title: '2024年上半年内控报告', date: '2024-07-15', status: 'draft' },
];

export default function InternalControlPage() {
  const [activeTab, setActiveTab] = useState('org');
  const [expandedOrg, setExpandedOrg] = useState<string | null>('1');
  const [showModal, setShowModal] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'published':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'pending':
        return '进行中';
      case 'published':
        return '已发布';
      case 'draft':
        return '草稿';
      default:
        return '未知';
    }
  };

  const renderOrgTree = (items: typeof orgData) => {
    return items.map(item => (
      <div key={item.id}>
        <div
          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
          onClick={() => setExpandedOrg(expandedOrg === item.id ? null : item.id)}
        >
          {item.children.length > 0 ? (
            expandedOrg === item.id ? <ChevronDown size={18} /> : <ChevronRight size={18} />
          ) : (
            <span className="w-4" />
          )}
          <Users size={18} className="text-blue-500" />
          <span className="font-medium text-gray-900">{item.name}</span>
        </div>
        {expandedOrg === item.id && item.children.length > 0 && (
          <div className="ml-6 border-l-2 border-gray-200 pl-4">
            {renderOrgTree(item.children)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">单位层面内控管理</h1>
          <p className="text-gray-500 mt-1">管理内部控制组织体系、决策议事机制与风险监控</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <Download size={18} />
            导出报表
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={18} />
            新增配置
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">组织机构数</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{orgData.length + orgData.reduce((sum, o) => sum + o.children.length, 0)}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">决策议事机制</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">{meetingData.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">三重一大事项</p>
          <p className="text-2xl font-bold text-yellow-600 mt-2">{tripleMajorData.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">内审报告</p>
          <p className="text-2xl font-bold text-green-600 mt-2">{auditData.filter(a => a.status === 'completed').length}</p>
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
            onClick={() => setActiveTab('org')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'org' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            组织机构
          </button>
          <button
            onClick={() => setActiveTab('meeting')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'meeting' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            决策议事机制
          </button>
          <button
            onClick={() => setActiveTab('triple')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'triple' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            三重一大
          </button>
          <button
            onClick={() => setActiveTab('position')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'position' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            岗位管理
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'audit' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            审计机制
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'report' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            内控报告
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">可视化业务导航</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <Users size={24} className="text-blue-600" />
                </div>
                <span className="font-medium text-gray-900">组织机构</span>
                <span className="text-sm text-gray-500">管理组织架构</span>
              </button>
              <button className="flex flex-col items-center p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <Settings size={24} className="text-green-600" />
                </div>
                <span className="font-medium text-gray-900">议事决策</span>
                <span className="text-sm text-gray-500">规范决策流程</span>
              </button>
              <button className="flex flex-col items-center p-6 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
                  <AlertTriangle size={24} className="text-yellow-600" />
                </div>
                <span className="font-medium text-gray-900">三重一大</span>
                <span className="text-sm text-gray-500">重大事项监控</span>
              </button>
              <button className="flex flex-col items-center p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <Briefcase size={24} className="text-purple-600" />
                </div>
                <span className="font-medium text-gray-900">岗位管理</span>
                <span className="text-sm text-gray-500">职责权限管理</span>
              </button>
              <button className="flex flex-col items-center p-6 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
                  <FileText size={24} className="text-red-600" />
                </div>
                <span className="font-medium text-gray-900">审计监督</span>
                <span className="text-sm text-gray-500">内部审计管理</span>
              </button>
              <button className="flex flex-col items-center p-6 bg-cyan-50 rounded-xl hover:bg-cyan-100 transition-colors">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mb-3">
                  <BarChart3 size={24} className="text-cyan-600" />
                </div>
                <span className="font-medium text-gray-900">内控报告</span>
                <span className="text-sm text-gray-500">报告生成分析</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'org' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">组织机构设置</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus size={18} />
                添加机构
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-sm font-medium text-gray-700 mb-4">组织机构树</h4>
                <div className="space-y-1">
                  {renderOrgTree(orgData)}
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">选中机构详情</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">机构名称</span>
                      <span className="font-medium text-gray-900">办公室</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">负责人</span>
                      <span className="font-medium text-gray-900">张三</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">编制人数</span>
                      <span className="font-medium text-gray-900">15人</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">职责描述</span>
                      <span className="font-medium text-gray-900">综合协调</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">权限配置</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked />
                      <span className="text-sm text-gray-700">系统管理</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked />
                      <span className="text-sm text-gray-700">人事管理</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                      <span className="text-sm text-gray-700">财务管理</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'meeting' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">决策议事机制设置</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus size={18} />
                添加议事机制
              </button>
            </div>
            <div className="space-y-4">
              {meetingData.map((meeting) => (
                <div key={meeting.id} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{meeting.name}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span>主持: {meeting.leader}</span>
                        <span>频率: {meeting.frequency}</span>
                        <span>范围: {meeting.scope}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                        查看详情
                      </button>
                      <button className="px-3 py-1 text-sm text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50">
                        编辑
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <h5 className="text-sm font-medium text-gray-700">职责权限</h5>
                    <p className="text-sm text-gray-600 mt-1">负责研究决定本单位重大事项，制定发展规划和年度工作计划，审议重大项目和预算方案。</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'triple' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">三重一大管理</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus size={18} />
                新增事项
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {tripleMajorData.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900">{item.title}</h4>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {getStatusText(item.status)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <span>类型: {item.type}</span>
                          <span>金额: {item.amount}</span>
                          <span>日期: {item.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                        查看流程
                      </button>
                      <button className="px-3 py-1 text-sm text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50">
                        查看记录
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">定义设置</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked />
                      <span className="text-sm text-gray-700">重大决策事项</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked />
                      <span className="text-sm text-gray-700">重要人事任免</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked />
                      <span className="text-sm text-gray-700">重大项目安排</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked />
                      <span className="text-sm text-gray-700">大额度资金运作</span>
                    </label>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">执行监控</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">本年已执行</span>
                      <span className="font-medium text-green-600">2项</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">执行中</span>
                      <span className="font-medium text-yellow-600">1项</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">偏差预警</span>
                      <span className="font-medium text-gray-600">0项</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'position' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">岗位管理</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus size={18} />
                添加岗位
              </button>
            </div>
            <div className="space-y-4">
              {positionData.map((position) => (
                <div key={position.id} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{position.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">职责: {position.responsibility}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      轮换周期: {position.rotation}
                    </span>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                    <h5 className="text-sm font-medium text-yellow-800">不相容岗位</h5>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {position.incompatible.map((item, idx) => (
                        <span key={idx} className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                      查看责任书
                    </button>
                    <button className="px-3 py-1 text-sm text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50">
                      编辑
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">审计机制设置</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus size={18} />
                新增审计计划
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                {auditData.map((audit) => (
                  <div key={audit.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{audit.type}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <span>实施部门: {audit.department}</span>
                          <span>周期: {audit.period}</span>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(audit.status)}`}>
                        {getStatusText(audit.status)}
                      </span>
                    </div>
                    {audit.report !== '-' && (
                      <div className="mt-3">
                        <a href="#" className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                          <FileText size={16} />
                          {audit.report}
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">内审部门设置</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">部门名称</span>
                      <span className="font-medium text-gray-900">审计处</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">负责人</span>
                      <span className="font-medium text-gray-900">李四</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">编制人数</span>
                      <span className="font-medium text-gray-900">5人</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">审计流程</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>1. 制定审计计划</p>
                    <p>2. 实施审计调查</p>
                    <p>3. 撰写审计报告</p>
                    <p>4. 跟踪整改落实</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'report' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">单位层面内控报告</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus size={18} />
                生成报告
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {reportData.map((report) => (
                  <div key={report.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <BookOpen size={18} className="text-blue-500" />
                          <h4 className="font-semibold text-gray-900">{report.title}</h4>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">生成日期: {report.date}</p>
                      </div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {getStatusText(report.status)}
                      </span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                        预览报告
                      </button>
                      <button className="px-3 py-1 text-sm text-green-600 border border-green-300 rounded-lg hover:bg-green-50">
                        <Download size={14} className="inline mr-1" />
                        下载电子书
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">报告统计</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">已发布报告</span>
                      <span className="font-medium text-green-600">1份</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">草稿报告</span>
                      <span className="font-medium text-gray-600">1份</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">报告内容</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked />
                      <span className="text-sm text-gray-700">内部控制环境</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked />
                      <span className="text-sm text-gray-700">风险评估</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked />
                      <span className="text-sm text-gray-700">控制活动</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked />
                      <span className="text-sm text-gray-700">信息与沟通</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked />
                      <span className="text-sm text-gray-700">内部监督</span>
                    </label>
                  </div>
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
              <h3 className="text-lg font-semibold text-gray-900">新增配置</h3>
              <button onClick={() => setShowModal(null)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">名称</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="输入名称" />
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