import React, { useEffect, useState } from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  Required,
  Visible,
  Rule,
  Validator,
  formUtils,
  FormItemInput,
} from 'basic/components/Form';
import lodash from 'lodash';
import { fieldConfig } from './Remark.config';
import styles from '../index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
export { fieldConfig } from './Remark.config';

const RemarkWithSize = ({
  fieldName,
  placeholder,
  config,
  fieldProps,
  editable,
  editableConditions,
  requiredConditions,
  form,
  Rules,
  exclusionList,
  labelType,
}: any) => {
  const [textLen, setTextLen] = useState(form.getFieldValue(fieldName)?.length ?? 0);
  const anyExclusionCodeSelected = lodash.some(exclusionList, (ex) =>
    Boolean(formUtils.queryValue(ex.code))
  );
  useEffect(() => {
    form.validateFields([fieldName], { force: true });
  }, [anyExclusionCodeSelected]);

  return (
    <div className={styles.remarkWithSize}>
      <FormItemInput
        allowClear
        disabled={
          !editable ||
          ((config?.editable || fieldProps.editable) === Editable.Conditions
            ? !editableConditions
            : (config?.editable || fieldProps.editable) === Editable.No)
        }
        form={form}
        formName={fieldName}
        placeholder={placeholder}
        required={
          (config.required || fieldProps.required) === Required.Conditions
            ? requiredConditions
            : (config.required || fieldProps.required) === Required.Yes
        }
        maxLength={config.maxLength ?? fieldProps.maxLength}
        rules={lodash.compact(
          (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
        )}
        labelId="-"
        labelTypeCode="-"
        labelType={labelType}
        onInput={(text: any) => {
          setTextLen(text.length);
        }}
        onChange={(text: any) => {
          setTextLen(text.length);
        }}
      />
      <p
        className={styles.remarkSize}
      >{`${textLen}/${config.maxLength ?? fieldProps.maxLength}`}</p>
    </div>
  );
};

export const FormItem = ({
  exclusionList,
  isShow,
  layout,
  form,
  editable,
  config,
  labelType,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules: Record<string, any> = { VLD_001103: Validator.VLD_001103({ exclusionList }) };

  const dictTypeCode = config.label?.dictTypeCode ?? fieldProps.label.dictTypeCode;
  const dictCode = config.label?.dictCode ?? fieldProps.label.dictCode;

  const lineList: { id: string; fieldName: string }[] = [
    { id: '1', fieldName: 'reason1' },
    { id: '2', fieldName: 'reason2' },
    { id: '3', fieldName: 'reason3' },
  ];
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <div className={styles.remark}>
          <p className={styles.label}>{formatMessageApi({ [dictTypeCode]: dictCode })}</p>
          {lineList.map((lineItem) => (
            <RemarkWithSize
              key={lineItem.fieldName}
              fieldName={lineItem.fieldName}
              placeholder={formatMessageApi({ Label_COM_General: 'line' }, lineItem.id)}
              config={config}
              fieldProps={fieldProps}
              editable={editable}
              editableConditions={editableConditions}
              requiredConditions={requiredConditions}
              form={form}
              Rules={Rules}
              exclusionList={exclusionList}
              labelType={labelType}
            />
          ))}
        </div>
      </Col>
    )
  );
};

const Remark = ({ exclusionList, isShow, layout, form, editable, config, labelType }: any) => (
  <Authority>
    <FormItem
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      field={fieldConfig.field}
      exclusionList={exclusionList}
      labelType={labelType}
    />
  </Authority>
);

Remark.displayName = fieldConfig.field;

export default Remark;
