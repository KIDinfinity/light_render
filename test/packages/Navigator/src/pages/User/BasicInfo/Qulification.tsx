import React from 'react';
import {  useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { Row, Col, notification, Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormList from './QulificationFormList';
import AddForm from './QulificationAddForm';
import styles from './QulificationAndSkill.less';

export default () => {
  const { userCertificateList, isShowAddForm, newCertificateTable, forms } = useSelector(
    (state: any) => ({
      forms: state.userManagement?.forms,
      isShowAddForm: state.userManagement.isShowAddForm,
      isRequired: state.userManagement.isRequired,
      newCertificateTable: state.userManagement.newCertificateTable,
      getUserManagement: state.userManagement.getUserManagement,
      userCertificateList: state.userManagement.getUserManagement?.userCertificateList,
    }),
    shallowEqual
  );

  const handerAdd = () => {
    (async () => {
      const dispatch = useDispatch();

      // // 如果是空列表的
      if (userCertificateList.length === 0 && !isShowAddForm) return;
      dispatch({
        type: 'userManagement/changeShowAddForm',
        payload: {
          isShowAddForm: true,
        },
      });

      // 如果新数据都是空的则返回，否则要验证
      if (newCertificateTable.length === 0) return;
      let validateSuccess = true;
      const certificateForm = forms.newCertificateTable;
      certificateForm.validateFields((err: any) => {
        if (err) {
          validateSuccess = false;
        }
      });
      if (!validateSuccess) {
        notification.error({
          message: formatMessageApi({ Label_BIZ_Claim: 'app.usermanagement.submit.error' }),
        });

        return;
      }

      dispatch({
        type: 'userManagement/addCertificate',
        payload: {
          newCertificateTable,
        },
      });
    })();
  };
  const changeFieldList = lodash
    .chain(userCertificateList)
    .map((userCertificateItem) => {
      return lodash.findKey(
        userCertificateItem,
        (item) => item?.value === '' || item?.value === null
      );
    })
    .compact()
    .value();

  const disabled =
    (isShowAddForm || !lodash.isEmpty(changeFieldList)) &&
    (Object.keys(newCertificateTable).length < 4 ||
      lodash.some(newCertificateTable, { value: '' }));

  return (
    <div className={styles.table}>
      <span className={styles.span}>
        {formatMessageApi({
          Label_BIZ_Claim: 'app.usermanagement.basicInfo.table.tag.qulification',
        })}
      </span>
      <div className={styles.body}>
        <Row className={styles.row}>
          <Col span={6} className={styles.col}>
            <span>
              {formatMessageApi({
                Label_BIZ_Claim: 'app.usermanagement.basicInfo.certificate-type',
              })}
            </span>
          </Col>
          <Col span={5} className={styles.col}>
            <span>
              {formatMessageApi({
                Label_BIZ_Claim: 'app.usermanagement.basicInfo.certificate-name',
              })}
            </span>
          </Col>
          <Col span={6} className={styles.col}>
            <span>
              {formatMessageApi({
                Label_BIZ_Claim: 'app.usermanagement.basicInfo.certificate.result',
              })}
            </span>
          </Col>
          <Col span={6} className={styles.col}>
            <span>
              {formatMessageApi({
                Label_BIZ_Claim: 'app.usermanagement.basicInfo.certificate.obtaining-date',
              })}
            </span>
          </Col>
        </Row>

        {lodash
          .chain(userCertificateList)
          .filter((item) => lodash.isPlainObject(item))
          .map((item) => <FormList key={item.id} item={item} />)
          .value()}

        {isShowAddForm && <AddForm />}

        <Button className={styles.add} onClick={() => handerAdd()} disabled={disabled}>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.usermanagement.basicInfo.hander.add',
          })}
        </Button>
      </div>
    </div>
  );
};
