import React, { useEffect, useContext } from 'react';
import { NAMESPACE } from '../activity.config';
import { useSelector, connect } from 'dva';
import { DIAGNOSISITEM } from '@/utils/claimConstant';
import { FormBorderCard, FormLayoutContext } from 'basic/components/Form';
import {v4 as uuidv4 } from 'uuid';
import { Form } from 'antd';
import Section, { Fields } from './Section';

const Add = ({ incidentId, form, claimNo, dispatch }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const { activeChild, setActiveChild } = useContext(FormLayoutContext.Context);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  const onChange = (value: string) => {
    const addDiagnosisItem = {
      ...DIAGNOSISITEM,
      claimNo,
      id: uuidv4(),
      incidentId,
      isManualAdd: true,
      diagnosisCode: value,
    };

    dispatch({
      type: `${NAMESPACE}/addDiagnosisItem`,
      payload: {
        incidentId,
        addDiagnosisItem,
      },
    });

    const updateActiveChild = [...(activeChild || []), addDiagnosisItem?.id];

    setActiveChild(updateActiveChild);
  };

  return (
    <FormBorderCard marginBottom>
      <Section form={form} editable={editable} section="Add" register={false}>
        <Fields.DiagnosisCodeAdd incidentId={incidentId} isManualAdd onChange={onChange} />
      </Section>
    </FormBorderCard>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  claimNo: modelnamepsace.claimProcessData?.claimNo,
}))(Form.create({})(Add));
