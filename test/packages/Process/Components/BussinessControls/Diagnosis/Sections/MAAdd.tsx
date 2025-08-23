import React, { useEffect, useContext } from 'react';
import { useSelector, connect } from 'dva';
import { DIAGNOSISITEM } from '@/utils/claimConstant';
import { FormLayoutContext } from 'basic/components/Form';
import {v4 as uuidv4 } from 'uuid';
import { Form } from 'antd';
import Diagnosis, { FieldsBasic as Fields } from 'process/Components/BussinessControls/Diagnosis';

const AMAdd = ({ incidentId, form, claimNo, NAMESPACE, dispatch }: any) => {
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
    <Diagnosis.Section
      form={form}
      editable={editable}
      section="Add.Diagnosis"
      NAMESPACE={NAMESPACE}
      register={false}
    >
      <Fields.DiagnosisCodeAdd incidentId={incidentId} onChange={onChange} />
    </Diagnosis.Section>
  );
};

export default connect((state: any, { NAMESPACE }: any) => ({
  claimNo: state?.[NAMESPACE]?.claimProcessData?.claimNo,
}))(Form.create({})(AMAdd));
