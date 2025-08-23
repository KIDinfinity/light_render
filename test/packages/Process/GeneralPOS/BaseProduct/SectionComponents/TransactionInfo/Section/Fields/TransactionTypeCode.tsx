import React from 'react';
import { Col } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { tenant, Language } from '@/components/Tenant';
import {
  Authority,
  Editable,
  FormItemSelect,
  Visible,
  Rule,
  Validator,
  formUtils,
} from 'basic/components/Form';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { localFieldConfig } from './TransactionTypeCode.config';
import { NAMESPACE } from '../../../../activity.config';
import styles from './TransactionTypeCode.less';
import classnames from 'classnames';
import { TransactionTypeEnum, LimitTypeEnum, DecisionEnum } from 'process/GeneralPOS/common/Enum';
import { isDataCapture } from 'process/GeneralPOS/common/utils';
export { localFieldConfig } from './TransactionTypeCode.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, compact }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dictTypeCode =
    config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode;
  const transactionTypeCodeMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.transactionTypeCodeMap
  );

  const caseCategory = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.caseCategory
  );

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = true;
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const disabled =
    !editable ||
    ((config?.editable || fieldProps.editable) === Editable.Conditions
      ? !editableConditions
      : (config?.editable || fieldProps.editable) === Editable.No);

  const dictCode = form.getFieldValue('transactionTypeCode');

  // 后续节点transactionType配置可能为空且不可编辑，这时候就做一个假的下拉
  const codeArray = disabled ? [dictCode] : Object.keys(transactionTypeCodeMap);
  const dicts = codeArray.map((dictCode) => {
    if (!tenant.isTH()) {
      return {
        dictCode,
        dictName: formatMessageApi({ [dictTypeCode]: dictCode }),
      };
    }
    return {
      dictCode,
      dictName: formatMessageApi({
        [dictTypeCode]: dictCode,
        language: Language.TH,
      }),
      title: formatMessageApi({
        [dictTypeCode]: dictCode,
        language: Language.EN_US,
      }),
    };
  });

  const decision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.decision
  );

  const cleanDecision = formUtils.queryValue(decision);

  const validating = useSelector(
    ({ formCommonController }: any) => formCommonController?.validating
  );

  const currentTransactionTypeCode = form.getFieldValue('transactionTypeCode');

  const policyInfo =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyInfo) ||
    {};

  const transactionTypes =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities?.transactionTypesMap
    ) || {};

  const transactionTypeCodeValue = formUtils.cleanValidateData(
    lodash
      .values(transactionTypes)
      .find(
        (item) => formUtils.queryValue(item?.transactionTypeCode) === currentTransactionTypeCode
      )
  );

  const existTransactionTypeCode = lodash
    .values(transactionTypes)
    .map((item) => formUtils.queryValue(item.transactionTypeCode));

  const limitData = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.limitData);

  const RulesByTransactionTypeCode = {
    [TransactionTypeEnum.SRV003]: {
      VLD_000829: Validator.VLD_000829(transactionTypeCodeValue),
      VLD_000647: Validator.VLD_000647(transactionTypeCodeValue, currentTransactionTypeCode),
    },
    [TransactionTypeEnum.SRV006]: {
      VLD_000832: Validator.VLD_000832(transactionTypeCodeValue),
      VLD_000647: Validator.VLD_000647(transactionTypeCodeValue, currentTransactionTypeCode),
      VLD_000909: Validator.VLD_000909(policyInfo, transactionTypeCodeValue),
    },
    [TransactionTypeEnum.SRV004]: {
      VLD_000904: Validator.VLD_000904(
        transactionTypeCodeValue,
        Number(limitData?.[LimitTypeEnum.NumberOfFundAllocation]?.limitAmount)
      ),
      VLD_000905: Validator.VLD_000905(transactionTypeCodeValue),
    },
    [TransactionTypeEnum.SRV001]: {
      VLD_001102: Validator.VLD_001102(policyInfo, transactionTypeCodeValue),
      VLD_001201: Validator.VLD_001201(policyInfo, transactionTypeCodeValue),
    },
    [TransactionTypeEnum.SRV009]: {
      // VLD_000284: Validator.VLD_000284(policyInfo, transactionTypeCodeValue),
    },
  };

  const Rules =
    validating && cleanDecision !== DecisionEnum.D
      ? {
          ...RulesByTransactionTypeCode[currentTransactionTypeCode],
        }
      : {};
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <div
          className={classnames(styles.transactionTypeSectionBox, {
            [styles.mb12]: isDataCapture({ caseCategory }),
          })}
        >
          <span
            className={styles.transactionTypeSectionNumber}
            style={compact ? void 0 : { marginTop: 2 }}
          >
            Transaction
          </span>
          <span className={styles.transactionTypeLine}>-</span>
          <FormItemSelect
            className={styles.transactionTypeSectionSelect}
            dicts={dicts}
            disabled={disabled}
            specifyTitleField={tenant.isTH() ? 'title' : void 0}
            existCodes={existTransactionTypeCode}
            form={form}
            formName={config.name || field}
            labelId={config.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            required={true}
            rules={lodash.compact(
              (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
            )}
            allowClear={false}
            isInline
          />
        </div>
      </Col>
    )
  );
};

const TransactionTypeCode = ({ isShow, layout, form, editable, index, config, compact }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      index={index}
      config={config}
      field={localFieldConfig.field}
      compact={compact}
    />
  </Authority>
);

TransactionTypeCode.displayName = localFieldConfig.field;

export default TransactionTypeCode;
