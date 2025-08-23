import lodash from 'lodash';
import bpm from 'bpm/pages/OWBEntrance';
import { EGroupCode } from 'bpm/pages/Envoy/enum';
import { transferToJson, argToVal } from 'bpm/pages/Envoy/_utils/dataTransferFn';

interface IAction {
  payload: {
    reasonGroup: any;
    otherData?: any;
  };
}

function* getSendEnvoyData({ payload }: IAction, { select, put }: any) {
  const { reasonGroup, otherData = {} } = payload;

  const reasonConfigs = yield select((state: any) => state.envoyController?.reasonConfigs);

  const newReasonGroup = lodash.cloneDeep(reasonGroup);
  const { groupCode, inquiryBusinessNo, reasonDetails } = newReasonGroup;

  const currentReasonConfig = lodash
    .chain(reasonConfigs)
    .pickBy(lodash.isObject as any)
    .find({ code: groupCode })
    .value();

  const { destRoleInfo, businessNo } = yield select((state: any) => ({
    ...lodash.pick(state?.envoyController, ['destRoleInfo', 'businessNo']),
  }));

  lodash.forEach(newReasonGroup?.reasonDetails, (reasonDetail: any, reasonIdx: number) => {
    const roleInfoKey = `${businessNo}_${reasonDetail.destRole}`;
    const roleInfoList = lodash.get(destRoleInfo, roleInfoKey);
    lodash.set(newReasonGroup, `reasonDetails[${reasonIdx}]`, transferToJson(reasonDetail));
    lodash.set(
      newReasonGroup,
      `reasonDetails[${reasonIdx}].channelDataList`,
      argToVal(reasonDetail.channelDataList)
    );
    lodash.set(
      newReasonGroup,
      `reasonDetails[${reasonIdx}].destId`,
      lodash
        .chain(roleInfoList)
        .find((el: any) => el.fullName === reasonDetail.dest)
        .get('userId')
        .value() || ''
    );
    lodash.forEach(reasonDetail?.reasonReminders, (reasonReminder: any, reminderIdx: number) => {
      const roleInfoKey = `${businessNo}_${reasonReminder.destRole}`;
      const roleInfoList = lodash.get(destRoleInfo, roleInfoKey);
      lodash.set(
        newReasonGroup,
        `reasonDetails[${reasonIdx}].reasonReminders[${reminderIdx}]`,
        transferToJson(reasonReminder)
      );
      lodash.set(
        newReasonGroup,
        `reasonDetails[${reasonIdx}].reasonReminders[${reminderIdx}].channelDataList`,
        argToVal(reasonReminder.channelDataList)
      );
      lodash.set(
        newReasonGroup,
        `reasonDetails[${reasonIdx}].reasonReminders[${reminderIdx}].destId`,
        lodash
          .chain(roleInfoList)
          .find((el: any) => el.fullName === reasonDetail.dest)
          .get('userId')
          .value() || ''
      );
    });
  });
  let ExtraData: any = {};
  if (lodash.values(EGroupCode).includes(groupCode)) {
    const userId = yield select((state: any) => state.user?.currentUser?.userId);
    const businessData = yield put.resolve({
      type: 'phowbDataCaptureController/getPosPendingInfoByPosNo',
      payload: {
        posNo: inquiryBusinessNo,
      },
    });
    ExtraData = {
      businessData: {
        ...businessData,
      },
      applicant: userId,
    };
  }

  if (reasonGroup.name === 'Investigation') {
    yield bpm.buttonAction('save');
    // @ts-ignore
    const businessData: any = yield put.resolve({
      type: 'getBusinessData',
    });
    ExtraData.businessData = businessData;
  }

  ExtraData = {
    ...ExtraData,
    ...lodash.pick(currentReasonConfig, [
      'emailBccEM',
      'emailCcEM',
      'emailContentEM',
      'emailTitleEM',
      'emailToEM',
      'smsContentEM',
      'smsToEM',
    ]),
  };

  const params: any = {
    ...newReasonGroup,
    reasonDetails: lodash.map(reasonDetails, (item: any) => ({
      ...item,
      dataType: 'mainPage',
    })),
    ...ExtraData,
    ...otherData,
  };
  return params;
}

export default getSendEnvoyData;
