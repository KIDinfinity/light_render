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
} from 'basic/components/Form';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { localFieldConfig } from './BusinessType.config';

export { localFieldConfig } from './BusinessType.config';
import styles from '../../index.less';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const { caseCategory } = useSelector(({ processTask }: any) => processTask.getTask) || {};

  const dicts =
    useSelector(
      ({ dictionaryController }: any) =>
        dictionaryController[
          config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode
        ]
    ) || [];
  console.log('new', dicts);

  const newDicts =
    caseCategory === 'BP_VAN_CTG002' ? lodash.filter(dicts, { dictCode: 'BIZ002' }) : dicts;

  const visibleConditions = Rule(
    config['visible-condition'] || fieldProps['visible-condition'],
    form,
    ''
  );
  const editableConditions = Rule(
    config['editable-condition'] || fieldProps['editable-condition'],
    form,
    ''
  );
  const requiredConditions = Rule(
    config['required-condition'] || fieldProps['required-condition'],
    form,
    ''
  );

  const Rules = {};

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <div className={styles.radioBox}>
        <Col {...layout}>
          <FormItemRadioGroup
            dicts={newDicts}
            type="button"
            disabled={
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? !editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No)
            }
            form={form}
            formName={config?.name || field}
            labelId={config.label?.dictCode || fieldProps.label.dictCode}
            allowClear
            labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            required={
              (config.required || fieldProps.required) === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes
            }
            rules={lodash.compact(
              (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
            )}
            isInline
          />
        </Col>
      </div>
    )
  );
};

const BusinessType = ({ isShow, layout, form, editable, section, config }: any) => (
  <Authority>
    <ElementConfig.Field config={config} section={section} field={localFieldConfig.field}>
      <FormItem isShow={isShow} layout={layout} form={form} editable={editable} />
    </ElementConfig.Field>
  </Authority>
);

BusinessType.displayName = localFieldConfig.field;

export default BusinessType;
