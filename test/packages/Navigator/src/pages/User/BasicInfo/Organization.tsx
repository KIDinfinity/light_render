import React from 'react';
import classnames from 'classnames';
import { Form, Row, Col } from 'antd';
import { useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import RightForm from '../_components/RightForm';
import basicStyles from './index.less';
import styles from './Organization.less';

export default () => {
  const organizationList = useSelector(
    (state: any) => state.userManagement.getUserManagement.organizationList
  );

  return (
    <div className={classnames(basicStyles.layoutBlock, styles.wrap)}>
      <RightForm formTitle="organize">
        <div className={styles.flexbox}>
          <Form>
            <Row gutter={32}>
              <Col span={18}>
                <Form.Item
                  label={formatMessageApi({
                    Label_COM_General: 'OrganizationName',
                  })}
                >
                  {organizationList.organization}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={formatMessageApi({
                    Label_BIZ_Claim: 'app.usermanagement.basicInfo.label.organization.reportTo',
                  })}
                >
                  {organizationList.directSupervisor}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Form>
            <Row gutter={32}>
              <Col span={6}>
                <Form.Item
                  label={formatMessageApi({
                    Label_BIZ_Claim: 'form.title.label',
                  })}
                >
                  {organizationList.title}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={formatMessageApi({
                    Label_BIZ_Claim: 'app.usermanagement.basicInfo.label.organization.titleLevel',
                  })}
                >
                  {organizationList.titleLevel}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={formatMessageApi({
                    Label_BIZ_Claim: 'app.usermanagement.basicInfo.label.organization.position',
                  })}
                >
                  {organizationList.position}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={formatMessageApi({
                    Label_BIZ_Claim:
                      'app.usermanagement.basicInfo.label.organization.positionLevel',
                  })}
                >
                  {organizationList.positionLevel}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </RightForm>
    </div>
  );
};
