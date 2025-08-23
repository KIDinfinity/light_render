import React from 'react';
import { NAMESPACE } from '../activity.config';

import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Section from '../../DataCapture/Incident/Section';
import ClaimTypeArray from './ClaimTypeArray';
import Title from '../../DataCapture/Incident/Title';
import styles from '../../DataCapture/Incident/Header.less';

const Header = ({ incidentId, form, incidentItem }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <Title incidentId={incidentId} />
      </div>
      <div className={styles.section}>
        <Section form={form} editable={editable} section="Incident.Header">
          <ClaimTypeArray incidentId={incidentId} />
        </Section>
      </div>
    </div>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { incidentId }: any) => {
  return {
    claimNo: modelnamepsace.claimProcessData?.claimNo,
    incidentItem: modelnamepsace.claimEntities?.incidentListMap?.[incidentId],
  };
})(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, incidentId } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveIncidentItem',
          payload: {
            skipAutoChangeField: true,
            changedFields,
            incidentId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { incidentItem } = props;

      return formUtils.mapObjectToFields({
        ...incidentItem,
        subClaimType: !incidentItem?.subClaimType ? undefined : incidentItem.subClaimType, // antd select组件value为undefined时才会显示placeholder
      });
    },
  })(Header)
);
