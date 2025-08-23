import React, { Component } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { IDictionary } from '@/dtos/dicts';
import { formUtils } from 'basic/components/Form';
import moment from 'moment';
import { Form } from 'antd';
import FormSection, { FormItemDatePicker } from 'basic/components/Form/FormSection';
import { VLD_000213 } from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfQualityControl/ValidatorRules/Validators';
import { LayoutSection } from './Layout';

interface IProps {
  dispatch: Dispatch<any>;
  SideforOvariectomy: IDictionary[];
  formData: any;
  documentId: string;
  taskNotEditable: boolean;
  form: any;
}

class ProcedureItem5 extends Component<IProps> {
  render() {
    const {
      form,
      taskNotEditable,
      documentId,
      formData: { id },
      hysterectomy,
    } = this.props;
    return (
      <FormSection
        form={form}
        formId={`ProcedureItem5_${id}_${documentId}`}
        isHideBgColor
        isMargin={false}
        isPadding={false}
        layout={LayoutSection}
      >
        <FormItemDatePicker
          form={form}
          required={VLD_000213({ checkValue: hysterectomy })}
          disabled={taskNotEditable}
          formName="dateOfHysterectomy"
          labelId="claim.procedure.dateOfHysterectomy"
        />
      </FormSection>
    );
  }
}

export default connect(
  (
    { claimEditable, formCommonController, JPCLMOfQualityController }: any,
    { documentId }: any
  ) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    validating: formCommonController.validating,
    hysterectomy: formUtils.queryValue(
      lodash.get(
        JPCLMOfQualityController,
        `claimProcessData.claimEntities.bpoFormDataList.${documentId}.formData.hysterectomy`,
        ''
      )
    ),
  })
)(
  Form.create<IProps>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, formData, keyName, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, [
        'dateOfHysterectomy',
      ]);
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfQualityController/saveFormDataEntry',
              target: 'JPCLMOfQualityController/saveFormDataItem',
              payload: {
                changedFields: finalChangedFields,
                documentId,
                applicationNo,
                id: formData.id,
                keyName,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfQualityController/saveFormDataLatest',
            target: 'saveFormDataItem',
            payload: {
              changedFields: finalChangedFields,
              documentId,
              applicationNo,
              id: formData.id,
              keyName,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { formData } = props;
      return formUtils.mapObjectToFields(formData, {
        dateOfHysterectomy: (value: any) => (value ? moment(value) : null),
      });
    },
  })(ProcedureItem5)
);
