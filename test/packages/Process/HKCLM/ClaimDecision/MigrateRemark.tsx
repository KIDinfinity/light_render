import React from 'react';
import SectionTitle from 'claim/components/SectionTitle';
import { ElementConfig } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { FormAntCard } from 'basic/components/Form';
import styles from './MigrateRemark.less';
import moment from 'moment';

export default ({ remarkList }: any) => {
  if (!remarkList?.length)
    return null
  return (
    <>
      <SectionTitle
        title={formatMessageApi({
          Label_BIZ_Claim: 'claim.procedure.remark',
        })}
      />
      <div className={styles.remark}>
        <FormAntCard title={
          <ElementConfig.SectionTitle
            prefix={formatMessageApi({
              Label_BIZ_Claim: 'RemarkHistory',
            })}
          />
        }>
          {
            remarkList?.map((remarkObj: any, index: number) => (
              <div className={styles.remarkSection} key={remarkObj?.id || index}>
                <div className={styles.remarkTitle}>
                  {remarkObj?.remarkStage}
                  <div className={styles.remarkTitleRight}>
                    <span>
                      {remarkObj?.updateUser}
                    </span>
                    {!!remarkObj?.remarkDate && moment(remarkObj.remarkDate).format('MM/DD/YYYY HH:mm')}
                  </div>
                </div>
                <div
                  className={styles.remarkContent}
                  dangerouslySetInnerHTML={{ __html: remarkObj?.remarkContent || '' }}
                />
              </div>
            ))
          }
        </FormAntCard>
      </div>
    </>
  )
}

