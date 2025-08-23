import React, { useMemo } from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Visible,
  Rule,
  Validator,
} from 'basic/components/Form';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import { useSelector } from 'dva';
import { findSubTypeCodeByTransactionType } from 'process/BPSRV/common/findSubTypeCodeByTransactionType';
import styles from '../../index.less';

import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { localFieldConfig } from './PhoneNo.config';

export { localFieldConfig } from './PhoneNo.config';
import { isDataCapture } from 'process/GeneralPOS/common/utils';
import { MessageType } from 'claim/enum/medicalSearchMessageType';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  recoverObj = {},
  OnRecover,
  transactionId,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const { caseCategory } = useSelector(({ processTask }: any) => processTask.getTask) || {};

  const isDataCaptureCase = isDataCapture({ caseCategory });
  const value = form.getFieldValue(field);

  const subTypeCode = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.contactInfo?.subTypeCode
  );
  const transactionTypeCodeMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.transactionTypeCodeMap
  );
  const rcsApplicable = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.rcsApplicable
  );
  const preDecision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.preDecision
  );
  const emailSubTypeCode = useMemo(
    () =>
      findSubTypeCodeByTransactionType(
        transactionTypeCodeMap,
        'SRV001',
        /changeofemail/gi,
        'SRV_SUB004'
      ),
    [transactionTypeCodeMap]
  );

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = tenant.region({
    [Region.ID]: form.getFieldValue(config.name || field)?.length > 0 ? true : false,
    notMatch: Rule(fieldProps['required-condition'], form, ''),
  });

  const required = tenant.region({
    [Region.ID]:
      subTypeCode === emailSubTypeCode &&
      (config.required || fieldProps.required) === Required.Conditions
        ? requiredConditions
        : (config.required || fieldProps.required) === Required.Yes,
    notMatch: () =>
      (config.required || fieldProps.required) === Required.Conditions
        ? requiredConditions
        : (config.required || fieldProps.required) === Required.Yes,
  });

  const Rules = {
    VLD_000621: Validator.VLD_000621(),
    VLD_000962: rcsApplicable === '01' && preDecision !== 'AP' && Validator.VLD_000962(),
    VLD_000963: Validator.VLD_000963(preDecision),
    VLD_000964: Validator.VLD_000964(preDecision),
    VLD_000965: Validator.VLD_000965(preDecision),
    VLD_000966: Validator.VLD_000966(preDecision),
  };

  const rules = lodash.compact(
    (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
  );

  const isHistory = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isHistory);

  const warningMessage = () => {
    let warns = [];
    if (isHistory) {
      return warns;
    }
    if (isDataCaptureCase) {
      warns =
        rules
          ?.map((item: any) => {
            let result = undefined;
            const callback = (e) => (result = e || result);
            item(undefined, value, callback);
            return {
              message: result,
              messageType: MessageType.Information,
            };
          })
          ?.filter((item) => item.message) || [];
    }
    return warns;
  };

  const otherParams = tenant.region({
    [Region.PH]: {
      recoverValue: recoverObj[localFieldConfig.field],
      OnRecover,
      warningMessage: warningMessage(),
      rules: isDataCaptureCase ? [] : rules,
    },
    [Region.MY]: {},
    notMatch: {},
  });

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <div className={[Region.MY].includes(tenant.region()) ? styles.hiddenLabel : ''}>
          <FormItemInput
            allowClear
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
            required={required}
            rules={rules}
            maxLength={tenant.region({
              [Region.PH]: null,
              [Region.TH]: null,
              notMatch: 10,
            })}
            onChange={(e: any) => {
              const hasLetter = new RegExp(/[a-zA-Z]+/);
              if (hasLetter.test(e)) {
                form.setFieldsValue({ [localFieldConfig.field]: e.replace(/[a-zA-Z]+/g, '') });
              }
            }}
            {...otherParams}
          />
        </div>
      </Col>
    )
  );
};

const PhoneNo = ({
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

PhoneNo.displayName = localFieldConfig.field;

export default PhoneNo;
