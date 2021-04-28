import React from 'react';
import { useField } from 'formik';
import { Col, Row } from 'react-bootstrap';

export default function MyTextInput({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <Row>
        <Col sm={8}>
          <label>{label}</label>
          <input className='form-control' {...field} {...props} />
          {meta.touched && meta.error ? (
            <div className='error'>{meta.error}</div>
          ) : null}
        </Col>
      </Row>
    </>
  );
}
