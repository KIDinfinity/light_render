import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils, FormBorderCard } from 'basic/components/Form';
import Section, { Fields } from '../../DataCapture/Diagnosis/Section';
import styles from '../../DataCapture/Diagnosis/index.less';

const Item = ({ form, incidentId, diagnosisId }: any) => {
  const diagnosisItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.diagnosisListMap[diagnosisId]
  );

  const isRegisterMcs = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isRegisterMcs
  );

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <FormBorderCard
      marginBottom
      className={styles.itemCard}
      button={{
        visiable: editable && (!isRegisterMcs || diagnosisItem?.isManualAdd),
      }}
    >
      <Section form={form} editable={editable} section="Diagnosis">
        <Fields.DiagnosisCode incidentId={incidentId} diagnosisId={diagnosisId} />
      </Section>
    </FormBorderCard>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { diagnosisId }: any) => ({
    diagnosisItem: modelnamepsace.claimEntities.diagnosisListMap[diagnosisId],
    validating: formCommonController.validating,
  })
)(
  Form.create({
    mapPropsToFields(props: any) {
      const { diagnosisItem } = props;
      return formUtils.mapObjectToFields(diagnosisItem);
    },
  })(Item)
);
