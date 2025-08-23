import { produce } from 'immer';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import getByMessageType from 'claim/utils/getByMessageType';
import { MessageType } from 'claim/enum/medicalSearchMessageType';

enum MultiCauseOfIncident {
  has = 'Y',
  no = 'N',
}

const updateCauseOfIncident = (state: any, action: any) => {
  const resultData = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const { causeOfIncident } = draftState;
    if (lodash.isArray(resultData) && !lodash.isEmpty(resultData)) {
      lodash.forEach(resultData, (item) => {
        const { hasMultiCauseOfIncident, incidentId, systemCauseOfIncident } = item;
        if (hasMultiCauseOfIncident === MultiCauseOfIncident.has) {

          const messageType = getByMessageType('MSG_000372', MessageType.Information);
          causeOfIncident[incidentId] = {
            id: incidentId,
            fieldCode: 'systemCauseOfIncident',
            messageType,
            message: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000372' }),
          };
        } else {
          delete causeOfIncident[incidentId];
        }
        const { adjustCauseOfIncident } = draftState.claimEntities.incidentListMap[incidentId];
        draftState.claimEntities.incidentListMap[incidentId] = {
          ...state.claimEntities.incidentListMap[incidentId],
          systemCauseOfIncident,
          causeOfIncident: adjustCauseOfIncident || systemCauseOfIncident,
        };
      });
    }
  });

  return { ...nextState };
};

export default updateCauseOfIncident;
