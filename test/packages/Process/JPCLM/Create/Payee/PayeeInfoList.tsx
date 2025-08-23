import React, { Component } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import PayeeInfo from './PayeeInfo';

class PayeeInfoList extends Component {
  handleAdd = () => {
    const { dispatch }: any = this.props;

    dispatch({
      type: 'JPCLMProcessCreate/addPayeeInfoItem',
    });
  };

  render() {
    const { payeeList }: any = this.props;
    const list = lodash.compact(payeeList);

    return (
      <div>
        {lodash.map(list, (item: any) => (
          <PayeeInfo key={item} payeeId={item} />
        ))}
        {list.length < 1 && (
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

export default connect(({ JPCLMProcessCreate, claimEditable }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  payeeList: lodash.get(JPCLMProcessCreate, 'claimProcessData.payeeList'),
}))(PayeeInfoList);
