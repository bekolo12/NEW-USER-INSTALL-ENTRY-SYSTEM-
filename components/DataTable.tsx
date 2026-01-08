import React, { useState } from 'react';
import { TicketData } from '../types.ts';

interface DataTableProps {
  tickets: TicketData[];
  onDelete: (id: string) => void;
}

const DataTable: React.FC<DataTableProps> = ({ tickets, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTickets = tickets.filter(t => 
    t.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.registeredCustomer?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportToExcel = () => {
    const XLSX = (window as any).XLSX;
    if (!XLSX) {
        alert("The Excel export module is still loading. Please wait a moment.");
        return;
    }
    
    const exportData = tickets.map(({ ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Incident Records");
    XLSX.writeFile(workbook, `Service_Desk_Export_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in">
      <div className="px-8 py-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white sticky left-0">
        <div>
          <h2 className="text-xl font-black text-slate-800">Records Repository</h2>
          <p className="text-slate-500 text-sm font-medium">Monitoring {filteredTickets.length} active service entries</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search IDs, clients, or staff..."
              className="pl-10 pr-4 py-2.5 bg-slate-100 border-2 border-transparent rounded-xl text-sm w-full md:w-72 focus:bg-white focus:border-indigo-500 outline-none transition-all font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <button
            onClick={handleExportToExcel}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-black shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95 whitespace-nowrap"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export to Excel
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Reference</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Subject / Client</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Assignee</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Priority</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Stage</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">SLA Performance</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 text-right">Ops</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredTickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-indigo-50/30 transition-colors group">
                <td className="px-6 py-5">
                  <span className="font-mono text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{ticket.id}</span>
                </td>
                <td className="px-6 py-5">
                  <div className="font-bold text-slate-800">{ticket.displayName}</div>
                  <div className="text-xs text-slate-400 font-bold">{ticket.registeredCustomer}</div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500">
                      {ticket.assignedTo.charAt(0)}
                    </div>
                    <span className="text-sm text-slate-600 font-medium">{ticket.assignedTo}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm ${
                    ticket.priority === 'Urgent' ? 'bg-rose-600 text-white' :
                    ticket.priority === 'High' ? 'bg-orange-500 text-white' :
                    ticket.priority === 'Medium' ? 'bg-indigo-500 text-white' :
                    'bg-slate-500 text-white'
                  }`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-sm text-slate-700 font-bold bg-slate-100 px-3 py-1 rounded-full">{ticket.stage}</span>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter ${
                    ticket.slaStatus === 'Breached' ? 'bg-rose-100 text-rose-700 border border-rose-200' :
                    ticket.slaStatus === 'Met' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                    'bg-amber-100 text-amber-700 border border-amber-200'
                  }`}>
                    {ticket.slaStatus}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <button 
                    onClick={() => onDelete(ticket.id)}
                    className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    title="Delete Entry"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
            {filteredTickets.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-20 text-center text-slate-400 italic font-medium">
                  No records found matching your current search parameters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;