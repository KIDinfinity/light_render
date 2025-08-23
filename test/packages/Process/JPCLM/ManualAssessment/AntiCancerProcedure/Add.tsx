import React from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import { formUtils, SectionCard } from 'basic/components/Form';
import Section, { AddField } from './Section';
import styles from './Item.less';

const Add = ({ form, otherProcedureId }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  return (
    <SectionCard className={styles.sectionCard}>
      <Section form={form} section="therapeuticMonthList.Add" editable={editable}>
        <AddField.TherapeuticDateAdd otherProcedureId={otherProcedureId} />
      </Section>
    </SectionCard>
  );
};

export default connect()(
  Form.create<any>({
    mapPropsToFields() {
      return formUtils.mapObjectToFields({});
    },
  })(Add)
);
