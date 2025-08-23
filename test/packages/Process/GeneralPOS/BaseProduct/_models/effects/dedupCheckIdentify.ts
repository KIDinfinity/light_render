import { identify } from '@/services/posSrvClientControllerService';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { IdentificationClientTagEnum } from 'process/GeneralPOS/common/Enum';
import { v4 as uuidv4 } from 'uuid';
import delay from '@/utils/delay';

export default function* ({ payload }: any, { call, put, select }: any) {
  const transactionId = lodash.get(payload, 'transactionId');
  const clientSeq = lodash.get(payload, 'clientSeq');
  const { caseCategory, activityKey, caseNo, taskId, businessNo } = yield select(
    ({ processTask }: any) => processTask.getTask
  );

  const transactionTypeDetail = yield select(
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

  const response = yield call(identify, {
    clientInfoList: formUtils.cleanValidateData(
      clientInfoList?.filter((item) => `${item?.clientSeq}` === `${clientSeq}`)
    ),
    policyClientRole: {
      mainInsuredId: mainInsuredClientId,
      mainOwnerId: mainOwnerClientId,
      mainPayorId: mainPayorClientId,
    },
    taskInfo: {
      caseNo,
      taskId,
      businessNo,
      caseCategory,
      activityKey,
    },
  });

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && !lodash.isEmpty(resultData)) {
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
        (item) => `${item?.clientSeq}` !== `${clientSeq}`
      ),
      ...(resultData.identificationClientResultList || []),
    ];
    const newIdentificationList = [
      ...lodash.filter(identificationList, (item) => `${item?.clientSeq}` !== `${clientSeq}`),
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

    yield put({
      type: 'saveCommonNomineeModal',
      payload: {
        visible: true,
        suspectClientList,
        showClientList: resultData.identificationClientResultList,
      },
    });
  }
  if (!success) {
    yield delay(300);
    yield put({
      type: 'navigatorInformationController/loadAllCategoryInformation',
      payload: { caseCategory },
    });
  }
}
