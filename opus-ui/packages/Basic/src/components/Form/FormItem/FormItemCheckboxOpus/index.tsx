import React from 'react';
import FormItemSelect from '../FormItemSelect';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import lodash from 'lodash'

export default props => {
  const {form, value, formName} = props;
  const actualVal = formName && form? form.getFieldValue(formName) : value;
  const codeMap = {
    number: {
      '0': 0,
      '1': 1,
    },
    boolean: {
      '0': false,
      '1': true,
    },
    string: {
      '0': '0',
      '1': '1',
    }
  }
  const dicts = getDrowDownList('Dropdown_COM_YesNo')?.map(option => {
    if(lodash.isNil(actualVal))
      return option;
    const dictCode = codeMap[typeof actualVal]? codeMap[typeof actualVal][option.dictCode] : option.dictCode;
    return {
      ...option,
      dictCode,
    }
  });

  return <FormItemSelect dicts={dicts} {...props} />
}
