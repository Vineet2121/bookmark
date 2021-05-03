import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalWrapper from '../app/common/modals/ModalWrapper';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../app/common/form/MyTextInput';
import { Button } from 'react-bootstrap';
import { FaCheck, FaWindowClose } from 'react-icons/fa';
import { closeModal } from '../app/common/modals/modalReducer';
import { newBookmark } from '../features/bookmark/bookmarkSlice';

const BookmarkForm = () => {
  const dispatch = useDispatch();

  const currentCategory = useSelector(
    (state) => state.category.currentCategory
  );

  const selectedBookmark = useSelector(
    (state) => state.bookmark.selectedBookmark
  );
  const bookmarkFormType = useSelector(
    (state) => state.bookmark.bookmarkFormType
  );

  const initialValues =
    bookmarkFormType === 'Edit'
      ? selectedBookmark
      : {
          catID: currentCategory,
          title: '',
          url: '',
          tags: '',
          notes: '',
        };

  const validationSchema = Yup.object({
    title: Yup.string().required(),
    url: Yup.string().required(),
  });

  return (
    <ModalWrapper
      size='lg'
      header={bookmarkFormType === 'Edit' ? 'Rename Bookmark' : 'Add Bookmark'}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          bookmarkFormType === 'New'
            ? dispatch(await newBookmark(values))
            : dispatch(await newBookmark(values));
          resetForm({});
          setSubmitting(false);
          dispatch(closeModal());
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form className='ui form'>
            <MyTextInput name='title' placeholder='Title' />
            <MyTextInput name='url' placeholder='URL' />
            <MyTextInput name='tags' placeholder='Tags' />
            <MyTextInput name='notes' placeholder='Notes' />
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

export default BookmarkForm;
