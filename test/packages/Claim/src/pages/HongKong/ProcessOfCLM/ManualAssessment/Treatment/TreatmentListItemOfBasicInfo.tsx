import React, { PureComponent } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { FormComponentProps } from 'antd/lib/form';
import moment from 'moment';
import { Form, Collapse } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { IncidentCode } from 'claim/pages/Enum';
import type { IDictionary } from '@/dtos/dicts';
import type { IIncident, IInsured } from '@/dtos/claim';
import TreatmentListItemOfBasicInfoHeader from './TreatmentListItemOfBasicInfoHeader';
import TreatmentListItemOfBasicInfoExpand from './TreatmentListItemOfBasicInfoExpand';
import ProcedureList from '../Procedure/ProcedureList';
import style from './TreatmentListItem.less';

const { Panel } = Collapse;

const FORMID_PREFIX = 'treatmentListItem';
interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  dictsOfTreatmentType: IDictionary[];
  incidentItem: IIncident;
  treatmentId: string;
  incidentId: string;
  insured: IInsured;
  validating: boolean;
  taskNotEditable: boolean;
}
@connect(
  (
    {
      dictionaryController,
      HKCLMOfClaimAssessmentController,
      formCommonController,
      claimEditable,
    }: any,
    { treatmentId, incidentId }: any
  ) => ({
    dictsOfTreatmentType: dictionaryController.TreatmentType,
    treatmentItem: HKCLMOfClaimAssessmentController.claimEntities.treatmentListMap[treatmentId],
    incidentItem: HKCLMOfClaimAssessmentController.claimEntities.incidentListMap[incidentId],
    dateTimeOfDeath: lodash.get(
      HKCLMOfClaimAssessmentController,
      'claimProcessData.insured.dateTimeOfDeath'
    ),
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    dictsOfHospitalType: dictionaryController.Dropdown_CLM_HosptialType,
  })
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, incidentId, treatmentId, validating }: any = props;
    const temChangedFields = { ...changedFields };
    if (lodash.has(changedFields, 'icu')) {
      temChangedFields.icu = changedFields.icu.value ? 1 : 0;
    }

    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'HKCLMOfClaimAssessmentController/saveEntry',
            target: 'saveTreatmentItem',
            payload: {
              changedFields: temChangedFields,
              incidentId,
              treatmentId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'HKCLMOfClaimAssessmentController/saveFormData',
          target: 'saveTreatmentItem',
          payload: {
            changedFields: temChangedFields,
            incidentId,
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
      dateOfConsultation: (value: any) => (value ? moment(value) : null),
      dateOfAdmission: (value: any) => (value ? moment(value) : null),
      dateOfDischarge: (value: any) => (value ? moment(value) : null),
      medicalProvider: (value: any) => value,
      department: (value: any) => value,
      doctor: (value: any) => value,
      icu: (value: any) => value === 1,
      icuFromDate: (value: any) => (value ? moment(value) : null),
      icuToDate: (value: any) => (value ? moment(value) : null),
      medicalProviderDescription: (value: any) => value,
      isHospitalInDevelopedCountry: (value: any) => value,
      hospitalType: (value: any) => value,
    });
  },
})
class TreatmentListItemOfBasicInfo extends PureComponent<IProps> {
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

  onSelect = (value: any, typeCode: any) => {
    const { dispatch, incidentId, treatmentId } = this.props;

    dispatch({
      type: 'HKCLMOfClaimAssessmentController/saveTreatmentItem',
      payload: {
        changedFields: { hospitalType: typeCode },
        incidentId,
        treatmentId,
      },
    });
  };

  render() {
    const { form, incidentItem, incidentId, treatmentId } = this.props;
    const treatmentTypeValue = form.getFieldValue('treatmentType');
    const isTreatmentTypeOP = treatmentTypeValue === IncidentCode.OutPatient;
    const claimTypeArray = formUtils.queryValue(lodash.get(incidentItem, 'claimTypeArray'));
    const isIncludePA = lodash.includes(claimTypeArray, IncidentCode.PA);
    const showExpand = isIncludePA && isTreatmentTypeOP;
    return (
      <div className={style.treatmentCard}>
        <>
          {showExpand && (
            <Collapse bordered={false}>
              <Panel
                header={
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <TreatmentListItemOfBasicInfoHeader
                      treatmentId={treatmentId}
                      incidentId={incidentId}
                    />
                  </div>
                }
                key={treatmentId}
              >
                <TreatmentListItemOfBasicInfoExpand
                  treatmentId={treatmentId}
                  incidentId={incidentId}
                />
                <ProcedureList incidentId={incidentId} treatmentId={treatmentId} />
              </Panel>
            </Collapse>
          )}
          {!showExpand && (
            <>
              <TreatmentListItemOfBasicInfoHeader
                treatmentId={treatmentId}
                incidentId={incidentId}
              />
              <TreatmentListItemOfBasicInfoExpand
                treatmentId={treatmentId}
                incidentId={incidentId}
              />
              <ProcedureList incidentId={incidentId} treatmentId={treatmentId} />
            </>
          )}
        </>
      </div>
    );
  }
}

export default TreatmentListItemOfBasicInfo;
