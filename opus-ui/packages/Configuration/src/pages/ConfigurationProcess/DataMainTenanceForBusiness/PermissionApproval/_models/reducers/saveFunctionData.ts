import lodash from 'lodash';
import { Operation } from 'configuration/pages/NavigatorConfiguration/Enum';
import { saveVersionList } from 'configuration/common/reducers';
import saveListPage from './saveListPage';

export default (state: any, action: any) => {
  const { functionData, listPage, versionList } = action.payload;
  let newState = state;
  if (!lodash.isEmpty(listPage)) {
    newState = saveListPage(newState, {
      type: 'saveListPage',
      payload: {
        listPage,
      },
    });
  }
  if (!lodash.isEmpty(versionList)) {
    newState = saveVersionList(newState, {
      type: 'saveVersionList',
      payload: {
        versionList,
        transfer: false,
      },
    });
  }
  return {
    ...newState,
    functionData: functionData || {},
    isAdd: functionData?.task?.pageTemplateType === Operation.Add,
    isUpdate: functionData?.task?.pageTemplateType === Operation.Update,
  };
};
