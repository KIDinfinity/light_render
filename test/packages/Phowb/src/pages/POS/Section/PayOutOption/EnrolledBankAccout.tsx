import React, { Component } from 'react';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Form, Radio } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { formUtils } from 'basic/components/Form';
import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemInput, FormItemDatePicker } from 'basic/components/Form/FormItem';
import TaskDefKey from 'enum/TaskDefKey';
import styles from './index.less';

interface IProps {
  dispatch: Dispatch<any>;
  form: any;
  taskNotEditable: boolean;
  item: object;
  validating: boolean;
}

const basicLayout = {
  fieldLayout: {
    xs: { span: 6 },
    sm: { span: 6 },
    md: { span: 6 },
    lg: { span: 6 },
  },
};

class EnrolledBankAccout extends Component<IProps> {
  get isCheckNotEditable() {
    const { taskNotEditable, taskDefKey }: any = this.props;
    return (
      taskNotEditable || ![TaskDefKey.PH_POS_ACT001, TaskDefKey.PH_POS_ACT003].includes(taskDefKey)
    );
  }

  handleRadioChange = () => {
    const { dispatch, item, Dropdown_POS_SrcBank_Bank, payOutOption }: any = this.props;
    const { sourceBank } = payOutOption;
    const newSourceBank = Dropdown_POS_SrcBank_Bank[0]?.dictCode;
    dispatch({
      type: 'phowbDataCaptureController/updateEnrolledPayOutOption',
      payload: {
        accountNumber: item.accountNumber,
      },
    });
    if (formUtils.queryValue(sourceBank) !== formUtils.queryValue(newSourceBank)) {
      dispatch({
        type: 'phowbDataCaptureController/updateSourceBank',
        payload: {
          changedFields: {
            sourceBank: newSourceBank,
          },
        },
      });
    }
  };

  render() {
    const { form, item }: any = this.props;
    return (
      <div className={styles.item}>
        <div className={styles.left}>
          <Radio
            disabled={this.isCheckNotEditable}
            value={item.id}
            checked={item.check}
            onChange={this.handleRadioChange}
          />
        </div>
        <div className={styles.right}>
          <p>
            {formatMessageApi({
              Label_BIZ_Individual: 'EnrolledBank',
            })}
          </p>
          <Form layout="vertical">
            <FormLayout json={basicLayout}>
              <FormItemInput
                form={form}
                formName="policyOwner"
                disabled
                labelId={formatMessageApi({
                  Label_BIZ_POS: 'PolicyOwner',
                })}
              />
              <FormItemInput
                form={form}
                formName="bankCode"
                disabled
                labelId={formatMessageApi({
                  Label_BIZ_POS: 'BankBranchCode',
                })}
              />
              <FormItemInput
                form={form}
                formName="accountNumber"
                disabled
                labelId={formatMessageApi({
                  Label_BIZ_POS: 'AccountNumber',
                })}
              />
              <FormItemInput
                form={form}
                formName="accountName"
                disabled
                labelId={formatMessageApi({
                  Label_BIZ_POS: 'AccountName',
                })}
              />
              <FormItemInput
                form={form}
                formName="typeOfAccount"
                disabled
                labelId={formatMessageApi({
                  Label_BIZ_POS: 'TypeofAccount',
                })}
              />
              <FormItemInput
                form={form}
                formName="currency"
                disabled
                labelId="venus_claim.phowb.dataCapture.label.payOutOption.currency"
              />

              <FormItemDatePicker
                form={form}
                disabled
                formName="activationDateFrom"
                labelId={formatMessageApi({
                  Label_BIZ_POS: 'ActivationDateFrom',
                })}
                format="L"
              />
              <FormItemDatePicker
                form={form}
                disabled
                formName="activationDateTo"
                labelId={formatMessageApi({
                  Label_BIZ_POS: 'ActivationDateTo',
                })}
                format="L"
              />
            </FormLayout>
          </Form>
          <div />
        </div>
      </div>
    );
  }
}

export default connect(
  ({
    claimEditable,
    formCommonController,
    phowbDataCaptureController,
    processTask,
    dictionaryController,
  }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    taskDefKey: processTask?.getTask?.taskDefKey,
    payOutOption: phowbDataCaptureController.claimProcessData?.posDataDetail?.payOutOption || [],
    validating: formCommonController.validating,
    Dropdown_POS_SrcBank_Bank: dictionaryController.Dropdown_POS_SrcBank_Bank,
  })
)(
  Form.create({
    mapPropsToFields(props) {
      const { item } = props;

      return formUtils.mapObjectToFields(item, {
        activationDateFrom: (value: any) => (value ? moment(value) : value),
        activationDateTo: (value: any) => (value ? moment(value) : value),
      });
    },
  })(EnrolledBankAccout)
);
