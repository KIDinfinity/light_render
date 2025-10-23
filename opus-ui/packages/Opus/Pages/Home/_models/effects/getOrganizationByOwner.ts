import { tenant } from '@/components/Tenant';
import { findOrganizationByOwnerId } from '@/services/userCenterOrganizationControllerService';
import { BusinessCode } from 'claim/enum/BusinessCode';
import lodash from 'lodash';

export default function* (_: any, { select, call, put }: any): Generator<any, any, any> {
  const userId = yield select(({ user }: any) => user?.currentUser?.userId) || {};

  const response = yield call(findOrganizationByOwnerId, { owner: userId });

  if (
    lodash.isPlainObject(response) &&
    !!response?.success &&
    lodash.isArray(response?.resultData)
  ) {
    let organizationList = response?.resultData || [];
    if(tenant.isTH()) {
      organizationList = organizationList.filter(item => item.organizationCode.includes('ORG_TH_NB'))
    }
    yield put({
      type: 'saveOrganizationList',
      payload: {
        organizationList,
      },
    });

    const { organizationCode = '' } =
      lodash
        .chain(organizationList)
        .orderBy('priority')
        .find((_: any, idx) => idx === 0)
        .value() || {};

    yield put({
      type: 'saveOrganizationCode',
      payload: {
        organizationCode,
      },
    });

    yield put({
      type: 'getTeamSummary',
    });

    yield put({
      type: 'saveBusinessCode',
      payload: {
        businessCode: tenant.isTH()
          ? BusinessCode.nb
          : tenant.isJP()
          ? BusinessCode.claim
          : undefined,
      },
    });
  }
  return response;
}
