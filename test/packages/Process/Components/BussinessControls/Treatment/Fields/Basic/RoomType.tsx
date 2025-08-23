import React, { useEffect, useState } from 'react';

import { Col } from 'antd';
import { useSelector, useDispatch } from 'dva';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Rule,
  Visible,
  formUtils,
} from 'basic/components/Form';
import { localFieldConfig } from './RoomType.config';

export { localFieldConfig } from './RoomType.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  NAMESPACE,
  treatmentId,
}: any) => {
  const dispatch = useDispatch();
  const [isFirst, setIsFirst] = useState(true);
  const fieldProps: any = config || localFieldConfig['field-props'];

  const hospitalType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId].hospitalType
  );

  const dicts = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.roomTypeDict);

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getRoomTypeDict`,
      payload: {
        hospitalType: formUtils.queryValue(hospitalType),
        treatmentId,
        isFirst,
      },
    });
    if (isFirst) {
      setIsFirst(false);
    }
  }, [formUtils.queryValue(hospitalType)]);

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

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
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label?.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
        />
      </Col>
    )
  );
};

const RoomType = ({ field, config, isShow, layout, form, editable, id, NAMESPACE, treatmentId }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
      NAMESPACE={NAMESPACE}
      treatmentId={treatmentId}
    />
  </Authority>
);

RoomType.displayName = localFieldConfig.field;

export default RoomType;
