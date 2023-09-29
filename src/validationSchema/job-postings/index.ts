import * as yup from 'yup';

export const jobPostingValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().nullable(),
  location: yup.string().nullable(),
  posted_date: yup.date().nullable(),
  closing_date: yup.date().nullable(),
  salary: yup.number().integer().nullable(),
  job_id: yup.string().nullable(),
  company_id: yup.string().nullable().required(),
});
