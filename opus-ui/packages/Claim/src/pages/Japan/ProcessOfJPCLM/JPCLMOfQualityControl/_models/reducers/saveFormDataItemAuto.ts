import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import deleteFormDataItem from './deleteFormDataItem';
import saveFormDataItem from './saveFormDataItem';
import addFormDataItem from './addFormDataItem';

export default (state: any, action: any) => {
  const { documentId, keyName, id, changedFields } = action.payload;
  const targetKey = lodash.keys(changedFields)[0];
  const target = changedFields[targetKey];
  const targetValue = formUtils.queryValue(target);

  if (targetValue || target.errors) {
    state = saveFormDataItem(state, {
      type: 'saveFormDataItem',
      payload: {
        documentId,
        keyName,
        id,
        changedFields,
      },
    });
  }
  const values = lodash.get(
    state,
    `claimProcessData.claimEntities.bpoFormDataList.${documentId}.formData.${keyName}`,
    []
  );
  const hasNil = lodash.find(values, (el) => lodash.isEmpty(formUtils.queryValue(el[targetKey])));

  if (!targetValue && hasNil && hasNil.id !== id) {
    state = deleteFormDataItem(state, {
      type: 'deleteFormDataItem',
      payload: {
        documentId,
        keyName,
        id,
      },
    });
  }

  if (!hasNil) {
    state = addFormDataItem(state, {
      type: 'addFormDataItem',
      payload: { documentId, keyName },
    });
  }

  return { ...state };
};
