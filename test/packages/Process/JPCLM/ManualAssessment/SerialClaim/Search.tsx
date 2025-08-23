import React from 'react';
import { Form, Button } from 'antd';
import { connect } from 'dva';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import Section, { SearchFields as Fields } from './Sections';
import styles from './index.less';

interface IProps {
  showSearch: boolean;
  editable: boolean;
  form: any;
  dispatch: any;
  payableData: any;
}

const Search = ({ dispatch, payableData, form, showSearch, editable }: IProps) => {
  const handleReset = async () => {
    await dispatch({
      type: 'JPCLMOfClaimAssessment/saveSerialClaimSearchParams',
      payload: {
        changedFields: payableData,
      },
    });
    await dispatch({
      type: 'JPCLMOfClaimAssessment/saveSerialClaimFilterList',
    });
  };
  return (
    <>
      {showSearch ? (
        <div className={styles.Search}>
          <div className={styles.filters}>
            <Section form={form} editable={editable} section="SerialClaim.Search">
              <Fields.CauseOfIncident />
              <Fields.ClaimTypeArray />
              <Fields.DiagnosisName />
              <Fields.Times />
              <Fields.HospitalizationSequentialNo />
              <Fields.PolicyNo />
              <Fields.TreatmentType />
            </Section>
          </div>
          <div className={styles.buttonGroup}>
            <Button
              type="primary"
              onClick={() => {
                dispatch({
                  type: 'JPCLMOfClaimAssessment/saveSerialClaimFilterList',
                });
              }}
              className={classnames(styles.btn, styles.btnSubmit)}
            >
              {formatMessageApi({ Label_BIZ_Claim: 'component.tableSearch.search' })}
            </Button>
            <Button
              onClick={() => {
                handleReset();
              }}
              className={classnames(styles.btn, styles.btnReset)}
            >
              {formatMessageApi({ Label_BIZ_Claim: 'component.tableSearch.reset' })}
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default connect((state: any) => ({
  validating: state?.formCommonController.validating,
  filterParams: state?.JPCLMOfClaimAssessment?.serialClaim?.filterParams,
  payableData: state?.JPCLMOfClaimAssessment?.serialClaim?.payableData,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch } = props;

      dispatch({
        type: 'JPCLMOfClaimAssessment/saveSerialClaimSearchParams',
        payload: {
          changedFields: formUtils.cleanValidateData(changedFields),
        },
      });
    },
    mapPropsToFields(props: any) {
      const { filterParams } = props;

      return formUtils.mapObjectToFields(filterParams);
    },
  })(Search)
);
