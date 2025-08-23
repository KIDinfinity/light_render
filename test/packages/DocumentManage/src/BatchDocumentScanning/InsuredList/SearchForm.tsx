import React, { useCallback } from 'react';
import { Icon, Form, Button, notification } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { formUtils } from 'basic/components/Form';
import Section, { FormFields as Fields } from './Section/index';
import Styles from './index.less';

const searchInsuredValidateKeyArr: string[] = ['policyId', 'clientId', 'firstName', 'surname'];

// ts-ignore
const SearchInsuredForm = ({ form }: any) => {
  const dispatch = useDispatch();
  const { searchInsuredObj, insuredSectionIndex } = useSelector(
    ({ batchDocumentScanningController }: any) => {
      const { searchInsuredObj, insuredSectionIndex } = batchDocumentScanningController;
      return { searchInsuredObj, insuredSectionIndex };
    }
  );
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const searchInsured = useCallback(() => {
    const insuredObj = formUtils.formatFlattenValue(formUtils.cleanValidateData(searchInsuredObj));
    const hasAtLeastOne = lodash.some(searchInsuredValidateKeyArr, (key) => {
      return !lodash.isEmpty(insuredObj[key]);
    });
    if (!hasAtLeastOne) {
      notification.error({
        message: formatMessageApi({
          Label_COM_ErrorMessage: 'MSG_000389',
        }),
      });
      dispatch({
        type: `batchDocumentScanningController/saveInsuredList`,
        payload: {
          insuredList: [],
        },
      });
      return;
    }
    dispatch({
      type: `batchDocumentScanningController/getInsuredInfo`,
      payload: {
        sectionIndex: insuredSectionIndex,
        policyNo: insuredObj?.policyId,
      },
    });
  }, [searchInsuredObj, insuredSectionIndex]);

  return (
    <div className={Styles.searchInsured}>
      <Section form={form} editable={editable} section="Insured.Form">
        <Fields.ClientId />
        <Fields.DateOfBirth />
        <Fields.FirstName />
        <Fields.Gender />
        <Fields.MiddleName />
        <Fields.PolicyId />
        <Fields.PolicySource />
        <Fields.Surname />
      </Section>

      {!!editable && (
        <div className={Styles.searchButton}>
          <Button key="submit" type="primary" onClick={searchInsured}>
            Search
            <Icon type="search" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default connect(({ batchDocumentScanningController }: any) => ({
  searchInsuredObj: batchDocumentScanningController.searchInsuredObj,
}))(
  Form.create({
    async onFieldsChange(props: any, changedFields: any) {
      const { validating, dispatch }: any = props;

      if (!formUtils.shouldUpdateState(changedFields)) return;

      if (!validating || lodash.size(changedFields) === 1) {
        dispatch({
          type: `batchDocumentScanningController/saveSearchInsuredInfo`,
          payload: {
            changedFields,
          },
        });
      }
    },
    // @ts-ignore
    mapPropsToFields(props: any) {
      const { searchInsuredObj } = props;
      return formUtils.mapObjectToFields(searchInsuredObj);
    },
  })(SearchInsuredForm)
);
