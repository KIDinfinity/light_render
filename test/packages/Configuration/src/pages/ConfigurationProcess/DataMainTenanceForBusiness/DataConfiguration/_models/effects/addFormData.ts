import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import OperationType from 'configuration/pages/ConfigurationCenter/Enum/OperationType';
import { getObjectData } from 'configuration/utils';

export default function* (_: any, { put, select }: any) {
  const { formData, listPage, functionData } = yield select(
    (state: any) => state.dataConfigurationController
  );
  const { currentMenu } = yield select((state: any) => state.configurationController);

  const rows = listPage?.rows || [];
  const formDataTemp: any = getObjectData(
    formUtils.cleanValidateData(formData?.data ? formData.data : formData)
  );
  const newFormData = formDataTemp;

  const errors = yield put.resolve({
    type: 'validateFields',
    payload: {
      forceValidate: true,
    },
  });
  if (errors?.length || lodash.isEmpty(newFormData)) {
    return;
  }
  if (formDataTemp?.cc_key) {
    const duplicateKeys = lodash
      .chain(functionData?.dataFieldList)
      .filter((item: any) => item?.whereCriteria)
      .map((item: any) => item.fieldName)
      .value();

    const updateChangeData = lodash.map(rows, (item) => {
      if (item?.cc_key === formDataTemp?.cc_key) {
        const isDuplicate =
          item?.isDuplicate &&
          lodash.isEqual(lodash.pick(item, duplicateKeys), lodash.pick(newFormData, duplicateKeys));
        const extraData = !isDuplicate
          ? {
              isDuplicate: false,
              duplicateData: null,
              isWarning: false,
              '#operation': OperationType.add,
            }
          : {};
        return {
          ...item,
          ...extraData,
          data: newFormData,
        };
      }
      return item;
    });
    yield put({
      type: 'saveListPage',
      payload: {
        listPage: {
          ...listPage,
          rows: updateChangeData,
        },
      },
    });
  } else {
    yield put({
      type: 'saveListPage',
      payload: {
        listPage: {
          ...listPage,
          rows: [
            {
              data: { ...newFormData, '#operation': OperationType.add },
              sectionCode: currentMenu.sectionCode || 'business_section_medical_provider',
              cc_key: uuidv4(),
            },
            ...rows,
          ],
        },
      },
    });
  }

  yield put({
    type: 'saveFormData',
    payload: {
      formData: {},
    },
  });
  yield put({
    type: 'toggleTableList',
    payload: { showTableList: true },
  });
}
