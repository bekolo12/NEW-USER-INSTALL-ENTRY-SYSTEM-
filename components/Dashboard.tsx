
import React from 'react';
import { TicketData } from '../types';

interface DashboardProps {
  tickets: TicketData[];
}

const Dashboard: React.FC<DashboardProps> = ({ tickets }) => {
  const total = tickets.length;
  const highPriority = tickets.filter(t => t.priority === 'High' || t.priority === 'Urgent').length;
  const breachedSLA = tickets.filter(t => t.slaStatus === 'Breached').length;
  const closed = tickets.filter(t => t.stage === 'Closed').length;

  const stats = [
    { label: 'Total Tickets', value: total, color: 'indigo' },
    { label: 'High Priority', value: highPriority, color: 'rose' },
    { label: 'SLA Breached', value: breachedSLA, color: 'amber' },
    { label: 'Resolved', value: closed, color: 'emerald' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
            <span className="text-slate-500 text-sm font-medium">{stat.label}</span>
            <span className={`text-3xl font-bold text-${stat.color}-600 mt-1`}>{stat.value}</span>
            <div className={`h-1 w-full bg-${stat.color}-100 rounded-full mt-4 overflow-hidden`}>
              <div 
                className={`h-full bg-${stat.color}-500 transition-all duration-1000`} 
                style={{ width: total > 0 ? `${(stat.value / total) * 100}%` : '0%' }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
            Recent Activity
          </h3>
          <div className="space-y-6">
            {tickets.slice(0, 5).map((ticket) => (
              <div key={ticket.id} className="flex items-start gap-4 pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold shrink-0">
                  {ticket.displayName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-slate-800 truncate">{ticket.displayName}</p>
                    <span className="text-xs text-slate-400 shrink-0">{new Date(ticket.createdOn).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                      ticket.priority === 'Urgent' ? 'bg-rose-100 text-rose-700' :
                      ticket.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {ticket.priority}
                    </span>
                    <p className="text-sm text-slate-500 truncate">Assigned to {ticket.assignedTo}</p>
                  </div>
                </div>
              </div>
            ))}
            {tickets.length === 0 && (
              <div className="py-12 text-center text-slate-400 italic">No tickets found.</div>
            )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Ready to expand?</h3>
            <p className="text-slate-500 max-w-sm mb-6">Start tracking your helpdesk metrics today by adding new incident records and managing team workloads.</p>
            <button 
                onClick={() => window.dispatchEvent(new CustomEvent('nav-to-form'))}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
            >
                Create New Entry
            </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
