import React from 'react';
import { useDispatch } from 'dva';
import { SearchDropDown } from 'claim/pages/utils/searchDropDown';
import { Col } from 'antd';
import { getPropsValue } from 'claim/pages/utils/fnObject';
import {
  Authority,
  Editable,
  FormItemSelectPlus,
  Required,
  Rule,
  Visible,
} from 'basic/components/Form';

const seachDropDown = new SearchDropDown();
const { handleProcedureName } = seachDropDown;

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'procedure',
  field: 'procedureName',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.procedure-name',
    },
    maxLength: 240,
    required: 'Y',
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'procedureType',
          },
          operator: '===',
          right: 'P',
        },
        {
          left: {
            domain: 'field',
            field: 'procedureType',
          },
          operator: '===',
          right: 'SG',
        },
      ],
    },
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 0,
      },
    },
    'treatment-no-invoice-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 0,
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
    dispatch({
      type: 'JPCLMOfDataCapture/procedureUpdate',
      payload: {
        changedFields: {
          procedureCode: getPropsValue(exProps, 'procedureCode'),
          kjCode: `${getPropsValue(exProps, 'kjCode') || ''}${
            getPropsValue(exProps, 'branchNo') || ''
          }${getPropsValue(exProps, 'itemNo') || ''}`,
          womenSurgeryFlg: getPropsValue(exProps, 'womenSurgeryFlg'),
          highReimbPct: getPropsValue(exProps, 'highReimbPct'),
          transplantationSurgeryFlg: getPropsValue(exProps, 'transplantationSurgeryFlg'),
          bornMarrowFlg: getPropsValue(exProps, 'bornMarrowFlg'),
        },
        treatmentId,
        procedureId,
      },
    });
  };

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
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
          selectCallbackExProp={[
            'procedureCode',
            'kjCode',
            'branchNo',
            'highReimbPct',
            'itemNo',
            'bornMarrowFlg',
            'transplantationSurgeryFlg',
            'womenSurgeryFlg',
          ]}
        />
      </Col>
    )
  );
};

const ProcedureName = ({
  field,
  config,
  form,
  editable,
  treatmentId,
  procedureId,
  layout,
  isShow,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      treatmentId={treatmentId}
      procedureId={procedureId}
    />
  </Authority>
);

ProcedureName.displayName = 'ProcedureName';

export default ProcedureName;
