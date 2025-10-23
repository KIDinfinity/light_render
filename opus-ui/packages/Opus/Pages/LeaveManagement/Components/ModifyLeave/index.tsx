import { updateLeave } from '@/services/userCenterUserLeaveControllerService';
import {
  formatMessageApi,
  getDrowDownList,
  formatMessageEnhanced,
} from '@/utils/dictFormatMessage';
import { ReactComponent as CalendarIcon } from 'packages/Opus/Assets/icon-calendar.svg';
import { Icon } from 'opus/Components/Antd';
import { formUtils } from 'basic/components/Form';
import { connect, useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import moment from 'moment';
import FormLayout from 'opus/Components/FormLayout';
import { LabelCOMLeaveLength } from 'opus/Enums';
import nameSpace from 'opus/Pages/LeaveManagement/_models/nameSpace';
import { Avatar } from 'packages/Opus/Components';
import { Form, Modal } from 'packages/Opus/Components/Antd';
import React, { useCallback, useEffect, useMemo } from 'react';
import styles from './index.less';
import { Region, tenant } from '@/components/Tenant';
import { LeaveReasonTag } from 'opus/Pages/Home/Components/LeaveOverview/LeaveList';
import { ReactComponent as modalConfirm } from 'packages/Opus/Assets/icon-modal-confirm.svg';

const { confirm, warning, success: successConfirm } = Modal;

const MODIFY_LEAVE = 'Modify Leave';

export const handleReCalculateMap = {
  leaveLength: ({ editLeaveForm, changedValues }: any) => {
    const newLeaveEndDate =
      changedValues.leaveLength === LabelCOMLeaveLength.HalfdayAM ||
      changedValues.leaveLength === LabelCOMLeaveLength.HalfdayPM
        ? editLeaveForm.leaveStartDate
        : editLeaveForm.leaveEndDate;
    return {
      leaveLength: changedValues.leaveLength,
      leaveStartDate: editLeaveForm.leaveStartDate,
      leaveEndDate: newLeaveEndDate,
    };
  },
  leaveStartDate: ({ editLeaveForm, changedValues }: any) => {
    return {
      leaveLength: editLeaveForm.leaveLength,
      leaveStartDate: changedValues.leaveStartDate,
      leaveEndDate:
        editLeaveForm.leaveLength === LabelCOMLeaveLength.Fullday
          ? null
          : changedValues.leaveStartDate,
    };
  },
  leaveEndDate: ({ editLeaveForm, changedValues }: any) => {
    return {
      leaveLength: editLeaveForm.leaveLength,
      leaveStartDate: editLeaveForm.leaveStartDate,
      leaveEndDate: changedValues.leaveEndDate,
    };
  },
};

const EditLeaveForm = ({ form, organizationMemberList = [] }: any) => {
  const isMember = useSelector(({ opusHome }: any) => opusHome?.isMember);
  const currentUserId = useSelector((state: any) => state.user.currentUser.userId, shallowEqual);

  const leaveStartDate = form.getFieldValue('leaveStartDate');
  const leaveEndDate = form.getFieldValue('leaveEndDate');
  const leaveLength = form.getFieldValue('leaveLength');

  const teamMemberOptions = useMemo(() => {
    const myself = {
      key: currentUserId,
      title: 'Myself',
      value: currentUserId,
    };

    return [
      myself,
      ...(organizationMemberList
        .filter((member: any) => member.userId !== currentUserId)
        .map((member: any) => {
          const { userId, userName, todoTaskCount } = member;

          return {
            key: userId,
            title: `${userName} (${formatMessageApi({
              Dropdown_COM_TaskStatus: 'todo',
            })}:${todoTaskCount})`,
            value: userId,
          };
        }) || []),
    ];
  }, [currentUserId, organizationMemberList]);

  const lengthOptions = lodash.map(getDrowDownList('Dropdown_Opus_leaveLength'), (item: any) => {
    const temp = {
      key: item.dictCode,
      title: item.dictName,
      value: item.dictCode,
      disabled: false,
    };
    const isToday = moment(leaveStartDate).isSame(moment(), 'day');
    const isAfterAM = moment().isAfter(moment().startOf('day'));
    const isAfterPM = moment().isAfter(moment('12:00', 'HH:mm'));
    const ishaflDayAM = item.dictCode === LabelCOMLeaveLength.HalfdayAM;
    const ishaflDayPM = item.dictCode === LabelCOMLeaveLength.HalfdayPM;
    const isOneDay = moment(leaveStartDate).isSame(moment(leaveEndDate), 'day');
    const isAfterToday = moment()
      .add(1, 'days')
      .startOf('day')
      .isSameOrBefore(moment(leaveStartDate));

    if ((!isMember || isAfterToday) && isOneDay) {
      return temp;
    }

    if ((ishaflDayAM || ishaflDayPM) && !isOneDay) {
      temp.disabled = true;
      return temp;
    }

    if (ishaflDayAM && isToday && isAfterAM) {
      temp.disabled = true;
    }
    if (ishaflDayPM && isToday && isAfterPM) {
      temp.disabled = true;
    }
    return temp;
  });

  const leaveTypeOptions = lodash.map(getDrowDownList('Dropdown_Opus_leaveType'), (item: any) => ({
    key: item.dictCode,
    title: item.dictName,
    value: item.dictCode,
  }));

  const fields = useMemo(() => {
    const defaultFields = [
      {
        title: 'Select Team Member',
        labelTypeCode: 'Label_COM_Opus',
        dictCode: 'SelectTeamMember',
        fieldName: 'Select team member',
        field: 'teamMember',
        type: 'select',
        disabled: isMember,
        selectOptions: teamMemberOptions,
        require: true,
      },
      {
        title: 'Select Leave Type',
        labelTypeCode: 'Label_COM_Opus',
        dictCode: 'SelectLeaveType',
        fieldName: 'Select leave type',
        field: 'leaveType',
        type: 'select',
        selectOptions: leaveTypeOptions,
        require: true,
      },
      {
        title: 'Length',
        labelTypeCode: 'Label_COM_Opus',
        dictCode: 'Length',
        fieldName: 'Length',
        field: 'leaveLength',
        type: 'select',
        selectOptions: lengthOptions,
        require: true,
      },
      {
        title: 'Leave Start Date',
        labelTypeCode: 'Label_COM_Opus',
        dictCode: 'LeaveStartDate',
        field: 'leaveStartDate',
        type: 'date',
        placeholder: formatMessageApi({ Label_COM_General: 'select' }),
        require: true,
        disabledDate: (startValue: any) => {
          if (isMember) {
            if (
              !startValue ||
              !leaveEndDate ||
              leaveLength === LabelCOMLeaveLength.HalfdayAM ||
              leaveLength === LabelCOMLeaveLength.HalfdayPM
            ) {
              return !startValue.isSameOrAfter(moment().startOf('day'));
            }
            if (startValue.isSame(leaveEndDate, 'day')) {
              return false;
            }
            return !startValue.isSameOrAfter(moment().startOf('day'));
          } else {
            return false;
          }
        },
      },
      {
        title: 'Leave End Date',
        labelTypeCode: 'Label_COM_Opus',
        dictCode: 'LeaveEndDate',
        field: 'leaveEndDate',
        type: 'date',
        placeholder: formatMessageApi({ Label_COM_General: 'select' }),
        require: true,
        disabled:
          leaveLength === LabelCOMLeaveLength.HalfdayAM ||
          leaveLength === LabelCOMLeaveLength.HalfdayPM,
        disabledDate: (endValue: any) => {
          if (isMember) {
            if (!leaveStartDate || !endValue) {
              return !endValue.isSameOrAfter(moment().startOf('day'));
            }
            if (endValue.isSame(leaveStartDate, 'day')) {
              return false;
            }
            return (
              endValue.valueOf() <= leaveStartDate.valueOf() ||
              !endValue.isSameOrAfter(moment().startOf('day'))
            );
          } else {
            if (!leaveStartDate || !endValue) {
              return false;
            }
            if (endValue.isSame(leaveStartDate, 'day')) {
              return false;
            }
            return endValue.valueOf() <= leaveStartDate.valueOf();
          }
        },
      },
      {
        title: 'Leave Length',
        labelTypeCode: 'Label_COM_Opus',
        dictCode: 'DailyQuantity',
        fieldName: 'Daily quantity',
        field: 'dailyQuantity',
        type: 'number',
        require: true,
        disabled: true,
      },
    ];

    // remote config todo
    return (
      lodash
        .chain(defaultFields)
        // .filter(({ fieldName }: any) => !!lodash.find(configs, { fieldName })) // todo
        .value() || []
    );
  }, [
    teamMemberOptions,
    isMember,
    lengthOptions,
    leaveTypeOptions,
    leaveLength,
    leaveEndDate,
    leaveStartDate,
  ]);

  return <FormLayout form={form} extraClassName={styles.modifyLeaveForm} fields={fields} />;
};

export default connect(({ opusleaveManagement }: any) => ({
  editLeaveForm: opusleaveManagement.editLeaveForm,
}))(
  Form.create({
    onValuesChange({ dispatch, editLeaveForm }: any, changedValues: any) {
      dispatch({
        type: `${nameSpace}/saveEditLeaveForm`,
        payload: { changedValues, type: 'onChange' },
      });

      const reCalculateKey = lodash.keys(handleReCalculateMap);
      if (lodash.some(reCalculateKey, (key) => lodash.has(changedValues, key))) {
        const getParams = handleReCalculateMap[lodash.keys(changedValues)[0]];
        const params = getParams({ editLeaveForm, changedValues });
        dispatch({
          type: `${nameSpace}/calculateDuration`,
          payload: { ...params, isEdit: true },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { editLeaveForm } = props;
      return formUtils.mapObjectToFields(editLeaveForm);
    },
  })(({ form, leaveData, visible, onSuccess, onCancel: onCancelProp }: any) => {
    const dispatch = useDispatch();
    const currentUserId = useSelector((state: any) => state.user.currentUser.userId, shallowEqual);
    const format = tenant.region({
      [Region.TH]: 'DD/MM/YYYY',
      [Region.JP]: 'YYYY/MM/DD',
      [Region.HK]: 'DD/MM/YYYY',
    });
    const organizationMemberList = useSelector(
      ({ [nameSpace]: modelnamepsace }: any) => modelnamepsace?.organizationMemberList,
      shallowEqual
    );

    const {
      id,
      userId,
      userName = '',
      startTime,
      endTime,
      actualLeaveWorkDay,
      userLeaveRequestDetailExtraId,
      leaveType,
    } = leaveData || {};

    const leaveDayStart = moment(startTime).format(format);
    const leaveDayEnd = moment(endTime).format(format);

    const onConfirmModify = useCallback(
      async (params, confirmContent) => {
        const res = await updateLeave(params);

        if (res && res.success) {
          successConfirm({
            title: formatMessageApi({ Label_COM_Opus: 'Success' }),
            width: 500,
            centered: true,
            content: confirmContent,
            okText: formatMessageApi({ Label_BPM_Button: 'Close' }),
          });

          onSuccess();
        }
      },
      [onSuccess]
    );

    const onOk = useCallback(() => {
      const { teamMember, leaveType, leaveStartDate, leaveEndDate, leaveLength, dailyQuantity } =
        form.getFieldsValue();
      const selectedMember = organizationMemberList.find(
        (member: any) => member.userId === teamMember
      );

      form.validateFieldsAndScroll((err: any) => {
        if (!err) {
          confirm({
            icon: <Icon component={modalConfirm} />,
            title: formatMessageApi({ Label_COM_Opus: 'confirmation' }),
            width: 500,
            centered: true,
            content: formatMessageEnhanced(
              { Label_COM_WarningMessage: 'MSG_001036' },
              (str) => (currentUserId !== selectedMember.userId ? str : ''),
              <strong>{selectedMember.userName}</strong>,
              <strong>{moment(leaveStartDate).format(format)}</strong>,
              <strong>{moment(leaveEndDate).format(format)}</strong>,
              <strong>{dailyQuantity}</strong>,
              (str) => (dailyQuantity > 1 ? str : '')
            ),
            okText: formatMessageApi({ Label_BPM_Button: 'Confirm' }),
            cancelText: formatMessageApi({ Label_COM_Opus: 'cancel' }),
            onOk() {
              const params = {
                endTime: moment(leaveEndDate).format('YYYY-MM-DD 00:00:00'),
                id,
                leaveLength,
                leaveType,
                startTime: moment(leaveStartDate).format('YYYY-MM-DD 00:00:00'),
                userId,
                actualLeaveWorkDay: dailyQuantity,
                userLeaveRequestDetailExtraId,
              };

              onConfirmModify(
                params,
                formatMessageEnhanced(
                  { Label_COM_WarningMessage: 'MSG_001038' },
                  (str) => (currentUserId !== selectedMember.userId ? str : ''),
                  <strong>{selectedMember.userName}</strong>,
                  <strong>{moment(leaveStartDate).format(format)}</strong>,
                  <strong>{moment(leaveEndDate).format(format)}</strong>,
                  <strong>{dailyQuantity}</strong>,
                  (str) => (dailyQuantity > 1 ? str : '')
                )
              );
            },
            onCancel() {
              // do nothing
            },
          });
        }
      });
    }, [
      form,
      organizationMemberList,
      currentUserId,
      id,
      userId,
      userLeaveRequestDetailExtraId,
      onConfirmModify,
    ]);

    const onCancel = useCallback(() => {
      onCancelProp();
    }, [onCancelProp]);

    useEffect(() => {
      dispatch({ type: `${nameSpace}/getOrganizationMemberList` });
    }, [dispatch]);

    return (
      <Modal
        centered
        destroyOnClose
        className={styles.modifyLeave}
        title={
          <div className={styles.title}>
            <Icon component={CalendarIcon} style={{ fontSize: '24px' }} />
            <span>{formatMessageApi({ Label_COM_Opus: 'modifyLeave' })}</span>
          </div>
        }
        maskClosable={false}
        visible={visible}
        width={1200}
        onOk={onOk}
        onCancel={onCancel}
        cancelText={formatMessageApi({ Label_COM_Opus: 'cancel' })}
        cancelButtonProps={{ className: styles.cancelBtn }}
        okText={formatMessageApi({ Label_BPM_Button: 'save' })}
      >
        <div className={styles.wrap}>
          <div className={styles.staff}>
            <div className={styles.avatar}>
              <Avatar name={userName} />
            </div>
            <div>
              <div className={styles.name}>{userName}</div>
              <div className={styles.id}>{userId}</div>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.range}>{`${leaveDayStart} - ${leaveDayEnd}`}</div>
            <div className={styles.total}>{`${actualLeaveWorkDay} ${formatMessageApi({
              Label_COM_Opus: `${actualLeaveWorkDay > 1 ? 'day.plural' : 'day.singular'}`,
            })}`}</div>
          </div>
          <div className={styles.tag}>
            <LeaveReasonTag reason={leaveType} />
          </div>
        </div>
        <EditLeaveForm form={form} organizationMemberList={organizationMemberList} />
      </Modal>
    );
  })
);
