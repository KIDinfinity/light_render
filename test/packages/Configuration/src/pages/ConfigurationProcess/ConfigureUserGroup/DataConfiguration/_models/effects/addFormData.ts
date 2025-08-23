import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import OperationType from 'configuration/pages/ConfigurationCenter/Enum/OperationType';
import { getObjectData } from 'configuration/utils';

export default function* (_: any, { put, select }: any) {
  const { formData, listPage, functionData } = yield select(
    (state: any) => state.configureUserGroupController
  );

  const rows = listPage?.rows || [];
  const formDataTemp: any = getObjectData(formUtils.cleanValidateData(formData));
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
  const rowExtraData = { sectionCode: 'user_group_section_rbac_group', sectionName: 'User Group' };
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
            }
          : {};
        const extraFormData = !isDuplicate
          ? {
              ...newFormData,
              data: { ...newFormData.data, '#operation': OperationType.add },
            }
          : newFormData;
        return {
          ...item,
          ...extraFormData,
          ...extraData,
          ...rowExtraData,
        };
      }
      return { ...item, ...rowExtraData };
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
    const extraId = newFormData.data.organization_code
      ? { id: uuidv4(), usr_org_id: uuidv4() }
      : { id: uuidv4() };
    yield put({
      type: 'saveListPage',
      payload: {
        listPage: {
          ...listPage,
          rows: [
            {
              ...newFormData,
              data: {
                ...newFormData.data,
                '#operation': OperationType.add,
                ...extraId,
              },
              subSection: lodash.map(newFormData.subSection, (sectionItem) => {
                return { ...sectionItem, data: { ...sectionItem?.data, id: uuidv4() } };
              }),
              cc_key: uuidv4(),
              ...rowExtraData,
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
}
