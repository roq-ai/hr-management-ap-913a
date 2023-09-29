import { EmployeeInterface } from 'interfaces/employee';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PerformanceReviewInterface {
  id?: string;
  employee_id: string;
  review_date?: any;
  reviewer_id: string;
  performance_score?: number;
  comments?: string;
  recommendations?: string;
  created_at?: any;
  updated_at?: any;

  employee?: EmployeeInterface;
  user?: UserInterface;
  _count?: {};
}

export interface PerformanceReviewGetQueryInterface extends GetQueryInterface {
  id?: string;
  employee_id?: string;
  reviewer_id?: string;
  comments?: string;
  recommendations?: string;
}
