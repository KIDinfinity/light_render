import { Button, Icon } from 'antd';
import { formUtils } from 'basic/components/Form';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import { useState } from 'react';
import styles from './index.less';

interface IProps {
  children: any;
  clientIndex: number;
  clientSeq: string;
  transactionId: string;
}

const CheckDuplicateButton = ({ transactionId, clientSeq, clientIndex }: IProps) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const editable = useSectionEditable(EditSectionCodeEnum.CommonNominee);
  const forms: Object[] = useSelector(
    ({ formCommonController }: any) => formCommonController.forms
  );
  const needDuplicateCheckList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.needDuplicateCheckList
  );
  const dedupCheckHandle = async () => {
    setLoading(true);
    await dispatch({
      type: 'formCommonController/handleValidating',
    });
    const errors = await formUtils.validateFormsAndGetErrors({
      forms: lodash.values(
        Object.fromEntries(Object.entries(forms).filter(([key]) => new RegExp(clientSeq).test(key)))
      ),
      force: true,
    });
    await dispatch({
      type: 'formCommonController/handleUnValidating',
    });
    if (!lodash.isEmpty(errors)) {
      setLoading(false);
      return;
    }
    await dispatch({
      type: `${NAMESPACE}/dedupCheckIdentify`,
      payload: {
        transactionId,
        clientSeq,
      },
    });
    setLoading(false);
  };
  return (
    <Button
      onClick={dedupCheckHandle}
      className={styles.addBtn}
      disabled={!editable}
      loading={loading}
    >
      Check Duplicate
      {needDuplicateCheckList?.includes(clientSeq) && (
        <Icon className={styles.icon} type="info-circle" theme="filled" />
      )}
    </Button>
  );
};

CheckDuplicateButton.displayName = 'customerExtra';

export default CheckDuplicateButton;
