import React, { useContext } from 'react';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { handleWarnMessageModal } from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Form, Icon } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils, FormLayoutContext } from 'basic/components/Form';
import { DIAGNOSISITEM } from '@/utils/claimConstant';
import Section, { Fields } from './Section';
import { ReactComponent as AddIcon } from 'opus/Modules/Envoy/Assets/add.svg';
import { v4 as uuidv4 } from 'uuid';
import styles from './item.less';
import lodash from 'lodash';
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

const Item = ({ form, incidentId, diagnosisId, diagnosisItem, canDelete, claimNo, index }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const isRegisterMcs = useSelector(
    ({ opusClaimAssessment }: any) => opusClaimAssessment.isRegisterMcs
  );

  const treatmentListMap = useSelector(
    ({ opusClaimAssessment }: any) => opusClaimAssessment.claimEntities?.treatmentListMap
  );

  const visiable = editable && (!isRegisterMcs || diagnosisItem?.isManualAdd);

  const { activeChild, setActiveChild } = useContext(FormLayoutContext.Context);

  const onAdd = () => {
    const addDiagnosisItem = {
      ...DIAGNOSISITEM,
      claimNo,
      id: uuidv4(),
      incidentId,
      isManualAdd: 1,
    };

    dispatch({
      type: `${NAMESPACE}/addDiagnosisItem`,
      payload: {
        incidentId,
        addDiagnosisItem,
      },
    });

    dispatch({
      type: `${NAMESPACE}/savePartyListInfo`,
      payload: {
        isClickClaimRegister: false,
      },
    });

    const updateActiveChild = [...(activeChild || []), addDiagnosisItem?.id];

    setActiveChild(updateActiveChild);
  };

  const handleDelete = () => {
    handleMessage(
      hasDiagnosisId(treatmentListMap, diagnosisId),
      { Label_COM_WarningMessage: 'MSG_000725' },
      () => {
        dispatch({
          type: `${NAMESPACE}/opTreatmentListUpdateDiagnosisList`,
          payload: {
            diagnosisId,
          },
        });
      },
      () => {
        dispatch({
          type: `${NAMESPACE}/removeDiagnosisItem`,
          payload: {
            incidentId,
            diagnosisId,
          },
        });
      }
    );
    if (hasDiagnosisId(treatmentListMap, diagnosisId)) {
      handleWarnMessageModal(
        [{ content: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000725' }) }],
        {
          okFn: () => {
            dispatch({
              type: `${NAMESPACE}/opTreatmentListUpdateDiagnosisList`,
              payload: {
                diagnosisId,
              },
            });
            dispatch({
              type: `${NAMESPACE}/removeDiagnosisItem`,
              payload: {
                incidentId,
                diagnosisId,
              },
            });
          },
        }
      );
    } else {
      dispatch({
        type: `${NAMESPACE}/removeDiagnosisItem`,
        payload: {
          incidentId,
          diagnosisId,
        },
      });
    }
  };

  return (
    <FormLayoutContext.ExpandProvider>
      <div className={styles.item}>
        <div className={styles.titleRow}>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.diagnosis',
          })}
          {` No. ${index + 1}`}
          <div className={styles.gap} />
          {editable && <Icon component={AddIcon} onClick={onAdd} />}
          {visiable && canDelete && <DeleteButton handleDelete={handleDelete} />}
          <FormLayoutContext.ExpandIcon className={styles.icon} />
        </div>
        <div className={styles.innerCard}>
          <Section form={form} editable={editable} section="Diagnosis">
            <Fields.DiagnosisType incidentId={incidentId} diagnosisId={diagnosisId} />
            <Fields.DiagnosisName incidentId={incidentId} diagnosisId={diagnosisId} />
            <Fields.DiagnosisCode />
            <Fields.DiagnosisNo />
            <Fields.RelationshipCode />
            <Fields.DiagnosisDate />
            <Fields.FirstSymptomDate />
            <Fields.SymptomDate />
            <Fields.ExistingCancerDiagnosis />
            <Fields.DiagnosisDescription />
            <Fields.CriticalIllness />
            <Fields.CriticalIllnessName />
            <Fields.CancerBiologicalBehavior />
            <Fields.CancerDiseaseStates />
          </Section>
        </div>
      </div>
    </FormLayoutContext.ExpandProvider>
    // <FormBorderCard marginBottom button={{ visiable, callback: handleDelete }}>

    // </FormBorderCard>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { diagnosisId }: any) => ({
    diagnosisItem: modelnamepsace.claimEntities.diagnosisListMap[diagnosisId],
    validating: formCommonController.validating,
    claimNo: modelnamepsace.claimProcessData?.claimNo,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, incidentId, diagnosisId }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveDiagnosisItem',
          payload: {
            changedFields,
            incidentId,
            diagnosisId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { diagnosisItem } = props;

      return formUtils.mapObjectToFields(diagnosisItem);
    },
  })(Item)
);
