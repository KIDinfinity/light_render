import React from 'react';
import { connect,  useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { Row, Col, Form, Input, Select, DatePicker } from 'antd';
import classNames from 'classnames';
import moment from 'moment';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import deleteIcon from 'navigator/assets/delete.svg';
import styles from './SkillSet.less';
import useRegisteForm from '../_hooks/useRegisteForm';
import useUnRegisterForm from '../_hooks/useUnRegisterForm';
import { getDrowDownList } from '@/utils/dictFormatMessage';

const QulificationAddForm = ({ form }: any) => {
  const dispatch = useDispatch();
  const { getFieldDecorator } = form;
  const { item, isRequired } = useSelector(
    (state: any) => ({
      userManagement: state.userManagement,
      isRequired: state.userManagement.isRequired,
      newCertificateTable: state.userManagement.newCertificateTable,
    }),
    shallowEqual
  );
  const Dropdown_CFG_CertificateType = getDrowDownList('Dropdown_CFG_CertificateType');
  const FORMID = 'newCertificateTable';

  useRegisteForm(form, FORMID);
  useUnRegisterForm(form, FORMID);

  const handleClear = () => {
    dispatch({
      type: 'userManagement/deleteCertificateOfAddForm',
    });
  };

  return (
    <div>
      <Form item={item}>
        <Row gutter={8}>
          <Col span={6}>
            <Form.Item className={styles.item}>
              {getFieldDecorator('certificateType', {
                rules: [
                  {
                    required: isRequired,
                  },
                ],
              })(
                <Select
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {lodash.map(Dropdown_CFG_CertificateType, (opt) => (
                    <Select.Option key={opt.dictCode} value={opt.dictCode}>
                      {opt.dictName}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item className={styles.item}>
              {getFieldDecorator('certificateName', {
                rules: [
                  {
                    required: isRequired,
                  },
                ],
              })(<Input autoComplete="disable-chrome-autofill-mark" />)}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item className={styles.item}>
              {getFieldDecorator('certificateResult', {
                rules: [
                  {
                    required: isRequired,
                  },
                ],
              })(<Input autoComplete="disable-chrome-autofill-mark" />)}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item className={classNames(styles.item, styles.date)}>
              {getFieldDecorator('obtainingDate', {
                rules: [
                  {
                    required: isRequired,
                  },
                ],
              })(<DatePicker format="L" placeholder="" />)}
            </Form.Item>
          </Col>
          <Col span={1} className={styles.delete}>
            <span onClick={() => handleClear()}>
              <img src={deleteIcon} alt="del" />
            </span>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default connect(({ userManagement }: any) => ({
  userManagement,
  isRequired: userManagement.isRequired,
  newCertificateTable: userManagement.newCertificateTable,
}))(
  Form.create({
    onFieldsChange(props, changedFields) {
      const { dispatch }: any = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, ['obtainingDate']);
      dispatch({
        type: 'userManagement/saveNewCertificateItem',
        payload: {
          changedFields: finalChangedFields,
        },
      });
    },
    mapPropsToFields(props) {
      const { newCertificateTable }: any = props;
      return formUtils.mapObjectToFields(newCertificateTable, {
        obtainingDate: (value: any) => (value ? moment(value) : null),
      });
    },
  })(QulificationAddForm)
);
