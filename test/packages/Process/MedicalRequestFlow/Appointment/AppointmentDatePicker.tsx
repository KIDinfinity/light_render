import React from 'react';
import moment from 'moment';
import lodash from 'lodash';
import { connect } from 'dva';
import { Form, DatePicker } from 'antd';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/MedicalRequestFlow/activity.config';
import styles from './index.less';

const AppointmentDate = ({ form }: any) => {
  return (
    <div className={styles.appointmentDate}>
      <Form layout="vertical" hideRequiredMark>
        <Form.Item label="Appointment Date">
          {' '}
          {form.getFieldDecorator('appointmentDate', {
            rules: [],
          })(
            <DatePicker
              className="appointmentDate"
              placeholder=""
              disabled={true}
              format="YYYY/MM/DD HH:mm"
            />
          )}
        </Form.Item>
      </Form>
    </div>
  );
};
export default connect(({ medicalRequestFlow }: any) => ({
  appointmentDateList: medicalRequestFlow?.businessData.appointmentDateList,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveAppointmentDate`,
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { appointmentDateList } = props;
      const appointmentDate = lodash
        .chain(appointmentDateList)
        .find((item) => item.status !== 'reject')
        .get('appointmentDate')
        .value();
      return formUtils.mapObjectToFields({
        appointmentDate: appointmentDate ? moment(appointmentDate) : '',
      });
    },
  })(AppointmentDate)
);
