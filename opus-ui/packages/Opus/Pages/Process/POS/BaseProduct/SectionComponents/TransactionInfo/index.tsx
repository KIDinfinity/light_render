import React from 'react';
import DetailsMap from './DetailsMap';
import { formUtils } from 'basic/components/Form';

const ServicingRequestInfo = ({ transactionId, transactionTypeCode, isNotDataCapture }) => {
  return (
    <DetailsMap
      transactionTypeCode={formUtils.queryValue(transactionTypeCode)}
      transactionId={transactionId}
      isNotDataCapture={isNotDataCapture}
    />
  );
};

export default ServicingRequestInfo;
