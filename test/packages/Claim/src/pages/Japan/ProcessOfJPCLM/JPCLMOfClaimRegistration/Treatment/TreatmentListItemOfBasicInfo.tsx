import React, { Component } from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import type { FormComponentProps } from 'antd/lib/form';
import type { IIncident } from '@/dtos/claim';
import { VLD_000018, VLD_000056, VLD_000057 } from 'claim/pages/validators/fieldValidators';
import FormLayout from 'basic/components/Form/FormLayout';
import {
  FormItemDatePicker,
  FormItemInput,
  FormItemCheckbox,
  FormItemSelect,
  formUtils,
} from 'basic/components/Form';
import { TreatmentType } from '../Utils/constant';
import layout from './Layout';

const FORMID_PREFIX = 'treatmentListItem';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  incidentItem: IIncident;
  treatmentId: string;
  incidentId: string;
}

@connect(
  (
    { JPCLMOfClaimRegistrationController, dictionaryController, formCommonController }: any,
    { treatmentId }: any
  ) => ({
    dictsOfTreatmentType: dictionaryController.TreatmentType,
    treatmentItem: JPCLMOfClaimRegistrationController.claimEntities.treatmentListMap[treatmentId],
    validating: formCommonController.validating,
  })
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating, treatmentId } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'JPCLMOfClaimRegistrationController/saveEntry',
            target: 'saveTreatmentItem',
            payload: {
              changedFields,
              treatmentId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'JPCLMOfClaimRegistrationController/saveFormData',
          target: 'saveTreatmentItem',
          payload: {
            changedFields,
            treatmentId,
          },
        });
      }
    }
  },
  mapPropsToFields(props: any) {
    const { treatmentItem } = props;
    return formUtils.mapObjectToFields(treatmentItem, {
      treatmentType: (value: any) => value,
      dateOfAdmissionString: (value: any) => (value ? moment(value) : null),
      dateOfDischargeString: (value: any) => (value ? moment(value) : null),
      medicalProvider: (value: any) => value,
      icu: (value) => value === 1,
      icuFromDateString: (value) => (value ? moment(value) : null),
      icuToDateString: (value) => (value ? moment(value) : null),
    });
  },
})
class TreatmentListItemOfBasicInfo extends Component<IProps> {
  registeForm = () => {
    const { dispatch, form, treatmentId } = this.props;

    if (treatmentId) {
      dispatch({
        type: 'formCommonController/registerForm',
        payload: {
          form,
          formId: `${FORMID_PREFIX}_${treatmentId}`,
        },
      });
    }
  };

  componentDidMount = () => {
    this.registeForm();
  };

  unRegisterForm = () => {
    const { dispatch, form, treatmentId } = this.props;

    if (treatmentId) {
      dispatch({
        type: 'formCommonController/unRegisterForm',
        payload: {
          form,
          formId: `${FORMID_PREFIX}_${treatmentId}`,
        },
      });
    }
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  render() {
    const { form, dataEditable, treatmentItem, dictsOfTreatmentType }: any = this.props;
    const dataNotEditable = !dataEditable;
    const VLD000088 = form.getFieldValue('treatmentType') === TreatmentType.IPD;
    const VLD000090 = form.getFieldValue('icu') === true;
    const noValidate = formUtils.queryValue(treatmentItem.treatmentType) === TreatmentType.OP;

    return (
      <Form layout="vertical">
        <FormLayout json={layout}>
          <FormItemSelect
            form={form}
            disabled={dataNotEditable}
            formName="treatmentType"
            dicts={dictsOfTreatmentType}
            labelId="app.navigator.task-detail-of-data-capture.label.treatment-type"
          />
          <FormItemDatePicker
            form={form}
            required={VLD000088}
            disabled={dataNotEditable}
            formName="dateOfAdmissionString"
            labelId="app.navigator.task-detail-of-data-capture.label.date-of-admission"
          />
          <FormItemDatePicker
            form={form}
            required={VLD000088}
            disabled={dataNotEditable}
            formName="dateOfDischargeString"
            rules={[
              {
                validator: VLD_000018(
                  formUtils.queryValue(lodash.get(treatmentItem, 'dateOfAdmissionString'))
                ),
              },
            ]}
            labelId="app.navigator.task-detail-of-data-capture.label.date-of-discharge"
          />
          <FormItemInput
            form={form}
            disabled={dataNotEditable}
            formName="medicalProvider"
            labelId="app.navigator.task-detail-of-data-capture.label.medical-provider"
            name="medicalProvider"
          />
          <FormItemCheckbox
            form={form}
            disabled={dataNotEditable}
            formName="icu"
            labelId="app.navigator.task-detail-of-data-capture.label.intensive-care-unit"
          />
          <FormItemDatePicker
            form={form}
            required={VLD000090}
            disabled={dataNotEditable}
            formName="icuFromDateString"
            rules={[
              {
                validator: VLD_000056(
                  formUtils.queryValue(lodash.get(treatmentItem, 'dateOfAdmissionString')),
                  !noValidate
                ),
              },
            ]}
            labelId="app.navigator.task-detail-of-data-capture.label.from-date"
          />
          <FormItemDatePicker
            form={form}
            required={VLD000090}
            disabled={dataNotEditable}
            formName="icuToDateString"
            rules={[
              {
                validator: VLD_000057(
                  formUtils.queryValue(lodash.get(treatmentItem, 'icuFromDateString'))
                ),
              },
            ]}
            labelId="app.navigator.task-detail-of-data-capture.label.to-date"
          />
        </FormLayout>
      </Form>
    );
  }
}

export default TreatmentListItemOfBasicInfo;
