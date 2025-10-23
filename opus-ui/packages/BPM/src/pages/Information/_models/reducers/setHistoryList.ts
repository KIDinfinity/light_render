import lodash from 'lodash';
import { isArrayString } from '@/utils/string';
import { safeParseUtil } from '@/utils/utils';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const { historyList } = action.payload;
  // 由于chat link 过来的information格式不同此处加入额外逻辑
  const list = lodash.map(historyList, (item: any) => {
    if (isArrayString(item.content)) {
      const content = safeParseUtil(item.content);
      const archiveListContent: any[] = [];
      lodash.forEach(content, (obj) => {
        const time = obj.time.substr(0, 10);
        const array = archiveListContent[time] || [];
        array.push(obj);
        archiveListContent[time] = array;
      });
      return {
        ...item,
        contentType: 'chat',
        chatContent: Object.entries(archiveListContent),
      };
    }
    return {
      ...item,
      contentType: 'normal',
    };
  });
  const nextState = produce(state, (draftState: any) => {
    draftState.historyList = list;
  });
  return {
    ...nextState,
  };
};
