import React from 'react';
import lodash from 'lodash';

import { FormItemSelect } from 'basic/components/Form/FormSection';
import { getDropDownFormat } from '../../../../Utils';
import { TypeCode } from '../../../../Enum';

export default ({ form, taskNotEditable, atomInfo, item, index }: any) => {
  const list = !lodash.isEmpty(atomInfo)
    ? lodash
        .chain(atomInfo?.operatorList['Basic Rules']['01'])
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
      formName={`operator-${index}`}
      labelId="venus_claim.ruleEngine.label.operator"
      name="operator"
      required
      disabled={item.binded === '1' || taskNotEditable}
      dicts={list}
    />
  );
};
