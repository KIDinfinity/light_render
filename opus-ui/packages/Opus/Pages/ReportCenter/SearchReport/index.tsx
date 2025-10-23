import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { TypeEnum } from '@/enum/GolbalAuthority';

import { Icon, Select } from 'opus/Components/Antd';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { ReactComponent as IconDropdown } from 'opus/Assets/icon-select-dropdown.svg';

const { Option } = Select;

import styles from './index.less';

const Main = () => {
  const dispatch = useDispatch();
  const reportListMap = useSelector(
    ({ reportCenterController }: any) => reportCenterController?.reportListMap
  );

  const activeTabKey =
    useSelector(({ reportCenterController }: any) => reportCenterController?.activeTabKey) || '';

  const commonAuthorityList = useSelector(
    ({ authController }: any) => authController?.commonAuthorityList
  );

  const list = useMemo(() => {
    return (
      lodash
        .chain(reportListMap || [])
        .filter((item) =>
          lodash.find(
            commonAuthorityList || [],
            (commonItem) =>
              commonItem.authorityCode === item.reportCode &&
              commonItem.type === TypeEnum.Comm &&
              commonItem.result &&
              item.visible
          )
        )
        .sortBy('sequence')
        .value() || []
    );
  }, [reportListMap, commonAuthorityList]);

  const getReportName = ({ reportCode, reportName }: any) => {
    const transName = formatMessageApi({ Label_COM_ReportCenter: reportCode });

    return transName === reportCode ? reportName : transName;
  };

  const getChoiceReport = async (reportCode: string) => {
    if (activeTabKey !== reportCode) {
      await dispatch({
        type: 'reportCenterController/saveActiveTabInfo',
        payload: {
          activeTabKey: reportCode,
        },
      });
      await dispatch({
        type: 'reportCenterController/findReportMetadata',
        payload: {
          reportCode,
        },
      });
    }
    dispatch({ type: 'reportCenterController/clearCovariance' });
  };

  useEffect(() => {
    if (!activeTabKey && !lodash.isEmpty(list)) {
      getChoiceReport(list?.[0]?.reportCode);
    }
  }, [activeTabKey, list]);

  return (
    <>
      <div className={styles.selectWrap}>
        <span className={styles.label}>
          {formatMessageApi({ Label_COM_ReportCenter: 'selectReport' })}
        </span>
        <div className={styles.item}>
          <Select
            placeholder="Select"
            showSearch
            value={activeTabKey}
            filterOption={(input: any, option: any) =>
              String(option.props.children).toLowerCase().indexOf(String(input).toLowerCase()) >= 0
            }
            onChange={(value: any) => {
              getChoiceReport(value);
            }}
          >
            {lodash.map(list, ({ reportCode, reportName }: any) => (
              <Option key={reportCode} value={reportCode}>
                {getReportName({ reportCode, reportName })}
              </Option>
            ))}
          </Select>
          <Icon component={IconDropdown} />
        </div>
      </div>
    </>
  );
};

export default Main;
