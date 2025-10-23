import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Required, Visible } from 'basic/components/Form';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'process/PHCLM/DataCapture/activity.config';
import lodash from 'lodash';
import { localFieldConfig } from './ClaimTypeArray.config';
import { formUtils } from 'basic/components/Form';

export { localFieldConfig } from './ClaimTypeArray.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const existedClaimTypes = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
    const incidentList = modelnamepsace.claimProcessData.incidentList;
    const incidentListMap = modelnamepsace.claimEntities.incidentListMap;
    return lodash.compact(
      incidentList.map((id) => formUtils.queryValue(incidentListMap[id]?.claimTypeArray)?.[0])
    );
  }, shallowEqual);

  const incidentList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData?.incidentList
  );

  const dictsOfClaimType = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config?.['field-props']?.['x-dict']?.dictTypeCode || fieldProps['x-dict'].dictTypeCode
      ]
  );

  const filteredClaimTypes = !existedClaimTypes.length
    ? dictsOfClaimType
    : existedClaimTypes.includes('DTH')
    ? []
    : dictsOfClaimType?.filter(
        (option) => !existedClaimTypes.includes(option.dictCode) && option.dictCode !== 'DTH'
      ) || [];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = lodash.isEmpty(incidentList);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={filteredClaimTypes}
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
          mode="multiple"
          labelType="inline"
          choiseHighlight
          placeholderHighlight
          placeholder={formatMessageApi({
            Label_BIZ_Claim: 'chooseType',
          })}
          bordered
        />
      </Col>
    )
  );
};

const ClaimTypeArray = ({ field, config, isShow, layout, form, editable }: any) => (
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

ClaimTypeArray.displayName = localFieldConfig.field;

export default ClaimTypeArray;
