import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'dva';
import styles from './styles.less';
import classnames from 'classnames';
import { Form, Table, Checkbox, Icon, notification } from 'antd';
import { FormItemInput, FormItemSelect } from 'basic/components/Form';
import columns from './columns';
import Authorized from '@/utils/Authorized';
import { DocumentLevelEnum } from '@/enum/GolbalAuthority';
import { findConfigsByFlagName, fieldsGenerator, getTypeCode } from '../../_functions';
import moment from 'moment';
import { EToolModules, EFieldFlagName } from '../../_dto/enums';
import { useGetDocumentList } from '../../_hooks';
// import useGetData from 'basic/components/DataProvider/hooks/useGetData';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as confirmSvg } from 'navigator/assets/confirm.svg';
import { ReactComponent as backSvg } from 'navigator/assets/back.svg';
import { tenant, Region } from '@/components/Tenant';

const DocumentItem = ({
  document,
  setCheckList,
  checkList,
  title,
  nameField = 'name',
  dateField = 'receivedDate',
}) => {
  const onChange = useCallback(
    (e) => {
      const checkListByDocId = checkList.map((item) => item?.docId);
      const checked = e.target.checked;
      if (checked === checkListByDocId.includes(document?.docId)) {
        return;
      }
      if (!checked) {
        setCheckList(checkList.filter((item) => item?.docId !== document?.docId));
      } else {
        setCheckList([...checkList, document]);
      }
    },
    [checkList, document]
  );

  return (
    <div className={classnames(styles.documentBox, styles.flexRow)}>
      <Checkbox
        checked={checkList?.map((item) => item?.docId)?.includes(document?.docId)}
        onChange={onChange}
      />
      <div className={styles.documentInfo}>
        <div className={styles.documentText}>{title}</div>
        <div className={classnames(styles.flexRow, styles.documentTopBorder, styles.documentText)}>
          <span>{document?.[nameField]}</span>
          <span>
            {moment(document?.[dateField]).isValid() &&
              moment(document?.[dateField]).format('DD/MM/YYYY hh:mm:ss')}
          </span>
        </div>
      </div>
    </div>
  );
};

const ReIndex = ({ form, authList }) => {
  const {
    toolsData,
    showType,
    documentList,
    businessNoDocumentList,
    fieldConfigure,
    dropdownConfigure,

    docIdConfig,
  } = useSelector(({ documentManagement }: any) => documentManagement);
  const fields = fieldConfigure?.[EToolModules.view];
  const { fieldName } = findConfigsByFlagName(fields, EFieldFlagName.groupByFlag);
  const documentListShowed: [] =
    (showType === 'businessNo' ? businessNoDocumentList : documentList) || [];

  const dispatch = useDispatch();
  const isShow = toolsData?.reIndex?.selected;
  const [inBusinessNo, setInBusinessNo] = useState(showType === 'businessNo');
  const [checkList, setCheckList] = useState([]);
  const [businessProcessInfo, setBusinessProcessInfo] = useState<[]>([]);
  const [lastPolicyNo, setLastPolicyNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [suffix, setSuffix] = useState('');
  const regionCode = tenant.region();

  const onBack = useCallback(() => {
    dispatch({
      type: 'documentManagement/selectToolItem',
      payload: { toolId: 'reIndex' },
    });
  }, []);

  const onChangePolicyNo = useCallback(
    async (policyNo) => {
      if (lastPolicyNo === policyNo) return;
      setLastPolicyNo(policyNo);

      if (!policyNo) {
        form.setFieldsValue({
          policyOwnerName: '',
          identityNo: '',
        });
        setBusinessProcessInfo([]);
        setSelectedRowKeys([]);
        return;
      }

      const resultBusiness = await dispatch({
        type: 'documentManagement/getBusinessProcessInfo',
        payload: { policyNo },
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
        setSelectedRowKeys(resultBusiness.map((data) => data.processInstanceId));
      }

      const { policyOwnerName, identityNo } = await dispatch({
        type: 'documentManagement/getPolicyBasicInfo',
        payload: { policyNo },
      });

      form.setFieldsValue({
        policyOwnerName,
        identityNo,
      });
    },
    [lastPolicyNo]
  );

  const groupedDocumentList = useGetDocumentList({
    documentList: documentListShowed,
    fieldConfigure,
    dropdownConfigure,
    fieldName,
    viewActived: true,
    skipFilter: true,
  });

  const changeTypeFactory = (type: string) => () => {
    if (loading) {
      return;
    }
    setInBusinessNo(type === 'businessNo');
    if (type === showType) return;
    setCheckList([]);
    dispatch({
      type: 'documentManagement/saveState',
      payload: {
        showType: type,
        fileObject: {},
        selectedDocId: '',
      },
    });
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

  const onSubmit = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    form
      .validateFields()
      .then(async (res) => {
        const fieldValues = form.getFieldsValue();
        if (!checkList.length) {
          notification.error({
            message: 'please choose Document for ReIndex',
          });
          return;
        }
        if (businessProcessInfo.length && !selectedRowKeys.length) {
          notification.error({
            message: 'select one Case to link at least',
          });
          return;
        }

        const { policyNo, policyOwnerName, identityNo, docID, documentName } = fieldValues;

        if (
          !policyNo &&
          !policyOwnerName &&
          !identityNo &&
          !docID &&
          !(documentName && checkList.length === 1)
        ) {
          notification.error({
            message: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000875' }),
          });
          return;
        }

        const docData = !!docID && docIdConfig.find((doc) => doc?.dictCode === docID)?.data;

        const payload = {
          policyNo,
          policyOwnerName,
          identityNo,
          docChangedItem: {
            documentName: checkList.length === 1 ? fieldValues.documentName : '',
            ...docData,
            identityNo,
            policyOwnerName,
          },
          businessProcessVOS: selectedRowKeys
            .map((key) => businessProcessInfo.find((item) => item.processInstanceId === key))
            .filter((bool) => bool),
          docViewVOList: checkList,
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
              onBack();
            } else {
              setCheckList(endResult.failList);
            }
          }
          setLoading(false);
        }

        if (!startResult.result) {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  // 关闭弹窗清除数据
  useEffect(() => {
    if (!isShow) {
      setSelectedRowKeys([]);
      setLastPolicyNo('');
      setBusinessProcessInfo([]);
      setCheckList([]);
      setLoading(false);
      form.setFieldsValue({
        documentName: '',
        policyOwnerName: '',
        identityNo: '',
        policyNo: '',
        docID: '',
      });
    }
  }, [isShow]);

  useEffect(() => {
    if (checkList.length > 1) {
      form.setFieldsValue({
        documentName: '',
      });
    }
    if (checkList.length === 1 && checkList[0].name && checkList[0].name.includes('.')) {
      setSuffix('.' + checkList[0].name.split('.').slice(-1)[0]);
    } else if (suffix) {
      setSuffix('');
    }
  }, [checkList.length]);

  useEffect(() => {
    const isInbusinessNo = showType === 'businessNo';
    if (inBusinessNo !== isInbusinessNo) setInBusinessNo(isInbusinessNo);
  }, [showType]);

  return (
    <div
      className={classnames(styles.mask, isShow ? void 0 : styles.noMask)}
      onClick={() => {
        dispatch({
          type: 'documentManagement/selectToolItem',
          payload: { toolId: 'reIndex' },
        });
      }}
    >
      <div
        className={classnames(styles.box, isShow ? void 0 : styles.collapseBox)}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className={styles.sideBar}>
          <div
            className={classnames(styles.iconBox, { [styles.disable]: loading })}
            onClick={onSubmit}
          >
            {loading ? (
              <Icon type="loading" />
            ) : (
              <Icon component={confirmSvg} style={{ fontSize: '25px' }} />
            )}
          </div>
          <div className={classnames(styles.iconBox)} onClick={onBack}>
            <Icon component={backSvg} style={{ fontSize: '25px' }} />
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.title}>Document Re-index</div>
          <div className={classnames(styles.flexRow, styles.rightTitleBox)}>
            <div className={styles.rightTitle}>Choose Document</div>
            <Authorized
              authority={[DocumentLevelEnum.RS_BP_ViewDocumentByBusinessNoButton]}
              currentAuthority={authList}
            >
              <div className={classnames(styles.selectorContainer, styles.flexRow)}>
                <div
                  className={classnames(
                    styles.selectorText,
                    inBusinessNo ? void 0 : styles.blackText,
                    { [styles.disable]: loading }
                  )}
                  onClick={changeTypeFactory('caseNo')}
                >
                  In Case No.{documentList.length}
                </div>
                <div
                  className={classnames(
                    styles.selectorText,
                    inBusinessNo ? styles.blackText : void 0,
                    { [styles.disable]: loading }
                  )}
                  onClick={changeTypeFactory('businessNo')}
                >
                  In Business No.{businessNoDocumentList.length}
                </div>
                <div
                  className={classnames(
                    styles.selectorMask,
                    inBusinessNo ? styles.selectorMaskRight : void 0
                  )}
                />
              </div>
            </Authorized>
          </div>
          <div className={styles.content}>
            <div className={styles.leftContainer}>
              <div className={styles.secondaryText}>
                <span className={styles.yellowText}>{checkList.length}</span>
                document selected / {documentListShowed.length} documents
              </div>
              <div className={styles.subSection} style={{ paddingTop: 0 }}>
                <FormItemSelect
                  form={form}
                  formName="docID"
                  labelId="Change Document ID"
                  dicts={docIdConfig}
                />
              </div>
              <div className={styles.subSection}>
                <div className={styles.subTitle}>Change Document Reference</div>
                <FormItemInput
                  className={styles.input}
                  form={form}
                  formName="policyNo"
                  labelId="Reference No./Policy No."
                  onChange={onChangePolicyNo}
                />
                <div className={styles.inputRow}>
                  <FormItemInput
                    className={styles.input}
                    form={form}
                    formName="policyOwnerName"
                    labelId="Policy Owner"
                  />
                  <FormItemInput
                    className={styles.input}
                    form={form}
                    formName="identityNo"
                    labelId="Identity No."
                    editable={false}
                  />
                </div>
                {businessProcessInfo && !!businessProcessInfo.length && (
                  <div className={styles.table}>
                    <div className={styles.subTitle}>
                      Linked Case ({businessProcessInfo.length})
                    </div>
                    <Table
                      rowKey="processInstanceId"
                      columns={columns}
                      dataSource={businessProcessInfo || []}
                      // loading={searchLoading}
                      scroll={{ x: true, y: '100px' }}
                      pagination={false}
                      rowSelection={{
                        selectedRowKeys,
                        onChange: (selectedKeys, selectedRows) => {
                          setSelectedRowKeys(selectedKeys.map((str) => `${str}`));
                        },
                      }}
                    />
                  </div>
                )}
              </div>
              {regionCode !== Region.TH && (
                <div
                  className={classnames(
                    styles.subSection,
                    checkList.length <= 1 ? void 0 : styles.disabledSection
                  )}
                >
                  <div className={styles.subTitle}>Change Document Name</div>
                  <FormItemInput
                    className={styles.input}
                    form={form}
                    formName="documentName"
                    labelId="Document Name"
                    disabled={checkList.length > 1}
                    prefix={
                      checkList.length > 1 && <Icon type="close-circle" style={{ color: 'red' }} />
                    }
                    noFormItemAppend={true}
                    suffix={suffix}
                  />
                </div>
              )}
            </div>
            <div className={styles.rightContainer}>
              {groupedDocumentList?.map((group) => (
                <div
                  className={classnames(styles.documentText, styles.documentGroupName)}
                  key={group.groupValue}
                >
                  {group?.groupValue}
                  {group?.documents?.map((document) => {
                    const { indexClass, formCategory } = document || {};
                    const documentFields = fieldConfigure?.[EToolModules.view];

                    const { fieldName: documentFieldName } = findConfigsByFlagName(
                      documentFields,
                      EFieldFlagName.titleFlag
                    );
                    const typeCode = getTypeCode(documentFieldName);
                    const result = fieldsGenerator(documentFields, {
                      indexClass,
                      formCategory,
                      dropdownConfigure,
                    });

                    return (
                      <DocumentItem
                        key={document?.docId}
                        title={formatMessageApi({
                          [typeCode?.trim()]: document?.[documentFieldName],
                        })}
                        document={document}
                        checkList={checkList}
                        setCheckList={setCheckList}
                        nameField={result[0]?.formName}
                        dateField={result[1]?.formName}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form.create()(ReIndex);
