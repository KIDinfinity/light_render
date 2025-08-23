import React, { useMemo, useState } from 'react';
import lodash from 'lodash';
import { Button, Table, Switch, Modal } from 'antd';
import { useSelector,useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { FunctionDataProps, CurrentMenuProps } from '../Utils/Typings';
import { showErrors, showSuccess } from '../Utils/Common';
import { FunDatasourceCode } from '../Utils/Constant';
import styles from './index.less';

interface DataSource {
  id: string;
}

interface ComponentProps {
  TableSearch: any;
  functionData: FunctionDataProps;
  rows: DataSource[];
  currentMenu: CurrentMenuProps;
  checked: boolean;
  isShowModal: boolean;
}


function DeleteDatasource(props: ComponentProps) {
  const [metadata, setMetadata] = useState([]);
  const [checked, setChecked] = useState(true);
  const [isShowModal, setIsShowModal] = useState(false);
  const dispatch: Dispatch = useDispatch();
  const listMetaDataLoading: boolean = useSelector((state: any) => state.loading.effects['configurationOperation/listMetadataByDatasource']);
  const deleteDatasourceLoading: boolean = useSelector((state: any) => state.loading.effects['configurationOperation/deleteDatasource']);
  const {
    functionData: { operationList },
    rows,
    currentMenu: { functionCode },
    TableSearch
  } = props;

  const columns = useMemo(() => {
    return [
      {
        title: 'metadataName',
        dataIndex: 'metadataName',
      },
      {
        title: 'bsDbTable',
        dataIndex: 'bsDbTable',
      },
      {
        title: 'metadataType',
        dataIndex: 'metadataType',
      },
    ];
  }, []);

  const switchChange = (status: boolean) => {
    setChecked(status);
  };

  const comfirmTable = useMemo(() => {
    return (
      <>
        <Table
          columns={columns}
          dataSource={metadata}
          pagination={{
            defaultPageSize: 5,
          }}
          rowKey={(record: any) => record.id}
        />
        <div className={styles.btnBox}>
          <span className={styles.switchSpan}>
            {formatMessageApi({
              Label_COM_WarningMessage: 'configurationcenter.message.retainDatasource',
            })}
          </span>
          <Switch onChange={switchChange} defaultChecked={checked} />
        </div>
      </>
    );
  }, [metadata, checked,columns]);

  const handleClose = () => {
    setMetadata(metadata);
    setIsShowModal(false);

  };


  const listMetadataByDatasource = async () => {
    const { id: datasourceId } = rows[0];
    const response: any = await dispatch({
      type: 'configurationOperation/listMetadataByDatasource',
      payload: {
        datasourceId,
      },
    });
    if (response && response.success) {
      setMetadata( response.success);
      setIsShowModal(true);
    } else {
      showErrors(response.promptMessages);
    }
  };


  const handleDeleteDatasource = async () => {
    const { id: datasourceId } = rows[0];
    const response: any = await dispatch({
      type: 'configurationOperation/deleteDatasource',
      payload: {
        datasourceId,
        retainDatasource: checked,
      },
    });
    if (!response.success) {
      showErrors(response.promptMessages);
    } else {
      showSuccess(
        formatMessageApi({
          Label_COM_WarningMessage: 'configurationcenter.message.deletDatasource.success',
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
      Label_COM_WarningMessage: 'configurationcenter.message.deleteDataSource',
    }),
    okText: formatMessageApi({
      Label_BIZ_Claim: 'form.confirm',
    }),
    cancelText: formatMessageApi({
      Label_BIZ_Claim: 'form.cancel',
    }),
    maskStyle: { backgroundColor: 'rgba(255, 255, 255, 0.65)' },
    confirmLoading: deleteDatasourceLoading,
    onOk: handleDeleteDatasource,
    onCancel: handleClose,
  };


  return (
    <>
      {lodash.includes(operationList, 'deletedatasource') && functionCode === FunDatasourceCode && (
        <Button
          className={styles.btnDeleteDatasource}
          disabled={rows.length !== 1}
          onClick={listMetadataByDatasource}
          loading={listMetaDataLoading}
        >
          {formatMessageApi({
            Label_BPM_Button: 'configurationcenter.button.deleteDatasource',
          })}
        </Button>
      )}
      <Modal {...modalProps}>{comfirmTable}</Modal>
    </>
  );

}
export default DeleteDatasource;
