import lodash from 'lodash';
import { findReportMetadata } from '@/services/owbReportCenterMetadataConfigControllerService';
import {
  transferSearchComponent,
  transferDataField,
} from 'configuration/pages/ConfigurationCenter/Utils/Transfer';
import { getSearchDefault } from 'configuration/pages/ConfigurationCenter/Utils/Search';
import { sortSeq } from 'configuration/pages/ConfigurationCenter/Utils/Common';

export default function* ({ payload }: any, { call, put, select }: any) {
  const { state = {} } = payload;
  const { reportCode, tempReportCode, searchFields: params, fromDashboard = false } = state;

  let newReportMetadata: any = {};

  const { reportMetadata } = yield select((state: any) => ({
    reportMetadata: state?.reportCenterController?.reportMetadata,
  }));
  const reportListMap = yield select((state: any) => ({
    reportMetadata: state?.reportCenterController?.reportListMap,
  }));

  if (!lodash.get(reportMetadata, `${reportCode}`)) {
    const response = yield call(findReportMetadata, { reportCode: tempReportCode || reportCode });
    if (response?.success) {
      const resultData = response?.resultData || {};
      const {
        searchFieldList = [],
        resultFieldList = [],
        miscTypeList = [],
        statisticMetadataList = [],
        dropdownOptions = [],
        templateList = [],
        resultCacheDuration = null,
      } = resultData;
      const newSearchFieldList = transferSearchComponent({
        searchComponentList: lodash.map(searchFieldList, (item) => ({
          ...item,
          whereOperator: item?.whereOperation,
        })),
        description: false,
        dropdownList: [],
      })
        .sort(sortSeq('componentSequence'))
        .map((item) => {
          // dashboard跳转时保留原搜索条件
          if (fromDashboard && !!params[item?.fieldName]) {
            return { ...item, visible: 1 };
          }

          return item;
        });
      const newParams = lodash
        .chain(params)
        .keys()
        .reduce((object, key) => {
          const cur = lodash.find(newSearchFieldList, (item) => item.fieldName === key);
          if (lodash.isNil(params[key]) || params[key] === '') {
            return object;
          }
          if (cur && new RegExp(/multi_drop_down/).test(cur?.componentType)) {
            return { ...object, [key]: lodash.isArray(params[key]) ? params[key] : [params[key]] };
          }
          return { ...object, [key]: params[key] };
        }, {})
        .value();

      const newSearchDefault = params
        ? { pagination: {}, params: { ...(newParams || {}) }, sortOrders: '' }
        : getSearchDefault({ searchComponentList: newSearchFieldList });

      newReportMetadata = {
        ...reportMetadata,
        [reportCode]: {
          resultCacheDuration,
          templateList,
          searchFieldList: newSearchFieldList,
          columnFieldList: transferDataField({
            dataFieldList: resultFieldList,
            isDataImageVisible: false,
            dropdownList: [],
            description: false,
          }).sort(sortSeq('fieldSequence')),
          statisticMetadataList,
          dictionary: lodash.reduce(
            miscTypeList,
            (result, item) => {
              const temp = result;
              temp[item?.fieldName] = item?.miscType;
              return temp;
            },
            {}
          ),
        },
      };
      yield put({
        type: 'saveReportList',
        payload: {
          ...reportListMap?.reportMetadata,
          [reportCode]: {
            ...reportListMap?.reportMetadata?.[reportCode],
            dropdownOptions,
            templateList,
          },
        },
      });
      yield put({
        type: 'saveReportMetadata',
        payload: {
          reportMetadata: newReportMetadata,
        },
      });
      yield put({
        type: 'listAllSearchFieldValues',
        payload: {
          reportCode,
        },
      });
      yield put({
        type: 'saveSearchDefault',
        payload: {
          searchDefault: {
            ...newSearchDefault,
          },
          reportCode,
        },
      });
    }
  }

  const target =
    newReportMetadata && !lodash.isEmpty(newReportMetadata) ? newReportMetadata : reportMetadata;
  yield put({
    type: 'saveCollapse',
    payload: {
      collapseState:
        lodash.chain(target).get(`${reportCode}.statisticMetadataList`, []).size().value() > 0,
    },
  });

  const { searchDefault } = yield select((state: any) => ({
    searchDefault: state?.reportCenterController?.searchDefault,
  }));
}
