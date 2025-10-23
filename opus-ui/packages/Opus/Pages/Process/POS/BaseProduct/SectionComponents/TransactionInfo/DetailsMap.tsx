import { formatMessageApi } from '@/utils/dictFormatMessage';
import classNames from 'classnames';
import { TransactionTypeEnum } from 'process/GeneralPOS/common/Enum';
import { ChangePayment } from '../index';
import React, { useMemo } from 'react';
import styles from './index.less';
import Item from './Item';
import { useSelector } from 'dva';

export default function DetailsMap({ transactionTypeCode, transactionId, isNotDataCapture }: any) {
  const validating = useSelector((state: any) => state?.formCommonController?.validating);
  const render = useMemo(() => {
    // 添加新的transactionTypeCode需补充audit.config !!!!!!
    const tranMap = {
      SRV002: {
        main: (
          <>
            <ChangePayment
              transactionId={transactionId}
              transactionTypeCode={transactionTypeCode}
              isNotDataCapture={isNotDataCapture}
            />
          </>
        ),
      },
    };
    return (
      <div className={classNames(styles.wrapper)}>
        <div className={classNames(styles.transactionTypeSection, transactionTypeCode)}>
          <Item transactionId={transactionId} validating={validating} />
          {isNotDataCapture && (
            <div className={styles.sectionTitle}>
              {formatMessageApi({
                Label_BIZ_POS: 'TransactionDetails',
              })}
            </div>
          )}
          {tranMap?.[transactionTypeCode]?.main || <></>}
        </div>
        {tranMap?.[transactionTypeCode]?.ex || <></>}
      </div>
    );
  }, [transactionId, transactionTypeCode, isNotDataCapture, validating]);
  return render;
}
