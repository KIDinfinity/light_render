import React, { Component } from 'react';
import { NAMESPACE } from '../activity.config';

import { connect } from 'dva';
import lodash from 'lodash';
import CardOfClaim from 'basic/components/Form/FormCard';
import { getDefaultPayeeId } from 'claim/pages/utils/getPayeeDefaultData';
import styles from './PayeeInfo.less';
import PayeeBasicInfo from './PayeeBasicInfo';

@connect(({ claimEditable, [NAMESPACE]: modelnamepsace }: any) => {
  const payeeListMap = lodash.get(modelnamepsace, 'claimEntities.payeeListMap');
  const payeeId = getDefaultPayeeId(payeeListMap);
  return {
    taskNotEditable: claimEditable.taskNotEditable,
    payeeId,
  };
})
class PayeeInfo extends Component {
  handleDelete = () => {
    const { dispatch, payeeId }: any = this.props;

    dispatch({
      type: `${NAMESPACE}/removePayeeItem`,
      payload: {
        payeeId,
      },
    });
  };

  render() {
    const { taskNotEditable }: any = this.props;
    return (
      <div className={styles.payee}>
        <CardOfClaim
          cardStyle={{ backgroundColor: 'var(--card-1-bg-color)' }}
          className={'card1BgColor'}
          showButton={!taskNotEditable}
          handleClick={this.handleDelete}
        >
          <PayeeBasicInfo />
        </CardOfClaim>
      </div>
    );
  }
}

export default PayeeInfo;
