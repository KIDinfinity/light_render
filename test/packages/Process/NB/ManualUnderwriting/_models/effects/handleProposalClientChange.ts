import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { changeCustomerInformation } from '@/services/owbNbProposalControllerService';
import { listDedupCheckCfg } from '@/services/owbNbDropdownControllerService';
import { NbClientTag } from 'process/NB/CustomerIdentification/Enum';
import matchValueByTransConfig from 'process/NB/ManualUnderwriting/utils/matchValueByTransConfig';
import { transConfig } from 'process/NB/ManualUnderwriting/_hooks/data.trans.config';
import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';

export default function* handleProposalClientChange(_: any, { put, select, call }: any) {
  const roleConfigResponse = yield call(listDedupCheckCfg);
  const roleDedupCheckConfig = lodash
    .chain(roleConfigResponse)
    .get('resultData', [])
    .filter((role) => role?.isDedupCheck === 'Y')
    .map((role) => role?.customerRole)
    .value();
  const taskDetail = yield select(({ manualUnderwriting }: any) => manualUnderwriting.taskDetail);
  yield put({
    type: 'savePerposal',
  });
  let isPopUpClientSelect = false;
  const businessData = yield select((state: any) => state.manualUnderwriting.businessData);
  const originBizData = yield select((state: any) => state.manualUnderwriting.originBizData);
  const clientInfoList = lodash.get(businessData, 'policyList[0].clientInfoList', []);
  const originClientInfoList = lodash.get(originBizData, 'policyList[0].clientInfoList', []);
  let isKeyInformationChange = false;
  const dataKeys = [
    'dateOfBirth',
    'firstName',
    'surname',
    'customerEnFirstName',
    'customerEnSurname',
    'gender',
    'identityType',
    'identityNo',
    'preferredName',
  ];
  lodash.forEach(clientInfoList, (clientItem: any) => {
    const id = clientItem?.id;
    let hasDedupCheckRole = false;
    lodash.forEach(clientItem?.roleList, (role) => {
      if (!role.deleted && roleDedupCheckConfig.includes(role?.customerRole)) {
        hasDedupCheckRole = true;
      }
    });
    // 点击confirm时，skip当前没有勾选role的client
    if (hasDedupCheckRole) {
      const originClientItem = lodash
        .chain(originClientInfoList)
        .find((item: any) => item?.id === id)
        .value();
      if (!originClientItem) {
        isKeyInformationChange = true;
      } else {
        // 判断六要素改变
        lodash.forEach(dataKeys, (key) => {
          const originData = (() => {
            if (lodash.get(transConfig, key)) {
              return matchValueByTransConfig({
                item: originClientItem,
                path: lodash.get(transConfig, key),
              });
            }
            return lodash.get(originClientItem, key);
          })();
          const changedData = (() => {
            if (lodash.get(transConfig, key)) {
              return matchValueByTransConfig({
                item: clientItem,
                path: lodash.get(transConfig, key),
              });
            }
            return lodash.get(clientItem, key);
          })();
          if (
            !lodash.isEqual(formUtils.queryValue(originData), formUtils.queryValue(changedData)) &&
            !!originData &&
            !!changedData
          ) {
            isKeyInformationChange = true;
          }
        });
      }
    }
  });
  if (isKeyInformationChange) {
    const dataForSubmit = yield put.resolve({
      type: 'getDataForSubmit',
    });
    const data = {
      ...dataForSubmit,
      taskId: taskDetail?.taskId,
      caseCategory: taskDetail?.caseCategory,
      activityKey: taskDetail?.taskDefKey,
      businessNo: taskDetail?.businessNo,
    };
    const response = yield call(changeCustomerInformation, {
      ...data,
    });
    const { success, resultData } = lodash.pick(response, [
      'success',
      'resultData',
      'promptMessages',
    ]);
    if (success && lodash.isPlainObject(resultData)) {
      yield put({
        type: 'saveCustomerIndentificationData',
        payload: {
          customerIndentificationData: resultData,
        },
      });
      yield put({
        type: 'claimEditable/setTaskNotEditable',
        payload: {
          taskNotEditable: false,
        },
      });
      lodash
        .chain(resultData)
        .get('policyList[0].clientInfoList', [])
        .forEach((client: any) => {
          lodash
            .chain(client)
            .get('identificationList', [])
            .forEach((identification: any) => {
              if (identification.clientTag === NbClientTag.SuspectClient) {
                isPopUpClientSelect = true;
              }
            })
            .value();
        })
        .value();
      yield put.resolve({
        type: 'updateClientsByDedupcheck',
        payload: {
          customerIndentificationData: resultData,
        },
      });
      if (!isPopUpClientSelect) {
        yield put.resolve({
          type: 'submitClientChange',
        });
      }
    }

    if (!success) {
      handleErrorMessageIgnoreXErrorNotice(response);
      return true;
    }
  }
  if (isPopUpClientSelect) {
    yield put({
      type: `setIndentificationModalVisible`,
      payload: {
        indentificationModalVisible: true,
      },
    });
  }
  return isPopUpClientSelect;
}
