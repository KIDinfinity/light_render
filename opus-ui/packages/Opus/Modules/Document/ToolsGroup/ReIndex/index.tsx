import React, { useEffect, useState } from 'react';
import lodash from 'lodash';
import moment from 'moment';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'dva';
import { Form, Table, Checkbox, Icon, notification, Button, Modal } from 'antd';
import { FormItemInput } from 'basic/components/Form';
import { tenant } from '@/components/Tenant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as ConfirmationIcon } from '../../_static/icon-Confirmation.svg';
import { ReactComponent as ReIndexIcon } from '../../_static/icon-ReIndex.svg';
import { ReactComponent as Uploaded } from '../../_static/icon-Uploaded.svg';
import { LS, LSKey } from '@/utils/cache';
import { Action } from '@/components/AuditLog/Enum';

import styles from './styles.less';
import columns from './columns';

const DocumentItem = ({ document, selectedDocumentKeyList, setSelectedDocumentKeyList }) => {
  const dropdownConfigure = useSelector(
    ({ documentManagement }: any) => documentManagement?.dropdownConfigure
  );
  const onChange = (e) => {
    const checked = e.target.checked;

    if (!checked) {
      setSelectedDocumentKeyList(selectedDocumentKeyList.filter((item) => item !== document?.id));
    } else {
      setSelectedDocumentKeyList([...selectedDocumentKeyList, document.id]);
    }
  };
  const title = (() => {
    const docName = lodash
      .chain(dropdownConfigure)
      .find(
        (item) =>
          item.docTypeCode === document.docTypeCode &&
          item.externalDocTypeCode === document.externalDocTypeCode
      )
      .get('docName')
      .value();
    const docCode = tenant.isJP() ? document?.docTypeCode : document?.externalDocTypeCode;
    return docCode && docName ? `${docCode}-${docName}` : docCode || docName;
  })();
  return (
    <div className={classnames(styles.documentBox, styles.flexRow)}>
      <Checkbox checked={selectedDocumentKeyList?.includes(document?.id)} onChange={onChange} />
      <div className={styles.documentItem}>
        <div className={styles.documentDocId}>{title}</div>
        <div className={classnames(styles.documentName)}>
          <div>{document?.name}</div>
          <div>
            {moment(document?.receivedDate).isValid() &&
              moment(document?.receivedDate).format('DD/MM/YYYY hh:mm:ss')}
          </div>
        </div>
      </div>
    </div>
  );
};

const ReIndex = ({ form }) => {
  const { documentList, showReIndex, selectedData } = useSelector(
    ({ documentManagement }: any) => documentManagement
  );
  const businessCode = LS.getItem(LSKey.CURRENTUSER)?.businessCode;

  const dispatch = useDispatch();
  const [selectedDocumentList, setSelectedDocumentList] = useState([]);
  const [selectedDocumentKeyList, setSelectedDocumentKeyList] = useState([]);
  const [businessProcessInfo, setBusinessProcessInfo] = useState<[]>([]);
  const [selectedBusinessProcessKeys, setSelectedBusinessProcessKeys] = useState<string[]>([]);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangePolicyNo = async () => {
    const {
      identityNo = undefined,
      insured = undefined,
      policyNo = undefined,
    } = form.getFieldsValue();

    const resultBusiness = await dispatch({
      type: 'documentManagement/getBusinessProcessInfo',
      payload: {
        businessCode,
        policyNo,
        identityNo,
        insured,
      },
    });
    if (resultBusiness) {
      setBusinessProcessInfo(
        resultBusiness.map((data) => {
          return {
            ...data,
            policyNo,
          };
        })
      );
      setSelectedBusinessProcessKeys(resultBusiness.map((data) => data.processInstanceId));
    }
  };

  const loopTime = async (asyncId, resolve) => {
    const result = await dispatch({
      type: `documentManagement/reIndexAsyncLoop`,
      payload: {
        asyncId,
      },
    });
    if (result.status === 'inProgress') {
      setTimeout(() => {
        loopTime(asyncId, resolve);
      }, 5000);
    } else {
      resolve(result);
    }
  };
  const handleCancel = () => {
    dispatch({
      type: `documentManagement/saveShowReIndex`,
      payload: {
        visible: false,
      },
    });
  };
  const handleSubmit = async () => {
    setConfirmationModal(false);
    setLoading(true);
    try {
      const fieldValues = form.getFieldsValue();
      const { identityNo, insured, policyNo } = fieldValues;

      const payload = {
        policyNo,
        identityNo,
        policyOwnerName: insured,
        docChangedItem: {
          policyOwnerName: insured,
          identityNo,
        },
        businessProcessVOS: selectedBusinessProcessKeys
          .map((key) => businessProcessInfo.find((item) => item.processInstanceId === key))
          .filter((bool) => bool),
        docViewVOList: selectedDocumentKeyList
          .map((key) => selectedDocumentList.find((item) => item.id === key))
          .filter((bool) => bool),
      };

      const startResult = await dispatch({
        type: `documentManagement/reIndexAsyncStart`,
        payload,
      });
      if (startResult.result) {
        const result = await new Promise((resolve: any) => {
          loopTime(startResult?.result, resolve);
        });
        if (result?.status === 'finish') {
          const endResult = await dispatch({
            type: `documentManagement/reIndexAsyncEnd`,
            payload: {
              data: result?.data,
            },
          });
          if (endResult.status) {
            handleCancel();
            setSuccessModal(true);
            dispatch({
              type: 'auditLogController/logTask',
              payload: {
                action: Action.ReIndex,
              },
            });
          } else {
            setSelectedDocumentKeyList(endResult?.failList?.map((item) => item.id));
            Modal.error({
              okText: 'Close',
              content: formatMessageApi({
                Label_COM_ErrorMessage: 'MSG_000951',
              }),
            });
          }
        }
        setLoading(false);
      }

      if (!startResult.result) {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };
  const errorMessage = (errorMessageString: string, replacement: string[], highIndex: number) => {
    const strArr = lodash.split(errorMessageString, /\{.\}/);
    let message = <></>;
    lodash.forEach(strArr, (item, index) => {
      message = (
        <>
          {message}
          {item}
          {highIndex === index ? (
            <span>{replacement?.[index] || ''}</span>
          ) : (
            replacement?.[index] || ''
          )}
        </>
      );
    });

    return message;
  };

  const businessNoList = lodash
    .chain(businessProcessInfo)
    .filter((item) => lodash.includes(selectedBusinessProcessKeys, lodash.toString(item?.caseNo)))
    .map((item) => item?.businessNo)
    .uniq()
    .join(',')
    .value();

  const handleConfirm = async () => {
    const fieldValues = form.getFieldsValue();

    if (!selectedDocumentKeyList.length) {
      notification.error({
        message: 'please choose Document for ReIndex',
      });
      return;
    }

    if (businessProcessInfo.length && lodash.isEmpty(selectedBusinessProcessKeys)) {
      notification.error({
        message: 'select one Case to link at least',
      });
      return;
    }

    const { identityNo, insured, policyNo } = fieldValues;
    if (!policyNo && !insured && !identityNo) {
      notification.error({
        message: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000875' }),
      });
      return;
    }
    setConfirmationModal(true);
  };

  useEffect(() => {
    if (showReIndex) {
      const documentKeys = Object.values(selectedData?.selectedDocs || {}).map((item) => item.id);
      setSelectedDocumentList(documentList.filter((item) => documentKeys.includes(item?.id)));
      setSelectedDocumentKeyList(documentKeys);
    }
    if (!showReIndex) {
      setSelectedDocumentList([]);
      setSelectedDocumentKeyList([]);
      setBusinessProcessInfo([]);
      setSelectedBusinessProcessKeys([]);
      setLoading(false);
      form.resetFields();
    }
  }, [showReIndex]);

  return (
    <>
      <Modal
        centered
        width={'80%'}
        closable={false}
        visible={showReIndex}
        title={
          <div className={styles.title}>
            <Icon component={ReIndexIcon} className={styles.headerIcon} />
            <span>
              {formatMessageApi({
                Label_COM_Opus: 'Re-Index Documents',
              })}
            </span>
          </div>
        }
        onCancel={handleCancel}
        footer={
          <div className={styles.footer}>
            <Button key="upload" type="primary" onClick={handleCancel}>
              {formatMessageApi({
                Label_COM_Opus: 'cancel',
              })}
            </Button>

            <Button
              key="submit"
              type="primary"
              onClick={handleConfirm}
              loading={loading}
              disabled={
                lodash.isEmpty(selectedBusinessProcessKeys) ||
                lodash.isEmpty(selectedDocumentKeyList)
              }
            >
              {formatMessageApi({
                Label_BPM_Button: 'Confirm',
              })}
            </Button>
          </div>
        }
        className={styles.box}
        maskClosable={false}
      >
        <div className={styles.content}>
          <div className={styles.leftContainer}>
            <div className={styles.leftTitle}>
              <Icon type="file" className={styles.headerIcon} />
              <span>
                {formatMessageApi({
                  Label_COM_Opus: 'Linked Cases',
                })}
              </span>
            </div>
            <div>
              <div className={styles.table}>
                <Table
                  rowKey="processInstanceId"
                  columns={columns}
                  dataSource={businessProcessInfo || []}
                  // loading={searchLoading}
                  scroll={{ x: true, y: true }}
                  pagination={false}
                  rowSelection={{
                    selectedRowKeys: selectedBusinessProcessKeys,
                    onChange: (selectedKeys, selectedRows) => {
                      setSelectedBusinessProcessKeys(selectedKeys.map((str) => `${str}`));
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.rightTitle}>
              <Icon type="folder" className={styles.headerIcon} />
              <span>
                {formatMessageApi({
                  Label_COM_Opus: 'ReIndexTo',
                })}
              </span>
            </div>
            <div>
              <div className={styles.rightContent}>
                <div className={styles.inputRow}>
                  <FormItemInput
                    className={styles.input}
                    form={form}
                    formName="policyNo"
                    labelId="Policy No."
                    onBlur={onChangePolicyNo}
                  />
                  <FormItemInput
                    className={styles.input}
                    form={form}
                    formName="insured"
                    labelId="Insured"
                    onBlur={onChangePolicyNo}
                  />
                  <FormItemInput
                    className={styles.input}
                    form={form}
                    formName="identityNo"
                    labelId="Document No."
                    onBlur={onChangePolicyNo}
                  />
                </div>
                <div>
                  <div className={styles.mr10}>
                    {formatMessageApi({
                      Label_COM_Opus: 'YouAreReindexingFollowingDocuments',
                    })}
                  </div>
                  {selectedDocumentList?.map((document) => (
                    <div key={document.id}>
                      <DocumentItem
                        key={document?.id}
                        document={document}
                        setSelectedDocumentKeyList={setSelectedDocumentKeyList}
                        selectedDocumentKeyList={selectedDocumentKeyList}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* <div className={styles.footer}>
            <Button key="upload" type="primary" onClick={handleCancel}>
              {formatMessageApi({
                Label_COM_Opus: 'cancel',
              })}
            </Button>

            <Button
              key="submit"
              type="primary"
              onClick={handleConfirm}
              loading={loading}
              disabled={
                lodash.isEmpty(selectedBusinessProcessKeys) ||
                lodash.isEmpty(selectedDocumentKeyList)
              }
            >
              {formatMessageApi({
                Label_BPM_Button: 'Confirm',
              })}
            </Button>
          </div> */}
        </div>
      </Modal>
      <Modal
        closable={false}
        centered
        visible={confirmationModal}
        title={
          <span className={styles.modalTitle}>
            <Icon component={ConfirmationIcon} />
            <span>
              {formatMessageApi({
                Label_COM_Opus: 'confirmation',
              })}
            </span>
          </span>
        }
        onOk={handleSubmit}
        onCancel={() => setConfirmationModal(false)}
        footer={[
          <Button key="Cancel" onClick={() => setConfirmationModal(false)}>
            {formatMessageApi({ Label_COM_Opus: 'cancel' })}
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            {formatMessageApi({ Label_BPM_Button: 'Confirm' })}
          </Button>,
        ]}
      >
        <div className={styles.businessNoList}>
          {errorMessage(
            formatMessageApi({
              Label_COM_WarningMessage: 'MSG_001095',
            }),
            [selectedDocumentKeyList.length.toString(), businessNoList],
            1
          )}
        </div>
      </Modal>
      <Modal
        closable={false}
        centered
        visible={successModal}
        title={
          <span className={styles.modalTitle}>
            <Icon component={Uploaded} />
            <span>
              {formatMessageApi({
                Label_COM_Opus: 'Success',
              })}
            </span>
          </span>
        }
        footer={[
          <Button key="submit" type="primary" onClick={() => setSuccessModal(false)}>
            {formatMessageApi({
              Label_BPM_Button: 'close',
            })}
          </Button>,
        ]}
      >
        <div className={styles.modalText}>
          {formatMessageApi({
            Label_COM_WarningMessage: 'MSG_001096',
          })}
        </div>
      </Modal>
    </>
  );
};

export default Form.create()(ReIndex);
