/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import {
  findSubTypeCodeByTransactionTypes,
  findSubTypeCodeByTransactionType,
} from 'process/BPSRV/common/findSubTypeCodeByTransactionType';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { id, changedFields } = payload;

    draftState.entities.transactionTypesMap[id].contactInfo = {
      ...draftState.entities.transactionTypesMap[id].contactInfo,
      ...changedFields,
    };

    if (
      !lodash.some(
        lodash.toPairs(draftState.entities.transactionTypesMap[id].contactInfo),
        ([key, obj]: any) =>
          ['email', 'homeNo', 'phoneNo', 'workNo'].includes(key) && formUtils.queryValue(obj)
      )
    ) {
      draftState.entities.transactionTypesMap[id].contactInfo = null;
    } else {
      draftState.entities.transactionTypesMap[id].contactInfo = {
        ...draftState.entities.transactionTypesMap[id].contactInfo,
        subTypeCode: tenant.region({
          [Region.ID]: () => {
            return findSubTypeCodeByTransactionTypes([
              lodash.some(
                lodash.toPairs(draftState.entities.transactionTypesMap[id].contactInfo),
                ([key, obj]: any) =>
                  ['homeNo', 'phoneNo', 'workNo'].includes(key) && formUtils.queryValue(obj)
              )
                ? [draftState.transactionTypeCodeMap, 'SRV001', /changeofphoneno/gi, 'SRV_SUB002']
                : undefined,
              formUtils.queryValue(draftState.entities.transactionTypesMap[id].contactInfo.email)
                ?.length > 0
                ? [draftState.transactionTypeCodeMap, 'SRV001', /changeofemail/gi, 'SRV_SUB004']
                : undefined,
            ]);
          },
          notMatch: findSubTypeCodeByTransactionType(
            draftState.transactionTypeCodeMap,
            'SRV001',
            /contactchange/gi,
            'SRV_SUB002'
          ),
        }),
        policyId: draftState.processData.mainPolicyId,
        sourceSystem: draftState.processData.sourceSystem,
      };
    }
  });
