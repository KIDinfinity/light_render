import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { getDefaultPayeeId } from 'claim/pages/utils/getPayeeDefaultData';
import Payee from './Payee';
import Add from './Add';

const PayeeInfoList = () => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);
  const payeeList = useSelector(
    (state: any) => state.opusClaimDataCapture.claimProcessData?.payeeList
  );
  const payeeListMap = useSelector(
    (state: any) => state.opusClaimDataCapture.claimEntities?.payeeListMap
  );

  const payeeId = getDefaultPayeeId(payeeListMap);
  const payeeItem = useSelector(
    (state: any) => state.opusClaimDataCapture.claimEntities?.payeeListMap?.[payeeId] || {}
  );
  return (
    <>
      {!lodash.isEmpty(payeeList) && !!payeeId && <Payee payeeItem={payeeItem} />}
      {editable && Array.isArray(payeeList) && lodash.isEmpty(payeeList) && <Add />}
    </>
  );
};

export default PayeeInfoList;
