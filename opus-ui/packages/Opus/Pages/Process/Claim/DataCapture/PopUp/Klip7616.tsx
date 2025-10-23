import React from 'react';
import { Form } from 'antd';
import { formUtils, ElementConfig } from 'basic/components/Form';
import { connect, useSelector } from 'dva';
import { NAMESPACE } from 'opus/Pages/Process/Claim/DataCapture/activity.config';
import Section, { Klip7616 as Fields } from './Section';
import styles from './index.less';
import getInvestigationResultConfirmationCategoryValue from '../_models/functions/getInvestigationResultConfirmationCategoryValue';

const localSectionConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'popUp.klip7616',
  'section-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'KLIP 7616',
    },
    visible: 'Y',
  },
};

const localConfig = {
  configs: [localSectionConfig],
  remote: false, // 远程配置来源于本地配置，当远程配置同步后，改remote为true
};

const SectionTitle = ({ prefix, suffix }: any) => {
  return (
    <ElementConfig.SectionTitle
      section={localSectionConfig.section}
      config={localConfig}
      prefix={prefix}
      suffix={suffix}
    />
  );
};

const Klip7616 = ({ form, id }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  return (
    <div className={styles.klip}>
      <div className={styles.title}>
        <SectionTitle />
      </div>
      <Section form={form} editable={editable} section="PopUp.klip7616" id={id}>
        <Fields.InvestigationAgreementDate />
        <Fields.AutoassessmentFlg />
        <Fields.InvestigationRefusalDate />
        {/* <Fields.ForcedPaymentFlg /> */}
        <Fields.DaysToDeductInterestForArrears />
        <Fields.InvestigationResultConfirmationCategory />
        <Fields.MedicalCertificateFeeCN />
        <Fields.MedicalCertificateArrivalDate />
        <Fields.UnpaidInterestFlg />
        <Fields.OffsetAccruedYearMonth />
        <Fields.IncidentStatusCode />
      </Section>
    </div>
  );
};

export default connect(
  (
    { formCommonController, [NAMESPACE]: modelnamepsace }: any,
    { treatmentId, incidentId }: any
  ) => ({
    validating: formCommonController.validating,
    treatmentItem: modelnamepsace.integration?.[incidentId]?.treatmentListMap[treatmentId],
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, id, validating, item } = props;
      const { incidentId, policyId } = item;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'klipCaseInfoUpdate',
              payload: {
                changedFields,
                id,
                incidentId,
                policyId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'klipCaseInfoUpdate',
            payload: {
              changedFields,
              id,
              incidentId,
              policyId,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;

      return formUtils.mapObjectToFields({
        ...item,
        investigationResultConfirmationCategory: getInvestigationResultConfirmationCategoryValue(
          item?.investigationResultConfirmationCategory
        ),
      });
    },
  })(Klip7616)
);
