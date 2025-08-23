import lodash from 'lodash';
import { listAllConfigurablePageInfo } from '@/services/navigatorConfigurablePageControllerService';
import { AdvancedMenuKey, AdvancedInquiryMap } from 'navigator/pages/AdvancedQuery/Enum';
import formTypeMapInitData from '@/utils/formTypeMapInitData';
import { LS, LSKey } from '@/utils/cache';

export default {
  namespace: 'configController',

  state: {
    configuration: {},
  },

  effects: {
    /**
     *  configurations
     *  1.carlist in homePage
     *  2.table field config
     *  3.inquiry field config
     */
    *getConfiguration(_, { put, call, select }) {
      const initData = yield select((state) => state.advancedQueryAllForm?.initData);
      const response = yield call(listAllConfigurablePageInfo);

      if (
        lodash.isPlainObject(response) &&
        response.success &&
        lodash.isArray(response.resultData)
      ) {
        const initParams = {};
        const currentUser = LS.getItem(LSKey.CURRENTUSER);
        const userDepartment = lodash.get(currentUser, 'userDepartment', '');

        const configuration = response.resultData.reduce((pre, cur) => {
          if (lodash.isPlainObject(cur) && lodash.isString(cur.categoryName)) {
            const paramsName = cur.categoryName.replace(/\s+/g, '').toLowerCase();

            if (lodash.isEmpty(initData) && AdvancedMenuKey[paramsName]) {
              const params = cur?.inquiryField
                ?.filter((item) => !lodash.isEmpty(item?.defaultValueList))
                ?.reduce((result, current) => {
                  const paramKey = AdvancedInquiryMap[paramsName]?.[current.fieldName];
                  if (paramKey) {
                    const mappingDefaultValue =
                      current.defaultValueList?.find(
                        (item) => item?.department?.toLowerCase() == userDepartment?.toLowerCase()
                      ) ||
                      current.defaultValueList?.find(
                        (item) => item?.department?.toLowerCase() == 'all'
                      );
                    result[paramKey] = formTypeMapInitData(
                      mappingDefaultValue?.fieldType,
                      mappingDefaultValue?.defaultValue
                    );
                    return result;
                  }
                }, {});

              if (!lodash.isEmpty(params)) {
                initParams[AdvancedMenuKey[paramsName]] = {
                  params,
                };
              }
            }

            return {
              ...pre,
              [paramsName]: {
                inquiryField: cur.inquiryField,
                resultField: cur.resultField,
              },
            };
          }

          return pre;
        }, {});

        if (lodash.isEmpty(initData)) {
          yield put({
            type: 'advancedQueryAllForm/saveInitData',
            payload: {
              data: initParams,
            },
          });
        }

        yield put({
          type: 'saveConfiguration',
          payload: {
            configuration,
          },
        });

        return configuration;
      }

      return {};
    },
  },

  reducers: {
    saveConfiguration(state, action) {
      const { configuration } = action.payload;

      if (lodash.isPlainObject(configuration)) {
        return {
          ...state,
          configuration,
        };
      }

      return state;
    },
  },
};
