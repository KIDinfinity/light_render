import React from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { ClaimType } from 'claim/enum';
import { NAMESPACE } from 'opus/Pages/Process/Claim/DataCapture/activity.config';
import { EProcedureType } from 'process/Enum';
import {
  Authority,
  FormItemSelect,
  Required,
  formUtils,
  Visible,
  Editable,
} from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Procedure',
  field: 'procedureType',
  'field-props': {
    editable: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'therapyType',
    },
    required: 'Y',
    visible: 'Y',
    'x-dict': {
      dictTypeCode: 'Dropdown_CLM_therapyType',
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
  },
};

export { localFieldConfig };

const FormItem = ({ isShow, layout, form, editable, field, config, treatmentId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dicts = getDrowDownList(
    config['x-dict']?.dictTypeCode || localFieldConfig?.['field-props']?.['x-dict']?.dictTypeCode
  );

  const editableCondiction = true;

  const exist = [];
  const treatmentType = useSelector(
    ({ [NAMESPACE]: modelnamespace }) =>
      modelnamespace.claimEntities?.treatmentListMap[treatmentId]?.treatmentType
  );
  const isTreatmentTypeOP = formUtils.queryValue(treatmentType) === ClaimType.OPD;
  if (!isTreatmentTypeOP) exist.push(EProcedureType.OP);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? editableCondiction
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout} style={{}}>
        <FormItemSelect
          existCodes={exist}
          disabled={(config.editable || fieldProps.editable) === Editable.No || !editable}
          dicts={dicts}
          form={form}
          dictTypeCode={
            config['x-dict']?.dictTypeCode ||
            localFieldConfig?.['field-props']?.['x-dict']?.dictTypeCode
          }
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={(config.required || fieldProps.required) === Required.Yes}
        />
      </Col>
    )
  );
};

const TherapyType = ({ field, config, form, editable, layout, isShow, treatmentId }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      treatmentId={treatmentId}
    />
  </Authority>
);

TherapyType.displayName = localFieldConfig.field;

export default TherapyType;
