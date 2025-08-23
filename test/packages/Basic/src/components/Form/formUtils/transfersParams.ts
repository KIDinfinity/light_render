import { sortRuleDeterminate, isMomentObject } from '@/utils/inqueryUtils';
import { InqueryTypes } from '@/dtos/InqueryTypes';
import moment from 'moment';
import lodash from 'lodash';
import tenant from '@/components/Tenant/tenantObj';
import { Region } from '@/components/Tenant/constants';
import { LS, LSKey } from '@/utils/cache';

/**
 * 转换参数params dateRange time[]
 * to
 * timeFrom:xx
 * timeTo:xx
 */
const transfersParams = (postData: any, configuration: any = {}, queryType: any) => {
  const sortDeterminated = sortRuleDeterminate(
    postData,
    configuration,
    [InqueryTypes.POShistory, InqueryTypes.NBhistory].includes(queryType) ? undefined : queryType
  );
  const { caseCategory } = postData?.params || {};
  const isPHPostQC = caseCategory === 'BP_NB_CTG003' && tenant.region() === Region.PH;
  const isUseDefaultSortNameForPHPostQC =
    isPHPostQC && (!configuration.sortFromTable || !sortDeterminated.sortName);
  if (sortDeterminated.sortName === 'inquiryClaimNo') {
    sortDeterminated.sortName = 'inquiryBusinessNo';
  }
  if (
    sortDeterminated.sortName === 'business_no' &&
    ![InqueryTypes.POShistory, InqueryTypes.NBhistory].includes(queryType)
  ) {
    sortDeterminated.sortName = 'inquiryClaimNo';
  }
  if (!sortDeterminated.sortName) {
    sortDeterminated.sortOrder = 'desc';

    if (queryType === InqueryTypes.POShistory) {
      sortDeterminated.sortName = 'businessNo';
    } else if (queryType === InqueryTypes.User) {
      sortDeterminated.sortName = 'user_id';
      sortDeterminated.sortOrder = 'asc';
    } else {
      sortDeterminated.sortName = 'inquiryBusinessNo';
    }
  }
  if (sortDeterminated.defaultSortName === 'business_no' || !sortDeterminated.defaultSortName) {
    sortDeterminated.defaultSortName =
      queryType === InqueryTypes.POShistory ? 'businessNo' : 'inquiryBusinessNo';
  }
  if (queryType === InqueryTypes.POShistory) {
    sortDeterminated.params.defaultSortName = 'businessNo';
  } else if (queryType === InqueryTypes.NBhistory) {
    sortDeterminated.params.defaultSortName = 'businessNo';
  } else {
    sortDeterminated.params.defaultSortName = 'inquiryBusinessNo';
  }

  if (isUseDefaultSortNameForPHPostQC) {
    sortDeterminated.params.defaultSortOder = 'asc';
    sortDeterminated.sortName = 'vip';
    sortDeterminated.sortOrder = 'desc';
    if (queryType === InqueryTypes.Case) {
      sortDeterminated.params.defaultSortName = 'creationDate';
    }
    if (queryType === InqueryTypes.Task) {
      sortDeterminated.params.defaultSortName = 'startTime';
    }
  }

  const { params } = sortDeterminated;

  const newParams = Object.keys(params).reduce((pre, cur) => {
    const output = { ...pre };
    // 是range并且是数组,转换日期格式
    const el = params[cur];

    if (isMomentObject(el)) {
      if (lodash.isArray(el) && el.length > 0) {
        output[`${cur}From`] = el[0] ? moment(el[0]).format('YYYY/MM/DD') : '';
        output[`${cur}To`] = el[1] ? moment(el[1]).format('YYYY/MM/DD') : '';
      } else {
        output[cur] = el ? moment(el).format('YYYY/MM/DD') : '';
      }
    } else {
      output[cur] = el;
    }

    return output;
  }, {});
  const businessCode = LS.getItem(LSKey.CURRENTUSER)?.businessCode;
  return {
    ...sortDeterminated,
    params: {
      ...newParams,
      regionCode: tenant.region(),
      businessCode,
    },
  };
};

export default transfersParams;
