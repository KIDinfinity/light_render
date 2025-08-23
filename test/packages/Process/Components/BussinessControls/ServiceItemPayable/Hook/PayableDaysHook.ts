import { useSelector } from 'dva';
import { formUtils, Rule } from 'basic/components/Form';
import { Region, tenant } from '@/components/Tenant';
import { eClaimDecision } from 'claim/enum/claimDecision';

export default ({ NAMESPACE, sectionId, form, config, fieldProps }: any) => {
  const editableConditions = Rule(
    config['editable-condition'] || fieldProps['editable-condition'],
    form,
    NAMESPACE
  );

  tenant.region({
    [Region.HK]: () => {
      const payableId = useSelector(
        ({ [NAMESPACE]: modelnamepsace }: any) =>
          modelnamepsace.claimEntities?.serviceItemPayableListMap?.[sectionId]?.payableId
      );
      const claimDecision = useSelector(
        ({ [NAMESPACE]: modelnamepsace }: any) =>
          modelnamepsace.claimEntities?.claimPayableListMap?.[payableId]?.claimDecision
      );
      const noneditable =
        formUtils.queryValue(claimDecision) !== eClaimDecision.deny &&
        formUtils.queryValue(claimDecision) !== eClaimDecision.na;

      return {
        editable: editableConditions && noneditable,
      };
    },
    notMatch: () => ({ editable: editableConditions }),
  });
};
