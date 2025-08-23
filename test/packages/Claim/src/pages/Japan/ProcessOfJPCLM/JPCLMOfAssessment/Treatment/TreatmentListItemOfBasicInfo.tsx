import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import moment from 'moment';

import { formUtils } from 'basic/components/Form';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemCheckbox from 'basic/components/Form/FormItem/FormItemCheckbox';
import lodash from 'lodash';
import {
  VLD_000056,
  VLD_000057,
  VLD_000018,
  VLD000190,
  VLD000191,
} from 'claim/pages/validators/fieldValidators';
import json from '../FormLayout.json';

const FORMID_PREFIX = 'treatmentListItem';

@connect(
  (
    { dictionaryController, JPCLMOfClaimAssessmentController, formCommonController, claimEditable },
    { treatmentId }
  ) => ({
    dictsOfTreatmentType: dictionaryController.TreatmentType,
    medicalProviderDropdown: dictionaryController.medicalProviderDropdown?.list,
    treatmentItem: JPCLMOfClaimAssessmentController.claimEntities.treatmentListMap[treatmentId],
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, incidentId, treatmentId, validating } = props;

    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'JPCLMOfClaimAssessmentController/saveEntry',
            target: 'saveTreatmentItem',
            payload: {
              changedFields,
              incidentId,
              treatmentId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'JPCLMOfClaimAssessmentController/saveFormData',
          target: 'saveTreatmentItem',
          payload: {
            changedFields,
            incidentId,
            treatmentId,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { treatmentItem } = props;

    return formUtils.mapObjectToFields(treatmentItem, {
      treatmentType: (value) => value,
      icuToDate: (value) => (value ? moment(value) : null),
      dateOfAdmission: (value) => (value ? moment(value) : null),
      dateOfDischarge: (value) => (value ? moment(value) : null),
      icuFromDate: (value) => (value ? moment(value) : null),
      icu: (value) => value === 1,
    });
  },
})
class TreatmentListItemOfBasicInfo extends PureComponent {
  getHospitalizationDate = async () => {
    const { dispatch, treatmentId } = this.props;
    const result = await dispatch({
      type: 'JPCLMOfClaimAssessmentController/getHospitalizationDate',
      payload: {
        treatmentId,
      },
    });
    return result;
  };

  registeForm = () => {
    const { dispatch, form, treatmentId } = this.props;

    if (treatmentId) {
      setTimeout(() => {
        dispatch(
          {
            type: 'formCommonController/registerForm',
            payload: {
              form,
              formId: `${FORMID_PREFIX}_${treatmentId}`,
            },
          },
          0
        );
      });
    }
  };

  componentDidMount = () => {
    this.registeForm();
  };

  unRegisterForm = () => {
    const { dispatch, form, treatmentId } = this.props;

    if (treatmentId) {
      setTimeout(() => {
        dispatch(
          {
            type: 'formCommonController/unRegisterForm',
            payload: {
              form,
              formId: `${FORMID_PREFIX}_${treatmentId}`,
            },
          },
          0
        );
      });
    }
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  render() {
    const { form, dictsOfTreatmentType, treatmentItem, taskNotEditable, incidentId } = this.props;
    const VLD_000088 = form.getFieldValue('treatmentType') === 'IP';
    const VLD_000089 = VLD_000088;
    const VLD_000090 = form.getFieldValue('icu') === true;
    const VLD_000091 = VLD_000090;

    return (
      <Form layout="vertical">
        <FormLayout json={json}>
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            required
            dicts={dictsOfTreatmentType}
            formName="treatmentType"
            labelId="app.navigator.task-detail-of-data-capture.label.treatment-type"
          />
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable || !VLD_000088}
            required={VLD_000088}
            rules={[{ validator: VLD000190(this.getHospitalizationDate, incidentId) }]}
            formName="dateOfAdmission"
            labelId="app.navigator.task-detail-of-data-capture.label.date-of-admission"
          />
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable || !VLD_000089}
            required={VLD_000089}
            rules={[
              {
                validator: VLD_000018(
                  formUtils.queryValue(lodash.get(treatmentItem, 'dateOfAdmission'))
                ),
              },
              { validator: VLD000191(this.getHospitalizationDate, incidentId) },
            ]}
            formName="dateOfDischarge"
            labelId="app.navigator.task-detail-of-data-capture.label.date-of-discharge"
          />
          <FormItemCheckbox
            form={form}
            disabled={taskNotEditable}
            formName="icu"
            labelId="app.navigator.task-detail-of-data-capture.label.intensive-care-unit"
          />
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable || !VLD_000090}
            required={VLD_000090}
            rules={[
              {
                validator: VLD_000056(
                  formUtils.queryValue(lodash.get(treatmentItem, 'dateOfAdmission'))
                ),
              },
            ]}
            formName="icuFromDate"
            labelId="app.navigator.task-detail-of-data-capture.label.from-date"
          />
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable || !VLD_000091}
            required={VLD_000091}
            formName="icuToDate"
            rules={[
              {
                validator: VLD_000057(
                  formUtils.queryValue(lodash.get(treatmentItem, 'icuFromDate'))
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
