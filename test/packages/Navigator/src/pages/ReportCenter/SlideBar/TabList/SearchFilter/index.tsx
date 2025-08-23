import React, { PureComponent } from 'react';
import { Dropdown, Menu, Icon } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import { getFormat } from '../../../_utils/getFormatField';

const MenuItem = Menu.Item;

interface IProps {
  filterMap: any;
  dispatch: Dispatch;
  reportCode: string;
  searchFieldList: any[];
}
interface IState {
  visible: boolean;
}
class Filter extends PureComponent<IProps, IState> {
  state = {
    visible: false,
  };

  get selectKeys() {
    const { searchFieldList } = this.props;
    return lodash
      .chain(searchFieldList)
      ?.filter((item: any) => !!item.visible)
      ?.map((item: any) => item.fieldName)
      .value();
  }

  onClick = async ({ key }: any) => {
    const { searchFieldList, reportCode, dispatch, searchDefault } = this.props;
    const { visible, defaultValue } =
      lodash.chain(searchFieldList).find({ fieldName: key }).value() || {};
    dispatch({
      type: 'reportCenterController/saveSearchFieldList',
      payload: {
        reportCode,
        searchFieldList: lodash.map(searchFieldList, (item: any) => {
          if (item?.fieldName === key) {
            return {
              ...item,
              visible: !item.visible,
            };
          }
          return item;
        }),
      },
    });
    if (key && !visible) {
      dispatch({
        type: 'reportCenterController/saveSearchDefault',
        payload: {
          searchDefault: {
            ...searchDefault?.[reportCode],
            params: {
              ...(searchDefault?.[reportCode]?.params || {}),
              [key]: defaultValue,
            },
          },
          reportCode,
        },
      });
    }
  };

  get dropdownValue() {
    const { searchFieldList, reportCode } = this.props;
    const newSearch = lodash.filter(searchFieldList, (item) => item.visible !== 2);
    return (
      <Menu onClick={this.onClick} selectedKeys={this.selectKeys}>
        {lodash.map(newSearch, (item: any) => (
          <MenuItem key={item.fieldName} visible={item.visible} disabled={item.required}>
            {getFormat(item.fieldName, reportCode)}
          </MenuItem>
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
        <Icon type="bars" className="bars" />
      </Dropdown>
    );
  }
}

export default connect(({ reportCenterController }: any, { reportCode }: any) => ({
  searchFieldList: reportCenterController.reportMetadata?.[reportCode]?.searchFieldList,
  searchDefault: reportCenterController.searchDefault,
}))(Filter);
