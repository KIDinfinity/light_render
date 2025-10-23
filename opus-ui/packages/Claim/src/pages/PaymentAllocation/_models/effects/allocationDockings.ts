import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* allocationDockings({ payload }: any, { put, select }: any) {
  const { claimData } = payload;
  // 若c360数据不存在，则通过接口获取
  if (lodash.isEmpty(claimData.c360BeneficiaryInfo)) {
    //@ts-ignore
    const c360BeneficiaryInfo = yield put.resolve({
      type: 'getC360BeneficiaryInfo',
      payload: {
        claimData,
      },
    });
    lodash.set(claimData, 'c360BeneficiaryInfo', c360BeneficiaryInfo);
  }

  //@ts-ignore
  const result = yield put.resolve({
    type: 'reAllocations',
    payload: {
      claimData,
    },
  });

  const { output } = result;
  const outputClean: any = formUtils.formatFlattenValue(
    formUtils.cleanValidateData({
      payeeList: output?.payeeList,
      policyBenefitList: output?.policyBenefitList,
    })
  );

  lodash.set(output, 'callV2', output?.callV2);

  lodash.set(output, 'payeeList', outputClean?.payeeList);
  lodash.set(output, 'policyBenefitList', outputClean?.policyBenefitList);

  lodash.set(result, 'output', output);

  return result;
}
