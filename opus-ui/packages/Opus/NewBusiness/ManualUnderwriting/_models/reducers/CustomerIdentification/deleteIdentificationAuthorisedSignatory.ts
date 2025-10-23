import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { id, parentId } = lodash.pick(action?.payload, ['id', 'parentId']);
  const nextState = produce(state, (dratState: any) => {
    const ASDeleteList = (() => {
      const currentASDeleteList = lodash.get(dratState, `ASDeleteList`, {});
      const currentList = lodash.get(dratState, `ASDeleteList[${parentId}]`, []);
      if (lodash.isEmpty(currentList)) {
        return { ...currentASDeleteList, [parentId]: [id] };
      } else {
        return { ...currentASDeleteList, [parentId]: [...currentList, id] };
      }
    })();
    lodash.set(dratState, `ASDeleteList`, ASDeleteList);
  });
  return {
    ...nextState,
  };
};
