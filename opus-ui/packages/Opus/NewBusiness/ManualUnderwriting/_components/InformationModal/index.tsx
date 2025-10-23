import { formatMessageApi, formatMessageEnhanced } from '@/utils/dictFormatMessage';
import { Button, Icon, Modal } from 'antd';
import { connect, useDispatch, useSelector } from 'dva';
import { ReactComponent as SuccessIcon } from 'opus/Assets/icon-success-circle.svg';
import { history } from 'umi';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './index.less';
import InformationForm from './InformationForm';
import { tenant } from '@/components/Tenant';
import InformationCategory from 'opus/NewBusiness/Enum/InformationCategory';
import { Action } from '@/components/AuditLog/Enum';
import { formUtils } from 'basic/components/Form';
import { handleWarnMessageModal } from '@/utils/commonMessage';

const { confirm } = Modal;

const CLOSE = 'Close';
const SUCCESS = 'Success';
const ICONS: any = {
  [InformationCategory.Escalate]: <Icon type="exclamation" />,
  [InformationCategory.Withdraw]: <Icon type="exclamation-circle" />,
  [InformationCategory.Reject]: <Icon type="close" />,
  [InformationCategory.Cancel]: <Icon type="close" />,
  [InformationCategory.QAFail]: <Icon type="exclamation-circle" />,
  [InformationCategory.QCFail]: <Icon type="exclamation-circle" />,
  [InformationCategory.AppealNote]: <Icon type="redo" />,
};

const TITLES: any = {
  [InformationCategory.Escalate]: {
    dictTypeCode: 'Label_COM_Opus',
    dictCode: 'EscalateCase',
  },
  [InformationCategory.Withdraw]: {
    dictTypeCode: 'Label_COM_Opus',
    dictCode: 'WithdrawCase',
  },
  [InformationCategory.Reject]: {
    dictTypeCode: 'Label_COM_Opus',
    dictCode: 'RejectCase',
  },
  [InformationCategory.Cancel]: {
    dictTypeCode: 'Label_COM_Opus',
    dictCode: 'CancelCase',
  },
  [InformationCategory.QAFail]: {
    dictTypeCode: 'Label_Sider_Information',
    dictCode: 'qaFailNote',
  },
  [InformationCategory.QCFail]: {
    dictTypeCode: 'Label_Sider_Information',
    dictCode: 'qcFailNote',
  },
  [InformationCategory.AppealNote]: {
    dictTypeCode: 'Label_COM_Opus',
    dictCode: 'Reopen',
  },
};

const InformationModal = ({ informationForm }) => {
  const processTaskData = useSelector(
    ({ processTask, [NAMESPACE]: state }: any) =>
      (!lodash.isEmpty(processTask.getTask) ? processTask.getTask : state.taskDetail) || {},
    shallowEqual
  );
  const { businessNo } = processTaskData;
  const { currentUser } = useSelector(({ user }: any) => user);
  const [form, setForm] = useState<any>({});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [continueDisabled, setContinueDisabled] = useState(false);
  const dispatch = useDispatch();

  const showInformationModal =
    useSelector(({ [NAMESPACE]: state }: any) => {
      return state?.showInformationModal;
    }) || false;

  const informationModalResolve =
    useSelector(({ [NAMESPACE]: state }: any) => {
      return state?.informationModalResolve;
    }) || null;

  const informationModalTaskDetail =
    useSelector(({ [NAMESPACE]: state }: any) => {
      return state?.informationModalTaskDetail;
    }) || {};

  const informationModalReject =
    useSelector(({ [NAMESPACE]: state }: any) => {
      return state?.informationModalReject;
    }) || null;

  const categoryReasons = useSelector(({ [NAMESPACE]: state }: any) => {
    return state?.categoryReasons;
  });

  const category = useSelector(({ [NAMESPACE]: state }: any) => {
    return state?.informationModalCategory;
  });

  const assigneeAndTeamList =
    useSelector(({ [NAMESPACE]: state }: any) => {
      return state?.assigneeAndTeamList;
    }, shallowEqual) || [];

  const { typeCode = '' } = categoryReasons?.length ? categoryReasons[0] : {};

  // 临时方案，待后端调整getDropdownDictionary接口
  const reasonDicts = useSelector(({ dictionaryController }: any) => {
    return lodash.get(dictionaryController, typeCode);
  }, shallowEqual);

  const renderTitle = useCallback(() => {
    if (!category || !TITLES[category]) {
      return '';
    }

    const { dictTypeCode, dictCode } = TITLES[category];

    return (
      <div className={styles.title}>
        {ICONS[category]}
        <span>{formatMessageApi({ [dictTypeCode]: dictCode })}</span>
      </div>
    );
  }, [category]);

  // 待优化，需后端将下拉内容移至公共接口
  useEffect(() => {
    if (categoryReasons?.length) {
      dispatch({
        type: 'dictionaryController/findDictionaryByTypeCodes',
        payload: categoryReasons.map((item: any) => item.typeCode),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryReasons]);

  useEffect(() => {
    if (showInformationModal) {
      const { caseCategory, activityKey: activityCode } = informationModalTaskDetail;

      dispatch({
        type: `${NAMESPACE}/getCategoryReasons`,
        payload: {
          activityCode,
          businessNo,
          caseCategory,
          categoryCode: category,
        },
      });

      switch (category) {
        case InformationCategory.Escalate:
          dispatch({
            type: `${NAMESPACE}/getAssigneeAndTeam`,
          });
          break;
        case InformationCategory.Withdraw:
        case InformationCategory.Reject:
        case InformationCategory.QAFail:
        case InformationCategory.QCFail:
        case InformationCategory.AppealNote:
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, dispatch, showInformationModal, businessNo]);

  const handleCancel = () => {
    form?.resetFields();
    if (informationModalReject) {
      informationModalReject('Canceled');
    }
    switch (category) {
      case InformationCategory.Escalate:
      case InformationCategory.Withdraw:
      case InformationCategory.Reject:
      case InformationCategory.Cancel:
        dispatch({
          type: `${NAMESPACE}/setInformationModalShow`,
          payload: {
            cancel: true,
          },
        });
        break;
      case InformationCategory.QAFail:
      case InformationCategory.QCFail:
      case InformationCategory.AppealNote:
        dispatch({
          type: `${NAMESPACE}/setInformationModalShow`,
          payload: {
            cancel: true,
          },
        });
        break;
    }
  };

  const validateThenConfirm = (successCallback: () => any) => {
    form.validateFields({ force: true }, async (errors: any) => {
      if (lodash.isEmpty(errors)) {
        setContinueDisabled(true);

        const { reason, teamOrUser } = form.getFieldsValue();
        let content: React.ReactNode | React.ReactNode[] = '';
        let submitInfoSuccess = false;

        const reasonName =
          reasonDicts?.find((item: any) => item.dictCode === reason)?.dictName || reason;

        switch (category) {
          case InformationCategory.Escalate:
            const userObj =
              assigneeAndTeamList.find((item: any) => {
                const { userId, teamCode } = item;

                return [userId, teamCode].includes(teamOrUser);
              }) || {};
            const { userName = '', teamName = '' } = userObj;

            content = formatMessageApi(
              { Label_COM_Message: 'MSG_001129' },
              userName || teamName,
              reasonName
            );
            submitInfoSuccess = true;
            break;
          case InformationCategory.Withdraw:
            content = [
              `You are withdrawing this case because `,
              React.createElement('span', { style: { color: '#d88223' } }, `${reasonName}.`),
            ];
            const withdrawRes: any = await dispatch({
              type: `${NAMESPACE}/setWithdrawInfo`,
            });
            if (withdrawRes?.success) {
              submitInfoSuccess = true;
            }
            break;
          case InformationCategory.Reject:
            content = [
              formatMessageApi({ Label_COM_Message: 'MSG_001132' }, reasonName).replace(
                `${reasonName}.`,
                ''
              ),
              tenant.isTH()
                ? React.createElement('span', { style: { color: '#d88223' } }, `${reasonName}.`)
                : '',
            ];
            const rejectRes: any = await dispatch({
              type: `${NAMESPACE}/setRejectInfo`,
            });
            if (rejectRes?.success) {
              submitInfoSuccess = true;
            }
            break;
          case InformationCategory.Cancel:
            content = `${formatMessageApi({ Label_COM_Message: 'MSG_001142' }, reasonName)}`;
            const cancelRes: any = await dispatch({
              type: `${NAMESPACE}/setCancelInfo`,
            });
            if (cancelRes?.success) {
              submitInfoSuccess = true;
            }
            break;
          case InformationCategory.QAFail:
            content = formatMessageApi({ Label_COM_WarningMessage: 'MSG_001073' });
            const qaRes: any = await dispatch({
              type: `${NAMESPACE}/setQAFailInfo`,
            });
            if (qaRes?.success) {
              submitInfoSuccess = true;
            }
            break;
          case InformationCategory.QCFail:
            content = formatMessageApi({ Label_COM_WarningMessage: 'MSG_001073' });
            const qcRes: any = await dispatch({
              type: `${NAMESPACE}/setQCFailInfo`,
            });
            if (qcRes?.success) {
              submitInfoSuccess = true;
            }
            break;
          case InformationCategory.AppealNote:
            content = [
              `You are re-opening this case because `,
              React.createElement('span', { style: { color: '#d88223' } }, `${reasonName}.`),
            ];
            if (!window.location.pathname.toLowerCase().includes('/nb/history')) {
              const appealRes: any = await dispatch({
                type: `${NAMESPACE}/setAppealNoteInfo`,
              });
              if (appealRes?.success) {
                submitInfoSuccess = true;
              }
            } else {
              submitInfoSuccess = true;
            }
            break;
        }

        if (submitInfoSuccess) {
          setConfirmLoading(true);
          confirm({
            iconType: 'exclamation-circle',
            title: formatMessageApi({ Label_COM_Opus: 'confirmation' }),
            content: content,
            centered: true,
            okText: formatMessageApi({ Label_BPM_Button: 'Confirm' }),
            cancelText: formatMessageApi({ Label_COM_Opus: 'cancel' }),
            onOk() {
              setConfirmLoading(false);
              successCallback();
            },
            onCancel() {
              setConfirmLoading(false);
            },
          });
        }
        setContinueDisabled(false);
      }
    });
  };

  const escalateCallback = async () => {
    const res: any = await dispatch({
      type: `${NAMESPACE}/setManualEscalateAssignee`,
    });

    if (res?.success) {
      const { resultData } = res;
      const beAssignedUserName = lodash.isString(resultData) ? resultData : '';
      const formerAssigneeId = currentUser ? currentUser.userName : '';
      const { processInstanceId, activityKey, taskId, inquiryBusinessNo } = processTaskData;
      dispatch({
        type: 'auditLogController/logTask',
        payload: {
          action: Action.Escalate,
          processInstanceId,
          activityKey,
          taskId,
          formerAssigneeId,
          beAssignedUserName,
          inquiryBusinessNo,
        },
      });

      handleWarnMessageModal(
        [
          {
            content: formatMessageEnhanced(
              { Label_COM_Message: 'MSG_001066' },
              <span style={{ color: '#d88223' }}>{res?.resultData}</span>
            ),
          },
        ],
        {
          type: 'success',
          hideCancelButton: true,
          hiddenExtraText: true,
          okText: formatMessageApi({ Label_BPM_Button: 'Close' }),
          onOk: () => window.location.reload(),
          centered: true,
        }
      );
    }
  };

  const withdrawCallback = async () => {
    if (informationModalResolve) {
      informationModalResolve();
    }
  };

  const rejectCallback = async () => {
    if (informationModalResolve) {
      informationModalResolve();
    }
  };
  const cancelCallback = async () => {
    if (informationModalResolve) {
      informationModalResolve();
    }
  };
  const qaCallback = async () => {
    if (informationModalResolve) {
      informationModalResolve();
    }
  };

  const qcCallback = async () => {
    if (informationModalResolve) {
      informationModalResolve();
    }
  };

  const AppealNoteCallback = async () => {
    // nb history与常规流程操作不同
    if (window.location.pathname.toLowerCase().includes('/nb/history')) {
      setConfirmLoading(true);

      const res: any = await dispatch({
        type: `${NAMESPACE}/reopenCase`,
      });
      if (res?.success) {
        const {
          taskId,
          activityKey,
          caseNo,
          inquiryBusinessNo,
          businessNo: curBusinessNo,
        } = res?.resultData;
        dispatch({
          type: 'auditLogController/logInformation',
          payload: {
            action: Action.ReOpen,
            category: formUtils.queryValue(informationForm?.reason),
            content: formUtils.queryValue(informationForm?.comment),
            taskId,
            activityKey,
            inquiryBusinessNo,
            processInstanceId: caseNo,
            businessNo: curBusinessNo,
          },
        });
        Modal.success({
          centered: true,
          title: SUCCESS,
          content: <div>{`You have successfully reopened this case.`}</div>,
          okText: CLOSE,
          onOk: () =>
            history.push(`/opus/process/task/detail/${lodash.get(res, 'resultData.taskId')}`),
        });
      }

      setConfirmLoading(false);

      return;
    }

    if (informationModalResolve) {
      informationModalResolve();
      dispatch({
        type: 'auditLogController/logInformation',
        payload: {
          action: Action.ReOpen,
          category: formUtils.queryValue(informationForm?.reason),
          content: formUtils.queryValue(informationForm?.comment),
        },
      });
    }
  };

  const handleContinue = async () => {
    switch (category) {
      case InformationCategory.Escalate:
        validateThenConfirm(escalateCallback);
        break;
      case InformationCategory.Withdraw:
        validateThenConfirm(withdrawCallback);
        break;
      case InformationCategory.Reject:
        validateThenConfirm(rejectCallback);
        break;
      case InformationCategory.Cancel:
        validateThenConfirm(cancelCallback);
        break;
      case InformationCategory.QAFail:
        validateThenConfirm(qaCallback);
        break;
      case InformationCategory.QCFail:
        validateThenConfirm(qcCallback);
        break;
      case InformationCategory.AppealNote:
        validateThenConfirm(AppealNoteCallback);
        break;
    }
  };

  return (
    <>
      <Modal
        closable={!confirmLoading}
        maskClosable={!confirmLoading}
        centered
        width={810}
        visible={showInformationModal}
        title={renderTitle()}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {formatMessageApi({
              Label_COM_Opus: 'cancel',
            })}
          </Button>,

          <Button
            key="submit"
            type="primary"
            onClick={() => {
              handleContinue();
            }}
            loading={confirmLoading}
            disabled={continueDisabled}
          >
            {formatMessageApi({
              Label_BPM_Button: 'Continue',
            })}
          </Button>,
        ]}
        className={styles.informationModal}
      >
        <div className={styles.form}>
          <InformationForm setForm={setForm} />
        </div>
      </Modal>
    </>
  );
};

export default connect(({ newBusinessManualUnderwriting }: any) => ({
  informationForm: newBusinessManualUnderwriting.informationForm,
}))(InformationModal);
