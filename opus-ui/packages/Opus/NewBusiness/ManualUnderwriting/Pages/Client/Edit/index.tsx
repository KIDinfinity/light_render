import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'dva';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import Modal from 'opus/NewBusiness/ManualUnderwriting/_components/Modal';
import { OptionType } from 'opus/NewBusiness/ManualUnderwriting/_enum';

import configs from '../_section';
import Client from './Client';
import ClientSelectList from './ClientSelectList';

import classnames from 'classnames';
import styles from '../index.less';

export default () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const editingClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.editingClientId
  );

  useEffect(() => {
    if (editingClientId && !visible) {
      setVisible(true);
    }
  }, [editingClientId, visible]);

  const handleBack = async () => {
    setVisible(false);
    setTimeout(() => {
      dispatch({
        type: `${NAMESPACE}/setEditingClientId`,
      });
      dispatch({
        type: `${NAMESPACE}/saveHiddenModal`,
      });
    }, 300);
  };

  const handleConfirm = async () => {
    dispatch({
      type: `${NAMESPACE}/saveIsSaveDataComplete`,
      payload: {
        isSaveDataComplete: false,
      },
    });
    const response = await dispatch({
      type: `${NAMESPACE}/submit`,
      payload: {
        type: OptionType.client,
        formKeys: [...configs],
        confirmBeforeReduce: 'confirmBefore',
      },
    });
    dispatch({
      type: `${NAMESPACE}/deleteExpandedClientId`,
    });
    return response;
  };
  return (
    <Modal
      width="90%"
      show={!!editingClientId}
      setShow={() => {
        dispatch({
          type: `${NAMESPACE}/setEditingClientId`,
        });
      }}
      onBack={handleBack}
      onConfirm={handleConfirm}
    >
      <div className={classnames(styles.clientSection, styles.clientSectionHandleOverFlow)}>
        <Client clientId={editingClientId} />
        <ClientSelectList />
      </div>
    </Modal>
  );
};
