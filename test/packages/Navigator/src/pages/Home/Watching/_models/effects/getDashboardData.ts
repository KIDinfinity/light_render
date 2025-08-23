import lodash from 'lodash';
import { centerRequest } from '@/services/monitorCenterControllerService';

export default function* getStatusFilterList({ payload }: any, { put, call }: any) {

  const params = {
    "regionCode": null,
    "apiCode": null,
    "requestData": {
      "orderConditions": [],
      "whereConditions": [],
      "page": {
        "currentPage": 1,
        "pageSize": 1000,
        "firstResult": 0,
        "offset": 0,
        "params": {},
        "rows": [],
        "sortName": "",
        "sortOrder": "",
        "startPage": 0,
        "total": 0,
        "totalPage": 0
      },
      "reportCode": "BS_Opus_Monitor_00001"
    },
    "asyncCall": null,
    "asyncQuery": {
        "url": null,
        "asyncTraceId": null
    },
    "monitorItemCode": null,
    "groupCode":"dashboard_submission_summary",
    "realTime": false
  }

  const response = yield call(centerRequest, params)
  if(
    lodash.isPlainObject(response) &&
    response?.success &&
    !lodash.isEmpty(response.responseData)
  ) {
    const data = JSON.parse(response.responseData.resultData)
    for(const key in data) {
      const sectionData = data[key];

      const dataGroupedByRegion = lodash.chain(sectionData)
        .groupBy('regionCode')
        .map((statusArray, region) => {
          const regionData = {
            region,
            pending: 0,
            todo: 0,
            completed: 0
          };
          statusArray.map(({caseStatus, caseCount}) => {
            regionData[caseStatus] = Number(caseCount);
          })
          return regionData;
        })
        .value()
      data[key] = dataGroupedByRegion
    }

    yield put({
      type: 'saveDashboardData',
      payload: {
        datas: data,
      },
    });
  }
}
