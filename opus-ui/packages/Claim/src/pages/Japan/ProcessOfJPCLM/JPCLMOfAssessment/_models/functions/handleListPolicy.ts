import { compact, chain, isPlainObject } from 'lodash';
import { PolicySetupStatus } from 'claim/pages/Japan/ProcessOfJPCLM/utils/constant';

export default function handleListPolicy(listPolicy: any[] = []) {
  if (compact(listPolicy).length < 1) return listPolicy;
  return chain(listPolicy)
    .map((item: any) => {
      if (
        isPlainObject(item) &&
        !item.productName &&
        item.policySetupStatus === PolicySetupStatus.NoImplement
      ) {
        item.productName = item.coreProductCode;
      }
      return item;
    })
    .compact()
    .value();
}
