import React from 'react';
import { Col } from 'antd';
import { useDispatch } from 'dva';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelectPlus,
} from 'basic/components/Form';
import { getPropsValue } from 'claim/pages/utils/fnObject';
import { SearchDropDown } from 'claim/pages/utils/searchDropDown';

const seachDropDown = new SearchDropDown();
const { handleProcedureName } = seachDropDown;

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Procedure.Basic',
  field: 'procedureName',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.procedure-name',
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

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  treatmentId,
  procedureId,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dispatch = useDispatch();
  const onSelect = (value: any, typeCode: any, exProps: any) => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/saveProcedureItem',
      payload: {
        changedFields: {
          procedureCode: getPropsValue(exProps, 'procedureCode'),
          kjCode: `${getPropsValue(exProps, 'kjCode') || ''}${getPropsValue(exProps, 'branchNo') || ''
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
  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelectPlus
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          searchCustom={(postData: any) => handleProcedureName(postData)}
          onSelectCallback={onSelect}
          optionShowType="code"
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

const ProcedureName = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  treatmentId,
  procedureId,
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

ProcedureName.displayName = 'ProcedureName';

export default ProcedureName;
