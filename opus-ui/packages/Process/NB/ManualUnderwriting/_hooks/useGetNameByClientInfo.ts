import { useMemo } from 'react';
import useJudgeIsTargetRelationOfInsured from 'process/NB/ManualUnderwriting/_hooks/useJudgeIsTargetRelationOfInsured';
import useGetClientNameByConfigCallback from 'process/NB/ManualUnderwriting/_hooks/useGetClientNameByConfigCallback';
import { formUtils } from 'basic/components/Form';
import useGetIsCustomerIndividual from 'process/NB/hooks/useGetIsCustomerIndividual';

export default ({ clientInfo }: any) => {
  const isTargetRelationOfInsured = useJudgeIsTargetRelationOfInsured({ id: clientInfo?.id });
  const handlerGetClientName = useGetClientNameByConfigCallback({
    isDefault: true,
  });
  const clientName = handlerGetClientName({ clientInfo, isDefault: true });
  return useMemo(() => {
    if (isTargetRelationOfInsured) {
      return formUtils.queryValue(clientInfo?.customerEnSurname);
    }
    if (!useGetIsCustomerIndividual(clientInfo)) {
      return formUtils.queryValue(clientInfo?.customerEnSurname);
    }
    return clientName;
  }, [clientInfo, clientName, isTargetRelationOfInsured]);
};
