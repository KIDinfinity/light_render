import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import moment from 'moment';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemDatePicker,
  formUtils,
} from 'basic/components/Form';


const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Payable.OPTreatmentPayable',
  field: 'dateOfConsultation',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    expand: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'outpatientDate',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 8,
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
  treatmentPayableId,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const opTreatmentPayableListMap = useSelector(
    ({ opusClaimAssessment }: any) => opusClaimAssessment?.claimEntities?.opTreatmentPayableListMap
  );

  const currentId = form.getFieldValue('id');
  const existCodes = lodash
    .chain(opTreatmentPayableListMap)
    .filter((item: any) => item.treatmentPayableId === treatmentPayableId && item.id !== currentId)
    .map((item) => formUtils.queryValue(item.dateOfConsultation))
    .uniq()
    .value();

  const opTreatmentListObj = useSelector(
    ({ opusClaimAssessment }: any) =>
      opusClaimAssessment.claimEntities?.treatmentListMap?.[treatmentId]?.opTreatmentList
  );

  const dicts = lodash
    .chain(opTreatmentListObj)
    .filter((item) => item?.outpatientTreatmentDate)
    .map((item: any) => {
      return {
        dictCode: item?.outpatientTreatmentDate,
        dictName: moment(item?.outpatientTreatmentDate).format('L'),
      };
    })
    .orderBy((item) => moment(item.dictCode).valueOf(), ['asc'])
    .value();

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemDatePicker
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
          labelType={config.label?.type || fieldProps.label.type}
        />
      </Col>
    )
  );
};

const Outpatient = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  treatmentId,
  treatmentPayableId,
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
      treatmentPayableId={treatmentPayableId}
    />
  </Authority>
);

Outpatient.displayName = localFieldConfig.field;

export default Outpatient;
