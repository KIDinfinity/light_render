import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Section, { TreamentFields as Fields } from './Section';

const ServiceItem = ({ form, benefitItemId, data }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const onChooise = () => {
    if (!formUtils.queryValue(data?.chooise)) {
      dispatch({
        type: `${NAMESPACE}/popUpPableUpdateListMap`,
        payload: {
          id: data.id,
          benefitItemId,
          changedFields: { chooise: true },
        },
      });
    }
  };
  return (
    <div onClick={onChooise}>
      <Section form={form} editable={editable} section="PopUpPayable.Treament">
        <Fields.Chooise serviceItemId={data.id} />
        <Fields.TreamentPayableAmount data={data} />
        <Fields.TreamentPayableDays />
        <Fields.TreatmentNo />
      </Section>
    </div>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { data, benefitItemId, dispatch } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/popUpPableUpdateListMap`,
          payload: {
            id: data.id,
            benefitItemId,
            mapKey: 'treamentListMap',
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { data, index } = props;
      return formUtils.mapObjectToFields({
        ...data,
        treatmentNo: `${formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.treatment-no',
        })} ${Number(index) + 1}`,
      });
    },
  })(ServiceItem)
);
