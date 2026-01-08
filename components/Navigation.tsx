import React from 'react';
import { ViewType } from '../types.ts';

interface NavigationProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const tabs: { id: ViewType; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'form', label: 'New Ticket', icon: 'M12 4v16m8-8H4' },
    { id: 'table', label: 'All Records', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
  ];

  return (
    <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setView(tab.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            currentView === tab.id
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-slate-600 hover:text-indigo-600 hover:bg-white/50'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
          </svg>
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;