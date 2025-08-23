import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';

import FormSection from 'basic/components/Form/FormSection';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { FormLayout, FormItemInput, FormItemCheckbox, formUtils } from 'basic/components/Form';
import { FormId } from '../../Enum';
import TaskDefKey from 'enum/TaskDefKey';
import { VLD_000289 } from '../../validators/errorWarn';

interface IProps {
  dispatch: Dispatch<any>;
  form: any;
  taskNotEditable?: boolean;
  usTaxDeclarations: object;
  validating: boolean;
}

class Declarations extends Component<IProps> {
  get isRadioNotEditable() {
    const { form, taskDefKey, usTaxDeclarations, taskNotEditable } = this.props;
    const checked =
      form.getFieldValue('checked') || formUtils.queryValue(usTaxDeclarations?.checked);
    return taskNotEditable || !checked;
  }

  get isNotEditable() {
    const { form, taskDefKey, usTaxDeclarations, taskNotEditable } = this.props;
    return (
      taskNotEditable || ![TaskDefKey.PH_POS_ACT001, TaskDefKey.PH_POS_ACT003].includes(taskDefKey)
    );
  }

  get VLD_000289() {
    return !!VLD_000289(this.props?.usTaxDeclarations)?.length;
  }

  render() {
    const { form, taskNotEditable, usTaxDeclarations, validating, submited }: any = this.props;
    return (
      <FormSection
        form={form}
        formId={FormId.ContactAddress}
        title={
          <>
            {formatMessageApi({
              Label_BIZ_Claim: 'venus_claim.phowb.dataCapture.label.uSTaxDeclarations.title',
            })}
            {submited && this.VLD_000289 && (
              <ErrorTooltipManual
                manualErrorMessage={
                  <>
                    <p>
                      {formatMessageApi({
                        Label_COM_WarningMessage: 'ERR_000281',
                      })}
                    </p>
                  </>
                }
              />
            )}
          </>
        }
        sectionTitle="uSTaxDeclarations"
        layConf={24}
        isMargin
      >
        <FormItemCheckbox
          form={form}
          name="checked"
          disabled={this.isNotEditable}
          formName="checked"
          labelId="venus_claim.phowb.dataCapture.label.uSTaxDeclarations.describe"
        />
        <FormLayout layConf={{ default: 6, identificationNumber: 8 }}>
          <FormItemInput
            form={form}
            disabled={this.isNotEditable || this.isRadioNotEditable}
            formName="cardNo"
            labelId="venus_claim.phowb.dataCapture.label.uSTaxDeclarations.no"
          />
          <FormItemInput
            form={form}
            formName="identificationNumber"
            disabled={this.isNotEditable || this.isRadioNotEditable}
            name="identificationNumber"
            labelId="venus_claim.phowb.dataCapture.label.uSTaxDeclarations.number"
          />
        </FormLayout>
        <FormLayout layConf={24}>
          <FormItemInput
            form={form}
            disabled={this.isNotEditable || this.isRadioNotEditable}
            formName="address"
            labelId="venus_claim.phowb.dataCapture.label.uSTaxDeclarations.address"
          />
        </FormLayout>
      </FormSection>
    );
  }
}

export default connect(
  ({ formCommonController, claimEditable, phowbDataCaptureController, processTask }: any) => ({
    taskNotEditable: claimEditable?.taskNotEditable,
    usTaxDeclarations:
      phowbDataCaptureController?.claimProcessData?.posDataDetail?.usTaxDeclarations || {},
    validating: formCommonController?.validating,
    taskDefKey: processTask?.getTask?.taskDefKey,
    submited: formCommonController.submited,
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
              target: 'updateUsTaxDeclarations',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'phowbDataCaptureController/saveFormData',
            target: 'updateUsTaxDeclarations',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { usTaxDeclarations } = props;
      return formUtils.mapObjectToFields(usTaxDeclarations, {});
    },
  })(Declarations)
);
