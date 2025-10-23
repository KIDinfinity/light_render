import { addLeave, getLeaveDuration } from '@/services/userCenterUserLeaveControllerService';
import {
  formatMessageApi,
  getDrowDownList,
  formatMessageEnhanced,
} from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import { connect, useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import moment from 'moment';
import CardLayout from 'opus/Components/CardLayout';
import FormLayout from 'opus/Components/FormLayout';
import { LabelCOMLeaveLength } from 'opus/Enums';
import nameSpace from 'opus/Pages/LeaveManagement/_models/nameSpace';
import { ReactComponent as CloseIcon } from 'packages/Opus/Assets/icon-close.svg';
import { ReactComponent as PlusIcon } from 'packages/Opus/Assets/icon-plus.svg';
import { Button, Form, Modal } from 'packages/Opus/Components/Antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Region, tenant } from '@/components/Tenant';

import Confirm from 'opus/Components/Modals/Confirm';
import styles from './index.less';

const { warning, success: successConfirm } = Modal;

const handleReCalculateMap = {
  leaveLength: ({ addLeaveForm, changedValues }: any) => {
    const newLeaveEndDate =
      changedValues.leaveLength === LabelCOMLeaveLength.HalfdayAM ||
      changedValues.leaveLength === LabelCOMLeaveLength.HalfdayPM
        ? addLeaveForm.leaveStartDate
        : addLeaveForm.leaveEndDate;
    return {
      leaveLength: changedValues.leaveLength,
      leaveStartDate: addLeaveForm.leaveStartDate,
      leaveEndDate: newLeaveEndDate,
    };
  },
  leaveStartDate: ({ addLeaveForm, changedValues }: any) => {
    return {
      leaveLength: addLeaveForm.leaveLength,
      leaveStartDate: changedValues.leaveStartDate,
      leaveEndDate:
        addLeaveForm.leaveLength === LabelCOMLeaveLength.Fullday
          ? null
          : changedValues.leaveStartDate,
    };
  },
  leaveEndDate: ({ addLeaveForm, changedValues }: any) => {
    return {
      leaveLength: addLeaveForm.leaveLength,
      leaveStartDate: addLeaveForm.leaveStartDate,
      leaveEndDate: changedValues.leaveEndDate,
    };
  },
};

const AddLeaveForm = ({ form, organizationMemberList = [] }: any) => {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state: any) => state.user.currentUser.userId, shallowEqual);
  const isMember = useSelector(({ opusHome }: any) => opusHome?.isMember);

  useEffect(() => {
    dispatch({
      type: `${nameSpace}/initAddLeaveForm`,
    });
  }, [dispatch]);

  const leaveStartDate = form.getFieldValue('leaveStartDate');
  const leaveEndDate = form.getFieldValue('leaveEndDate');
  const leaveLength = form.getFieldValue('leaveLength');

  const teamMemberOptions = useMemo(() => {
    const myself = {
      key: currentUserId,
      title: formatMessageApi({ Dropdown_USR_LeaveApplicant: 'myself' }),
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
    const isDateEmpty = !leaveStartDate && !leaveEndDate;
    const isOneDay = moment(leaveStartDate).isSame(moment(leaveEndDate), 'day');
    const isAfterToday = moment()
      .add(1, 'days')
      .startOf('day')
      .isSameOrBefore(moment(leaveStartDate));

    if (isDateEmpty) {
      return temp;
    }

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
        disabled: true,
        require: true,
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

  return <FormLayout form={form} extraClassName={styles.addLeaveForm} fields={fields} />;
};

export default connect(({ opusleaveManagement }: any) => ({
  addLeaveForm: opusleaveManagement.addLeaveForm,
}))(
  Form.create({
    onValuesChange({ dispatch, addLeaveForm }: any, changedValues: any) {
      dispatch({
        type: `${nameSpace}/saveAddLeaveForm`,
        payload: { changedValues, type: 'onChange' },
      });

      const reCalculateKey = lodash.keys(handleReCalculateMap);
      if (lodash.some(reCalculateKey, (key) => lodash.has(changedValues, key))) {
        const getParams = handleReCalculateMap[lodash.keys(changedValues)[0]];
        const params = getParams({ addLeaveForm, changedValues });
        dispatch({
          type: `${nameSpace}/calculateDuration`,
          payload: params,
        });
      }
    },
    mapPropsToFields(props: any) {
      const { addLeaveForm } = props;
      return formUtils.mapObjectToFields(addLeaveForm);
    },
  })(({ form, onCancel, onSuccess }: any) => {
    const [loading, setLoading] = useState(false);
    const [showWarn, setShowWarn] = useState(false);
    const currentUserId = useSelector((state: any) => state.user.currentUser.userId, shallowEqual);
    const dispatch = useDispatch();

    const { teamMember, leaveStartDate, leaveEndDate, dailyQuantity } = form.getFieldsValue();
    const format = tenant.region({
      [Region.TH]: 'DD/MM/YYYY',
      [Region.JP]: 'YYYY/MM/DD',
      [Region.HK]: 'DD/MM/YYYY',
    });
    useEffect(() => {
      dispatch({ type: `${nameSpace}/getOrganizationMemberList` });
    }, []);

    const organizationMemberList = useSelector(
      ({ [nameSpace]: modelnamepsace }: any) => modelnamepsace?.organizationMemberList,
      shallowEqual
    );

    const selectedMember = useMemo(() => {
      return organizationMemberList.find((member: any) => member.userId === teamMember);
    }, [organizationMemberList, teamMember]);

    const onCancelAdd = useCallback(() => {
      onCancel();
    }, [onCancel]);

    const onConfirmAdd = useCallback(async () => {
      const {
        teamMember: userId,
        leaveType: newLeaveType,
        leaveLength: newLeaveLength,
      } = form.getFieldsValue();
      const params = {
        endTime: moment(leaveEndDate).format('YYYY-MM-DD 00:00:00'),
        leaveLength: newLeaveLength,
        leaveType: newLeaveType,
        startTime: moment(leaveStartDate).format('YYYY-MM-DD 00:00:00'),
        userId,
      };

      setLoading(true);

      const durationRes = await getLeaveDuration({
        ...lodash.pick(params, ['startTime', 'endTime', 'leaveLength']),
      });

      if (durationRes && durationRes.success) {
        const resultDuration = durationRes.resultData;
        const res = await addLeave({ ...params, actualLeaveWorkDay: resultDuration });

        if (res && res.success) {
          successConfirm({
            title: formatMessageApi({ Label_COM_Opus: 'Success' }),
            width: 500,
            centered: true,
            content: formatMessageEnhanced(
              { Label_COM_WarningMessage: 'MSG_001033' },
              (str) => str,
              <span className={styles.modalStrong}>{selectedMember?.userName}</span>,
              <span className={styles.modalStrong}>{moment(leaveStartDate).format(format)}</span>,
              <span className={styles.modalStrong}>{moment(leaveEndDate).format(format)}</span>,
              <span className={styles.modalStrong}>{resultDuration}</span>,
              (str) => (resultDuration > 1 ? str : '')
            ),
            okText: formatMessageApi({ Label_BPM_Button: 'Close' }),
          });

          dispatch({
            type: `${nameSpace}/initAddLeaveForm`,
          });

          onSuccess();
        }
      }

      setLoading(false);
    }, [onSuccess, leaveEndDate, leaveStartDate]);

    const showConfirm = useCallback(() => {
      form.validateFieldsAndScroll((err: any) => {
        if (!err) {
          setShowWarn(true);
        }
      });
    }, [currentUserId, form, onConfirmAdd, organizationMemberList]);

    const onAdd = useCallback(() => {
      showConfirm();
    }, [showConfirm]);

    const headerOperations = <CloseIcon className={styles.close} onClick={onCancelAdd} />;

    const content = (
      <div className={styles.content}>
        <AddLeaveForm form={form} organizationMemberList={organizationMemberList} />
        <div className={styles.footer}>
          <Button className={styles.cancelBtn} onClick={onCancelAdd}>
            {formatMessageApi({ Label_COM_Opus: 'cancel' })}
          </Button>
          <Button className={styles.saveBtn} type="primary" onClick={onAdd} loading={loading}>
            {formatMessageApi({ Label_BPM_Button: 'save' })}
          </Button>
        </div>
      </div>
    );

    return (
      <>
        <CardLayout
          headerTitle={formatMessageApi({ Label_COM_Opus: 'AddLeave' })}
          headerIcon={PlusIcon}
          headerOperations={headerOperations}
          className={styles.addLeave}
          content={content}
        />
        <Confirm
          show={showWarn}
          handleCancle={() => {
            setShowWarn(false);
          }}
          handleConfirm={() => {
            onConfirmAdd();
          }}
        >
          <div>
            {formatMessageEnhanced(
              { Label_COM_WarningMessage: 'MSG_001031' },
              (str) => str,
              <span className={styles.modalStrong}>{selectedMember?.userName}</span>,
              <span className={styles.modalStrong}>{moment(leaveStartDate).format(format)}</span>,
              <span className={styles.modalStrong}>{moment(leaveEndDate).format(format)}</span>,
              <span className={styles.modalStrong}>{dailyQuantity}</span>,
              (str) => (dailyQuantity > 1 ? str : '')
            )}
          </div>
        </Confirm>
      </>
    );
  })
);
