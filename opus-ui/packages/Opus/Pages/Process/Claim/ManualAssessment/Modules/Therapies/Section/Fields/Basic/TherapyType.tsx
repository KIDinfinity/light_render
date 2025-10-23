import React from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import { EProcedureType } from 'process/Enum';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { ClaimType } from 'claim/enum';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  formUtils,
} from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Procedure',
  field: 'procedureType',
  'field-props': {
    editable: 'C',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.JPCA-of-manual-assessment.label.diagnosis-type',
    },
    required: 'Y',
    visible: 'Y',
    'x-dict': {
      dictTypeCode: 'Dropdown_CLM_therapyType',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

export { localFieldConfig };

const FormItem = ({ isShow, layout, form, editable, field, config, treatmentId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const editableCondiction = !form.getFieldValue(config.name || field);
  const dicts = getDrowDownList(
    config['x-dict']?.dictTypeCode || localFieldConfig?.['field-props']?.['x-dict']?.dictTypeCode
  );

  const exist = [EProcedureType.DG1, EProcedureType.DG2];
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
      <Col {...layout}>
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
