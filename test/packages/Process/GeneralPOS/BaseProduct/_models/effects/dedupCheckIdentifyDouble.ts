import { identify } from '@/services/posSrvClientControllerService';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { IdentificationClientTagEnum } from 'process/GeneralPOS/common/Enum';
import { v4 as uuidv4 } from 'uuid';

interface ResponseGenerator {}

export default function* ({ payload }: any, { call, put, select }: any) {
  const transactionTypesMap: ResponseGenerator = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities?.transactionTypesMap
  );
  const transactionId = lodash.keys(transactionTypesMap)[0];

  const needDuplicateCheckList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.needDuplicateCheckList
  );

  if (lodash.isEmpty(needDuplicateCheckList)) {
    return 'end';
  }

  const transactionTypeDetail: ResponseGenerator = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]
  );

  const policyInfo = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyInfo
  );

  const { mainOwnerClientId, mainInsuredClientId, mainPayorClientId } = policyInfo;

  const {
    clientInfoList,
    identificationClientResultList,
    identificationList,
  } = lodash.pick(transactionTypeDetail, [
    'clientInfoList',
    'identificationClientResultList',
    'identificationList',
  ]);

  const apiParams = {
    clientInfoList: formUtils.cleanValidateData(
      clientInfoList.filter((item) => needDuplicateCheckList.includes(item?.clientSeq))
    ),
    policyClientRole: {
      mainInsuredId: mainInsuredClientId,
      mainOwnerId: mainOwnerClientId,
      mainPayorId: mainPayorClientId,
    },
  };

  const response = yield call(identify, apiParams);

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && !lodash.isEmpty(resultData)) {
    // 更新后端拼接后的addressList、contactList和roleList
    const newClientInfoList = lodash.map(clientInfoList, (item) => {
      const resultItem = lodash.find(
        resultData.clientInfoList,
        (clientItem) => `${item?.clientSeq}` === `${clientItem.clientSeq}`
      );
      if (resultItem) {
        return {
          ...item,
          addressList: resultItem?.addressList,
          contactList: resultItem?.contactList,
          roleList: resultItem?.roleList || item?.roleList,
        };
      }
      return item;
    });
    const newIdentificationClientResultList = [
      ...lodash.filter(
        identificationClientResultList,
        (item) => !needDuplicateCheckList.includes(item?.clientSeq)
      ),
      ...(resultData.identificationClientResultList || []),
    ];
    const newIdentificationList = [
      ...lodash.filter(
        identificationList,
        (item) => !needDuplicateCheckList.includes(item?.clientSeq)
      ),
      ...(resultData.identificationList || []),
    ].map((item) => ({
      ...item,
      clientInfoList: item?.clientInfoList?.map((clientItem) => ({
        ...clientItem,
        id: clientItem?.id || uuidv4(),
      })),
    }));

    yield put({
      type: 'nomineeCover',
      payload: {
        transactionId,
        coverData: {
          clientInfoList: newClientInfoList,
          identificationClientResultList: newIdentificationClientResultList,
          identificationList: newIdentificationList,
        },
      },
    });

    const suspectClientList = lodash.filter(
      resultData.identificationClientResultList,
      (item) => item?.identificationResult === IdentificationClientTagEnum.SuspectClient
    );

    if (!lodash.isEmpty(suspectClientList)) {
      yield put({
        type: 'saveCommonNomineeModal',
        payload: {
          visible: true,
          suspectClientList,
          showClientList: resultData.identificationClientResultList,
          submit: true,
        },
      });
      return 'break';
    }
    return 'end';
  }
}
