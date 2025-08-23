import React, { useMemo } from 'react';
import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
  formUtils,
  Validator,
} from 'basic/components/Form';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { filterBenefitList } from 'claim/pages/utils/formUtils';
import { checkServicePayableList } from 'claimBasicProduct/pages/validators';

import { localFieldConfig } from './BenefitItemCode.config';

export { localFieldConfig } from './BenefitItemCode.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  curServicePayableList,
  id,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const listPolicy = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.listPolicy
  );
  const serviceItemPayableItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.serviceItemPayableListMap?.[id]
  );
  const serviceItemPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.serviceItemPayableListMap
  );
  const listPerConfinementLimit = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.listPerConfinementLimit
  );
  const { benefitTypeCode, policyNo, productCode } =
    formUtils.cleanValidateData(serviceItemPayableItem);
  const policyList = useMemo(() => {
    return lodash.filter(
      listPolicy,
      (item) =>
        item.policyNo === policyNo &&
        item.coreProductCode === productCode &&
        item.benefitTypeCode === benefitTypeCode
    );
  }, [policyNo, benefitTypeCode, productCode, listPolicy]);

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const listPerConfinementLimitfiler = lodash.filter(
    listPerConfinementLimit,
    (item) =>
      item?.benefitTypeCode === formUtils.queryValue(serviceItemPayableItem?.benefitTypeCode)
  );

  const Rules = {
    VLD_000721: Validator.VLD_000721({
      listPerConfinementLimit: listPerConfinementLimitfiler,
      parentPayableId: serviceItemPayableItem?.invoicePayableId,
      childPayableListMap: serviceItemPayableListMap,
    }),
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={policyList} // TODO: 动态下拉
          filterList={filterBenefitList(policyList)}
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
          rules={lodash.concat(
            [
              {
                validator: (rule: any, value: any, callback: Function) =>
                  checkServicePayableList(
                    rule,
                    value,
                    callback,
                    curServicePayableList,
                    serviceItemPayableItem
                  ),
              },
            ],
            lodash.compact(
              (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules?.[rule])
            )
          )}
          optionShowType="both"
          labelType="inline"
        />
      </Col>
    )
  );
};

const BenefitItemCode = ({ field, config, isShow, layout, form, editable, id }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
    />
  </Authority>
);

BenefitItemCode.displayName = 'BenefitItemCode';

export default BenefitItemCode;
