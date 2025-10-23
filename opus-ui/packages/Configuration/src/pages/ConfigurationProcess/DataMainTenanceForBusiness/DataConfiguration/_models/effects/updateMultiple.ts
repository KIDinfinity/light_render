import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* (_: any, { put, select }: any) {
  const { isUpdateMultiple, formData, listPage, functionData } = yield select((state: any) => ({
    isUpdateMultiple: state.dataConfigurationController.isUpdateMultiple,
    formData: state.dataConfigurationController.formData,
    listPage: state.dataConfigurationController.listPage,
    functionData: state.dataConfigurationController.functionData,
  }));
  const formDataTemp = formUtils.cleanValidateData(formData?.data ? formData.data : formData);
  const newFormData = formDataTemp;

  if (isUpdateMultiple && !lodash.isEmpty(formData)) {
    const newRows = (lodash.chain(listPage) as any)
      .get('rows')
      .map((item: any) => ({
        ...item,
        data: {
          ...item?.data,
          ...newFormData,
        },
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
