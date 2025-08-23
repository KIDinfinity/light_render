import React from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'dva';
import classNames from 'classnames';
import { EditSectionCodeEnum, TransactionTypeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import { tenant } from '@/components/Tenant';

export const PreferPayout = ({
  isShow,
  dataKey,
  isSetPreferPayout,
  className,
  style,
  transactionId,
}: any) => {
  const dispatch = useDispatch();
  const transactionTypeCode = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.transactionTypeCode
  );
  const submissionChannel = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.submissionChannel
  );
  const disabled =
    !useSectionEditable(EditSectionCodeEnum.PaymentMethod) ||
    ([TransactionTypeEnum.SRV011, TransactionTypeEnum.SRV018, TransactionTypeEnum.SRV015].includes(
      transactionTypeCode
    ) &&
      tenant.isTH() &&
      submissionChannel === 'OMNE');

  const handleSetPreferPayout = (setPreferredPayout) => {
    dispatch({
      type: `${NAMESPACE}/setPreferPayout`,
      payload: { transactionId, dataKey, setPreferredPayout },
    });
  };

  return isShow ? (
    <div className={classNames(styles.preferPayout, className)} style={style}>
      Set as Preferred Payout?
      <Button
        size="small"
        disabled={disabled}
        className={classNames({ [styles.isChosen]: isSetPreferPayout })}
        onClick={() => handleSetPreferPayout('Y')}
      >
        {formatMessageApi({ Dropdown_COM_Indicator: 'Y' })}
      </Button>
      <Button
        size="small"
        disabled={disabled}
        className={classNames({ [styles.isChosen]: !isSetPreferPayout })}
        onClick={() => handleSetPreferPayout('N')}
      >
        {formatMessageApi({ Dropdown_COM_Indicator: 'N' })}
      </Button>
    </div>
  ) : null;
};
