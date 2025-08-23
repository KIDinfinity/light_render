import Empty from '@/components/Empty';
import { Col, Row } from 'antd';
import lodash from 'lodash';
import React from 'react';
import style from './index.less';
import { formatWithPeriod } from '@/utils/precisionUtils';
import classNames from 'classnames';

const SurrenderTableLayout = ({ columns, dataSource, TableLabel, suspenseBalanceDetails }: any) => {
  return (
    <div className={style.detailTable}>
      <div className={style.tableLabel}>{TableLabel}</div>
      <div
        className={classNames(style.table, !!suspenseBalanceDetails && style.suspenseBalanceTable)}
      >
        <Row className={style.tableTitelrow}>
          {lodash.map(columns, (column) => (
            <Col
              span={column.span || 8}
              className={classNames(style.title, {
                [style.value]: lodash.includes(['estimatedValue', 'actualValue'], column?.key),
                [style.suspenseBalanceDetailsTable]: !!suspenseBalanceDetails,
              })}
              title={column.title || ''}
            >
              {column.title}
            </Col>
          ))}
        </Row>
        <div className={style.rowLayout}>
          {lodash.map(dataSource, (dateItem: any) => (
            <Row className={style.row}>
              {lodash.map(columns, (column) => (
                <Col
                  span={column.span || 8}
                  className={classNames(style.col, {
                    [style.value]: lodash.includes(['estimatedValue', 'actualValue'], column?.key),
                    [style.suspenseBalanceDetailsTable]: !!suspenseBalanceDetails,
                  })}
                  title={dateItem[column.key]}
                >
                  {lodash.isFunction(column.render)
                    ? column.render(dateItem)
                    : lodash.isNumber(dateItem[column.key])
                    ? formatWithPeriod(dateItem[column.key], 2, true)
                    : dateItem[column.key]}
                </Col>
              ))}
            </Row>
          ))}
        </div>
        {lodash.isEmpty(dataSource) && <Empty className={style.empty} />}
      </div>
    </div>
  );
};

export default SurrenderTableLayout;
