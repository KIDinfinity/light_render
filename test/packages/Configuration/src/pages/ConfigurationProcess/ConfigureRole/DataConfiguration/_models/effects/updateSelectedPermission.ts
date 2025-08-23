import { isNil,some,filter } from 'lodash';

export default function* ({ payload }: any, { put, select }: any) {
  const { formData } = yield select((state: any) => state.configureRoleController);
  const { item } = payload;
  let { subSection=[] } = formData;
  subSection=isNil(subSection)?[]:subSection;
  const result = some(subSection, (subItem: any) => item?.data?.permission_code === subItem?.data?.permission_code);
  subSection=result?filter(subSection,(subItem: any) => item?.data?.permission_code !== subItem?.data?.permission_code):[...subSection,item]
  yield put({
    type: 'updateFormData',
    payload: {
      formData: {
        ...formData,
        subSection,
      },
      isUpdateSubSection:true,
    },
  });
}
