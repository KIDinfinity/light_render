import BooleanEnum from 'basic/enum/BooleanEnum';
import { useSelector } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

export default () => {
  const retrieveExistCorpFromLA = useSelector(({ [NAMESPACE]: modelnamespace }: any) => {
    return modelnamespace.retrieveExistCorpFromLA;
  });

  return retrieveExistCorpFromLA === BooleanEnum.Yes;
};
