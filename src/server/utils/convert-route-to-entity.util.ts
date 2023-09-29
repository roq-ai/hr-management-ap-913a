const mapping: Record<string, string> = {
  applications: 'application',
  companies: 'company',
  employees: 'employee',
  'job-postings': 'job_posting',
  'performance-reviews': 'performance_review',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
