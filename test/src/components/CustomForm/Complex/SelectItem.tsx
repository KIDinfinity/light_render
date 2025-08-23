import React, { PureComponent } from 'react';
import { Select, Divider } from 'antd';
import classnames from 'classnames';
import styles from './SelectItem.less';

class SelectItem extends PureComponent<any> {
  state = {
    selectAll: false,
  };

  onChange = (values: any) => {
    const { isShowAll, onChange } = this.props;
    const { selectAll } = this.state;
    if (isShowAll && selectAll) {
      onChange([]);
      return;
    }
    onChange(values);
  };

  onSelect = (key: string) => {
    const { isShowAll, dicts, dictsKey, onChange, value } = this.props;
    const { selectAll } = this.state;
    if (isShowAll) {
      if (selectAll) {
        this.setState({
          selectAll: false,
        });
        onChange(dicts?.map((item: any) => item[dictsKey])?.filter((item: any) => item !== key));
      } else if (!selectAll && value?.length === dicts?.length - 1) {
        this.setState({ selectAll: true });
        onChange([]);
      }
    }
  };

  get propsValue() {
    const { value, isShowAll } = this.props;
    const { selectAll } = this.state;
    if (isShowAll && (selectAll || !value)) {
      return [];
    }
    if (value?.locale_new) {
      return value?.locale_new;
    }
    // 处理dashboard 传过来的数据都放在一起导致国际化显示失败的问题
    // eg: ['TH_CLM_CTG002,TH_GC_CTG01']
    // => ['TH_CLM_CTG002', 'TH_GC_CTG01']
    if (value?.length === 1 && typeof value[0] === 'string' && value[0].includes(',')) {
      return value[0].split(',');
    }
    return typeof value === 'string' ? value?.split(',') ?? [] : value;
  }

  onSelectAll = () => {
    const { onChange } = this.props;
    const { selectAll } = this.state;
    if (!selectAll) {
      onChange([]);
    }
    this.setState({ selectAll: !selectAll });
  };

  render() {
    const { dispatch, children, isShowAll, dicts, dictsKey, dictsValue, ...restProps } = this.props;
    const { selectAll } = this.state;
    const props: any = {
      ...restProps,
      value: this.propsValue,
      onChange: this.onChange,
      onSelect: this.onSelect,
    };

    return (
      <Select
        className={classnames({
          [styles.selectItem]: true,
          [styles.selectAll]: selectAll,
        })}
        dropdownRender={(menu) => (
          <>
            {isShowAll ? (
              <div
                className={classnames({
                  [styles.dropdownRender]: true,
                  [styles.selectAll]: selectAll,
                })}
              >
                <div
                  className={styles.btnSelectAll}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={this.onSelectAll}
                >
                  All
                </div>
                <Divider className={styles.divider} />
                {menu}
              </div>
            ) : (
              menu
            )}
          </>
        )}
        {...props}
        placeholder={isShowAll ? 'All' : props?.placeholder}
      >
        {dicts.map((item: Record<string, any>) => (
          <Select.Option
            key={item[`${dictsKey}`]}
            value={item[`${dictsKey}`]}
            title={item[`${dictsValue}`]}
          >
            {item[`${dictsValue}`]}
          </Select.Option>
        ))}
      </Select>
    );
  }
}

export default SelectItem;
