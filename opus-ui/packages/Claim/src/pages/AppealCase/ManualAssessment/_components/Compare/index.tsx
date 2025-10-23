import React from 'react';
import lodash from 'lodash';
import { Col, Card } from 'antd';
import { connect } from 'dva';
import classNames from 'classnames';
import { withContextData, Provider } from '@/components/_store';
import { isReactElement } from '@/utils/utils';
import { ESectionType, ECaseType } from 'claim/pages/AppealCase/ManualAssessment/_dto/Enums';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { BenefitCategory } from 'claim/pages/utils/claim';
import TriggerButton from './TriggerButton';
import cloneElement from './cloneElement';
import OriginLabel from './OriginLabel';

import styles from './styles.less';

interface IProps {
  children?: React.ReactNode;
  horizontal?: boolean;
  lightOffGlobal?: boolean;
  originWith?: number;
  dispatch: any;
  handleBtnClick: any;
  handleBtnHover: any;
  expandOrigin?: boolean;
  noHover?: boolean;
  withData?: any;
  sectionType?: string;
  appealPage?: number;
  incidentId?: string;
  benefitCategory?: string;
}

interface IState {
  lightOff: boolean;
  fixed: boolean;
  withData: any;
}

class Compare extends React.Component<IProps, IState> {
  state = {
    lightOff: true,
    fixed: true,
    withData: {},
  };

  componentDidMount = async () => {
    await this.updateWithDataState();
    this.updateSavePageArrowManage();
  };

  componentDidUpdate = async (prevProps: any) => {
    const { withData, appealPage, expandOrigin } = this.props;
    if (
      !lodash.isEqual(withData, prevProps.withData) ||
      !lodash.isEqual(appealPage, prevProps.appealPage) ||
      !lodash.isEqual(expandOrigin, prevProps.expandOrigin)
    ) {
      await this.updateWithDataState();
      this.updateSavePageArrowManage();
    }
  };

  updateWithDataState = async () => {
    const { dispatch }: any = this.props;
    const { dataAppeal } = this.updateWithData();
    const { incidentId }: any = dataAppeal;

    dispatch({
      type: 'MaAppealCaseController/saveWithDataState',
      payload: {
        incidentId,
        withData: dataAppeal,
      },
    });
  };

  get getOriginTitle() {
    const { sectionType }: any = this.props;
    const isTreatment = ESectionType.Treatment === sectionType;
    const isInvoice = ESectionType.Invoice === sectionType;
    const isIncident = ESectionType.Incident === sectionType;
    const isAssessmentResult = ESectionType.AssessmentResult === sectionType;

    if (isIncident)
      return formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.originalIncidentNo' });
    if (isTreatment)
      return formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.originalTreatmentNo' });
    if (isInvoice)
      return formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.originalInvoiceNo' });
    if (isAssessmentResult)
      return formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.originalClaimResult' });

    return null;
  }

  get getOriginChildren() {
    const { children } = this.props;
    const OriginCase = cloneElement(children, { originCase: ECaseType.originCase });

    return lodash.map(OriginCase, (element: any, index: number) => {
      if (isReactElement(element)) {
        const subChildren = lodash.get(element, 'props.children');
        const subInnerChildren = lodash.get(subChildren, 'props.children');
        let series = lodash.get(subChildren, 'props.title');
        series = lodash.isString(series) ? series.split('.')[1] : '';
        const key = lodash.get(subChildren, 'key');
        const hasClass = lodash.has(children?.props, 'className') && !!children?.props?.className;

        return (
          <Col
            {...(children?.props || {})}
            className={classNames(
              styles.originPart,
              styles.compare,
              hasClass && children?.props?.className
            )}
            key={`${key}-${index}`}
          >
            <OriginLabel
              labelText={formatMessageApi({
                Label_BIZ_Claim: 'venus_claim.label.originalClaim',
              })}
            />
            <Card
              {...(subChildren?.props || {})}
              title={`${this.getOriginTitle} ${series || ''}`}
              extra={this.getOriginExtra(subChildren)}
              bordered={false}
            >
              {subInnerChildren}
            </Card>
          </Col>
        );
      }
      return null;
    });
  }

  getAppealChildren = () => {
    const { children, horizontal, lightOffGlobal, expandOrigin } = this.props;
    const subChildren = lodash.get(children, 'props.children');
    const { lightOff } = this.state;
    const hasClass = lodash.has(children?.props, 'className') && !!children?.props?.className;

    return (
      <Col
        {...(children?.props || {})}
        className={classNames(
          styles.appealPart,
          styles.compare,
          hasClass && children?.props?.className
        )}
      >
        {subChildren}
        <TriggerButton
          expanded={expandOrigin}
          horizontal={horizontal}
          onMouseHover={(e) => this.handleBtnHover(e)}
          onMouseLeave={(e) => this.handleBtnHover(e)}
          onClick={(e) => this.handleBtnClick(e)}
        />
        {!lightOffGlobal && !lightOff ? (
          <div className={styles.cover} onClick={this.handleCoverClick} />
        ) : null}
      </Col>
    );
  };

  handleCoverClick = () => {
    const { dispatch } = this.props;
    this.setState((preState: IState) => {
      return { ...preState, lightOff: !preState.lightOff };
    });
    dispatch({
      type: 'MaAppealCaseController/saveLightOff',
      payload: {
        lightOff: false,
      },
    });
  };

  handleBtnClick = (e: any) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const { handleBtnClick } = this.props;
    const { fixed } = this.state;

    this.setState((preState: IState) => {
      return { ...preState, fixed: !preState.fixed };
    });

    if (lodash.isFunction(handleBtnClick)) handleBtnClick(fixed);
  };

  handleBtnHover = (e: any) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const { handleBtnClick, expandOrigin, noHover } = this.props;
    const debunce = lodash.debounce(handleBtnClick, 150);
    const { fixed } = this.state;

    if ((fixed && expandOrigin) || noHover) return;

    if (lodash.isFunction(handleBtnClick)) debunce();
  };

  isExpandOrigin = () => {
    const { sectionType, expandOrigin, appealPage, withData }: any = this.props;
    const { expandedIncident, expandedTreatment }: any = withData || {};

    const isTreatment = ESectionType.Treatment === sectionType;
    const isInvoice = ESectionType.Invoice === sectionType;
    const isIncident = ESectionType.Incident === sectionType;

    // incident origin information 现在大于第一页的地方隐藏
    if (isIncident && appealPage > 0) return false;

    // treatment origin information 在第一页且incident展开时或者大于第一页的时候隐藏
    if (isTreatment && ((expandedIncident && appealPage === 0) || appealPage > 1)) return false;
    // treatment origin information 在第二页且incident未展开，treatment展开的时候隐藏
    if (isTreatment && !expandedIncident && appealPage === 1) return false;

    // invoice origin information 只出现在第三页
    if (isInvoice && appealPage < 1) return false;
    if (isInvoice && expandedIncident && expandedTreatment && appealPage === 1) return false;
    return expandOrigin;
  };

  isExpandAppeal = () => {
    const { sectionType, withData, appealPage }: any = this.props;
    const { expandedIncident, expandedTreatment } = withData;
    const isTreatment = ESectionType.Treatment === sectionType;
    const isInvoice = ESectionType.Invoice === sectionType;
    const isIncident = ESectionType.Incident === sectionType;

    // incident appeal information 不出现在大于第一页的地方
    if (isIncident && appealPage > 0) return false;
    // treatment appeal information 不出现在大于第二页的地方
    if (isTreatment && appealPage > 1) return false;
    // treatment origin information 在第二页且incident未展开，treatment展开的时候隐藏
    if (isTreatment && !expandedIncident && appealPage === 1) return false;

    // invoice appeal information 在第一页时，incident或者treatment只要有一个展开就不出现
    if (isInvoice && (expandedIncident || expandedTreatment) && appealPage === 0) return false;

    return true;
  };

  getOriginExtra = (subChildren: any) => {
    const { sectionType }: any = this.props;
    const isTreatment = ESectionType.Treatment === sectionType;
    const isInvoice = ESectionType.Invoice === sectionType;
    const isIncident = ESectionType.Incident === sectionType;
    const isAssessmentResult = ESectionType.AssessmentResult === sectionType;
    const extra = lodash.get(subChildren, 'props.extra');

    if (isIncident || isTreatment || isAssessmentResult) return null;
    if (isInvoice) return extra;
  };

  updateSavePageArrowManage = () => {
    const {
      withData,
      withDataState = {},
      appealPage,
      expandOrigin,
      dispatch,
      incidentId: curIncidentProps,
    }: any = this.props;
    const { incidentId: incidentIdWithData }: any = withData;
    const curIncidentId = curIncidentProps || incidentIdWithData;
    const { expandedIncident, expandedTreatment, benefitCategory, incidentId }: any =
      withDataState[curIncidentId] || {};

    let showLeft = true;
    let showRight = true;

    if (benefitCategory === BenefitCategory.life) {
      showLeft = false;
      showRight = false;
    }

    if (benefitCategory === BenefitCategory.aipa || benefitCategory === BenefitCategory.cashless) {
      if (appealPage === 0) {
        showLeft = false;
        showRight = !!(expandedIncident && expandOrigin);
      }

      if (appealPage === 1) {
        showRight = false;
      }
    }

    if (benefitCategory === BenefitCategory.reimbursement) {
      if (appealPage === 0) {
        showLeft = false;
        showRight = !!(expandedIncident || expandedTreatment);
      }

      if (appealPage === 1) {
        showRight = !!(expandedIncident && expandedTreatment && expandOrigin);
      }

      if (appealPage === 2) {
        showRight = false;
      }
    }

    if (benefitCategory && incidentId) {
      dispatch({
        type: 'MaAppealCaseController/savePageArrowManage',
        payload: {
          incidentId,
          showLeft,
          showRight,
        },
      });
    }
  };

  updateWithData = () => {
    const {
      withData,
      appealPage,
      expandOrigin,
      originalCaseCategory,
      sectionType,
      incidentId: curIncidentProps,
      benefitCategory: benefitCategoryProps,
    }: any = this.props;
    const { benefitCategory, incidentId }: any = withData;
    const curIncidentId = curIncidentProps || incidentId;
    const curBenefitCategory = benefitCategory || benefitCategoryProps;

    const isTreatment = ESectionType.Treatment === sectionType;
    const isInvoice = ESectionType.Invoice === sectionType;
    const isIncident = ESectionType.Incident === sectionType;

    let dataOrigin: any = {
      caseType: ECaseType.originCase,
      expandOrigin,
      appealPage,
      appealNotEditable: true,
      originalCaseCategory,
      incidentId: curIncidentId,
      benefitCategory: curBenefitCategory,
    };

    let dataAppeal: any = {
      caseType: '',
      expandOrigin,
      appealPage,
      incidentId: curIncidentId,
      benefitCategory: curBenefitCategory,
    };

    if (isIncident) {
      dataOrigin = { ...dataOrigin, expandedIncident: expandOrigin };
      dataAppeal = { ...dataAppeal, expandedIncident: expandOrigin };
    }

    if (isTreatment) {
      dataOrigin = { ...dataOrigin, expandedTreatment: expandOrigin };
      dataAppeal = { ...dataAppeal, expandedTreatment: expandOrigin };
    }

    if (isInvoice) {
      dataOrigin = { ...dataOrigin, expandedInvoice: expandOrigin };
      dataAppeal = { ...dataAppeal, expandedInvoice: expandOrigin };
    }

    return { dataOrigin, dataAppeal };
  };

  render() {
    const { dataAppeal, dataOrigin }: any = this.updateWithData();

    return (
      <>
        {this.isExpandAppeal() && <Provider data={dataAppeal}>{this.getAppealChildren()}</Provider>}
        {this.isExpandOrigin() && <Provider data={dataOrigin}>{this.getOriginChildren}</Provider>}
      </>
    );
  }
}

export default connect(({ MaAppealCaseController }: any) => ({
  lightOffGlobal: MaAppealCaseController.lightOff,
  appealPage: MaAppealCaseController.appealPage,
  withDataState: MaAppealCaseController.withDataState,
  originalCaseCategory: MaAppealCaseController.claimAppealInfo?.originalCaseCategory,
}))(withContextData(Compare));
