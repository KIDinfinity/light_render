import { useSelector } from 'dva';
import { formUtils, Validator } from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';

interface IProps {
  NAMESPACE: string;
}

export default ({ NAMESPACE }: IProps) => {
  const configs = tenant.region({
    [Region.TH]: () => {
      const submissionDate = useSelector(
        ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.claimProcessData?.submissionDate
      );
      return {
        Rules: {
          VLD_000274: Validator.VLD_000274(formUtils.queryValue(submissionDate)),
        }
      }
    },
    notMatch: {}
  })
  return { Rules: configs.Rules || {}, extraConfig: configs.extraConfig || {} }
}

