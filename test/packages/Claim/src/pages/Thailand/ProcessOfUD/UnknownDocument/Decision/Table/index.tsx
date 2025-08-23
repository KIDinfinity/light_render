import React, { Component } from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormSection from 'basic/components/Form/FormSection';
import { connect } from 'dva';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import Table from './Table';
import styles from './index.less';
import { validateResume } from '../../validation';

interface IProps {
  decision: string;
  claimHistorySearchResultRowKeys: string[];
}

class SearchTable extends Component<IProps> {
  render() {
    const { decision, claimHistorySearchResultRowKeys } = this.props;
    return (
      <div className={styles.Search}>
        <FormSection
          title={
            <>
              {formatMessageApi({
                Label_BIZ_Claim: 'venus_claim.label.claimHistorySearchResult',
              })}
              {validateResume(decision, claimHistorySearchResultRowKeys) && (
                <ErrorTooltipManual
                  manualErrorMessage={formatMessageApi({ Label_COM_WarningMessage: 'ERR_000226' })}
                />
              )}
            </>
          }
        >
          <Table />
        </FormSection>
      </div>
    );
  }
}

export default connect(({ UnknownDocumentController }: any) => ({
  claimHistorySearchResultRowKeys: UnknownDocumentController.claimHistorySearchResultRowKeys,
  decision: UnknownDocumentController.claimProcessData.decision,
}))(SearchTable);
