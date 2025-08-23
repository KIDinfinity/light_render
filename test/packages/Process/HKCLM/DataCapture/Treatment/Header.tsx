import React from 'react';
import { NAMESPACE } from '../activity.config';

import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Section, { SectionTitle, HeaderFields as Fields } from './Section';
import styles from './index.less';

const Header = ({ form, incidentId, treatmentId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const treatmentNo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.treatmentListMap?.[treatmentId]?.treatmentNo
  );

  return (
    <div className={styles.header}>
      <SectionTitle suffix={` No. ${treatmentNo}`} />
      <div className={styles.section}>
        <Section form={form} editable={editable} section="Treatment.Header">
          <Fields.TreatmentType incidentId={incidentId} treatmentId={treatmentId} />
        </Section>
      </div>
    </div>
  );
};

export default connect(
  ({ [NAMESPACE]: modelnamepsace }: any, { treatmentId, incidentId }: any) => ({
    treatmentItem: modelnamepsace.claimEntities.treatmentListMap[treatmentId],
    treatmentList: modelnamepsace.claimEntities.incidentListMap?.[incidentId]?.treatmentList,
    claimNo: modelnamepsace.claimProcessData?.claimNo,
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, incidentId, treatmentId } = props;
      const temChangedFields = { ...changedFields };
      if (lodash.has(changedFields, 'icu')) {
        temChangedFields.icu = changedFields.icu.value ? 1 : 0;
      }
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveTreatmentItem',
          payload: {
            changedFields: temChangedFields,
            incidentId,
            treatmentId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { treatmentItem } = props;
      return formUtils.mapObjectToFields(treatmentItem);
    },
  })(Header)
);
