import React from 'react';
import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import { useSelector, useDispatch } from 'dva';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
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
  incidentId,
  treatmentId,
}: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
      config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

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
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
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
  incidentId,
  treatmentId,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentId={incidentId}
      treatmentId={treatmentId}
    />
  </Authority>
);

TreatmentType.displayName = localFieldConfig.field;

export default TreatmentType;
