import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import moment from 'moment';
import { Row, Col } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import CommonEmpty from '@/components/Empty';
import styles from './QulificationAndSkill.less';

export default () => {
  const skillTypeList = useSelector(
    (state: any) => state.userManagement?.getUserManagement?.skillSet?.skillTypeList
  );
  const nullText = <CommonEmpty />;

  return (
    <div className={styles.table}>
      <span className={styles.span}>
        {formatMessageApi({
          Label_BIZ_Claim: 'app.usermanagement.basicInfo.table.tag.skill',
        })}
      </span>
      {skillTypeList.length === 0 ? (
        <div className={styles.null}> {nullText}</div>
      ) : (
        <div className={styles.body}>
          <Row className={styles.row}>
            <Col span={6} className={styles.col}>
              <span>
                {formatMessageApi({
                  Label_BIZ_Claim: 'app.usermanagement.basicInfo.label.skill.type',
                })}
              </span>
            </Col>
            <Col span={5} className={styles.col}>
              <span>
                {formatMessageApi({
                  Label_BIZ_Claim: 'app.usermanagement.basicInfo.label.skill.code',
                })}
              </span>
            </Col>
            <Col span={6} className={styles.col}>
              <span>
                {formatMessageApi({
                  Label_BIZ_Claim: 'app.usermanagement.basicInfo.label.skill.level',
                })}
              </span>
            </Col>
            <Col span={6} className={styles.col}>
              <span>
                {formatMessageApi({
                  Label_BIZ_Claim: 'app.usermanagement.basicInfo.label.skill.setting-date',
                })}
              </span>
            </Col>
          </Row>

          {lodash
            .chain(skillTypeList)
            .filter((item) => lodash.isPlainObject(item))
            .map((item) => (
              <div key={item.id} className={styles.skillList}>
                <Row className={styles.row} style={{ borderBottom: 'none' }}>
                  <Col span={6} className={styles.col}>
                    <span>{item?.skillType}</span>
                  </Col>
                  <Col span={5} className={styles.col}>
                    <span>{item?.skillCode}</span>
                  </Col>
                  <Col span={6} className={styles.col}>
                    {item?.skillLevel}
                  </Col>
                  <Col span={6} className={styles.col}>
                    {item.gmtModified ? moment(item?.gmtModified).format('L') : null}
                  </Col>
                </Row>
              </div>
            ))
            .value()}
        </div>
      )}
    </div>
  );
};
