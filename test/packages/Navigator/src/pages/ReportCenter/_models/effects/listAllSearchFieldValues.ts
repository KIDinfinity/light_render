import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
const dropdownDatas=(field,options)=>{
  return {...field,dropdownDatas:
    (lodash.chain(options) as any)
      .find((item)=>item?.fieldName===field?.fieldName)
      .get('values')
      .map((el: any) => {
        const typeCode = lodash.find(options,(item)=>item?.fieldName===field?.fieldName)?.miscType;
        return {
          key: el,
          value: formatMessageApi({
            [typeCode]: el,
          }),
        };
      })
      .value() || [],}
}
const transfer=(searchFieldList,dropdownOptions)=>{
  return lodash.chain(searchFieldList).map(field=>dropdownDatas(field,dropdownOptions)).value();
}

export default function* ({ payload }: any, { call, put, select }: any) {
  const { reportCode } = payload;
  const searchFieldList = yield select(
    (state: any) => state.reportCenterController.reportMetadata?.[reportCode]?.searchFieldList,
  );
  const dropdownOptions = yield select(
    (state: any) => state.reportCenterController.reportListMap?.[reportCode]?.dropdownOptions
  );
  const newSearchField=transfer(searchFieldList,dropdownOptions);
    yield put({
      type: 'saveSearchFieldList',
      payload: {
        reportCode,
        searchFieldList: newSearchField,
      },
    });
  }
