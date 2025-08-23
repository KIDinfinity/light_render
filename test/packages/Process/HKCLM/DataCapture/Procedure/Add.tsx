import React, { useEffect } from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector, connect } from 'dva';
import { FormBorderCard, formUtils } from 'basic/components/Form';
import { Form } from 'antd';

import { TherapiesType as TherapiesTypeEnum } from 'claim/pages/Enum';
import {
  addProcedureItemInfo,
  saveTreatmentItem,
} from 'process/HKCLM/DataCapture/_models/functions';
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

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  claimNo: modelnamepsace.claimProcessData?.claimNo,
}))(
  Form.create({
    onValuesChange: (props: any, changedValues: any) => {
      const { dispatch, claimNo, treatmentId } = props;
      const { therapiesType } = changedValues;
      if (formUtils.queryValue(therapiesType) === TherapiesTypeEnum.ICU) {
        saveTreatmentItem(dispatch, treatmentId, changedValues);
      }
      if (formUtils.queryValue(therapiesType) === TherapiesTypeEnum.Surgery) {
        addProcedureItemInfo(dispatch, claimNo, treatmentId, changedValues);
      }
      if (formUtils.queryValue(therapiesType) === TherapiesTypeEnum.Crisis) {
        dispatch({
          type: `${NAMESPACE}/addOtherProcedure`,
          payload: {
            changedValues,
            treatmentId,
          },
        });
      }
    },
  })(Add)
);
