import React, { useMemo } from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import classnames from 'classnames';
import lodash from 'lodash';
import { Table } from 'antd';
import { fnPrecisionFormat, fnPrecisionParser } from '@/utils/precisionUtils';
import { useGetStatusDatas, useGetCoverageStatus } from './_hooks';
import styles from './index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useGetResize from 'navigator/pages/Home/Watching/_hooks/useGetResize';

interface IProps {
  tsarCalculationCategory: string;
  monthPeriod: any;
  selectedRoleInd: string;
}

const CoverageTsarCalculationCategory = ({
  tsarCalculationCategory,
  monthPeriod,
  selectedRoleInd,
}: IProps) => {
  return (
    <>
      <CoverageType
        selectedRoleInd={selectedRoleInd}
        monthPeriod={monthPeriod}
        tsarCalculationCategory={tsarCalculationCategory}
      />
      <CoverageStatus
        selectedRoleInd={selectedRoleInd}
        monthPeriod={monthPeriod}
        tsarCalculationCategory={tsarCalculationCategory}
      />
    </>
  );
};

const CoverageStatus = ({ tsarCalculationCategory, monthPeriod, selectedRoleInd }: IProps) => {
  const { dataSource, columns }: any = useGetCoverageStatus({
    tsarCalculationCategory,
    monthPeriod,
    selectedRoleInd,
  });

  return (
    (!lodash.isEmpty(dataSource) && (
      <div className={styles.table}>
        <Table rowKey="key" dataSource={dataSource} columns={columns} pagination={false} />
      </div>
    )) ||
    null
  );
};

const CoverageType = ({ tsarCalculationCategory, monthPeriod, selectedRoleInd }: IProps) => {
  const statusDatas = useGetStatusDatas({ tsarCalculationCategory, monthPeriod, selectedRoleInd });

  const scale = useMemo(() => {
    if (statusDatas.isScale)
      return {
        total: { type: 'log', base: 10, tickCount: 5 },
      };
    return {
      total: { tickCount: 5 },
    };
  }, [statusDatas.isScale]);

  const chartHeight = useGetResize(260);
  const fontSize = Math.floor(useGetResize(12));
  const size = Math.floor(useGetResize(25));

  return (
    (!lodash.isEmpty(statusDatas.list) && (
      <div className={classnames(styles.statusWrap, styles.container)}>
        <div className={styles.center}>
          <p className={styles.topTitle}>
            {formatMessageApi({
              Label_Slider_360: tsarCalculationCategory,
            })}
          </p>
          <p className={styles.total}>
            {fnPrecisionFormat(fnPrecisionParser(parseFloat(statusDatas.total)))}
          </p>
          {!!statusDatas.currency && <p className={styles.topTitle}>{statusDatas.currency}</p>}
        </div>
        <div className={styles.charts}>
          <Chart height={chartHeight} data={statusDatas.list} forceFit scale={scale}>
            <Axis
              name="total"
              label={{
                offset: 12,
                textStyle: {
                  fill: '#ffffff',
                  fontSize: fontSize,
                },
              }}
              grid={{
                lineStyle: {
                  stroke: '#666', // 网格线的颜色
                  lineWidth: 1, // 网格线的宽度复制代码
                },
              }}
            />
            <Axis
              name="coverageType"
              label={{
                offset: 12,
                textStyle: {
                  fill: '#ffffff',
                  fontSize: fontSize,
                },
              }}
            />
            {/* 鼠标移上去的显示 */}
            <Tooltip
              position="top"
              useHtml
              htmlContent={(title, items) => {
                //  <div style="position:relative;background:yellow;">
                //    <div style="position:absolute;left:20px;bottom:-8px;width:0;height:0;overflow:hidden;font-size: 0;line-height: 0;border-width:6px;border-style:solid;border-color:#f1941e transparent transparent transparent;"></div>
                //  </div>;
                return `<div class="g2-tooltip" style="position:absolute;">
                          <div style='position:absolute;top:-50px;background:#f1941e;border-radius:4px;padding:4px 6px;'>
                             <div class="g2-tooltip-title">${title} </div>
                             <ul><li>${fnPrecisionFormat(
                               fnPrecisionParser(parseFloat(items[0].value))
                             )}</li></ul>
                          </div>

                        </div>`;
              }}
            />

            <Geom
              type="interval"
              position="coverageType*total"
              size={size}
              color={['total', ['#ff8b00,#ffba1d']]}
            />
          </Chart>
        </div>
      </div>
    )) ||
    null
  );
};

export default CoverageTsarCalculationCategory;
