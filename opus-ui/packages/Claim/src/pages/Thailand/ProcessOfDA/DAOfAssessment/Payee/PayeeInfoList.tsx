import React, { Component } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import PayeeInfo from './PayeeInfo';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { formatMessageApi } from '@/utils/dictFormatMessage';

@connect(({ daOfClaimAssessmentController, claimEditable }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  payeeList: lodash.get(daOfClaimAssessmentController, 'claimProcessData.payeeList'),
}))
class PayeeInfoList extends Component {
  handleAdd = () => {
    const { dispatch }: any = this.props;

    dispatch({
      type: 'daOfClaimAssessmentController/addPayeeInfoItem',
    });
  };

  render() {
    const { payeeList, taskNotEditable }: any = this.props;

    return (
      <div>
        {lodash.map(lodash.compact(payeeList), (item: any) => (
          <PayeeInfo key={item} payeeId={item} />
        ))}
        {!taskNotEditable && Array.isArray(payeeList) && payeeList.length === 0 && (
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
