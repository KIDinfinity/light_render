import React, { useEffect } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Item from './Item';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import { localConfig, SectionTable } from './Section';
import { useSelector, useDispatch } from 'dva';
import AddSection from './AddSection';
import classNames from 'classnames';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const ChangeCustomerInformation = ({ transactionId, config, form, transactionTypeCode }: any) => {
  const dispatch = useDispatch();
  const servicingInit = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.servicingInit
  );
  const changeCustomerInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.changeCustomerInfoList
  );
  const editable = useSectionEditable(EditSectionCodeEnum.ChangeCustomerInfo);
  useEffect(() => {
    if (transactionId) {
      dispatch({
        type: `${NAMESPACE}/changeCustomerInfoInit`,
        payload: {
          transactionId,
        },
      });
    }
  }, [transactionId, servicingInit]);
  const dataSource = lodash.map(changeCustomerInfoList, (item) =>
    formUtils.queryValue(item.clientSeq)
  );

  return (
    <>
      <div className={styles.changeCustomerInfo}>
        {lodash.size(dataSource) > 0 && (
          <SectionTable
            form={form}
            section="ChangeCustomerInformation"
            config={localConfig}
            dataSource={dataSource || []}
            className={styles.hiddencolor}
            classNameHeader={styles.selfTableHeader}
            numberShowRight
          >
            <Item transactionId={transactionId} />
          </SectionTable>
        )}
        <div className={classNames({ [styles.changeCustomerInfoAdd]: editable })}>
          {editable && <AddSection transactionId={transactionId} />}
        </div>
      </div>
    </>
  );
};

export default ChangeCustomerInformation;
