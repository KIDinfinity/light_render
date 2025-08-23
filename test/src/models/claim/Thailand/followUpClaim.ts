import { get } from '@/services/claimFollowUpClaimCaseControllerService';
import { queryData } from '@/services/dcSnapshotService';
import { saveSnashot } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';

import { safeParseUtil } from '@/utils/utils';
import lodash from 'lodash';

export default {
  namespace: 'followUpClaim',
  state: {
    inquiryClaimNo: null,
    followUpClaimList: [],
    indirectClaimList: [],
    allRelatedClaimList: [],
    followUpCalculateClaimNoList: [],
  },
  effects: {
    *initFollowUpClaim({ payload }, { put, select }) {
      const { taskStatus, activityKey } = yield select((state: any) => state.processTask.getTask);
      yield put({
        type: 'saveIndirect',
        payload,
      });
      // 已完成的task调snapshot
      if (taskStatus === 'completed') {
        yield put({
          type: 'getSnapshot',
        });
      } else {
        // 未完成的task调claim
        yield put({
          type: 'getFollowUpClaim',
          payload: { ...payload, taskStatus, activityKey },
        });
      }
    },
    *getSnapshot(_, { call, put, select }) {
      const { taskId } = yield select((state: any) => state.processTask.getTask);
      const response = yield call(queryData, {
        dataType: 'followUp',
        taskId,
      });
      if (response && response.success && response.resultData) {
        const followUpData = safeParseUtil(response.resultData.dataValue);
        yield put({
          type: 'saveFollowUpClaim',
          payload: followUpData,
        });
      }

      return response;
    },
    *getFollowUpClaim({ payload }, { call, put, select }) {
      const { taskStatus, activityKey } = yield select((state: any) => state.processTask.getTask);
      const response = yield call(get, { ...payload, taskStatus, activityKey });
      if (response && response.success && response.resultData) {
        yield put({
          type: 'saveFollowUpClaim',
          payload: response.resultData,
        });
      }
      return response;
    },
    *saveSnapshot(_, { select }) {
      const taskDetail = yield select((state) => ({
        ...state.processTask.getTask,
      }));

      const { followUpClaimList } = yield select((state) => state.followUpClaim);
      const followUpClaimNoList = lodash.map(followUpClaimList, (item) => {
        const followUpItem = { ...item };
        delete followUpItem.checked;
        delete followUpItem.disabled;

        return followUpItem;
      });
      return yield saveSnashot({
        dataType: 'followUp',
        taskDetail,
        dataForSubmit: followUpClaimNoList,
        optionType: EOptionType.FollowUp,
      });
    },
    *setInquiryNoClaimList(_, { select }) {
      const { inquiryClaimNo, followUpClaimList, followUpCalculateClaimNoList } = yield select(
        (state) => state.followUpClaim
      );
      // eslint-disable-next-line consistent-return

      const inqueryClaimNoFilterList = lodash.filter(
        followUpClaimList,
        (item) => item.checked && !item.disabled
      );
      const inqueryClaimNoList = lodash.map(inqueryClaimNoFilterList, (item) => {
        return {
          inquiryClaimNo,
          relatedInquiryClaimNo: item.inquiryClaimNo,
          relationType: 1,
          confinementClaim: item?.confinementClaim,
        };
      });

      return {
        followUpInquiryNoClaimList: inqueryClaimNoList,
        followUpCalculateClaimNoList,
      };
    },
  },
  reducers: {
    saveFollowUpClaim(state, { payload }) {
      const { allRelatedClaimList, indirectClaimList } = state;
      // 所有关联的claimCase选中
      let newFollowUpClaim = lodash.map(payload, (caseItem) => {
        const newItem = { ...caseItem };
        if (lodash.includes(allRelatedClaimList, caseItem.inquiryClaimNo)) {
          newItem.checked = true;
        }

        return newItem;
      });
      // 间接关联的claimCase不可编辑
      newFollowUpClaim = lodash.map(newFollowUpClaim, (caseItem) => {
        const newItem = { ...caseItem };
        if (lodash.includes(indirectClaimList, caseItem.inquiryClaimNo)) {
          newItem.disabled = true;
        } else {
          newItem.disabled = false;
        }

        return newItem;
      });

      return {
        ...state,
        followUpClaimList: newFollowUpClaim,
      };
    },
    clearFlowUp(state) {
      return {
        ...state,
        inquiryClaimNo: null,
        followUpClaimList: null,
        indirectClaimList: [],
        allRelatedClaimList: [],
        followUpCalculateClaimNoList: [],
      };
    },
    saveIndirect(state, action) {
      const { inquiryClaimNo, followUpInquiryNoClaimList, followUpCalculateClaimNoList } =
        action.payload;

      // directList直接关联的claimNo
      const directList = lodash
        .chain(followUpInquiryNoClaimList)
        .map((item) => [item?.inquiryClaimNo, item?.relatedInquiryClaimNo])
        .flatten()
        .uniq()
        .pull(inquiryClaimNo)
        .value();

      // indirectClaimList间接关联的claimNo
      const indirectClaimList = lodash
        .chain(followUpCalculateClaimNoList)
        .map((item) => [item?.inquiryClaimNo, item?.relatedInquiryClaimNo])
        .flatten()
        .uniq()
        .pull(...directList, inquiryClaimNo)
        .value();

      return {
        ...state,
        indirectClaimList,
        allRelatedClaimList: [...directList, ...indirectClaimList],
        inquiryClaimNo,
        followUpCalculateClaimNoList,
      };
    },
    saveFlowUpItem(state, action) {
      const { flowUpItem, checked } = action.payload;
      const { followUpClaimList, followUpCalculateClaimNoList } = state;
      let newFollowUpCalculateClaimNoList = followUpCalculateClaimNoList;
      const newFollowUpClaimList = lodash.map(followUpClaimList, (caseItem) => {
        const newItem = { ...caseItem };
        if (newItem.inquiryClaimNo === flowUpItem.inquiryClaimNo) {
          newItem.checked = checked;
        }

        return newItem;
      });
      if (!checked) {
        newFollowUpCalculateClaimNoList = lodash.filter(
          followUpCalculateClaimNoList,
          (item) =>
            !(
              item.inquiryClaimNo === flowUpItem.inquiryClaimNo ||
              item.relatedInquiryClaimNo === flowUpItem.inquiryClaimNo
            )
        );
      }

      return {
        ...state,
        followUpClaimList: newFollowUpClaimList,
        followUpCalculateClaimNoList: newFollowUpCalculateClaimNoList,
      };
    },
  },
};
