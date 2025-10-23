import React, { useEffect } from 'react';
import { NAMESPACE } from '../activity.config';

import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import { formUtils, SectionCard } from 'basic/components/Form';
import Section, { SectionTitle, AddFields as Fields } from './Section';
import styles from './index.less';

const Add = ({ form, treatmentList }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  const newNumber = (treatmentList?.length || 0) + 1;
  return (
    <SectionCard
      title={
        <div className={styles.header}>
          <SectionTitle suffix={` No. ${newNumber}`} />
          <div className={styles.section}>
            <Section form={form} editable={editable} section="Treatment.Add" register={false}>
              <Fields.TreatmentType isAdd />
            </Section>
          </div>
        </div>
      }
      hasContent={false}
      className={styles.treatmentAdd}
    />
  );
};

export default connect()(
  Form.create<any>({
    onValuesChange: (props: any, changedValues: any) => {
      const { dispatch, incidentId } = props;
      dispatch({
        type: `${NAMESPACE}/addTreatmentItem`,
        payload: {
          incidentId,
          changedValues,
        },
      });
    },
    mapPropsToFields(props: any) {
      const { treatmentItem } = props;
      return formUtils.mapObjectToFields(treatmentItem);
    },
  })(Add)
);
