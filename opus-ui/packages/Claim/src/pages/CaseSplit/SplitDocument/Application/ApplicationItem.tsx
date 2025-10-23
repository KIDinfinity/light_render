import React, { PureComponent } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { Card, Button, notification } from 'antd';
import lodash, { get } from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { SplitDocumentType, eCategory } from 'claim/pages/CaseSplit/_models/splitDocument/dto';
import DocumentList from '../Document';
import ApplicationInfo from './ApplicationInfo';
import { ReactComponent as IconMove } from '../../_static/move.svg';
import { ReactComponent as IconReverse } from '../../_static/reverse.svg';
import styles from '../../caseSplit.less';

interface IProps {
  dispatch: Dispatch<any>;
  splitDocumentType: SplitDocumentType;
  applicationNo: any;
  documentData: any;
  newData: any;
  withData?: any;
}

class SplitDocumentItem extends PureComponent<IProps> {
  get renderCardTitle() {
    return (
      <div>
        <span>
          {`${formatMessageApi({
            Label_BIZ_Claim: 'venus_claim.label.applicationNo',
          })} ${this.props.applicationNo}`}
        </span>
      </div>
    );
  }

  get renderExtraManual() {
    const { splitDocumentType, newData, applicationNo } = this.props;
    const isOrigin = splitDocumentType === SplitDocumentType.OriginalDocument;
    const noSplict = lodash.has(newData, applicationNo);
    return isOrigin
      ? [
          <Button
            key="move"
            size="small"
            shape="circle"
            onClick={this.splictFn}
            disabled={noSplict}
          >
            <IconMove className="icon_split icon_move" transform="rotate(-90)" />
          </Button>,
        ]
      : [
          <Button key="reverse" size="small" shape="circle" onClick={this.fnMove}>
            <IconReverse className="icon_split icon_reverse" />
          </Button>,
        ];
  }

  splictFn = () => {
    const { dispatch, applicationNo, documentData } = this.props;
    const diagnosis = [
      eCategory.DiagnosisReport,
      eCategory.DeathReport,
      eCategory.HospitalizationReport,
      eCategory.TreatmentReport,
    ];
    const includesRequestForm = lodash
      .chain(documentData)
      .values()
      .some((el) => el.isSelected && el.formCategory === eCategory.RequestForm)
      .value();
    const includesDiagnosis = lodash
      .chain(documentData)
      .values()
      .some((el) => el.isSelected && lodash.includes(diagnosis, el.formCategory))
      .value();
    const isOk = includesRequestForm && includesDiagnosis;
    if (!isOk) {
      notification.warning({
        message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000255' }),
      });
      return;
    }
    dispatch({
      type: 'caseSplitDocumentController/splitDocument',
      payload: { applicationNo },
    });
  };

  fnMove = () => {
    const { dispatch, applicationNo } = this.props;

    dispatch({
      type: 'caseSplitDocumentController/moveDocument',
      payload: { applicationNo },
    });
  };

  render() {
    const { splitDocumentType, applicationNo } = this.props;

    return (
      <div className={styles.split_card}>
        <Card title={this.renderCardTitle} bordered={false} extra={this.renderExtraManual}>
          <ApplicationInfo
            splitDocumentType={splitDocumentType}
            applicationNo={applicationNo}
          />
          <DocumentList splitDocumentType={splitDocumentType} applicationNo={applicationNo} />
        </Card>
      </div>
    );
  }
}

export default connect(
  ({ caseSplitDocumentController }: any, { applicationNo, splitDocumentType }: any) => ({
    documentData: get(
      caseSplitDocumentController,
      `${splitDocumentType}.${applicationNo}.documentData`
    ),
    newData: get(caseSplitDocumentController, SplitDocumentType.NewDocument),
  })
)(SplitDocumentItem);
