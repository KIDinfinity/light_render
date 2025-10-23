import React from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import { Button } from 'antd';
import ButtonWithIcon from 'claim/components/ButtonWithIcon';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { SaveType } from '../Enum';
import styles from './index.less';

interface IProps {
  dispatch?: any;
  IdentifyHospitalBatchController?: any;
  taskDetail: any;
  taskNotEditable?: boolean;
  updateLoading?: any;
}

// @ts-ignore
@connect(({ claimEditable, loading, IdentifyHospitalBatchController }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  updateLoading: loading.effects['IdentifyHospitalBatchController/updateChangeFn'],
  invoiceInforTip: IdentifyHospitalBatchController?.claimProcessData?.invoiceInforTip,
  submitPaymentforTip: IdentifyHospitalBatchController?.claimProcessData?.submitPaymentforTip,
  submitPaymentLoading: loading.effects['IdentifyHospitalBatchController/submitPaymentFn'],
}))
class OptBtnGroup extends React.PureComponent<IProps> {
  updateChangeFn = async () => {
    const { dispatch, taskDetail } = this.props;
    await dispatch({
      type: 'IdentifyHospitalBatchController/updateChangeFn',
      payload: { isUpdateTotalInvoiceNo: { updateTotalInvoiceNo: 0 }, taskId: taskDetail?.taskId },
    });
    dispatch({
      type: 'IdentifyHospitalBatchController/refreshInformation',
      payload: {
        taskId: taskDetail?.taskId,
        saveType: SaveType.basic,
      },
    });
  };

  processInvoiceFn = async () => {
    const { dispatch, taskDetail } = this.props;

    dispatch({
      type: 'IdentifyHospitalBatchController/showProcessLoading',
      payload: {
        showProcessLoading: true,
      },
    });
    await dispatch({
      type: 'IdentifyHospitalBatchController/updateChangeFn',
      payload: { isUpdateTotalInvoiceNo: { updateTotalInvoiceNo: 0 }, taskId: taskDetail?.taskId },
    });
    await dispatch({
      type: 'IdentifyHospitalBatchController/refreshInformation',
      payload: {
        taskId: taskDetail?.taskId,
        saveType: SaveType.basic,
      },
    });
    await dispatch({
      type: 'IdentifyHospitalBatchController/processInvoiceFn',
      payload: { taskDetail },
    });
  };

  submitPaymentFn = async () => {
    const { dispatch, taskDetail } = this.props;
    dispatch({
      type: 'IdentifyHospitalBatchController/submitPaymentFn',
      payload: {
        taskId: taskDetail?.taskId,
      },
    });
  };

  render() {
    const {
      taskNotEditable,
      updateLoading,
      invoiceInforTip,
      submitPaymentLoading,
      submitPaymentforTip,
    } = this.props;
    return (
      <div className={styles.OptBtnGroup}>
        <Button onClick={this.updateChangeFn} disabled={taskNotEditable} loading={updateLoading}>
          {formatMessageApi({
            Label_BIZ_Claim: 'Update Change',
          })}
        </Button>
        <ButtonWithIcon
          handleClick={lodash.debounce(this.processInvoiceFn, 1000)}
          disabled={taskNotEditable}
          buttonText={formatMessageApi({
            Label_BIZ_Claim: 'Process Invoice',
          })}
          showIcon={!lodash.isEmpty(invoiceInforTip)}
          errors={invoiceInforTip}
        />
        <ButtonWithIcon
          handleClick={this.submitPaymentFn}
          disabled={taskNotEditable}
          loading={submitPaymentLoading}
          buttonText={formatMessageApi({
            Label_BIZ_Claim: 'Submit Payment',
          })}
          showIcon={!lodash.isEmpty(submitPaymentforTip)}
          errors={submitPaymentforTip}
        />
      </div>
    );
  }
}

export default OptBtnGroup;
