import { tenant, Region } from '@/components/Tenant';
import { NamespaceType } from 'process/Components/BussinessControls';

interface IProps {
  namespaceType: string;
}

export default ({ namespaceType }: IProps) => {
  const configs = tenant.region({
    [Region.HK]: () => {
      return namespaceType === NamespaceType.DataCapture ? {
        extraConfig: {
          placeholder: true
        }
      } : {}
    },
    [Region.TH]: () => {
      return namespaceType === NamespaceType.DataCapture ? {
        extraConfig: {
          placeholder: true
        }
      } : {}
    },
    notMatch: {}

  })
  return {
    rulesConfig: configs.Rules || {},
    extraConfig: configs.extraConfig || {}
  }

}

