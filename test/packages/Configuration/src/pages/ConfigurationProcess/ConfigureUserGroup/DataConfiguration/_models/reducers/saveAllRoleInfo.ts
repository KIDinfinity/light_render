import { produce } from 'immer';
import {map,some,sortBy} from 'lodash';

export default (state: any, action: any) => {
  const { allRoleInfo } = action.payload;
  const {formData}=state;
  let newList=map(allRoleInfo,item=>{
    const isExist=some(
      formData?.subSection,
      (subItem: any) =>   item?.data?.role_code === subItem?.data?.role_code
    )
    return isExist?{...item,active:true}:{...item}
  })
  newList=sortBy(newList,['active']);
  const nextState = produce(state, (draftState: any) => {
    draftState.allRoleInfo = newList;
  });
  return nextState;
};
