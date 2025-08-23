import React, { Component } from 'react';
import lodash from 'lodash';
import { Card } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import EnrolledBankAccout from './EnrolledBankAccout';
import NewAccount from './NewAccount';
import SourceBank from './SourceBank';
import styles from './index.less';

interface IProps {
  dispatch: Dispatch<any>;
  taskNotEditable: boolean;
  payOutOption: object;
}

class PayOutOption extends Component<IProps> {
  render() {
    const { enrolledBankAccounts }: any = this.props;
    return (
      <div className={styles.container}>
        <Card
          title={formatMessageApi({
            Label_BIZ_Claim: 'venus_claim.phowb.dataCapture.label.payOutOption.title',
          })}
        >
          {lodash.map(lodash.compact(enrolledBankAccounts), (item: any, index: number) => (
            //@ts-ignore
            <EnrolledBankAccout item={item} key={String(index)} />
          ))}

          <NewAccount />
          <SourceBank />
        </Card>
      </div>
    );
  }
}

export default connect(({ claimEditable, phowbDataCaptureController, processTask }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  taskDefKey: processTask?.getTask?.taskDefKey,

  enrolledBankAccounts:
    phowbDataCaptureController.claimProcessData?.posDataDetail?.payOutOption
      ?.enrolledBankAccounts || [],
  newAccount:
    phowbDataCaptureController.claimProcessData?.posDataDetail?.payOutOption?.newAccount || {},
}))(PayOutOption);
