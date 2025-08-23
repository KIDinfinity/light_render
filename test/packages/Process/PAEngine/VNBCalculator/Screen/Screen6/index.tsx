import { useNavigatorStep, useVNBCalculatorModel } from '../../_hooks';
import { FlexLayout } from 'process/PAEngine/VNBCalculator/Layout';
import styles from './index.less';
import { Button, Form } from 'antd';
import { useCallback, useState, useMemo } from 'react';
import {
  gernateProposal,
  checkProposalStatus,
  downloadProposalReport,
} from 'process/PAEngine/VNBCalculator/services/vnbCalculatorServices';
import { useDispatch, connect } from 'dva';
import { setVNBCalculatorData } from '../../_models/actions';
import handleMessageModal from '@/utils/commonMessage';
import base64Down from 'documentManage/pages/_functions/base64Down';
import FormItemSelect from '../../../../../Basic/src/components/Form/FormItem/FormItemSelect/index';
import { formUtils } from 'basic/components/Form';
import get from 'lodash/get';
import { FormateEP } from '@/utils/accuracy/Tools';
import classNames from 'classnames';

const Screen6 = ({ form }) => {
  const dispatch = useDispatch();
  const [currentStep] = useNavigatorStep();
  const model = useVNBCalculatorModel();
  const { summary, proposalInfo, reportLang } = model;
  const [generateLoading, setGenerateLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const onDownloadClick = useCallback(() => {
    setDownloadLoading(true);
    const token = get(proposalInfo, `${reportLang}.token`);
    checkProposalStatus(token)
      .then(() => {
        downloadProposalReport(token)
          .then((res) => {
            base64Down.init(`data:application/pdf;base64,${res}`, `${token}.pdf`);
            setDownloadLoading(false);
          })
          .catch((e) => {
            handleMessageModal([{ code: '0001', content: e }]);
            setDownloadLoading(false);
          });
      })
      .catch((e) => {
        handleMessageModal([{ code: '0001', content: e }]);
        setDownloadLoading(false);
      });
  }, [proposalInfo, reportLang]);

  const onGenerateClick = useCallback(() => {
    setGenerateLoading(true);
    gernateProposal(model)
      .then((info) => {
        dispatch(setVNBCalculatorData(`proposalInfo.${reportLang}`, info));
        setGenerateLoading(false);
      })
      .catch((e) => {
        handleMessageModal([{ code: '0001', content: e }]);
        setGenerateLoading(false);
      });
  }, [dispatch, model, reportLang]);

  const languageOptions = useMemo(
    () => [
      // TODO： dict code for Thai. currency value is my.
      { dictCode: 'my', dictName: 'Thailand' },
      { dictCode: 'en', dictName: 'English' },
    ],
    []
  );

  return (
    <FlexLayout
      flexDirection="col"
      className={classNames(styles.flexGap, styles.screen6)}
      hidden={currentStep !== 6}
    >
      <h2>Summary Profit</h2>
      <div>
        <FlexLayout flexDirection="col">
          <p>Profit by Source</p>
          <table border="1" className={styles.sourceTable}>
            <thead>
              <tr>
                <th>Gross RI</th>
                <th>PM (Before RI)</th>
                <th>Net RI</th>
                <th>PM (After RI)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Prem</td>
                <td>{summary?.premBeforeRI}%</td>
                <td>Prem</td>
                <td>{summary?.premAfterRI}%</td>
              </tr>
              <tr>
                <td>Claim</td>
                <td>{summary?.claimBeforeRI}%</td>
                <td>Claim</td>
                <td>{summary?.claimAfterRI}%</td>
              </tr>
              <tr>
                <td>Expense</td>
                <td>{summary?.expenseBeforeRI}%</td>
                <td>Expense</td>
                <td>{summary?.expenseAfterRI}%</td>
              </tr>
              <tr>
                <td>OIC Tax</td>
                <td>{summary?.oicTaxBeforeRI}%</td>
                <td> </td>
                <td>{summary?.oicTaxAfterRI}%</td>
              </tr>
              <tr>
                <td>Com+OV</td>
                <td>{summary?.comOVBeforeRI}%</td>
                <td>Commission</td>
                <td>{summary?.commissionAfterRI}%</td>
              </tr>
              <tr>
                <td>Inc UPR</td>
                <td>{summary?.incUPRBeforeRI}%</td>
                <td> </td>
                <td>{summary?.incUPRAfterRI}%</td>
              </tr>
              <tr>
                <td> </td>
                <td> </td>
                <td>RI Cost</td>
                <td>{summary?.riCostAfterRI}%</td>
              </tr>
              <tr>
                <td>Investment</td>
                <td>{summary?.investmentBeforeRI}%</td>
                <td>Investment</td>
                <td>{summary?.investmentAfterRI}%</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td>{summary?.taxBeforeRI}%</td>
                <td>Tax</td>
                <td>{summary?.taxAfterRI}%</td>
              </tr>
              <tr>
                <td>Total PM</td>
                <td>{summary?.totalPMBeforeRI}%</td>
                <td>Total PM</td>
                <td>{summary?.totalPMAfterRI}%</td>
              </tr>
            </tbody>
          </table>
        </FlexLayout>
      </div>
      <br />
      <div>
        <table border="0" className={styles.summaryTable}>
          <tbody>
            <tr>
              <td>APE</td>
              <td>{FormateEP.getThousandsFormat({ value: summary?.ape, precision: 0 })}</td>
            </tr>
            <tr>
              <td>PM</td>
              <td>{summary?.pm}%</td>
            </tr>
            <tr>
              <td>VNB</td>
              <td>{summary?.vnb}%</td>
            </tr>
            <tr>
              <td>Approver</td>
              <td>{summary?.approver}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <div>
        <FlexLayout flexDirection="col">
          <p>Approval Matrix (Dummy)</p>
          <table border="1" className={styles.approvalTable}>
            <thead>
              <tr>
                <th>APE</th>
                <th>{'VNB <0%'}</th>
                <th>{'0% <= VNB < 2.5%'}</th>
                <th>VNB ≥ 2.5%</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>≤ 10MB</td>
                <td>CEO</td>
                <td>CDO</td>
                <td>CDO</td>
              </tr>
              <tr>
                <td>{'> 10MB but < 100MB'}</td>
                <td>CEO + Group Office</td>
                <td>Head of Product Pricing</td>
                <td>CDO</td>
              </tr>
              <tr>
                <td>≥ 100MB</td>
                <td>Group Office</td>
                <td>Group Office</td>
                <td>Group Office</td>
              </tr>
            </tbody>
          </table>
        </FlexLayout>
      </div>
      <br />
      <FormItemSelect
        required
        labelId="Report Language"
        formName="reportLang"
        form={form}
        dicts={languageOptions}
      />
      {(!proposalInfo || !proposalInfo[reportLang]) && (
        <Button loading={generateLoading} disabled={downloadLoading} onClick={onGenerateClick}>
          Generate Proposal
        </Button>
      )}
      {proposalInfo && proposalInfo[reportLang] && (
        <Button loading={downloadLoading} disabled={downloadLoading} onClick={onDownloadClick}>
          Download Proposal
        </Button>
      )}
    </FlexLayout>
  );
};

export default connect(({ vnbCalculator }) => ({ reportLang: vnbCalculator?.reportLang }))(
  Form.create({
    onFieldsChange(props, changeFields) {
      const { dispatch } = props;
      if (changeFields.reportLang && formUtils.shouldUpdateState(changeFields)) {
        dispatch(setVNBCalculatorData('reportLang', changeFields.reportLang.value));
      }
    },
    mapPropsToFields(props) {
      const { reportLang } = props;
      return formUtils.mapObjectToFields({ reportLang });
    },
  })(Screen6)
);
