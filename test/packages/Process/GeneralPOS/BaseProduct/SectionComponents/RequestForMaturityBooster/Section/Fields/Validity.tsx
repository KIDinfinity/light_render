import React, { useEffect } from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
  Validator,
  formUtils,
} from 'basic/components/Form';
import { fieldConfig } from './Validity.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { NAMESPACE } from '../../../../activity.config';
import { DecisionEnum } from 'process/GeneralPOS/common/Enum';
import { isDecision } from 'process/GeneralPOS/common/utils';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';

export { fieldConfig } from './Validity.config';

const FormItem = ({ isShow, layout, form, editable, field, config, transactionId }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });
  const dispatch = useDispatch();
  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = true;
  const decision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.decision
  );
  const eventList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.maturityBooster?.eventList ??
      []
  );
  const eventHistoryList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.maturityBooster
        ?.eventHistoryList ?? []
  );
  const cleanDecision = formUtils.queryValue(decision);
  const { caseCategory, activityKey } = useSelector(({ processTask }: any) => processTask?.getTask);
  const validating = useSelector(
    ({ formCommonController }: any) => formCommonController?.validating
  );

  const mustRule = {
    VLD_001008: Validator.VLD_001008(eventList),
    VLD_001009: Validator.VLD_001009(eventList, eventHistoryList, form),
  };
  useEffect(() => {
    form.validateFields(['occurrenceDate', 'validity'], { force: true });
  }, [cleanDecision]);
  const Rules =
    validating && isDecision({ caseCategory, activityKey }) && cleanDecision === DecisionEnum.A
      ? mustRule
      : {};
  const handleChange = () => {
    // 判断数据出现错误的时候才校验在非validating得时候
    if (
      validating ||
      !isDecision({ caseCategory, activityKey }) ||
      cleanDecision !== DecisionEnum.A
    )
      return;
    const hasError = eventList.some(
      (item) => item?.validity?.errors?.length || item?.occurrenceDate?.errors?.length
    );
    if (hasError) {
      dispatch({
        type: `${NAMESPACE}/validateFields`,
      });
    }
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
            (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          onChange={handleChange}
          hiddenPrefix
          precision={0}
          isInline
        />
      </Col>
    )
  );
};

const Validity = ({
  field,
  form,
  editable,
  section,
  layout,
  isShow,
  config,
  transactionId,
}: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
      field={fieldConfig?.field}
      transactionId={transactionId}
    />
  </Authority>
);

Validity.displayName = 'validity';

export default Validity;
