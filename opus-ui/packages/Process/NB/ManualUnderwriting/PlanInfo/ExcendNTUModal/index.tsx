import React, { useState } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import moment from 'moment';
import { DatePicker } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import CommonResizeModal from 'basic/components/CommonResizeModal';
import { formUtils } from 'basic/components/Form';
import useGetCurrentNtuDate from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentNtuDate';
import { NAMESPACE } from '../../activity.config';
import ExtendRadioGroup from './ExtendRadioGroup';
import Remindertype from './Remindertype';
import styles from './index.less';

const ExcenNtuModal = () => {
  const dispatch = useDispatch();
  const isShowNtuModal = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isShowNtuModal
  );
  const ntuDate =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.businessData?.policyList?.[0]?.ntuDate
    ) || null;

  const extendtoDate = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.ntuDataObject?.extendtoDate
  );
  const extendtoDays = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.ntuDataObject?.extendtoDays
  );
  const currentRadio = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.ntuDataObject?.currentRadio
  );

  const [ntuForm, setNtuForm] = useState('');
  const editable = true;
  const onConfirm = async () => {
    const errors = await formUtils.validateFormsAndGetErrors({
      forms: [ntuForm],
      force: true,
    });
    if (errors?.length > 0) {
      return;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const newCurrentDate = useGetCurrentNtuDate({ extendtoDate, extendtoDays, currentRadio });
    await dispatch({
      type: `${NAMESPACE}/updateManualExtendNTU`,
      payload: {
        manualExtendNtu: true,
      },
    });
    await dispatch({
      type: `${NAMESPACE}/updateNtuJob`,
      payload: {
        currentNtuDate: newCurrentDate,
      },
    });
  };

  const onClose = async () => {
    await dispatch({
      type: `${NAMESPACE}/saveShowNtuModal`,
      payload: {
        isShowNtuModal: false,
      },
    });
  };

  return (
    <CommonResizeModal
      confirmAuth={editable}
      visible={isShowNtuModal}
      onReturn={onClose}
      onCancel={onClose}
      onConfirm={onConfirm}
      returnAuth
      width={500}
      height={250}
    >
      <div className={styles.wrap}>
        <div className={styles.ntuinfo}>
          <span className={styles.name}>
            {formatMessageApi({
              Label_BIZ_Policy: 'CurrentNTUDate',
            })}{' '}
            :
          </span>
          <span className={styles.value}>
            {lodash.isEmpty(ntuDate) ? (
              <DatePicker format="L" allowClear={false} disabled placeholder="" />
            ) : (
              moment(ntuDate).format('L LT')
            )}
          </span>
          <div className={styles.remindertype}>
            <Remindertype />
          </div>
        </div>
        <div className={styles.dateWrap}>
          <ExtendRadioGroup setNtuForm={setNtuForm} />
        </div>
      </div>
    </CommonResizeModal>
  );
};

export default ExcenNtuModal;
