import React from 'react';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import lodash from 'lodash';
import moment from 'moment';
import { Form } from 'antd';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { connect, useDispatch } from 'dva';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { eBenefitSubCategory } from 'claim/enum/BenefitSubCategory';
import { formUtils } from 'basic/components/Form';
import { formatMessageApiTypeCodeLabel_CLM_Opus as t } from '@/utils/dictFormatMessage';
import { Procedure, Treament, TreatmentOP, Reimbursement, Life } from './Configs/Sections';

const formatDate = (date: string) => (date ? moment(date).format('L') : '');

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
          benefitItemId: benefitItemData?.id,
          listMapItemId,
          changedFields: {
            chooise: true,
          },
        },
      });
    }
  };

  const mapSection = {
    [eBenefitCategory.Cashless]:
      benefitItemData?.benefitSubCategory === eBenefitSubCategory.OP ? (
        <TreatmentOP {...defaultProps} />
      ) : (
        <Treament {...defaultProps} />
      ),
    [eBenefitCategory.Aipa]: <Treament {...defaultProps} />,
    [eBenefitCategory.Reimbursement]: <Reimbursement {...defaultProps} />,
    [eBenefitCategory.S]: <Procedure {...defaultProps} />,
    [eBenefitCategory.Crisis]: <Treament {...defaultProps} />,
    [eBenefitCategory.T]: <Reimbursement {...defaultProps} />,
    [eBenefitCategory.CIC]: <Reimbursement {...defaultProps} />,
    [eBenefitCategory.Life]: <Life {...defaultProps} />,
    [eBenefitCategory.MIC]: <Life {...defaultProps} />,
  };

  return <div onClick={onChooise}>{mapSection?.[benefitItemData?.benefitCategory]}</div>;
};

const procedureTypeDrowDownList = getDrowDownList('Dropdown_CLM_therapyType');

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
          type: `${NAMESPACE}/saveFormData`,
          target: `${NAMESPACE}/${reduceName}`,
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
      } = props;

      const procedureType =
        lodash.find(procedureTypeDrowDownList, (item) => item.dictCode === data?.procedureType)
          ?.dictName || '';

      // TODO:这里应该用额外参数去区分不同的产品类型
      return formUtils.mapObjectToFields({
        ...data,
        chooise,
        isStandaloneBooster,
        benefitCategory,
        unitType,
        treatmentNo: `${t('No.')} ${data?.treatmentNo || ''}`,
        incidentNo: `${t('No.')} ${data?.incidentNo || ''}`,
        hospitalizationPeriod:
          data?.dateOfAdmission || data?.dateOfDischarge
            ? `${formatDate(data?.dateOfAdmission)} - ${formatDate(data?.dateOfDischarge)}`
            : '',
        therapy: `${t('No.')} ${data?.orderNum || ''} ${procedureType || ''}`,
      });
    },
  })(ListItem)
);
