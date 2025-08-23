import React, { useRef } from 'react';
import { Form, Row, Col } from 'antd';
import { useSelector } from 'dva';
import moment from 'moment';
import classnames from 'classnames';
import { useSize } from 'ahooks';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import RightForm from '../_components/RightForm';
import Skill from './Skill';
import Qulification from './Qulification';
import basicStyles from './index.less';
import styles from './SkillSet.less';

export default () => {
  const ref = useRef<HTMLDivElement>(null);
  const size = useSize(ref);

  const employmentDate = useSelector(
    ({ userManagement }: any) => userManagement.getUserManagement.skillSet.employmentDate
  );
  const workingYear = useSelector(
    ({ userManagement }: any) => userManagement.getUserManagement.skillSet.workingYear
  );
  const educationLevel = useSelector(
    ({ userManagement }: any) => userManagement.getUserManagement.skillSet.educationLevel
  );

  return (
    <div className={classnames(basicStyles.layoutBlock, styles.wrap)}>
      <RightForm formTitle="skill">
        <div className={styles.content}>
          <div className={styles.contentForm}>
            <Form layout="vertical">
              <Row gutter={32}>
                <Col span={6}>
                  <Form.Item
                    label={formatMessageApi({
                      Label_BIZ_Claim: 'app.usermanagement.basicInfo.label.skill.employmentDate',
                    })}
                  >
                    {employmentDate ? moment(employmentDate).format('L') : null}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label={formatMessageApi({
                      Label_BIZ_Claim: 'app.usermanagement.basicInfo.label.skill.workingYears',
                    })}
                  >
                    {workingYear}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label={formatMessageApi({
                      Label_BIZ_Claim: 'app.usermanagement.basicInfo.label.skill.educationLevel',
                    })}
                  >
                    {educationLevel}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
          <div ref={ref}>
            <Row gutter={16}>
              <Col span={(size?.width ?? 1000) > 770 ? 12 : 24}>
                <Skill />
              </Col>
              <Col span={(size?.width ?? 1000) > 770 ? 12 : 24}>
                <Qulification />
              </Col>
            </Row>
          </div>
        </div>
      </RightForm>
    </div>
  );
};
