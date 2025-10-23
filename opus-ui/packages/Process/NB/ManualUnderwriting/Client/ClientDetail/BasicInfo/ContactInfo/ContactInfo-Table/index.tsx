import React from 'react';
import lodash from 'lodash';
import { Icon } from 'antd';
import EditableTable from 'process/NB/ManualUnderwriting/_components/EditableTable';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import useGetContactInfoList from 'process/NB/ManualUnderwriting/_hooks/useGetContactInfoList';
import useHandleExtraConfigCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleExtraConfigCallback';
import useDeleteCurrentRow from 'process/NB/ManualUnderwriting/_hooks/useDeleteCurrentRow';
import useCopyCurrentContactInfoCallback from 'process/NB/ManualUnderwriting/_hooks/useCopyCurrentContactInfoCallback';
import useAutoAddEmptyContactInfo from 'process/NB/ManualUnderwriting/_hooks/useAutoAddEmptyContactInfo';
import useAutoAddMBContact from 'process/NB/ManualUnderwriting/_hooks/useAutoAddMBContact';
import useGetProcessInfo from 'basic/components/Elements/hooks/useGetProcessInfo';
import useGetContactInfoTableDisabled from 'process/NB/ManualUnderwriting/_hooks/useGetContactInfoTableDisabled';
import { tenant, Region } from '@/components/Tenant';
import { ReactComponent as CopyIcon } from '@/assets/copy.svg';
import { localConfig } from './Section';
import EditItem from './Edit';
import classNames from 'classnames';
import styles from './index.less';
import classnames from 'classnames';

export default ({ id, isSubCard }: any) => {
  const contactInfoTableConfig = useGetSectionAtomConfig({
    section: 'ContactInfo-Table',
    localConfig,
  });
  useAutoAddMBContact({ id });
  useAutoAddEmptyContactInfo({ id });
  const gateway = useHandleExtraConfigCallback({ id, isSubCard });
  const finnalConfig = lodash.isFunction(gateway)
    ? gateway({ config: contactInfoTableConfig })
    : contactInfoTableConfig;

  const data = useGetContactInfoList({ id });
  const deleteCurrentRow = useDeleteCurrentRow({ clientId: id });
  const copyCurrentRow = useCopyCurrentContactInfoCallback({ id });
  const rowDisabled = useGetContactInfoTableDisabled();
  const { caseCategory } = useGetProcessInfo();
  const haveContactConfig = lodash.filter(
    finnalConfig,
    (item) => item['field-props'].visible !== 'N'
  );
  return (
    <>
      {!lodash.isEmpty(haveContactConfig) && !lodash.isEmpty(data) && (
        <div className={styles.title}>Contact Information</div>
      )}
      <EditableTable config={finnalConfig}>
        {lodash.map(data, (item: any, index: number) => {
          return (
            <div
              className={classNames(
                styles.itemWarp,
                {
                  [styles.column]: tenant.region() !== Region.ID,
                  [styles.columnID]: tenant.region() === Region.ID,
                },
                styles[caseCategory]
              )}
              key={item?.id}
            >
              <div className={styles.inputwrap}>
                <EditItem
                  gateway={gateway}
                  id={id}
                  contactItemId={item.id}
                  contactSeqNum={item.contactSeqNum}
                  item={item}
                  key={item.id}
                  applicationNo={item?.applicationNo}
                  contactType={item?.contactType}
                  isLast={data.length - 1 === index}
                />
              </div>
              {data.length - 1 !== index && (
                <div className={classnames(styles.btnWrap)}>
                  {/* {index === data?.length - 1 ? (
                  <div className={styles.icon} onClick={() => addRow({ contactItemId: item.id })}>
                    <Icon type="plus" />
                  </div>
                ) : null} */}
                  {!rowDisabled && (
                    <>
                      <div
                        className={styles.icon}
                        onClick={() => deleteCurrentRow({ contactItemId: item.id })}
                      >
                        <Icon type="close" />
                      </div>
                      <div
                        className={classnames(styles.icon, styles.copy)}
                        onClick={() => copyCurrentRow({ contactItemId: item.id })}
                      >
                        <CopyIcon />
                        <span className={styles.copyText}>Copy</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
        <></>
      </EditableTable>
    </>
  );
};
