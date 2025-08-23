import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Required, Visible } from 'basic/components/Form';
import { useSelector, useDispatch } from 'dva';
import { NAMESPACE } from 'process/PHCLM/ManualAssessment/activity.config';
import { localFieldConfig } from './ClaimTypeArray.config';
import { formUtils } from 'basic/components/Form';
import CaseCategory from 'enum/CaseCategory';
import { getDrowDownList } from '@/utils/dictFormatMessage';

export { localFieldConfig } from './ClaimTypeArray.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, incidentId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dispatch = useDispatch();

  const { serviceItemListMap, caseCategory, claimTypes } = useSelector(
    ({ [NAMESPACE]: modelnamepsace, processTask }: any) => {
      return {
        caseCategory: processTask.getTask?.caseCategory,
        serviceItemListMap: modelnamepsace.claimEntities.serviceItemListMap,
        claimTypes: formUtils.queryValue(
          modelnamepsace.claimEntities?.incidentListMap?.[incidentId]?.claimTypeArray
        )?.[0],
      };
    }
  );

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const dicts = getDrowDownList(
    caseCategory === CaseCategory.BP_CLM_CTG008 ? 'ClaimType_Major' : 'ClaimType_Minor'
  );

  const onChange = (value: any) => {
    dispatch({
      type: `${NAMESPACE}/getRepeatableByServiceCode`,
      payload: { serviceItemList: serviceItemListMap, incidentId, claimTypeArray: value },
    });
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts} // TODO: 动态下拉
          existCodes={claimTypes}
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
          bordered
          allowClear={false}
          onChange={onChange}
          labelType={config.label?.type || fieldProps.label.type}
          hideRequired
          choiseHighlight
        />
      </Col>
    )
  );
};

const ClaimTypeArray = ({ field, config, isShow, layout, form, editable, incidentId }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentId={incidentId}
    />
  </Authority>
);

ClaimTypeArray.displayName = localFieldConfig.field;

export default ClaimTypeArray;
