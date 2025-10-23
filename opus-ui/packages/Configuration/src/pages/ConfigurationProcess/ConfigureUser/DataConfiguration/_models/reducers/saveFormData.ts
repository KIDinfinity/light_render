import { produce } from 'immer';
import { getTreeAllOrganizationCodes } from '../../Utils';
import { isString,cloneDeep,isNil } from 'lodash';

export default (state: any, action: any) => {
  const { formData } = action.payload;
  const {allOrganization}=state
  let {
    data: { organization_code }={}
  } = formData;
  if (isString(organization_code)&&!isNil(organization_code)) {
    organization_code = getTreeAllOrganizationCodes([organization_code], cloneDeep(allOrganization));
    const nextState = produce(state, (draftState: any) => {
      draftState.formData = {...formData,data:{...formData.data,organization_code}};
      draftState.allRolePermissions = { ...draftState.allRolePermissions, ...action.payload.allRolePermissions };
    });
    return nextState;
  }
    const nextState = produce(state, (draftState: any) => {
      draftState.formData = formData;
      draftState.allRolePermissions = { ...draftState.allRolePermissions, ...action.payload.allRolePermissions };
    });
    return nextState;
};
