import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { NAMESPACE } from '../../../../activity.config';
import { isDataCapture } from 'process/GeneralPOS/common/utils';

import { localFieldConfig } from './LoanRequest.config';

export { localFieldConfig } from './LoanRequest.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, transactionId }: any) => {
  const dispatch = useDispatch();
  const { caseCategory } = useSelector(({ processTask }: any) => processTask.getTask) || {};
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  const Rules = {};
  const handleChangeLoanRequest = () => {
    if (!isDataCapture({ caseCategory })) {
      setTimeout(() => {
        dispatch({
          type: `${NAMESPACE}/getLoanQuotation`,
          payload: {
            transactionId,
          },
        });
      }, 500);
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
          onSelect={handleChangeLoanRequest}
        />
      </Col>
    )
  );
};

const LoanRequest = ({ isShow, layout, form, editable, config, transactionId }: any) => (
  <Authority>
    <FormItem
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      field={localFieldConfig.field}
      transactionId={transactionId}
    />
  </Authority>
);

LoanRequest.displayName = localFieldConfig.field;

export default LoanRequest;
