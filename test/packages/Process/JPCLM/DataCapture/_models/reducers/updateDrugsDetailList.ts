import { produce }  from 'immer';
import { SearchListType } from 'claim/enum';
const updateDrugsDetailList = (state: any, action: any) => {
  const {type} = action.payload;
  if(type === SearchListType.CLEAR){
    const nextState = produce(state, (draftState: any) => {
      draftState.DrugsDetail = {
        allList:[],
        filterList:[],
        show:false,
        total:0,
        filterParams:{},
        searchState:false,
        page:1,
        drugsListStore:[],
        idx:0
      };
    });
  
    return { ...nextState };
  }
  else if(type === SearchListType.SAVE){
    const { list:{rows,total},page,searchState } = action.payload;
    const obj = {
      allList:rows,
      total,
      page,
      searchState
    }
    const newState = produce(state, (draftState: any) => {
      draftState.DrugsDetail = {
        ...draftState.DrugsDetail,
        ...obj
      }
    });
    return { ...newState };
  }
};

export default updateDrugsDetailList;
