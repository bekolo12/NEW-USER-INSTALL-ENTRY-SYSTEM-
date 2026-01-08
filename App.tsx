import React, { useState, useEffect } from 'react';
import { TicketData, ViewType } from './types.ts';
import Navigation from './components/Navigation.tsx';
import Dashboard from './components/Dashboard.tsx';
import DataForm from './components/DataForm.tsx';
import DataTable from './components/DataTable.tsx';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('dashboard');
  const [tickets, setTickets] = useState<TicketData[]>([]);

  // Listen for navigation events from Dashboard
  useEffect(() => {
    const handleNav = (e: any) => {
      if (e.detail && typeof e.detail === 'string') {
        setView(e.detail as ViewType);
      } else {
        setView('form');
      }
    };
    window.addEventListener('nav-to-form', handleNav);
    return () => window.removeEventListener('nav-to-form', handleNav);
  }, []);

  // Load initial mock data
  useEffect(() => {
    const stored = localStorage.getItem('service-desk-tickets');
    if (stored) {
      setTickets(JSON.parse(stored));
    } else {
      const mockData: TicketData[] = [
        {
          id: 'T-1001',
          displayName: 'VPN Connectivity Issue',
          helpdeskTeam: 'Infrastructure',
          assignedTo: 'John Doe',
          numberOfUsers: 5,
          registeredCustomer: 'Global Corp',
          createdOn: '2023-10-01T09:00',
          lastUpdatedOn: '2023-10-02T14:30',
          lastUpdatedBy: 'System',
          closeDate: '',
          duration: '1d 5h',
          priority: 'High',
          slaDeadline: '2023-10-01T17:00',
          stage: 'In Progress',
          cityOfAddress: 'New York',
          mrResponsible: 'Alice Smith',
          mrTeamLeader: 'Bob Wilson',
          subArea: 'Network',
          durationValue: 29,
          slaStatus: 'Breached',
          monthTrend: 'Upward'
        }
      ];
      setTickets(mockData);
    }
  }, []);

  // Persist tickets
  useEffect(() => {
    if (tickets.length > 0) {
      localStorage.setItem('service-desk-tickets', JSON.stringify(tickets));
    }
  }, [tickets]);

  const handleAddTicket = (newTicket: TicketData) => {
    setTickets(prev => [newTicket, ...prev]);
    setView('table');
  };

  const handleDeleteTicket = (id: string) => {
    if (confirm('Are you sure you want to delete this record?')) {
      setTickets(prev => prev.filter(t => t.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-200 text-xl transform -rotate-3">
              S
            </div>
            <div>
              <h1 className="text-lg font-extrabold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                Service Desk
              </h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Enterprise Tracker</p>
            </div>
          </div>
          <Navigation currentView={view} setView={setView} />
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {view === 'dashboard' && <Dashboard tickets={tickets} />}
        {view === 'form' && <DataForm onSubmit={handleAddTicket} onCancel={() => setView('dashboard')} />}
        {view === 'table' && <DataTable tickets={tickets} onDelete={handleDeleteTicket} />}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
          <p>&copy; 2024 Service Desk Enterprise Management. v1.0.2</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              System Online
            </span>
            <button className="hover:text-indigo-600 transition-colors">Support Center</button>
            <button className="hover:text-indigo-600 transition-colors">Privacy Policy</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;