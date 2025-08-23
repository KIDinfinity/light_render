import React, { Component } from 'react';
import { connect } from 'dva';
import FormLayout from 'basic/components/Form/FormLayout';
import { formUtils } from 'basic/components/Form';
import ContactAddress from '../../Section/ContactAddress';
import PartialWithDrawal from '../../Section/PartialWithDrawal';
import PayOutOption from '../../Section/PayOutOption';
import Refund from '../../Section/Refund';
import { TransactionTypeCode } from '../../Enum';
import styles from './index.less';

class PartialWithdrawal extends Component<any> {
  get isPartialWithdrawal() {
    return (
      formUtils.queryValue(this.props?.transactionType) === TransactionTypeCode.PartialWithDrawal
    );
  }

  get isRefund() {
    return formUtils.queryValue(this.props?.transactionType) === TransactionTypeCode.Refund;
  }

  render() {
    const {
      refund: { suspenseAmount },
      fundList,
    } = this.props;
    return (
      <div className={styles.container}>
        <FormLayout layConf={24}>
          {this.isPartialWithdrawal || this.isRefund ? <ContactAddress /> : <></>}
          {this.isRefund ? <Refund /> : <></>}
          {this.isPartialWithdrawal ? <PartialWithDrawal /> : <></>}
          {(this.isPartialWithdrawal && fundList?.length > 0) ||
            (this.isRefund && Number(formUtils.queryValue(suspenseAmount)) > 0) ? (
            //@ts-ignore
            <PayOutOption />
          ) : (
            <></>
          )}
        </FormLayout>
      </div>
    );
  }
}

export default connect(({ phowbDataCaptureController }: any) => ({
  transactionType:
    phowbDataCaptureController?.claimProcessData?.posDataDetail?.posRequestInformation
      ?.transactionType,
  refund: phowbDataCaptureController.claimProcessData.posDataDetail?.refund || {},
  fundList:
    phowbDataCaptureController.claimProcessData.posDataDetail.partialWithdrawal?.fundList || [],
}))(PartialWithdrawal);
