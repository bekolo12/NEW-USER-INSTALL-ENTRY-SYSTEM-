
export interface TicketData {
  id: string;
  displayName: string;
  helpdeskTeam: string;
  assignedTo: string;
  numberOfUsers: number;
  registeredCustomer: string;
  createdOn: string;
  lastUpdatedOn: string;
  lastUpdatedBy: string;
  closeDate: string;
  duration: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  slaDeadline: string;
  stage: string;
  cityOfAddress: string;
  mrResponsible: string;
  mrTeamLeader: string;
  subArea: string;
  durationValue: number;
  slaStatus: 'Met' | 'Breached' | 'In Progress';
  monthTrend: string;
}

export type ViewType = 'dashboard' | 'form' | 'table';
