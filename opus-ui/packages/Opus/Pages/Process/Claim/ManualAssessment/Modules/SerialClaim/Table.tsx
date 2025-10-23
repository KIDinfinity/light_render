import React from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formatHospitalizatioNo } from 'opus/Pages/Process/Claim/ManualAssessment/_models/functions';
import { connect } from 'dva';
import { ClaimType } from 'claim/enum';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import moment from 'moment';
import styles from './index.less';
import TaskTable from 'packages/Opus/Components/TaskTable';

function List({ list, listPolicy }: any) {
  const sorterFun = (a, b) => {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  };

  const columns = [
    {
      key: 'claimNo',
      width: 140,
      sorter: (a, b) => sorterFun(a?.claimNo, b?.claimNo),
      title: formatMessageApi({
        Label_BIZ_Claim: 'BusinessNo',
      }),
      dataIndex: 'claimNo',
      render: (text: any, item: any) => {
        return (
          <div>
            <span className={styles.claimNo}>
              {text || '-'}
              {!!item.isAdjustment && (
                <span className={styles.flag}>
                  <span className={styles.name}>Adj</span>
                </span>
              )}
            </span>
          </div>
        );
      },
    },
    {
      key: 'claimType',
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.label.claim-type',
      }),
      sorter: (a, b) => sorterFun(a?.claimType?.split(',')?.length, b?.claimType.split(',').length),
      dataIndex: 'claimType',
      render: (text: any, item: any) => {
        const texts =
          lodash
            .chain(item?.claimType.split(','))
            .map((el: any) => formatMessageApi({ ClaimType: el }))
            .filter((el: any) => !lodash.isEmpty(el))
            .value() || [];
        return texts.join() || '-';
      },
    },
    {
      key: 'treatmentType',
      sorter: (a, b) => sorterFun(a?.treatmentType, b?.treatmentType),
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.treatment-type',
      }),
      dataIndex: 'treatmentType',
      render: (text: any) => formatMessageApi({ TreatmentType: text }) || text || '-',
    },
    {
      key: 'causeOfIncident',
      sorter: (a, b) => sorterFun(a?.causeOfIncident, b?.causeOfIncident),
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-of-incident',
      }),
      dataIndex: 'causeOfIncident',
      render: (text: any) => formatMessageApi({ CauseOfIncident: text }) || text || '-',
    },
    {
      key: 'diagnosisName',
      sorter: (a, b) => sorterFun(a?.diagnosisName, b?.diagnosisName),
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.diagnosis-code-name',
      }),
      dataIndex: 'diagnosisName',
      render: (text: any, record: any) => {
        return `${record?.diagnosisName || ''}`;
      },
    },
    {
      key: 'times',
      sorter: (a, b) => {
        return sorterFun(a?.dateOfAdmission, b?.dateOfAdmission);
      },
      width: 200,
      title: formatMessageApi({
        Label_BIZ_Claim: 'hospitalizationPeriod',
      }),
      dataIndex: 'times',
      render: (text: any, record: any) => {
        switch (record?.treatmentType) {
          case ClaimType.IPD:
            return `${moment(record?.dateOfAdmission).format('YYYY.MM.DD')} - ${moment(
              record?.dateOfDischarge
            ).format('YYYY.MM.DD')}`;
          case ClaimType.OPD:
            return moment(record?.dateOfConsultation).format('YYYY.MM.DD');
          default:
            return '';
        }
      },
    },
    {
      key: 'policyNo',
      sorter: (a, b) => sorterFun(a?.policyNo, b?.policyNo),
      title: formatMessageApi({
        Label_BIZ_Claim:
          'app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no',
      }),
      dataIndex: 'policyNo',
    },
    {
      key: 'productCode',
      sorter: (a, b) => {
        return sorterFun(a?.productCode, b?.productCode);
      },
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.label.product',
      }),
      dataIndex: 'productCode',
      render: (text: any, { policyNo, productCode }: any) => {
        return (
          lodash
            .chain(listPolicy)
            .find((el: any) => el.policyNo === policyNo && el.coreProductCode === productCode)
            .get('productName')
            .value() || ''
        );
      },
    },
    {
      key: 'benefitItemCode',
      sorter: (a, b) => {
        return sorterFun(a?.benefitItemCode, b?.benefitItemCode);
      },
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.label.benefit-item',
      }),
      dataIndex: 'benefitItemCode',
      render: (text: any, { policyNo, benefitItemCode }: any) => {
        return (
          lodash
            .chain(listPolicy)
            .find({ policyNo, benefitItemCode })
            .get('benefitItemName')
            .value() || ''
        );
      },
    },
    {
      key: 'hospitalizationSequentialNo',
      sorter: (a, b) => sorterFun(a?.hospitalizationSequentialNo, b?.hospitalizationSequentialNo),
      title: formatMessageApi({
        Label_BIZ_Claim: 'HospitalizationSequenceNO',
      }),
      dataIndex: 'hospitalizationSequentialNo',
      render: (text: any) => {
        return !lodash.isNull(text) && !lodash.isEmpty(text)
          ? formatHospitalizatioNo({
              no: text,
              isFormatter: true,
              value: text,
            })
          : '';
      },
    },
    {
      key: 'payableDays',
      sorter: (a, b) => sorterFun(a?.payableDays, b?.payableDays),
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.label.payable-days',
      }),
      dataIndex: 'payableDays',
    },
    {
      key: 'payableAmount',
      sorter: (a, b) => sorterFun(a?.payableAmount, b?.payableAmount),
      title: formatMessageApi({
        Label_BIZ_Claim: 'payableAmount',
      }),
      dataIndex: 'payableAmount',
    },
    {
      key: 'status',
      sorter: (a, b) => sorterFun(a?.status, b?.status),
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.usermanagement.basicInfo.avatar.status',
      }),
      dataIndex: 'status',
      render: (text: any) => {
        return formatMessageApi({ claimStatus: text }) || text || '-';
      },
    },
    {
      key: 'reversalFlag',
      sorter: (a, b) => sorterFun(a?.reversalFlag, b?.reversalFlag),
      title: formatMessageApi({
        Label_COM_Opus: 'reversalFlag',
      }),
      render: (text: any) => {
        return formatMessageApi({ Dropdown_COM_YN: text || 'N' });
      },
      dataIndex: 'reversalFlag',
    },
  ];

  return (
    <div className={styles.Table}>
      <div className={styles.list}>
        <TaskTable
          rowKey="claimTreatmentPayableId"
          localColumns={columns}
          list={list}
          pageSize={20}
          total="20"
          scroll={{ x: 'max-content' }}
          hidenTotal
          // scroll={getScrollParams()}
        />
      </div>
    </div>
  );
}

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  listPolicy: modelnamepsace.listPolicy || [],
}))(List);
