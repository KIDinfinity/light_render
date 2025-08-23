import lodash, { isArray } from 'lodash';
import { getTreeAllOrganizationName } from '../../Utils';

export default [
  function* ({ payload = {} }: any, { put, select }: any) {
    const { formData, isUpdateSubSection = false, changeValues } = payload;
    const { allOrganization } = yield select((state: any) => state.configureUserController);

    const organization_code = formData?.data?.organization_code;
    let newFormData = formData;
    if (lodash.size(changeValues) === 1 && lodash.has(changeValues, 'user_id')) {
      newFormData = { ...formData, data: { ...formData.data, mentor: null } }
    }
    if (isArray(organization_code) && !isUpdateSubSection) {
      const organization_name = getTreeAllOrganizationName(
        formData?.data?.organization_code || [],
        allOrganization
      ).join('/');
      newFormData = { ...formData, data: { ...formData.data, organization_name } };
    }
    yield put({
      type: 'saveFormData',
      payload: {
        formData: newFormData,
      },
    });

    yield put({
      type: 'updateMultiple',
      payload: {
        isUpdateSubSection,
      },
    });
  },
  { type: 'takeLatest' },
];
