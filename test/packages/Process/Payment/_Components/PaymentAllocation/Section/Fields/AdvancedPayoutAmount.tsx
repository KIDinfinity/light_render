import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemNumber,
  Required,
  Visible,
  Validator,
} from 'basic/components/Form';
import { localFieldConfig } from './AdvancedPayoutAmount.config';
import lodash from 'lodash';
import CaseCategory from 'enum/CaseCategory';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import { useSelector } from 'dva';

export { localFieldConfig } from './AdvancedPayoutAmount.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  NAMESPACE,
  beneficiary,
}: any) => {
  const visibleConditions = true;
  const requiredConditions = true;
  const fieldProps: any = localFieldConfig['field-props'];
  const incidentListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.claimEntities.incidentListMap
  );
  const expressClaimFlag = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.claimProcessData?.expressClaimFlag
  );
  const listPolicy = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.listPolicy
  );
  const caseCategory = useSelector(({ processTask }: any) => processTask?.getTask?.caseCategory);
  const payeeList =
    useSelector(
      ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.paymentModal?.datas?.payeeList
    ) || {};

  let editableConditions = false;
  const incidentIdKey =
    lodash.findKey(
      incidentListMap,
      (item) => formUtils.queryValue(item?.expressClaimFlag) === '1'
    ) || '';
  const incidentDate = incidentListMap[incidentIdKey]?.incidentDate;
  if (
    String(formUtils.queryValue(expressClaimFlag)) === '1' &&
    moment(formUtils.queryValue(incidentDate)).diff(
      moment(formUtils.queryValue(beneficiary?.dateOfBirth)),
      'years'
    ) > 18 &&
    caseCategory === CaseCategory.BP_CLM_CTG008 &&
    Number(formUtils.queryValue(beneficiary?.beneficiaryPercentage)) >= 20
  ) {
    editableConditions = true;
  }
  const payoutCurrency = formUtils.queryValue(
    lodash.chain(payeeList).find({ id: beneficiary?.payeeId }).get('payoutCurrency').value()
  );
  const Rules = {
    VLD_001111_001079_001078_001120: Validator.VLD_001111_001079_001078_001120({
      beneficiaryAmount: form.getFieldValue('beneficiaryAmount'),
      listPolicy,
      policyNo: form.getFieldValue('policyNo'),
      payoutCurrency,
    }),
  };
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
          isInline
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          // className={styles.noBorder}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          maxLength={config?.maxLength || fieldProps.maxLength}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          placeholder={''}
          precision={2}
        />
      </Col>
    )
  );
};

const PhoneNo = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  NAMESPACE,
  beneficiary,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      NAMESPACE={NAMESPACE}
      beneficiary={beneficiary}
    />
  </Authority>
);

PhoneNo.displayName = localFieldConfig.field;

export default PhoneNo;
