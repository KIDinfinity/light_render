import { produce }  from 'immer';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { serviceItemCode } from 'claim/pages/utils/isServiceItemRequired';
import lodash from 'lodash';

const setServiceItemUnitError = (state: any, action: any) => {
  const { isServiceItemUnitError, serviceItemListMap } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const draft = draftState;
    const newClaimEntities = draftState.claimEntities;
    const unitValue = newClaimEntities?.serviceItemListMap?.unit;
    if (isServiceItemUnitError) {
      lodash.map(serviceItemListMap, (serviceItemList, serviceItemId) => {
        const { unit, serviceItem } = serviceItemList;
        if (
          lodash.isEmpty(formUtils.queryValue(unit)) &&
          lodash.includes(serviceItemCode, formUtils.queryValue(serviceItem))
        ) {
          newClaimEntities.serviceItemListMap[serviceItemId].unit = {
            ...(newClaimEntities?.serviceItemListMap[serviceItemId]?.unit || ''),
            value: formUtils.queryValue(newClaimEntities?.serviceItemListMap[serviceItemId]?.unit),
            errors: [
              {
                message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' }),
                field: 'unit',
              },
            ],
          };
        }
      });
    }
    draft.claimEntities = newClaimEntities;
  });

  return { ...nextState };
};

export default setServiceItemUnitError;
