import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { closeModal } from './modalReducer';

export default function ModalWrapper({ children, size, header }) {
  const dispatch = useDispatch();

  let { showModal } = useSelector((state) => state.modals);

  const [show, setShow] = useState(true);

  useEffect(() => {
    if (showModal) {
      setShow(true);
    }
  }, [showModal]);

  // const handleClose = () => {
  //   dispatch(closeModal());
  //   setShow(false);
  // };

  // const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        show={show}
        onHide={() => dispatch(closeModal())}
        backdrop='static'
        keyboard={false}
        size={size}
      >
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body> {children}</Modal.Body>
        {/* <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>

      {/* <Modal open={true} onClose={() => dispatch(closeModal())} size={size}>
        {header && <Modal.Header>{header}</Modal.Header>}
        <Modal.Content>{children}</Modal.Content>
      </Modal> */}
    </>
  );
}
