import React, { useEffect } from 'react';
import { NAMESPACE } from '../../../../activity.config';
import { Col } from 'antd';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { IncidentCode } from 'claim/pages/Enum';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
  formUtils,
} from 'basic/components/Form';
import { localFieldConfig } from './CauseOfIncident.config';

export { localFieldConfig } from './CauseOfIncident.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  id,
  skipAutoChangeField,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dispatch = useDispatch();
  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );
  const isRegisterMcs = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isRegisterMcs
  );

  const claimTypeArray = useSelector(({ [NAMESPACE]: modelnamepsace }: any) =>
    formUtils.queryValue(modelnamepsace.claimEntities.incidentListMap?.[id]?.claimTypeArray || [])
  );

  useEffect(() => {
    if (
      !skipAutoChangeField &&
      (lodash.includes(claimTypeArray, IncidentCode.Crisis) ||
        lodash.includes(claimTypeArray, IncidentCode.Mental))
    ) {
      dispatch({
        type: `${NAMESPACE}/saveIncidentItem`,
        payload: {
          changedFields: { causeOfIncident: 'I' },
          incidentId: id,
        },
      });
    }
  }, [claimTypeArray, id, dispatch, skipAutoChangeField]);

  const visibleConditions = true;
  const editableConditions = Rule(fieldProps['editable-condition'], form, '') && !isRegisterMcs;
  const requiredConditions = true;

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
        />
      </Col>
    )
  );
};

const CauseOfIncident = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  id,
  skipAutoChangeField,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
      skipAutoChangeField={skipAutoChangeField}
    />
  </Authority>
);

CauseOfIncident.displayName = localFieldConfig.field;

export default CauseOfIncident;
