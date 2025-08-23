/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';
import { Region, tenant } from '@/components/Tenant';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const transactionId = payload?.transactionId;
    const transactionPath = `entities.transactionTypesMap[${transactionId}]`;
    const {
      identificationClientResultList,
      clientInfoList,
      identificationList,
    } = lodash.pick(lodash.get(draftState, `${transactionPath}`), [
      'clientInfoList',
      'identificationClientResultList',
      'identificationList',
    ]);
    const showClientList = lodash.get(draftState, 'commonNomineeModal.showClientList', []);

    lodash.set(
      draftState,
      `${transactionPath}.identificationClientResultList`,
      lodash.map(identificationClientResultList, (resultItem) => {
        // 将认人节点选中的id 转换成 对应的clientID。
        const data =
          showClientList.find((clientItem) => clientItem.clientSeq === resultItem.clientSeq) ||
          resultItem;
        const selectId = tenant.region({
          [Region.TH]: data?.selectClientId,
          [Region.MY]: data?.selectCcrClientId,
        });
        const identificationClientInfoList = identificationList
          ? lodash.find(identificationList, { clientSeq: resultItem.clientSeq })?.clientInfoList
          : [];
        const clientInfo = clientInfoList?.find(
          (clientItem) => clientItem.clientSeq === resultItem?.clientSeq
        );
        const selectData = [clientInfo, ...(identificationClientInfoList || [])].find(
          (item) => item?.id === selectId
        );
        // 如果是fullyMatch 或者 misMatch，就无法选人，
        // selectData的clientId 就为空，所以就使用它自身的clientId
        const reactSelectId = tenant.region({
          [Region.TH]: { selectClientId: selectData?.clientId || selectId },
          [Region.MY]: { selectCcrClientId: selectData?.ccrClientId || selectId },
        });

        return { ...data, ...reactSelectId };
      })
    );
  });
