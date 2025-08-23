import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Collapse } from 'antd';
import { formUtils } from 'basic/components/Form';
import moment from 'moment';
import memo from 'memoize-one';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import transInsuredType from '../_models/functions/transInsuredType';

import json from '../FormLayout.json';
import {
  VLD_000082,
  VLD_000084,
  VLD_000085,
  VLD_000111,
  VLD_000123,
  VLD_000124,
  VLD_000125,
  VLD_000186,
} from '@/utils/validations';
import styles from './IncidentListItemOfBasicInfoItem.less';

const { Panel } = Collapse;
const FORMID_PRFIX = 'incidentListItemOfItem';
const memoTransInsuredType = memo(transInsuredType);
@connect(
  (
    { dictionaryController, JPCLMOfClaimAssessmentController, formCommonController, claimEditable },
    { incidentId }
  ) => ({
    dictsOfWaivedReason: dictionaryController.WaivedReason,
    dictsOfInsuredType: dictionaryController.InsuredType,
    dictsOfACauseOfDeathJp: dictionaryController.causeOfDeath,
    dictsOfHighlyDisabilityCode: dictionaryController.HighlyDisabilityCode,
    dictsOfMeetDemand: dictionaryController.MeetDemand,
    dictsOfDrinking: dictionaryController.Drinking,
    dictsOfDrivingLicense: dictionaryController.DrivingLicense,
    dictsOfCervicalCancerCin: dictionaryController.CervicalCancerCin,
    dictsOfLaborConstrainedOfAmi: dictionaryController.LaborConstrainedOfAmi,
    dictsOfSequelaeOfStroke: dictionaryController.SequelaeOfStroke,
    jpIncident:
      JPCLMOfClaimAssessmentController.claimEntities.incidentListMap[incidentId].jpIncident,
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, incidentId, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'JPCLMOfClaimAssessmentController/saveEntry',
            target: 'saveJpIncidentItem',
            payload: {
              changedFields,
              incidentId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'JPCLMOfClaimAssessmentController/saveFormData',
          target: 'saveJpIncidentItem',
          payload: {
            changedFields,
            incidentId,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { jpIncident } = props;

    return formUtils.mapObjectToFields(jpIncident, {
      disabilityDegreeDate: (value) => (value ? moment(value) : null),
      requiringNursingDate: (value) => (value ? moment(value) : null),
      deathDate: (value) => (value ? moment(value) : null),
      paymentDate: (value) => (value ? moment(value) : null),
      insuredType: (value) => memoTransInsuredType(value),
    });
  },
})
class IncidentListItemOfBasicInfoItem extends PureComponent {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form, incidentId } = this.props;
    if (incidentId) {
      setTimeout(() => {
        dispatch(
          {
            type: 'formCommonController/registerForm',
            payload: {
              form,
              formId: `${FORMID_PRFIX}_${incidentId}`,
            },
          },
          0
        );
      });
    }
  };

  unRegisterForm = () => {
    const { dispatch, form, incidentId } = this.props;

    if (incidentId) {
      setTimeout(() => {
        dispatch(
          {
            type: 'formCommonController/unRegisterForm',
            payload: {
              form,
              formId: `${FORMID_PRFIX}_${incidentId}`,
            },
          },
          0
        );
      });
    }
  };

  render() {
    const {
      form,
      dictsOfWaivedReason,
      dictsOfInsuredType,
      dictsOfACauseOfDeathJp,
      dictsOfHighlyDisabilityCode,
      dictsOfDrinking,
      dictsOfDrivingLicense,
      dictsOfCervicalCancerCin,
      dictsOfLaborConstrainedOfAmi,
      dictsOfSequelaeOfStroke,
      dictsOfMeetDemand,
      claimTypeArray,
      taskNotEditable,
    } = this.props;
    const VLD000082 = VLD_000082(claimTypeArray, 'WOP');
    const VLD000084 = VLD_000084(claimTypeArray, 'DTH');
    const VLD000085 = VLD_000085(claimTypeArray, 'DTH');
    const VLD000111 = VLD_000111(form);
    const VLD000123 = VLD_000123(claimTypeArray, 'TPD');
    const VLD000124 = VLD_000124(claimTypeArray, 'TPD');
    const VLD000125 = VLD_000125(claimTypeArray, '08');
    const VLD000186 = VLD_000186(claimTypeArray, 'CI');

    return (
      <Form layout="vertical">
        <FormLayout json={json}>
          <FormItemSelect
            form={form}
            disabled={taskNotEditable || !VLD000082}
            required={VLD000082}
            dicts={dictsOfWaivedReason}
            formName="waivedReason"
            labelId="app.navigator.task-detail-of-data-capture.label.waived-reason"
          />
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable}
            required={VLD000186}
            formName="paymentDate"
            labelId="venus_claim.JPCA-of-manual-assessment.label.date-of-payment"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            required
            dicts={dictsOfInsuredType}
            formName="insuredType"
            labelId="app.navigator.task-detail-of-data-capture.label.insured-type"
          />
        </FormLayout>
        <FormLayout json={json}>
          <FormItemSelect
            form={form}
            disabled={taskNotEditable || !VLD000123}
            required={VLD000123}
            dicts={dictsOfHighlyDisabilityCode}
            formName="highlyDisabilityCode"
            labelId="app.navigator.JPCA-of-manual-assessment.label.highly-disability-code"
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable || !VLD000124}
            required={VLD000124}
            formName="disabilityName"
            labelId="app.navigator.JPCA-of-manual-assessment.label.disability-name"
          />
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable}
            formName="disabilityDegreeDate"
            labelId="app.navigator.task-detail-of-claim-assessment.label.disability-identification-date"
          />
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable || !VLD000125}
            required={VLD000125}
            formName="requiringNursingDate"
            labelId="app.navigator.JPCA-of-manual-assessment.label.date-of-requring-nursing"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            dicts={dictsOfCervicalCancerCin}
            formName="cervicalCancerCin"
            labelId="app.navigator.JPCA-of-manual-assessment.label.cervical-cancer-cin"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            dicts={dictsOfLaborConstrainedOfAmi}
            formName="laborConstrainedOfAmi"
            labelId="app.navigator.JPCA-of-manual-assessment.label.labor-constrained-of-ami"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            dicts={dictsOfSequelaeOfStroke}
            formName="sequelaeOfStroke"
            labelId="app.navigator.JPCA-of-manual-assessment.label.sequelae-of-stroke"
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable || !VLD000111}
            required={VLD000111}
            formName="sequelaeNameOfStroke"
            labelId="app.navigator.JPCA-of-manual-assessment.label.sequelae-name-of-stroke"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            dicts={dictsOfDrinking}
            formName="drinking"
            labelId="app.navigator.JPCA-of-manual-assessment.label.drinking"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            dicts={dictsOfDrivingLicense}
            formName="drivingLicense"
            labelId="app.navigator.JPCA-of-manual-assessment.label.driving-license"
          />
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable || !VLD000085}
            required={VLD000085}
            formName="deathDate"
            labelId="app.navigator.task-detail-of-data-capture.label.datetime-of-death"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable || !VLD000084}
            required={VLD000084}
            formName="aCauseOfDeath"
            labelId="app.navigator.task-detail-of-data-capture.label.casuse-of-death"
            dicts={dictsOfACauseOfDeathJp}
            name="row16"
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            formName="periodFromAToDeath"
            labelId="app.navigator.JPCA-of-manual-assessment.label.the-period-from-a-to-death"
          />
        </FormLayout>
        <Collapse bordered={false} className={styles.customCollapse} expandIconPosition="right">
          <Panel header="詳細">
            <FormLayout json={json}>
              <FormItemInput
                form={form}
                disabled={taskNotEditable}
                formName="bCauseOfA"
                labelId="app.navigator.JPCA-of-manual-assessment.label.b-cause-of-a"
                name="row16"
              />
              <FormItemInput
                form={form}
                disabled={taskNotEditable}
                formName="periodFromBToDeath"
                labelId="app.navigator.JPCA-of-manual-assessment.label.the-period-from-b-to-death"
              />
              <FormItemInput
                form={form}
                disabled={taskNotEditable}
                formName="cCauseOfB"
                labelId="app.navigator.JPCA-of-manual-assessment.label.c-cause-of-b"
                name="row16"
              />
              <FormItemInput
                form={form}
                disabled={taskNotEditable}
                formName="periodFromCToDeath"
                labelId="app.navigator.JPCA-of-manual-assessment.label.the-period-from-c-to-death"
              />
              <FormItemInput
                form={form}
                disabled={taskNotEditable}
                formName="oneCauseOfC"
                labelId="app.navigator.JPCA-of-manual-assessment.label.1-cause-of-c"
                name="row16"
              />
              <FormItemInput
                form={form}
                disabled={taskNotEditable}
                formName="periodFromOneToDeath"
                labelId="app.navigator.JPCA-of-manual-assessment.label.the-period-from-1-to-death"
              />
              <FormItemInput
                form={form}
                disabled={taskNotEditable}
                formName="twoDiagnosisName"
                labelId="app.navigator.JPCA-of-manual-assessment.label.2-diagnosis-name"
                name="row16"
              />
              <FormItemInput
                form={form}
                disabled={taskNotEditable}
                formName="periodFromTwoToDeath"
                labelId="app.navigator.JPCA-of-manual-assessment.label.the-period-from-2-to-death"
              />
              <FormItemSelect
                form={form}
                disabled={taskNotEditable}
                formName="meetDemand"
                labelId="app.navigator.JPCA-of-manual-assessment.label.meet-the-demand"
                dicts={dictsOfMeetDemand}
              />
            </FormLayout>
          </Panel>
        </Collapse>
      </Form>
    );
  }
}

export default IncidentListItemOfBasicInfoItem;
