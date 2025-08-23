import { useContext, useMemo } from 'react';
import Context from 'summary/Context';
import lodash from 'lodash';
import CustomerRole from 'enum/CustomerRole';

export default ({ clientId }: any) => {
  const { state } = useContext(Context);

  return useMemo(() => {
    const client360 = lodash
      .chain(state)
      .get('summaryCoverage.sideBarOverallList')
      .find((item: any) => lodash.get(item, 'keyClientId') === clientId)
      .value();
    const tsarCategoryData = lodash
      .chain(client360)
      .get('summaryCoverage.tsarCategoryData', [])
      .groupBy('roleInd')
      .value();
    const maxPerLifeData = lodash
      .chain(client360)
      .get('summaryCoverage.maxPerLifeData', [])
      .groupBy('roleInd')
      .value();
    const summary = lodash.chain(client360).get('summaryCoverage.summary', []).value();
    const roles = [CustomerRole.Insured, CustomerRole.PolicyOwner];

    const result = lodash.map(roles, (role: any) => {
      return {
        role,
        tsarCategoryData: lodash.get(tsarCategoryData, role),
        maxPerLifeData: lodash.get(maxPerLifeData, role),
        summary: lodash.find(summary, (item: any) => item.roleInd === role),
      };
    });

    return result;
  }, [state, clientId]);
};
