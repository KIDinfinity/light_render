import { Button } from 'antd';
import styles from './index.less';
import { useDispatch, useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ButtonType from '../ButtonType';

const TopButton = () => {
  const dispatch = useDispatch();
  const taskNotEditable = useSelector((state: any) => state.claimEditable.taskNotEditable);
  const onAddDocumentClick = () => {
    dispatch({ type: 'batchDocumentScanningController/addClaimProcessData' });
  };
  return (
    <div className={styles.topButton}>
      <ButtonType />
      {!taskNotEditable && (
        <Button onClick={onAddDocumentClick}>
          {formatMessageApi({ Label_BPM_Button: 'Adddocument' })}
        </Button>
      )}
    </div>
  );
};

export default TopButton;
