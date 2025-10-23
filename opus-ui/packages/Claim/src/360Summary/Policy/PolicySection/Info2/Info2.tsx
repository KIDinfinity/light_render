import React from 'react';
import { Icon } from 'antd';
import lodash from 'lodash';
import classnames from 'classnames';
import { ReactComponent as agentFillMTIcon } from 'claim/assets/agentFillMT.svg';
import { ReactComponent as premiumIcon } from 'claim/assets/premium.svg';
import { ReactComponent as contractIcon } from 'claim/assets/contract.svg';
import { ReactComponent as beneficiaryIcon } from 'claim/assets/beneficiary.svg';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { EPolicySource } from 'claim/enum/EPolicySource';
import useExpanderController from 'navigator/hooks/useExpanderController';
import { formatDate } from '../../../Utils';
import styles from './index.less';

const titleMap = {
  [EPolicySource.Individual]: formatMessageApi({
    Label_BIZ_Policy: 'INDpolicy',
  }),
  [EPolicySource.Group]: formatMessageApi({
    Label_BIZ_Policy: 'Grppolicy',
  }),
};

export default function Info2({ info }: any) {
  const { isExpanderSwitchOn } = useExpanderController();

  const { policyOwner, insured, payor, policySource, agent, beneficiaryList, productInfoList } =
    info;

  const getValue = (data: any) => {
    return (
      lodash
        .chain([data?.firstName, data?.middleName, data?.surname])
        .compact()
        .join(' ')
        .value() || ''
    );
  };

  const infoDatas: any[] = [
    {
      icon: <Icon component={contractIcon} />,
      detail: [
        {
          label: formatMessageApi({ Label_BIZ_Individual: 'PolicyOwner' }),
          value: getValue(policyOwner),
        },
        {
          label: formatMessageApi({ Label_BIZ_Policy: 'MainInsured' }),
          value: getValue(insured),
        },
        {
          label: formatMessageApi({ Label_BIZ_Individual: 'RelationshipWithINS' }),
          value: policyOwner?.relationshipWithInsured,
        },
        {
          label: formatMessageApi({ Label_BIZ_Policy: 'PolicySource' }),
          value: titleMap[policySource],
        },
        {
          label: 'Policy Currency',
          value: lodash
            .chain(productInfoList)
            .find({
              productCode: info?.mainProductCode,
            })
            .get('currency')
            .value(),
        },
      ],
    },
    {
      icon: <div />,
      marB12: true,
      detail: [
        {
          label: formatMessageApi({ Label_BIZ_Policy: 'ContractDate' }),
          value: info?.riskCommenceDate && formatDate(info?.riskCommenceDate),
        },
        {
          label: formatMessageApi({ Label_BIZ_Policy: 'CashValue' }),
          value: '',
        },
        {
          label: formatMessageApi({ Label_BIZ_Policy: 'Payor' }),
          value: getValue(payor),
        },
        {
          label: formatMessageApi({ Label_BIZ_Policy: 'BeneOwner' }),
          value: getValue(policyOwner),
        },
      ],
    },
    {
      icon: <Icon component={premiumIcon} />,
      detail: [
        {
          label: formatMessageApi({ Label_BIZ_Policy: 'PremAmount' }),
          value: info?.premiumAmount,
        },
        {
          label: formatMessageApi({ Label_BIZ_Policy: 'PaidPremAmount' }),
          value: info?.paidPremium,
        },
        {
          label: formatMessageApi({ Label_BIZ_Policy: 'PremPaymentMethod' }),
          value: formatMessageApi({ Dropdown_POL_PaymentMethod: info?.premiumPaymentMethod }),
        },
        {
          label: formatMessageApi({ Label_BIZ_Policy: 'PremPaymentModel' }),
          value: info?.paymentMode,
        },
        {
          label: formatMessageApi({ Label_BIZ_Policy: 'PremiumPaidUpStatus' }),
          value: formatMessageApi({ Dropdown_POL_PremiumStatus: info?.premiumStatus }),
        },
      ],
    },
    {
      icon: <div />,
      marB12: true,
      detail: [
        {
          label: formatMessageApi({ Label_BIZ_Policy: 'PTD' }),
          value: info?.payToDate && formatDate(info?.payToDate),
        },
        {
          label: formatMessageApi({ Label_BIZ_Policy: 'Premiumamountfornexttime' }),
          value: info?.nextClaimPremium,
        },
      ],
    },
    {
      icon: <Icon component={agentFillMTIcon} />,
      detail: [
        {
          label: formatMessageApi({ Label_BIZ_Policy: 'AgentName' }),
          value: getValue(agent),
        },
        {
          label: formatMessageApi({ Label_BIZ_Policy: 'AgentPhone' }),
          value: agent?.phoneNo,
        },
        {
          label: formatMessageApi({ Label_BIZ_Policy: 'AgentEMail' }),
          value: agent?.email,
        },
      ],
    },
    {
      icon: <Icon component={beneficiaryIcon} className={styles.font18} />,
      detail: [
        {
          label: formatMessageApi({ Label_BIZ_Policy: 'BeneficiaryName' }),
          hideValue: true,
        },
        {
          label: formatMessageApi({ Label_BIZ_Policy: 'BeneficiaryCategory' }),
          hideValue: true,
        },
        {
          label: formatMessageApi({ Label_BIZ_Individual: 'RelationshipWithINS' }),
          hideValue: true,
        },
        {
          label: formatMessageApi({ Label_BIZ_Policy: 'BeneficiaryPercentage' }),
          hideValue: true,
        },
        {
          label: '',
          hideValue: true,
        },
        ...lodash
          .chain(beneficiaryList)
          .map((item: any) => [
            {
              hideLabel: true,
              value: getValue(item),
            },
            {
              hideLabel: true,
              value: item?.beneficiaryCategory,
            },
            {
              hideLabel: true,
              value: item?.relationshipWithInsured,
            },
            {
              hideLabel: true,
              value: item?.beneficiaryCategory,
            },
            {
              hideLabel: true,
              value: '',
            },
          ])
          .flatten()
          .value(),
      ],
    },
  ];
  return (
    <div className={styles.infoWrap}>
      {lodash.map(infoDatas, (infoData: any, index: number) => (
        <div
          className={classnames({
            [styles.info]: true,
            [styles.marB12]: infoData?.marB12,
          })}
          key={index}
        >
          {infoData?.icon && <div className={styles.infoIcon}>{infoData?.icon}</div>}
          <div className={styles.infoDetail}>
            {lodash.map(infoData?.detail, (item: any, childIndex: number) => (
              <div className={styles.infoItem} key={`${index}-${childIndex}`}>
                {!item?.hideLabel && <div className={styles.infoLabel}>{item?.label}</div>}
                {!item?.hideValue && <div className={styles.infoValue}>{item?.value}</div>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
