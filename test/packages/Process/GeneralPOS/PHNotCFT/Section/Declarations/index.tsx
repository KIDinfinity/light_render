import React from 'react';
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
  usTaxInformation: any;
  validating: boolean;
  submited: boolean;
  taskDefKey: string;
}

const Declarations = (props: IProps) => {
  const { form, taskDefKey, usTaxInformation, taskNotEditable, submited } = props;
  const isRadioNotEditable =
    taskNotEditable ||
    !(
      form.getFieldValue('taxDeclarationsFlag') ||
      formUtils.queryValue(usTaxInformation?.taxDeclarationsFlag)
    );

  const isNotEditable =
    taskNotEditable || ![TaskDefKey.PH_POS_ACT001, TaskDefKey.PH_POS_ACT003].includes(taskDefKey);
  const validation = !!VLD_000289(usTaxInformation)?.length;
  return (
    <FormSection
      form={form}
      formId={FormId.ContactAddress}
      title={
        <>
          {formatMessageApi({
            Label_BIZ_Claim: 'venus_claim.phowb.dataCapture.label.uSTaxDeclarations.title',
          })}
          {submited && validation && (
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
        disabled={isNotEditable}
        formName="taxDeclarationsFlag"
        labelId="venus_claim.phowb.dataCapture.label.uSTaxDeclarations.describe"
      />
      <FormLayout layConf={{ default: 6, identificationNumber: 8 }}>
        <FormItemInput
          form={form}
          disabled={isNotEditable || isRadioNotEditable}
          formName="cardNo"
          labelId="venus_claim.phowb.dataCapture.label.uSTaxDeclarations.no"
        />
        <FormItemInput
          form={form}
          formName="identificationNo"
          disabled={isNotEditable || isRadioNotEditable}
          name="identificationNumber"
          labelId="venus_claim.phowb.dataCapture.label.uSTaxDeclarations.number"
        />
      </FormLayout>
      <FormLayout layConf={24}>
        <FormItemInput
          form={form}
          disabled={isNotEditable || isRadioNotEditable}
          formName="residenceAddress"
          labelId="venus_claim.phowb.dataCapture.label.uSTaxDeclarations.address"
        />
      </FormLayout>
    </FormSection>
  );
};

export default connect(
  ({ claimEditable, GeneralPOSPHNotCFTController, processTask, formCommonController }: any) => ({
    taskNotEditable: claimEditable?.taskNotEditable,
    usTaxInformation:
      GeneralPOSPHNotCFTController?.claimProcessData?.businessData?.transactionTypes?.[0]
        ?.usTaxInformation || {},
    taskDefKey: processTask?.getTask?.taskDefKey,
    submited: formCommonController.submited,
  })
)(
  Form.create({
    onFieldsChange(props: IProps, changedFields: any) {
      const { dispatch } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: 'GeneralPOSPHNotCFTController/saveFormData',
          target: 'updateUsTaxInformation',
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { usTaxInformation } = props;
      return formUtils.mapObjectToFields(usTaxInformation, {});
    },
  })(Declarations)
);
