import React, { useState } from 'react';
import { useSelector, useDispatch } from 'dva';

import CommonResizeModal from 'basic/components/CommonResizeModal';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import { useGetTransferPaymenBasicData } from '../../_hooks';

import Basic from './_components/Basic';
import Table from './_components/Table';
import Actions from './_components/Actions';

export default () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  // TODO:这里的数据应该初始化去做
  const datas = useGetTransferPaymenBasicData();

  const showTransferPayment =
    useSelector(({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.showTransferPayment) ||
    false;

  const handleCancel = () => {
    dispatch({
      type: `${NAMESPACE}/saveShowTransferPayment`,
      payload: {
        show: false,
      },
    });
  };

  return (
    <CommonResizeModal
      confirmAuth={false}
      loading={loading}
      visible={showTransferPayment}
      onReturn={() => {
        handleCancel();
      }}
      onCancel={() => {
        handleCancel();
      }}
      onSave={async () => {
        setLoading(true);
        const response = await dispatch({
          type: `${NAMESPACE}/setTransferData`,
          payload: {
            type: 'save',
          },
        });
        if (!!response) {
          dispatch({
            type: `${NAMESPACE}/saveShowTransferPayment`,
            payload: {
              show: false,
            },
          });
        }
        setLoading(false);
      }}
      returnAuth
      saveAuth
      width={925}
      height={450}
      moveTop={20}
      title={formatMessageApi({
        Label_BIZ_policy: 'transferPayment',
      })}
    >
      <Basic datas={datas} />
      <Table />
      <Actions />
    </CommonResizeModal>
  );
};
