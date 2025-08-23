import React, { useEffect } from 'react';

import { useSelector, connect } from 'dva';
import { FormBorderCard, formUtils } from 'basic/components/Form';
import { Form, Row, Col } from 'antd';
import { TherapiesType as TherapiesTypeEnum } from 'claim/pages/Enum';
import {
  addProcedureItemInfo,
  saveTreatmentItem,
} from 'process/PHCLM/ManualAssessment/_models/functions';
import { NAMESPACE } from '../activity.config';
import Section, { BasicFields as Fields } from './Section';
import styles from './index.less';

const AddProcedure = ({ form, treatmentId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  return (
    <div className={styles.item}>
      {editable && (
        <Row className={styles.add}>
          <Col span={10} className={styles.left}>
            <FormBorderCard marginBottom>
              <Section form={form} editable={editable} section="Add" register={false}>
                <Fields.TherapiesTypeAdd treatmentId={treatmentId} isAdd />
              </Section>
            </FormBorderCard>
          </Col>
          <Col span={14} className={styles.lastRight}>
            <></>
          </Col>
        </Row>
      )}
    </div>
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
  })(AddProcedure)
);
