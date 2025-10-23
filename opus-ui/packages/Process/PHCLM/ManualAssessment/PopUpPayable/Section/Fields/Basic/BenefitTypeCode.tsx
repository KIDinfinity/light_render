import React, { useEffect, useMemo } from 'react';

import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import { Authority, Visible, Editable, Required, FormItemSelect } from 'basic/components/Form';
import { getPolicyList, getPolicyForBenefitTypeListForPH } from 'basic/utils/PolicyUtils';
import { useGetBenifitItemList } from 'process/PHCLM/ManualAssessment/_hooks/';

import { localFieldConfig } from './BenefitTypeCode.config';

export { localFieldConfig } from './BenefitTypeCode.config';

import { useDispatch } from 'dva';
import lodash from 'lodash';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;
  const listPolicy = getPolicyList(NAMESPACE);
  const dispatch = useDispatch();
  const policyNo = form.getFieldValue('policyNo');
  const coreProductCode = form.getFieldValue('coreProductCode');
  const oldBenefitTypeCode = form.getFieldValue('oldBenefitTypeCode');
  const dicts = useMemo(() => {
    const benefitTypeList = getPolicyForBenefitTypeListForPH({
      policyNo,
      listPolicy,
      coverageKey: true,
    });
    return lodash.filter(benefitTypeList, { coreProductCode });
  }, [listPolicy, policyNo, coreProductCode]);
  const benefitItemList = useGetBenifitItemList();
  const haneldeChangeBenefitTypeCode = () => {
    dispatch({
      type: `${NAMESPACE}/popUpPableChangeBenefitItem`,
      payload: {
        changedFields: {
          benefitItemCode: benefitItemList[0]?.benefitItemCode,
        },
        benefitTypecodeAddFlag: benefitItemList?.length === 1 ? true : 'Delete',
      },
    });
    dispatch({
      type: `${NAMESPACE}/getPopPayableExchangeRate`,
    });
  };
  useEffect(() => {
    haneldeChangeBenefitTypeCode();
  }, [oldBenefitTypeCode]);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts} // TODO: 动态下拉
          dictCode={config?.['x-dict']?.dictCode || fieldProps['x-dict'].dictCode}
          dictName={config?.['x-dict']?.dictName || fieldProps['x-dict'].dictName}
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
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          defaultSelectFirst={dicts.length === 1}
          getPopupContainer={() => document.body}
        />
      </Col>
    )
  );
};

const BenefitTypeCode = ({ field, config, isShow, layout, form, editable }: any) => (
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

BenefitTypeCode.displayName = 'oldBenefitTypeCode';

export default BenefitTypeCode;
