import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const sustainabilityOptions = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace?.sustainabilityCheckingData?.sustainabilityOptions,
    shallowEqual
  );
  return lodash
    .chain(sustainabilityOptions)
    .find((item: any) => {
      return item.applied === 'Y';
    })
    .get('optionName')
    .value();
};
