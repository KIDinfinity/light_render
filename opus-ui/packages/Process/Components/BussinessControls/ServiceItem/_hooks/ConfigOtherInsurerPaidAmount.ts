import { tenant, Region } from '@/components/Tenant';
import { NamespaceType } from 'process/Components/BussinessControls';

interface IProps {
  namespaceType: string;
}

export default ({ namespaceType }: IProps) => {
  const configs = tenant.region({
    [Region.HK]: () => {
      return namespaceType === NamespaceType.DataCapture
        ? {
            extraConfig: {
              placeholder: true,
            },
          }
        : {};
    },

    notMatch: { extraConfig: {} },
  });
  return {
    Rules: {},
    extraConfig: configs.extraConfig || {},
  };
};
