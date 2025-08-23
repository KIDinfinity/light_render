import React from 'react';
import { NAMESPACE } from '../../../activity.config';

import { Col } from 'antd';
import { useSelector, useDispatch } from 'dva';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
} from 'basic/components/Form';
import lodash from 'lodash';
import { relationshipWithInsuredForHK } from 'claim/enum';
import { localFieldConfig } from './RelationshipWithInsured.config';

export { localFieldConfig } from './RelationshipWithInsured.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
      config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );

  const policyOwnerList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.policyOwnerList
  );
  const dispatch = useDispatch();
  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;
  const changeRelationship = (value: any) => {
    if (value === relationshipWithInsuredForHK.policyOwner && lodash.isEmpty(policyOwnerList)) {
      dispatch({
        type: `${NAMESPACE}/getPolicyOwnerList`,
        payload: {},
      });
    }
  };
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
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          onChange={changeRelationship}
        />
      </Col>
    )
  );
};

const RelationshipWithInsured = ({ field, config, isShow, layout, form, editable, }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

RelationshipWithInsured.displayName = localFieldConfig.field;

export default RelationshipWithInsured;
