import { Region, tenant } from '@/components/Tenant';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  FormItemSelect,
  Required,
  Rule,
  Visible,
  Validator,
} from 'basic/components/Form';
import lodash from 'lodash';
import useGetCurrentLevelAddress from 'process/GeneralPOS/BaseProduct/_hooks/useGetCurrentLevelAddress';
import useLoadSubAddress from 'process/GeneralPOS/BaseProduct/_hooks/useLoadSubAddress';
import { AddressLevelEnum } from 'process/GeneralPOS/common/Enum';
import useIsCurrentRegion from 'process/GeneralPOS/BaseProduct/_hooks/useIsCurrentRegion';
import React from 'react';
import { isDataCapture } from 'process/GeneralPOS/common/utils';
import { MessageType } from 'claim/enum/medicalSearchMessageType';
import { useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { localFieldConfig } from './AddressLine5.config';

export { localFieldConfig } from './AddressLine5.config';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  recoverObj,
  OnRecover,
  transactionId,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const addressLevel = tenant.region({
    [Region.PH]: AddressLevelEnum.Country,
    [Region.MY]: AddressLevelEnum.Province,
    [Region.TH]: AddressLevelEnum.Province,
    notMatch: AddressLevelEnum.Country,
  });
  const varLevel = tenant.region({
    [Region.PH]: 'country',
    [Region.MY]: 'province',
    notMatch: 'country',
  });
  const { caseCategory } = useSelector(({ processTask }: any) => processTask.getTask) || {};
  const isDataCaptureCase = isDataCapture({ caseCategory });
  const isCurrentRegion = useIsCurrentRegion({ form });
  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  const value = form.getFieldValue(field);
  const maxLength = 30;

  const valueToString = lodash.toString(value);

  useLoadSubAddress({
    addressLevel,
    parentCode: form.getFieldValue(field),
    transactionId,
  });

  const dicts = useGetCurrentLevelAddress({
    addressLevel,
    transactionId,
  });

  const otherParams = tenant.region({
    [Region.PH]: {
      recoverValue: recoverObj[localFieldConfig.field],
      OnRecover,
    },
    [Region.MY]: {},
    notMatch: {},
  });
  const selectDicts = tenant.region({
    [Region.TH]: {
      dicts: dicts?.map((item) => ({ dictCode: item?.code, dictName: item?.description })),
    },
    notMatch: {
      dicts: dicts?.map((item) => ({ dictCode: item?.subCode, dictName: item?.subName })),
    },
  });
  const Rules = {
    VLD_000002: Validator.VLD_000002(undefined, maxLength),
    VLD_001015: Validator.VLD_001015(selectDicts?.dicts, field),
  };

  const isHistory = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isHistory);

  const warningMessage = () => {
    const warns = [];
    if (isHistory) {
      return warns;
    }
    if (tenant.isPH() && isDataCaptureCase && valueToString?.length > maxLength) {
      warns.push({
        messageType: MessageType.Information,
        message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000003' }, maxLength),
      });
    }
    return warns;
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {isCurrentRegion ? (
          <FormItemSelect
            {...selectDicts}
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
              (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
            )}
            {...otherParams}
          />
        ) : (
          <FormItemInput
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
            required={
              (config.required || fieldProps.required) === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes
            }
            warningMessage={warningMessage()}
          />
        )}
      </Col>
    )
  );
};

const AddressLine5 = ({
  isShow,
  layout,
  form,
  editable,
  recoverObj,
  OnRecover,
  transactionId,
  config,
}: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      recoverObj={recoverObj}
      OnRecover={OnRecover}
      transactionId={transactionId}
      field={localFieldConfig.field}
      config={config}
    />
  </Authority>
);

AddressLine5.displayName = localFieldConfig.field;

export default AddressLine5;
