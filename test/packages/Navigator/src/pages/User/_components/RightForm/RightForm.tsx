import React from 'react';
import { Row, Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useSelector } from 'dva';
import classnames from 'classnames';
import { ReactComponent as OrganizeIcon } from 'navigator/assets/organize.svg';
import { ReactComponent as PersonIcon } from 'navigator/assets/person.svg';
import { ReactComponent as SkillIcon } from 'navigator/assets/skill.svg';
import { ReactComponent as ProcessIcon } from 'navigator/assets/process.svg';
import { ReactComponent as TransationIcon } from 'navigator/assets/transation.svg';
import { ReactComponent as ShieldIcon } from 'navigator/assets/shield.svg';
import { ReactComponent as PermissionGroupIcon } from 'navigator/assets/permission-group.svg';
import styles from './RightForm.less';

// const activeTheme = '';

export default ({ formTitle, children }: any) => {
  const activeTheme = useSelector((state: any) => state.theme.activeTheme);
  return (
    <Row type="flex" className={styles.labelbox}>
      {formTitle === 'person' && (
        <div className={styles.itemHd}>
          <Icon component={PersonIcon} className={styles.personIcon} />
          <span>
            {formatMessageApi({
              Label_BIZ_Claim: 'app.usermanagement.basicInfo.title.person',
            })}
          </span>
        </div>
      )}
      {formTitle === 'changePassword' && (
        <div className={styles.itemHd}>
          <Icon type="lock" />
          <span>
            {formatMessageApi({
              Label_COM_General: 'ChangePassword',
            })}
          </span>
        </div>
      )}
      {formTitle === 'organize' && (
        <div className={styles.itemHd}>
          <Icon component={OrganizeIcon} className={styles.organizeIcon} />
          <span>
            {formatMessageApi({
              Label_BIZ_Claim: 'app.usermanagement.basicInfo.title.organization',
            })}
          </span>
        </div>
      )}
      {formTitle === 'skill' && (
        <div className={styles.itemHd}>
          <Icon component={SkillIcon} className={styles.skillIcon} />
          <span>
            {formatMessageApi({
              Label_BIZ_Claim: 'app.usermanagement.basicInfo.title.skill',
            })}
          </span>
        </div>
      )}
      {formTitle === 'process' && (
        <div className={styles.itemHd}>
          <Icon component={ProcessIcon} className={styles.processIcon} />{' '}
          <span>
            {formatMessageApi({
              Label_BIZ_Claim: 'app.usermanagement.permission.process',
            })}
          </span>
        </div>
      )}
      {formTitle === 'groupName' && (
        <div className={styles.itemHd}>
          <Icon component={PermissionGroupIcon} className={styles.permissiongroupIcon} />{' '}
          <span>
            {formatMessageApi({
              Label_COM_General: 'UserGroup',
            })}
          </span>
        </div>
      )}
      {formTitle === 'comment' && (
        <div className={styles.itemHd}>
          <div className={classnames(styles.commentIcon, styles[activeTheme])} />
          <span style={{ marginTop: '2px' }}>
            {formatMessageApi({
              Label_BIZ_Claim: 'app.usermanagement.permission.common-function',
            })}
          </span>
        </div>
      )}
      {formTitle === 'transaction' && (
        <div className={styles.itemHd}>
          <Icon component={TransationIcon} className={styles.transationIcon} />{' '}
          <span>
            {formatMessageApi({
              Label_COM_UserCenter: 'transactionLimit',
            })}
          </span>
        </div>
      )}
      {formTitle === 'shield' && (
        <div className={styles.itemHd}>
          <Icon component={ShieldIcon} className={styles.shieldIcon} />{' '}
          <span>
            {formatMessageApi({
              Label_BIZ_Claim: 'app.usermanagement.permission.data-masking',
            })}
          </span>
        </div>
      )}
      <div className={styles.formBox}>{children}</div>
    </Row>
  );
};
