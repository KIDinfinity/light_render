import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Required, Visible } from 'basic/components/Form';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/PHCLM/ManualAssessment/activity.config';
import { localFieldConfig } from './ClaimTypeArray.config';
import { formUtils } from 'basic/components/Form';
import CaseCategory from 'enum/CaseCategory';

export { localFieldConfig } from './ClaimTypeArray.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, incidentId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dispatch = useDispatch();

  const { serviceItemListMap, existedClaimTypes, caseCategory } = useSelector(
    ({ [NAMESPACE]: modelnamepsace, processTask }: any) => {
      const incidentList = modelnamepsace.claimProcessData.incidentList || [];
      const incidentListMap = modelnamepsace.claimEntities.incidentListMap;
      const currentClaimType = formUtils.queryValue(
        incidentListMap[incidentId]?.claimTypeArray
      )?.[0];
      return {
        caseCategory: processTask.getTask?.caseCategory,
        serviceItemListMap: modelnamepsace.claimEntities.serviceItemListMap,
        existedClaimTypes: incidentList
          .map((id) => formUtils.queryValue(incidentListMap[id]?.claimTypeArray)?.[0])
          .filter((claimType) => claimType && claimType !== currentClaimType),
      };
    },
    (prev, next) => {
      return (
        prev.serviceItemListMap === next.serviceItemListMap &&
        shallowEqual(prev.existedClaimTypes, next.existedClaimTypes) &&
        prev.caseCategory === next.caseCategory
      );
    }
  );

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const dictsOfClaimType = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[config?.['x-dict']?.dictTypeCode || fieldProps['x-dict'].dictTypeCode] ||
      []
  );
  const dictsOfClaimTypes = dictsOfClaimType.filter(({ dictCode }) =>
    caseCategory === CaseCategory.BP_CLM_CTG008
      ? dictCode === 'DTH' && !existedClaimTypes.length
      : dictCode !== 'DTH' && !existedClaimTypes.includes(dictCode)
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
          dicts={dictsOfClaimTypes} // TODO: 动态下拉
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
