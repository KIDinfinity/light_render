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
import { shallowEqual } from 'react-redux';
import { modifyAllLayerOfPayable } from '../../../../_models/functions/utils';
import { localFieldConfig } from './BenefitItemCode.config';
import { useGetBenifitItemList } from 'process/MYCLM/ManualAssessment/_hooks/';

export { localFieldConfig } from './BenefitItemCode.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const basic =
    useSelector(({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.popUpPayable?.basic) || {};
  const benefitListMap = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.popUpPayable?.benefitListMap
  );
  const policyNo = formUtils.queryValue(basic?.policyNo) || '';
  const benefitTypeCode = formUtils.queryValue(basic?.benefitTypeCode) || '';
  const coverageKey = formUtils.queryValue(basic?.coverageKey) || '';
  const benefitItemList = useGetBenifitItemList();
  const claimPayableList = useSelector(({ [NAMESPACE]: modelnamespace }: any) => {
    const existedBenefitItem = modelnamespace.claimProcessData?.claimPayableList;
    const claimPayableEnitity = modelnamespace.claimEntities?.claimPayableListMap;
    const isAppeal = modelnamespace.claimProcessData?.appeal;
    if (isAppeal) {
      return existedBenefitItem.map((id) => claimPayableEnitity[id]);
    }
    return [];
  }, shallowEqual);

  const claimEntities = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.claimEntities
  );

  const originalBenefitItem = lodash
    .chain(claimPayableList)
    .filter({
      policyNo,
      benefitTypeCode,
      coverageKey,
    })
    .map((payable) => {
      if (payable?.isNewPayable) return null;
      // 旧数据的claimPayable层级的benefitItemCode不会入库（appeal拿到的旧数据因此没有claimPayable层级的benefitItemCode数据），需要从子层级里面去找
      let benefitItemCode;
      modifyAllLayerOfPayable(payable, claimEntities, (leafPayable) => {
        if (leafPayable.benefitItemCode) benefitItemCode = leafPayable.benefitItemCode;
      });
      return formUtils.queryValue(benefitItemCode);
    })
    .filter((p) => p)
    .value();

  const disableItem = useMemo(() => {
    return lodash.reduce(
      benefitListMap || {},
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
          dicts={benefitItemList} // TODO: 动态下拉
          dictCode={config?.['x-dict']?.dictCode || fieldProps['x-dict'].dictCode}
          dictName={config?.['x-dict']?.dictName || fieldProps['x-dict'].dictName}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          existCodes={lodash.uniq(originalBenefitItem.concat(disableItem))}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          labelType="inline"
          optionShowType="both"
          // dictTypeCode="Dropdown_PRD_BenefitItem"
        />
      </Col>
    )
  );
};

const BenefitItemCode = ({ field, config, isShow, layout, form, editable }: any) => (
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

BenefitItemCode.displayName = 'BenefitItemCode';

export default BenefitItemCode;
