import { produce } from 'immer';
import lodash from 'lodash';
import TaskDefKey from 'enum/TaskDefKey';
import RetrySettlement from '../../constant/RetrySettlement';

const saveClaimProcessData = (state: any, action: any) => {
  1;
  const nextState = produce(state, (draftState: any) => {
    const { businessData, taskDetail } = action.payload;
    // 如果errorInfoList里面的errorInfo里面的messageCode是源数据有值,并且不等于unknown,就不让user修改
    const sourceMessageCodes = {};
    let retrySettlement = {};
    lodash.forEach(businessData?.integrationExceptionHandlingDataList, (integrationItem) => {
      lodash.forEach(integrationItem?.errorInfoList, (item, index) => {
        const messageCode = item?.errorInfo?.messageCode;
        sourceMessageCodes[`sourceMessageCode${index}`] =
          messageCode && messageCode !== 'unknown' && !taskDetail?.snapshotData
            ? messageCode
            : businessData?.[`sourceMessageCode${index}`];
        if (messageCode === 'unknown' && !taskDetail?.snapshotData) {
          // eslint-disable-next-line
          delete item?.errorInfo?.messageCode;
        }
      });

      if (integrationItem?.errorInfo?.messageCode === 'unknown' && !taskDetail?.snapshotData) {
        delete integrationItem?.errorInfo?.messageCode;
      }

      if (
        integrationItem?.errorInfo?.messageCode &&
        !taskDetail?.snapshotData &&
        !integrationItem?.errorInfoList
      ) {
        sourceMessageCodes[`sourceMessageCode${0}`] = integrationItem?.errorInfo?.messageCode;
      }
    });

    if (
      (!businessData?.businessInfo?.bizActivity ||
        businessData?.businessInfo?.bizActivity === TaskDefKey.HK_CLM_ACT006) &&
      taskDetail?.activityKey === TaskDefKey.BP_IE_ACT002 &&
      !taskDetail?.snapshotData
    ) {
      retrySettlement = {
        retrySettlement: lodash.values(RetrySettlement),
      };
    }

    // eslint-disable-next-line
    draftState.claimProcessData = { ...businessData, ...sourceMessageCodes, ...retrySettlement };
  });
  return { ...nextState };
};

export default saveClaimProcessData;
