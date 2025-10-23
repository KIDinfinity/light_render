import React from 'react';
import { Form } from 'antd';
import { formUtils, ElementConfig } from 'basic/components/Form';
import { connect, useSelector } from 'dva';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import Section, { Klip7580 as Fields } from './Section';
import styles from './index.less';

const localSectionConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'PopUp.klip7580',
  'section-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'KLIP 7580',
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

const Klip7580 = ({ form, item }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  return (
    <div className={styles.klip}>
      <div className={styles.title}>
        <SectionTitle />
      </div>
      <Section form={form} editable={editable} section="PopUp.klip7580" id={item.id}>
        <Fields.CancelFunction />
        <Fields.CancelNo />
      </Section>
    </div>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { treatmentId }: any) => ({
    validating: formCommonController.validating,
    treatmentItem: modelnamepsace.claimEntities.treatmentListMap[treatmentId],
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, id, item } = props;
      const { policyId, incidentId } = item;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'klipCaseInfoUpdate',
          payload: {
            changedFields,
            id,
            policyId,
            incidentId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(Klip7580)
);
