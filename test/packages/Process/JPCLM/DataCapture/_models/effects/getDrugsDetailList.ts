import lodash from 'lodash';
import { getStandardDrugListForPage } from '@/services/claimJpPlanStandardControllerService';
import { SearchListType } from 'claim/enum';
export default function* getDrugsDetailList({ payload }: any, { call, select, put }: any) {
  const filterParams = yield select((state: any) => state.JPCLMOfDataCapture.DrugsDetail.filterParams);
  const searchState: any = yield select((state: any) => state.JPCLMOfDataCapture.DrugsDetail.searchState);
  let responseInfo = [];
  const currentPage = payload?.currentPage;
  if(!lodash.isEmpty(filterParams)&&payload?.searchState){//点击搜索
    responseInfo = yield call(getStandardDrugListForPage,{params:filterParams,currentPage:1,pageSize:10});
    if (responseInfo?.success) {
      yield put({
        type: 'updateDrugsDetailList',
        payload: {
          type:SearchListType.SAVE,
          list: responseInfo?.resultData,
          searchState: payload.searchState,
          page:1
        },
      });
    }
  }
  else if(!lodash.isEmpty(filterParams)&&searchState){//搜索时分页
    responseInfo = yield call(getStandardDrugListForPage,{params:filterParams,currentPage,pageSize:10});
    if (responseInfo?.success) {
      yield put({
        type: 'updateDrugsDetailList',
        payload: {
          type:SearchListType.SAVE,
          list: responseInfo?.resultData,
          page:currentPage,
          searchState:true
        },
      });
    }
  }
  else{
    responseInfo =  yield call(getStandardDrugListForPage,{params:filterParams,currentPage,pageSize:10})
    if (responseInfo?.success) {
      yield put({
        type: 'updateDrugsDetailList',
        payload: {
          type:SearchListType.SAVE,
          list: responseInfo?.resultData,
          page:currentPage,
          searchState: false
        },
      });
    }
  }
  
}
