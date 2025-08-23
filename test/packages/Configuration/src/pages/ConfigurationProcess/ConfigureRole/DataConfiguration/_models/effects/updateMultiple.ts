import lodash from 'lodash';
// import { tranferResult } from 'configuration/pages/ConfigurationCenter/Utils/Transfer';
import { formUtils } from 'basic/components/Form';

export default function* ({ payload }: any, { put, select }: any) {
  const { isUpdateMultiple, formData, listPage } = yield select((state: any) => ({
    isUpdateMultiple: state.configureRoleController.isUpdateMultiple,
    formData: state.configureRoleController.formData,
    listPage: state.configureRoleController.listPage,
  }));
  const formDataTemp = formUtils.cleanValidateData(formData);
  const newFormData = formDataTemp;
  const { isUpdateSubSection } = payload;
  if (isUpdateMultiple && !lodash.isEmpty(formData)) {
    const newRows = (lodash.chain(listPage) as any)
      .get('rows')
      .map((item: any) => ({
        ...item,
        data:  { ...item?.data, ...newFormData.data },
        subSection: isUpdateSubSection?[...(newFormData.subSection || [])]:[...item?.subSection,...(newFormData.subSection || [])],
      }))
      .value();
    yield put({
      type: 'saveListPage',
      payload: {
        listPage: {
          ...listPage,
          rows: newRows,
        },
      },
    });
  }
}
