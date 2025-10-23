import React from 'react';
import { useSelector, useDispatch } from 'dva';
import BankInfoSelector from './BankSection/BankInfoSelector';
import useLoadFactoringHouseCallback from 'opus/NewBusiness/PremiumSettlement/_hooks/useLoadFactoringHouseCallback';
// import bpmApi from 'bpm/pages/OWBEntrance/API/api';
import { Button } from 'opus/Components/Antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'opus/NewBusiness/PremiumSettlement/activity.config';

import styles from './index.less';

export default () => {
  // const withdrawBankInfo = useGetWithdrawTypeBankInfo();
  // const inputType = useGetBankInputType();
  const dispatch = useDispatch();
  const taskNotEditable = useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  // const bankInfoList = useSelector(
  //   ({ [NAMESPACE]: modelnamepsace }: any) =>
  //     modelnamepsace?.businessData?.policyList?.[0]?.bankInfoList,
  //   shallowEqual
  // );
  const refreshBankListLoading: boolean = useSelector(
    ({ loading }: any) => loading.effects[`${NAMESPACE}/refreshBankList`]
  );
  // const confirmBankLoading: boolean = useSelector(
  //   ({ loading }: any) => loading.effects[`${NAMESPACE}/confirmRefund`]
  // );
  // const needConfirmBank =
  //   useSelector(({ [NAMESPACE]: modelnamepsace }: any) =>
  //     lodash.get(modelnamepsace.businessData, 'needConfirmBank')
  //   ) === 'Y';

  // const isSeletedBank = bankInfoList.find((i) => i.selection == 'Y');

  const handleLoadFactoringHouse = useLoadFactoringHouseCallback();
  React.useEffect(() => {
    handleLoadFactoringHouse({
      paymentMethod: 'BTR',
    });
    dispatch({
      type: `${NAMESPACE}/refreshBankList`,
    });
  }, []);

  return (
    <>
      <BankInfoSelector />
      <div className={styles.actions}>
        <Button
          disabled={taskNotEditable}
          loading={refreshBankListLoading}
          icon="sync"
          onClick={() => {
            dispatch({
              type: `${NAMESPACE}/refreshBankList`,
            });
          }}
          className={styles.refresh}
        >
          {formatMessageApi({ Label_BPM_Button: 'Refresh' })}
        </Button>

        {/* <Button
            disabled={taskNotEditable || !isSeletedBank}
            loading={confirmBankLoading}
            type="primary"
            className={styles.confirm}
            onClick={async () => {
              const taskId = await dispatch({
                type: `${NAMESPACE}/confirmRefund`,
              });

              if (taskId) {
                bpmApi.reload(taskId);
              }
            }}
          >
            {formatMessageApi({ Label_BPM_Button: 'Confirm' })}
          </Button> */}
      </div>
    </>
  );
};
