import { RuleByData } from 'basic/components/Form/Rule';
import { tenant, Region } from '@/components/Tenant';

const calculateVisibleConditionConfig = (sectionConfig: any[], data: any) => {
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

export default calculateVisibleConditionConfig;
