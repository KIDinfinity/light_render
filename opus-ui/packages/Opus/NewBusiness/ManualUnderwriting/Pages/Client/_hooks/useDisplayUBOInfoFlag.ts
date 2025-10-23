import BooleanEnum from 'basic/enum/BooleanEnum';
import { useSelector } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

export default () => {
  const displayUBOInfoFlag = useSelector(({ [NAMESPACE]: modelnamespace }: any) => {
    return modelnamespace.displayUBOInfoFlag;
  });

  return displayUBOInfoFlag === BooleanEnum.Yes;
};
