import React, { Component } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import FormSection, {
  FormItemInput,
  FormItemCheckbox,
  FormItemRadioGroup,
  FormItemSelect,
  FormLayout,
} from 'basic/components/Form/FormSection';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import TaskDefKey from 'enum/TaskDefKey';
import { FormId, TransactionTypeCode } from '../../Enum';
import { RequestTypeCode } from '../../Enum/IssuanceDuplicatePolicy';
import styles from './index.less';

class IssuanceDuplicatePolicy extends Component<any> {
  get isIssuanceDuplicatePolicy() {
    return (
      formUtils.queryValue(this.props?.transactionType) ===
      TransactionTypeCode.IssuanceDuplicatePolicy
    );
  }

  get isBankRequired() {
    const { requestForIssuanceOfDuplicatePolicy } = this.props;
    return formUtils.queryValue(requestForIssuanceOfDuplicatePolicy.sendTo) === 'B';
  }

  get isTimeNotEditable() {
    const { taskNotEditable, requestForIssuanceOfDuplicatePolicy, taskDefKey } = this.props;
    const { timeDisEnbled, timeOfReplacement } = requestForIssuanceOfDuplicatePolicy;
    return taskNotEditable || timeDisEnbled || taskDefKey === TaskDefKey.PH_POS_ACT006;
  }

  get isFreeOfChangeNotEditable() {
    const { form, taskNotEditable, taskDefKey } = this.props;
    const timeOfReplacement = form.getFieldValue('timeOfReplacement');
    const chargeFee = form.getFieldValue('chargeFee');
    return (
      taskNotEditable ||
      (!timeOfReplacement && lodash.isEmpty(timeOfReplacement)) ||
      Number(timeOfReplacement) === 1 ||
      taskDefKey === TaskDefKey.PH_POS_ACT006
    );
  }

  get freeOfChangeNotEditable() {
    const { taskNotEditable, taskDefKey } = this.props;
    return taskNotEditable || taskDefKey === TaskDefKey.PH_POS_ACT006;
  }

  get isBankNotEditable() {
    const { taskNotEditable, requestForIssuanceOfDuplicatePolicy, taskDefKey } = this.props;
    return (
      taskNotEditable ||
      formUtils.queryValue(requestForIssuanceOfDuplicatePolicy.sendTo) !== 'B' ||
      taskDefKey === TaskDefKey.PH_POS_ACT006
    );
  }

  get isRegConNotEditable() {
    const { taskNotEditable, requestForIssuanceOfDuplicatePolicy, taskDefKey } = this.props;
    return (
      taskNotEditable ||
      formUtils.queryValue(requestForIssuanceOfDuplicatePolicy.requestType) ===
        RequestTypeCode.OriginalPolicy ||
      taskDefKey === TaskDefKey.PH_POS_ACT006
    );
  }

  get isShowPosInForce() {
    const { taskDefKey, isPOSHistory } = this.props;
    return (
      [TaskDefKey.PH_POS_ACT006, TaskDefKey.PH_POS_ACT003].includes(taskDefKey) || isPOSHistory
    );
    PH_POS_ACT003;
  }

  render() {
    const {
      form,
      Dropdown_POS_Branch,
      Dropdown_POS_RequestPolicyType,
      Dropdown_POS_SendTo,
    } = this.props;

    const newDropdown_POS_SendTo = lodash.filter(
      Dropdown_POS_SendTo,
      (item: any) => item.dictCode !== 'E'
    );
    return (
      <div className={styles.container}>
        {this.isIssuanceDuplicatePolicy ? (
          <FormSection
            form={form}
            formId={FormId.IssuanceDuplicatePolicy}
            formatType="Label_BIZ_POS"
            title="DuplicatePolicy"
            layConf={{ default: 24, chargeFee: 4 }}
            isMargin
          >
            <FormLayout layConf={{ default: 4, freeOfChange: 3 }}>
              <FormItemInput
                form={form}
                formName="timeOfReplacement"
                required
                disabled={this.isTimeNotEditable}
                labelId={formatMessageApi({
                  Label_BIZ_POS: 'TimesofReplacement',
                })}
              />
              <FormItemCheckbox
                form={form}
                // @ts-ignore
                name="freeOfChange"
                disabled={this.isFreeOfChangeNotEditable}
                labelId={formatMessageApi({
                  Label_BIZ_POS: 'FreeofCharge',
                })}
                formName="freeOfChange"
              />
              <FormItemInput
                form={form}
                formName="chargeFee"
                disabled
                labelId={formatMessageApi({
                  Label_BIZ_POS: 'ChargeFee',
                })}
                suffix="PHP"
              />
              {this.isShowPosInForce && (
                <FormItemInput
                  form={form}
                  formName="payInStatus"
                  disabled
                  labelId={formatMessageApi({
                    Label_BIZ_POS: 'Pay-inStatus',
                  })}
                />
              )}
            </FormLayout>
            <FormLayout layConf={{ default: 9, regenerateContract: 4 }}>
              <FormItemRadioGroup
                form={form}
                labelId={formatMessageApi({
                  Label_BIZ_POS: 'RequestType',
                })}
                formName="requestType"
                name="requestType"
                required
                disabled={this.freeOfChangeNotEditable}
                dicts={Dropdown_POS_RequestPolicyType}
              />
              <FormItemCheckbox
                form={form}
                labelId={formatMessageApi({
                  Label_BIZ_POS: 'RegenerateContract',
                })}
                formName="regenerateContract"
                disabled={this.isRegConNotEditable}
                // @ts-ignore
                name="regenerateContract"
              />
            </FormLayout>

            <FormLayout layConf={{ default: 7, bankOtherCode: 4 }}>
              <FormItemRadioGroup
                form={form}
                labelId={formatMessageApi({
                  Label_BIZ_POS: 'SendTo',
                })}
                formName="sendTo"
                name="sendTo"
                required
                disabled={this.freeOfChangeNotEditable}
                dicts={newDropdown_POS_SendTo}
              />
              <FormItemSelect
                form={form}
                formName="branchCode"
                disabled={this.isBankNotEditable}
                required={this.isBankRequired}
                dicts={Dropdown_POS_Branch}
                labelId=" "
              />
            </FormLayout>
          </FormSection>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default connect(
  ({
    processTask,
    claimEditable,
    phowbDataCaptureController,
    formCommonController,
    dictionaryController,
  }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    taskDefKey: processTask?.getTask?.taskDefKey,
    transactionType:
      phowbDataCaptureController?.claimProcessData?.posDataDetail?.posRequestInformation
        ?.transactionType,
    validating: formCommonController.validating,
    requestForIssuanceOfDuplicatePolicy:
      phowbDataCaptureController.claimProcessData?.posDataDetail
        ?.requestForIssuanceOfDuplicatePolicy || {},
    Dropdown_POS_Branch: dictionaryController.Dropdown_POS_Branch,
    Dropdown_POS_RequestPolicyType: dictionaryController.Dropdown_POS_RequestPolicyType,
    Dropdown_POS_SendTo: dictionaryController.Dropdown_POS_SendTo,
    isPOSHistory: phowbDataCaptureController.isPOSHistory,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'phowbDataCaptureController/saveEntry',
              target: 'updateIssuanceDuplicatePolicy',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'phowbDataCaptureController/saveFormData',
            target: 'updateIssuanceDuplicatePolicy',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { requestForIssuanceOfDuplicatePolicy } = props;

      return formUtils.mapObjectToFields(requestForIssuanceOfDuplicatePolicy, {});
    },
  })(IssuanceDuplicatePolicy)
);
