import React from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'dva';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import SectionTitle from 'claim/components/SectionTitle';
import { getDefaultPayeeId } from 'claim/pages/utils/getPayeeDefaultData';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Payee from './Payee';

const PayeeInfoList = () => {
  const dispatch = useDispatch();
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);
  const payeeList = useSelector(
    (state: any) => state.JPCLMOfDataCapture.claimProcessData?.payeeList
  );
  const payeeListMap = useSelector(
    (state: any) => state.JPCLMOfDataCapture.claimEntities?.payeeListMap
  );

  const handleAdd = () => {
    dispatch({
      type: 'JPCLMOfDataCapture/payeeAdd',
    });
  };

  const payeeId = getDefaultPayeeId(payeeListMap);

  return (
    <div>
      <SectionTitle
        title={formatMessageApi({
          Label_BIZ_Claim:
            'app.navigator.task-detail-of-data-capture.title.payee-information.upper',
        })}
      />
      {!lodash.isEmpty(payeeList) && !!payeeId && <Payee payeeId={payeeId} />}
      {editable && Array.isArray(payeeList) && !payeeId && (
        <ButtonOfClaim
          handleClick={handleAdd}
          buttonText={formatMessageApi({
            Label_BIZ_Claim: 'venus-claim-label-payeeinfo',
          })}
        />
      )}
    </div>
  );
};

export default PayeeInfoList;
