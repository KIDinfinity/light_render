import { produce } from 'immer';
import navigatorCaseManagementControllerService from '@/services/navigatorCaseManagementControllerService';
import navigatorTaskInfoControllerService from '@/services/navigatorTaskInfoControllerService';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import lodash, { isEmpty, isPlainObject } from 'lodash';
import { compareDataV2 } from 'claim/pages/utils/claimDataCompare';

export default {
  namespace: 'claimCaseController',

  state: {
    businessNo: '',
    collectFields: {},
    changedModuleFields: {},
  },

  effects: {
    *queryBusinessNo({ payload }: any, { call, put }: any) {
      const response = yield call(
        navigatorCaseManagementControllerService.queryBusinessNo,
        payload
      );

      if (response?.success) {
        yield put({
          type: 'save',
          payload: {
            businessNo: response.resultData?.businessNo,
          },
        });
      }

      return response;
    },
    *saveSnapshot({ payload }: any, { call, select, put }: any) {
      const { postData, optionType } = payload;

      if (isEmpty(postData) || !isPlainObject(postData)) return false;

      const taskDetail = yield select(({ processTask }: any) => processTask.getTask);

      const dataForSave = yield assembleDefaultDataForSave({
        taskDetail,
        optionType,
        dataForSubmit: postData,
      });

      if (dataForSave === requestHandleType.break) {
        return {
          success: false,
        };
      }

      const versionNo = dataForSave?.snapshotDataList?.[0]?.version?.versionNo;
      yield put({
        type: 'task/saveSavingVersion',
        payload: { savingVersionNo: versionNo },
      });
      const response = yield call(navigatorTaskInfoControllerService.snapshot, dataForSave);

      yield put({
        type: 'task/saveSavingVersion',
        payload: { currentVersion: versionNo, savingVersionNo: '' },
      });

      return response;
    },
    *compareClaimDataV2({ payload }: any, { put, select }: any) {
      const { targetDataPath } = payload;
      const isDispatchPath = targetDataPath.includes('/');
      const isObjectReadPath = targetDataPath.includes('.');

      const { sourceData, targetDataState } = yield select((state: any) => ({
        sourceData: state.claimCaseController.comparedClaimData,
        targetDataState: isObjectReadPath ? lodash.get(state, targetDataPath) : null,
      }));

      let targetData = targetDataState;
      if (!targetData && isDispatchPath) {
        targetData = yield put.resolve({ type: targetDataPath });
      }

      const targetFollowUp = lodash.get(targetData, 'followUpInquiryNoClaimList', []);
      let followUpInquiryNoClaimList = [];
      if (!lodash.isEmpty(targetFollowUp)) {
        followUpInquiryNoClaimList = lodash
          .chain(targetFollowUp)
          .concat(lodash.get(sourceData, 'followUpInquiryNoClaimList', []))
          .uniqBy('relatedInquiryClaimNo')
          .value();
      }

      targetData = { ...targetData, followUpInquiryNoClaimList };

      return compareDataV2(sourceData, targetData);
    },
    *getComparedClaimData(_: any, { select }: any) {
      const { sourceData } = yield select((state: any) => ({
        sourceData: state.claimCaseController.comparedClaimData,
      }));

      return sourceData;
    },
  },
  reducers: {
    save(state: any, action: any) {
      return {
        ...state,
        ...action.payload,
      };
    },
    saveComparedClaimData(state: any, { payload }: any) {
      return produce(state, (draftState: any) => {
        const { comparedClaimData, comparedClaimCreateNormalizeData } = payload;
        const draft = draftState;

        draft.comparedClaimData = comparedClaimData;
        draft.comparedClaimCreateNormalizeData = comparedClaimCreateNormalizeData;
      });
    },
    saveModuleFields(state: any, { payload }: any) {
      return produce(state, (draftState: any) => {
        const { module, fieldName } = payload;
        const draft = draftState;
        const { changedModuleFields } = draft;

        if (!lodash.isPlainObject(changedModuleFields)) {
          draft.changedModuleFields = {};
        }

        draft.changedModuleFields[module] = lodash
          .chain(changedModuleFields?.[module])
          .concat(fieldName)
          .compact()
          .uniq()
          .value();
      });
    },
    clearCompareData(state: any) {
      return produce(state, (draftState: any) => {
        const draft = draftState;

        draft.compareClaimData = null;
        draft.changedModuleFields = {};
        draft.collectFields = {};
      });
    },
    collectFields(state: any, { payload }: any) {
      return produce(state, (draftState: any) => {
        const { fieldType, fields } = payload;
        const draft = draftState;

        const { collectFields } = draft;

        draft.collectFields[fieldType] = lodash
          .chain(collectFields?.[fieldType])
          .concat(fields)
          .compact()
          .value();
      });
    },
    saveFurtherClaimVisable(state: any, { payload }: any) {
      const { furtherClaimVisable } = payload;

      return produce(state, (draftState: any) => {
        draftState.furtherClaimVisable = furtherClaimVisable;
      });
    },
  },
};
