
import React, { useState } from 'react';
import { TicketData } from '../types';
import { TEAMS, STAGES, PRIORITIES, SLA_STATUSES } from '../constants';

interface DataFormProps {
  onSubmit: (data: TicketData) => void;
  onCancel: () => void;
}

const DataForm: React.FC<DataFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<TicketData>>({
    id: `T-${Math.floor(1000 + Math.random() * 9000)}`,
    helpdeskTeam: TEAMS[0],
    stage: STAGES[0],
    priority: 'Medium',
    slaStatus: 'In Progress',
    numberOfUsers: 1,
    createdOn: new Date().toISOString().slice(0, 16),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd calculate duration based on createdOn and closeDate here.
    onSubmit({
      ...formData,
      lastUpdatedOn: new Date().toISOString(),
      lastUpdatedBy: 'Current User',
      duration: formData.closeDate ? 'Calculated' : '-',
      durationValue: 0,
      monthTrend: 'Stable',
    } as TicketData);
  };

  const inputClass = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none";
  const labelClass = "block text-sm font-semibold text-slate-700 mb-1.5 ml-1";

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
      <div className="bg-slate-50 px-8 py-6 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Data Input</h2>
          <p className="text-slate-500 text-sm">Create a new helpdesk entry with full specifications.</p>
        </div>
        <div className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-widest">
            Ticket Entry
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        {/* Section 1: Basic Info */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Core Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>ID</label>
              <input name="id" value={formData.id} onChange={handleChange} className={inputClass} required readOnly />
            </div>
            <div>
              <label className={labelClass}>Display Name</label>
              <input name="displayName" value={formData.displayName || ''} onChange={handleChange} className={inputClass} placeholder="e.g., Server Outage Report" required />
            </div>
            <div>
              <label className={labelClass}>Helpdesk Team</label>
              <select name="helpdeskTeam" value={formData.helpdeskTeam} onChange={handleChange} className={inputClass}>
                {TEAMS.map(team => <option key={team} value={team}>{team}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Assigned To</label>
              <input name="assignedTo" value={formData.assignedTo || ''} onChange={handleChange} className={inputClass} placeholder="Staff Name" required />
            </div>
          </div>
        </div>

        {/* Section 2: Details */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Engagement Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClass}>Number of Users</label>
              <input type="number" name="numberOfUsers" value={formData.numberOfUsers} onChange={handleChange} className={inputClass} min="1" />
            </div>
            <div>
              <label className={labelClass}>Registered Customer</label>
              <input name="registeredCustomer" value={formData.registeredCustomer || ''} onChange={handleChange} className={inputClass} placeholder="Client Org Name" />
            </div>
            <div>
              <label className={labelClass}>Priority</label>
              <select name="priority" value={formData.priority} onChange={handleChange} className={inputClass}>
                {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Timeframes */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Deadlines & Timeframes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className={labelClass}>Created On</label>
              <input type="datetime-local" name="createdOn" value={formData.createdOn} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>SLA Deadline</label>
              <input type="datetime-local" name="slaDeadline" value={formData.slaDeadline || ''} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Close Date</label>
              <input type="datetime-local" name="closeDate" value={formData.closeDate || ''} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>SLA Status</label>
              <select name="slaStatus" value={formData.slaStatus} onChange={handleChange} className={inputClass}>
                {SLA_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Section 4: Location & Responsibility */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Location & Ownership</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className={labelClass}>City of Address</label>
              <input name="cityOfAddress" value={formData.cityOfAddress || ''} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Sub Area</label>
              <input name="subArea" value={formData.subArea || ''} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Stage</label>
              <select name="stage" value={formData.stage} onChange={handleChange} className={inputClass}>
                {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>MR Responsible</label>
              <input name="mrResponsible" value={formData.mrResponsible || ''} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>MR Team Leader</label>
              <input name="mrTeamLeader" value={formData.mrTeamLeader || ''} onChange={handleChange} className={inputClass} />
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Save Entry
          </button>
        </div>
      </form>
    </div>
  );
};

export default DataForm;
