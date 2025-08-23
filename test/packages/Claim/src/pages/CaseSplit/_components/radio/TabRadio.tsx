import React from 'react';
import { Button, Checkbox } from 'antd';
import classNames from 'classnames';
import lodash from 'lodash';
import { ESplitTypes } from 'claim/pages/CaseSplit/_models/dto/splitTypes';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import styles from './tabRadio.less';

export default ({
  handleSelect,
  splitType,
  tabConfig,
  handleCheckBox,
  showDifferenceIncidentNo,
}: any) => {
  const btns = [
    {
      id: 'case',
      splitType: ESplitTypes.Case,
      dictCode: 'venus-split_case',
      disabled: !lodash.get(tabConfig, 'case.able'),
    },
    {
      id: 'policy',
      splitType: ESplitTypes.Policy,
      dictCode: 'venus-split_policy',
      disabled: !!lodash.get(tabConfig, 'policy.disabled'),
    },
    {
      id: 'incident',
      splitType: ESplitTypes.Incident,
      dictCode: 'venus-split_incident',
      disabled: !!lodash.get(tabConfig, 'incident.disabled'),
    },
    {
      id: 'document',
      splitType: ESplitTypes.Document,
      dictCode: 'venus-split_document',
      disabled: !!lodash.get(tabConfig, 'document.disabled'),
    },
    {
      id: 'differentIncidentNo',
      splitType: ESplitTypes.DifferentIncidentNo,
      dictCode: formatMessageApi({
        Label_BIZ_Claim: 'different_incident_no',
      }),
      disabled:
        !showDifferenceIncidentNo || !!lodash.get(tabConfig, 'differentIncidentNo.disabled'),
    },
  ];

  return (
    <div className={styles.btn_wrap}>
      {lodash.map(btns, (item: any, index: number) => (
        <div key={`${item.id}${index}`}>
          <Button
            disabled={item.disabled}
            style={{ display: item.disabled ? 'none' : 'inline-block' }}
            className={classNames(
              styles.btn_item,
              splitType === item.splitType ? styles.selected : ''
            )}
            onClick={() => handleSelect(item.splitType)}
          >
            {formatMessageApi({
              Label_BPM_Button: item.dictCode,
            })}
          </Button>
          {item.showCheckBox && (
            <Checkbox className={styles.checkBox} onChange={handleCheckBox}>
              {formatMessageApi({
                Label_BIZ_Claim: 'different_incident_no',
              })}
            </Checkbox>
          )}
        </div>
      ))}
    </div>
  );
};
