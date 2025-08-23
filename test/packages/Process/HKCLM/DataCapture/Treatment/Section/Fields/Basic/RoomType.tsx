import React, { useEffect, useMemo, useState } from 'react';
import lodash from 'lodash';
import { NAMESPACE } from '../../../../activity.config';

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
import { ClaimType } from 'claim/enum';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const dispatch = useDispatch();
  const [isFirst, setIsFirst] = useState(true);
  const fieldProps: any = localFieldConfig['field-props'];

  const {
    medicalProvider,
    id: treatmentId,
    incidentId,
  }: any = form.getFieldsValue(['medicalProvider', 'id', 'incidentId']);

  const hospitalType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.treatmentListMap[treatmentId]?.hospitalType
  );

  const dicts = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.roomTypeDict);

  const incidentItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.incidentListMap?.[incidentId]
  );
  const claimTypeArray = formUtils.queryValue(lodash.get(incidentItem, 'claimTypeArray'));
  const isInclude = lodash.includes(claimTypeArray, ClaimType.IPD);

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

  const filterList = useMemo(() => {
    if (medicalProvider === '998') {
      return ['AS', 'P', 'S', 'W', 'GW'];
    }
    return [];
  }, [medicalProvider]);

  const visibleConditions = true;
  const editableConditions = !lodash.isEmpty(formUtils.queryValue(hospitalType));
  const requiredConditions = Rule(fieldProps['required-condition'], form, '') || isInclude;

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
          filterList={filterList}
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

const RoomType = ({ field, config, isShow, layout, form, editable }: any) => (
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

RoomType.displayName = localFieldConfig.field;

export default RoomType;
