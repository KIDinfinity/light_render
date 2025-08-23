import React, { useState } from 'react';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import PremiumType from 'process/NB/PremiumSettlement/Enum/premiumType';
import useGetPremiumType from 'process/NB/PremiumSettlement/_hooks/useGetPremiumType';
import PremiumRefund from './PremiumRefund';
import PremiumCollection from './PremiumCollection';
import styles from './index.less';

const Premium = () => {
  const premiumType = useGetPremiumType();
  const [isShowPremiumType, setIsShowPremiumType] = useState(premiumType);
  const wraperRef = React.useRef<HTMLDivElement | null>(null);

  const ownPremiumType = isShowPremiumType || premiumType;

  return (
    <div className={styles.wrap}>
      <div className={styles.process} ref={wraperRef}>
        <div className={styles.tabs}>
          <div
            className={classnames(styles.tab, {
              [styles.selectTab]: ownPremiumType === PremiumType.PremiumCollection,
              [styles.notSelectTab]: ownPremiumType !== PremiumType.PremiumCollection,
            })}
            onClick={() => setIsShowPremiumType(PremiumType.PremiumCollection)}
          >
            {formatMessageApi({
              Dropdown_POL_PremiumSettlementType: 'Collect',
            })}
          </div>
          <div
            className={classnames(styles.expand, {
              [styles.collectionExpand]: ownPremiumType === PremiumType.PremiumCollection,
              [styles.refundExpand]: ownPremiumType === PremiumType.PremiumRefund,
            })}
          />
          <div
            className={classnames(styles.tab, {
              [styles.selectTab]: ownPremiumType === PremiumType.PremiumRefund,
              [styles.notSelectTab]: ownPremiumType !== PremiumType.PremiumRefund,
            })}
            onClick={() => setIsShowPremiumType(PremiumType.PremiumRefund)}
          >
            {formatMessageApi({
              Dropdown_POL_PremiumSettlementType: 'Refund',
            })}
          </div>
        </div>
        <div className={styles.con}>
          {ownPremiumType === PremiumType.PremiumCollection ? (
            <PremiumCollection />
          ) : (
            <PremiumRefund />
          )}
        </div>
      </div>
    </div>
  );
};
Premium.displayName = 'Premium';
export default Premium;
