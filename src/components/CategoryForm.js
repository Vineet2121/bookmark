import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalWrapper from '../app/common/modals/ModalWrapper';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../app/common/form/MyTextInput';
import { Button } from 'react-bootstrap';
import { FaCheck, FaWindowClose } from 'react-icons/fa';
import { closeModal } from '../app/common/modals/modalReducer';
import {
  newBookmarkCatgory,
  editBookmarkCategory,
} from '../features/category/categorySlice';

const CategoryForm = () => {
  const dispatch = useDispatch();

  const { userTabID } = useSelector((state) => state.home.selectedTab);

  const selectedCategory = useSelector(
    (state) => state.category.selectedCategory
  );
  const categoryFormType = useSelector(
    (state) => state.category.categoryFormType
  );

  const initialValues =
    categoryFormType === 'Edit'
      ? selectedCategory
      : {
          userTabID: userTabID,
          catName: '',
        };

  const validationSchema = Yup.object({
    catName: Yup.string().required(),
  });

  return (
    <ModalWrapper
      size='mini'
      header={categoryFormType === 'Edit' ? 'Rename Category' : 'Add Category'}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          categoryFormType === 'New'
            ? dispatch(await newBookmarkCatgory(values))
            : dispatch(
                await editBookmarkCategory(values, selectedCategory.userTabID)
              );
          resetForm({});
          setSubmitting(false);
          dispatch(closeModal());
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form className='ui form'>
            <MyTextInput name='catName' placeholder='Category name' />
            {errors.message && <label>{errors.message}</label>}
            <div className='float-right mt-2'>
              <Button
                type='submit'
                variant='primary'
                // loading={isSubmitting}
                disabled={!isValid || !dirty || isSubmitting}
              >
                <FaCheck /> Add
              </Button>{' '}
              <Button
                variant='secondary'
                onClick={() => dispatch(closeModal())}
              >
                <FaWindowClose /> Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default CategoryForm;
