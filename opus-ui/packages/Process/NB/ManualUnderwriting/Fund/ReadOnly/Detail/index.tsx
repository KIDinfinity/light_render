import React, { useMemo } from 'react';
import lodash from 'lodash';
import { Table, Icon } from 'antd';
import classnames from 'classnames';
import { v5 as uuidv5 } from 'uuid';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import { add } from '@/utils/precisionUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { FormAntCard } from 'basic/components/Form';
import BaseInfo from './BaseInfo';
import styles from './index.less';
import ExpandableContainer from 'basic/components/ExpandableContainer';
import useRecalculateTotalAllocation from 'process/NB/ManualUnderwriting/_hooks/useRecalculateTotalAllocation';

import { NAMESPACE } from '../../../activity.config';
import transTableRowsConfig from 'basic/utils/transTableRowsConfig';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { localConfig } from 'process/NB/ManualUnderwriting/Fund/Fund-Table/Section';

const useGetFundTableColumnsV2 = ({ totalFundInfoList }: any) => {
  const coverageList = useSelector(
    (state: any) => state?.manualUnderwriting?.businessData?.policyList?.[0]?.coverageList,
    shallowEqual
  );

  const config = useGetSectionAtomConfig({
    section: 'Fund-Table',
    localConfig,
  });

  const tableColumns = transTableRowsConfig({
    config,
  });

  const AllocationVisibleByCondition = {
    fundAllocation: () => {
      return lodash.some(coverageList, (item) => item.isMain === 'Y');
    },
    tpaAllocation: () => {
      return lodash.some(totalFundInfoList, (item) => !lodash.isNil(item.tpaAllocation));
    },
    tpaRcdAllocation: () => {
      return lodash.some(totalFundInfoList, (item) => item.fundCode === 'VI07');
    },
    epaAllocation: () => lodash.some(coverageList, (item) => item.productType === 'RT'),
    adHocTopUpAllocation: () => lodash.some(coverageList, (item) => item.productType === 'AT'),
  };

  const filterColunms = lodash
    .chain(tableColumns)
    .map((item) => {
      if (item.key === 'fundCode') {
        return {
          ...item,
          render: (text: any, recode: any) => {
            const fundName = text && `${text} - ${recode?.fundName}`;
            return fundName;
          },
        };
      }

      return {
        ...item,
        render: (text: any, recode: any) => {
          if (recode?.summaryFlag) {
            return React.createElement(
              'span',
              {
                style: {
                  color: 'var(--primary-color)',
                },
              },
              [text]
            );
          }
          return text;
        },
      };
    })
    .filter((item: any) => {
      if (lodash.has(AllocationVisibleByCondition, item?.key)) {
        return AllocationVisibleByCondition?.[item?.key]();
      } else {
        return true;
      }
    })
    .value();

  return filterColunms;
};

const Detail = ({ expendStatus, setExpendStatus }: any) => {
  const fundInfo =
    useSelector(
      ({ [NAMESPACE]: modelnamespace }: any) =>
        modelnamespace.businessData?.policyList?.[0]?.fundInfo,
      shallowEqual
    ) || {};
  const { totalFundInfoList, ...baseInfoData } = fundInfo;
  const allFundConfigList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.allFundConfigList,
    shallowEqual
  );
  const newColumns = useGetFundTableColumnsV2({ totalFundInfoList });

  useRecalculateTotalAllocation(totalFundInfoList);

  const dataSource = useMemo(() => {
    const reduceMap = [
      'fundAllocation',
      'tpaAllocation',
      'tpaRcdAllocation',
      'epaAllocation',
      'adHocTopUpAllocation',
    ];
    const totalItem = lodash.reduce(
      totalFundInfoList,
      (result: any, item: any) => {
        const {
          fundAllocation,
          tpaAllocation,
          tpaRcdAllocation,
          epaAllocation,
          adHocTopUpAllocation,
        } = lodash.pick(item, reduceMap);
        result = {
          ...result,
          fundAllocation: add(fundAllocation, result.fundAllocation || 0),
          tpaAllocation: add(tpaAllocation, result.tpaAllocation || 0),
          tpaRcdAllocation: add(tpaRcdAllocation, result.tpaRcdAllocation || 0),
          epaAllocation: add(epaAllocation, result.epaAllocation || 0),
          adHocTopUpAllocation: add(adHocTopUpAllocation, result.adHocTopUpAllocation || 0),
        };
        return result;
      },
      {
        summaryFlag: true,
        fundCode: '',
        fundCurrency: 'Total',
      }
    );
    const target = lodash.map(totalFundInfoList, (item: any) => ({
      ...item,
      fundName: lodash.find(allFundConfigList, { fundCode: item.fundCode })?.fundName,
    }));
    return [...target, totalItem];
  }, [totalFundInfoList, allFundConfigList]);

  const titleRender = (
    <div className={styles.titleWrap}>
      <span className={styles.title}>
        {formatMessageApi({
          Label_BIZ_FND: 'FundSelection',
        })}
      </span>
      <div className={styles.actions}>
        <Icon type={!expendStatus ? 'down' : 'up'} onClick={() => setExpendStatus(!expendStatus)} />
      </div>
    </div>
  );
  return (
    <FormAntCard
      className={classnames(styles.detail, {
        [styles.hidden]: !expendStatus,
      })}
      title={titleRender}
    >
      {expendStatus && (
        <>
          <BaseInfo className={styles.BaseInfo} data={baseInfoData} />
          <div className={styles.content}>
            <div className={styles.fundTable}>
              <Table
                rowKey={(r: any) => uuidv5(JSON.stringify(r), uuidv5.URL)}
                dataSource={dataSource}
                columns={newColumns}
                pagination={false}
              />
            </div>
          </div>
        </>
      )}
    </FormAntCard>
  );
};

export default () => {
  return (
    <ExpandableContainer sectionId="fund">
      <Detail />
    </ExpandableContainer>
  );
};
