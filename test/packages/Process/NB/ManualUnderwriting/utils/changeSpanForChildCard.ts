import lodash from 'lodash';
import { produce }  from 'immer';

export default ({ fieldConfig }: any) => {
  return produce(fieldConfig, (draft: any) => {
    const xLayout = lodash
      .chain(draft)
      .get('field-props.x-layout')
      .mapValues((value: any) => {
        const span = lodash.get(value, 'span');
        return {
          ...value,
          span: span + 2,
        };
      })
      .value();
    lodash.set(draft, 'field-props.x-layout', xLayout);
    lodash.set(draft, 'field-props.layouts[0].layout', xLayout);
  });
};
