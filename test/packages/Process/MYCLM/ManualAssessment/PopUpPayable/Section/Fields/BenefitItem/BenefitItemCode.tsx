import React, { useMemo } from 'react';
import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import {
  formUtils,
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
} from 'basic/components/Form';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { getPolicyList, getPolicyForBenefitItemList } from 'basic/utils/PolicyUtils';
import { localFieldConfig } from './BenefitItemCode.config';

export { localFieldConfig } from './BenefitItemCode.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const listPolicy = getPolicyList(NAMESPACE);
  const basic = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.popUpPayable?.basic || {}
  );
  const benefitListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.popUpPayable?.benefitListMap || {}
  );
  const Rules = {};
  const policyNo = formUtils.queryValue(basic?.policyNo) || '';
  const benefitTypeCode = formUtils.queryValue(basic?.benefitTypeCode) || '';
  const coverageKey = formUtils.queryValue(basic?.coverageKey) || '';

  const policyNoList = useMemo(() => {
    return getPolicyForBenefitItemList({ policyNo, listPolicy, benefitTypeCode, coverageKey });
  }, [listPolicy, policyNo, benefitTypeCode]);

  const disableItem = useMemo(() => {
    return lodash.reduce(
      benefitListMap,
      (arr: any, item: any) => {
        return item?.benefitItemCode && !lodash.isEmpty(item?.benefitItemCode)
          ? [...arr, formUtils.queryValue(item?.benefitItemCode)]
          : arr;
      },
      []
    );
  }, [benefitListMap]);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={policyNoList} // TODO: 动态下拉
          dictCode={config?.['x-dict']?.dictCode || fieldProps['x-dict'].dictCode}
          dictName={config?.['x-dict']?.dictName || fieldProps['x-dict'].dictName}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          existCodes={disableItem}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          optionShowType="both"
          dictTypeCode="Dropdown_PRD_BenefitItem"
        />
      </Col>
    )
  );
};

const BenefitItemCode = ({ field, config, isShow, layout, form, editable, }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

BenefitItemCode.displayName = 'BenefitItemCode';

export default BenefitItemCode;
