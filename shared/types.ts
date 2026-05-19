export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface DashboardStats {
  pendingTasks: number;
  budgetUsed: number;
  projectsActive: number;
  contractsActive: number;
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'manager' | 'staff';
  department: string;
}

export interface ProjectType {
  id: string;
  name: string;
  parentId?: string;
  level: number;
  attributes: string[];
}

export interface ProjectPhase {
  id: string;
  name: string;
  projectId: string;
  startDate: string;
  endDate: string;
  progress: number;
  tasks: ProjectTask[];
}

export interface ProjectTask {
  id: string;
  name: string;
  phaseId: string;
  assignee: string;
  plannedTime: string;
  actualTime?: string;
  status: 'pending' | 'in_progress' | 'completed';
  deliverables: string[];
}

export interface Project {
  id: string;
  name: string;
  code: string;
  department: string;
  responsibleDepartment: string;
  priority: 'high' | 'medium' | 'low';
  budget: number;
  usedBudget: number;
  progress: number;
  status: 'planning' | 'active' | 'completed';
  startDate: string;
  endDate: string;
  typeId: string;
  typeName: string;
  phases: ProjectPhase[];
  annual: string;
}

export interface Budget {
  id: string;
  category: string;
  allocated: number;
  used: number;
  remaining: number;
  period: string;
}

export interface IncomeBudget {
  id: string;
  type: string;
  amount: number;
  department: string;
  status: 'draft' | 'submitted' | 'approved';
  period: string;
}

export interface Contract {
  id: string;
  name: string;
  partyA: string;
  partyB: string;
  amount: number;
  startDate: string;
  endDate: string;
  status: 'draft' | 'active' | 'expired';
  templateId: string;
  performanceBond: number;
  warrantyBond: number;
  paidAmount: number;
  paymentSchedule: PaymentSchedule[];
}

export interface PaymentSchedule {
  id: string;
  contractId: string;
  dueDate: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  applicant: string;
}

export interface Risk {
  id: string;
  title: string;
  level: 'low' | 'medium' | 'high';
  category: string;
  description: string;
  status: 'identified' | 'mitigating' | 'resolved';
}

export interface Asset {
  id: string;
  name: string;
  type: string;
  value: number;
  purchaseDate: string;
  status: 'available' | 'in_use' | 'maintenance';
  department: string;
}

export interface PerformanceMetric {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  period: string;
}

export interface PurchaseType {
  id: string;
  name: string;
  code: string;
  description: string;
}

export interface PurchaseIntention {
  id: string;
  projectId: string;
  projectName: string;
  budgetAmount: number;
  description: string;
  expectedDate: string;
  status: 'draft' | 'approved' | 'published';
  publishUrl?: string;
  publishDate?: string;
}

export interface PurchaseApplication {
  id: string;
  intentionId: string;
  projectId: string;
  typeId: string;
  method: string;
  estimatedAmount: number;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  createTime: string;
}

export interface PaymentRequest {
  id: string;
  expenseId: string;
  amount: number;
  method: string;
  status: 'pending' | 'approved' | 'paid';
}

export interface ContractTemplate {
  id: string;
  name: string;
  type: string;
  content: string;
}

export interface Account {
  id: string;
  name: string;
  type: string;
  bank: string;
  accountNumber: string;
}

export interface IncomeRecord {
  id: string;
  budgetId: string;
  amount: number;
  accountId: string;
  date: string;
  status: 'draft' | 'approved';
}

export interface PreApplication {
  id: string;
  applicant: string;
  reason: string;
  amount: number;
  type: string;
  status: 'pending' | 'approved' | 'rejected' | 'canceled';
  createTime: string;
}

export interface PerformanceEvaluation {
  id: string;
  projectId: string;
  projectName: string;
  selfEvaluation: string;
  deviation: string;
  deviationReason: string;
  supportingMaterials: string[];
  period: string;
  status: 'draft' | 'submitted' | 'reviewed';
}

export interface DataStore {
  users: User[];
  projectTypes: ProjectType[];
  projects: Project[];
  budgets: Budget[];
  incomeBudgets: IncomeBudget[];
  contracts: Contract[];
  expenses: Expense[];
  risks: Risk[];
  assets: Asset[];
  performanceMetrics: PerformanceMetric[];
  purchaseTypes: PurchaseType[];
  purchaseIntentions: PurchaseIntention[];
  purchaseApplications: PurchaseApplication[];
  contractTemplates: ContractTemplate[];
  accounts: Account[];
  incomeRecords: IncomeRecord[];
  preApplications: PreApplication[];
  performanceEvaluations: PerformanceEvaluation[];
}
