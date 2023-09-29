import { ApplicationInterface } from 'interfaces/application';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface JobPostingInterface {
  id?: string;
  title: string;
  description?: string;
  company_id: string;
  location?: string;
  posted_date?: any;
  closing_date?: any;
  salary?: number;
  created_at?: any;
  updated_at?: any;
  job_id?: string;
  application?: ApplicationInterface[];
  company?: CompanyInterface;
  _count?: {
    application?: number;
  };
}

export interface JobPostingGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  company_id?: string;
  location?: string;
  job_id?: string;
}
