import React from 'react';
import { useSelector } from 'react-redux';
import TabForm from '../../../components/TabForm';
import CategoryForm from '../../../components/CategoryForm';

export default function ModalManager() {
  const modalLookup = {
    TabForm,
    CategoryForm,
  };

  const currentModal = useSelector((state) => state.modals);

  let renderedModal;
  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];
    renderedModal = <ModalComponent {...modalProps} />;
  }

  return <span>{renderedModal}</span>;
}
