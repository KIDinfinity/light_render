import lodash from 'lodash';
// import { tranferResult } from 'configuration/pages/ConfigurationCenter/Utils/Transfer';
import { formUtils } from 'basic/components/Form';
import { getTreeAllOrganizationName } from '../../Utils';

export default function* ({ payload }: any, { put, select }: any) {
  const { isUpdateMultiple, formData, listPage, allOrganization } = yield select((state: any) => ({
    isUpdateMultiple: state.configureUserController.isUpdateMultiple,
    formData: state.configureUserController.formData,
    listPage: state.configureUserController.listPage,
    allOrganization: state.configureUserController.allOrganization,
  }));
  const formDataTemp = formUtils.cleanValidateData(formData);
  const newFormData = formDataTemp;
  const { isUpdateSubSection } = payload;
  if (isUpdateMultiple && !lodash.isEmpty(formData)) {
    const organization_name = getTreeAllOrganizationName(
      newFormData?.data?.organization_code || [],
      allOrganization
    ).join('/');
    const newRows = (lodash.chain(listPage) as any)
      .get('rows')
      .map((item: any) => ({
        ...item,
        data: lodash.size(newFormData?.data?.organization_code)
          ? { ...item?.data, ...newFormData.data, organization_name }
          : { ...item?.data, ...newFormData.data },
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
