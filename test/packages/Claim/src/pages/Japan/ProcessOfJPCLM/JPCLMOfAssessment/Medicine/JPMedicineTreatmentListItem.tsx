import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import CardOfClaim from 'basic/components/Form/FormCard';
import{ v4 as  uuidv4 } from 'uuid';
import { JPTREATMENTDATE } from '@/utils/claimConstant';
import JPTreatmentDateListItem from './JPTreatmentDateListItem';
import { VLD_000114 } from '@/utils/validations';
import json from '../FormLayout.json';

const FORMID_PREFIX = 'medicineItem';

@connect(
  (
    { dictionaryController, JPCLMOfClaimAssessmentController, formCommonController, claimEditable },
    { medicineId }
  ) => ({
    dictsOfMedicineType: dictionaryController.MedicineType,
    dictsOfPublicInsuranceJp: dictionaryController.PublicInsurance,
    medicineItem:
      JPCLMOfClaimAssessmentController.claimEntities.jpMedicineTreatmentListMap[medicineId],
    jpTreatmentDateList:
      JPCLMOfClaimAssessmentController.claimEntities.jpMedicineTreatmentListMap[medicineId]
        ?.jpTreatmentDateList,
    medicineTreatmentType:
      JPCLMOfClaimAssessmentController.claimEntities.jpMedicineTreatmentListMap[medicineId]
        ?.medicineTreatmentType,
    publicInsurance:
      JPCLMOfClaimAssessmentController.claimEntities.jpMedicineTreatmentListMap[medicineId]
        ?.publicInsurance,
    claimNo: JPCLMOfClaimAssessmentController?.claimProcessData?.claimNo,
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, medicineId, treatmentId, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'JPCLMOfClaimAssessmentController/saveEntry',
            target: 'saveMedicineListItem',
            payload: {
              changedFields,
              treatmentId,
              medicineId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'JPCLMOfClaimAssessmentController/saveFormData',
          target: 'saveMedicineListItem',
          payload: {
            changedFields,
            treatmentId,
            medicineId,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { medicineItem } = props;

    return formUtils.mapObjectToFields(medicineItem, {
      treatmentDate: (value) => (value ? moment(value) : null),
    });
  },
})
class JPMedicineTreatmentListItem extends PureComponent {
  componentDidMount = () => {
    this.registeForm();
  };

  unRegisterForm = () => {
    const { dispatch, form, medicineId } = this.props;

    if (medicineId) {
      setTimeout(() => {
        dispatch(
          {
            type: 'formCommonController/unRegisterForm',
            payload: {
              form,
              formId: `${FORMID_PREFIX}_${medicineId}`,
            },
          },
          0
        );
      });
    }
  };

  registeForm = () => {
    const { dispatch, form, medicineId } = this.props;

    if (medicineId) {
      setTimeout(() => {
        dispatch(
          {
            type: 'formCommonController/registerForm',
            payload: {
              form,
              formId: `${FORMID_PREFIX}_${medicineId}`,
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

  handleDelete = () => {
    const { dispatch, treatmentId, medicineId } = this.props;

    dispatch({
      type: 'JPCLMOfClaimAssessmentController/removeMedicineItem',
      payload: {
        treatmentId,
        medicineId,
      },
    });
  };

  handleAddDateOfTreatment = () => {
    const { dispatch, treatmentId, medicineId, claimNo } = this.props;
    const addDateOfTreatmentItem = {
      ...JPTREATMENTDATE,
      claimNo,
      id: uuidv4(),
      treatmentId,
      medicineId,
    };

    dispatch({
      type: 'JPCLMOfClaimAssessmentController/addDateOfTreatment',
      payload: {
        addDateOfTreatmentItem,
        medicineId,
      },
    });
  };

  render() {
    const {
      form,
      dictsOfMedicineType,
      dictsOfPublicInsuranceJp,
      incidentId,
      treatmentId,
      medicineId,
      jpTreatmentDateList,
      publicInsurance,
      taskNotEditable,
    } = this.props;
    const VLD000114 = VLD_000114(publicInsurance);

    return (
      <CardOfClaim showButton={!taskNotEditable} handleClick={this.handleDelete}>
        <Form layout="vertical">
          <FormLayout json={json}>
            <FormItemSelect
              form={form}
              disabled={taskNotEditable}
              dicts={dictsOfMedicineType}
              required
              formName="medicineTreatmentType"
              labelId="app.navigator.JPCA-of-manual-assessment.label.medicine-type"
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              required
              formName="medicineName"
              labelId="app.navigator.JPCA-of-manual-assessment.label.medicine-name"
              maxLength={100}
              // rules={[{ required: VLD000112, message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000117' }) }]}
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              formName="diagnosisName"
              labelId="app.navigator.JPCA-of-manual-assessment.label.diagnosis-name"
              maxLength={60}
            />
            <FormItemSelect
              form={form}
              disabled={taskNotEditable}
              required
              dicts={dictsOfPublicInsuranceJp}
              formName="publicInsurance"
              labelId="app.navigator.JPCA-of-manual-assessment.label.public-insurance"
              // rules={[{ required: VLD000113, message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000119' }) }]}
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              formName="publicInsuranceNo"
              labelId="app.navigator.JPCA-of-manual-assessment.label.public-insurance-no"
              maxLength={20}
              required={VLD000114}
              // rules={[{ required: VLD000114, message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000121' }) }]}
              name="row16"
            />
          </FormLayout>
          <FormLayout json={json}>
            {jpTreatmentDateList &&
              jpTreatmentDateList.length > 0 &&
              lodash.map(jpTreatmentDateList, (id, DateOfTreatmentItemIndex) => (
                <JPTreatmentDateListItem
                  incidentId={incidentId}
                  treatmentId={treatmentId}
                  medicineId={medicineId}
                  treatmentDateId={id}
                  key={id}
                  DateOfTreatmentItemIndex={DateOfTreatmentItemIndex}
                  // rules={[{ required: VLD000115, message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000123' }) }]}
                />
              ))}
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default JPMedicineTreatmentListItem;
