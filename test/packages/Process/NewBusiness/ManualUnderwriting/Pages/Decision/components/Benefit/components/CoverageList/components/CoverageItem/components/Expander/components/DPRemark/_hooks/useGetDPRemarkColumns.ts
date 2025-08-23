import { useMemo } from 'react';
import lodash from 'lodash';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { localConfig } from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/SectionFields/PostponeDeclineRemark-Field/index.tsx';

export default () => {
  const config = useGetSectionAtomConfig({
    localConfig,
    section: 'PostponeDeclineRemark-Field',
  });

  return useMemo(() => {
    return lodash
      .chain(config)
      .filter((item) => item['field-props']?.visible === 'Y')
      .map((item) => {
        const span = lodash.get(item, 'field-props.x-layout.lg.span');
        const order = lodash.get(item, 'field-props.x-layout.lg.order');
        const title = formatMessageApi({
          [lodash.get(item, 'field-props.label.dictTypeCode')]: lodash.get(
            item,
            'field-props.label.dictCode'
          ),
        });
        const key: string = lodash.get(item, 'field');
        return {
          span,
          order,
          title,
          key,
        };
      })
      .filter((item: any) => {
        return !['productName'].includes(item?.key);
      })
      .orderBy(['order'])
      .value();
  }, [config]);
};
