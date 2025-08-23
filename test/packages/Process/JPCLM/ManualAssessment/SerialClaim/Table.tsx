import React from 'react';
import lodash from 'lodash';
import { Table, Checkbox } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formatHospitalizatioNo } from 'process/JPCLM/ManualAssessment/_models/functions';
import { connect } from 'dva';
import { ClaimType } from 'claim/enum';
import { handleMessageModal } from '@/utils/commonMessage';
import moment from 'moment';
import styles from './index.less';

function List({
  list,
  listPolicy,
  loading,
  isSwitchOn,
  selectPayableIds,
  setSelectPayableIds,
  filterPayableList,
}: any) {
  const vaildateTreatment = (item: any) => {
    if (lodash.includes(filterPayableList, item.id)) {
      handleMessageModal([{ content: '給付記録は既存している。' }]);
    } else {
      const newList = lodash.includes(selectPayableIds, item.claimTreatmentPayableId)
        ? lodash.filter(selectPayableIds, (id: any) => id !== item.claimTreatmentPayableId)
        : [...selectPayableIds, item.claimTreatmentPayableId];
      setSelectPayableIds(newList);
    }
  };

  const columns = [
    {
      title: <Checkbox disabled={false} onChange={() => {}} />,
      key: 'checkRows',
      width: 45,
      render: (el: any, item: any) => {
        return item.status === 'close' && !item.isAdjustment ? (
          <Checkbox
            disabled={false}
            checked={lodash.includes(selectPayableIds, item.claimTreatmentPayableId)}
            onClick={() => {
              vaildateTreatment(item);
            }}
          />
        ) : null;
      },
    },
    {
      key: 'claimNo',
      title: formatMessageApi({
        Label_BIZ_Claim: 'BusinessNo',
      }),
      dataIndex: 'claimNo',
      render: (text: any, item: any) => {
        return (
          <div className={styles.claimNo}>
            {text || '-'}
            {!!item.isAdjustment && (
              <span className={styles.flag}>
                <span className={styles.name}>Adj</span>
              </span>
            )}
          </div>
        );
      },
    },
    {
      key: 'claimType',
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.label.claim-type',
      }),
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
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.treatment-type',
      }),
      dataIndex: 'treatmentType',
      render: (text: any) => formatMessageApi({ TreatmentType: text }) || text || '-',
    },
    {
      key: 'causeOfIncident',
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-of-incident',
      }),
      dataIndex: 'causeOfIncident',
      render: (text: any) => formatMessageApi({ CauseOfIncident: text }) || text || '-',
    },
    {
      key: 'diagnosisName',
      title: formatMessageApi({
        Label_BIZ_Claim: 'DiagnosisCode',
      }),
      dataIndex: 'diagnosisName',
      render: (text: any, record: any) => {
        return `${record?.primaryDiagnosis || ''} ${record?.diagnosisName || ''}`;
      },
    },
    {
      key: 'times',
      title: formatMessageApi({
        Label_BIZ_Claim: '治療期間',
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
      title: formatMessageApi({
        Label_BIZ_Claim:
          'app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no',
      }),
      dataIndex: 'policyNo',
    },
    {
      key: 'productCode',
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
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.label.payable-days',
      }),
      dataIndex: 'payableDays',
    },
    {
      key: 'payableAmount',
      title: formatMessageApi({
        Label_BIZ_Claim: 'payableAmount',
      }),
      dataIndex: 'payableAmount',
    },
    {
      key: 'status',
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.usermanagement.basicInfo.avatar.status',
      }),
      dataIndex: 'status',
      render: (text: any) => {
        return formatMessageApi({ Label_BPM_TaskActivity: text }) || text || '-';
      },
    },
    {
      key: 'reversalFlag',
      title: formatMessageApi({
        Label_BIZ_Claim: 'ﾘﾊﾞｰｽ対象',
      }),
      dataIndex: 'reversalFlag',
    },
  ];

  const getScrollParams = (adjust: any = { x: 0, y: 0 }) => {
    const scroll = { y: `calc(100vh - 300px + ${adjust.y}px)`, x: '0' };
    scroll.x = isSwitchOn
      ? `calc(100vw - 200px - 420px + ${adjust.x}px)`
      : `calc(100vw - 200px + ${adjust.x}px)`;

    return scroll;
  };

  return (
    <div className={styles.Table}>
      <div className={styles.title}>
        {formatMessageApi({ Label_BIZ_Claim: 'SerialClaimSelection' })}
      </div>
      <div className={styles.list}>
        <Table
          rowKey="claimTreatmentPayableId"
          loading={loading}
          columns={columns}
          dataSource={list}
          scroll={{ x: 'max-content' }}
          // scroll={getScrollParams()}
        />
      </div>
    </div>
  );
}

export default connect(({ loading, JPCLMOfClaimAssessment }: any) => ({
  loading: loading.effects['JPCLMOfClaimAssessment/getAllSerialClaimList'],
  listPolicy: JPCLMOfClaimAssessment.listPolicy || [],
}))(List);
