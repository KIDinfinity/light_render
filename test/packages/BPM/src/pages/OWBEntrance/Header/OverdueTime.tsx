import React, { useState } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { FormItemDatePicker, formUtils } from 'basic/components/Form';

import { Form } from 'antd';
import useTriggerCaseOverdueJobCallback from 'navigator/components/CaseTaskDetail/hooks/useTriggerCaseOverdueJobCallback';
import getInternationalDateTimeFormatByMoment from 'bpm/utils/getInternationalDateTimeFormatByMoment.ts';
import useJudgeNTUWarningDisplay from 'basic/hooks/useJudgeNTUWarningDisplay';

const dueTimeFormat = getInternationalDateTimeFormatByMoment({ timeFormat: 'HH:mm' });
const OverdueTime = Form.create({
  mapPropsToFields(props: any) {
    return formUtils.mapObjectToFields({ overdueTime: props.overdueTime });
  },
})(({ form, overdueTime }: any) => {
  const taskDetail = useSelector(({ processTask }: any) => processTask?.getTask, shallowEqual);
  const ntuDisableFlag = useJudgeNTUWarningDisplay({ taskDetail });
  const taskNotEditablePermission = useSelector(
    (state: any) => state.claimEditable.taskNotEditablePermission
  );
  const taskStatus = useSelector(
    ({ processTask }: any) => processTask?.getTask?.taskStatus,
    shallowEqual
  );
  const editable = false;
  // taskNotEditablePermission ||
  // !lodash.includes([TaskStatus.todo, TaskStatus.pending], taskStatus);
  const [openStatus, setOpenStatus] = useState(false);
  const handleTrigger = useTriggerCaseOverdueJobCallback();

  console.log('editable', { editable, taskNotEditablePermission, taskStatus });

  const onChangeHandler = (value: any) => {
    console.log('value', value, overdueTime);
    if (moment(value).isSame(overdueTime)) {
      return;
    }
    handleTrigger(value);
  };
  return (
    <>
      <span style={{ whiteSpace: 'nowrap' }}>
        {formatMessageApi({ Label_BIZ_Claim: 'dueDate' })}
      </span>
      <Form style={{ width: '140px' }}>
        <FormItemDatePicker
          form={form}
          formName="overdueTime"
          allowClear={false}
          showTime
          format={dueTimeFormat}
          onOpenChange={(status) => {
            console.log('status', status);
            setOpenStatus(status);
            if (!status) {
              onChangeHandler(form.getFieldValue('overdueTime'));
            }
          }}
          onChange={(value) => {
            if (!openStatus) {
              onChangeHandler(value);
            }
          }}
          disabledDate={(current: any) => {
            console.log(
              'current',
              moment(current).format('YYYY/MM/DD HH:mm'),
              moment(current).isBefore(moment(), 'day')
            );
            return moment(current).isBefore(moment(), 'day');
          }}
          disabled={editable || ntuDisableFlag}
          showToday={false}
        />
      </Form>
    </>
  );
});

OverdueTime.displayName = 'OverdueTime';

export default OverdueTime;
