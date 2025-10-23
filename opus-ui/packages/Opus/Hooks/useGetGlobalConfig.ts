import { tenant } from '@/components/Tenant';
import { getGlobalConfig } from '@/services/miscGlobalConfigControllerService';
import lodash from 'lodash';
import type { GlobalConfigCodeType } from 'opus/Enums';
import type CompanyCode from 'opus/NewBusiness/Enum/CompanyCode';
import { useEffect, useMemo, useState } from 'react';

interface IParams {
  codeType: GlobalConfigCodeType;
  companyCode?: CompanyCode;
}

export default (params: IParams) => {
  const [defaultValue, setDefaultValue] = useState(undefined);

  useEffect(() => {
    getGlobalConfig({
      ...params,
      region: tenant.region(),
    }).then((response) => {
      if (response?.success && response?.resultData) {
        const value = lodash.get(response, 'resultData[0].defaultValue');
        setDefaultValue(value);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return defaultValue;
};
