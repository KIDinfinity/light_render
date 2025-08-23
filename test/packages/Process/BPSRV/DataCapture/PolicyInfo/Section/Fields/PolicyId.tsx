import React from 'react';
import { Col, Icon } from 'antd';
import {
  Authority,
  Editable,
  ElementConfig,
  FormItemInput,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { LS, LSKey } from '@/utils/cache';
import { localConfig } from '../index';
import { NAMESPACE } from '../../../activity.config';
import styles from '../../index.less';
import { localFieldConfig } from './PolicyId.config';

export { localFieldConfig } from './PolicyId.config';

let prevAbortController: any = null;

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const dispatch = useDispatch();

  const caseNo = useSelector(({ processTask }: any) => processTask?.getTask?.caseNo);

  const fieldProps: any = localFieldConfig['field-props'];

  const isLoading = useSelector(
    ({ loading }: any) => loading.effects[`${NAMESPACE}/policyInfoRemote`]
  );

  const getPolicyNo = async (policyNo: any) => {
    const abortController = new AbortController();
    if (prevAbortController) {
      prevAbortController.abort();
    }
    prevAbortController = abortController;

    const result = await dispatch({
      type: `${NAMESPACE}/policyInfoRemote`,
      signal: abortController.signal,
      payload: {
        policyNo,
      },
    });
    if (result) LS.setItem(`${LSKey.DOCUMENT_POLICYNO}_${caseNo}`, policyNo);
  };

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {};

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
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
          onBlur={async (e: any) => {
            const policyNo = e.target.value;
            await dispatch({
              type: `${NAMESPACE}/policyIdUpdate`,
              payload: {
                changedFields: { policyId: policyNo },
              },
            });
            if (!policyNo) {
              await dispatch({
                type: `${NAMESPACE}/clear`,
              });
              return;
            }
            await getPolicyNo(policyNo);
          }}
          suffix={isLoading && <Icon type="loading" />}
          allowClear
          className={styles.policyNo}
        />
      </Col>
    )
  );
};

const PolicyId = ({ isShow, layout, form, editable, section }: any) => (
  <Authority>
    <ElementConfig.Field config={localConfig} section={section} field={localFieldConfig.field}>
      <FormItem isShow={isShow} layout={layout} form={form} editable={editable} />
    </ElementConfig.Field>
  </Authority>
);

PolicyId.displayName = localFieldConfig.field;

export default PolicyId;
