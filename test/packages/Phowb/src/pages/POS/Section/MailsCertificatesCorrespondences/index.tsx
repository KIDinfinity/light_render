import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormSection, { FormItemRadioGroup, FormItemSelect } from 'basic/components/Form/FormSection';
import TaskDefKey from 'enum/TaskDefKey';
import { FormId, TransactionTypeCode } from '../../Enum';
import styles from './index.less';

class MailsCertificatesCorrespondences extends Component<any> {
  get isMailsCertificatesCorrespondences() {
    return (
      formUtils.queryValue(this.props?.transactionType) ===
      TransactionTypeCode.MailsCertificatesCorrespondences
    );
  }

  get isBankRequired() {
    const { requestOfMailsCertificatesCorrespondences } = this.props;
    return formUtils.queryValue(requestOfMailsCertificatesCorrespondences.sendTo) === 'B';
  }

  get isBankNotEditable() {
    const { taskNotEditable, requestOfMailsCertificatesCorrespondences } = this.props;
    return (
      taskNotEditable ||
      formUtils.queryValue(requestOfMailsCertificatesCorrespondences.sendTo) !== 'B'
    );
  }

  get isNotEditable() {
    const { taskNotEditable, taskDefKey } = this.props;
    return taskNotEditable || taskDefKey === TaskDefKey.PH_POS_ACT006;
  }

  render() {
    const {
      form,
      Dropdown_POS_MailType,
      Dropdown_POS_SendTo,
      Dropdown_POS_Branch,
    }: any = this.props;
    return (
      <div className={styles.container}>
        {this.isMailsCertificatesCorrespondences ? (
          <FormSection
            form={form}
            formId={FormId.MailsCertificatesCorrespondences}
            title={formatMessageApi({
              Label_BIZ_POS: 'MailsCertificatesCorrespondences',
            })}
            layConf={{
              default: 4,
              sendTo: 20,
            }}
            isMargin
          >
            <FormItemSelect
              form={form}
              disabled={this.isNotEditable}
              name="mailType"
              formName="mailType"
              labelId="MailType"
              required={!this.isNotEditable}
              dicts={Dropdown_POS_MailType}
            />
            {/**
        //@ts-ignore  */}
            <div name="sendTo" className={styles.sendTo}>
              <FormItemRadioGroup
                form={form}
                labelId="SendTo"
                formName="sendTo"
                disabled={this.isNotEditable}
                required={!this.isNotEditable}
                dicts={Dropdown_POS_SendTo}
              />
              <FormItemSelect
                form={form}
                // @ts-ignore
                className={styles.branchCode}
                disabled={this.isNotEditable || this.isBankNotEditable}
                formName="branchCode"
                labelId=" "
                required={!this.isNotEditable && this.isBankRequired}
                dicts={Dropdown_POS_Branch}
              />
            </div>
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
    claimEditable,
    phowbDataCaptureController,
    formCommonController,
    processTask,
    dictionaryController,
  }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    taskDefKey: processTask?.getTask?.taskDefKey,
    transactionType:
      phowbDataCaptureController?.claimProcessData?.posDataDetail?.posRequestInformation
        ?.transactionType,
    validating: formCommonController.validating,
    requestOfMailsCertificatesCorrespondences:
      phowbDataCaptureController.claimProcessData?.posDataDetail
        ?.requestOfMailsCertificatesCorrespondences || {},
    Dropdown_POS_MailType: dictionaryController.Dropdown_POS_MailType,
    Dropdown_POS_Branch: dictionaryController.Dropdown_POS_Branch,
    Dropdown_POS_SendTo: dictionaryController.Dropdown_POS_SendTo,
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
              target: 'updateMailsCertificatesCorrespondences',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'phowbDataCaptureController/saveFormData',
            target: 'updateMailsCertificatesCorrespondences',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { requestOfMailsCertificatesCorrespondences } = props;

      return formUtils.mapObjectToFields(requestOfMailsCertificatesCorrespondences, {});
    },
  })(MailsCertificatesCorrespondences)
);
