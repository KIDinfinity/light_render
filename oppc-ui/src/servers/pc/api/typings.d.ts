declare namespace API {
  type Agent = {
    agentCode?: string;
    branchName?: string;
    fullName?: string;
    virtualBranch?: string;
    agentCert?: string;
    bankStaffPhone?: string;
    bankStaffNo?: string;
    bankStaffRefName?: string;
    partnerCert?: string;
    agentPhone?: string;
  };

  type Alterations = {
    charityOrgList?: CharityOrg[];
    topUp?: Record;
    withdrawal?: Record;
  };

  type AssessmentDomain = {
    productCodes?: string[];
    benefitItemCodes?: string[];
    benefitTypeCodes?: string[];
    benefitTypeCodeHistories?: string[];
    regionCode?: string;
    benefitSettingMap?: Record;
  };

  type AsyncQueryVO = {
    url?: string;
    asyncTraceId?: string;
  };

  type BasicInfo = {
    currency?: string;
    paymentMode?: string;
    riskCommenceDate?: string;
    initialPaymentMethod?: string;
    backDate?: string;
    rateDate?: string;
    needSupportOldCase?: string;
    campaignReferenceDate?: string;
  };

  type BeneficiaryVO = {
    clientType?: string;
    fullName?: string;
    dob?: string;
    age?: number;
    gender?: string;
    title?: string;
    smoker?: string;
    nationality?: string;
    residentCountry?: string;
    occClass?: string;
    occGroupCode?: string;
    occupation?: string;
  };

  type CallerConfig = {
    forwardUrl?: string;
    requestDataPath?: string;
    forwardMethod?: string;
    prefixUrl?: string;
    requestUrl?: string;
    httpMethod?: string;
    headerFromMdc?: string[];
    headerConfig?: Record;
    forwardAllMdcHeader?: boolean;
    responseClassType?: string;
    loopObjectPath?: string;
    machineConfigPath?: string;
    catchException?: boolean;
    restTemplateConfig?: RestTemplateConfig;
    loopType?: string;
    criteria?: QueryConfig[];
    retryTimes?: number;
    machineConfigKeys?: string[];
    convertFormat?: string;
  };

  type CallerLogInfo = {
    requestUrl?: string;
    requestMethod?: HttpMethod;
    httpHeaders?: {
      empty?: boolean;
      location?: string;
      host?: {
        hostString?: string;
        address?: {
          hostAddress?: string;
          address?: string[];
          hostName?: string;
          linkLocalAddress?: boolean;
          multicastAddress?: boolean;
          anyLocalAddress?: boolean;
          loopbackAddress?: boolean;
          siteLocalAddress?: boolean;
          mcglobal?: boolean;
          mcnodeLocal?: boolean;
          mclinkLocal?: boolean;
          mcsiteLocal?: boolean;
          mcorgLocal?: boolean;
          canonicalHostName?: string;
        };
        port?: number;
        unresolved?: boolean;
        hostName?: string;
      };
      all?: Record;
      lastModified?: number;
      date?: number;
      contentLength?: number;
      origin?: string;
      range?: HttpRange[];
      cacheControl?: string;
      allow?: HttpMethod[];
      acceptCharset?: string[];
      etag?: string;
      contentLanguage?: {
        language?: string;
        displayName?: string;
        country?: string;
        variant?: string;
        script?: string;
        unicodeLocaleAttributes?: string[];
        unicodeLocaleKeys?: string[];
        displayLanguage?: string;
        displayScript?: string;
        displayCountry?: string;
        displayVariant?: string;
        extensionKeys?: string[];
        iso3Language?: string;
        iso3Country?: string;
      };
      contentDisposition?: ContentDisposition;
      accessControlExposeHeaders?: string[];
      acceptLanguage?: { range?: string; weight?: number }[];
      basicAuth?: string;
      accept?: MediaType[];
      acceptLanguageAsLocales?: {
        language?: string;
        displayName?: string;
        country?: string;
        variant?: string;
        script?: string;
        unicodeLocaleAttributes?: string[];
        unicodeLocaleKeys?: string[];
        displayLanguage?: string;
        displayScript?: string;
        displayCountry?: string;
        displayVariant?: string;
        extensionKeys?: string[];
        iso3Language?: string;
        iso3Country?: string;
      }[];
      acceptPatch?: MediaType[];
      accessControlAllowCredentials?: boolean;
      accessControlAllowHeaders?: string[];
      accessControlAllowMethods?: HttpMethod[];
      accessControlAllowOrigin?: string;
      accessControlMaxAge?: number;
      accessControlRequestHeaders?: string[];
      accessControlRequestMethod?: HttpMethod;
      bearerAuth?: string;
      connection?: string[];
      expires?: number;
      ifMatch?: string[];
      ifNoneMatch?: string[];
      ifUnmodifiedSince?: number;
      pragma?: string;
      upgrade?: string;
      vary?: string[];
      ifModifiedSince?: number;
      contentType?: MediaType;
    };
    requestData?: Record;
    callId?: string;
    responseEntity?: string;
    callTime?: number;
    returnTime?: number;
    duration?: number;
    transId?: string;
    feignResponseData?: Record;
    exceptionMessage?: string;
  };

  type callParams = {
    function: string;
    operation: string;
  };

  type CfgChannelMappingDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    companyCode?: string;
    submissionChannel?: string;
    agentChannelCode?: string;
    agentSubChannelCode?: string;
    localPcChannelCode?: string;
    laChannelCode?: string;
  };

  type CfgFormulaLibDO = {
    id?: string;
    deleted?: number;
    formulaCode?: string;
    category?: string;
    formula?: string;
    formulaDescription?: string;
  };

  type CfgLetterControlDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    letterType?: string;
    productCode?: string;
    productNamePrint?: string;
    premiumCodePrint?: string;
    baseProductCode?: string;
    displayInd?: string;
  };

  type CfgLoadingMappingWithNanoDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    productCode?: string;
    loadingCode?: string;
    reasonCode?: string;
    nanoLoadingCode?: string;
    nanoLoadingTerm?: string;
    productType?: string;
    excludeInd?: string;
    operator?: string;
  };

  type CfgLoadingMappingWithUwmeDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    productType?: string;
    uwmeLoadingCode?: string;
    loadingCode?: string;
    excludeDefaultFormula?: boolean;
    contractType?: string;
    productCode?: string;
    key?: string;
  };

  type CfgLogLevelVO = {
    serviceName?: string;
    logName?: string;
    logLevel?: string;
    logExtendName?: string;
    logExtendConfig?: LogExtendConfigVO;
  };

  type CfgMiscDictDO = {
    id?: string;
    deleted?: number;
    regionCode?: string;
    typeCode?: string;
    productCode?: string;
    sourceSystem?: string;
    dictCode?: string;
    dictName?: string;
    dictComment?: string;
    language?: string;
    orderNo?: string;
  };

  type CfgPlanApiFieldTranslationDO = {
    id?: string;
    deleted?: number;
    regionCode?: string;
    companyCode?: string;
    apiName?: string;
    targetSystem?: string;
    type?: string;
    productCode?: string;
    sourceProductCode?: string;
    targetFieldName?: string;
    sourceFieldName?: string;
    defaultValue?: string;
    sourceTable?: string;
    formulaCode?: string;
  };

  type CfgPlanAutoAttachedRuleBO = {
    id?: string;
    deleted?: number;
    regionCode?: string;
    companyCode?: string;
    baseProductCode?: string;
    productCode?: string;
    riderCode?: string;
    riderSeq?: number;
    autoAttachedInd?: string;
    autoAttachedRuleJson?: string;
    autoAttachedFormulaCode?: string;
    channel?: string;
    subChannelCode?: string;
    usageCode?: string;
    cfgFormulaLib?: CfgFormulaLibDO;
  };

  type CfgPlanDecommissionDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    baseProductCode?: string;
    productCode?: string;
    decommissionPeriodFromDate?: string;
    decommissionPeriodToDate?: string;
    decommissionLevel?: string;
    decommissionDateType?: string;
    versionNo?: string;
    ilpVersionNo?: string;
  };

  type CfgPlanDictPidDO = {
    id?: string;
    deleted?: number;
    regionCode?: string;
    companyCode?: string;
    pid?: string;
    pidName?: string;
    pidLocalName?: string;
    channel?: string;
    subChannelCode?: string;
    effectiveDateFrom?: string;
    effectiveDateTo?: string;
  };

  type CfgPlanDictProductBO = {
    id?: string;
    deleted?: number;
    regionCode?: string;
    productCode?: string;
    productName?: string;
    productType?: string;
    groupIndividualIndicator?: string;
    productLocalName?: string;
    subProductType?: string;
    productCategory?: string;
    effectiveDateFrom?: string;
    effectiveDateTo?: string;
    companyCode?: string;
    productOpName?: string;
    productLocalOpName?: string;
    channel?: string;
    subChannelCode?: string;
    allowReinInd?: string;
  };

  type CfgPlanDictProductDO = {
    id?: string;
    deleted?: number;
    regionCode?: string;
    productCode?: string;
    productName?: string;
    productType?: string;
    groupIndividualIndicator?: string;
    productLocalName?: string;
    subProductType?: string;
    productCategory?: string;
    effectiveDateFrom?: string;
    effectiveDateTo?: string;
    companyCode?: string;
    productOpName?: string;
    productLocalOpName?: string;
    channel?: string;
    subChannelCode?: string;
  };

  type CfgPlanDiscountDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    productCode?: string;
    effectiveDateFrom?: string;
    effectiveDateTo?: string;
    discountType?: string;
    campaignCode?: string;
    currencyCode?: string;
    saMin?: number;
    saMax?: number;
    companyCode?: string;
    discountLevel?: string;
    discountValueType?: string;
    discountValue?: number;
    isSupported?: string;
  };

  type CfgPlanExtraPremiumLoadingRuleDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    productCode?: string;
    addLoading?: string;
    meAllowIndicator?: string;
    meMin?: number;
    meMax?: number;
    feAllowIndicator?: string;
    feMin?: number;
    feMax?: number;
    rateAllowIndicator?: string;
    rateMin?: number;
    rateMax?: number;
    includeRiderLoadingInd?: string;
    meTermFollowCode?: string;
    feTermFollowCode?: string;
    rateTermFollowCode?: string;
  };

  type CfgPlanFundBO = {
    regionCode?: string;
    productCode?: string;
    fundCode?: string;
    portfolioId?: string;
    portfolioType?: string;
    minAllocationPercentage?: string;
    maxAllocationPercentage?: string;
    defaultAllocationPercentage?: string;
  };

  type CfgPlanHospitalBenefitDO = {
    id?: string;
    deleted?: number;
    regionCode?: string;
    productCode?: string;
    benefitPlan?: string;
    rbLimit?: string;
    deductible?: string;
    annualLimit?: number;
    sumAssured?: number;
    classes?: string;
    benefitPlanAlias?: string;
  };

  type CfgPlanHospitalBenefitUnitDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    benefitPlan?: string;
    numberOfUnits?: number;
  };

  type CfgPlanInitialPremiumDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    productCode?: string;
    policyPayMode?: string;
    renewalPaymentMethod?: string;
    nanoPremiumCode?: string;
    channelCode?: string;
    numOfInstallment?: string;
  };

  type CfgPlanLoadingReasonDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    productCode?: string;
    loadingFunctionType?: string;
    loadingReason?: string;
  };

  type CfgPlanMiscCommonHierarchyLinkDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    productCode?: string;
    parentCode?: string;
    parentFieldName?: string;
    subCode?: string;
    subFieldName?: string;
    dataType?: string;
  };

  type CfgPlanOptionConfigBO = {
    id?: string;
    deleted?: number;
    conditionKey?: string;
    planOption?: string;
    planOptionValue?: string;
    operator?: string;
    planOptionFormulaCode?: string;
    planOptionFormulaLib?: CfgFormulaLibDO;
  };

  type CfgPlanPackageBO = {
    id?: string;
    deleted?: number;
    regionCode?: string;
    contractType?: string;
    productCode?: string;
    productRequiredInd?: string;
    lifeCode?: string;
    riderCode?: string;
    riderRequiredInd?: string;
    maxNo?: number;
    freeRiderInd?: string;
    companyCode?: string;
    effectiveDateFrom?: string;
    effectiveDateTo?: string;
  };

  type CfgPlanPackageDO = {
    id?: string;
    deleted?: number;
    regionCode?: string;
    contractType?: string;
    productCode?: string;
    productRequiredInd?: string;
    lifeCode?: string;
    riderCode?: string;
    riderRequiredInd?: string;
    maxNo?: number;
    freeRiderInd?: string;
    companyCode?: string;
    effectiveDateFrom?: string;
    effectiveDateTo?: string;
  };

  type CfgPlanProductCenterFeatureDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    productCode?: string;
    pid?: string;
    riskType?: string;
    benefitSubType?: string;
    productLine?: string;
    priority?: string;
    payerInd?: string;
    embedInd?: string;
    crsInd?: string;
    amlaInd?: string;
    fatcaInd?: string;
    oldDecommissionDate?: string;
    decommissionDate?: string;
    versionNo?: string;
  };

  type CfgPlanProductDurationDO = {
    id?: string;
    deleted?: number;
    regionCode?: string;
    productCode?: string;
    baseProductCode?: string;
    effectiveDateFrom?: string;
    effectiveDateTo?: string;
    minimumIssueAge?: number;
    minimumIssueAgeType?: string;
    maximumIssueAge?: number;
    maximumIssueAgeType?: string;
    premiumTerm?: number;
    premiumTermType?: string;
    minimumPremiumTerm?: number;
    maximumPremiumTerm?: number;
    premiumTermDisplayType?: string;
    policyTerm?: number;
    policyTermType?: string;
    minimumPolicyTerm?: number;
    maximumPolicyTerm?: number;
    policyTermDisplayType?: string;
    regenSiAge?: number;
    livingBenefitAttainedAge?: number;
  };

  type CfgPlanProductFeatureBO = {
    id?: string;
    deleted?: number;
    regionCode?: string;
    productCode?: string;
    mortalityClass?: string;
    basicRiderCode?: string;
    wpPbCode?: string;
    saEditInd?: string;
    saFollowCode?: string;
    policyTermEditInd?: string;
    policyTermFollowCode?: string;
    premiumTermEditInd?: string;
    premiumTermFollowCode?: string;
    exclusionEditInd?: string;
    underwritingApproach?: string;
    underwritingDecisionEditInd?: string;
    premiumType?: string;
    channel?: string;
    isSupported?: string;
    ageFormulaCode?: string;
    defaultNfoCode?: string;
    loanProtection?: string;
    benefitPlanInd?: string;
    productLegacy?: string;
    allowReinstatement?: string;
    deathBenefitCode?: string;
    channelFollowCode?: string;
    premiumInUnitBasis?: string;
    annuityInd?: string;
    productValidateInd?: string;
    deductibleCode?: string;
    maturityInd?: string;
    benefitPlanEditInd?: string;
    waiveCode?: string;
    applicableToRole?: string;
    bankPayoutInd?: string;
    ropInd?: string;
    saMultiplierInd?: string;
    jointLifeAllowInd?: string;
    dividendInd?: string;
    icpInd?: string;
    healthFamilyGroupInd?: string;
    calculatedBy?: string;
    packageCode?: string;
    submissionChannel?: string;
    statutoryFund?: string;
    cashValueInd?: string;
    referenceKey?: string;
  };

  type CfgPlanProductFeatureDO = {
    id?: string;
    deleted?: number;
    regionCode?: string;
    productCode?: string;
    mortalityClass?: string;
    basicRiderCode?: string;
    wpPbCode?: string;
    saEditInd?: string;
    saFollowCode?: string;
    policyTermEditInd?: string;
    policyTermFollowCode?: string;
    premiumTermEditInd?: string;
    premiumTermFollowCode?: string;
    exclusionEditInd?: string;
    underwritingApproach?: string;
    underwritingDecisionEditInd?: string;
    premiumType?: string;
    channel?: string;
    isSupported?: string;
    ageFormulaCode?: string;
    defaultNfoCode?: string;
    loanProtection?: string;
    benefitPlanInd?: string;
    productLegacy?: string;
    allowReinstatement?: string;
    deathBenefitCode?: string;
    channelFollowCode?: string;
    premiumInUnitBasis?: string;
    annuityInd?: string;
    productValidateInd?: string;
    deductibleCode?: string;
    maturityInd?: string;
    benefitPlanEditInd?: string;
    waiveCode?: string;
    applicableToRole?: string;
    bankPayoutInd?: string;
    ropInd?: string;
    saMultiplierInd?: string;
    jointLifeAllowInd?: string;
    dividendInd?: string;
    icpInd?: string;
    healthFamilyGroupInd?: string;
    calculatedBy?: string;
    packageCode?: string;
    submissionChannel?: string;
    statutoryFund?: string;
    cashValueInd?: string;
    referenceKey?: string;
  };

  type CfgPlanProductFeatureDurationQO = {
    regionCode?: string;
    basicRiderCode?: string;
    premiumTermFollowCode?: string;
    policyTermFollowCode?: string;
    baseProductCode?: string;
    premiumTermType?: string;
    minimumPremiumTerm?: string;
    maximumPremiumTerm?: string;
    policyTermType?: string;
    minimumPolicyTerm?: string;
    maximumPolicyTerm?: string;
    productCode?: string;
    effectiveDateFrom?: string;
    effectiveDateTo?: string;
    minimumIssueAge?: string;
    maximumIssueAge?: string;
  };

  type CfgPlanProductItemVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    productCode?: string;
    productName?: string;
    mortalityClass?: string;
    basicRiderCode?: string;
    wpPbCode?: string;
    saEditInd?: string;
    saFollowCode?: string;
    policyTermEditInd?: string;
    policyTermFollowCode?: string;
    premiumTermEditInd?: string;
    premiumTermFollowCode?: string;
    exclusionEditInd?: string;
    underwritingDecisionEditInd?: string;
    underwritingApproach?: string;
    premiumType?: string;
    channel?: string;
    isSupported?: string;
    defaultNfoCode?: string;
    loanProtection?: string;
    benefitPlanInd?: string;
    productLegacy?: string;
    livingBenefitCode?: string;
    packageCode?: string;
    waiveCode?: string;
    ageFormulaCode?: string;
    applicableToRole?: string;
    bankPayoutInd?: string;
    benefitPlanEditInd?: string;
    businessCode?: string;
    allowReinstatement?: string;
    deathBenefitCode?: string;
    channelFollowCode?: string;
    premiumInUnitBasis?: string;
    annuityInd?: string;
    productValidateInd?: string;
    deductibleCode?: string;
    maturityInd?: string;
    submissionChannel?: string;
    requiredRiderCodeList?: string[];
    riderRequiredInd?: string;
    lifeCode?: string;
    maxNo?: string;
    linkProductCode?: string;
    subProductType?: string;
    meTermFollowCode?: string;
    feTermFollowCode?: string;
    rateTermFollowCode?: string;
    productCategory?: string;
    productType?: string;
    extProductType?: string;
    riderCodeList?: string[];
    relatedRider?: CfgPlanRiderItemBO[];
    rider?: boolean;
  };

  type CfgPlanProductMappingBO = {
    id?: string;
    deleted?: number;
    regionCode?: string;
    companyCode?: string;
    productCode?: string;
    pid?: string;
    conditionKey?: string;
    effectiveDateFrom?: string;
    effectiveDateTo?: string;
    optionConfigList?: CfgPlanOptionConfigBO[];
  };

  type CfgPlanProductParameterBO = {
    id?: string;
    deleted?: number;
    regionCode?: string;
    companyCode?: string;
    baseProductCode?: string;
    productCode?: string;
    riderCode?: string;
    paramName?: string;
    paramSeq?: number;
    valueRuleJson?: string;
    valueFormulaCode?: string;
    keepOriginValue?: string;
    cfgFormulaLib?: CfgFormulaLibDO;
  };

  type CfgPlanProductVO = {
    requiredProductCodeList?: string[];
    basicPlanProductFeatureList?: CfgPlanProductItemVO[];
    otherPlanProductFeatureList?: CfgPlanProductItemVO[];
  };

  type CfgPlanRiderItemBO = {
    id?: string;
    deleted?: number;
    regionCode?: string;
    productCode?: string;
    mortalityClass?: string;
    basicRiderCode?: string;
    wpPbCode?: string;
    saEditInd?: string;
    saFollowCode?: string;
    policyTermEditInd?: string;
    policyTermFollowCode?: string;
    premiumTermEditInd?: string;
    premiumTermFollowCode?: string;
    exclusionEditInd?: string;
    underwritingApproach?: string;
    underwritingDecisionEditInd?: string;
    premiumType?: string;
    channel?: string;
    isSupported?: string;
    ageFormulaCode?: string;
    defaultNfoCode?: string;
    loanProtection?: string;
    benefitPlanInd?: string;
    productLegacy?: string;
    allowReinstatement?: string;
    deathBenefitCode?: string;
    channelFollowCode?: string;
    premiumInUnitBasis?: string;
    annuityInd?: string;
    productValidateInd?: string;
    deductibleCode?: string;
    maturityInd?: string;
    benefitPlanEditInd?: string;
    waiveCode?: string;
    applicableToRole?: string;
    bankPayoutInd?: string;
    ropInd?: string;
    saMultiplierInd?: string;
    jointLifeAllowInd?: string;
    dividendInd?: string;
    icpInd?: string;
    healthFamilyGroupInd?: string;
    calculatedBy?: string;
    packageCode?: string;
    submissionChannel?: string;
    statutoryFund?: string;
    cashValueInd?: string;
    riderRequiredInd?: string;
    lifeCode?: string;
    maxNo?: number;
    linkProductCode?: string;
    subProductType?: string;
    meTermFollowCode?: string;
    feTermFollowCode?: string;
    rateTermFollowCode?: string;
    productCategory?: string;
    productType?: string;
    rider?: boolean;
    fieldsValue?: CfgPlanPackageDO[];
    referenceKey?: string;
  };

  type CfgPlanTsarCalculationDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    productCode?: string;
    regionCode?: string;
    riskType?: string;
    benefitSubType?: string;
    premiumType?: string;
    tsarCalculationCategory?: string;
    calculationBase?: string;
    seqNo?: number;
    multiplier?: number;
    currency?: string;
    fromAge?: number;
    toAge?: number;
    sumGroupKey?: string;
    additionalFunctionType?: string;
    priority?: string;
    groupBy?: string;
    termType?: string;
    fromTerm?: number;
    toTerm?: number;
  };

  type CfgPlanTsarTypeDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    tsarType?: string;
    riskType?: string;
    benefitSubType?: string;
    premiumType?: string;
    calculationType?: string;
    tsarCalculationCategory?: string;
    period?: string;
    channel?: string;
    status?: string;
    customerType?: string;
    additionalFunctionType?: string;
    roleInd?: string;
  };

  type CfgRegionToleranceDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    channelCode?: string;
    currency?: string;
    toleranceAmount?: number;
    companyCode?: string;
    productType?: string;
  };

  type CftPlanProductQO = {
    contractType?: string;
    agentChannel?: string;
    agentSubChannelCode?: string;
    businessCode?: string;
  };

  type CharityOrg = {
    code?: string;
    donation?: number;
  };

  type ClaimDictProductDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    productCode?: string;
    productName?: string;
    productType?: string;
    regionCode?: string;
    notPayFirst24Hours?: string;
    branchCode?: string;
    aliasProductCode?: string;
    calculationVersion?: string;
  };

  type ClientInfo = {
    clientType?: string;
    fullName?: string;
    dob?: string;
    age?: number;
    gender?: string;
  };

  type CompareConfig = {
    actualObjectPath?: string;
    expectObjectPath?: string;
    groupByFieldList?: string[];
    fieldJoinStr?: string;
    ignoreFieldConfigList?: IgnoreFieldConfig[];
  };

  type configUploadParams = {
    collectionName: string;
  };

  type ContentDisposition = {
    type?: string;
    name?: string;
    filename?: string;
    charset?: string;
    size?: number;
    creationDate?: string;
    modificationDate?: string;
    readDate?: string;
    attachment?: boolean;
    formData?: boolean;
    inline?: boolean;
  };

  type countByProductCodeAndPremiumTypeParams = {
    regionCode: string;
    productCode: string;
    premiumType: string;
  };

  type CoverageBO = {
    pid?: string;
    planCode?: string;
    insuredIndex?: number;
    decision?: string;
    sumAssured?: number;
    policyTerm?: number;
    policyAge?: number;
    premiumTerm?: number;
    premAge?: number;
    annualPrem?: number;
    basePrem?: number;
    classes?: string;
    deductible?: number;
    livingBenefitAttainedAge?: number;
    cashPayoutOption?: string;
    returnOfPremium?: string;
    sumAssuredMultiplier?: number;
    totalInvestmentAnnualPrem?: number;
    unit?: string;
    customerSegment?: string;
    retirementOption?: string;
    rbOption?: string;
    premiumType?: string;
    isContinuePremiumPay?: string;
    waivePlanList?: WaivePlan[];
    campaignCode?: string;
    midTermAddInd?: string;
    planEffectiveDate?: string;
    primarySubsidiaryInd?: string;
    loadings?: Loading[];
    maturityOption?: string;
    payoutAge?: number;
    retirementAge?: number;
    occClass?: string;
    riderType?: string;
    baseProductType?: string;
    attached?: boolean;
    autoAttachedRiderSeq?: number;
    coreOnly?: string;
    planType?: string;
    key?: string;
  };

  type CoverageVO = {
    pid?: string;
    planCode?: string;
    insuredIndex?: number;
    decision?: string;
    sumAssured?: number;
    policyTerm?: number;
    policyAge?: number;
    premiumTerm?: number;
    premAge?: number;
    annualPrem?: number;
    basePrem?: number;
    classes?: string;
    deductible?: number;
    livingBenefitAttainedAge?: number;
    cashPayoutOption?: string;
    returnOfPremium?: string;
    sumAssuredMultiplier?: number;
    totalInvestmentAnnualPrem?: number;
    unit?: string;
    customerSegment?: string;
    retirementOption?: string;
    rbOption?: string;
    premiumType?: string;
    isContinuePremiumPay?: string;
    waivePlanList?: WaivePlan[];
    campaignCode?: string;
    midTermAddInd?: string;
    planEffectiveDate?: string;
    primarySubsidiaryInd?: string;
    loadings?: Loading[];
    maturityOption?: string;
    payoutAge?: number;
    retirementAge?: number;
  };

  type createIndexParams = {
    indexKey: string;
  };

  type deleteByProductCodesParams = {
    productCodes: string[];
    regionCode: string;
  };

  type DeleteSIDocResponseVO = {
    deletedCount?: string;
    transactionId?: string;
  };

  type DictionaryDO = {
    id?: string;
    deleted?: number;
    dictCode: string;
    dictName: string;
    typeCode: string;
    dictComment?: string;
    language?: string;
    orderNumber?: number;
  };

  type Discount = {
    pid?: string;
    planCode?: string;
    campaignCode?: string;
    discountValueType?: string;
    value?: number;
    permDiscountType?: string;
    isTempDiscount?: string;
  };

  type EncoderConfig = {
    algorithm?: string;
    secretKey?: string;
  };

  type FieldAttributes = {
    label?: Record;
    value?: string;
    relatedAttributes?: RelatedAttribute[];
  };

  type FieldConfig = {
    sourceObject?: Record;
    formula?: Record;
    sourceField?: string;
    targetField?: string;
    messageCode?: string;
    messageArgList?: string[];
    metaData?: string;
    convertCode?: string;
    convertFormat?: string;
    groupByValueField?: string;
    groupByFieldList?: string[];
    dataType?: string;
    objectPath?: string;
    criteria?: QueryConfig[];
    objectCriteria?: QueryConfig[];
    sourceFieldList?: string[];
    replacePrefix?: string;
    replaceSuffix?: string;
    needCompare?: boolean;
    compareResultPath?: string;
    tryReplaceNullField?: string;
    transferTo?: string;
    criteriaPath?: string;
    requestDataPath?: string;
    encoderConfig?: EncoderConfig;
  };

  type findByFunctionTypeAndProductCodes1Params = {
    regionCode: string;
    productCodes: string[];
    loadingFunctionType: string;
  };

  type findByFunctionTypeAndProductCodesParams = {
    productCodes: string[];
    loadingFunctionType: string;
  };

  type findByProductCodeAndDiscountTypeParams = {
    productCodeList: string[];
    discountType: string;
  };

  type findByProductCodeParams = {
    productCode: string;
    regionCode: string;
  };

  type findByRegion1Params = {
    regionCode: string;
  };

  type findByRegionAndCurrencyParams = {
    regionCode: string;
    currency: string;
  };

  type findByRegionAndFuncType1Params = {
    regionCode: string;
    loadingFunctionType: string;
  };

  type findByRegionAndFuncTypeParams = {
    loadingFunctionType: string;
  };

  type findByRegionCode1Params = {
    regionCode: string;
  };

  type findByRegionCode2Params = {
    regionCode: string;
  };

  type findByRegionCode4Params = {
    regionCode: string;
  };

  type findByRegionCode6Params = {
    regionCode: string;
  };

  type findByRegionCode7Params = {
    regionCode: string;
  };

  type findByRegionCode8Params = {
    regionCode: string;
  };

  type findByRegionCode9Params = {
    regionCode: string;
    letterType: string;
  };

  type findByRegionCodeAndProductCode1Params = {
    productCode: string;
  };

  type findByRegionCodeAndProductCode2Params = {
    regionCode: string;
    productCode: string;
  };

  type findByRegionCodeAndProductCodeParams = {
    regionCode: string;
    productCode: string;
  };

  type findByRegionCodeAndProductCodes1Params = {
    productCodes: string[];
  };

  type findByRegionCodeAndProductCodes2Params = {
    regionCode: string;
    productCodes: string[];
  };

  type findByRegionCodeAndProductCodesParams = {
    regionCode: string;
    productCodes: string[];
  };

  type findByRegionCodeParams = {
    regionCode: string;
  };

  type findByRegionParams = {
    regionCode: string;
  };

  type findCalculationListParams = {
    productCode: string;
    benefitType: string;
    benefitSubType: string;
    premiumType: string;
    regionCode: string;
  };

  type findNanoLoadingCodeByRegionCodeAndOperatorParams = {
    regionCode: string;
    operator: string;
  };

  type FundAllocation = {
    fid?: string;
    allocation?: number;
    tpAllocation?: number;
    epAllocation?: number;
    flAllocation?: number;
  };

  type Funds = {
    fundAllocation?: FundAllocation[];
    fundStrategy?: string;
    fundChartDataUrl?: string;
  };

  type getByProductAndRiderCodeParams = {
    productCode: string;
    riderCode: string;
  };

  type getByProductCodeAndPidParams = {
    productCode: string;
    regionCode: string;
    pid: string;
  };

  type getByRegion1Params = {
    regionCode: string;
  };

  type getByRegionAndProductCodeParams = {
    regionCode: string;
    productCode: string;
  };

  type getByRegionAndProductCodesParams = {
    regionCode: string;
    productCode: string[];
  };

  type getByRegionParams = {
    regionCode: string;
    isSupported: string;
  };

  type getContractTypeAndNoRepeatParams = {
    regionCode: string;
  };

  type getDefaultPlanPackagesByContractTypeParams = {
    regionCode: string;
    contractType: string;
  };

  type getLogConfigCacheParams = {
    logName: string;
  };

  type getMachineConfigParams = {
    configKey: string;
  };

  type getPidByProductCodeParams = {
    regionCode: string;
    productCode: string;
  };

  type getPlanPackagesByCaseTypeAndProductCodesParams = {
    regionCode: string;
    contractType: string;
    productCodes: string[];
  };

  type getPlanPackagesByContractTypeParams = {
    regionCode: string;
    contractType: string;
  };

  type getPlanPackagesByProductCodesAndRiderRequiredIndParams = {
    regionCode: string;
    productCodes: string[];
    riderRequiredInd: string;
  };

  type getPlanPackagesByRegionParams = {
    regionCode: string;
  };

  type getPlanPackagesParams = {
    regionCode: string;
    contractType: string;
  };

  type getPlanProductDictByRegionAndProductCodeParams = {
    regionCode: string;
    productCode: string;
  };

  type getProductCategoryByProductCodeParams = {
    productCode: string;
    regionCode: string;
  };

  type getProductCodeByProductTypeParams = {
    region: string;
    productType: string;
  };

  type getProductCodeBySubProductTypeParams = {
    subProductTypes: string[];
    regionCode: string;
  };

  type getProductFeaturesParams = {
    regionCode: string;
    contractType: string;
    basicRiderCodes: string[];
  };

  type getProductTypeByProductCodeParams = {
    productCode: string;
    regionCode: string;
  };

  type getRiderFeatureParams = {
    regionCode: string;
    contractType: string;
    productCodes: string[];
  };

  type getRtProductCodeParams = {
    regionCode: string;
    contractType: string;
    productType: string;
  };

  type getRtRiderCodeParams = {
    regionCode: string;
    contractType: string;
    productType: string;
  };

  type getSubProductTypeByProductCodeParams = {
    productCode: string;
    regionCode: string;
  };

  type getSupportedProductFeaturesParams = {
    regionCode: string;
    productCodes: string[];
  };

  type HttpHost = {
    schemeName?: string;
    address?: {
      hostAddress?: string;
      address?: string[];
      hostName?: string;
      linkLocalAddress?: boolean;
      multicastAddress?: boolean;
      anyLocalAddress?: boolean;
      loopbackAddress?: boolean;
      siteLocalAddress?: boolean;
      mcglobal?: boolean;
      mcnodeLocal?: boolean;
      mclinkLocal?: boolean;
      mcsiteLocal?: boolean;
      mcorgLocal?: boolean;
      canonicalHostName?: string;
    };
    port?: number;
    hostName?: string;
  };

  type HttpMethod = true;

  type HttpRange = true;

  type HttpRoute = {
    targetHost?: HttpHost;
    localAddress?: {
      hostAddress?: string;
      address?: string[];
      hostName?: string;
      linkLocalAddress?: boolean;
      multicastAddress?: boolean;
      anyLocalAddress?: boolean;
      loopbackAddress?: boolean;
      siteLocalAddress?: boolean;
      mcglobal?: boolean;
      mcnodeLocal?: boolean;
      mclinkLocal?: boolean;
      mcsiteLocal?: boolean;
      mcorgLocal?: boolean;
      canonicalHostName?: string;
    };
    tunnelled?: boolean;
    layered?: boolean;
    secure?: boolean;
    localSocketAddress?: {
      hostString?: string;
      address?: {
        hostAddress?: string;
        address?: string[];
        hostName?: string;
        linkLocalAddress?: boolean;
        multicastAddress?: boolean;
        anyLocalAddress?: boolean;
        loopbackAddress?: boolean;
        siteLocalAddress?: boolean;
        mcglobal?: boolean;
        mcnodeLocal?: boolean;
        mclinkLocal?: boolean;
        mcsiteLocal?: boolean;
        mcorgLocal?: boolean;
        canonicalHostName?: string;
      };
      port?: number;
      unresolved?: boolean;
      hostName?: string;
    };
    proxyHost?: HttpHost;
    hopCount?: number;
    tunnelType?: 'PLAIN' | 'TUNNELLED';
    layerType?: 'PLAIN' | 'LAYERED';
  };

  type IgnoreFieldConfig = {
    ignoreFieldKeyList?: string[];
    ignoreType?: string;
    criteria?: QueryConfig[];
  };

  type InquiryParamVO = {
    productCodeList?: string[];
    occupationCodeList?: string[];
  };

  type InsuredBO = {
    clientType?: string;
    fullName?: string;
    dob?: string;
    age?: number;
    gender?: string;
    title?: string;
    smoker?: string;
    nationality?: string;
    residentCountry?: string;
    occClass?: string;
    occGroupCode?: string;
    occupation?: string;
    relationship?: string;
    relationshipWithPrimaryInsured?: string;
    diabetesInd?: boolean;
    diabetesDuration?: number;
    religionCode?: string;
    disabilityType?: string;
    isProposer?: string;
    roleCd?: string;
    isSupplementaryChild?: string;
    annualIncomeRange?: string;
    monthlyIncomeRange?: string;
    staff?: string;
    disabilityTypeList?: string[];
    disabilityTypesDictionaryList?: DictionaryDO[];
  };

  type InsuredVO = {
    clientType?: string;
    fullName?: string;
    dob?: string;
    age?: number;
    gender?: string;
    title?: string;
    smoker?: string;
    nationality?: string;
    residentCountry?: string;
    occClass?: string;
    occGroupCode?: string;
    occupation?: string;
    relationship?: string;
    relationshipWithPrimaryInsured?: string;
    diabetesInd?: boolean;
    diabetesDuration?: number;
    religionCode?: string;
    disabilityType?: string;
    isProposer?: string;
    roleCd?: string;
    isSupplementaryChild?: string;
    annualIncomeRange?: string;
    monthlyIncomeRange?: string;
    staff?: string;
  };

  type listByRegionCodeParams = {
    regionCode: string;
  };

  type listPlanProductDurationByRegionAndRegenSiAgeParams = {
    regionCode: string;
    regenSiAge: string;
  };

  type listPlanProductDurationParams = {
    regionCode: string;
    coreCode: string;
    issueAge: string;
    submissionDate: string;
  };

  type listPlanProductFeatureDurationForBaseParams = {
    regionCode: string;
    productCode: string;
    submissionDate: string;
    issueAge: string;
  };

  type listPlanProductFeatureDurationForRiderParams = {
    regionCode: string;
    productCode: string;
    submissionDate: string;
    issueAge: string;
    baseProductCode: string;
  };

  type Loading = {
    reason?: string;
    type?: string;
    value?: number;
    term?: number;
  };

  type Loan = {
    loanAmount?: number;
    loanTerm?: number;
    defermentPeriod?: number;
    financingOption?: string;
    interestRate?: number;
  };

  type LogDataConfigVO = {
    discardFieldList?: string[];
    fieldLengthLimit?: number;
    lengthLimit?: number;
    skipEntityField?: boolean;
  };

  type LogDownloadRequest = {
    regionCode?: string;
    companyCode?: string;
    businessNo?: string;
    logCategory?: string;
  };

  type LogExtendConfigVO = {
    skipLog?: boolean;
    requestLogConfig?: LogDataConfigVO;
    responseLogConfig?: LogDataConfigVO;
  };

  type LogLevelVO = {
    logLevel?: string;
    logNameList?: string[];
    serviceNameList?: string[];
  };

  type MachineConfig = {
    get_id?: string;
    configKey?: string;
    processList?: ProcessConfig[];
    description?: string;
    currentVersion?: number;
    newVersion?: number;
    skipNullProcess?: boolean;
  };

  type MediaType = {
    type?: string;
    subtype?: string;
    parameters?: Record;
    qualityValue?: number;
    charset?: string;
    concrete?: boolean;
    wildcardType?: boolean;
    wildcardSubtype?: boolean;
    subtypeSuffix?: string;
  };

  type MessageVO = {
    code?: string;
    content?: string;
    type?: string;
    metaData?: Record;
    application?: string;
  };

  type MinDecommissionDateRequestVO = {
    region?: string;
    productCodeList?: string[];
    decommissionLevel?: string;
  };

  type MongoConfig = {
    collectionName?: string;
    saveDataFieldPath?: string;
    idFieldPath?: string;
    uri?: string;
    queryConfigList?: QueryConfig[];
    updateConfigList?: UpdateConfig[];
    queryKeyList?: string[];
    upsertKeyList?: string[];
    backUpCollectionName?: string;
  };

  type MqTestVO = {
    messageId?: string;
    exchange?: string;
    routingKey?: string;
    eventId?: string;
    updateTime?: string;
    throwException?: boolean;
    sleepSeconds?: number;
    batchSize?: number;
  };

  type MysqlConfig = {
    daoName?: string;
    className?: string;
    paramFieldPath?: string;
    batchOperator?: string;
    queryConfigList?: QueryConfig[];
    tableName?: string;
    backupTableName?: string;
    dataType?: string;
    excludeFieldList?: string[];
    sqlSentence?: string;
  };

  type ObjectCompareResult = {
    equalFieldList?: string[];
    failFieldList?: string[];
    lackFieldList?: string[];
    abundantFieldList?: string[];
    existDiff?: boolean;
  };

  type OperateSIDocRequestVO = {
    regionCode?: string;
    companyCode?: string;
    bizCode?: string;
    businessNo?: string;
    fileType?: string;
    token?: string;
  };

  type PlanBenefitTypeDO = {
    id?: string;
    deleted?: number;
    regionCode?: string;
    policyId?: string;
    benefitTypeCode?: string;
    benefitTypeName?: string;
    benefitCategory?: string;
    gracePeriod?: number;
    waitingPeriod?: number;
    incontestablePeriod?: number;
    benefitProceedType?: string;
    defaultExpectDecision?: string;
    booster?: string;
    hospitalizationRoomType?: string;
    requireAdjustment?: string;
    specEndorse?: string;
    benefitConversionGroup?: string;
    calculateByPolicyYear?: string;
    isVoluntarily?: string;
    isStandaloneBooster?: string;
    benefitSubCategory?: string;
    calculateOccurNo?: string;
  };

  type PocRequest = {
    machineConfig?: MachineConfig;
    expectedObject?: Record;
    inputData?: Record;
  };

  type PocResponse = {
    outputData?: Record;
    expectCompareResult?: ObjectCompareResult;
  };

  type PoolStats = {
    leased?: number;
    pending?: number;
    available?: number;
    max?: number;
  };

  type ProcessConfig = {
    processCode?: string;
    dynamicKeys?: string[];
    fieldConfigList?: FieldConfig[];
    mongoConfig?: MongoConfig;
    mysqlConfig?: MysqlConfig;
    callerConfig?: CallerConfig;
    saveContextPath?: string;
    order?: number;
    returnObjectPath?: string;
    conditionConfigList?: QueryConfig[];
    description?: string;
    saveHeaderPath?: string;
    compareConfig?: CompareConfig;
    convertCode?: string;
  };

  type ProductAttributes = {
    name?: string;
    dataType?: string;
    defaultValue?: string;
    options?: FieldAttributes[];
    label?: Record;
    mandatory?: boolean;
    hidden?: boolean;
    disabled?: boolean;
  };

  type ProductBasicInfo = {
    pid?: string;
  };

  type ProductCategoryVO = {
    label?: Record;
    value?: string;
  };

  type ProductDetailInfoVO = {
    pid?: string;
    productName?: Record;
    productCategory?: ProductCategoryVO;
    basicPlanInd?: boolean;
    payerInd?: boolean;
    embedInd?: boolean;
    productType?: string;
    mandatory?: boolean;
    canAttachFunds?: boolean;
    attributes?: ProductAttributes[];
    dependencies?: Record;
    attachableRiders?: ProductBasicInfo[];
    ridersRequired?: ProductBasicInfo[];
    ridersNotAllowed?: ProductBasicInfo[];
  };

  type ProductDetailRequestVO = {
    regionCode?: string;
    companyCode?: string;
    callerSystem?: string;
    bizCode?: string;
    businessNo?: string;
    proposeDate?: string;
    quotation?: QuotationVO;
  };

  type ProductDetailResponseVO = {
    quotation?: QuotationVO;
    productPackage?: ProductPackageInfoVO;
    transactionId?: string;
  };

  type ProductFeature = {
    planCode?: string;
    productName?: Record;
    productType?: string;
  };

  type ProductFeatureRequestVO = {
    regionCode?: string;
    companyCode?: string;
    bizCode?: string;
    businessNo?: string;
    contractType?: string;
    products?: string[];
  };

  type ProductFeatureResponseVO = {
    products?: ProductFeature[];
    transactionId?: string;
  };

  type ProductFundInfo = {
    label?: string;
    value?: string;
    fundStrategy?: string;
    options?: ProductFundOption[];
  };

  type ProductFundOption = {
    fid?: string;
    fundName?: Record;
    currency?: string;
  };

  type ProductInfoVO = {
    pid?: string;
    productName?: Record;
    productCategory?: ProductCategoryVO;
  };

  type ProductListRequestVO = {
    regionCode?: string;
    companyCode?: string;
    callerSystem?: string;
    bizCode?: string;
    businessNo?: string;
    proposeDate?: string;
    channel?: string;
    subChannel?: string;
    productCategory?: string;
    basicInfo?: BasicInfo;
    proposers?: ProposerVO[];
    insureds?: InsuredVO[];
  };

  type ProductListResponseVO = {
    products?: ProductInfoVO[];
    transactionId?: string;
  };

  type ProductNameRequestVO = {
    region?: string;
    companyCode?: string;
    language?: string;
    productCodeList?: string[];
  };

  type ProductNameResponseVO = {
    region?: string;
    companyCode?: string;
    language?: string;
    productNameList?: ProductNameVO[];
  };

  type ProductNameVO = {
    productCode?: string;
    productName?: string;
    productOpName?: string;
  };

  type ProductPackageInfoVO = {
    pid?: string;
    channels?: string;
    contractType?: string;
    effectiveDate?: string;
    expiryDate?: string;
    products?: ProductDetailInfoVO[];
    funds?: ProductFundInfo[];
  };

  type PromptMessage = {
    code?: string;
    type?: string;
    content?: string;
    messageCode?: string;
    applicationName?: string;
    metaData?: Record;
  };

  type ProposalOptions = {
    language?: string;
    additionalProperties?: Record;
  };

  type ProposerVO = {
    clientType?: string;
    fullName?: string;
    dob?: string;
    age?: number;
    gender?: string;
    title?: string;
    smoker?: string;
    nationality?: string;
    residentCountry?: string;
    occClass?: string;
    occGroupCode?: string;
    occupation?: string;
    isInterestMHIT?: string;
  };

  type queryCfgPlanDictProductV2Params = {
    companyCode: string;
  };

  type queryCfgPlanPackageV2Params = {
    companyCode: string;
  };

  type QueryConfig = {
    type?: string;
    where?: string;
    valueFieldPath?: string;
    criteriaOperator?: string;
    dataType?: string;
    anyMatch?: string;
    listAnyMatch?: string;
  };

  type queryLoggerParams = {
    apiTraceId: string;
  };

  type queryProductFundRelation1Params = {
    productCodeList: string[];
    currencyCode?: string;
    productType?: string;
  };

  type queryProductFundRelationParams = {
    productCodeList: string[];
    region: string;
    currencyCode?: string;
    productType?: string;
  };

  type QuotationBO = {
    channel?: string;
    subChannel?: string;
    contractType?: string;
    quoteType?: string;
    pid?: string;
    proposalNum?: string;
    basicInfo?: BasicInfo;
    proposers?: ProposerVO[];
    insureds?: InsuredBO[];
    beneficiary?: BeneficiaryVO[];
    plans?: CoverageBO[];
    funds?: Funds;
    discounts?: Discount[];
    loan?: Loan;
    summary?: Summary;
    proposalOptions?: ProposalOptions;
    agents?: Agent[];
    alterations?: Alterations;
  };

  type QuotationProductConfig = {
    regionCode?: string;
    companyCode?: string;
    pid?: string;
    productCode?: string;
    key?: string;
    loaded?: boolean;
    channel?: string;
    subChannelCode?: string;
    proposeDate?: string;
    contractType?: string;
    cfgPlanDictPidList?: CfgPlanDictPidDO[];
    cfgPlanFieldTranslationList?: CfgPlanApiFieldTranslationDO[];
    cfgPlanProductFeatureList?: CfgPlanProductFeatureDO[];
    cfgPlanDictProductList?: CfgPlanDictProductDO[];
    cfgPlanPackageList?: CfgPlanPackageDO[];
    cfgPlanProductDurationList?: CfgPlanProductDurationDO[];
    cfgPlanAutoAttachedRuleList?: CfgPlanAutoAttachedRuleBO[];
    cfgPlanProductParameterList?: CfgPlanProductParameterBO[];
    cfgPlanProductMappingList?: CfgPlanProductMappingBO[];
    cfgPlanHospitalBenefitList?: CfgPlanHospitalBenefitDO[];
    cfgPlanDiscountList?: CfgPlanDiscountDO[];
    productFactoryRiderTypeList?: CfgMiscDictDO[];
    cfgPlanMiscCommonHierarchyLinkList?: CfgPlanMiscCommonHierarchyLinkDO[];
    cfgLoadingMappingWithNanoList?: CfgLoadingMappingWithNanoDO[];
  };

  type QuotationRequestBO = {
    regionCode?: string;
    companyCode?: string;
    bizCode?: string;
    businessNo?: string;
    proposeDate?: string;
    callerSystem?: string;
    id?: string;
    productConfigMap?: Record;
    policyNo?: string;
    expiryDate?: string;
    proposalNum?: string;
    targets?: string[][];
    quotation?: QuotationBO;
    alterations?: Alterations;
    basicPlan?: CoverageBO;
    mainInsured?: InsuredVO;
    sourceSystem?: string;
    operationType?: string;
    productChannel?: string;
    laChannel?: string;
    cfgChannelMapping?: CfgChannelMappingDO;
  };

  type QuotationRequestVO = {
    regionCode?: string;
    companyCode?: string;
    callerSystem?: string;
    bizCode?: string;
    businessNo?: string;
    policyNo?: string;
    proposeDate?: string;
    expiryDate?: string;
    proposalNum?: string;
    quotation?: QuotationVO;
    alterations?: Alterations;
  };

  type QuotationResponseVO = {
    quotation?: QuotationVO;
    warnings?: Warning[];
    transactionId?: string;
  };

  type QuotationVO = {
    basicInfo?: BasicInfo;
    proposers?: ClientInfo[];
    insureds?: ClientInfo[];
    plans?: CoverageVO[];
    summary?: Summary;
  };

  type RelatedAttribute = {
    name?: string;
    dataType?: string;
    defaultValue?: string;
    options?: RelatedAttributeOptionItem[];
  };

  type RelatedAttributeOptionItem = {
    label?: Record;
    value?: Record;
  };

  type RequestMiscParams = {
    regionCode?: string;
    typeCode?: string;
    productCodeList?: string[];
    language?: string;
    sourceSystem?: string;
  };

  type RequestVO = {
    regionCode?: string;
    apiCode?: string;
    requestData?: Record;
    asyncCall?: boolean;
    asyncQuery?: AsyncQueryVO;
  };

  type RequestVOListString = {
    regionCode?: string;
    apiCode?: string;
    requestData?: string[];
    asyncCall?: boolean;
    asyncQuery?: AsyncQueryVO;
  };

  type ResponseVOObject = {
    apiTraceId?: string;
    success?: boolean;
    status?: string;
    responseData?: Record;
    messageList?: MessageVO[];
  };

  type ResponseVOVoid = {
    apiTraceId?: string;
    success?: boolean;
    status?: string;
    responseData?: Record;
    messageList?: MessageVO[];
  };

  type RestTemplateConfig = {
    proxyServer?: string;
    connectTimeout?: number;
    readTimeout?: number;
    retryTimes?: number;
  };

  type ResultVOCfgPlanDecommissionDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CfgPlanDecommissionDO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOCfgPlanExtraPremiumLoadingRuleDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CfgPlanExtraPremiumLoadingRuleDO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOCfgPlanProductVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CfgPlanProductVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOConcurrentHashMapStringLogExtendConfigVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVODeleteSIDocResponseVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: DeleteSIDocResponseVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOListCfgPlanDecommissionDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CfgPlanDecommissionDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListCfgPlanDictProductBO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CfgPlanDictProductBO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListCfgPlanExtraPremiumLoadingRuleDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CfgPlanExtraPremiumLoadingRuleDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListCfgPlanFundBO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CfgPlanFundBO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListCfgPlanLoadingReasonDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CfgPlanLoadingReasonDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListCfgPlanMiscCommonHierarchyLinkDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CfgPlanMiscCommonHierarchyLinkDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListCfgPlanPackageBO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CfgPlanPackageBO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListCfgPlanProductFeatureBO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CfgPlanProductFeatureBO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListClaimDictProductDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ClaimDictProductDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListObject = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOMapObjectObject = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOMapStringCfgPlanDictProductDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOMapStringCfgPlanExtraPremiumLoadingRuleDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOMapStringListCfgMiscDictDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOMapStringListCfgPlanLoadingReasonDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOMapStringMapStringCfgPlanMiscCommonHierarchyLinkDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOProductDetailResponseVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ProductDetailResponseVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOProductFeatureResponseVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ProductFeatureResponseVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOProductListResponseVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ProductListResponseVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOProductNameResponseVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ProductNameResponseVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOQuotationRequestVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: QuotationRequestVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOQuotationResponseVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: QuotationResponseVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVORetrieveSIDocResponseVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: RetrieveSIDocResponseVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOString = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: string;
    promptMessages?: PromptMessage[];
  };

  type ResultVOVoid = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type RetrieveSIDocResponseVO = {
    imageData?: string;
    transactionId?: string;
  };

  type RetrieveSITokenQuotationVO = {
    channel?: string;
    subChannel?: string;
    quoteType?: string;
    pid?: string;
    basicInfo?: BasicInfo;
    proposers?: ProposerVO[];
    insureds?: InsuredVO[];
    beneficiary?: BeneficiaryVO[];
    plans?: CoverageVO[];
    funds?: Funds;
    discounts?: Discount[];
    loan?: Loan;
    summary?: Summary;
    proposalNum?: string;
    proposalOptions?: ProposalOptions;
    agents?: Agent[];
    alterations?: Alterations;
  };

  type RetrieveSITokenRequestVO = {
    regionCode?: string;
    companyCode?: string;
    callerSystem?: string;
    bizCode?: string;
    businessNo?: string;
    policyNo?: string;
    proposeDate?: string;
    expiryDate?: string;
    proposalNum?: string;
    quotation?: RetrieveSITokenQuotationVO;
    alterations?: Alterations;
    targets?: string[][];
  };

  type selectByProductCodeParams = {
    productCodes: string[];
    regionCode: string;
  };

  type selectByProductCodesParams = {
    productCodes: string[];
    regionCode: string;
  };

  type Summary = {
    autoAttached?: boolean;
  };

  type syncProductInfoParams = {
    companyCode: string;
  };

  type syncProductPackageParams = {
    companyCode: string;
  };

  type testCacheParams = {
    regionCode: string;
    benefitTypeCode: string;
  };

  type UpdateConfig = {
    key?: string;
    valueFieldPath?: string;
  };

  type WaivePlan = {
    pid?: string;
    planCode?: string;
  };

  type Warning = {
    id?: string;
    code?: string;
    type?: string;
    pid?: string;
    label?: Record;
    params?: Record;
  };
}
