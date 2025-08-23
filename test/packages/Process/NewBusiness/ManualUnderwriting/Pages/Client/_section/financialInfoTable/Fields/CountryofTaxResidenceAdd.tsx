import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import {
  Authority,
  Editable,
  FormItemSelect,
  Visible,
  RuleByForm,
  Validator,
  formUtils,
} from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import { tenant, Region } from '@/components/Tenant';

import { fieldConfig } from './CountryofTaxResidenceAdd.config';
export { fieldConfig } from './CountryofTaxResidenceAdd.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id, crtInfoList }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.addressDict?.country?.dict,
    shallowEqual
  );
  const usTaxFlag = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData.entities?.clientMap?.[id]?.financialInfo?.usTaxFlag
  );
  const crtInfoMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData.entities?.crtInfoMap,
    shallowEqual
  );

  const visibleConditions = true;
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const required = tenant.region({
    [Region.ID]:
      formUtils.queryValue(usTaxFlag) === 'Y' &&
      lodash.filter(
        crtInfoList,
        (crtId) => crtInfoMap?.[crtId]?.ctfType === 'TN' && crtInfoMap?.[crtId]?.type === 'S'
      ).length === 0,
    [Region.MY]:
      formUtils.queryValue(usTaxFlag) === 'Y' &&
      lodash.filter(
        crtInfoList,
        (crtId) => crtInfoMap?.[crtId]?.ctfType === 'TN' && crtInfoMap?.[crtId]?.type === 'S'
      ).length === 0,
    notMatch: false,
  });
  const Rules = tenant.region({
    [Region.ID]: {
      VLD_000935: Validator.VLD_000935(usTaxFlag, crtInfoList),
    },
    [Region.MY]: {
      VLD_000936: Validator.VLD_000936(crtInfoMap, crtInfoList),
    },
    notMatch: {},
  });

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
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          isInline
          dictCode="subCode"
          dictName="subName"
          required={required}
          rules={lodash.compact(fieldProps['x-rules']?.map((rule: string) => Rules[rule]))}
        />
      </Col>
    )
  );
};

const CountryofTaxResidence = ({
  form,
  editable,
  layout,
  isShow,
  config,
  handleFocus,
  id,
  crtItemId,
  crtInfoList,
}: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        handleFocus={handleFocus}
        id={id}
        crtItemId={crtItemId}
        readOnly
        crtInfoList={crtInfoList}
      />
    </Authority>
  );
};

CountryofTaxResidence.displayName = 'ctfCountryCode';

export default CountryofTaxResidence;
