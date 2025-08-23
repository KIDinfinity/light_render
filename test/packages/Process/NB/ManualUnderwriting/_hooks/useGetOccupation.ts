import { useMemo } from 'react';
import { getDrowDownList } from '@/utils/dictFormatMessage';

export default ({ fieldConfig, config }: any) => {
  const fieldProps: any = fieldConfig?.['field-props'];
  const MYDicts = getDrowDownList({ config, fieldProps });
  return useMemo(() => {
    return MYDicts;
  }, [MYDicts]);
};
