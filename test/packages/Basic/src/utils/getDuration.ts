import moment from 'moment';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DurationType from '@/components/CustomForm/Enum/DurationType';
import Time from '../enum/Time';
import DurationFormat from '@/components/CustomForm/Enum/DurationFormat';

export const durationList = {
  year: { show: false, value: null },
  month: { show: false, value: null },
  day: { show: false, value: null },
  hour: { show: false, value: null },
  minute: { show: false, value: null },
  second: { show: false, value: null },
};

const getMonth = (duration: number) => {
  return duration * (30 * 24 * 60 * 60 * 1000);
};

const asMonth = (duration: number, isFirst: boolean = false, isOneShow, needDecimal) => {
  if (isOneShow && needDecimal) {
    return Math.floor((duration / (30 * 24 * 60 * 60 * 1000)) * 10) / 10;
  }
  return isFirst
    ? Math.floor(duration / (30 * 24 * 60 * 60 * 1000))
    : Math.floor((duration / (30 * 24 * 60 * 60 * 1000)) % 12);
};

export const getValue = ({ value, type, isFirstShow, isOneShow, needDecimal, format }: any) => {
  if (!value) return value;
  if (type === Time.month) {
    return asMonth(value, isFirstShow, isOneShow, needDecimal);
  }
  if (format === DurationFormat.report_duration_format_day_ceil) {
    return isFirstShow
      ? Math.ceil(moment.duration(value).as(type))
      : Math.ceil(moment.duration(value).get(type));
  }
  if (isOneShow && needDecimal) {
    return Math.floor(moment.duration(value).as(type) * 10) / 10;
  } else {
    return isFirstShow
      ? Math.floor(moment.duration(value).as(type))
      : Math.floor(moment.duration(value).get(type));
  }
};

export const getDurationList = ({ duration, format, needDecimal }: any) => {
  const showLength = lodash
    .keys(durationList)
    ?.filter((type: string) => lodash.includes(DurationType[type], format)).length;
  const isOneShow = showLength === 1 ? true : false;
  return lodash.keys(durationList)?.reduce((typeMap: any, type: string) => {
    const show = lodash.includes(DurationType[type], format);
    const isFirstShow =
      show &&
      !lodash
        .chain(typeMap)
        .values()
        .some((item: any) => item.show)
        .value();
    return {
      ...typeMap,
      [type]: {
        show,
        value: getValue({ value: duration, type, isFirstShow, isOneShow, needDecimal, format }),
      },
    };
  }, {});
};

export const getDurationNumber = (duratonList: any) => {
  return lodash
    .keys(duratonList)
    .filter((typeStr: string) => duratonList[typeStr]?.show)
    .reduce((duration: number, typeStr: string) => {
      if (typeStr === Time.month) {
        return duration + getMonth(duratonList[typeStr]?.value);
      }
      // @ts-ignore
      return duration + moment.duration(duratonList[typeStr]?.value, typeStr).asMilliseconds();
    }, 0);
};

export const getIsMin = (durationMap: any) =>
  lodash.values(durationMap).filter((item: any) => item.show)?.length >= 2;

export default ({ duration, format, needDecimal = true }: any) => {
  if (lodash.isNil(duration)) return duration;
  const durationList = getDurationList({ duration, format, needDecimal });
  // const isMinFormat = isMin || getIsMin(durationList);
  const newDurationList = lodash
    .chain(durationList)
    .keys()
    .filter((type: string) => durationList[type]?.show)
    .value();
  const newDurationLength = newDurationList?.length;
  return lodash
    .chain(newDurationList)
    .filter((type: string, index: number) => {
      if (newDurationLength > 1) {
        if (index !== newDurationLength - 1) {
          return durationList?.[type]?.value !== 0;
        }
        return true;
      }
      return true;
    })
    .map((type: string) => {
      return `${durationList?.[type]?.value}${formatMessageApi({
        Label_BIZ_Claim: `time.format.min.${type}`,
      })}`;
    })
    .join(' ')
    .value();
};
