import React from 'react';
import { useDispatch } from 'dva';
import { SearchDropDown } from 'claim/pages/utils/searchDropDown';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelectPlus,
  Required,
} from 'basic/components/Form';
import { getPropsValue } from 'claim/pages/utils/fnObject';

const seachDropDown = new SearchDropDown();
const { handleProcedureName } = seachDropDown;

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'PopUp.Procedure',
  field: 'procedureNameOCR',
  'field-props': {
    editable: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'OCRProcedureName',
    },
    maxLength: 240,
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
  },
};

export { localFieldConfig };

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  config,
  field,
  treatmentId,
  procedureId,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dispatch = useDispatch();

  const onSelect = (value: any, typeCode: any, exProps: any) => {
    const procedureCode = getPropsValue(exProps, 'procedureCode');
    const kjCode = getPropsValue(exProps, 'kjCode');
    dispatch({
      type: 'JPCLMOfClaimAssessment/procedureUpdate',
      payload: {
        changedFields: { procedureCode, kjCode },
        treatmentId,
        procedureId,
      },
    });
  };

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemSelectPlus
        disabled={(config.editable || fieldProps.editable) === Editable.No || !editable}
        form={form}
        formName={config.name || field}
        labelId={config.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        onSelectCallback={onSelect}
        optionShowType="code"
        required={(config.required || fieldProps.required) === Required.Yes}
        searchCustom={(postData: any) => handleProcedureName(postData)}
        selectCallbackExProp={['procedureCode', 'kjCode']}
      />
    </Col>
  );
};

const ProcedureNameOCR = ({ field, config,
  form,
  editable,
  treatmentId,
  procedureId,
  layout,
  isShow,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      treatmentId={treatmentId}
      procedureId={procedureId}
    />
  </Authority>
);

ProcedureNameOCR.displayName = 'ProcedureNameOCR';

export default ProcedureNameOCR;
