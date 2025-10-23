import React from 'react';

import { useDispatch } from 'dva';
import { FormBorderCard } from 'basic/components/Form';
import { ServiceItem } from 'process/Components/BussinessControls';

const LYDCItem = (props: any) => {
  const { NAMESPACE, editable, invoiceId, serviceItemId } = props;
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/removeServiceItem`,
      payload: {
        invoiceId,
        serviceItemId,
      },
    });
  };

  return (
    <FormBorderCard
      marginBottom
      type="weight"
      button={{ visiable: editable, callback: handleDelete }}
      backgroundColorName={'card4BgColor'}
    >
      <ServiceItem.SectionBasic {...props} />
    </FormBorderCard>
  );
};
export default LYDCItem;
