import React from 'react';
import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemCheckbox,
  Required,
  Visible,
  Validator,
} from 'basic/components/Form';
import { localFieldConfig } from './SpecialEndorsement.config';

export { localFieldConfig } from './SpecialEndorsement.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, incidentId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const submited = useSelector(({ formCommonController }: any) => formCommonController.submited);
  const claimPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.claimPayableListMap
  );
  const rules = {
    VLD_000597: Validator.VLD_000597(incidentId, claimPayableListMap, submited),
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
        <FormItemCheckbox
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
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          labelType="inline"
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => rules[rule])
          )}
        />
      </Col>
    )
  );
};

const SpecialEndorsement = ({ field, config, isShow, layout, form, editable, incidentId }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentId={incidentId}
    />
  </Authority>
);

SpecialEndorsement.displayName = localFieldConfig.field;

export default SpecialEndorsement;
