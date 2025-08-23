import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import FormSection, { FormItemSelect } from 'basic/components/Form/FormSection';
import TaskDefKey from 'enum/TaskDefKey';
import { FormId, NewAccountPayoutOption } from '../../Enum';

interface IProps {
  dispatch: Dispatch<any>;
  form: any;
  taskNotEditable?: boolean;
  validating: boolean;
}
class SourceBank extends Component<IProps> {
  componentDidMount() {
    const {
      payOutOption: { sourceBank, enrolledBankAccounts = [], newAccount = {} },
      Dropdown_POS_SrcBank_Check,
      Dropdown_POS_SrcBank_Bank,
      dispatch,
    } = this.props;
    const sourceBanekV = formUtils.queryValue(sourceBank);
    const value = formUtils.queryValue(newAccount.payOutOption);
    let dicts = [];
    if (
      lodash.some(enrolledBankAccounts, (item) => item.check) ||
      (!!newAccount?.check && value === NewAccountPayoutOption['02'])
    ) {
      dicts = Dropdown_POS_SrcBank_Bank;
    }
    if (!sourceBanekV) {
      const newSourceBanekV = lodash.isArray(dicts) && dicts.length ? dicts[0].dictCode : '';
      dispatch({
        type: 'phowbDataCaptureController/updateSourceBank',
        payload: {
          changedFields: {
            sourceBank: newSourceBanekV,
          },
        },
      });
    }
  }

  get source() {
    const {
      payOutOption: { enrolledBankAccounts = [], newAccount = {} },
      Dropdown_POS_SrcBank_Check,
      Dropdown_POS_SrcBank_Bank,
    } = this.props;
    const value = formUtils.queryValue(newAccount.payOutOption);
    if (
      lodash.some(enrolledBankAccounts, (item) => item.check) ||
      (!!newAccount?.check && value === NewAccountPayoutOption['02'])
    ) {
      return Dropdown_POS_SrcBank_Bank;
    }
    return Dropdown_POS_SrcBank_Check;
  }

  get isNotEditable() {
    const { taskNotEditable, taskDefKey }: any = this.props;
    return (
      taskNotEditable || ![TaskDefKey.PH_POS_ACT001, TaskDefKey.PH_POS_ACT003].includes(taskDefKey)
    );
  }

  render() {
    const { form } = this.props;

    return (
      <FormSection
        form={form}
        formId={FormId.SourceBank}
        layConf={8}
        isMargin={false}
        isPadding={false}
      >
        <FormItemSelect
          form={form}
          required
          disabled={this.isNotEditable}
          formName="sourceBank"
          labelTypeCode="Label_BIZ_POS"
          labelId="SrcBank"
          dicts={this.source}
        />
      </FormSection>
    );
  }
}

export default connect(
  ({
    claimEditable,
    formCommonController,
    dictionaryController,
    phowbDataCaptureController,
    processTask,
  }: any) => ({
    taskNotEditable: claimEditable?.taskNotEditable,
    validating: formCommonController?.validating,
    Dropdown_POS_SrcBank_Check: dictionaryController.Dropdown_POS_SrcBank_Check,
    Dropdown_POS_SrcBank_Bank: dictionaryController.Dropdown_POS_SrcBank_Bank,
    payOutOption: phowbDataCaptureController.claimProcessData?.posDataDetail?.payOutOption || {},
    taskDefKey: processTask?.getTask?.taskDefKey,
  })
)(
  Form.create({
    onFieldsChange(props: IProps, changedFields: any) {
      const { dispatch, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'phowbDataCaptureController/saveEntry',
              target: 'updateSourceBank',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'phowbDataCaptureController/saveFormData',
            target: 'updateSourceBank',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const {
        payOutOption: { sourceBank },
      }: any = props;
      return formUtils.mapObjectToFields({
        sourceBank,
      });
    },
  })(SourceBank)
);
