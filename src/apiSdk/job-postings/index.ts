import queryString from 'query-string';
import { JobPostingInterface, JobPostingGetQueryInterface } from 'interfaces/job-posting';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getJobPostings = async (
  query?: JobPostingGetQueryInterface,
): Promise<PaginatedInterface<JobPostingInterface>> => {
  return fetcher('/api/job-postings', {}, query);
};

export const createJobPosting = async (jobPosting: JobPostingInterface) => {
  return fetcher('/api/job-postings', { method: 'POST', body: JSON.stringify(jobPosting) });
};

export const updateJobPostingById = async (id: string, jobPosting: JobPostingInterface) => {
  return fetcher(`/api/job-postings/${id}`, { method: 'PUT', body: JSON.stringify(jobPosting) });
};

export const getJobPostingById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/job-postings/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteJobPostingById = async (id: string) => {
  return fetcher(`/api/job-postings/${id}`, { method: 'DELETE' });
};
