import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Ellipsis from '@/components/Ellipsis';
import getAmount from 'basic/utils/getAmount';
import moment from 'moment';
import lodash from 'lodash';
import getDuration from 'basic/utils/getDuration';
import Format from '../Enum/Format';
import DateFormat from '../Enum/DateFormat';

const getGroupRender = ({ separator, text, callback, validate = true }: any) => {
  return (
    // @ts-ignore
    <Ellipsis tooltip lines={3}>
      {validate && !lodash.isNil(text) && text
        ? lodash.map(String(text)?.split(separator), callback)?.join(separator)
        : text}
    </Ellipsis>
  );
};

export default ({
  fieldName,
  componentType,
  dictionary,
  format,
  separator: propSeparator,
}: any) => {
  const separator = propSeparator || ',';
  const RenderMap = {
    text: {
      render: (text: any) => {
        return getGroupRender({
          separator,
          text,
          validate: dictionary[fieldName],
          callback: (el: string) => formatMessageApi({ [dictionary[fieldName]]: el }),
        });
      },
    },
    date: {
      render: (text: any) =>
        getGroupRender({
          separator,
          text,
          callback: (date: string) =>
            moment(date).isValid() ? moment(date).format(DateFormat[format] || 'L') : date,
        }),
    },
    date_time: {
      render: (text: any) => {
        return getGroupRender({
          separator,
          text,
          callback: (date: any) =>
            moment(date).isValid() ? moment(date).format(DateFormat[format] || 'L LTS') : date,
        });
      },
    },
    duration_time: {
      render: (text: any) =>
        getGroupRender({
          separator,
          text,
          callback: (date: any) =>
            moment(Number(date)).isValid()
              ? moment(Number(date)).diff(moment(0), 'day') +
                'd ' +
                (moment(Number(date)).diff(moment(0), 'hours') % 24) +
                'h' +
                moment(Number(date)).format(' mm[m]')
              : date,
        }),
    },
    number: {
      render: (text: any) => {
        return getGroupRender({
          separator,
          text,
          validate: text && format === Format.report_number_format_amount,
          callback: (num: any) => getAmount(num),
        });
      },
    },
    duration: {
      render: (text: number) => {
        return getGroupRender({
          separator,
          text,
          callback: (duration: any) => getDuration({ duration, format }),
        });
      },
    },
  };

  return RenderMap[componentType] || {};
};
