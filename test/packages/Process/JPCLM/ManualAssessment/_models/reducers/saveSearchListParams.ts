import { produce }  from 'immer';
import lodash from 'lodash';
import moment from 'moment'
const saveSearchListParams = (state: any, action: any) => {
  const { changedFields } = action.payload;
  let obj = changedFields;
  const nextState = produce(state, (draftState: any) => {
    if(lodash.isEmpty(changedFields)){
      draftState.DrugsDetail.filterParams={}
      draftState.DrugsDetail.searchState = false;
      draftState.DrugsDetail.page = 1;
    }
    else{
      const [key, value] = Object.entries(changedFields)[0]
      if(key==='effectiveDate'&&value){
        obj = {
          effectiveDate:moment(changedFields.effectiveDate).format('YYYY/MM/DD')
        }
      }
      if(key==='expireDate'&&value){
        obj = {
          expireDate:moment(changedFields.expireDate).format('YYYY/MM/DD')
        }
      }
      draftState.DrugsDetail.filterParams = {
        ...draftState.DrugsDetail.filterParams,
       ...obj,
      };
    }

  });
  return { ...nextState };
};

export default saveSearchListParams;
