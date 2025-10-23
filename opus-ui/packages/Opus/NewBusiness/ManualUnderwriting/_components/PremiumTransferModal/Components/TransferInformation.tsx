import { useSelector, useDispatch } from 'dva';
import { NAMESPACE } from '../../../activity.config';
import React, { useEffect, useRef, useState } from 'react';
import { TransferPaymentStatus } from 'opus/NewBusiness/ManualUnderwriting/_enum';
import lodash from 'lodash';
import TransferItem from './TransferItem';
import styles from './TransferInformation.less';

const TransferInformation = () => {
  const dispatch = useDispatch();

  const [init, setInit] = useState(false);

  const containerRef = useRef<HTMLElement>(null);

  const processData = useSelector(({ [NAMESPACE]: state }: any) => {
    return state?.processData;
  });

  const originalPremiumTransferList =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
      const { processData: process } = modelnamepsace || {};
      const { premiumTransferList = {}, policyList = [] } = process || {};

      if (!lodash.isEmpty(premiumTransferList)) {
        return premiumTransferList;
      }

      // 兼容premium settlement
      if (!lodash.isEmpty(policyList[0]?.premiumTransferList)) {
        return policyList[0]?.premiumTransferList;
      }

      return [];
    }) || [];

  const premiumTransferList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.modalData?.processData?.premiumTransferList
  );

  const list = lodash.orderBy(
    lodash
      .filter(
        premiumTransferList || [],
        ({ status }: any) => status !== TransferPaymentStatus.Cancel
      )
      .map(({ status, ...rest }: any) => ({
        order:
          status === TransferPaymentStatus.Success
            ? 1
            : status === TransferPaymentStatus.Failed
              ? 2
              : 3,
        status,
        ...rest,
      })),
    'order'
  );

  // 默认插入一条
  useEffect(() => {
    if (init) {
      return;
    }

    if (originalPremiumTransferList.length) {
      dispatch({
        type: `${NAMESPACE}/savePremiumTransferList`,
        payload: {
          premiumTransferList: originalPremiumTransferList,
        },
      });
    }

    if (
      (!originalPremiumTransferList.length ||
        originalPremiumTransferList.every(
          (item: any) => item.status === TransferPaymentStatus.Success
        )) &&
      !premiumTransferList?.length
    ) {
      setTimeout(() => {
        dispatch({
          type: `${NAMESPACE}/addPaymentTransferItem`,
          payload: {
            changedFields: { policyId: processData?.policyId },
          },
        });
      });
    }

    setInit(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [premiumTransferList]);

  // 滚动到最下方
  useEffect(() => {
    const ele = containerRef.current;

    if (ele) {
      setTimeout(() => {
        ele.scrollTo({
          top: ele.scrollHeight,
          behavior: 'smooth',
        });
      }, 1000);
    }
  }, []);

  return (
    <div className={styles.transferInformation} ref={containerRef}>
      {lodash.map(list, (listItem: any) => {
        return (
          <div className={styles.item} key={listItem.id}>
            <TransferItem data={listItem} list={list} />
          </div>
        );
      })}
    </div>
  );
};

export default TransferInformation;
