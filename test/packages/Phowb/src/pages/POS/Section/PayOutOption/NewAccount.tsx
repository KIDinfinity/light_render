import React, { Component } from 'react';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Form, Radio } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { formUtils } from 'basic/components/Form';
import {
  FormLayout,
  FormItemInput,
  FormItemRadioGroup,
  FormItemSelectPlus,
  FormItemDatePicker,
} from 'basic/components/Form/FormSection';
import TaskDefKey from 'enum/TaskDefKey';
import { SeachCustom } from 'claim/pages/utils/claimUtils';
import { NewAccountPayoutOption, FormId } from 'phowb/pages/POS/Enum';
import { choicTypeList, TypeOfAccountList } from '../../_models/functions/getPayOutOption';
import styles from './index.less';

interface IProps {
  dispatch: Dispatch<any>;
  form: any;
  taskNotEditable: boolean;
  newAccount: object;
  validating: boolean;
}

const seachCustom: any = new SeachCustom();
const { handleBank, handleBankBranch } = seachCustom;

class NewAccount extends Component<IProps> {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  get isRequired() {
    const { newAccount }: any = this.props;
    return (
      formUtils.queryValue(newAccount.check) &&
      formUtils.queryValue(newAccount.payOutOption) === '02'
    );
  }

  get isTypeNotEditable() {
    const { taskNotEditable, taskDefKey, newAccount }: any = this.props;
    return (
      taskNotEditable ||
      ![TaskDefKey.PH_POS_ACT001, TaskDefKey.PH_POS_ACT003].includes(taskDefKey) ||
      !formUtils.queryValue(newAccount.check)
    );
  }

  get isNotEditable() {
    const { taskNotEditable, taskDefKey }: any = this.props;
    return (
      taskNotEditable ||
      ![TaskDefKey.PH_POS_ACT001, TaskDefKey.PH_POS_ACT003].includes(taskDefKey) ||
      !this.isRequired
    );
  }

  get isCheckNotEditable() {
    const { taskNotEditable, taskDefKey }: any = this.props;
    return (
      taskNotEditable || ![TaskDefKey.PH_POS_ACT001, TaskDefKey.PH_POS_ACT003].includes(taskDefKey)
    );
  }

  registeForm = () => {
    const { dispatch, form } = this.props;
    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: FormId.PayOutOption,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form } = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: FormId.PayOutOption,
      },
    });
  };

  handleRadioChange = () => {
    const { dispatch, newAccount } = this.props;
    dispatch({
      type: 'phowbDataCaptureController/updateNewPayOutOption',
      payload: {
        isChecked: true,
      },
    });
    if (newAccount?.payOutOption === NewAccountPayoutOption['01']) {
      dispatch({
        type: 'phowbDataCaptureController/updateSourceBank',
        payload: {
          changedFields: {
            sourceBank: '',
          },
        },
      });
    }
  };

  render() {
    const { form, newAccount, Dropdown_CFG_Currency }: any = this.props;

    return (
      <div className={styles.item}>
        <div className={styles.left}>
          <Radio
            disabled={this.isCheckNotEditable}
            checked={newAccount.check}
            onChange={this.handleRadioChange}
          />
        </div>
        <div className={styles.right}>
          <p>
            {formatMessageApi({
              Label_BIZ_Individual: 'NewAccount',
            })}
          </p>
          <Form layout="vertical">
            <FormLayout layConf={{ default: 6, branchCode: 10, bankAccountName: 8, other: 24 }}>
              <FormItemRadioGroup
                form={form}
                labelId="venus_claim.phowb.dataCapture.label.payOutOption.title"
                formName="payOutOption"
                name="choicType"
                dicts={choicTypeList}
                disabled={this.isTypeNotEditable}
                dictCode="code"
                dictName="name"
              />
              <FormItemSelectPlus
                // @ts-ignore
                form={form}
                disabled={this.isNotEditable}
                required={this.isRequired}
                formName="bankCode"
                searchName="bank"
                labelId="app.navigator.task-detail-of-data-capture.label.bank-code"
                optionShowType="both"
                searchCustom={handleBank}
              />
              <FormItemSelectPlus
                form={form}
                disabled={this.isNotEditable}
                required={this.isRequired}
                formName="branchCode"
                name="branchCode"
                searchName="bankBranch"
                labelId="venus_claim.phowb.dataCapture.label.payOutOption.branch"
                optionShowType="both"
                searchCustom={(postData: any) =>
                  handleBankBranch(postData, formUtils.queryValue(newAccount.bankCode))
                }
              />
              <FormItemInput
                form={form}
                required={this.isRequired}
                formName="bankAccountNo"
                disabled={this.isNotEditable}
                labelId={formatMessageApi({
                  Label_BIZ_Individual: 'AccountNumber',
                })}
              />
              <FormItemInput
                form={form}
                formName="securityCode"
                disabled={this.isNotEditable}
                labelId={formatMessageApi({
                  Label_BIZ_Individual: 'SecurityCode',
                })}
              />
              <FormItemInput
                form={form}
                required={this.isRequired}
                disabled={this.isNotEditable}
                name="bankAccountName"
                formName="bankAccountName"
                labelId={formatMessageApi({
                  Label_BIZ_Individual: 'AccountName',
                })}
              />
              <FormItemRadioGroup
                form={form}
                labelId={formatMessageApi({
                  Label_BIZ_Individual: 'TypeofAccount',
                })}
                formName="typeOfAccount"
                required={this.isRequired}
                disabled={this.isNotEditable}
                dicts={TypeOfAccountList}
                dictCode="code"
                dictName="name"
              />

              <FormItemRadioGroup
                form={form}
                labelId="venus_claim.phowb.dataCapture.label.payOutOption.currency"
                formName="currency"
                dicts={Dropdown_CFG_Currency}
                required={this.isRequired}
                disabled={this.isNotEditable}
              />
              <FormItemDatePicker
                form={form}
                disabled={this.isNotEditable}
                allowFreeSelect
                formName="activationDateFrom"
                labelId={formatMessageApi({
                  Label_BIZ_Individual: 'ActivationDateFrom',
                })}
                required={this.isRequired}
                format="L"
              />
              <FormItemDatePicker
                form={form}
                disabled={this.isNotEditable}
                formName="activationDateTo"
                allowFreeSelect
                labelId={formatMessageApi({
                  Label_BIZ_Individual: 'ActivationDateTo',
                })}
                required={this.isRequired}
                format="L"
              />
            </FormLayout>
          </Form>
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
    newAccount:
      phowbDataCaptureController.claimProcessData?.posDataDetail?.payOutOption?.newAccount || {},
    Dropdown_CFG_Currency: dictionaryController.Dropdown_CFG_Currency,
    Dropdown_CFG_AccountType: dictionaryController.Dropdown_CFG_AccountType,
    Dropdown_POS_SrcBank_Bank: dictionaryController.Dropdown_POS_SrcBank_Bank,
    validating: formCommonController.validating,
  })
)(
  Form.create({
    onFieldsChange(props: IProps, changedFields: any) {
      const { dispatch, validating, Dropdown_POS_SrcBank_Bank } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'phowbDataCaptureController/saveEntry',
              target: 'updateNewPayOutOption',
              payload: {
                changedFields,
                Dropdown_POS_SrcBank_Bank,
                isAuto: true,
              },
            });
          }, 0);
        } else {
          setTimeout(() => {
            dispatch({
              type: 'phowbDataCaptureController/saveFormData',
              target: 'updateNewPayOutOption',
              payload: {
                changedFields,
                Dropdown_POS_SrcBank_Bank,
                isAuto: false,
              },
            });
          }, 0);
        }
      }
    },
    mapPropsToFields(props) {
      const { newAccount } = props;
      return formUtils.mapObjectToFields(newAccount, {
        activationDateFrom: (value: any) => (value ? moment(value) : value),
        activationDateTo: (value: any) => (value ? moment(value) : value),
      });
    },
  })(NewAccount)
);
