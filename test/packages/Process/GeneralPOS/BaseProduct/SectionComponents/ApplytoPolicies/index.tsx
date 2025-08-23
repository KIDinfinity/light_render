import React from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { FormAntCard } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Item from './Item';
import { localConfig, SectionTable } from './Section';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import { EditSectionCodeEnum, TransactionTypeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const ApplytoPolicies = ({ config, transactionId }: any) => {
  const dispatch = useDispatch();

  const editable = useSectionEditable(EditSectionCodeEnum.ApplytoPolicies);

  const policySortList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.sortApplyListMap?.[transactionId]
    ) || [];
  const applyToPolicyBOList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.applyToPolicyBOList
    ) || [];
  const transactionTypeCode = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.transactionTypeCode
  );
  const taskStatus = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData.taskStatus
  );
  const taxConsent = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.taxConsent
  );
  const check = lodash.every(policySortList, (item) => applyToPolicyBOList.includes(item));

  const tableDisabled = /complete/i.test(taskStatus) || !editable;

  return (
    <>
      {lodash.isEmpty(taxConsent) && transactionTypeCode === TransactionTypeEnum.SRV014 ? (
        <></>
      ) : (
        !lodash.isEmpty(policySortList) && (
          <div className={styles.applytoPolicies}>
            <FormAntCard
              title={formatMessageApi({
                Label_BIZ_Policy: 'ApplytoPolicies',
              })}
            >
              <SectionTable
                section="ApplytoPolicies"
                config={localConfig}
                dataSource={policySortList}
                check={check}
                disabled={tableDisabled}
                classNameHeader={policySortList?.length > 9 ? styles.rowBoxHeader : null}
                rowParentClassName={policySortList?.length > 9 ? styles.rowBox : null}
                onChange={(e: any) => {
                  dispatch({
                    type: `${NAMESPACE}/applytoPoliciesAllUpdate`,
                    payload: {
                      isSelect: e.target.checked,
                      transactionId: transactionId,
                    },
                  });
                }}
              >
                <Item transactionId={transactionId} />
              </SectionTable>
            </FormAntCard>
          </div>
        )
      )}
    </>
  );
};

export default ApplytoPolicies;
