import React, { useEffect } from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector, connect } from 'dva';
import { DIAGNOSISITEM } from '@/utils/claimConstant';
import { FormBorderCard, formUtils } from 'basic/components/Form';
import {v4 as uuidv4 } from 'uuid';
import { Form } from 'antd';
import Section, { Fields } from './Section';
import styles from './index.less';

const Add = ({ incidentId, form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  return (
    <FormBorderCard className={styles.itemCard} marginBottom>
      <Section form={form} editable={editable} section="Diagnosis" register={false}>
        <Fields.DiagnosisCodeAdd incidentId={incidentId} isManualAdd />
      </Section>
    </FormBorderCard>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  claimNo: modelnamepsace.claimProcessData?.claimNo,
}))(
  Form.create({
    onValuesChange: (props: any, changedValues: any) => {
      const { dispatch, claimNo, incidentId } = props;
      const addDiagnosisItem = {
        ...DIAGNOSISITEM,
        claimNo,
        id: uuidv4(),
        incidentId,
        isManualAdd: true,
        ...changedValues,
      };
      dispatch({
        type: `${NAMESPACE}/addDiagnosisItem`,
        payload: {
          incidentId,
          addDiagnosisItem,
        },
      });
    },
    mapPropsToFields() {
      return formUtils.mapObjectToFields({});
    },
  })(Add)
);
