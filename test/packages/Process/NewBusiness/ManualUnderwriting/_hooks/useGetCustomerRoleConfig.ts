import { useMemo } from 'react';
import lodash from 'lodash';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';


/* CustomerRole配置 */
// section "CustomerRole-Field" 专门用来放role相关配置
const localSectionConfig = {
  section: 'CustomerRole-Field',
  'section-props': {
    label: {
      dictTypeCode: '',
      dictCode: '',
    },
    visible: 'N',
  },
};

//any localFieldConfigs changes, use localFieldConfigsMock instead of []

//for local config
// const localFieldConfigs = localFieldConfigsMock;

//for remote config
const localFieldConfigs: any[] = [];

const CUSTOMER_ROLE_SECTION = 'CustomerRole-Field';
const LOCAL_CONFIG = {
  configs: [localSectionConfig, ...localFieldConfigs],
  remote: true,
};

export default () => {
  const config = useGetSectionAtomConfig({
    section: CUSTOMER_ROLE_SECTION,
    localConfig: LOCAL_CONFIG,
  });

  return useMemo(() => {
    return lodash.sortBy(config, ['field']);
  }, [config]);
};
