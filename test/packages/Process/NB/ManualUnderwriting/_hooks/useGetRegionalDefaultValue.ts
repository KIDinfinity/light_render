import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ codeType }: any) => {
  const defaultValue = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.regionalDefaultValue?.[codeType],
    shallowEqual
  );
  return defaultValue;
};
