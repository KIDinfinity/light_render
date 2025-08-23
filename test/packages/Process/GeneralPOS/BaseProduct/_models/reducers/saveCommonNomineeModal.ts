/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';
import { Region, tenant } from '@/components/Tenant';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    if (!draftState.commonNomineeModal) {
      draftState.commonNomineeModal = {};
    }
    const { selectedId, transactionId, clientSeq, revertRole, ...res } = payload;

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
    const { mainInsuredClientId, mainOwnerClientId, mainPayorClientId } =
      draftState.processData.policyInfo || {};

    const roles = [
      { clientId: mainOwnerClientId, role: 'CUS001' },
      { clientId: mainInsuredClientId, role: 'CUS002' },
      { clientId: mainPayorClientId, role: 'CUS005' },
    ];

    draftState.commonNomineeModal = { ...draftState.commonNomineeModal, ...res };

    if (selectedId) {
      const clientIndex = lodash.findIndex(
        lodash.get(draftState, `${transactionPath}.clientInfoList`),
        (item) => item.clientSeq === clientSeq
      );
      const identificationClientInfoList = identificationList
        ? lodash.find(identificationList, { clientSeq })?.clientInfoList
        : [];

      const clientInfo = clientInfoList?.find((clientItem) => clientItem.clientSeq === clientSeq);
      const selectData = [clientInfo, ...(identificationClientInfoList || [])].find(
        (item) => item?.id === selectedId
      );

      lodash.set(draftState, `${transactionPath}.clientInfoList[${clientIndex}].roleList`, [
        ...roles
          .filter(
            (role) =>
              role.clientId ===
              tenant.region({
                [Region.TH]: selectData?.clientId,
                [Region.MY]: selectData?.ccrClientId,
              })
          )
          .map((item) => ({ customerRole: item.role })),
        {
          customerRole: 'CUS003',
        },
      ]);
    }

    if (revertRole) {
      lodash.set(
        draftState,
        `${transactionPath}.clientInfoList`,
        clientInfoList?.map((clientItem) => {
          const currentIdentificationClientResultItem = identificationClientResultList.find(
            (resultItem) => resultItem?.clientSeq === clientItem?.clientSeq
          );
          return {
            ...clientItem,
            roleList:
              [
                ...roles
                  .filter(
                    (role) =>
                      role.clientId ===
                      tenant.region({
                        [Region.TH]: currentIdentificationClientResultItem?.selectClientId,
                        [Region.MY]: currentIdentificationClientResultItem?.selectCcrClientId,
                      })
                  )
                  .map((item) => ({ customerRole: item.role })),
                {
                  customerRole: 'CUS003',
                },
              ] || clientItem.roleList,
          };
        })
      );
    }
  });
