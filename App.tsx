
import React, { useState, useEffect } from 'react';
import { TicketData, ViewType } from './types';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import DataForm from './components/DataForm';
import DataTable from './components/DataTable';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('dashboard');
  const [tickets, setTickets] = useState<TicketData[]>([]);

  // Load initial mock data
  useEffect(() => {
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
  }, []);

  const handleAddTicket = (newTicket: TicketData) => {
    setTickets(prev => [newTicket, ...prev]);
    setView('table');
  };

  const handleDeleteTicket = (id: string) => {
    setTickets(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">
              S
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              Service Desk Tracker
            </h1>
          </div>
          <Navigation currentView={view} setView={setView} />
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {view === 'dashboard' && <Dashboard tickets={tickets} />}
        {view === 'form' && <DataForm onSubmit={handleAddTicket} onCancel={() => setView('dashboard')} />}
        {view === 'table' && <DataTable tickets={tickets} onDelete={handleDeleteTicket} />}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          &copy; 2024 Service Desk Enterprise Management. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
