import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getPerformanceReviewById, updatePerformanceReviewById } from 'apiSdk/performance-reviews';
import { performanceReviewValidationSchema } from 'validationSchema/performance-reviews';
import { PerformanceReviewInterface } from 'interfaces/performance-review';
import { EmployeeInterface } from 'interfaces/employee';
import { UserInterface } from 'interfaces/user';
import { getEmployees } from 'apiSdk/employees';
import { getUsers } from 'apiSdk/users';

function PerformanceReviewEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<PerformanceReviewInterface>(
    () => (id ? `/performance-reviews/${id}` : null),
    () => getPerformanceReviewById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PerformanceReviewInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePerformanceReviewById(id, values);
      mutate(updated);
      resetForm();
      router.push('/performance-reviews');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<PerformanceReviewInterface>({
    initialValues: data,
    validationSchema: performanceReviewValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Performance Reviews',
              link: '/performance-reviews',
            },
            {
              label: 'Update Performance Review',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Performance Review
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="review_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Review Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.review_date ? new Date(formik.values?.review_date) : null}
              onChange={(value: Date) => formik.setFieldValue('review_date', value)}
            />
          </FormControl>

          <NumberInput
            label="Performance Score"
            formControlProps={{
              id: 'performance_score',
              isInvalid: !!formik.errors?.performance_score,
            }}
            name="performance_score"
            error={formik.errors?.performance_score}
            value={formik.values?.performance_score}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('performance_score', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.comments}
            label={'Comments'}
            props={{
              name: 'comments',
              placeholder: 'Comments',
              value: formik.values?.comments,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.recommendations}
            label={'Recommendations'}
            props={{
              name: 'recommendations',
              placeholder: 'Recommendations',
              value: formik.values?.recommendations,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<EmployeeInterface>
            formik={formik}
            name={'employee_id'}
            label={'Select Employee'}
            placeholder={'Select Employee'}
            fetcher={getEmployees}
            labelField={'job_title'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'reviewer_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/performance-reviews')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'performance_review',
    operation: AccessOperationEnum.UPDATE,
  }),
)(PerformanceReviewEditPage);
