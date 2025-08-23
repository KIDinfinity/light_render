import React, { useState, useCallback, useMemo, useRef } from 'react';
import { Form, Button, notification, Icon } from 'antd';
import { FormItemInput } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import { Commonbox } from '../index';
import { queryDataList, commitCase, getActiveIssueDefaultData } from './utils';
import lodash from 'lodash';
import ActiveIssueBox from './ActiveIssueBox';
import { produce } from 'immer';
import { handleMessageModal } from '@/utils/commonMessage';
import moment from 'moment';
import { ReactComponent as forwardSVG } from 'navigator/assets/forward.svg';

function SpecialHandler({ form, setExpand, isExpand }) {
  const [searchLoading, setSearchLoading] = useState(false);
  const [commitLoading, setCommitLoading] = useState(false);
  const [inquiryBusinessNo, setInquiryBusinessNo] = useState('');
  const [dataMap, setDataMap] = useState([]);
  const [caseCategoryOptions, setCaseCategoryOptions] = useState([]);
  const [caseCategory, setCaseCategory] = useState(null);
  const activeIssueBoxForm = useRef(null);

  const setFieldData = useCallback(
    (field, data) => {
      if (field === 'caseCategory') {
        setCaseCategory(data);
      } else {
        const updatedDataMap = produce(dataMap, (draft) => {
          lodash.set(draft, `${caseCategory}.${field}`, data);
          const categoryData: any = lodash.get(draft, caseCategory);
          const {
            isNtu,
            isWithDraw,
            policyDecision,
            canTriggerPostQC,
            triggerPostQC,
            executeLastActivityBusiness,
            declineReason,
            decision,
          } = lodash.pick(categoryData, [
            'isNtu',
            'isWithDraw',
            'policyDecision',
            'canTriggerPostQC',
            'triggerPostQC',
            'executeLastActivityBusiness',
            'declineReason',
            'decision',
          ]);
          if (
            (isNtu !== 'false' ||
              isWithDraw !== 'false' ||
              policyDecision !== 'A' ||
              !canTriggerPostQC) &&
            triggerPostQC === 'true'
          ) {
            lodash.set(draft, `${caseCategory}.triggerPostQC`, '');
          }
          if (isNtu === 'true' || isWithDraw === 'true' || policyDecision !== 'A') {
            lodash.set(draft, `${caseCategory}.policyIssueDate`, '');
          }

          const setCommonFields = () => {
            lodash.set(draft, `${caseCategory}.sendLetter`, 'N');
            lodash.set(draft, `${caseCategory}.sendSms`, 'N');
            lodash.set(draft, `${caseCategory}.releasePolicyPack`, 'N');
          };

          if (field === 'executeLastActivityBusiness' && executeLastActivityBusiness === 'true') {
            lodash.set(draft, `${caseCategory}.triggerPostQC`, 'false');
            setCommonFields();
          }

          if (field === 'triggerPostQC' && triggerPostQC === 'true') {
            setCommonFields();
          }
          if (field === 'decision' && decision !== 'D') {
            lodash.set(draft, `${caseCategory}.declineReason`, '');
            lodash.set(draft, `${caseCategory}.editDeclineReason`, '');
          }
          if (field === 'declineReason' && declineReason !== '999') {
            lodash.set(draft, `${caseCategory}.editDeclineReason`, '');
          }
        });
        setDataMap(updatedDataMap);
      }
    },
    [caseCategory, dataMap]
  );

  const handleSearch = useCallback(async () => {
    const newParams = form.getFieldsValue();

    if (!newParams?.inquiryBusinessNo && !newParams?.caseNo) {
      handleMessageModal([
        {
          code: 'empty code',
          content: 'Not all field empty!',
        },
      ]);
      return;
    }

    setSearchLoading(true);
    const dataList = await queryDataList(newParams).catch((errorList) => {
      setSearchLoading(false);
      handleMessageModal(errorList);
    });
    setSearchLoading(false);
    let caseCategoryList: any = [];
    const mapData = lodash.reduce(
      dataList,
      (map: any, data: any) => {
        map[data.caseCategory] = { ...data, ...getActiveIssueDefaultData() };
        caseCategoryList.push(data.caseCategory);
        return map;
      },
      {}
    );
    caseCategoryList = lodash.uniq(caseCategoryList).map((cate) => ({
      dictCode: cate,
      dictName: formatMessageApi({ Dropdown_PRC_workFlow: cate }),
    }));
    setDataMap(mapData);
    setCaseCategoryOptions(caseCategoryList);
    setCaseCategory(caseCategoryList[0]?.dictCode);
    setSearchLoading(false);
  }, [inquiryBusinessNo, setCaseCategory]);

  const selectedData = useMemo(() => {
    const data: any = lodash.get(dataMap, caseCategory);

    let extra: any = {};
    switch (data?.businessCode) {
      case 'BIZ002':
        extra = {
          decision: !!data?.decision ? data?.decision : 'A',
          getDataFromSnapshot: true,
        };
        break;

      default:
        break;
    }
    return data
      ? {
          ...data,
          ...extra,
          policyIssueDate: lodash.isObject(data?.policyIssueDate)
            ? data?.policyIssueDate
            : data?.policyIssueDate && moment(new Date(data.policyIssueDate)).format('YYYY-MM-DD'),
        }
      : null;
  }, [caseCategory, dataMap]);

  const handleCommit = useCallback(async () => {
    activeIssueBoxForm?.current?.validateFields({ force: true }, async (errors: any) => {
      if (errors) {
        console.error('errors', errors);
      } else {
        //success
        setCommitLoading(true);
        await commitCase(selectedData)
          .then(() => {
            notification.success({
              message: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000846' }),
            });
            handleSearch();
            setCommitLoading(false);
          })
          .catch((error) => {
            handleMessageModal(error);
            setCommitLoading(false);
          });
      }
    });
  }, [handleSearch, selectedData, activeIssueBoxForm]);

  const onFeldChange = (e) => {
    setInquiryBusinessNo(e.target.value);
  };

  return (
    <Commonbox
      title={formatMessageApi({ Label_COM_MonitorCenter: 'SpecialHandler' })}
      click={() => setExpand(!isExpand)}
    >
      <div className={styles.searchBox}>
        <div className={styles.fieldBox}>
          <FormItemInput
            form={form}
            formName="inquiryBusinessNo"
            labelId="ApplicationNo"
            labelTypeCode="Label_COM_MonitorCenter"
            onBlur={onFeldChange}
          />
          <FormItemInput
            form={form}
            formName="caseNo"
            labelId="CaseNo"
            labelTypeCode="Label_COM_MonitorCenter"
          />
        </div>

        <div className={styles.buttonBox}>
          <Button
            type="primary"
            className={styles.button}
            onClick={handleSearch}
            loading={searchLoading}
          >
            {formatMessageApi({ Label_COM_MonitorCenter: 'Search' })}
          </Button>
          <Button
            loading={commitLoading}
            onClick={handleCommit}
            disabled={lodash.isEmpty(selectedData) || commitLoading}
          >
            {!commitLoading && <Icon component={forwardSVG} />}
            <span>{formatMessageApi({ Label_COM_MonitorCenter: 'Commit' })}</span>
          </Button>
        </div>
      </div>
      <ActiveIssueBox
        caseCategoryOptions={caseCategoryOptions}
        data={selectedData}
        setFieldData={setFieldData}
        formRef={activeIssueBoxForm}
        isExpand={isExpand}
      />
    </Commonbox>
  );
}
export default Form.create()(SpecialHandler);
