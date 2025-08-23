import React from 'react';
import { Button } from 'antd';
import styles from './index.less';
import { useDispatch } from 'dva';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const VerifyICInfo = ({ ICCode, transactionId, fullName }: any) => {
  const dispatch = useDispatch();
  const editable = useSectionEditable(EditSectionCodeEnum.InvestmentConsultant);

  const handleChange = () => {
    dispatch({
      type: 'GeneralPOSController/getPersonName',
      payload: {
        transactionId,
        fullName,
        ICCode,
      },
    });
  };
  return (
    <Button className={styles.element} onClick={handleChange} disabled={!ICCode || !editable}>
      <span>Verify IC Information</span>
    </Button>
  );
};

VerifyICInfo.displayName = 'verifyICInfo';

export default VerifyICInfo;
