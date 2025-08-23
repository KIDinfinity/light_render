import React, { useState } from 'react';
import { useDispatch } from 'dva';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, formUtils } from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'insured',
  field: 'policyId',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'PolicyNo',
    },
    required: true,
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const dispatch = useDispatch();
  const [enterDown, setEnterDown] = useState(false);

  const fieldProps: any = localFieldConfig['field-props'];
  const editableConditions = true;

  const handlePolicyNo = (value?: string) => {
    dispatch({
      type: `JPCLMOfDataCapture/saveSearchInsuredInfo`,
      payload: {
        changedFields: { policyId: value ?? formUtils.queryValue(form.getFieldValue('policyId')) },
      },
    });
    dispatch({
      type: `JPCLMOfDataCapture/getInsuredInfo`,
      payload: { searchByPolicyId: true },
    });
  };

  const handleOnBlur = () => {
    if (!enterDown) {
      handlePolicyNo();
    }
  };

  const handleOnFocus = () => {
    setEnterDown(false);
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      setEnterDown(true);
      handlePolicyNo(e.target.value);
    }
  };

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemInput
        disabled={
          !editable ||
          ((config?.editable || fieldProps.editable) === Editable.Conditions
            ? !editableConditions
            : (config?.editable || fieldProps.editable) === Editable.No)
        }
        form={form}
        formName={config.name || field}
        labelId={config.label?.dictCode || localFieldConfig['field-props'].label.dictCode}
        labelTypeCode={
          config.label?.dictTypeCode || localFieldConfig['field-props'].label.dictTypeCode
        }
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        onKeyDown={handleKeyDown}
        required={config.required || localFieldConfig['field-props'].required}
      />
    </Col>
  );
};

const PolicyId = ({ field, config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

PolicyId.displayName = 'PolicyId';

export default PolicyId;
