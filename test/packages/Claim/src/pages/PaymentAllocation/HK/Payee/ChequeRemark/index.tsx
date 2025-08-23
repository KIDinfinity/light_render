import type { FunctionComponent } from 'react';
import React from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { withContextData } from '@/components/_store';
import ChequeRemarkItem from './ChequeRemarkItem';

import styles from './styles.less';

export interface IProps {
  withData?: any;
}

const ChequeRemark: FunctionComponent<IProps> = ({ taskNotEditable, dispatch, withData }: any) => {
  const payeeId = lodash.get(withData, 'payeeItem.id', '');
  const chequeRemarks = lodash.get(withData, 'payeeItem.claimChequeRemarkList', '');

  const addChequeRemark = () => {
    dispatch({
      type: 'paymentAllocation/addChequeRemark',
      payload: {
        payeeId,
      },
    });
  };

  return (
    <>
      {lodash.map(chequeRemarks, (chequeRemark, idx: string) => {
        return <ChequeRemarkItem remarkItem={chequeRemark} key={`${idx}`} />;
      })}
      {!taskNotEditable && (
        <ButtonOfClaim
          handleClick={addChequeRemark}
          className={styles.AddPayee}
          buttonText={formatMessageApi({
            Label_BPM_Button: 'AddChequeRemark',
          })}
        />
      )}
    </>
  );
};

export default connect(({ claimEditable }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
}))(withContextData(ChequeRemark));
