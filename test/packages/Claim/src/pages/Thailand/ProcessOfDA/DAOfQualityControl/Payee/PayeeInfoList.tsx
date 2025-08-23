import React, { Component } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import PayeeInfo from './PayeeInfo';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { formatMessageApi } from '@/utils/dictFormatMessage';

class PayeeInfoList extends Component {
  handleAdd = () => {
    const { dispatch }: any = this.props;

    dispatch({
      type: 'daOfClaimCaseController/addPayeeInfoItem',
    });
  };

  render() {
    const { payeeList, taskNotEditable }: any = this.props;
    const list = lodash.compact(payeeList);

    return (
      <div>
        {lodash.map(list, (item: any) => (
          <PayeeInfo key={item} payeeId={item} />
        ))}
        {!taskNotEditable && list.length < 1 && (
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

export default connect(({ daOfClaimCaseController, claimEditable }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  payeeList: lodash.get(daOfClaimCaseController, 'claimProcessData.payeeList'),
}))(PayeeInfoList);
