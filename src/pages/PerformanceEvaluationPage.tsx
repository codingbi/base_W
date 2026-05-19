import React, { useEffect, useState } from 'react';
import { Plus, Download, Upload, Filter, Search, X, FileText, Target, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { useAppStore } from '../store';
import { api } from '../lib/api';

export default function PerformanceEvaluationPage() {
  const { projects, performanceEvaluations, setPerformanceEvaluations, loading, setLoading } = useAppStore();
  const [activeTab, setActiveTab] = useState('self-evaluation');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const evalsRes = await api.getPerformanceEvaluations();
        setPerformanceEvaluations(evalsRes.data);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [setPerformanceEvaluations, setLoading]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reviewed':
        return 'bg-green-100 text-green-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'reviewed':
        return '已审核';
      case 'submitted':
        return '已提交';
      case 'draft':
        return '草稿';
      default:
        return '未知';
    }
  };

  const stats = {
    totalProjects: projects.length,
    completedEvaluations: performanceEvaluations.filter(e => e.status === 'reviewed').length,
    pendingEvaluations: performanceEvaluations.filter(e => e.status === 'submitted').length,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">绩效评价管理</h1>
          <p className="text-gray-500 mt-1">管理项目绩效自评、重大任务评价与成果归档</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <Download size={18} />
            导出报表
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={18} />
            新建评价
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">项目总数</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalProjects}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">已完成评价</p>
          <p className="text-2xl font-bold text-green-600 mt-2">{stats.completedEvaluations}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">待审核评价</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">{stats.pendingEvaluations}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">评价完成率</p>
          <p className="text-2xl font-bold text-purple-600 mt-2">{Math.round((stats.completedEvaluations / stats.totalProjects) * 100)}%</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-100 overflow-x-auto">
          <button
            onClick={() => setActiveTab('self-evaluation')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'self-evaluation' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            项目自评方案
          </button>
          <button
            onClick={() => setActiveTab('project-evaluation')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'project-evaluation' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            校内项目自评
          </button>
          <button
            onClick={() => setActiveTab('major-task')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'major-task' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            重大任务评价
          </button>
        </div>

        {activeTab === 'self-evaluation' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">项目绩效自评方案管理</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus size={18} />
                新增方案
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">创建自评方案</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">方案名称</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="输入方案名称" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">填报周期</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">请选择周期</option>
                        <option value="monthly">月度</option>
                        <option value="quarterly">季度</option>
                        <option value="yearly">年度</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">负责人</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">请选择负责人</option>
                        <option value="1">张三</option>
                        <option value="2">李四</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">自评内容设置</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked />
                        <span className="text-sm text-gray-700">建设任务分解</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked />
                        <span className="text-sm text-gray-700">绩效指标完成情况</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                        <span className="text-sm text-gray-700">项目资金构成</span>
                      </label>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    保存方案
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">自评方案列表</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium text-gray-900">2024年度项目绩效自评方案</p>
                          <p className="text-xs text-gray-500">年度 • 张三负责</p>
                        </div>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">已发布</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium text-gray-900">双高计划中期自评方案</p>
                          <p className="text-xs text-gray-500">中期 • 李四负责</p>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">进行中</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'project-evaluation' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">校内项目自评</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus size={18} />
                发起自评
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {performanceEvaluations.map((evaluation) => (
                  <div key={evaluation.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-gray-900">{evaluation.projectName}</h4>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(evaluation.status)}`}>
                            {getStatusText(evaluation.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">期间: {evaluation.period}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <h5 className="text-sm font-medium text-gray-700">自评内容</h5>
                      <p className="text-sm text-gray-600 mt-1">{evaluation.selfEvaluation}</p>
                    </div>
                    {evaluation.deviation && (
                      <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertCircle size={16} className="text-yellow-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-yellow-800">偏差情况</p>
                            <p className="text-sm text-yellow-700 mt-1">{evaluation.deviation}</p>
                            <p className="text-sm text-yellow-700">原因: {evaluation.deviationReason}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {evaluation.supportingMaterials.length > 0 && (
                      <div className="mt-3">
                        <h5 className="text-sm font-medium text-gray-700">佐证材料</h5>
                        <div className="flex gap-2 mt-1">
                          {evaluation.supportingMaterials.map((material, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-sm text-gray-700 rounded">
                              {material}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">统计信息</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">已提交自评</span>
                      <span className="font-medium text-gray-900">{performanceEvaluations.filter(e => e.status === 'submitted').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">已审核</span>
                      <span className="font-medium text-gray-900">{performanceEvaluations.filter(e => e.status === 'reviewed').length}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">待自评项目</h4>
                  <div className="space-y-2">
                    {projects.filter(p => p.status === 'active').slice(0, 3).map(project => (
                      <div key={project.id} className="p-2 bg-white rounded-lg">
                        <p className="text-sm font-medium text-gray-900">{project.name}</p>
                        <p className="text-xs text-gray-500">{project.code}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'major-task' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">重大任务评价</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">双高计划任务书</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-white rounded-lg">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Target size={24} className="text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">高水平学校建设任务</h5>
                        <p className="text-sm text-gray-500">任务周期: 2021-2025年</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">进行中</span>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-3">关联绩效指标</h5>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-700">专业群建设质量提升</span>
                          <span className="text-sm font-medium text-blue-600">目标值: 85%</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-700">师资队伍建设成效</span>
                          <span className="text-sm font-medium text-blue-600">目标值: 90%</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-700">科研创新能力提升</span>
                          <span className="text-sm font-medium text-blue-600">目标值: 88%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-3">预算执行情况</h5>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">总预算</span>
                            <span className="font-medium text-gray-900">¥500万</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">已执行</span>
                            <span className="font-medium text-blue-600">¥320万 (64%)</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '64%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">关联校内项目</h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-900">信息化建设项目</p>
                      <p className="text-xs text-gray-500">预算: ¥50万</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-900">业务系统升级</p>
                      <p className="text-xs text-gray-500">预算: ¥30万</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">评价周期</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                      <input type="radio" name="period" className="text-blue-600" defaultChecked />
                      <span className="text-sm text-gray-700">年度自评</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <input type="radio" name="period" className="text-gray-600" />
                      <span className="text-sm text-gray-700">中期自评</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <input type="radio" name="period" className="text-gray-600" />
                      <span className="text-sm text-gray-700">任务完成后自评</span>
                    </label>
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