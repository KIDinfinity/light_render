import React, { useEffect } from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector, connect } from 'dva';
import { DIAGNOSISITEM } from '@/utils/claimConstant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { DiagnosisCode } from 'basic/enum/DiagnosisCode';
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
      <Section form={form} editable={editable} section="Add" register={false}>
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

      if (formUtils.queryValue(changedValues?.diagnosisCode) === DiagnosisCode.Dummy) {
        changedValues.diagnosisCode = {
          value: formUtils.queryValue(changedValues?.diagnosisCode),
          errors: [
            {
              message: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000593' }),
              field: 'diagnosisCode',
            },
          ],
          name: 'diagnosisCode',
          dirty: false,
          touched: true,
          validating: false,
        };
      }

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
      dispatch({
        type: `${NAMESPACE}/retrieve3CiIndicator`,
        payload: {
          diagnosisCode: formUtils.queryValue(changedValues?.diagnosisCode),
          diagnosisId: addDiagnosisItem?.id,
        },
      });
      dispatch({
        type: `${NAMESPACE}/checkIsCIByDiagnosisCode`,
        payload: {
          searchCode: formUtils.queryValue(changedValues?.diagnosisCode),
          diagnosisId: addDiagnosisItem.id,
          incidentId,
        },
      });
    },
    mapPropsToFields() {
      return formUtils.mapObjectToFields({});
    },
  })(Add)
);
