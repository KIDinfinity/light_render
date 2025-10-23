import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { useDispatch } from 'dva';

import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import useGetProductDicts from 'process/NB/ManualUnderwriting/_hooks/useGetProductDicts';
import usehandleProductNameChangeCallback from 'process/NB/ManualUnderwriting/_hooks/usehandleProductNameChangeCallback';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';
import useProductNameValidateTrigger from 'process/NB/ManualUnderwriting/_hooks/useProductNameValidateTrigger';
import useSetSubProductType from 'process/NB/ManualUnderwriting/_hooks/useSetSubProductType';
import useLodaRiderRequiredInd from 'process/NB/ManualUnderwriting/_hooks/useLodaRiderRequiredInd';
import useChangeContractType from 'process/NB/ManualUnderwriting/_hooks/useChangeContractType';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { MessageType } from 'process/NB/ManualUnderwriting/Enum/medicalSearchMessageType';
import useGetProductMaxNoLimit from 'process/NB/ManualUnderwriting/_hooks/useGetProductMaxNoLimit';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

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
  const dispatch = useDispatch();
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGetProductDicts({
    id,
  });

  const riderRequiredInd = useLodaRiderRequiredInd({ id });
  useSetSubProductType({ id, dicts, coreCode: form.getFieldValue('coreCode') });
  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = true;
  const coverageList = useGetCoverageList();
  const handleProductChange = usehandleProductNameChangeCallback({ id });
  const isShowWarning = useChangeContractType({ id });
  const Rules = {};
  useProductNameValidateTrigger({ form, coverageId: id, coverageList, clientId });
  const maxNoLimitProduct = useGetProductMaxNoLimit();

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
          onChange={(coreCode: string) => {
            dispatch({
              type: `${NAMESPACE}/getFundConfigListByProductCodeListByChange`,
              payload: {
                coreCode,
                id,
              }
            });
            handleProductChange(coreCode)
          }}
          getPopupContainer={() => document.body}
          existCodes={maxNoLimitProduct}
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
