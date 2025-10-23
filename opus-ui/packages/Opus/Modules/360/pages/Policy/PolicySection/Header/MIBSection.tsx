import { useMemo } from 'react';
import { Table } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './mibSection.less';
import MIBTagList from 'opus/Modules/360/_component/MIBTagList';

export default ({ data }: any) => {
  const fullConfig = useSelector(({ insured360 }: any) => insured360.fieldConfig) || [];

  const columns = useMemo(() => {
    return lodash
      .chain(fullConfig)
      .filter((item: any) => item.sectionId === 'MIB')
      .orderBy('order')
      .map((item: any) => {
        return {
          title: formatMessageApi({
            [item.typeCode]: item.dictCode,
          }),
          render: (text: string, record: any) => {
            if (item.fieldId === 'remark') {
              return record?.remark;
            }
            if (item?.fieldId === 'impairmentCodeList') {
              return <MIBTagList impairmentCodeList={record?.impairmentCodeList} />;
            }

            if (item?.fieldId === 'decisionCode') {
              // return formatMessageApi({
              //   Dropdown_UW_MIBDecision : data?.decisionCode
              // })
              return record?.decisionCode;
            }
          },
        };
      })
      .value();
  }, [fullConfig]);
  return (
    <section className={styles.mibSection}>
      {lodash.isArray(data) && !lodash.isEmpty(data) && (
        <Table columns={columns} dataSource={data} pagination={false} />
      )}
    </section>
  );
};
