import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default ({ config }: any) => {
  return lodash
    .chain(config)
    .map((item) => {
      return {
        order: lodash.get(item, 'field-props.x-layout.lg.order'),
        field: lodash.get(item, 'field'),
        label: formatMessageApi({
          [lodash.get(item, 'field-props.label.dictTypeCode')]: lodash.get(
            item,
            'field-props.label.dictCode'
          ),
        }),
        fieldType: lodash.get(item, 'fieldType'),
        dropdownTypeCode: lodash.get(item, 'field-props.x-dict.dictTypeCode'),
        span: lodash.get(item, 'field-props.x-layout.lg.span'),
        visible: lodash.get(item, 'field-props.visible'),
      };
    })
    .orderBy(['order'], ['asc'])
    .filter((item) => item?.visible === 'Y' && item?.field)
    .value();
};
