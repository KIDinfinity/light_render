import { produce } from 'immer';
import {map,some,sortBy} from 'lodash';

export default (state: any, action: any) => {
  const { allGroupInfo } = action.payload;
  const {formData}=state;
  let newList=map(allGroupInfo,item=>{
    const isExist=some(
      formData?.subSection,
      (subItem: any) =>  item?.data?.group_code === subItem?.data?.group_code
    )
    return isExist?{...item,active:true}:{...item}
  })
  newList=sortBy(newList,['active']);
  const nextState = produce(state, (draftState: any) => {
    draftState.allGroupInfo = newList;
  });
  return nextState;
};
