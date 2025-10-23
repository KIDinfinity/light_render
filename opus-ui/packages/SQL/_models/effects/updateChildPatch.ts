import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { update } from '@/services/ccPatchControllerService';

export default function* ({ payload }: any, { call }: any): any {
  const enums = ['currentEnvironment', 'currentRegion', 'environments', 'regions'];
  const { dataPatch, createTime, creator } = payload;
  const { jiraNum, message = '', patchName, patchItems } = formUtils.cleanValidateData(dataPatch);

  const response: any = yield call(update, {
    jiraNum,
    message,
    patch: {
      patchItems: patchItems.map((item: any) => {
        return Object.fromEntries(
          Object.entries(item).map((valueItem) => {
            return [
              valueItem[0],
              enums.includes(valueItem[0])
                ? lodash.uniqBy(valueItem[1], lodash.toLower).join(',').toLocaleLowerCase()
                : valueItem[1],
            ];
          })
        );
      }),
      createTime,
      creator,
      patchName,
    },
  });

  return response && response.success;
}
