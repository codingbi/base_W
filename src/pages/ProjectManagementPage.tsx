import React, { useEffect } from 'react';
import { Plus, Download, Filter, Calendar, User, Briefcase } from 'lucide-react';
import { useAppStore } from '../store';
import { api } from '../lib/api';

export default function ProjectManagementPage() {
  const { projects, setProjects, loading, setLoading } = useAppStore();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await api.getProjects();
        setProjects(res.data);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [setProjects, setLoading]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={18} />
            新建项目
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">全部项目</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{projects.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">进行中</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            {projects.filter(p => p.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">已完成</p>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {projects.filter(p => p.status === 'completed').length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{project.department}</p>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}
              >
                {getStatusText(project.status)}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">项目进度</span>
                  <span className="font-medium text-gray-900">{project.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">预算金额</p>
                  <p className="text-sm font-semibold text-gray-900">¥{(project.budget / 10000).toFixed(1)}万</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">已使用</p>
                  <p className="text-sm font-semibold text-gray-900">¥{(project.usedBudget / 10000).toFixed(1)}万</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={16} />
                  <span>{project.startDate} - {project.endDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Briefcase size={16} />
                  <span>预算执行 {(project.usedBudget / project.budget * 100).toFixed(0)}%</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button className="flex-1 px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                  查看详情
                </button>
                <button className="flex-1 px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  更新进度
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
