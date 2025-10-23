import React from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { safeParseUtil } from '@/utils/utils';
import classnames from 'classnames';
import styles from './SectionTitle.less';

enum Type {
  Point = 'point',
}

const Title = ({ config, prefix, suffix, type, section }: any) => {
  const target: any = lodash.find(
    config,
    (item: any) => section && item.section?.toLowerCase() === section?.toLowerCase() && !item?.field
  );

  const sectionProps = lodash.isPlainObject(target?.['section-props'])
    ? target?.['section-props']
    : safeParseUtil(target?.['section-props'], {});
  return (
    <div className={classnames(styles.title, { [styles.point]: type === Type.Point })}>
      {prefix}
      {formatMessageApi({
        [sectionProps?.label?.dictTypeCode]: sectionProps.label?.dictCode,
      })}
      {suffix}
    </div>
  );
};

const SectionTitle = ({ section, prefix, suffix, config, type }: any) => {
  return (
    <Title config={config?.configs} section={section} prefix={prefix} suffix={suffix} type={type} />
  );
};

export default SectionTitle;
