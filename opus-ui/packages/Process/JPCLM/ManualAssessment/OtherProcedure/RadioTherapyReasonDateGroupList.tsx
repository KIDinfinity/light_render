import React, { useState } from 'react';
import moment from 'moment';
import { connect, useDispatch, useSelector } from 'dva';
import { Form, Icon } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import className from 'classnames';
import Section, { RadiationDateField as Fields } from './Section';
import styles from './RadioTherapyReasonDateGroupList.less';

const GroupList = ({ form, otherProcedurePayableItem, isAdd }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const dispatch = useDispatch();
  const [hoverIndex, setHoverIndex] = useState('');

  const { radioDateList = [], id, policyNo, duplicateMonthList } = otherProcedurePayableItem;

  const benefitCategory =
    useSelector(
      ({ JPCLMOfClaimAssessment }: any) =>
        JPCLMOfClaimAssessment.claimEntities?.claimPayableListMap?.[
          otherProcedurePayableItem?.payableId
        ]?.benefitCategory
    ) || '';

  const visibleConditions = benefitCategory !== 'CIC';


  return (
    visibleConditions && (
      <div>
        <div className={styles.groupList}>
          <div className={styles.title}>放射线判定日</div>
          <div className={styles.date}>
            <Section form={form} editable={editable} section="OtherProcedure.RadiationDate">
              <Fields.RadioDateList
                isAdd={isAdd}
                radioDateList={radioDateList}
                policyNo={formUtils.queryValue(policyNo)}
                id={id}
              />
            </Section>
          </div>
        </div>
        <div className={styles.list}>
          {lodash.map(radioDateList, (item, index) => (
            <div
              className={className(
                lodash.some(duplicateMonthList, dup => moment(dup).isSame(item, 'month')) ? styles.dateChoose : styles.item
              )}
              key={index}
              onMouseOut={() => {
                lodash.isEmpty(hoverIndex) && setHoverIndex(`${index}`);
              }}
              onMouseLeave={() => {
                !lodash.isEmpty(hoverIndex) && setHoverIndex('');
              }}
            >
              <div className={styles.date}>{moment(item).format('YYYY/MM/DD')}</div>
              {Number(hoverIndex) === index && (
                <div className={styles.close}>
                  {editable && (
                    <Icon
                      onClick={() => {
                        dispatch({
                          type: 'JPCLMOfClaimAssessment/otherProcedurePayableReasonDateGroupRemove',
                          payload: {
                            id,
                            index,
                            isAdd,
                          },
                        });
                      }}
                      type="close"
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  );
};
export default connect()(
  Form.create<any>({
    mapPropsToFields() {
      return formUtils.mapObjectToFields({});
    },
  })(GroupList)
);
