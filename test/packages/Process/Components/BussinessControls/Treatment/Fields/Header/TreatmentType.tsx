import React from 'react';

import { Col } from 'antd';
import { useSelector, useDispatch } from 'dva';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { ClaimType } from 'claim/enum';
import { localFieldConfig } from './TreatmentType.config';

export { localFieldConfig } from './TreatmentType.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  NAMESPACE,
  incidentId,
  treatmentId,
}: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = config || localFieldConfig['field-props'];
  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
      config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict']?.dictTypeCode
      ]
  );

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const onChange = (treatmentType: string) => {
    if (treatmentType === ClaimType.OPD) {
      dispatch({
        type: `${NAMESPACE}/saveEntry`,
        target: 'saveTreatmentItem',
        payload: {
          changedFields: {
            roomType: 'OU',
          },
          incidentId,
          treatmentId,
        },
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
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label?.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          onChange={onChange}
          labelType={config.label?.type || fieldProps.label.type}
          hideRequired
          choiseHighlight
          bordered
        />
      </Col>
    )
  );
};

const TreatmentType = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  NAMESPACE,
  id,
  incidentId,
  treatmentId,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
      NAMESPACE={NAMESPACE}
      incidentId={incidentId}
      treatmentId={treatmentId}
    />
  </Authority>
);

TreatmentType.displayName = localFieldConfig.field;

export default TreatmentType;
