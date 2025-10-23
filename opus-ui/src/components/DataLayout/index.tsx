import type { ReactNode, CSSProperties } from 'react';
import React, { PureComponent } from 'react';
import lodash from 'lodash';
import { Row, Col } from 'antd';
import DataItem from './DataItem';
import DataWrap from './DataWrap';
import type { ColSpanType, ColProps, RowProps } from './typings';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  span?: ColSpanType;
  children?: ReactNode | string;
  className?: string;
  colProps?: ColProps;
  rowProps?: RowProps;
  style?: CSSProperties;
  styleChilds?: CSSProperties;
  justify?: string;
}

class DataLayout extends PureComponent<IProps> {
  static DataItem = DataItem;

  static DataWrap = DataWrap;

  render() {
    const {
      children: childrenUpper,
      span = 8, // 对所有Col组件生效
      className: classNameUpper,
      colProps = {}, // 对所有Col组件生效，若需要单独设置某个Col的属性，请用DataWrap组件包装，并设置Col的属性
      rowProps = {},
      style = {},
      styleChilds = {},
      justify = 'space-between',
      ...res
    } = this.props;

    return (
      <Row
        className={classNameUpper}
        type="flex"
        gutter={8}
        justify={justify}
        style={style}
        {...rowProps}
        {...res}
      >
        {React.Children.map(childrenUpper, (child) => {
          const {
            children,
            span: childSpan,
            style: styleChild,
            className,
            ...resChild
          } = lodash.get(child, 'props', {});
          const type = lodash.get(child, 'type');

          const isDataWrap = lodash.isFunction(type) && type === DataWrap && type?.name;

          const resProps = isDataWrap ? { ...resChild } : {}; // 子元素被DataWrap组件包装过才应用其传递的属性，否则不应用

          return child ? (
            <Col
              style={{ maxHeight: '100%', ...styleChilds, ...(styleChild || {}) }}
              span={childSpan || span}
              {...colProps}
              {...resProps}
            >
              {child}
            </Col>
          ) : null;
        })}
      </Row>
    );
  }
}

export default DataLayout;
