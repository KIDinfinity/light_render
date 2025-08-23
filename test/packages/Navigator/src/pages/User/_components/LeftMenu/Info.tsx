import React, { useEffect } from 'react';
import { List, Avatar, Row, Col, Icon } from 'antd';
import {  useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import MCSubscribeUserState from '@mc/MCSubscribe/MCSubscribeUserState.tsx';
import userDefaultIcon from 'navigator/assets/user-default.svg';
import lodash from 'lodash';
import { history } from 'umi';
import { getText } from '../../../Messager/userState';
import styles from './Info.less';

export default () => {
  const dispatch = useDispatch();
  const { userGeneralInfo, organizationInfo, chatStatus }: any = useSelector(
    (state: any) => ({
      userGeneralInfo: state.userManagement.userGeneralInfo,
      organizationInfo: lodash.get(state.userManagement, 'organizationInfo', []),
      chatStatus: state?.chatController?.chatStatus,
    }),
    shallowEqual
  );
  useEffect(() => {
    (async () => {
      const response = await dispatch({
        type: 'userManagement/getUserGeneralInfo',
      });

      if (response?.success) {
        dispatch({
          type: 'chatController/changeChatStatus',
          payload: {
            status: response?.resultData?.status,
          },
        });
      }

      dispatch({
        type: 'userManagement/getOrganizationCode',
      });
    })();
  }, []);
  const handleClick = async () => {
    history.push('/navigator/advancedquery');
    dispatch({
      type: 'advancedQueryController/saveSearchObj',
      payload: {
        searchObj: {
          tabIndex: '3',
          mode: 'card',
        },
      },
    });
    dispatch({
      type: 'advancedQueryController/enter',
      payload: {
        tabIndex: '3',
      },
    });
  };
  return (
    <div className={styles.info}>
      <MCSubscribeUserState />
      <List>
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar src={userGeneralInfo?.avatar ? userGeneralInfo?.avatar : userDefaultIcon} />
            }
            title={userGeneralInfo?.userName}
            description={
              <div>
                <div className={styles.user}>
                  <span>{userGeneralInfo?.userId}</span>
                  <span>{userGeneralInfo?.title}</span>
                </div>
                {lodash.find(organizationInfo,{'owner':userGeneralInfo?.userId}) && (
                  <div className={styles.team} onClick={handleClick}>
                    <Icon type="team" style={{ fontSize: '16px', color: '#636363' }} />
                    <span>
                      {formatMessageApi({
                        Label_BIZ_Claim: 'app.usermanagement.basicInfo.avatar.myteam',
                      })}
                    </span>
                  </div>
                )}
              </div>
            }
          />
          <Row type="flex">
            <Col>
              <div>{getText(chatStatus)}</div>
              <span>
                {formatMessageApi({
                  Label_BIZ_Claim: 'app.usermanagement.basicInfo.avatar.status',
                })}
              </span>
            </Col>
            <Col>
              <div>{userGeneralInfo?.fundPoint}</div>
              <span>
                {formatMessageApi({
                  Label_BIZ_Claim: 'app.usermanagement.basicInfo.avatar.fund-point',
                })}
              </span>
            </Col>
            <Col>
              <div>
                {userGeneralInfo?.effectiveDate
                  ? moment(userGeneralInfo?.effectiveDate).format('L')
                  : null}
              </div>
              <span>
                {formatMessageApi({
                  Label_BIZ_Claim: 'app.usermanagement.basicInfo.avatar.effective-date',
                })}
              </span>
            </Col>
          </Row>
        </List.Item>
      </List>
    </div>
  );
};
