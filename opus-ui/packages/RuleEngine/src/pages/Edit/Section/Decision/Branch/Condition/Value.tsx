import React from 'react';
import lodash from 'lodash';
import { AutoComplete } from 'antd';
import { formUtils } from 'basic/components/Form';
import {
  FormItemAutoComplete,
  FormItemDatePicker,
  FormItemInput,
  FormItemSelect,
} from 'basic/components/Form/FormItem';
import { getValueList } from '../../../../Utils';
import { Operator, InputBoxType } from '../../../../Enum';
import styles from './index.less';

const { Option } = AutoComplete;

export default ({ form, taskNotEditable, item, atomInfo, index }: any) => {
  const operator = formUtils.queryValue(item.operator);

  const list = getValueList({ atomInfo, operator });

  const isDate =
    atomInfo?.inputBoxType === InputBoxType['06'] || atomInfo?.inputBoxType === InputBoxType['08'];

  const renderComponent = () => {
    const hiddenValue = [Operator.isBlank, Operator.isNotBlank];
    const multiple = [Operator.in, Operator.notIn, Operator.belongsTo, Operator.notBelongTo];

    // 隐藏value
    if (hiddenValue.includes(operator)) return null;

    // 列表为空
    if (lodash.isEmpty(list)) {
      return (
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName={`value-${index}`}
          required
          labelId="Value"
        />
      );
    }
    // 列表不为空 && 单选
    if (!lodash.isEmpty(list) && !multiple.includes(operator)) {
      return (
        <FormItemAutoComplete
          form={form}
          disabled={taskNotEditable}
          formName={`value-${index}`}
          defaultValue={form.getFieldValue('value') || ''}
          dataSource={list}
          warningMessage={[]}
          allowClear
          required
          labelId="Value"
          refreshStyle
        >
          {lodash.map(list, (el: any) => (
            <Option key={el.itemCode} value={el.itemCode}>
              {el.itemName}
            </Option>
          ))}
        </FormItemAutoComplete>
      );
    }
    // 列表不为空 && 多选
    if (!lodash.isEmpty(list) && multiple.includes(operator)) {
      return (
        <FormItemSelect
          form={form}
          mode="tags"
          dicts={list}
          formName={`value-${index}`}
          dictCode="itemCode"
          dictName="itemName"
          multipleString
          disabled={taskNotEditable}
          required
          labelId="Value"
        />
      );
    }
  };

  return (
    <>
      {renderComponent()}
      {isDate && (
        <div className={styles.datePick}>
          <FormItemDatePicker
            form={form}
            formName={`timePick-${index}`}
            disabled={taskNotEditable}
            labelId=""
            format="L"
          />
        </div>
      )}
    </>
  );
};
