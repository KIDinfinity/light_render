import React from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Required } from 'basic/components/Form';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'incident.short',
  field: 'claimTypeArray',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.claim-type',
    },
    mode: 'multiple',
    visible: 'Y',
    'x-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
    'x-dict': {
      dictTypeCode: 'ClaimType',
    },
  },
};
const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dictsOfClaimType = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config?.['field-props']?.['x-dict']?.dictTypeCode ||
          fieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemSelect
        form={form}
        required={config?.required === Required.Yes}
        mode={fieldProps.multiple}
        disabled={!editable || config?.editable === Editable.No}
        dicts={dictsOfClaimType}
        formName={field || fieldConfig.field}
        name={config?.name}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
      />
    </Col>
  );
};

const ClaimTypeArray = ({ field, config, form, editable, layout, isShow }: any) => (
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

ClaimTypeArray.displayName = 'ClaimTypeArray';

export default ClaimTypeArray;
