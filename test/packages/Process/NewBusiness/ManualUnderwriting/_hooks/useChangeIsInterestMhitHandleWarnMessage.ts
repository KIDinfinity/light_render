import { formatMessageApi } from '@/utils/dictFormatMessage';
import { handleWarnMessageModal } from '@/utils/commonMessage';
import { formUtils } from 'basic/components/Form';
import BreakDown from 'basic/enum/Breakdown';
import { useCallback } from 'react';

export default () => {
  return useCallback(
    ({
      handleConfirmSubmit,
      isInterestMHITValueChangedClientItem,
      filterCoverageListByExtProductType,
    }) => {
      const isInterestMhit = formUtils.queryValue(
        isInterestMHITValueChangedClientItem?.otherInfo?.isInterestMhit
      );
      handleWarnMessageModal(
        [
          {
            content: formatMessageApi({
              Label_COM_WarningMessage: `${
                isInterestMhit === BreakDown.NO ? 'MSG_001104' : 'MSG_001103'
              }`,
            }),
          },
        ],
        {
          okFn: async () => {
            if (isInterestMhit === BreakDown.NO) {
              filterCoverageListByExtProductType();
            }
            const response = await handleConfirmSubmit();

            return response;
          },
          cancelFn: () => {
            return false;
          },
          hiddenExtraText: true,
        }
      );
    },
    []
  );
};
