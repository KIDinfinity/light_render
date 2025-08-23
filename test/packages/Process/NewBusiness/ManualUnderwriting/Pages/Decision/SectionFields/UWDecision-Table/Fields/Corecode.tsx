import React, { useMemo } from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  RuleByForm,
  Validator,
} from 'basic/components/Form';
import useGetProductDicts from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetProductDicts';
import usehandleProductNameChangeCallback from 'decision/components/Benefit/Edit/_hooks/CoreCode/usehandleProductNameChangeCallback';
import useGetClientDetailList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetClientDetailList';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import useSetSubProductType from 'decision/_hooks/useSetSubProductType';
import useLodaRiderRequiredInd from 'decision/_hooks/useLodaRiderRequiredInd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { MessageType } from 'process/NewBusiness/ManualUnderwriting/_enum/medicalSearchMessageType';
import useGetProductMaxNoLimit from 'decision/components/Benefit/Edit/_hooks/CoreCode/useGetProductMaxNoLimit';
import { fieldConfig } from './Corecode.config';
export { fieldConfig } from './Corecode.config';

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  id,
  field,
  config,
  clientId,
  disabled,
  disabledForMain,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGetProductDicts({
    id,
  });
  const filterNonSupportProduct = lodash
    .chain(dicts)
    .filter((item) => item.isSupported === 'N')
    .map((item) => item.productCode)
    .value();
  const riderRequiredInd = useLodaRiderRequiredInd({ id });
  useSetSubProductType({ id, dicts });
  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = true;
  const list = useGetClientDetailList();
  const coverageList = useGetCoverageList('edit');
  const currentCoreCode = form.getFieldValue(config.name || field || 'coreCode');
  const handleProductChange = usehandleProductNameChangeCallback({ id });
  const isShowWarning = useMemo(() => {
    return lodash.every(dicts, (product: any) => {
      return product.productCode !== currentCoreCode;
    });
  }, [currentCoreCode, dicts]);
  const maxNoLimitProduct = useGetProductMaxNoLimit();

  const Rules = {
    VLD_000681: Validator.VLD_000681({
      products: dicts,
      clientInfoList: list,
      clientId,
    }),
    VLD_000680: Validator.VLD_000680({
      products: dicts,
      clientInfoList: list,
      clientId,
    }),
    VLD_000684: Validator.VLD_000684({
      products: dicts,
      coverageList,
      coverageId: id,
    }),
  };

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
            disabled ||
            riderRequiredInd ||
            disabledForMain ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
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
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          warningMessage={
            isShowWarning
              ? [
                  {
                    message: formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000851' }),
                    messageType: MessageType.Error,
                  },
                ]
              : []
          }
          labelType="inline"
          hiddenPrefix
          precision={0}
          optionShowType="both"
          placeholder=" "
          dictCode="productCode"
          dictName="productName"
          onChange={handleProductChange}
          getPopupContainer={() => document.body}
          existCodes={maxNoLimitProduct.concat(filterNonSupportProduct)}
        />
      </Col>
    )
  );
};

const Productname = ({
  field,
  config,
  form,
  editable,
  layout,
  isShow,
  id,
  clientId,
  disabled,
  disabledForMain,
}: any) => {
  return (
    <Authority>
      <FormItem
        field={field}
        config={config?.['field-props']}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        id={id}
        clientId={clientId}
        disabled={disabled}
        disabledForMain={disabledForMain}
      />
    </Authority>
  );
};

Productname.displayName = 'coreCode';

export default Productname;
