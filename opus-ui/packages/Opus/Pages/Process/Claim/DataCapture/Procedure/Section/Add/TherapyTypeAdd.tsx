import React from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  formUtils,
} from 'basic/components/Form';

import { ETreatmentType, ETherapyType } from 'basic/enum';

import { NAMESPACE } from 'opus/Pages/Process/Claim/DataCapture/activity.config';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Procedure.Add',
  field: 'procedureType',
  'field-props': {
    editable: 'Y',
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
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 3,
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

  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config['x-dict']?.dictTypeCode ||
          localFieldConfig?.['field-props']?.['x-dict']?.dictTypeCode
      ]
  );

  const treatmentType = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace.claimEntities?.treatmentListMap?.[treatmentId]?.treatmentType
  );

  const filterDicts = dicts?.filter((dict: any) => {
    if (
      formUtils.queryValue(treatmentType) === ETreatmentType.inPatient &&
      dict?.dictCode === ETherapyType.outPatient
    ) {
      return false;
    }
    return true;
  });

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemSelect
        disabled={(config.editable || fieldProps.editable) === Editable.No || !editable}
        dicts={filterDicts}
        form={form}
        formName={config.name || field}
        labelId={config.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        required={(config.required || fieldProps.required) === Required.Yes}
        labelType={config.label?.type || fieldProps.label.type}
      />
    </Col>
  );
};

const TherapyTypeAdd = ({
  field,
  config,
  form,
  editable,
  section,
  layout,
  isShow,
  treatmentId,
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
    />
  </Authority>
);

TherapyTypeAdd.displayName = localFieldConfig.field;

export default TherapyTypeAdd;
