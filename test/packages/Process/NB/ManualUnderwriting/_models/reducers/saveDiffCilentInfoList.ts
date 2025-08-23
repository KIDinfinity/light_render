/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { diff } from 'json-diff';
import * as  FlattenJS from 'flattenjs';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { preState, id } = payload;
    const clientInfoList = lodash.get(draftState, 'businessData.policyList[0].clientInfoList');
    const preClientInfo = formUtils.cleanValidateData({
      ...lodash.get(preState, 'businessData.policyList[0].clientInfoList'),
    });
    const nextClientInfo = formUtils.cleanValidateData({
      ...clientInfoList,
    });
    const diffData = diff(FlattenJS.convert(preClientInfo), FlattenJS.convert(nextClientInfo));
    lodash
      .chain(diffData)
      .entries()
      .forEach(([key, value]) => {
        if (typeof key === 'string') {
          const trimKey = key.substr(2);
          if (lodash.includes(trimKey, '__added')) {
            lodash.set(
              draftState,
              `diffSource.clientInfoList.[${id}].['${lodash.replace(trimKey, '__added', '')}']`,
              value
            );
          } else {
            lodash.set(
              draftState,
              `diffSource.clientInfoList[${id}].['${trimKey}']`,
              lodash.get(value, '__new')
            );
          }
        }
      })
      .value();
  });
