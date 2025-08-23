import styles from './chart.less';
import lodash from 'lodash';
import { DataFormat } from '../../Enum';
import { formatValue } from '../../Utils';

interface IUnitData {
  value: string;
  unit: string;
  unitIndex: number;
}

export const getLabelTemp = ({
  color = '#183028',
  fontSize,
  content,
  allowEmpty = false,
  extraStyle = '',
  dataFormat,
  decimal,
  format,
}: {
  color?: string;
  fontSize: number;
  content: string;
  allowEmpty?: boolean;
  extraStyle?: string;
  dataFormat?: string;
  decimal?: number;
  format?: string;
}): string => {
  if (content == '0' && !allowEmpty) {
    return ``;
  }
  return `
    <span class="${styles.labelValue}"  style="font-size: ${fontSize}px; color: ${color}; ${extraStyle} ">
      ${dataFormat ? formatValue({ value: content, decimal, dataFormat, format }) : content}
   </span>`;
};

export const formatNumber = (num: number): IUnitData => {
  if (num === null || num === undefined || num == 0) return { value: '0', unit: '', unitIndex: 0 };

  const units = ['', 'K', 'M', 'B', 'T']; // 单位：千、百万、十亿、万亿
  let unitIndex = 0;

  let tempNum = num;
  while (Math.abs(tempNum) >= 1000 && unitIndex < units.length - 1) {
    tempNum /= 1000;
    unitIndex++;
  }
  // 保留两位小数并添加单位
  return {
    value: `${Number(num / Math.pow(1000, unitIndex)).toFixed(2)}${units[unitIndex]}`,
    unit: units[unitIndex],
    unitIndex,
  };
};

// 取数据中最小的数的单位作为单位
export const getUnit = (datas: Record<string, number>[], valueKey: string) => {
  const min = Math.min(...datas.map((item) => item[valueKey]));
  const formatted = formatNumber(min);
  return formatted.unit;
};

export const dataConvertNum = (datas: any) => {
  return lodash
    .chain(lodash.keys(datas) || [])
    .reduce((arr: any, title: any) => {
      return lodash.isNumber(datas?.[title])
        ? [
            ...arr,
            {
              value: datas?.[title],
              title,
            },
          ]
        : arr;
    }, [])
    .value();
};
export const numConvertData = (datas: any, oldData: any) => {
  return {
    ...lodash.reduce(
      datas || [],
      (obj: any, { title, value }: any) => ({
        ...obj,
        [title]: value,
      }),
      {}
    ),
    ...lodash.reduce(
      lodash.keys(oldData) || [],
      (obj: any, key: any) => {
        return !lodash.isNumber(oldData?.[key])
          ? {
              ...obj,
              [key]: oldData?.[key],
            }
          : obj;
      },
      {}
    ),
  };
};

export const getDataWithUnit = (
  datas: Record<string, number>[],
  valueKey: string,
  dataFormat: DataFormat,
  newCovertData?: boolean
) => {
  let newDatas = !!newCovertData ? dataConvertNum(datas) : datas;

  let unit = '';

  if (
    lodash.includes(
      [DataFormat.number, DataFormat.report_number_format_large_number_convert],
      dataFormat
    )
  ) {
    const mean = lodash.mean(
      lodash
        .chain(newDatas || [])
        .filter((item: any) => !!item[valueKey])
        .map((item: any) => item[valueKey])
        .value() || [0]
    );

    const formatted: IUnitData = formatNumber(mean);

    newDatas = newDatas.map((item: any) => {
      return {
        ...item,
        [valueKey]: (() => {
          const adjustedValue = item[valueKey] / Math.pow(1000, formatted.unitIndex);
          if (
            dataFormat === DataFormat.report_number_format_large_number_convert &&
            formatted.unitIndex === 0 &&
            lodash.indexOf(String(item[valueKey]), '.') > -1
          ) {
            return Number(item[valueKey].toFixed(2));
          }
          return adjustedValue < 1 ? adjustedValue : Math.floor(adjustedValue);
        })(),
      };
    });

    unit = formatted.unit;
  }
  return { datas: !!newCovertData ? numConvertData(newDatas, datas) : newDatas, unit };
};

export const isXAxia = (ev: any) => {
  return ev?.shape?._attrs?.axisType === 'x';
};
