import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import { Button } from 'antd';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';
import { BenefitLevelDecisionEnum } from 'process/GeneralPOS/common/Enum';
import styles from './index.less';
import { isDecision } from 'process/GeneralPOS/common/utils';

export default ({ transactionId }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.AddNewRiders);
  const dispatch = useDispatch();

  const uwCoverageList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.uwPolicy?.uwCoverageList
  );
  const { caseCategory } = useSelector(({ processTask }: any) => processTask?.getTask);

  const handleOpenLoadingModal = () => {
    if (
      lodash.every(
        uwCoverageList,
        (item) =>
          formUtils.queryValue(item?.uwCoverageDecision?.decision) !==
          BenefitLevelDecisionEnum.NonStandard
      )
    ) {
      return handleErrorMessageIgnoreXErrorNotice({
        promptMessages: [
          {
            content:
              'No Non-standard benefit level decision exists, please change at least one of the them to Non-standard.',
          },
        ],
      });
    }

    dispatch({
      type: `${NAMESPACE}/saveCommonAddModal`,
      payload: {
        visible: true,
        type: 'loading',
      },
    });
  };

  const handleOpenExclusionModal = () => {
    if (
      lodash.every(
        uwCoverageList,
        (item) =>
          formUtils.queryValue(item?.uwCoverageDecision?.decision) !==
          BenefitLevelDecisionEnum.NonStandard
      )
    ) {
      return handleErrorMessageIgnoreXErrorNotice({
        promptMessages: [
          {
            content: formatMessageApi({ Label_COM_Message: 'MSG_000795' }),
          },
        ],
      });
    }

    dispatch({
      type: `${NAMESPACE}/saveCommonAddModal`,
      payload: {
        visible: true,
        type: 'exclusion',
      },
    });
  };

  const addDisabled = useMemo(
    () =>
      lodash
        .chain(uwCoverageList)
        .filter(
          (item: any) =>
            formUtils.queryValue(item.uwCoverageDecision?.decision) ===
              BenefitLevelDecisionEnum.NonStandard && item?.newAddFlag === 'Y'
        )
        .isEmpty()
        .value(),
    [uwCoverageList]
  );

  return (
    <div className={styles.buttonList}>
      {editable && isDecision({ caseCategory }) && (
        <div>
          {/* <Button onClick={handleInitialVersion} loading={initialLoading}>
            {formatMessageApi({
              Label_BIZ_policy: 'initialVersion',
            })}
          </Button> */}
          <Button onClick={handleOpenLoadingModal} disabled={addDisabled}>
            {formatMessageApi({
              Label_BPM_Button: 'AddLoading',
            })}
          </Button>
          <Button onClick={handleOpenExclusionModal} disabled={addDisabled}>
            {formatMessageApi({
              Label_BPM_Button: 'Add Exclusion',
            })}
          </Button>
        </div>
      )}
    </div>
  );
};
