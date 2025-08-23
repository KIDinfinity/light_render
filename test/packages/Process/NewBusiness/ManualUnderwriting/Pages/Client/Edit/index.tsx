import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import context from 'bpm/pages/OWBEntrance/Context/context';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import Modal from 'process/NewBusiness/ManualUnderwriting/_components/Modal';
import { OptionType } from 'process/NewBusiness/ManualUnderwriting/_enum';
import configs from '../_section';
import Client from './Client';
import ClientSelectList from './ClientSelectList';
import useChangeIsInterestMhitHandleWarnMessage from 'process/NewBusiness/ManualUnderwriting/_hooks/useChangeIsInterestMhitHandleWarnMessage';
import classnames from 'classnames';
import styles from '../index.less';
import ExtProductType from 'basic/enum/ExtProductType';
import useGetFlatProductConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFlatProductConfig';

export default () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { dispatch: reducerDispatch } = useContext(context);
  const changeIsInterestMhitHandleWarnMessage = useChangeIsInterestMhitHandleWarnMessage();
  const planProductConfig = useGetFlatProductConfig();

  const editingClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.editingClientId
  );

  const isRefreshBpm = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isRefreshBpm
  );

  useEffect(() => {
    if (editingClientId && !visible) {
      setVisible(true);
    }
  }, [editingClientId, visible]);

  useEffect(() => {
    if (reducerDispatch) {
      reducerDispatch({
        type: 'setIsRefresh',
        payload: isRefreshBpm,
      });
    }
  }, [isRefreshBpm, reducerDispatch]);

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

  const handleConfirmSubmit = async () => {
    const response = await dispatch({
      type: `${NAMESPACE}/submit`,
      payload: {
        type: OptionType.client,
        formKeys: [...configs],
      },
    });
    dispatch({
      type: `${NAMESPACE}/deleteExpandedClientId`,
    });
    return response;
  };

  const filterCoverageListByExtProductType = async () => {
    const filterProductTypeList = lodash
      .chain(planProductConfig)
      .filter((item: any) => item?.extProductType === ExtProductType.PC_optional_product)
      .map('productCode')
      .value();

    dispatch({
      type: `${NAMESPACE}/setCoverageList`,
      payload: {
        filterProductTypeList,
      },
    });
  };

  const handleConfirm = async () => {
    const isInterestMHITValueChangedClientItem = await dispatch({
      type: `${NAMESPACE}/getChangeIsInterestMHITClientItem`,
    });

    if (lodash.size(isInterestMHITValueChangedClientItem)) {
      changeIsInterestMhitHandleWarnMessage({
        handleConfirmSubmit,
        isInterestMHITValueChangedClientItem,
        filterCoverageListByExtProductType,
      });
      return false;
    }

    const response = await handleConfirmSubmit();

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
