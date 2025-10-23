import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Button, Checkbox, Col, Icon, Row, Spin } from 'antd';
import { Tooltip } from 'opus/Components/Antd';
import lodash from 'lodash';
import moment from 'moment';
import { ReactComponent as iconFavouriteFill } from 'packages/Opus/Assets/icon-favourite-fill.svg';
import { ReactComponent as iconFavourite } from 'packages/Opus/Assets/icon-favourite.svg';
import { ReactComponent as iconTableFilter } from 'packages/Opus/Assets/icon-table-filter.svg';
import { FieldType } from 'packages/Opus/Enums';

import Status from 'opus/Components/Status';
import { formatMessageApiTypeCodeLabel_CLM_Opus as t } from '@/utils/dictFormatMessage';
import React from 'react';
import FormateValue from './FormateValue';
import styles from './index.less';
import { Region, tenant } from '@/components/Tenant';

// 自定义筛选样式
const getColumnSearchProps = ({
  fieldCode: fieldName,
  filterProps: {
    datas = {},
    loading,
    filterChoice,
    handleShow,
    handleChoice,
    handleClear,
    handleSearch,
  },
}: any) => ({
  filterDropdown: ({ confirm }: any) => {
    return (
      <div className={styles.filterWrap}>
        <div className={styles.filterList}>
          {!!loading && (
            <div className={styles.loading}>
              <Spin />
            </div>
          )}
          {lodash.map(datas?.[fieldName], ({ dictCode, dictName }: any) => (
            <div
              className={styles.item}
              key={dictCode}
              onClick={() => {
                handleChoice({ fieldName, dictCode });
              }}
            >
              <Checkbox
                className={styles.checkBox}
                checked={lodash.includes(filterChoice, dictCode)}
              />
              <span className={styles.name}>{dictName}</span>
            </div>
          ))}
        </div>
        <div className={styles.buttonWrap}>
          <Row>
            <Col
              span={12}
              className={styles.title}
              onClick={() => {
                handleClear({ fieldName });
              }}
            >
              Clear
            </Col>
            <Col span={12} className={styles.button}>
              <Button
                onClick={() => {
                  confirm();
                  handleSearch({ fieldName });
                }}
                type="primary"
              >
                Apply
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  },
  filterIcon: () => <Icon component={iconTableFilter} />,

  onFilterDropdownVisibleChange: (visible: boolean) => {
    if (!!visible) {
      handleShow({ fieldName });
    }
  },
});

const Main = ({
  configs,
  sortedInfo,
  localColumns,
  filterProps,
  favouriteProps,
  categoryCode,
}: any) => {
  const getRender = ({ configItem, resultItem }: any) => {
    const { dictTypeCode, fieldCode, fieldType, render }: any = configItem;

    const text = resultItem?.[fieldCode] || '';

    if (!!dictTypeCode) {
      if (fieldCode === 'status') {
        return <Status status={text}> {formatMessageApi({ [dictTypeCode]: text })}</Status>;
      }

      const arrValue = lodash
        .chain(String(text).split(','))
        .map((value: any) => formatMessageApi({ [dictTypeCode]: value }))
        .value();

      const rendrData = arrValue.join();
      if (['activity', 'paymentMethod', 'transactionType'].includes(fieldCode)) {
        return (
          <Tooltip title={rendrData}>
            <div className={styles.tooltip}>{rendrData}</div>
          </Tooltip>
        );
      }
      return rendrData;
    }
    if (String(fieldType) === FieldType.Date) {
      const format = {
        [Region.HK]: 'DD/MM/YYYY',
        [Region.TH]: 'DD/MM/YYYY',
        [Region.JP]: 'YYYY/MM/DD',
      };
      const existsFormat = format[tenant.region()];
      if (text && existsFormat) {
        return moment(text).format(existsFormat);
      }
      return text && moment(text).format('L');
    }
    if (String(fieldType) === FieldType.DateTime) {
      return text && moment(text).format('YYYY/MM/DD HH:mm');
    }
    if (fieldCode === 'favourite') {
      return render(text, resultItem);
    }
    if (fieldCode === 'priority') {
      return String(text) === '1' ? t('urgent') : t('normal');
    }
    if (fieldCode === 'minRemain') {
      const second = Number(String(text).replace(/^[^\d]+/, ''));

      // 获取天数、小时数和分钟数

      const days = Math.floor(second / 86400);
      const hours = Math.floor((second % 86400) / 3600);
      const minutes = Math.floor(((second % 86400) % 3600) / 60);

      const showDay = Number(days) < 10 ? `0${days}` : days;
      const showHours = Number(hours) < 10 ? `0${hours}` : hours;
      const showMinutes = Number(minutes) < 10 ? `0${minutes}` : minutes;

      let showTime = '';
      if (tenant.region() === Region.HK) {
        showTime = `${showDay}:${showHours}:${showMinutes}`;
      } else {
        showTime = `${showDay}:${showMinutes}:${showHours}`;
      }

      const lessThreeHour = days === 0 && hours < 3;
      return !text ? (
        ''
      ) : /^\d/.test(text) ? (
        <span className={!!lessThreeHour && styles.lessThreeHour}>{showTime}</span>
      ) : (
        <span className={styles.errorTime}>{`-${showTime}`}</span>
      );
    }
    if (fieldCode === 'assignee') {
      return lodash.get(resultItem, 'assignee') || lodash.get(resultItem, 'userName');
    }

    if (fieldCode === 'sumAssured' || fieldCode === 'policyGrossPremium') {
      return FormateValue({ value: text, type: fieldCode });
    }
    if (['policyNo', 'policyOwnerName', 'agentName'].includes(fieldCode)) {
      return (
        <Tooltip title={text}>
          <div className={styles.tooltip}>{text}</div>
        </Tooltip>
      );
    }

    return text;
  };

  return !!localColumns
    ? localColumns
    : lodash
        .chain([
          {
            key: 'fieldName',
            title: (
              <Icon
                className={styles.favouriteIcon}
                component={iconFavourite}
                onClick={() => {
                  favouriteProps.handleFavourite({ taskId: '', type: 'all' });
                }}
              />
            ),
            fieldCode: 'favourite',
            sequence: 0,

            render: (favourite: any, { taskId }: any) => {
              return (
                <Icon
                  component={!!favourite ? iconFavouriteFill : iconFavourite}
                  className={styles.favouriteIcon}
                  onClick={(e) => {
                    e.stopPropagation();
                    favouriteProps.handleFavourite({ taskId });
                  }}
                />
              );
            },
          },
          ...configs,
        ])
        .orderBy('sequence')
        .filter(({ fieldCode }: any) => {
          return (
            fieldCode !== 'favourite' ||
            (fieldCode === 'favourite' && !!favouriteProps?.showFavourite)
          );
        })
        .map((configItem) => {
          const formatTitle = formatMessageApi({ [configItem.typeCode]: configItem.dictCode });

          const sort =
            configItem?.fieldCode === sortedInfo?.sortName
              ? {
                  sortOrder: sortedInfo.sortOrder,
                }
              : { sortOrder: '' };
          return {
            ...configItem,
            ...sort,
            key: `${categoryCode}_${configItem.fieldCode}_${configItem.fieldType}`,
            sorter: !!configItem.sortable,
            title: !!configItem.title
              ? configItem.title
              : !!configItem.dictCode
                ? formatTitle !== configItem.dictCode
                  ? formatTitle
                  : configItem.fieldName
                : configItem.fieldName,
            render: (resultItem: any) => {
              return getRender({ resultItem, configItem });
            },
            ...(!!configItem.filter && !!filterProps
              ? getColumnSearchProps({ filterProps, fieldCode: configItem.fieldCode })
              : {}),
          };
        })
        .value() || [];
};

export default Main;
