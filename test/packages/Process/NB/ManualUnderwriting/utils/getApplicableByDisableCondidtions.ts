import lodash from 'lodash';
import { produce }  from 'immer';

export default ({ fieldConfig, disableFieldsConditions, condition }: any) => {
  const { section, field } = lodash.pick(fieldConfig, ['field', 'section']);
  const visible = lodash.get(fieldConfig, 'field-props.visible', 'N');
  const atomCode = `${section}_${field}_${condition}_field_disable`;
  if (visible === 'N') {
    return fieldConfig;
  }
  const matchItem = lodash.find(disableFieldsConditions, (item) => {
    return item.atomCode === atomCode && item.applicable === 'N';
  });
  if (matchItem) {
    return produce(fieldConfig, (draft: any) => {
      lodash.set(draft, 'field-props.visible', 'N');
    });
  }
  return fieldConfig;
};
