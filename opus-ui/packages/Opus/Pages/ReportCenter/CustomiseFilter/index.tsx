import React, { useState, useEffect } from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { Icon, Checkbox } from 'opus/Components/Antd';

import Buttons from 'opus/Components/Buttons';

import { getFormat } from '../_utils/getFormatField';

import { ReactComponent as IconFilter } from 'opus/Assets/icon-filter.svg';
import { ReactComponent as CloseIcon } from 'packages/Opus/Assets/icon-close.svg';

import styles from './index.less';

const Main = ({ showCustomiseFilter, setCustomiseFilter }: any) => {
  const dispatch = useDispatch();
  const [choiceList, setChoiceList] = useState([]);

  const reportCode =
    useSelector(({ reportCenterController }: any) => reportCenterController?.activeTabKey) || '';

  const list = useSelector(
    ({ reportCenterController }: any) =>
      reportCenterController.reportMetadata?.[reportCode]?.columnFieldList
  );

  useEffect(() => {
    const newChoiceList: any =
      lodash
        .chain(list || [])
        ?.filter(({ visible }: any) => !!visible)
        ?.map(({ fieldName }: any) => fieldName)
        .value() || [];

    setChoiceList(newChoiceList);
  }, [list]);

  return !!showCustomiseFilter ? (
    <div className={styles.filterWrap}>
      <div className={styles.headerWrap}>
        <Icon component={IconFilter} className={styles.filterIcon} />
        <span className={styles.title}> {formatMessageApi({ Label_BPM_Button: 'Customise' })}</span>
        <Icon
          component={CloseIcon}
          className={styles.closeIcon}
          onClick={() => {
            setCustomiseFilter(false);
          }}
        />
      </div>

      <div className={styles.buttonWrap}>
        <Buttons.Apply
          handleApply={() => {
            dispatch({
              type: 'reportCenterController/saveSearchFieldList',
              payload: {
                reportCode,
                columnFieldList: lodash.map(list, (item: any) => ({
                  ...item,
                  visible: lodash.includes(choiceList, item?.fieldName),
                })),
              },
            });
          }}
        />
        <Buttons.Clear
          handleClear={() => {
            dispatch({
              type: 'reportCenterController/saveSearchFieldList',
              payload: {
                reportCode,
                columnFieldList: lodash.map(list, (item: any) => ({
                  ...item,
                  visible: true,
                })),
              },
            });
          }}
        />
      </div>

      <div className={styles.checkBoxWrap}>
        {lodash.map(list, ({ fieldName }: any) => {
          return (
            <div
              className={styles.checkBoxItem}
              key={fieldName}
              onClick={() => {
                const newList: any = lodash.includes(choiceList, fieldName)
                  ? lodash.filter(choiceList, (el: any) => el !== fieldName)
                  : [...choiceList, fieldName];

                setChoiceList(newList);
              }}
            >
              <Checkbox
                className={styles.checkBox}
                checked={lodash.includes(choiceList, fieldName)}
              />
              <span className={styles.name}>{getFormat(fieldName, reportCode)}</span>
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default Main;
