import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  ElementConfig,
  FormItemRadioGroup,
  Required,
  Visible,
  Rule,
  Validator,
} from 'basic/components/Form';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { localConfig } from '../index';
import { localFieldConfig } from './Decision.config';
import { NAMESPACE } from '../../../activity.config';
import styles from './Decision.less';

export { localFieldConfig } from './Decision.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );

  const policyApplyToPolicyInfoList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.processData?.policyInfo?.applyToPolicyInfoList
    ) || [];

  const isValidator = lodash.size(policyApplyToPolicyInfoList) > 1;

  const applyToPolicyBOList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities.transactionTypesMap[id].applyToPolicyBOList
  );

  const policyInfoBOListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities.policyInfoBOListMap
  );

  const policyBOList = lodash.reduce(
    applyToPolicyBOList,
    (result: any, item: any) => {
      result.push(policyInfoBOListMap[item]);
      return result;
    },
    []
  );

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {
    VLD_000622: Validator.VLD_000622({ isCheck: true }),
    // VLD_000623: Validator.VLD_000623(policyBOList, isValidator),
    // VLD_000626: Validator.VLD_000626(policyBOList),
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemRadioGroup
          className={styles.formRadio}
          dicts={dicts}
          type="button"
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
        />
      </Col>
    )
  );
};

const Decision = ({ isShow, layout, form, editable, section, id }: any) => (
  <Authority>
    <ElementConfig.Field config={localConfig} section={section} field={localFieldConfig.field}>
      <FormItem isShow={isShow} layout={layout} form={form} editable={editable} id={id} />
    </ElementConfig.Field>
  </Authority>
);

Decision.displayName = localFieldConfig.field;

export default Decision;
