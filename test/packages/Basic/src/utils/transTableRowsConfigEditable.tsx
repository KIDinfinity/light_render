import React from 'react';
import lodash from 'lodash';
import { Input, InputNumber } from 'antd';
import transFieldsConfig from 'basic/utils/transFieldsConfig';
import transFieldValue from 'basic/utils/transFieldValue';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Editable } from 'basic/components/Form';

// interface Operations {
//   [string] :{
//     onChange?: Function;
//     onBlur?: Function;
//   }
// }

interface IParams {
  config: any[];
  editable?: boolean;
  operations?: any;
}

export default ({ config, editable = false, operations }: IParams) => {
  const list = transFieldsConfig({ config });
  const totalSpan = lodash.reduce(
    list,
    (sum, n) => {
      return sum + n.span || 0;
    },
    0
  );

  return lodash
    .chain(list)
    .map((item) => {
      // const { fieldType } = lodash.pick(item, ['fieldType']);

      const rowMap = new Map();
      rowMap.set('key', item.field);
      rowMap.set('title', item.label);
      rowMap.set('dataIndex', item.field);
      rowMap.set('render', (text: any, record: any) => {
        if (editable && [Editable?.Conditions, Editable?.Yes].includes(item?.editable)) {
          const label = formatMessageApi({
            [lodash.get(item, 'label.dictTypeCode')]: lodash.get(item, 'label.dictCode'),
          });
          const type = (() => {
            switch (item?.fieldType) {
              case 'Number':
                return 'number';
              case 'Text':
              default:
                return 'text';
            }
          })();
          const InputComponent = (() => {
            switch (item?.fieldType) {
              case 'Text':
              default:
                return Input;
              case 'Number':
                return InputNumber;
            }
          })();
          const OperatonMap = new Map();
          lodash
            .chain(operations)
            .get(item?.field)
            .entries()
            .forEach((opItem: any) => {
              const [key, callback] = opItem;
              const configValue = (() => {
                if (['onChange', 'onBlur'].includes(key)) {
                  if (lodash.isFunction(callback)) {
                    return (value: any) => {
                      callback(value, record, item?.field, item.label);
                    };
                  }
                }
                return callback;
              })();
              OperatonMap.set(key, configValue);
            })
            .value();
          const operation = Object.fromEntries(OperatonMap);
          const extraProps = (() => {
            if (lodash.isFunction(operation?.disabledCallback)) {
              return {
                disabled: operation.disabledCallback({ value: text, config, record }),
              };
            }
          })();

          return (
            <InputComponent
              value={text}
              placeholder={label}
              type={type}
              {...operation}
              {...extraProps}
            />
          );
        }

        return transFieldValue({
          value: text,
          configItem: item,
        });
      });
      // if (fieldType === 'Dropdown') {
      //   rowMap.set('render', (text: any) => {
      //     return transFieldValue({
      //       value: text,
      //       configItem: item,
      //     });
      //   });
      // }
      // if (fieldType === 'Date') {
      //   rowMap.set('render', (text: any) => {
      //     return transFieldValue({
      //       value: text,
      //       configItem: item,
      //     });
      //   });
      // }
      // if (fieldType === 'Number') {
      //   rowMap.set('render', (text: any) => {
      //     return transFieldValue({
      //       value: text,
      //       configItem: item,
      //     });
      //   });
      // }
      if (lodash.isNumber(item.span)) {
        rowMap.set('width', `${(item.span / totalSpan) * 100}%`);
      }
      return Object.fromEntries(rowMap);
    })
    .value();
};
