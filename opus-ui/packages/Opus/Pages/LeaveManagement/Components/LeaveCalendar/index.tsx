import { deleteLeave as deleteLeaveAPI } from '@/services/userCenterUserLeaveControllerService';
import { formatMessageApi, formatMessageEnhanced } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import classNames from 'classnames';
import { connect, useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import moment from 'moment';
import CardLayout from 'opus/Components/CardLayout';
import FormLayout from 'opus/Components/FormLayout';
import nameSpace from 'opus/Pages/LeaveManagement/_models/nameSpace';
import { ReactComponent as CalendarIcon } from 'packages/Opus/Assets/icon-calendar.svg';
import { ReactComponent as DeleteIcon } from 'packages/Opus/Assets/icon-delete.svg';
import { ReactComponent as EditIcon } from 'packages/Opus/Assets/icon-edit.svg';
import { ReactComponent as PlusIcon } from 'packages/Opus/Assets/icon-plus.svg';
import { Button, Form, Icon, Modal } from 'packages/Opus/Components/Antd';
import TaskTable from 'packages/Opus/Components/TaskTable';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ModifyLeave from '../ModifyLeave';
import styles from './index.less';
import { Region, tenant } from '@/components/Tenant';
import { ReactComponent as modalConfirm } from 'packages/Opus/Assets/icon-modal-confirm.svg';
const { confirm, success: successConfirm } = Modal;

const getShowOperations = (record: any, isMember: boolean, currentUserId: string) => {
  if (!isMember) {
    return true;
  }

  // member不可编辑其他member
  if (record.userId !== currentUserId) {
    return false;
  }

  const targetDate = moment(record?.startTime);
  const tomorrow = moment().add(1, 'days').startOf('day');
  if (targetDate.isSameOrAfter(tomorrow)) {
    return true;
  }

  const now = moment();
  const afternoon = moment().hour(15).minute(0).second(0);
  if (now.isBefore(afternoon) && moment(record?.startTime).isAfter(now)) {
    return true;
  }

  return false;
};
const format = tenant.region({
  [Region.TH]: 'DD/MM/YYYY',
  [Region.JP]: 'YYYY/MM/DD',
  [Region.HK]: 'DD/MM/YYYY',
});
const QueryForm = ({ form }: any) => {
  const fields = useMemo(() => {
    const defaultFields = [
      // {
      //   title: 'Leave Start Date',
      //   labelTypeCode: 'Label_COM_Opus',
      //   dictCode: 'LeaveStartDate',
      //   fieldName: 'Leave start date',
      //   field: 'leaveStartDate',
      //   type: 'date',
      // },
      // {
      //   title: 'Leave End Date',
      //   labelTypeCode: 'Label_COM_Opus',
      //   dictCode: 'LeaveEndDate',
      //   fieldName: 'Leave end date',
      //   field: 'leaveEndDate',
      //   type: 'date',
      // },
      {
        title: 'Leave Range',
        labelTypeCode: 'Label_COM_Opus',
        dictCode: 'LeaveStartDateandEndDate',
        fieldName: 'Leave range',
        field: 'leaveRange',
        type: 'dateRange',
      },
    ];

    // remote config todo
    return (
      lodash
        .chain(defaultFields)
        // .filter(({ fieldName }: any) => !!lodash.find(configs, { fieldName })) // todo
        .value() || []
    );
  }, []);

  return <FormLayout form={form} extraClassName={styles.queryForm} fields={fields} />;
};

export default connect(({ opusleaveManagement }: any) => ({
  leaveRange: opusleaveManagement.leaveTableParams.leaveRange,
}))(
  Form.create({
    name: 'leave_calendar',
    mapPropsToFields(props: any) {
      const { leaveRange } = props;
      return formUtils.mapObjectToFields({
        leaveRange,
      });
    },
    onFieldsChange(props: any, changedFields: any) {
      const { leaveRange } = changedFields;
      const { dispatch } = props;
      dispatch({
        type: `${nameSpace}/saveLeaveRange`,
        payload: {
          leaveRange: formUtils.queryValue(leaveRange),
        },
      });
      dispatch({
        type: `${nameSpace}/getLeaveTable`,
        payload: {
          currentPage: 1,
        },
      });
    },
  })(({ form, showAddLeave, onAddLeave }: any) => {
    const dispatch = useDispatch();
    const isMember = useSelector((state: any) => state.opusHome.isMember, shallowEqual);
    const currentUserId = useSelector((state: any) => state.user.currentUser.userId, shallowEqual);

    const dataSource = useSelector(
      (state: any) => state[nameSpace].leaveTableData?.rows,
      shallowEqual
    );
    const { total = 0, currentPage: current = 1 } = useSelector(
      (state: any) => state[nameSpace].leaveTableData || {},
      shallowEqual
    );

    const [from, to] = form?.getFieldValue('leaveRange') || [];
    const [currentModifyData, setCurrentModifyData] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const getList = useCallback(
      (currentPage?: any) => {
        dispatch({
          type: `${nameSpace}/getLeaveTable`,
          payload: {
            currentPage,
          },
        });
      },
      [dispatch]
    );

    const deleteLeave = useCallback(
      async (id, confirmContent) => {
        const res = await deleteLeaveAPI({ id });
        const { success } = res;

        if (success) {
          successConfirm({
            title: formatMessageApi({ Label_COM_Opus: 'Success' }),
            width: 500,
            centered: true,
            content: confirmContent,
            okText: formatMessageApi({ Label_BPM_Button: 'Close' }),
          });

          getList();
        }
      },
      [getList]
    );

    const onConfirmDelete = useCallback(
      (rowData: any) => {
        const { id, userName, userId, startTime, endTime } = rowData;

        const confirmContent = (
          <span>
            {currentUserId !== userId && (
              <>
                {` for `}
                <strong>{userName}</strong>
              </>
            )}
            {` from `}
            <strong>{moment(startTime).format('L')}</strong>
            {` to `}
            <strong>{moment(endTime).format('L')}</strong>
          </span>
        );

        confirm({
          icon: <Icon component={modalConfirm} />,
          title: formatMessageApi({ Label_COM_Opus: 'confirmation' }),
          width: 500,
          centered: true,
          content: formatMessageEnhanced(
            { Label_COM_WarningMessage: 'MSG_001040' },
            (str) => (currentUserId !== userId ? str : ''),
            <strong>{userName}</strong>,
            <strong>{moment(startTime).format('L')}</strong>,
            <strong>{moment(endTime).format('L')}</strong>
          ),
          okText: formatMessageApi({ Label_BPM_Button: 'Confirm' }),
          cancelText: formatMessageApi({ Label_COM_Opus: 'cancel' }),
          onOk() {
            deleteLeave(
              id,
              formatMessageEnhanced(
                { Label_COM_WarningMessage: 'MSG_001042' },
                (str) => (currentUserId !== userId ? str : ''),
                <strong>{userName}</strong>,
                <strong>{moment(startTime).format('L')}</strong>,
                <strong>{moment(endTime).format('L')}</strong>
              )
            );
          },
        });
      },
      [currentUserId, deleteLeave]
    );

    const onModify = useCallback(
      (row: any) => {
        dispatch({
          type: `${nameSpace}/initEditLeaveForm`,
          payload: { row },
        });
        setCurrentModifyData(row);
        setEditModalVisible(true);
      },
      [dispatch]
    );

    const onCancelModify = useCallback(() => {
      setCurrentModifyData(null);
      setEditModalVisible(false);
    }, []);

    const onModifySuccess = useCallback(() => {
      setCurrentModifyData(null);
      setEditModalVisible(false);
      getList();
    }, [getList]);

    useEffect(() => {
      if (!showAddLeave) {
        getList();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showAddLeave]);

    useEffect(() => {
      // 获取team user列表
      dispatch({
        type: 'homeTaskFlow/flowInit',
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const defaultColumns = [
      {
        fieldName: 'User Name',
        title: formatMessageApi({ Label_COM_General: 'UserName' }),
        id: 'UserName',
        dataIndex: 'userName',
      },
      {
        fieldName: 'Leave Type',
        labelTypeCode: 'Label_COM_Opus',
        dictCode: 'LeaveType',
        title: formatMessageApi({ Label_COM_Opus: 'LeaveType' }),
        id: 'LeaveType',
        dataIndex: 'leaveType',
        render: (text: any) => {
          const type = text ? lodash.camelCase(text) : '';

          return (
            !!text && (
              <div className={classNames(styles.leaveType, { [styles[type]]: !!type })}>
                {formatMessageApi({ Dropdown_Opus_leaveType: text })}
              </div>
            )
          );
        },
      },
      {
        fieldName: 'Start Date',
        id: 'StartDate',
        dataIndex: 'startTime',
        title: formatMessageApi({ Label_COM_Opus: 'LeaveStartDate' }),
        render: (text: any) => {
          return text ? moment(text).format('L') : '-';
        },
      },
      {
        fieldName: 'End Date',
        title: formatMessageApi({ Label_COM_Opus: 'LeaveEndDate' }),
        id: 'EndDate',
        dataIndex: 'endTime',
        render: (text: any) => {
          return text ? moment(text).format('L') : '-';
        },
      },
      {
        fieldName: 'Duration',
        title: formatMessageApi({ Label_COM_Opus: 'DurationDays' }),
        id: 'Duration',
        dataIndex: 'actualLeaveWorkDay',
      },
      {
        fieldName: 'Operations',
        title: formatMessageApi({ Label_COM_Opus: 'Operations' }),
        id: 'Operations',
        render: (text: any, row: any) => {
          const display = getShowOperations(row, isMember, currentUserId);
          return (
            display && (
              <>
                <Button className={styles.modify} onClick={() => onModify(row)}>
                  <Icon component={EditIcon} />
                  {formatMessageApi({ Label_BPM_Button: 'Modify' })}
                </Button>
                <Button className={styles.delete} onClick={() => onConfirmDelete(row)}>
                  <Icon component={DeleteIcon} />
                  {formatMessageApi({ Label_BPM_Button: 'Delete' })}
                </Button>
              </>
            )
          );
        },
      },
    ];

    // remote config todo
    const tableConfigs = defaultColumns;

    const addLeaveBtn = (
      <Button className={styles.addLeaveBtn} type="primary" onClick={onAddLeave}>
        <Icon component={PlusIcon} />
        {formatMessageApi({ Label_COM_Opus: 'AddLeave' })}
      </Button>
    );

    const content = (
      <div className={styles.content}>
        <QueryForm form={form} />
        <div className={styles.title}>
          {formatMessageApi(
            {
              Label_COM_Opus: 'ShowingMembersOnLeave',
            },
            from ? moment(from).format(format) : '/',
            to ? moment(to).format(format) : '/',
            total || 0
          )}
        </div>
        <TaskTable
          configs={tableConfigs}
          current={current}
          localColumns={defaultColumns}
          list={dataSource}
          total={total || 0}
          totalTitle={formatMessageApi({ Label_COM_Opus: 'TotalRecords' }, total)}
          hasRowSelect={false}
          handleChange={({ currentPage }: any) => getList(currentPage)}
        />
        <ModifyLeave
          leaveData={currentModifyData}
          visible={editModalVisible}
          onCancel={onCancelModify}
          onSuccess={onModifySuccess}
        />
      </div>
    );

    return (
      <CardLayout
        headerTitle={formatMessageApi({ Label_COM_Opus: 'LeaveCalendar' })}
        headerIcon={CalendarIcon}
        headerOperations={!showAddLeave && addLeaveBtn}
        className={styles.leaveCalendar}
        content={content}
      />
    );
  })
);
