import React from 'react';
import { connect } from 'dva';
import { Form, Input, Select, DatePicker, Row, Col } from 'antd';
import classNames from 'classnames';
import moment from 'moment';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import deleteIcon from 'navigator/assets/delete.svg';
import styles from './SkillSet.less';
import useRegisteForm from '../_hooks/useRegisteForm';
import useUnRegisterForm from '../_hooks/useUnRegisterForm';
import { getDrowDownList } from '@/utils/dictFormatMessage';

enum UserCertificate {
  PARENTKEY = 'userCertificateList',
  ITEMKEY = 'id',
  FORMID = 'userCertificateList',
}
const FormList = (props: any) => {
  const {
    dispatch,
    item,
    form,
    form: { getFieldDecorator },
  }: any = props;
  const certificate = getDrowDownList('certificate');

  useRegisteForm(form, UserCertificate.FORMID);
  useUnRegisterForm(form, UserCertificate.FORMID);

  const handleDelete = async (item) => {
    if (item.id) {
      dispatch({
        type: 'userManagement/deleteCertificateOfFormList',
        payload: {
          id: item.id,
        },
      });
    }
  };

  return (
    <Form item={item}>
      <Row gutter={8}>
        <Col span={6}>
          <Form.Item className={styles.item}>
            {getFieldDecorator('certificateType', {
              rules: [
                {
                  required: true,
                  message: 'Please input the [certificateType]',
                },
              ],
            })(
              <Select
                size="small"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {lodash.map(certificate, (opt) => (
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
                  required: true,
                  message: 'Please input the [certificateName]',
                },
                {
                  max: 60,
                  message: "[certificateName] can't exceed 60",
                },
              ],
            })(<Input size="small" autoComplete="disable-chrome-autofill-mark" />)}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className={styles.item}>
            {getFieldDecorator('certificateResult', {
              rules: [
                {
                  required: true,
                  message: 'Please select the [certificateResult]',
                },
                {
                  max: 60,
                  message: "[certificateResult] can't exceed 20",
                },
              ],
            })(<Input size="small" autoComplete="disable-chrome-autofill-mark" />)}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item className={classNames(styles.item, styles.listDate)}>
            {getFieldDecorator('obtainingDate', {
              rules: [
                {
                  required: true,
                  message: 'Please select the [obtainingDate]',
                },
              ],
            })(<DatePicker format="L" placeholder="" />)}
          </Form.Item>
        </Col>
        <Col span={1} className={styles.deleteList}>
          <span onClick={() => handleDelete(item)}>
            <img src={deleteIcon} alt="del" />
          </span>
        </Col>
      </Row>
    </Form>
  );
};

export default connect(({ userManagement }: any) => ({
  userManagement,
  skillTypeList: userManagement?.getUserManagement?.skillSet?.skillTypeList,
  userCertificateList: userManagement?.getUserManagement?.userCertificateList,
}))(
  Form.create({
    onFieldsChange(props, changedFields) {
      const { dispatch, item }: any = props;
      dispatch({
        type: 'userManagement/saveCertificateItem',
        payload: {
          changedFields: formUtils.onFieldsChangeOfDate(changedFields, ['obtainingDate']),
          id: item.id,
        },
      });
    },
    mapPropsToFields(props) {
      const { item }: any = props;
      return formUtils.mapObjectToFields(item, {
        obtainingDate: (value: any) => (value ? moment(value) : null),
      });
    },
  })(FormList)
);
