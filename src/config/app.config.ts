interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: ['Customer'],
  tenantRoles: ['Owner', 'HR Manager', 'Employee', 'Administrator', 'Applicant'],
  tenantName: 'Company',
  applicationName: 'HR Management Application',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Read job postings',
    'Create applications',
    'Read applications',
    'Update personal user information',
  ],
  ownerAbilities: ['Manage user data', 'Manage company data', 'Manage job postings', 'Manage applications'],
  getQuoteUrl: 'https://app.roq.ai/proposal/171e23ff-85f8-4d29-a79e-082015d265cf',
};
