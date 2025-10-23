import React from 'react';
import { NAMESPACE } from '../activity.config';
import lodash from 'lodash';
import { Form } from 'antd';
import { connect, useDispatch } from 'dva';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Procedure, Service, Treament, OtherProcedure, Life } from './Configs/Sections';

const ListItem = ({ form, data, chooise, benefitItemData, listMapItemId }: any) => {
  const dispatch = useDispatch();

  const defaultProps = {
    form,
    data,
  };

  const onChooise = async () => {
    if (!formUtils.queryValue(chooise)) {
      if (benefitItemData?.benefitCategory === eBenefitCategory.Reimbursement) {
        await dispatch({
          type: `${NAMESPACE}/calcuPopPayableTotalVal`,
          payload: {
            benefitItemId: benefitItemData.id,
            listMapItemId,
            serviceItemId: data.serviceItemId,
            id: data.id,
          },
        });
      }
      dispatch({
        type: `${NAMESPACE}/popUpPableUpdateListMapChoice`,
        payload: {
          benefitItemId: benefitItemData.id,
          listMapItemId,
          changedFields: {
            chooise: true,
          },
        },
      });
    }
  };

  const mapSection = {
    [eBenefitCategory.Cashless]: <Treament {...defaultProps} />,
    [eBenefitCategory.Aipa]: <Treament {...defaultProps} />,
    [eBenefitCategory.Reimbursement]: <Service {...defaultProps} />,
    [eBenefitCategory.S]: <Procedure {...defaultProps} />,
    [eBenefitCategory.Crisis]: <OtherProcedure {...defaultProps} />,
    [eBenefitCategory.Life]: <Life {...defaultProps} />,
  };

  return <div onClick={onChooise}>{mapSection?.[benefitItemData?.benefitCategory]}</div>;
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const {
        data,
        benefitItemData: { id: benefitItemId },
        listMapItemId,
        dispatch,
      } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        const reduceName =
          lodash.size(changedFields) === 1 && lodash.has(changedFields, 'chooise')
            ? 'popUpPableUpdateListMapChoice'
            : 'popUpPableUpdateListMap';

        dispatch({
          type: `${NAMESPACE}/${reduceName}`,
          payload: {
            id: data.id,
            benefitItemId,
            listMapItemId,
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const {
        data,
        chooise,
        benefitItemData: { isStandaloneBooster, benefitCategory, unitType },
        index,
      } = props;

      // TODO:这里应该用额外参数去区分不同的产品类型
      return formUtils.mapObjectToFields({
        ...data,
        chooise,
        isStandaloneBooster,
        benefitCategory,
        unitType,
        treatmentNo: `${formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.treatment-no',
        })} ${Number(index) + 1}`,
      });
    },
  })(ListItem)
);
