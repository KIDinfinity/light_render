import React, { useEffect } from 'react';
import lodash from 'lodash';
import { connect, useSelector,  useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { Form, Select } from 'antd';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/MedicalRequestFlow/activity.config';

const HospitalCategory = ({ form, hospitalCategoryValidateStatus }: any) => {
  const dispatch = useDispatch();
  const dicts = useSelector(({ dictionaryController }: any) => {
    return dictionaryController.Dropdown_UW_HospitalCategory;
  }, shallowEqual);
  useEffect(() => {
    if (!dicts) {
      dispatch({
        type: 'dictionaryController/findDictionaryByTypeCodes',
        payload: ['Dropdown_UW_HospitalCategory'],
      });
    }
  }, []);
  return (
    <Form layout="vertical">
      <Form.Item label="Hospital Category" validateStatus={hospitalCategoryValidateStatus}>
        {' '}
        {form.getFieldDecorator('hospitalCategory', {
          rules: [
            {
              required: true,
            },
          ],
        })(
          <Select className="hospitalCategory" placeholder="" allowClear={true}>
            {lodash.map(dicts, (dict) => (
              <Select.Option key={dict.dictCode} value={dict.dictCode}>
                {dict.dictName}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
    </Form>
  );
};
export default connect(({ medicalRequestFlow }: any) => ({
  hospitalCategory: medicalRequestFlow.businessData?.hospitalCategory,
  hospitalCategoryValidateStatus: medicalRequestFlow.hospitalCategoryValidateStatus,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveHospitalCategory`,
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { hospitalCategory } = props;
      return formUtils.mapObjectToFields({ hospitalCategory });
    },
  })(HospitalCategory)
);
