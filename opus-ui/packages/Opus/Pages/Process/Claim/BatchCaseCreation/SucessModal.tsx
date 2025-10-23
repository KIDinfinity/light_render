import React from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'packages/Opus/Pages/Process/Claim/BatchCaseCreation/activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Close from 'opus/Components/Modals/Close';

const SucessModal = () => {
  const dispatch = useDispatch();

  const { visible } = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => ({
      visible: modelnamespace?.sucessModal?.visible,
    }),
    shallowEqual
  );

  const handleClose = async () => {
    await dispatch({
      type: `${NAMESPACE}/sucessModalVisible`,
    });
    await dispatch({
      type: `${NAMESPACE}/initUploadDocumentsModalUploadFiles`,
    });
  };

  return (
    <Close show={visible} handleClose={handleClose}>
      <div>
        {formatMessageApi({
          Label_COM_Message: 'MSG_001210',
        })}
      </div>
    </Close>
  );
};

export default SucessModal;
