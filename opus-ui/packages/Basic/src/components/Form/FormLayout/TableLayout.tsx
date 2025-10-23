import React, { useState } from 'react';
import { Row, Col, Checkbox } from 'antd';
import lodash from 'lodash';
import Label from '@/components/ErrorTooltip/Label';
import classNames from 'classnames';
import styles from './TableLayout.less';

const Header = ({
  config,
  visibleFields,
  onChange,
  initCheck,
  check,
  disabled,
  classNameHeader,
  classNameHeaderRow = () => {},
  numberShowRight,
}: any) => {
  const visibleConfigs = lodash.filter(config, (item: any) =>
    lodash.includes(visibleFields, item.field)
  );

  return (
    <>
      <Row
        type="flex"
        className={classNames(
          {
            [styles.tableRowHeader]: true,
            [classNameHeader]: classNameHeader,
          },
          'tableRowHeader'
        )}
      >
        {lodash.map(visibleConfigs, (item) => (
          <Col
            key={item?.field}
            {...item?.['field-props']?.['x-layout']}
            style={{ paddingLeft: '8px', lineHeight: '28px' }}
            className={classNames(classNameHeaderRow(item), {
              [styles.numberShowRight]: item?.fieldType === 'Number' && numberShowRight,
            })}
          >
            <span>
              {item?.['field-props']?.['x-layout']?.xs?.order === 1 &&
              (`${item?.fieldType}`.toLowerCase() === 'checkbox' ||
                `${item?.['field-props']?.type}`.toLowerCase() === 'checkbox') ? (
                <Checkbox
                  onChange={onChange}
                  defaultChecked={initCheck}
                  checked={check}
                  disabled={disabled}
                />
              ) : (
                <Label
                  labelId={item?.['field-props']?.label?.dictCode}
                  labelTypeCode={
                    item?.['field-props']?.label?.dictTypeCode ||
                    item?.['field-props']?.label?.labelTypeCode
                  }
                />
              )}
            </span>
          </Col>
        ))}
      </Row>
    </>
  );
};
Header.displayName = 'TableLayout.Header';

const TableRowMultiData = ({ dataSource, tableCollect = () => {}, children, className }: any) => {
  return (
    <div className={styles.tableRowMultiData}>
      {lodash.map(lodash.isEmpty(dataSource) ? [{}] : dataSource, ({ id, type }, index) => (
        <div
          className={classNames(
            { [styles.tableRowData]: true, [className]: className },
            'tableRowData'
          )}
          key={id}
        >
          {React.cloneElement(children, { id, type, index, tableCollect })}
        </div>
      ))}
    </div>
  );
};

TableRowMultiData.displayName = 'TableLayout.Row.MultiData';

const TableRow = ({
  dataSource,
  tableCollect = () => {},
  children,
  className,
  rowKey,
  rowParentClassName,
  suffixItem,
}: any) => {
  const otherStyle = lodash.isEmpty(dataSource) ? { display: 'none' } : {};
  return (
    <div
      className={classNames({
        [styles.tableRow]: true,
        [rowParentClassName]: rowParentClassName,
      })}
    >
      {lodash.map(lodash.isEmpty(dataSource) ? [{}] : dataSource, (id, index) => (
        <React.Fragment key={rowKey ? id?.[rowKey] : id}>
          <div
            key={rowKey ? id?.[rowKey] : id}
            className={classNames(
              { [styles.tableRowData]: true, [className]: className },
              'tableRowData'
            )}
            style={otherStyle}
          >
            {React.cloneElement(children, { id: rowKey ? id?.[rowKey] : id, index, tableCollect })}
          </div>
          {lodash.isFunction(suffixItem) ? suffixItem(index) : null}
        </React.Fragment>
      ))}
    </div>
  );
};
TableRow.displayName = 'TableLayout.Row';

const TableLayout = ({
  dataSource,
  config,
  onChange = () => {},
  children,
  initCheck = false,
  check = false,
  disabled = false,
  classNameHeader,
  classNameHeaderRow,
  classNameLayout,
  ...props
}: any) => {
  const [visibleFields, setVisibleFields] = useState([] as string[]);

  return (
    <div
      className={classNames(styles.tableLayout, 'tableLayout', {
        [classNameLayout]: classNameLayout,
      })}
    >
      <Header
        config={config}
        visibleFields={visibleFields}
        onChange={onChange}
        initCheck={initCheck}
        check={check}
        disabled={disabled}
        classNameHeader={classNameHeader}
        classNameHeaderRow={classNameHeaderRow}
        {...props}
      />
      {setVisibleFields &&
        React.Children.map(children, (child: any) =>
          React.cloneElement(child, { config, tableCollect: setVisibleFields, dataSource })
        )}
    </div>
  );
};

TableLayout.Header = Header;
TableLayout.Row = TableRow;
TableLayout.RowMultiData = TableRowMultiData;

export default TableLayout;
