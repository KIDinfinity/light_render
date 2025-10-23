import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { Icon, Row, Col } from 'antd';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useGetExclusionColumns from './_hooks/useGetExclusionColumns';
import useGetBenefitLevelExclusion from './_hooks/useGetBenefitLevelExclusion';
import ExclusionSection from './ExclusionSection';
import styles from './index.less';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import useGetSustainabilityCaseCheckStatus from 'opus/NewBusiness/ManualUnderwriting/Pages/SustainabilityCaseModal/CheckingProvider/hooks/useGetSustainabilityCaseCheckStatus';
import { Collapse } from 'antd';
import BenefitLevelDecision from 'opus/NewBusiness/Enum/BenefitLevelDecision';
import { formUtils } from 'basic/components/Form';
import { ReactComponent as PlusIcon } from 'packages/Opus/Assets/icon-plus.svg';
import useGetDisabledByCoverageField from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetDisabledByCoverageField';
import { DeleteButton } from 'opus/Components/Modals/DeleteModal';
import ExtraExclusionSection from './ExtraExclusionSection';
import useGetGlobalConfig from 'opus/Hooks/useGetGlobalConfig';
import { GlobalConfigCodeType } from 'opus/Enums';
import CompanyCode from 'opus/NewBusiness/Enum/CompanyCode';
import getCaseCompanyCode from 'packages/Opus/NewBusiness/ManualUnderwriting/_utils/getCaseCompanyCode';

const { Panel } = Collapse;
const Exclusion = ({ record, disabled }: any) => {
  const companyCode = getCaseCompanyCode();
  const dispatch = useDispatch();
  const taskNotEditable = useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable,
    shallowEqual
  );
  const exclusionColumns = useGetExclusionColumns();
  const finalExclusionColumns = useMemo(() => {
    return lodash.filter(exclusionColumns, (item: any) => item?.id !== 'productName');
  }, [exclusionColumns]);

  const exclusionRemarkSingle = useGetGlobalConfig({
    codeType: GlobalConfigCodeType.exclusionRemarkSingle,
  });

  const productCode = useMemo(() => {
    return lodash.get(record, 'coreCode');
  }, [record]);
  const coverageId = useMemo(() => {
    return lodash.get(record, 'id');
  }, [record]);
  const exclusionList: any = useGetBenefitLevelExclusion({ coverageId });

  const removeExclusion = (id: string) => () => {
    dispatch({
      type: `${NAMESPACE}/deleteBenefitLevelExclusionItem`,
      payload: {
        id,
        coverageItemId: coverageId,
        exclusionRemarkSingle,
      },
    });
    dispatch({
      type: `${NAMESPACE}/supplyUwDecisionEditInd`,
    });
  };

  const onExpander = useCallback(
    (coverageItem: any) => {
      const { id } = coverageItem;
      dispatch({
        type: `${NAMESPACE}/addBenefitLevelExclusion`,
        payload: {
          coverageId: id,
        },
      });
    },
    [dispatch]
  );

  const { editableOfSustainability = true } = useGetSustainabilityCaseCheckStatus();

  return (
    <div
      className={classnames({
        [styles.wrap]: !lodash.isEmpty(exclusionList),
        [styles.noWrap]: lodash.isEmpty(exclusionList),
      })}
      data-id="Exclusion"
    >
      {!lodash.isEmpty(exclusionList) ? (
        <>
          <div className={styles.benefit}>
            <Row gutter={[16, 16]} className={styles.fie} align="middle">
              {lodash.map(finalExclusionColumns, (item, index) => (
                <Col key={index} span={item?.span} className={styles.loadingTitle}>
                  {item?.title}
                </Col>
              ))}
            </Row>
          </div>
        </>
      ) : null}
      {lodash.map(exclusionList, (item: any) => {
        const isCompulsory = item.compulsoryInd === 'Y';
        return (
          <div key={item?.id} className={styles.exclusionList}>
            <div className={styles.exclusion}>
              <ExclusionSection
                editable={!isCompulsory && !disabled}
                exclusionField={item}
                id={item?.id}
                coverageId={record?.id}
                productCode={productCode}
                editableOfSustainability={editableOfSustainability}
              />
            </div>
            {!taskNotEditable && editableOfSustainability && !disabled ? (
              <div className={styles.btnWrap}>
                {!isCompulsory && (
                  <DeleteButton className={styles.icon} handleDelete={removeExclusion(item.id)} />
                )}
                {item?.id === exclusionList[exclusionList?.length - 1]?.id ? (
                  <div className={styles.icon} onClick={() => onExpander(record)}>
                    <Icon component={PlusIcon} />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        );
      })}
      {exclusionList.length > 0 && companyCode === CompanyCode.LA && (
        <div className={styles.exclusion}>
          <ExtraExclusionSection
            exclusionList={exclusionList}
            editable={!disabled}
            coverageId={record?.id}
            sectionClassName={styles.extraExclusionSection}
          />
        </div>
      )}
    </div>
  );
};

const ExclusionCollapse = (props) => {
  const { record } = props;
  const dispatch = useDispatch();
  const [activityKey, setActiveKey] = useState('Exclusion');
  const coverageId = lodash.get(record, 'id');
  const decision = formUtils.queryValue(lodash.get(record?.coverageDecision, 'uwDecision'));
  const exclusionList: any = useGetBenefitLevelExclusion({ coverageId });
  const editExclusionDisabled = useGetDisabledByCoverageField({
    id: coverageId,
    dataBasicField: 'exclusionEditInd',
    dataBasicFieldValue: 'N',
  });
  const onExpander = useCallback(
    (coverageItem: any) => {
      const { id } = coverageItem;
      dispatch({
        type: `${NAMESPACE}/addBenefitLevelExclusion`,
        payload: {
          coverageId: id,
        },
      });
    },
    [dispatch]
  );
  const handleChange = (key) => {
    setActiveKey(key?.[0]);
  };
  useEffect(() => {
    setActiveKey(exclusionList?.length ? 'Exclusion' : '');
  }, [exclusionList?.length]);
  const Extra = () => {
    return (
      <>
        {!exclusionList?.length && !editExclusionDisabled ? (
          <div className={styles.addLoading} onClick={() => onExpander(record)}>
            <Icon component={PlusIcon} />
            <span>Add Exclusion</span>
          </div>
        ) : null}
      </>
    );
  };
  return decision === BenefitLevelDecision.NonStandard ? (
    <div className={styles.container}>
      <Collapse
        expandIconPosition="right"
        activeKey={activityKey}
        onChange={handleChange}
        defaultActiveKey={'Exclusion'}
      >
        <Panel header="Exclusion" key="Exclusion" extra={<Extra />}>
          <Exclusion {...props} disabled={editExclusionDisabled} />
        </Panel>
      </Collapse>
    </div>
  ) : null;
};

ExclusionCollapse.displayName = 'exclusion';

export default ExclusionCollapse;
