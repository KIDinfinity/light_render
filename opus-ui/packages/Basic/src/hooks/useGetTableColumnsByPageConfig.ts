import { useMemo } from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';

export default ({ localConfig, section, editable = false }: any) => {
  const columns = useGetSectionAtomConfig({ section, localConfig });

  return useMemo(() => {
    const total = lodash
      .chain(columns)
      .map((column) => lodash.get(column, 'field-props.x-layout.lg.span', 0))
      .reduce((sum: number, n: number) => {
        return sum + n;
      }, 0)
      .value();
    return lodash
      .chain(columns)
      .map((column) => {
        const { field } = lodash.pick(column, ['field']);
        const visible = lodash.get(column, 'field-props.visible', 'N');
        const span = lodash.get(column, 'field-props.x-layout.lg.span', 0);
        const order = lodash.get(column, 'field-props.x-layout.lg.order', 0);
        const labelTypeCode = lodash.get(column, 'field-props.label.dictTypeCode', '');
        const labelDictCode = lodash.get(column, 'field-props.label.dictCode', '');
        const width = `${(span / total) * 100}%`;
        return {
          field,
          visible,
          span,
          order,
          title: formatMessageApi({
            [labelTypeCode]: labelDictCode,
          }),
          width,
        };
      })
      .filter((column) => column.visible === 'Y' || column.visible === 'C')
      .orderBy(['order'])
      .map(({ field, span, title, width }) => {
        const configItem = {
          fieldName: field,
          id: field,
          title,
          span,
          width,
        };

        return (() => {
          if (editable) {
            return {
              ...configItem,
              render: () => {},
            };
          }
          return configItem;
        })();
      })
      .value();
  }, [columns]);
};
