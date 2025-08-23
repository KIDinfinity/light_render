import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Input } from 'antd';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './userGroup.less';

interface IProps {
  dispatch: Function;
  allGroup: any[];
  userInfo: any;
  taskNotEditable: boolean;
}

interface IState {
  searchTxt: string;
}

const gutter = [16, 16];
const grid = {
  xs: 12,
  sm: 12,
  md: 8,
  lg: 8,
  xl: 6,
  xxl: 6,
};

// @ts-ignore
@connect(({ permissionMaintenanceController, claimEditable }) => ({
  allGroup: permissionMaintenanceController.allGroup,
  userInfo: permissionMaintenanceController.userInfo,
  taskNotEditable: claimEditable.taskNotEditable,
}))
class UserGroup extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      searchTxt: '',
    };
  }

  searchGroupFn = (ev: any) => {
    ev.persist();
    const val = lodash.get(ev, 'target.value', '');
    this.setState({
      searchTxt: val,
    });
  };

  selUserGroup = async (groupCode: string) => {
    const { dispatch, taskNotEditable } = this.props;
    if (!taskNotEditable) {
      await dispatch({
        type: 'permissionMaintenanceController/selUserGroup',
        payload: {
          groupCode,
        },
      });
    }
  };

  render() {
    const { allGroup, userInfo, taskNotEditable } = this.props;
    const { searchTxt } = this.state;
    let viewGroup;
    if (searchTxt === '') {
      viewGroup = allGroup;
    } else {
      viewGroup = lodash.filter(allGroup, (item) => {
        const groupName = item.groupName.toLowerCase();
        const searchTxtLower = searchTxt.toLowerCase();
        return groupName.indexOf(searchTxtLower) >= 0;
      });
    }
    return (
      <div className={styles.userGroup}>
        <Row gutter={gutter}>
          <Col {...grid}>
            <div className="label">{formatMessageApi({ Label_COM_General: 'UserGroupName' })}:</div>
            <Input
              style={{ width: '100%' }}
              suffix={<Icon type="search" />}
              disabled={taskNotEditable}
              onInput={this.searchGroupFn}
            />
          </Col>
        </Row>
        <Row gutter={gutter} style={{ marginTop: '10px' }}>
          {lodash.map(viewGroup, (item, idx) => (
            <Col key={idx} {...grid}>
              <div
                className={`userGroup${
                  item.groupCode === userInfo.newUserGroupCode ? ' active' : ''
                }${taskNotEditable ? ' disabled' : ''}`}
                onClick={() => this.selUserGroup(item.groupCode)}
              >
                {item.groupName}
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default UserGroup;
