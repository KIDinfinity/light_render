import React, { useEffect } from 'react';
import { useSelector, connect } from 'dva';
import { FormBorderCard } from 'basic/components/Form';
import { Form } from 'antd';
import { addTherapiesItem } from 'process/THCLM/DataCapture/_models/functions'
import Section, { Fields } from './Section';
import styles from './ProcedureList.less';

const Add = ({ form, treatmentId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  return (
    <FormBorderCard className={styles.itemCard} marginBottom>
      <Section form={form} editable={editable} section="Procedure" register={false}>
        <Fields.TherapiesType treatmentId={treatmentId} isAdd />
      </Section>
    </FormBorderCard>
  );
};

export default connect()(
  Form.create({
    onValuesChange: (props: any, changedValues: any) => {
      const { dispatch, treatmentId } = props;
      addTherapiesItem(dispatch, changedValues, treatmentId)
    },
  })(Add)
);
