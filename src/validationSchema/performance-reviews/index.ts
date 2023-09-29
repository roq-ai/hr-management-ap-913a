import * as yup from 'yup';

export const performanceReviewValidationSchema = yup.object().shape({
  review_date: yup.date().nullable(),
  performance_score: yup.number().integer().nullable(),
  comments: yup.string().nullable(),
  recommendations: yup.string().nullable(),
  employee_id: yup.string().nullable().required(),
  reviewer_id: yup.string().nullable().required(),
});
