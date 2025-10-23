import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import { Row, Form, Button, Icon, Col } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import mapprops from '@/utils/mapprops';
import Item from './item';
import styles from './index.less';

export default class Search extends PureComponent {
  static Item = Item;

  state = {
    expand: false, // 当前展开状态，默认：否。
  };

  toggleExpand = () => {
    const { expand } = this.state;

    this.setState({
      expand: !expand,
    });
  };

  handleFormReset = (e) => {
    const { form, searchDefault, onFormReset, handleSearch, setSortOrders } = this.props;

    if (onFormReset) {
      onFormReset(form);
    } else {
      form.resetFields();
      handleSearch(e, searchDefault); // 重置为searchDefault
      setSortOrders([]); //
    }
  };

  render() {
    const { form, children, handleSearch } = this.props;
    const { expand } = this.state;

    // 显示展开按钮：
    // 1、搜索控件数量大于1；
    // 2、有simple配置的控件。
    const showExpand = children.length > 1 && lodash.find(children, (c) => !c.props.simple);

    const operate =
      children.$$typeof || children.length ? (
        <Col md={8} sm={24}>
          <span className={styles.operate}>
            <Button
              type="primary"
              onClick={(e) => {
                handleSearch(e, {
                  pagination: {
                    page: 1,
                  },
                });
              }}
              className={styles.btnSubmit}
            >
              {formatMessageApi({ Label_BIZ_Claim: 'component.tableSearch.search' })}
            </Button>
            <Button onClick={this.handleFormReset}>
              {formatMessageApi({ Label_BIZ_Claim: 'component.tableSearch.reset' })}
            </Button>
            {showExpand &&
              (expand ? (
                <a onClick={this.toggleExpand}>
                  {formatMessageApi({ Label_BIZ_Claim: 'component.tableSearch.collapse' })}{' '}
                  <Icon type="up" />
                </a>
              ) : (
                <a onClick={this.toggleExpand}>
                  {formatMessageApi({ Label_BIZ_Claim: 'component.tableSearch.expand' })}{' '}
                  <Icon type="down" />
                </a>
              ))}
          </span>
        </Col>
      ) : (
        ''
      );

    return (
      <div className={styles.search}>
        <div className={styles.form}>
          <Form onSubmit={handleSearch} layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              {mapprops(children, { form, expand })}
              {operate}
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};

Search.defaultProps = {
  children: [],
};
