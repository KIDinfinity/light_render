import React from 'react';
import { NAMESPACE } from '../activity.config';

import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Section, { HeaderFields as Fields } from './Section';
import Title from './Title';
import styles from './Header.less';

const Header = ({ form, treatmentId, incidentId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <Title treatmentId={treatmentId} />
      </div>
      <div className={styles.section}>
        <Section form={form} editable={editable} section="Treatment.Header">
          <Fields.TreatmentType incidentId={incidentId} treatmentId={treatmentId} />
        </Section>
      </div>
    </div>
  );
};

export default connect(
  ({ [NAMESPACE]: modelnamepsace }: any, { treatmentId }: any) => ({
    treatmentItem: modelnamepsace.claimEntities.treatmentListMap[treatmentId],
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
