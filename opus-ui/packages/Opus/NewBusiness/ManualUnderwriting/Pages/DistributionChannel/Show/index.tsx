import React from 'react';
import lodash from 'lodash';
import ConfigurableReadOnlySection from 'basic/components/ConfigurableReadOnlySection';
import styles from '../index.less';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { RuleByData } from 'basic/components/Form/Rule';
import { tenant, Region } from '@/components/Tenant';
import useUpdateBankStaffList from '../_hooks/useUpdateBankStaffList';

interface IDistributionChannelShowProps {
  distributionChannelList: {
    dictName: string;
    dictCode: string;
    campaignCode: string;
    crossSelling: string;
  }[];
  sectionConfig: any[];
  extraConfig: {
    bankNo: any[];
    servicingBranch: any[];
  };
}
const calculateVisibleConditionConfig = (sectionConfig: any, data: any) => {
  const newConfig = sectionConfig?.map((config: any) => {
    const filedProps = { ...config['field-props'] };
    let visible = filedProps?.visible;

    const visibleCondition = filedProps?.['visible-condition'];
    if (visible === 'C') {
      visible = RuleByData(visibleCondition, data) ? 'Y' : 'N';
    }
    filedProps.visible = visible;
    if (config.field === 'bankStaffNo' && tenant.region() === Region.ID) {
      config.fieldType = 'Dropdown';
    }
    return { ...config, ['field-props']: filedProps };
  });
  return newConfig;
};

export default ({
  distributionChannelList,
  extraConfig,
  sectionConfig,
}: IDistributionChannelShowProps) => {
  useUpdateBankStaffList();

  return (
    <div className={styles.card}>
      {distributionChannelList
        .filter((d: any) => !lodash.isEmpty(d))
        .map((item: any) => {
          const config = calculateVisibleConditionConfig(sectionConfig, item);
          return (
            <div className={styles.cardItem} key={item.id}>
              <ConfigurableReadOnlySection
                config={config}
                data={item}
                extraConfig={extraConfig}
                multipleDropdown={['crossSelling']}
                NAMESPACE={NAMESPACE}
              />
            </div>
          );
        })}
    </div>
  );
};
