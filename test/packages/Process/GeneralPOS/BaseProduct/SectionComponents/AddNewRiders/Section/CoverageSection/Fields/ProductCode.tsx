import React, { useMemo } from 'react';
import { Col } from 'antd';
import {
  Editable,
  Required,
  Visible,
  Rule,
  FormItemSelect,
  formUtils,
} from 'basic/components/Form';
import { localFieldConfig } from './ProductCode.config';

export { localFieldConfig } from './ProductCode.config';
import lodash from 'lodash';
import useGetProductDicts from 'process/GeneralPOS/BaseProduct/_hooks/useGetProductDicts';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { useSelector } from 'dva';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  sclale,
  id,
  transactionId,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dicts = useGetProductDicts({ id, transactionId });

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const uwCoverageList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.uwPolicy?.uwCoverageList
  );
  const productCodes = lodash.map(uwCoverageList, (coverage) =>
    formUtils.queryValue(coverage.productCode)
  );
  const currentProductCode = form.getFieldValue(field);

  const existCodes = useMemo(() => {
    const maxNoLimitProduct = lodash
      .chain(productCodes)
      .filter((productCode: any) => {
        const maxNo = lodash
          .chain(dicts)
          .find((item: any) => item.productCode === productCode)
          .get('maxNo')
          .value();
        const addedProdcutCount =
          lodash.filter(productCodes, (item: any) => item === productCode)?.length || 0;
        if (lodash.isNull(maxNo)) {
          return false;
        }
        return lodash.toNumber(maxNo) <= addedProdcutCount;
      })
      .uniq()
      .value();
    const filterNonSupportProduct = lodash
      .chain(dicts)
      .filter((item) => item.isSupported === 'N')
      .map((item) => item.productCode)
      .value();
    const otherProducts = lodash.filter(productCodes, (item: any) => item !== currentProductCode);
    return lodash.concat(maxNoLimitProduct, filterNonSupportProduct, otherProducts);
  }, [currentProductCode, dicts, productCodes]);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col
        {...layout}
        style={{
          width: `calc((1443px * ${sclale || 0.96} - 32px) / 24 * ${
            config?.['x-layout']?.lg?.span || fieldProps?.['x-layout']?.lg?.span
          })`,
          padding: 8,
        }}
      >
        <FormItemSelect
          getPopupContainer={() => document.querySelector('.AddNewRiders') || document.body}
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
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          isInline
          optionShowType="both"
          placeholder=" "
          dictCode="productCode"
          dictName="productName"
          existCodes={existCodes}
        />
      </Col>
    )
  );
};

FormItem.displayName = localFieldConfig.field;

export default FormItem;
