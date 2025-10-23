import React from 'react';
import lodash from 'lodash';
import { FormItemSelect } from 'basic/components/Form/FormSection';
import { getDropDownFormat } from '../../../../Utils';
import { TypeCode } from '../../../../Enum';

interface IProps {
  form: any;
  taskNotEditable: boolean;
  atomInfo: any;
  type: string;
}

export default ({ form, taskNotEditable, atomInfo, type }: IProps) => {
  const list = !lodash.isEmpty(atomInfo)
    ? lodash
        .chain(atomInfo?.operatorList[type])
        .map((el: any) => ({
          dictName: getDropDownFormat({
            labelId: el,
            type: TypeCode.Operators,
            defaultName: el,
          }),
          dictCode: el,
        }))
        .value() || []
    : [];
  return (
    <FormItemSelect
      form={form}
      labelId="operator"
      dicts={list}
      required
      formName="operator"
      disabled={taskNotEditable}
    />
  );
};
