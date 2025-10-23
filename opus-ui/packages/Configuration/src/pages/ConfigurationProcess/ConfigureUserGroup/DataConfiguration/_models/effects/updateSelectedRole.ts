import {isNil, some, filter } from 'lodash';

export default function* ({ payload }: any, { put, select }: any) {
  const { formData } = yield select((state: any) => state.configureUserGroupController);
  let { item } = payload;
  item = {...item, subSection: null}
  let { subSection = [] } = formData;
  subSection = isNil(subSection) ? [] : subSection;

  const result = some(subSection, (subItem: any) => item?.data?.role_code === subItem?.data?.role_code);
  subSection = result ? filter(subSection,(subItem: any) => item?.data?.role_code !== subItem?.data?.role_code) : [...subSection, item]

  yield put({
    type: 'updateFormData',
    payload: {
      formData: {
        ...formData,
        subSection,
      },
      isUpdateSubSection: true,
    },
  });
}
