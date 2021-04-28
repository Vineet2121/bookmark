import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalWrapper from '../app/common/modals/ModalWrapper';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../app/common/form/MyTextInput';
import { Button } from 'react-bootstrap';
import { FaCheck, FaWindowClose } from 'react-icons/fa';
import { closeModal } from '../app/common/modals/modalReducer';
import { newBookmarkTab, editBookmarkTab } from '../features/home/homeSlice';

const TabForm = () => {
  const dispatch = useDispatch();

  const selectedTab = useSelector((state) => state.home.selectedTab);
  const tabFormType = useSelector((state) => state.home.tabFormType);

  const initialValues =
    tabFormType === 'Edit'
      ? selectedTab
      : {
          tabName: '',
        };

  const validationSchema = Yup.object({
    tabName: Yup.string().required(),
  });

  return (
    <ModalWrapper
      size='mini'
      header={tabFormType === 'Edit' ? 'Rename Tab' : 'Add Tab'}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          tabFormType === 'New'
            ? dispatch(await newBookmarkTab(values))
            : dispatch(await editBookmarkTab(values, selectedTab.userTabID));
          resetForm({});
          setSubmitting(false);
          dispatch(closeModal());
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form className='ui form'>
            <MyTextInput name='tabName' placeholder='Tab name' />
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

export default TabForm;
