import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { SourceSystem } from 'process/Enum';

export function VLD_000698(draftState: any, otherProcedureId?: any) {
  if (lodash.isEmpty(draftState)) {
    return '';
  }

  const otherProcedureIdList = otherProcedureId
    ? [otherProcedureId]
    : Object.keys(draftState?.claimEntities?.otherProcedureListMap || {});

  const otherProcedureItem = draftState?.claimEntities?.otherProcedureListMap?.[otherProcedureId];
  if (otherProcedureItem?.procedureType !== 'RT') return '';

  const sourceSystemErrorConfig = {
    [SourceSystem.Klip]: 2,
    [SourceSystem.Lifej]: 4,
  };

  const error = lodash.some(otherProcedureIdList, (id: any) => {
    return lodash
      .chain(draftState?.claimEntities?.otherProcedurePayableListMap)
      .filter((item: any) => item?.otherProcedureId === id)
      .some((item: any) => {
        return (
          lodash.chain(item?.radioDateList).size().value() >
          sourceSystemErrorConfig[
            lodash
              .chain(draftState?.listPolicy)
              .find({ policyNo: item?.policyNo })
              .get('sourceSystem')
              .value() || SourceSystem.Klip
          ]
        );
      })
      .value();
  });

  return error ? [formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000645' })] : '';
}

export default VLD_000698;
