import React, { Component } from 'react';
import { NAMESPACE } from '../activity.config';

import { connect } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ChequeRemarkItem from './ChequeRemarkItem';
import Btn from 'claim/components/Button';
import styles from './styles.less';

@connect(({ [NAMESPACE]: modelnamepsace, claimEditable }: any, { payeeId }: any) => {
  return {
    payee: lodash.get(modelnamepsace, `claimEntities.payeeListMap[${payeeId}]`),
    taskNotEditable: claimEditable.taskNotEditable,
  };
})
class ChequeRemark extends Component {
  render() {
    const { payee, dispatch, taskNotEditable }: any = this.props;
    const claimChequeRemarkList = lodash.get(payee, 'claimChequeRemarkList');

    const addChequeRemark = () => {
      dispatch({
        type: `${NAMESPACE}/addChequeRemark`,
      });
    };

    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <span>
            {formatMessageApi({
              Label_BIZ_Claim: 'ChequeRemarkSection',
            })}
          </span>
          {!taskNotEditable && (
            <Btn.AddButton
              handleClick={addChequeRemark}
              icon="plus"
              className={styles.PanelOtherAddWrap}
              shape="circle"
              size="small"
            />
          )}
        </div>
        {lodash.map(claimChequeRemarkList, (chequeRemark, idx: string) => (
          <ChequeRemarkItem remarkItem={chequeRemark} key={`${idx}`} />
        ))}
      </div>
    );
  }
}

export default ChequeRemark;
