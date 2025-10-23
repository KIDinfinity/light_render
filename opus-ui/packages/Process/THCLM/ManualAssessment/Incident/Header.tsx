import React from 'react';
import { NAMESPACE } from '../activity.config';

import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Title from './Title';
import Section, { HeaderFields as Fields } from './Section';
import styles from './Header.less';

const Header = ({ incidentId, form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <Title incidentId={incidentId} />
      </div>
      <div className={styles.section}>
        <Section form={form} editable={editable} section="Incident.Header">
          <Fields.ClaimTypeArray />
        </Section>
      </div>
    </div>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { incidentId }: any) => ({
    validating: formCommonController.validating,
    incidentItem: modelnamepsace.claimEntities.incidentListMap[incidentId],
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, incidentId, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveIncidentItem',
              payload: {
                changedFields,
                incidentId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveIncidentItem',
            payload: {
              changedFields,
              incidentId,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { incidentItem } = props;

      return formUtils.mapObjectToFields(incidentItem);
    },
  })(Header)
);
