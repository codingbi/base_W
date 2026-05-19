import React, { useEffect, useState } from 'react';
import { Plus, Download, Upload, Filter, Calendar, Briefcase, ChevronDown, ChevronRight, CheckCircle, AlertCircle, XCircle, PlayCircle, FolderOpen, FileText, ClipboardList, Users, Target, Clock, Upload as UploadIcon } from 'lucide-react';
import { useAppStore } from '../store';
import { api } from '../lib/api';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

export default function ProjectManagementPage() {
  const { projects, projectTypes, setProjects, setProjectTypes, updateProjectStatus, loading, setLoading } = useAppStore();
  const [activeTab, setActiveTab] = useState('projects');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showModal, setShowModal] = useState<string | null>(null);
  const [newProject, setNewProject] = useState({
    name: '',
    code: '',
    department: '',
    responsibleDepartment: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    budget: 0,
    startDate: '',
    endDate: '',
    typeId: '',
    annual: new Date().getFullYear().toString(),
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [projectsRes, typesRes] = await Promise.all([
          api.getProjects(),
          api.getProjectTypes(),
        ]);
        setProjects(projectsRes.data);
        setProjectTypes(typesRes.data);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [setProjects, setProjectTypes, setLoading]);

  const handleCompleteProject = async (projectId: string) => {
    try {
      await api.completeProject(projectId);
      updateProjectStatus(projectId, 'completed');
    } catch (error) {
      console.error('Failed to complete project:', error);
    }
  };

  const handleCreateProject = () => {
    const project = {
      id: Date.now().toString(),
      ...newProject,
      typeName: projectTypes.find(t => t.id === newProject.typeId)?.name || '',
      usedBudget: 0,
      progress: 0,
      status: 'planning' as const,
      phases: [],
    };
    setProjects([...projects, project]);
    setShowModal(null);
    setNewProject({
      name: '',
      code: '',
      department: '',
      responsibleDepartment: '',
      priority: 'medium',
      budget: 0,
      startDate: '',
      endDate: '',
      typeId: '',
      annual: new Date().getFullYear().toString(),
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'active':
        return <PlayCircle className="text-blue-500" size={20} />;
      case 'planning':
        return <AlertCircle className="text-yellow-500" size={20} />;
      default:
        return <XCircle className="text-gray-500" size={20} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '进行中';
      case 'completed':
        return '已完成';
      case 'planning':
        return '规划中';
      default:
        return '未知';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return '重要';
      case 'medium':
        return '一般';
      case 'low':
        return '普通';
      default:
        return '未知';
    }
  };

  const projectByStatus = {
    planning: projects.filter(p => p.status === 'planning'),
    active: projects.filter(p => p.status === 'active'),
    completed: projects.filter(p => p.status === 'completed'),
  };

  const projectTypeStats = projectTypes.map(type => ({
    name: type.name,
    value: projects.filter(p => p.typeId === type.id).length,
  }));

  const progressData = projects.slice(0, 5).map(p => ({
    name: p.name.substring(0, 10) + (p.name.length > 10 ? '...' : ''),
    progress: p.progress,
    budget: p.usedBudget / 10000,
  }));

  const phaseStats = projects.flatMap(p => p.phases).map(phase => ({
    name: phase.name,
    progress: phase.progress,
  }));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">项目管理</h1>
          <p className="text-gray-500 mt-1">管理项目立项、预算执行与进度跟踪</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <Download size={18} />
            导出报表
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <Upload size={18} />
            批量导入
          </button>
          <button
            onClick={() => setShowModal('create')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={18} />
            新建项目
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">全部项目</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{projects.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">进行中</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">{projectByStatus.active.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">已完成</p>
          <p className="text-2xl font-bold text-green-600 mt-2">{projectByStatus.completed.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">规划中</p>
          <p className="text-2xl font-bold text-yellow-600 mt-2">{projectByStatus.planning.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === 'projects' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            项目库
          </button>
          <button
            onClick={() => setActiveTab('types')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === 'types' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            项目类型
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === 'progress' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            进度填报
          </button>
          <button
            onClick={() => setActiveTab('approval')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === 'approval' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            验收结项
          </button>
          <button
            onClick={() => setActiveTab('kanban')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === 'kanban' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            项目看板
          </button>
        </div>

        {activeTab === 'projects' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">项目列表</h3>
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                <Filter size={16} />
                筛选
              </button>
            </div>

            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-xl overflow-hidden">
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        {expandedProject === project.id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                        {getStatusIcon(project.status)}
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-gray-900">{project.name}</h4>
                          <span className="text-sm text-gray-500">{project.code}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <span>{project.department}</span>
                          <span>{project.typeName}</span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                            {getPriorityText(project.priority)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${project.progress}%` }} />
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">预算: ¥{(project.budget / 10000).toFixed(1)}万</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === 'active' ? 'bg-blue-100 text-blue-800' : project.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {getStatusText(project.status)}
                      </span>
                    </div>
                  </div>

                  {expandedProject === project.id && (
                    <div className="border-t border-gray-100 p-4 bg-gray-50">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">归口部门</p>
                          <p className="text-sm font-medium text-gray-900">{project.responsibleDepartment}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">年度</p>
                          <p className="text-sm font-medium text-gray-900">{project.annual}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">预算执行</p>
                          <p className="text-sm font-medium text-gray-900">¥{(project.usedBudget / 10000).toFixed(1)}万 / ¥{(project.budget / 10000).toFixed(1)}万</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">时间范围</p>
                          <p className="text-sm font-medium text-gray-900">{project.startDate} - {project.endDate}</p>
                        </div>
                      </div>

                      {project.phases.length > 0 && (
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-gray-700 mb-3">项目阶段</h5>
                          <div className="space-y-3">
                            {project.phases.map((phase) => (
                              <div key={phase.id} className="bg-white rounded-lg p-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <FolderOpen size={16} className="text-gray-500" />
                                    <span className="font-medium text-gray-900">{phase.name}</span>
                                  </div>
                                  <span className="text-sm text-gray-500">{phase.startDate} ~ {phase.endDate}</span>
                                </div>
                                <div className="mt-2">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">进度</span>
                                    <span className="font-medium text-gray-900">{phase.progress}%</span>
                                  </div>
                                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${phase.progress}%` }} />
                                  </div>
                                </div>
                                {phase.tasks.length > 0 && (
                                  <div className="mt-3 space-y-2">
                                    {phase.tasks.map((task) => (
                                      <div key={task.id} className="flex items-center gap-2 text-sm">
                                        <span className={`w-2 h-2 rounded-full ${task.status === 'completed' ? 'bg-green-500' : task.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-300'}`} />
                                        <span className="text-gray-700">{task.name}</span>
                                        <span className="text-gray-500">- {task.assignee}</span>
                                        <span className="text-gray-400 text-xs">{task.plannedTime}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <button className="flex-1 px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100">
                          查看详情
                        </button>
                        <button className="flex-1 px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                          更新进度
                        </button>
                        {project.status !== 'completed' && (
                          <button
                            onClick={(e) => { e.stopPropagation(); handleCompleteProject(project.id); }}
                            className="px-4 py-2 text-sm text-green-700 border border-green-300 rounded-lg hover:bg-green-50"
                          >
                            完成项目
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'types' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">项目类型管理</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus size={18} />
                添加类型
              </button>
            </div>

            <div className="space-y-3">
              {projectTypes.map((type) => (
                <div key={type.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${type.level === 1 ? 'bg-blue-500' : 'bg-green-500'}`} />
                      <span className="font-medium text-gray-900">{type.name}</span>
                      <span className="text-xs text-gray-500">({type.level === 1 ? '一级' : '二级'})</span>
                    </div>
                    {type.attributes.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {type.attributes.map((attr, idx) => (
                          <span key={idx} className="px-2 py-1 bg-white text-xs text-gray-600 rounded">
                            {attr}
                          </span>
                        ))}
                      </div>
                    )}
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

        {activeTab === 'progress' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">项目进度填报</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus size={18} />
                添加阶段
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">选择项目</h4>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">请选择项目</option>
                    {projects.filter(p => p.status !== 'completed').map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.code})</option>
                    ))}
                  </select>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">任务进度填报</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">任务名称</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="输入任务名称" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">负责人</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">选择负责人</option>
                          <option value="1">张三</option>
                          <option value="2">李四</option>
                          <option value="3">王五</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">计划工时</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="如: 40h" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">实际工时</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="如: 38h" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">完成状态</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="pending">待开始</option>
                        <option value="in_progress">进行中</option>
                        <option value="completed">已完成</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">成果提交</label>
                      <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows={2} placeholder="请描述已完成的成果..." />
                    </div>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      保存进度
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">项目阶段概览</h4>
                  <div className="space-y-3">
                    {projects.slice(0, 3).map(project => (
                      <div key={project.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-900 text-sm">{project.name}</span>
                          <span className="text-sm text-gray-500">{project.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${project.progress}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">任务统计</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">待开始</span>
                      <span className="font-medium text-gray-900">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">进行中</span>
                      <span className="font-medium text-gray-900">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">已完成</span>
                      <span className="font-medium text-gray-900">8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'approval' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">项目验收结项</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">项目验收申请表</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">项目代码</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">请选择项目</option>
                        {projects.filter(p => p.status === 'active').map(p => (
                          <option key={p.id} value={p.id}>{p.code}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">项目名称</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" readOnly placeholder="项目名称将自动填入" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">项目年度</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" readOnly placeholder="年度将自动填入" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">验收日期</label>
                      <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">绩效指标完成情况</label>
                    <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} placeholder="请描述项目绩效指标完成情况..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">项目产出成果</label>
                    <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} placeholder="请描述项目产出成果..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">验收附件</label>
                    <div className="flex items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                      <UploadIcon size={20} className="text-gray-400" />
                      <span className="text-sm text-gray-500">点击或拖拽上传验收文件</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100">
                      保存草稿
                    </button>
                    <button className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                      提交验收申请
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">待验收项目</h4>
                  <div className="space-y-3">
                    {projects.filter(p => p.status === 'active' && p.progress >= 90).slice(0, 3).map(project => (
                      <div key={project.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{project.name}</p>
                            <p className="text-xs text-gray-500">{project.code}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${project.progress >= 100 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                            {project.progress}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">验收流程说明</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>1. 选择项目代码，系统自动带入项目名称和年度</p>
                    <p>2. 填写绩效指标完成情况和产出成果</p>
                    <p>3. 上传验收相关附件</p>
                    <p>4. 提交审批，审批通过后项目状态变为完成</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'kanban' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">项目类型分布</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={projectTypeStats}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {projectTypeStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">项目进度</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={progressData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" width={80} />
                      <Tooltip />
                      <Bar dataKey="progress" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">项目状态统计</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">规划中</span>
                      <span className="font-medium text-gray-900">{projectByStatus.planning.length}</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${(projectByStatus.planning.length / projects.length) * 100}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">进行中</span>
                      <span className="font-medium text-gray-900">{projectByStatus.active.length}</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(projectByStatus.active.length / projects.length) * 100}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">已完成</span>
                      <span className="font-medium text-gray-900">{projectByStatus.completed.length}</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${(projectByStatus.completed.length / projects.length) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">预算执行分析</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="budget" fill="#e2e8f0" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">项目优先级分布</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="text-gray-600">重要</span>
                    </div>
                    <span className="font-medium text-gray-900">{projects.filter(p => p.priority === 'high').length}个</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="text-gray-600">一般</span>
                    </div>
                    <span className="font-medium text-gray-900">{projects.filter(p => p.priority === 'medium').length}个</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-gray-600">普通</span>
                    </div>
                    <span className="font-medium text-gray-900">{projects.filter(p => p.priority === 'low').length}个</span>
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
              <h3 className="text-lg font-semibold text-gray-900">新建项目</h3>
              <button onClick={() => setShowModal(null)} className="text-gray-500 hover:text-gray-700">
                <XCircle size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">项目名称</label>
                  <input
                    type="text"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入项目名称"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">项目代码</label>
                  <input
                    type="text"
                    value={newProject.code}
                    onChange={(e) => setNewProject({ ...newProject, code: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入项目代码"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">申报部门</label>
                  <input
                    type="text"
                    value={newProject.department}
                    onChange={(e) => setNewProject({ ...newProject, department: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入申报部门"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">归口部门</label>
                  <input
                    type="text"
                    value={newProject.responsibleDepartment}
                    onChange={(e) => setNewProject({ ...newProject, responsibleDepartment: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入归口部门"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">项目类型</label>
                  <select
                    value={newProject.typeId}
                    onChange={(e) => setNewProject({ ...newProject, typeId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">请选择类型</option>
                    {projectTypes.filter(t => t.level === 1).map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">重要程度</label>
                  <select
                    value={newProject.priority}
                    onChange={(e) => setNewProject({ ...newProject, priority: e.target.value as 'high' | 'medium' | 'low' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="high">重要</option>
                    <option value="medium">一般</option>
                    <option value="low">普通</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">预算金额</label>
                  <input
                    type="number"
                    value={newProject.budget}
                    onChange={(e) => setNewProject({ ...newProject, budget: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="输入预算金额"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">项目年度</label>
                  <input
                    type="text"
                    value={newProject.annual}
                    onChange={(e) => setNewProject({ ...newProject, annual: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">开始日期</label>
                  <input
                    type="date"
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">结束日期</label>
                  <input
                    type="date"
                    value={newProject.endDate}
                    onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowModal(null)} className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100">
                  取消
                </button>
                <button onClick={handleCreateProject} className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  创建项目
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}