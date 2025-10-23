import React from 'react';
import UploadDocumentsModal from './UploadDocumentsModal';
import ConfirmationModal from './ConfirmationModal';
import ErrorModal from './ErrorModal';
import SucessModal from './SucessModal';

const BatchCaseCreation = () => {
  return (
    <>
      <UploadDocumentsModal />
      <ConfirmationModal />
      <ErrorModal />
      <SucessModal />
    </>
  );
};

export default BatchCaseCreation;
