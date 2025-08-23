import { produce } from 'immer';
import lodash from 'lodash';

const saveTabAuthorized = (state: any, action: any) => {
  const { flag } = action.payload;

  // 后端没有tools以及integration的配置，所以默认为true
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.tabAuthorized = lodash
      .chain(draftState.tabAuthorized)
      .concat(flag)
      .uniq()
      .compact()
      .value();
    // eslint-disable-next-line no-param-reassign
  });
  return { ...nextState };
};

export default saveTabAuthorized;
