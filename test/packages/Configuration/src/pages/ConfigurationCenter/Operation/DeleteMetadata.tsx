import React, { useMemo, useState } from 'react';
import lodash from 'lodash';
import { Button, Modal, Table } from 'antd';
import { useSelector,useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { FunctionDataProps, CurrentMenuProps } from '../Utils/Typings';
import { showErrors, showSuccess } from '../Utils/Common';
import { FunMetadataCode } from '../Utils/Constant';
import styles from './index.less';

interface DataSource {
  id: string;
}

interface ComponentProps {
  TableSearch: any;
  functionData: FunctionDataProps;
  rows: DataSource[];
  currentMenu: CurrentMenuProps;
  isShowModal: boolean;
}


function DeleteMetadata(props: ComponentProps) {
  const dispatch: Dispatch = useDispatch();
  const listFunctioLoading: boolean = useSelector((state: any) => state.loading.effects['configurationOperation/listFunctionByMetadataId']);
  const deleteMetadataLoading: boolean = useSelector((state: any) => state.loading.effects['configurationOperation/deleteMetadata']);
  const [metadata, setMetadata] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const {
    functionData: { operationList },
    rows,
    currentMenu: { functionCode },
    TableSearch
  } = props;

  const columns =  [
    {
      title: 'functionName',
      dataIndex: 'functionName',
    },
    {
      title: 'functionCode',
      dataIndex: 'functionCode',
    },
  ];

  const comfirmTable = useMemo(() => {
    return (
      <Table
        columns={columns}
        dataSource={metadata}
        pagination={{
          defaultPageSize: 5,
        }}
        rowKey={(record: any) => record.id}
      />
    );
  }, [metadata,columns]);


  const handleClose = () => {
    setMetadata(metadata);
    setIsShowModal(false);

  };

  const listFunctionByMetadataId = async () => {
    const { id: metadataId } = rows[0];
    const response: any = await dispatch({
      type: 'configurationOperation/listFunctionByMetadataId',
      payload: {
        metadataId,
      },
    });
    if (response && response.success) {
      setMetadata(response.resultData||[]);
      setIsShowModal(true);

    } else {
      showErrors(response.promptMessages);
    }
  };


  const handleDeleteMetadata = async () => {
    const { id: metadataId } = rows[0];
    const response: any = await dispatch({
      type: 'configurationOperation/deleteMetadata',
      payload: {
        metadataId,
      },
    });
    if (!response.success) {
      showErrors(response.promptMessages);
    } else {
      showSuccess(
        formatMessageApi({
          Label_COM_WarningMessage: 'configurationcenter.message.deleteMetadata.Success',
        })
      );
      TableSearch.setSelectedRows?.([]);
      dispatch({
        type: 'configurationCenter/refreshResult',
      });
      handleClose();
    }
  };

  const modalProps = {
    className: styles.comfirmBox,
    visible: isShowModal,
    title: formatMessageApi({
      Label_COM_WarningMessage: 'configurationcenter.message.deleteMetadata',
    }),
    okText: formatMessageApi({
      Label_BIZ_Claim: 'form.confirm',
    }),
    cancelText: formatMessageApi({
      Label_BIZ_Claim: 'form.cancel',
    }),
    maskStyle: { backgroundColor: 'rgba(255, 255, 255, 0.65)' },
    confirmLoading: deleteMetadataLoading,
    onOk: handleDeleteMetadata,
    onCancel: handleClose,
  };

  return (
    <>
      {lodash.includes(operationList, 'deletemetadata') && functionCode === FunMetadataCode && (
        <Button
          className={styles.btnDeleteDatasource}
          disabled={rows.length !== 1}
          onClick={listFunctionByMetadataId}
          loading={listFunctioLoading}
        >
          {formatMessageApi({
            Label_BPM_Button: 'configurationcenter.button.deleteMetadata',
          })}
        </Button>
      )}
      <Modal {...modalProps}>{comfirmTable}</Modal>
    </>
  );

}
export default DeleteMetadata;
