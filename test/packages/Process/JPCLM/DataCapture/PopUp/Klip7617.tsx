import React from 'react';
import { Form } from 'antd';
import { formUtils, ElementConfig } from 'basic/components/Form';
import { connect, useSelector } from 'dva';
import Section, { Klip7617 as Fields } from './Section';
import styles from './index.less';


const localSectionConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'popUp.klip7617',
  'section-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'KLIP 7617',
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

const Klip7617 = ({ form }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  return (
    <div className={styles.klip}>
      <div className={styles.title}>
        <SectionTitle />
      </div>
      <Section form={form} editable={editable} section="PopUp.klip7617">
        <Fields.PaymentApprovalResultCN />
        <Fields.AssessmentResultCN />
      </Section>
    </div>
  );
};

export default connect(
  ({ formCommonController, JPCLMOfDataCapture }: any, { treatmentId }: any) => ({
    validating: formCommonController.validating,
    treatmentItem: JPCLMOfDataCapture.claimEntities.treatmentListMap[treatmentId],
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, id, validating, item } = props;
      const { incidentId } = item;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfDataCapture/saveEntry',
              target: 'klipCaseInfoUpdate',
              payload: {
                changedFields,
                id,
                incidentId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfDataCapture/saveFormData',
            target: 'klipCaseInfoUpdate',
            payload: {
              changedFields,
              id,
              incidentId,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(Klip7617)
);
