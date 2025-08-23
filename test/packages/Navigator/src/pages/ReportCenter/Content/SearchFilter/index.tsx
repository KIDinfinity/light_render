import React, { PureComponent } from 'react';
import { Dropdown, Menu, Icon } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import { getFormat } from '../../_utils/getFormatField';
import styles from '../index.less';

const MenuItem = Menu.Item;

interface IProps {
  filterMap: any;
  dispatch: Dispatch;
  reportCode: string;
  columnFieldList: any[];
}
interface IState {
  visible: boolean;
}
class Filter extends PureComponent<IProps, IState> {
  state = {
    visible: false,
  };

  get selectKeys() {
    const { columnFieldList } = this.props;
    return lodash
      .chain(columnFieldList)
      ?.filter((item: any) => !!item.visible)
      ?.map((item: any) => item.fieldName)
      .value();
  }

  onClick = async ({ key }: any) => {
    const { columnFieldList, reportCode, dispatch } = this.props;
    await dispatch({
      type: 'reportCenterController/saveSearchFieldList',
      payload: {
        reportCode,
        columnFieldList: lodash.map(columnFieldList, (item: any) =>
          item?.fieldName === key
            ? {
                ...item,
                visible: !item.visible,
              }
            : item
        ),
      },
    });
  };
  get dropDownList() {
    const { columnFieldList } = this.props;
    return lodash
      .chain(columnFieldList)
      .filter(({ notShowFilterFieldFlag }: any) => !notShowFilterFieldFlag)
      .value();
  }

  get dropdownValue() {
    const { reportCode } = this.props;
    const list = this.dropDownList;
    return (
      <Menu onClick={this.onClick} selectedKeys={this.selectKeys}>
        {lodash.map(list, (item: any) => (
          <MenuItem key={item.fieldName}>{getFormat(item.fieldName, reportCode)}</MenuItem>
        ))}
      </Menu>
    );
  }

  handleMenuClick = (e: any) => {
    if (e.key === '3') {
      this.setState({ visible: false });
    }
  };

  handleVisibleChange = (flag: any) => {
    this.setState({ visible: flag });
  };

  render() {
    const { visible } = this.state;
    return (
      <Dropdown
        overlay={this.dropdownValue}
        onVisibleChange={this.handleVisibleChange}
        visible={visible}
        getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
      >
        <Icon type="bars" className={styles.bars} />
      </Dropdown>
    );
  }
}

export default connect(({ reportCenterController }: any, { reportCode }: any) => ({
  searchFieldList: reportCenterController.reportMetadata?.[reportCode]?.searchFieldList,
  columnFieldList: reportCenterController.reportMetadata?.[reportCode]?.columnFieldList,
}))(Filter);
