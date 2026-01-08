import React from 'react';
import { TicketData } from '../types.ts';

interface DashboardProps {
  tickets: TicketData[];
}

const Dashboard: React.FC<DashboardProps> = ({ tickets }) => {
  const total = tickets.length;
  const highPriority = tickets.filter(t => t.priority === 'High' || t.priority === 'Urgent').length;
  const breachedSLA = tickets.filter(t => t.slaStatus === 'Breached').length;
  const closed = tickets.filter(t => t.stage === 'Closed').length;

  const stats = [
    { label: 'Total Tickets', value: total, color: 'indigo', textClass: 'text-indigo-600', bgClass: 'bg-indigo-100', barClass: 'bg-indigo-500' },
    { label: 'High Priority', value: highPriority, color: 'rose', textClass: 'text-rose-600', bgClass: 'bg-rose-100', barClass: 'bg-rose-500' },
    { label: 'SLA Breached', value: breachedSLA, color: 'amber', textClass: 'text-amber-600', bgClass: 'bg-amber-100', barClass: 'bg-amber-500' },
    { label: 'Resolved', value: closed, color: 'emerald', textClass: 'text-emerald-600', bgClass: 'bg-emerald-100', barClass: 'bg-emerald-500' },
  ];

  const handleCreateNew = () => {
    window.dispatchEvent(new CustomEvent('nav-to-form', { detail: 'form' }));
  };

  return (
    <div className="space-y-8 animate-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:border-indigo-300 transition-colors">
            <span className="text-slate-500 text-sm font-semibold uppercase tracking-wider">{stat.label}</span>
            <span className={`text-4xl font-black ${stat.textClass} mt-1`}>{stat.value}</span>
            <div className={`h-1.5 w-full ${stat.bgClass} rounded-full mt-4 overflow-hidden`}>
              <div 
                className={`h-full ${stat.barClass} transition-all duration-1000 ease-out`} 
                style={{ width: total > 0 ? `${(stat.value / total) * 100}%` : '0%' }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
              Recent Incident Log
            </h3>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('nav-to-form', { detail: 'table' }))}
              className="text-indigo-600 text-sm font-bold hover:underline"
            >
              View All Records
            </button>
          </div>
          <div className="space-y-6">
            {tickets.slice(0, 5).map((ticket) => (
              <div key={ticket.id} className="flex items-start gap-4 pb-6 border-b border-slate-100 last:border-0 last:pb-0 group hover:bg-slate-50 p-3 -mx-3 rounded-xl transition-colors cursor-default">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                  {ticket.displayName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-slate-800 truncate">{ticket.displayName}</p>
                    <span className="text-xs text-slate-400 font-medium shrink-0">{new Date(ticket.createdOn).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-black uppercase tracking-widest ${
                      ticket.priority === 'Urgent' ? 'bg-rose-100 text-rose-700' :
                      ticket.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                      ticket.priority === 'Medium' ? 'bg-indigo-100 text-indigo-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {ticket.priority}
                    </span>
                    <span className="text-slate-300">•</span>
                    <p className="text-sm text-slate-500 truncate font-medium">Assigned to {ticket.assignedTo}</p>
                  </div>
                </div>
              </div>
            ))}
            {tickets.length === 0 && (
              <div className="py-20 text-center text-slate-400 italic font-medium">
                No tickets currently registered in the repository.
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl border border-white/20 shadow-xl flex flex-col items-center justify-center text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400/20 rounded-full blur-3xl -ml-16 -mb-16"></div>
            
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6 shadow-inner animate-bounce">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            </div>
            <h3 className="text-2xl font-black mb-3">Quick Entry</h3>
            <p className="text-indigo-100 max-w-sm mb-8 font-medium leading-relaxed">Need to log a new incident? Our streamlined interface helps you record critical data in seconds.</p>
            <button 
                onClick={handleCreateNew}
                className="w-full bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black shadow-xl hover:bg-indigo-50 transition-all active:scale-95 text-lg"
            >
                New Ticket Entry
            </button>
            <div className="mt-8 pt-8 border-t border-white/10 w-full flex justify-around">
                <div className="text-center">
                    <p className="text-[10px] text-indigo-200 uppercase font-bold tracking-widest">Team Avg</p>
                    <p className="text-lg font-bold">2.4h</p>
                </div>
                <div className="text-center">
                    <p className="text-[10px] text-indigo-200 uppercase font-bold tracking-widest">SLA Health</p>
                    <p className="text-lg font-bold">98.2%</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;