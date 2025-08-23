import { produce } from 'immer';
import {map,some,sortBy} from 'lodash';

export default (state: any, action: any) => {
  const { allPermissionInfo } = action.payload;
  const {formData}=state;
  let newList=map(allPermissionInfo,item=>{
    const isExist=some(
      formData?.subSection,
      (subItem: any) => item?.data?.permission_code === subItem?.data?.permission_code
    )
    return isExist?{...item,active:true}:{...item}
  })
  newList=sortBy(newList,['active']);
  const nextState = produce(state, (draftState: any) => {
    draftState.allPermissionInfo = newList;
  });
  return nextState;
};
