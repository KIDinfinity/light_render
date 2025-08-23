import { useMemo } from 'react';
import lodash from 'lodash';
import getSortModuleArr from 'bpm/pages/Envoy/_utils/getSortModuleArr';
import { isRequired } from '../_validator/checkPendingMemo';
import { EModuleName } from 'bpm/pages/Envoy/enum';

export default ({ displayConfig }) => {
  return useMemo(() => {
    const sortModuleArr = getSortModuleArr(displayConfig);
    const objects = {
      memoCode: {
        visible: true,
        required: isRequired('memoCode'),
        dropDownList: [],
        moduleName: 'memoCode',
      },
      memoDesc: {
        visible: true,
        required: isRequired('memoDesc'),
        dropDownList: [],
        moduleName: 'memoDesc',
      },
      requestedClientRole: {
        visible: displayConfig?.memoClientRole || false,
        required: displayConfig?.memoClientRole || isRequired('requestedClientRole'),
        dropDownList: [],
        moduleName: 'requestedClientRole',
      },
      requestedClientId: {
        visible: displayConfig?.memoClientId || false,
        required: displayConfig?.memoClientId || isRequired('requestedClientId'),
        dropDownList: [],
        moduleName: 'requestedClientId',
      },
      medicalProviderCode: {
        visible: displayConfig?.medicalProvider || false,
        required: displayConfig?.medicalProvider || isRequired('medicalProviderCode'),
        dropDownList: [],
        moduleName: 'medicalProviderCode',
      },
      ...lodash.get(displayConfig, 'pendingMemo.children', {}),
    };
    const allRequired = lodash.find(
      sortModuleArr,
      (module: any) => module.moduleName === EModuleName.PendingMemo
    )?.required;

    return lodash
      .chain(objects)
      .keys()
      .reduce((obj, el) => {
        return {
          ...obj,
          [el]: lodash.has(objects[el], 'required')
            ? objects[el]?.visible && objects[el]?.required
            : objects[el]?.visible && (allRequired || isRequired(el)),
        };
      }, {})
      .value();
  }, [displayConfig]);
};
