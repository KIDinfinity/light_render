import { batchAssignTaskV2 } from '@/services/bpmProcessTaskService';
import { getReassignableUsers } from '@/services/userCenterUserInquiryControllerService';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { connect, useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import FormLayout from 'opus/Components/FormLayout';
import { Avatar } from 'packages/Opus/Components';
import { Button, Form, Modal, Spin, Icon } from 'packages/Opus/Components/Antd';
import TaskTable from 'packages/Opus/Components/TaskTable';
import { ReactComponent as swap } from 'packages/Opus/Assets/icon-swap.svg';
import { NAMESPACE } from 'packages/Opus/Pages/Home/activity.config';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './index.less';
import { Action } from '@/components/AuditLog/Enum';
const ALL_CASES_FOR = 'All Cases for';
const TO_DO = 'To Do';
const PENDING = 'Pending';

const PAGE_SIZE = 5;

const MessageModal = ({
  errorMessage,
  selected,
  showMessageModal,
  setShowMessageModal,
  userList,
  assign,
  onOk,
}: any) => {
  const formatAssign = userList?.find((item: any) => item.dictCode === assign)?.dictName || assign;
  return (
    <Modal
      title={
        <div className={styles.messageModalHeader}>
          <Icon type="check-circle" className={styles.successIcon} />
          <span>
            {formatMessageApi({
              Label_COM_Opus: 'Success',
            })}
          </span>
        </div>
      }
      visible={showMessageModal}
      centered
      destroyOnClose
      onCancel={() => {
        setShowMessageModal(false);
        onOk();
      }}
      footer={
        <div>
          <Button
            type="primary"
            onClick={() => {
              setShowMessageModal(false);
              onOk();
            }}
          >
            {formatMessageApi({ Label_BPM_Button: 'Close' })}
          </Button>
        </div>
      }
    >
      <div>
        {errorMessage(
          formatMessageApi({
            Label_COM_WarningMessage: 'MSG_001043',
          }),
          [selected.length.toString(), formatAssign],
          1
        )}
        .
      </div>
    </Modal>
  );
};

export default connect(({}: any) => ({}))(
  Form.create({})(({ form, resultConfigs, user, visible, onCancel, onOk }: any) => {
    const dispatch = useDispatch();

    const currentUserId =
      useSelector(({ user: currentUserInfo }: any) => currentUserInfo?.currentUser?.userId) || '';

    const currentUserName =
      useSelector(({ user: currentUserInfo }: any) => currentUserInfo?.currentUser?.userName) || '';

    const {
      total,
      current,
      list: incompleteList,
      todoCaseCount = 0,
      pendingCaseCount = 0,
      sortName,
      sortOrder,
      filterChoice: reduxFilterChoice,
    } = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.incompleteCases) ||
    {};
    const { userName = '', userId = '' } = user || {};

    const [selected, setSelected] = useState([]);
    const [teamMemberOptions, setTeamMemberOptions] = useState([]);
    const [userList, setUserList] = useState([]);
    const [dropdownLoading, setDropdownLoading] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);

    const showClose = !lodash.isEmpty(reduxFilterChoice);

    const sortedList = useMemo(() => {
      const filterSelected = !lodash.isEmpty(reduxFilterChoice);

      if (incompleteList.length && (sortName || filterSelected)) {
        let updatedList = lodash.cloneDeep(incompleteList);

        if (filterSelected) {
          const keys = Object.keys(reduxFilterChoice);

          updatedList = lodash.filter(updatedList, (listItem) => {
            return reduxFilterChoice[keys[0]].includes(listItem[keys[0]]);
          });
        }

        if (sortName) {
          return lodash.orderBy(updatedList, [sortName], [sortOrder]);
        }

        return updatedList;
      }

      return incompleteList;
    }, [incompleteList, reduxFilterChoice, sortName, sortOrder]);

    const fields = useMemo(() => {
      return [
        {
          title: 'Select Assignee',
          labelTypeCode: 'Label_COM_Opus',
          dictCode: 'SelectAssignee',
          fieldName: 'Select assignee',
          placeholder: selected.length
            ? formatMessageApi({ Label_COM_Opus: 'pleaseSelect' })
            : 'Please select cases first',
          disabled: !selected.length,
          field: 'selectAssignee',
          type: 'select',
          selectOptions: teamMemberOptions,
        },
      ];
    }, [selected, teamMemberOptions]);
    const getIncompleteTasks = useCallback(async () => {
      if (!user) {
        return;
      }

      await dispatch({
        type: `${NAMESPACE}/getIncompleteCases`,
        payload: {
          params: {
            userId: user?.userId,
          },
          currentPage: current,
          pageSize: PAGE_SIZE,
          sortName,
          sortOrder,
        },
      });
    }, [user, dispatch, current, sortName, sortOrder]);

    const getReassignableOptions = async (selectList) => {
      if (!selectList.length) {
        setTeamMemberOptions([]);

        return;
      }

      setDropdownLoading(true);
      const res = await getReassignableUsers({
        caseNoList: selectList.map((item: any) => item.caseNo),
      });

      if (res && res.success) {
        const { resultData = [] } = res;

        setTeamMemberOptions(
          resultData.map((item: any) => ({
            key: item.userId,
            title: `${item.userName} (To Do: ${item.todoTaskCount})`,
            value: item.userId,
          }))
        );
        setUserList(
          resultData.map((item: any) => ({
            dictCode: item.userId,
            dictName: item.userName,
          }))
        );
      }

      setDropdownLoading(false);
    };
    const errorMessage = (errorMessageString: string, replacement: string[], highIndex: number) => {
      const strArr = lodash.split(errorMessageString, /\{.\}/);
      let message = <></>;
      lodash.forEach(strArr, (item, index) => {
        message = (
          <div className={styles.errorMessageContainer}>
            {message}
            {item}
            {highIndex === index ? (
              <span>{replacement?.[index] || ''}</span>
            ) : (
              replacement?.[index] || ''
            )}
          </div>
        );
      });

      return message;
    };
    const onConfirm = useCallback(async () => {
      const assignee = form.getFieldValue('selectAssignee');

      const taskAssignmentList = selected.map((item) => {
        const { taskId, caseCategory, taskStatus, caseNo, inquiryBusinessNo } = item;
        return {
          taskId,
          activityKey: taskStatus,
          caseNo,
          caseCategory,
          inquiryBusinessNo,
        };
      });
      const res = await batchAssignTaskV2({
        taskAssignmentList,
        assignee,
        assigner: currentUserId,
      });

      if (res.success) {
        setShowMessageModal(true);
        taskAssignmentList?.forEach((ele, curIndex) => {
          const { activityKey, taskId, caseNo, inquiryBusinessNo } = ele;
          let assigneeName;
          assigneeName = fields?.[0]?.selectOptions?.find((item) => {
            return item.value === assignee;
          })?.title;
          assigneeName = assigneeName?.replace(/\s*\(.*?\)$/, '');
          const formerAssigneeName = selected?.[curIndex].assignee;
          dispatch({
            type: 'auditLogController/logTask',
            payload: {
              action: Action.Assign,
              processInstanceId: caseNo,
              activityKey,
              taskId,
              formerAssigneeId: formerAssigneeName,
              beAssignedUserId: assignee,
              beAssignedUserName: assigneeName,
              inquiryBusinessNo,
            },
          });
        });
      }
    }, [form, currentUserId, onOk, selected, userList]);

    const handleClear = useCallback(async () => {
      await dispatch({
        type: `${NAMESPACE}/saveIncompletedFilterChoiceClear`,
      });

      getIncompleteTasks();
    }, [dispatch, getIncompleteTasks]);

    useEffect(() => {
      getIncompleteTasks();
    }, [user]);

    useEffect(() => {
      if (!visible) {
        setSelected([]);

        dispatch({
          type: `${NAMESPACE}/setIncompleteCases`,
          payload: {
            list: [],
          },
        });
      }

      // 默认全选
      if (visible && !user && incompleteList.length) {
        setSelected(lodash.cloneDeep(incompleteList));
        getReassignableOptions(lodash.cloneDeep(incompleteList));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    return (
      <>
        <Modal
          centered
          destroyOnClose
          title={
            <div className={styles.messageModalHeader}>
              <Icon component={swap} className={styles.buttonIcon} />
              {formatMessageApi({ Label_COM_Opus: 'ReassignCases' })}
            </div>
          }
          maskClosable={false}
          className={styles.reassignModal}
          visible={visible}
          width={1280}
          onOk={onConfirm}
          onCancel={onCancel}
          cancelText={formatMessageApi({ Label_COM_Opus: 'cancel' })}
          cancelButtonProps={{ className: styles.cancelBtn }}
          okText={formatMessageApi({ Label_COM_Opus: 'Assign' })}
          okButtonProps={{ disabled: !selected.length || !form?.getFieldValue('selectAssignee') }}
        >
          <div className={styles.content}>
            <div className={styles.assignFrom}>
              {user && (
                <div className={styles.staff}>
                  <div className={styles.avatar}>
                    <Avatar name={userName} />
                  </div>
                  <div>
                    <div className={styles.name}>{userName}</div>
                    <div className={styles.id}>{userId}</div>
                  </div>
                </div>
              )}
              <Spin spinning={dropdownLoading}>
                <FormLayout form={form} extraClassName={styles.assigneeSelect} fields={fields} />
              </Spin>
            </div>
            <div className={styles.info}>
              <div className={styles.title}>
                {user
                  ? `${ALL_CASES_FOR} ${userName} (${TO_DO}: ${todoCaseCount}, ${PENDING}: ${pendingCaseCount})`
                  : formatMessageApi({ Label_COM_Opus: 'Cases' })}
              </div>
              <div className={styles.sub}>
                {formatMessageApi({ Label_COM_Opus: 'CasesSelectedToReassign' }, selected.length)}
              </div>
              {!!showClose && (
                <Button
                  shape="circle"
                  icon="close"
                  onClick={() => {
                    handleClear();
                  }}
                  className={styles.clearFilter}
                >
                  {formatMessageApi({ Label_BPM_Button: 'ClearFilter' })}
                </Button>
              )}
            </div>

            <TaskTable
              configs={resultConfigs}
              current={current || 0}
              disableOnRow
              list={user ? incompleteList : sortedList}
              pageSize={PAGE_SIZE}
              total={(user ? total : sortedList.length) || 0}
              hasRowSelect
              selectedRowKeys={selected.map((item: any) => item.id)}
              handleChange={(extraParams: any) => {
                if (user) {
                  dispatch({
                    type: `${NAMESPACE}/getIncompleteCases`,
                    payload: {
                      params: {
                        userId: user.userId,
                      },
                      pageSize: PAGE_SIZE,
                      ...extraParams,
                    },
                  });
                } else {
                  dispatch({
                    type: `${NAMESPACE}/setIncompleteCases`,
                    payload: {
                      pageSize: PAGE_SIZE,
                      ...extraParams,
                    },
                  });
                }
              }}
              handleRowSelection={(selectedRows: any) => {
                setSelected(selectedRows);
              }}
            />
          </div>
        </Modal>
        <MessageModal
          errorMessage={errorMessage}
          selected={selected}
          assign={form.getFieldValue('selectAssignee')}
          showMessageModal={showMessageModal}
          setShowMessageModal={setShowMessageModal}
          onOk={onOk}
          userList={userList}
        />
      </>
    );
  })
);
