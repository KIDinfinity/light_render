import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Required, Visible } from 'basic/components/Form';
import { useSelector, useDispatch,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/PHCLM/DataCapture/activity.config';
import { localFieldConfig } from './ClaimTypeArray.config';
import lodash from 'lodash'

export { localFieldConfig } from './ClaimTypeArray.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, incidentId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dispatch = useDispatch();

  // existedClaimType代表所有incident的claimType option数组
  const { serviceItemListMap, existedClaimTypes, currentClaimType } = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => {
      const incidentList = modelnamepsace.claimProcessData.incidentList;
      const incidentListMap = modelnamepsace.claimEntities.incidentListMap

      return {
        serviceItemListMap: modelnamepsace.claimEntities.serviceItemListMap,
        existedClaimTypes: lodash.compact(incidentList.map(id => formUtils.queryValue(incidentListMap[id]?.claimTypeArray)?.[0])),
        currentClaimType: formUtils.queryValue(incidentListMap[incidentId]?.claimTypeArray)?.[0]
      }
    }, (prev, next) => {
      return prev.serviceItemListMap === next.serviceItemListMap &&
        shallowEqual(prev.existedClaimTypes, next.existedClaimTypes) &&
        prev.currentClaimType === next.currentClaimType
    }
  );

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const dictsOfClaimType = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config?.['field-props']?.['x-dict']?.dictTypeCode || fieldProps['x-dict'].dictTypeCode
      ]
  ) || [];

  const onChange = (value: any) => {
    dispatch({
      type: `${NAMESPACE}/getRepeatableByServiceCode`,
      payload: { serviceItemList: serviceItemListMap, incidentId, claimTypeArray: value },
    });
  };

  // 先拿到当前incident的claimType option，随后会将其重新塞进当前的dicts里
  const currentClaimOption = dictsOfClaimType?.find(option => option.dictCode === currentClaimType)
  // 如果没选任何claimType，那就展示全部option
  // 如果有任何一条（比方说A incident）选了DTH，那么非A incident不能做任何选择（不能选多条DTH，且DTH和其他claimType 不共存），而A incident可以选任意claimType（一旦A选择了其他claimType就不存在DTH了，不存在不能共存的问题）
  // 其它的情况下（有incident选了claimType，但不是DTH），则将所有已选的dictCode和DTH筛掉
  // 补充：如果只有一条非DTH的（比方说A incident），则A incident不筛掉DTH，因为即便A incident改选DTH也不存在冲突问题
  const filteredClaimTypes = !existedClaimTypes.length ? dictsOfClaimType : existedClaimTypes.includes('DTH') && currentClaimType !== 'DTH'? [] : dictsOfClaimType?.filter(option =>
    !existedClaimTypes.includes(option.dictCode) && ((existedClaimTypes.length === 1 && existedClaimTypes[0] === currentClaimType) || option.dictCode !== 'DTH')
  ) || []

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={lodash.compact([currentClaimOption, ...filteredClaimTypes])}
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
          labelType="inline"
          hideRequired
          choiseHighlight
          bordered
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
