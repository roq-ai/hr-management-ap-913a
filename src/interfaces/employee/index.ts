import { PerformanceReviewInterface } from 'interfaces/performance-review';
import { UserInterface } from 'interfaces/user';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface EmployeeInterface {
  id?: string;
  user_id: string;
  company_id: string;
  job_title?: string;
  start_date?: any;
  end_date?: any;
  salary?: number;
  department?: string;
  created_at?: any;
  updated_at?: any;
  employee_id?: string;
  performance_review?: PerformanceReviewInterface[];
  user?: UserInterface;
  company?: CompanyInterface;
  _count?: {
    performance_review?: number;
  };
}

export interface EmployeeGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  company_id?: string;
  job_title?: string;
  department?: string;
  employee_id?: string;
}
