import React, { Component } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import TaskDefKey from 'enum/TaskDefKey';
import { formUtils } from 'basic/components/Form';
import ContactInformation from '../../Section/ContactInformation';
import MailingAddress from '../../Section/MailingAddress';
import ApplyToPoliciesList from '../../Section/ApplyToPoliciesList';
import { TransactionTypeCode } from '../../Enum';

class Info extends Component<any> {
  get isNotEditable() {
    const { taskDefKey } = this.props;
    return !lodash.includes([TaskDefKey.PH_POS_ACT001, TaskDefKey.PH_POS_ACT003], taskDefKey);
  }

  render() {
    const { policies } = this.props;
    const transactionType = formUtils.queryValue(this.props?.transactionType);
    return (
      <>
        {/**
        //@ts-ignore  */}
        {transactionType === TransactionTypeCode.ChangeAddressContactInfo && (
          <ContactInformation isNotEditable={this.isNotEditable} />
        )}
        {/**
        //@ts-ignore  */}
        {transactionType === TransactionTypeCode.ChangeAddressContactInfo && (
          <MailingAddress isNotEditable={this.isNotEditable} />
        )}
        {/**
        //@ts-ignore  */}
        {policies &&
          policies.length !== 0 &&
          policies.length &&
          transactionType === TransactionTypeCode.ChangeAddressContactInfo && (
            <ApplyToPoliciesList isNotEditable={this.isNotEditable} />
          )}
      </>
    );
  }
}
export default connect(({ processTask, phowbDataCaptureController }: any) => ({
  taskDefKey: processTask?.getTask?.taskDefKey,
  policies:
    phowbDataCaptureController.claimProcessData.posDataDetail?.applyToPolicies?.policies || {},
  transactionType:
    phowbDataCaptureController?.claimProcessData?.posDataDetail?.posRequestInformation
      ?.transactionType,
}))(Info);
