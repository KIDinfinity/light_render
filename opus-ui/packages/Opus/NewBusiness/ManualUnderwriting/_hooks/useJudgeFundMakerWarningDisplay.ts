import { useSelector } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import lodash from 'lodash';

export default () => {
  const fundMaker = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.fundMaker
  );
  const getTask = useSelector(({ processTask }: any) => processTask.getTask);

  // 添加对 null 或 undefined 的处理
  const fundMakerLower = fundMaker ? lodash.toLower(fundMaker) : '';
  const assigneeLower = getTask?.assignee ? lodash.toLower(getTask.assignee) : '';

  return !!fundMaker && fundMakerLower !== assigneeLower;
};
