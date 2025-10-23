import lodash from 'lodash';
import { Selection, NbClientTag } from '../../Enum';
import { NAMESPACE } from '../../activity.config';

export default function* validateFields(_: any, { select, put }: any) {
  yield put({
    type: 'formCommonController/handleSubmited',
  });
  yield put({
    type: 'formCommonController/handleValidating',
  });

  const claimProcessData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData
  );

  const errorsSet = new Set();
  lodash.forEach(claimProcessData?.policyList, (policyItem: any) => {
    const newClientInfoList = lodash.filter(policyItem.clientInfoList, (item: any) => {
      return lodash.every(
        item.identificationList,
        (e: any) => !lodash.includes([NbClientTag.Mismatch, NbClientTag.FullyMatch], e?.clientTag)
      );
    });
    lodash.forEach(newClientInfoList, (item: any) => {
      const showCard = lodash
        .chain(item)
        .get('roleList')
        .some((v: any) => !!v?.display)
        .value();
      if (showCard) {
        if (item.newClientFlag !== Selection.Y) {
          const selectedSuspect = lodash.find(item?.identificationList, (indentifion: any) => {
            return (
              indentifion.clientTag === NbClientTag.SuspectClient &&
              indentifion.selection === Selection.Y
            );
          });
          if (!selectedSuspect) {
            errorsSet.add(`please select client ${item?.id}`);
          }
        }
      }
    });
  });
  const totalErrors = Array.from(errorsSet);

  yield put({
    type: 'formCommonController/handleUnValidating',
  });

  return [...totalErrors];
}
