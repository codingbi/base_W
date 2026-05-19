import React from 'react';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Construction size={40} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-500 max-w-md mx-auto">{description}</p>
        <div className="mt-8">
          <span className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm">
            即将推出
          </span>
        </div>
      </div>
    </div>
  );
}
