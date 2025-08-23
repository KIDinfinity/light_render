import React from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Required } from 'basic/components/Form';
import { filter } from 'lodash';
import type { IDictionary } from '@/dtos/dicts';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'incident.Add',
  field: 'claimTypeArray',
  'field-props': {
    label: {
      type: 'inline',
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.claim-type',
    },
    mode: 'multiple',
    maxLength: 240,
    required: 'N',
    visible: 'Y',
    'x-layout': {
      xs: {
        span: 4,
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
  const dictsOfClaimTypes = filter(
    dictsOfClaimType,
    (value: IDictionary) => value.dictCode !== 'DTH'
  );
  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemSelect
        form={form}
        mode={fieldProps?.mode}
        disabled={!editable || config?.editable === Editable.No}
        dicts={dictsOfClaimTypes}
        required={config?.required === Required.Yes}
        formName={field || fieldConfig.field}
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        name={config?.name}
        labelType={config.label?.type || fieldProps.label.type}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
      />
    </Col>
  );
};

const ClaimTypeArrayAdd = ({ field, config, form, editable, layout, isShow }: any) => (
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

ClaimTypeArrayAdd.displayName = 'ClaimTypeArray';

export default ClaimTypeArrayAdd;
