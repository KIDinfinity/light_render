import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import lodash, { debounce } from 'lodash';
import { Form, Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import mapprops from '@/utils/mapprops';
import { getDocSize } from '@/utils/utils';
import Item from './veticalItem';
import styles from './vetical.less';
import { tenant } from '@/components/Tenant';
import classnames from 'classnames';

class Search extends PureComponent {
  static Item = Item;

  state = {
    expand: true, // 当前展开状态，默认：否。
    searchIsActive: false,
    resetIsActive: false,
    docSize: getDocSize().height,
  };

  componentDidMount() {
    this.setDocSize();
    window.addEventListener('resize', this.setDocSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setDocSize);
  }

  setDocSize = debounce(() => {
    const docSize = getDocSize().height;
    this.setState({ docSize });
  }, 600);

  toggleExpand = () => {
    const { expand } = this.state;

    this.setState({
      expand: !expand,
    });
  };

  handleFormReset = (e) => {
    const { form, onFormReset, setStateOfSearch, handleSearch, handleBtnReset } = this.props;
    this.setState({
      resetIsActive: true,
      searchIsActive: false,
    });
    const newStateOfSearch = { params: {} };

    if (lodash.isFunction(handleBtnReset)) {
      handleBtnReset();
    }

    if (onFormReset) {
      onFormReset(form);
    } else {
      form.resetFields();
      if (setStateOfSearch) {
        // 清空params
        setStateOfSearch(newStateOfSearch, () => {
          if (!tenant.isHK()) handleSearch(e);
        });
      } else {
        if (!tenant.isHK()) handleSearch(e);
      }
    }
  };

  handleBack = () => {
    const { changeSideMode } = this.props;
    if (changeSideMode) {
      changeSideMode(true);
    }
  };

  handleSearchClick = async (e) => {
    const { form, handleSearch, handleSearchReset, handleSearchBefore } = this.props;
    this.setState({
      searchIsActive: true,
      resetIsActive: false,
    });

    if (lodash.isFunction(handleSearchBefore)) {
      await handleSearchBefore();
    }

    form.validateFields((errors) => {
      if (!errors) {
        handleSearch(e, {
          pagination: {
            page: 1,
          },
          sortName: undefined,
          sortSort: undefined,
        });

        if (lodash.isFunction(handleSearchReset)) {
          handleSearchReset();
        }
      }
    });
  };

  handleExportExcelClick = async (e) => {
    const { form, handleExportExcel } = this.props;
    form.validateFields((errors) => {
      if (!errors) {
        handleExportExcel(e, {
          pagination: {
            page: 1,
          },
        });
      }
    });
  };

  get getSearchLoading() {
    const { loading } = this.props;
    const { searchIsActive } = this.state;
    return loading && searchIsActive;
  }

  get getResetLoading() {
    const { loading } = this.props;
    const { resetIsActive } = this.state;
    return loading && resetIsActive;
  }

  get getExportLoading() {
    const { loadingExportExcel } = this.props;
    return loadingExportExcel;
  }

  render() {
    const { form, children, handleSearch, inquireMode, isShowExport } = this.props;

    const { expand } = this.state;
    // 显示展开按钮：
    // 1、搜索控件数量大于1；
    // 2、有simple配置的控件。
    // const showExpand = children.length > 1 && lodash.find(children, c => !c?.props?.simple);

    const operate =
      children.$$typeof || children.length ? (
        <div>
          <span className={styles.operate}>
            <Button
              type="primary"
              onClick={(e) => {
                this.handleSearchClick(e);
              }}
              className={styles.btnSubmit}
              loading={this.getSearchLoading}
            >
              {formatMessageApi({ Label_BIZ_Claim: 'component.tableSearch.search' })}
            </Button>
            <div className={styles.expend}>
              <Button
                onClick={this.handleFormReset}
                loading={this.getResetLoading}
                className={styles.btnReset}
              >
                {formatMessageApi({ Label_BIZ_Claim: 'component.tableSearch.reset' })}
              </Button>

              {/* {showExpand &&
                (expand ? (
                  <a onClick={this.toggleExpand}>
                    <Icon type="up" />
                  </a>
                ) : (
                  <a onClick={this.toggleExpand}>
                    <Icon type="down" />
                  </a>
                ))} */}
            </div>

            {isShowExport && (
              <div className={styles.export}>
                <Button
                  onClick={(e) => {
                    this.handleExportExcelClick(e);
                  }}
                  loading={this.getExportLoading}
                  className={styles.btnReset}
                >
                  {formatMessageApi({ Label_BPM_Button: 'Export' })}
                </Button>
              </div>
            )}

            {inquireMode && (
              <Button onClick={this.handleBack} className={styles.btnBack}>
                {formatMessageApi({ Label_BIZ_Claim: 'component.tableSearch.back' })}
              </Button>
            )}
          </span>
        </div>
      ) : (
        ''
      );
    return (
      <div className={styles.search}>
        <div className={classnames(styles.form, 'guidance-advanced-search-vetical-form')}>
          <Form onSubmit={handleSearch} layout="vertical">
            {mapprops(children, { form, expand })}
          </Form>
        </div>
        <div className={styles.btnGroup}>{operate}</div>
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

export default Search;
