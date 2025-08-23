import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

export default ({ config, fieldConfig, dictCode = 'dictCode', dictName = 'dictName' }: any) => {
  const typeCode = (() => {
    const localTypeCode = lodash.get(fieldConfig, 'field-props.x-dict.dictTypeCode');
    if (lodash.has(config, 'field-props')) {
      return lodash.get(config, 'field-props.x-dict.dictTypeCode') || localTypeCode;
    }
    return lodash.get(config, 'x-dict.dictTypeCode') || localTypeCode;
  })();
  const dicts = useSelector(({ dictionaryController }: any) => {
    return dictionaryController[typeCode];
  }, shallowEqual);
  return useMemo(() => {
    return lodash.filter(dicts, (item) => {
      return !!lodash.get(item, dictCode) && !!lodash.get(item, dictName);
    });
  }, [dicts, dictCode, dictName]);
};
