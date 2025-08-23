import { produce } from 'immer';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Status } from '../../Enum';

const saveDetailStatus = (state: any, { payload }: any) => {
  const nextState = produce(state, (draftState: any) => {
    const target = payload?.claimHospitalBillingDetails || [];
    draftState.claimProcessData.invoiceInforData = lodash.map(
      draftState?.claimProcessData?.invoiceInforData,
      (item) => {
        const temp = lodash.find(target, (itarget) => itarget?.id === item?.id);

        const status =
          temp?.status === Status.Error
            ? {
                value: temp?.status,
                errTip: formatMessageApi({ Label_COM_Message: temp.errorMessage }),
              }
            : temp?.status || item?.status;
        return {
          ...item,
          status,
          finalAmount: temp?.finalAmount,
        };
      }
    );
  });
  return { ...nextState };
};

export default saveDetailStatus;
