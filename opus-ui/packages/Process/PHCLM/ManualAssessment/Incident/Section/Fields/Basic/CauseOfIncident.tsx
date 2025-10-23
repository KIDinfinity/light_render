import React, { useEffect } from 'react';
import { NAMESPACE } from '../../../../activity.config';
import { Col } from 'antd';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
  formUtils,
} from 'basic/components/Form';
import { IncidentCode } from 'claim/pages/Enum';
import { localFieldConfig } from './CauseOfIncident.config';

export { localFieldConfig } from './CauseOfIncident.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dispatch = useDispatch();
  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );

  const claimTypeArray = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.incidentListMap[id]?.claimTypeArray
  );
  useEffect(() => {
    if (lodash.includes(formUtils.queryValue(claimTypeArray), IncidentCode.Crisis)) {
      dispatch({
        type: `${NAMESPACE}/saveIncidentItem`,
        payload: {
          changedFields: { causeOfIncident: 'I' },
          incidentId: id,
        },
      });
    }
  }, [claimTypeArray, id, dispatch]);

  const visibleConditions = true;
  const editableConditions = Rule(
    config['editable-condition'] || fieldProps['editable-condition'],
    form,
    ''
  );
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

const CauseOfIncident = ({ field, config, isShow, layout, form, editable, id }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
    />
  </Authority>
);

CauseOfIncident.displayName = localFieldConfig.field;

export default CauseOfIncident;
