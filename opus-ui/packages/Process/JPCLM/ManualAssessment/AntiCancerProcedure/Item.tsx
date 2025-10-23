import React, { useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import moment from 'moment';
import { Button, Icon } from 'antd';
import { SectionCard } from 'basic/components/Form';
import TherapeuticDate from './TherapeuticDate';
import TherapeuticDrugs from './TherapeuticDrugs';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './Item.less';

const Item = ({ otherProcedureId, antiCancerProcedureItem,idx }: any) => {
  const dispatch = useDispatch();

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const { therapeuticMonth } = antiCancerProcedureItem;

  const therapeuticDateList = lodash.isString(antiCancerProcedureItem.therapeuticDateList)
    ? JSON.parse(antiCancerProcedureItem.therapeuticDateList)
    : antiCancerProcedureItem.therapeuticDateList;
  const [datepickerOpen, setDatepickerOpen] = useState(false);

  const deleteDates = (therapeuticDate: Date) => () => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/therapeuticDateListDelete',
      payload: { otherProcedureId, therapeuticDate },
    });
  };

  const deleteMonth = () => () => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/therapeuticMonthListDelete',
      payload: { otherProcedureId, therapeuticMonth },
    });
  };

  return (
    <SectionCard showButton={!!editable} handleClick={deleteMonth()} className={styles.sectionCard}>
      <div className={styles.TherapeuticDateList}>
        <div className={styles.title}>
          {formatMessageApi({ Label_BIZ_Claim: 'therapeuticDate' })}
        </div>
        <div className={styles.chooseDate}>
          <Button onClick={() => setDatepickerOpen(!!editable)}>choose date</Button>
        </div>
        <div className={styles.TherapeuticDate}>
          <TherapeuticDate
            otherProcedureId={otherProcedureId}
            datepickerOpen={datepickerOpen}
            setDatepickerOpen={(flag) => setDatepickerOpen(flag)}
            therapeuticMonth={therapeuticMonth}
          />
        </div>
      </div>
      <div className={styles.datelist}>
        {lodash.map(therapeuticDateList || [], (therapeuticDate) => (
          <div className={styles.item} key={therapeuticDate}>
            <div className={styles.checkCircle}>
              <Icon type="check-circle" theme="filled" />
            </div>
            <div className={styles.date}>{moment(therapeuticDate).format('YYYY/MM/DD')}</div>
            {lodash.size(therapeuticDateList || []) > 1 && !!editable && (
              <div className={styles.close}>
                <Icon type="close" onClick={deleteDates(therapeuticDate)} />
              </div>
            )}
          </div>
        ))}
      </div>
      <TherapeuticDrugs
        antiCancerProcedureItem={antiCancerProcedureItem}
        otherProcedureId={otherProcedureId}
        idx={idx}
      />
    </SectionCard>
  );
};

export default Item;
