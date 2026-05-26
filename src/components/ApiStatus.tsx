import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

export function ApiStatus() {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkApi = async () => {
      try {
        const response = await fetch('/api/contracts');
        if (response.ok) {
          setStatus('online');
        } else {
          setStatus('offline');
          setShow(true);
        }
      } catch (error) {
        setStatus('offline');
        setShow(true);
      }
    };

    checkApi();
  }, []);

  const isGitHubPages = window.location.hostname.includes('github.io');

  if (!show && status !== 'offline') {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <div className={`p-4 rounded-lg shadow-lg border ${
        status === 'online' 
          ? 'bg-green-50 border-green-200 text-green-800' 
          : 'bg-amber-50 border-amber-200 text-amber-800'
      }`}>
        <div className="flex items-start gap-3">
          {status === 'online' ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <h4 className="font-semibold mb-1">
              {status === 'online' ? 'API连接正常' : 'API服务不可用'}
            </h4>
            <p className="text-sm mb-2">
              {status === 'online' 
                ? '所有功能正常工作' 
                : isGitHubPages 
                  ? 'GitHub Pages是静态托管，无法运行后端服务。'
                  : '请确保后端服务正在运行。'}
            </p>
            {status === 'offline' && (
              <div className="text-sm space-y-1">
                <p className="flex items-center gap-1">
                  <Info className="w-4 h-4" />
                  <span>本地访问: <code className="bg-amber-100 px-1 rounded">http://localhost:5174/</code></span>
                </p>
                <p className="text-xs text-amber-600">
                  或者部署到Vercel以获得完整功能
                </p>
              </div>
            )}
          </div>
          <button
            onClick={() => setShow(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
