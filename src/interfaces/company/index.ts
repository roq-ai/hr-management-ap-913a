import { EmployeeInterface } from 'interfaces/employee';
import { JobPostingInterface } from 'interfaces/job-posting';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CompanyInterface {
  id?: string;
  description?: string;
  industry?: string;
  location?: string;
  founded_date?: any;
  website?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  employee?: EmployeeInterface[];
  job_posting?: JobPostingInterface[];
  user?: UserInterface;
  _count?: {
    employee?: number;
    job_posting?: number;
  };
}

export interface CompanyGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  industry?: string;
  location?: string;
  website?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
