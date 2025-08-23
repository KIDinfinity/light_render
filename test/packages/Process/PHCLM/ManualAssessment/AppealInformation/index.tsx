import React from 'react';
import { NAMESPACE } from '../activity.config';
import { formUtils, FormAntCard } from 'basic/components/Form';
import Section, { SectionTitle, Fields } from './Section';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Form, Table } from 'antd';
import { connect, useDispatch } from 'dva';
import Columns from './Columns';
import lodash from 'lodash';
import styles from './index.less';

const AppealInformation = ({ form, taskNotEditable, caseInfo }) => {
  const dispatch = useDispatch();
  const selectedRowKey = caseInfo?.find(caseDetail => caseDetail?.selected)?.caseNo

  return (
    <FormAntCard title={<SectionTitle />} className={styles.appealSection}>
      <Section form={form} editable={!taskNotEditable} section="appealInformation">
        <Fields.OriginClaimNo />
        <Fields.ClaimAppealType />
      </Section>
      <div className={styles.caseInfo}>
        {
          formatMessageApi({ Label_COM_ReportCenter: 'bs_case_info' })
        }
        <Table
          rowKey={'caseNo'}
          columns={Columns}
          dataSource={caseInfo}
          scroll={{ x: true }}
          style={{ whiteSpace: 'nowrap' }}
          pagination={{
            pageSize: 10,
            hideOnSinglePage: true,
            size: 'small',
          }}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: selectedRowKey? [selectedRowKey] : [],
            onSelect: selectedCaseInfo => {
              dispatch({
                type: `${NAMESPACE}/loadCaseByCaseNo`,
                payload: {
                  selectedCaseInfo
                }
              })
            }
          }}
        />
      </div>
    </FormAntCard>
  );
};

export default connect(({ formCommonController, [NAMESPACE]: modelnamepsace, claimEditable }: any) => ({
  claimAppealInfo: lodash.get(modelnamepsace, 'claimProcessData.claimAppealInfo') || {},
  caseInfo: lodash.get(modelnamepsace, 'claimProcessData.caseInfo') || [lodash.get(modelnamepsace, 'claimProcessData.claimAppealRelateCaseInfo')]?.filter(v => v)?.map(v => ({...v, selected: true})),
  validating: formCommonController.validating,
  taskNotEditable: claimEditable.taskNotEditable,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveAppealInformation',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveAppealInformation',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { claimAppealInfo }: any = props;
      return formUtils.mapObjectToFields(claimAppealInfo);
    },
  })(AppealInformation)
);
