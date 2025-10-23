import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
} from 'basic/components/Form';

import { getDrowDownList } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'opus/Pages/Process/Claim/NonOpusSupportedClaim/activity.config';

import { localFieldConfig } from './ClaimStatus.config';
import { useDispatch, useSelector } from 'dva';

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dispatch = useDispatch();

  const partySource = useSelector(
    (state: any) => state?.[NAMESPACE]?.businessData?.insured?.partySource
  );
  const claimType = form?.getFieldValue('claimTypeArray');

  const require =
    (partySource === 'lifej' && claimType?.includes('WOP')) ||
    (partySource === 'klip' && claimType?.includes('DTH'));

  const visibleConditions = true;
  const editableConditions = require;
  const requiredConditions = require;

  // TODO:配置远程国际化
  const dicts = getDrowDownList({ fieldProps });

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
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
          optionShowType="dictName"
          onChange={(value: any) => {
            const oldValue = form.getFieldValue(config.name || field);
            if (oldValue !== value) {
              dispatch({
                type: `${NAMESPACE}/syncFieldData`,
                payload: {
                  hostClaimStatus: value,
                  dicts,
                },
              });
            }
          }}
        />
      </Col>
    )
  );
};

const ClaimStatus = ({ field, config, isShow, layout, form, editable, targets }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      targets={targets}
    />
  </Authority>
);

ClaimStatus.displayName = localFieldConfig.field;

export default ClaimStatus;
