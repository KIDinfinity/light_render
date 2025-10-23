import React from 'react';
import { connect, useSelector, useDispatch } from 'dva';
import { Form, Icon } from 'antd';
import lodash from 'lodash';
import { formUtils, FormLayoutContext } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { handleWarnMessageModal } from '@/utils/commonMessage';
import { DIAGNOSISITEM } from '@/utils/claimConstant';
import { ReactComponent as AddIcon } from 'opus/Modules/Envoy/Assets/add.svg';
import styles from './item.less';
import { v4 as uuidv4 } from 'uuid';
import Section, { Fields } from './Section';
import { DeleteButton } from 'opus/Components/Modals/DeleteModal';

const hasDiagnosisId = (treatmentListMap, diagnosisId) => {
  return lodash.some(treatmentListMap, (element) =>
    lodash.some(element.opTreatmentList, (item) =>
      lodash.some(item.diagnosisIdList, (id) => id === diagnosisId)
    )
  );
};

const handleMessage = (
  flag: boolean,
  message: object,
  okSpecialFn: Function,
  okDefaultFn: Function
) => {
  if (flag) {
    handleWarnMessageModal([{ content: formatMessageApi(message) }], {
      okFn: () => {
        okSpecialFn();
        okDefaultFn();
      },
    });
  } else {
    okDefaultFn();
  }
};

const Item = ({ form, diagnosisItem, index, disableDelete }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  const { id, incidentId } = diagnosisItem;
  const treatmentListMap = useSelector(
    ({ opusClaimDataCapture }: any) => opusClaimDataCapture.claimEntities?.treatmentListMap
  );

  const handleDelete = () => {
    handleMessage(
      hasDiagnosisId(treatmentListMap, id),
      { Label_COM_WarningMessage: 'MSG_000725' },
      () => {
        dispatch({
          type: 'opusClaimDataCapture/opTreatmentListUpdateDiagnosisList',
          payload: {
            diagnosisId: id,
          },
        });
      },
      () => {
        dispatch({
          type: 'opusClaimDataCapture/diagnosisDelete',
          payload: {
            incidentId,
            diagnosisId: id,
          },
        });
      }
    );
  };

  const onAdd = async () => {
    const state: any = await dispatch({ type: 'global/accessStore' });
    const addDiagnosisItem = {
      ...DIAGNOSISITEM,
      claimNo: state?.opusClaimDataCapture.claimProcessData?.claimNo,
      id: uuidv4(),
      incidentId,
    };

    dispatch({
      type: 'opusClaimDataCapture/diagnosisAdd',
      payload: {
        incidentId,
        addDiagnosisItem,
      },
    });
  };

  return (
    <FormLayoutContext.ExpandProvider>
      <div className={styles.diagnosisItem}>
        <div className={styles.titleRow}>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.diagnosis',
          })}
          {` No. ${index + 1}`}
          <div className={styles.gap} />
          {editable && <Icon component={AddIcon} onClick={onAdd} />}
          {editable && !disableDelete && (
            <DeleteButton handleDelete={handleDelete} disabled={disableDelete} />
          )}
          <FormLayoutContext.ExpandIcon className={styles.icon} />
        </div>
        <div className={styles.innerCard}>
          <Section form={form} editable={editable} section={'Diagnosis'}>
            <Fields.DiagnosisName incidentId={incidentId} diagnosisId={id} />
            <Fields.DiagnosisCode />
            <Fields.DiagnosisType incidentId={incidentId} />
            <Fields.ExistingCancerDiagnosis />
            <Fields.DiagnosisDate />
            <Fields.FirstSymptomDate />
            <Fields.DiagnosisDescription />
            <Fields.SymptomDate />
            <Fields.CriticalIllness />
            <Fields.CriticalIllnessName />
            <Fields.DiagnosisNo />
            <Fields.RelationshipCode />
            <Fields.CancerBiologicalBehavior />
            <Fields.CancerDiseaseStates />
          </Section>
        </div>
      </div>
    </FormLayoutContext.ExpandProvider>
  );
};

export default connect(
  ({ formCommonController, opusClaimDataCapture }: any, { diagnosisId }: any) => ({
    validating: formCommonController.validating,
    diagnosisItem: opusClaimDataCapture.claimEntities.diagnosisListMap[diagnosisId],
    treatmentListMap: opusClaimDataCapture.claimEntities?.treatmentListMap,
  })
)(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating, diagnosisItem, treatmentListMap } = props;
      const { id, incidentId } = diagnosisItem;

      if (formUtils.shouldUpdateState(changedFields)) {
        handleMessage(
          changedFields.diagnosisName &&
            lodash.size(changedFields) === 1 &&
            hasDiagnosisId(treatmentListMap, id),
          { Label_COM_WarningMessage: 'MSG_000725' },
          () => {
            dispatch({
              type: 'opusClaimDataCapture/opTreatmentListUpdateDiagnosisList',
              payload: {
                diagnosisId: id,
              },
            });
          },
          () => {
            if (validating) {
              setTimeout(() => {
                dispatch({
                  type: 'opusClaimDataCapture/saveEntry',
                  target: 'diagnosisUpdate',
                  payload: {
                    changedFields,
                    incidentId,
                    diagnosisId: id,
                  },
                });
              }, 0);
            } else {
              dispatch({
                type: 'opusClaimDataCapture/saveFormData',
                target: 'diagnosisUpdate',
                payload: {
                  changedFields,
                  incidentId,
                  diagnosisId: id,
                },
              });
            }
          }
        );
      }
    },
    mapPropsToFields(props) {
      const { diagnosisItem } = props;

      return formUtils.mapObjectToFields(diagnosisItem);
    },
  })(Item)
);
