import React, { useState } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import moment from 'moment';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { FormItemDatePicker, formUtils } from 'basic/components/Form';
import TaskStatus from 'basic/enum/TaskStatus';
import { Form } from 'antd';
import useTriggerCaseOverdueJobCallback from 'navigator/components/CaseTaskDetail/hooks/useTriggerCaseOverdueJobCallback';
import { Icon } from 'antd';

const OverdueTime = Form.create({
  mapPropsToFields(props: any) {
    return formUtils.mapObjectToFields({ overdueTime: props.overdueTime });
  },
})(({ form, overdueTime }: any) => {
  const taskNotEditablePermission = useSelector(
    (state: any) => state.claimEditable.taskNotEditablePermission
  );
  const taskStatus = useSelector(
    ({ processTask }: any) => processTask?.getTask?.taskStatus,
    shallowEqual
  );
  const editable =
    taskNotEditablePermission ||
    !lodash.includes([TaskStatus.todo, TaskStatus.pending], taskStatus);
  const [openStatus, setOpenStatus] = useState(false);
  const handleTrigger = useTriggerCaseOverdueJobCallback();

  const onChangeHandler = (value: any) => {
    if (moment(value).isSame(overdueTime)) {
      return;
    }
    handleTrigger(value);
  };
  return (
    <>
      <span style={{ whiteSpace: 'nowrap' }}>
        {formatMessageApi({ Label_BIZ_Claim: 'dueDate' })} -
      </span>
      <Form style={{ width: '140px' }}>
        <FormItemDatePicker
          form={form}
          formName="overdueTime"
          allowClear={false}
          showTime
          format="YYYY/MM/DD HH:mm"
          onOpenChange={(status) => {
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
            return moment(current).isBefore(moment(), 'day');
          }}
          disabled={editable}
          showToday={false}
          suffixIcon={<Icon style={{ transform: 'translateX(40px)' }} type="edit" />}
          getCalendarContainer={() => document.body}
        />
      </Form>
    </>
  );
});

OverdueTime.displayName = 'OverdueTime';

export default OverdueTime;
