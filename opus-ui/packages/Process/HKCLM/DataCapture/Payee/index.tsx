import React, { Component } from 'react';
import { NAMESPACE } from '../activity.config';

import lodash from 'lodash';
import { connect } from 'dva';
import PayeeInfo from './PayeeInfo';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { getDefaultPayeeId } from 'claim/pages/utils/getPayeeDefaultData';
import { formatMessageApi } from '@/utils/dictFormatMessage';

@connect(({ [NAMESPACE]: modelnamepsace, claimEditable }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  payeeList: lodash.get(modelnamepsace, 'claimProcessData.payeeList'),
  payeeListMap: lodash.get(modelnamepsace, 'claimEntities.payeeListMap'),
}))
class PayeeInfoList extends Component {
  handleAdd = () => {
    const { dispatch }: any = this.props;

    dispatch({
      type: `${NAMESPACE}/addPayeeInfoItem`,
    });
  };

  render() {
    const { payeeList, taskNotEditable, payeeListMap }: any = this.props;
    const isExistDefault = getDefaultPayeeId(payeeListMap);
    return (
      <div>
        {!lodash.isEmpty(payeeList) && !!isExistDefault && <PayeeInfo />}
        {!taskNotEditable && Array.isArray(payeeList) && !isExistDefault && (
          <ButtonOfClaim
            handleClick={this.handleAdd}
            buttonText={formatMessageApi({
              Label_BIZ_Claim: 'venus-claim-label-payeeinfo',
            })}
          />
        )}
      </div>
    );
  }
}

export default PayeeInfoList;
