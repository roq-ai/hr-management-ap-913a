import * as yup from 'yup';

export const employeeValidationSchema = yup.object().shape({
  job_title: yup.string().nullable(),
  start_date: yup.date().nullable(),
  end_date: yup.date().nullable(),
  salary: yup.number().integer().nullable(),
  department: yup.string().nullable(),
  employee_id: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
  company_id: yup.string().nullable().required(),
});
