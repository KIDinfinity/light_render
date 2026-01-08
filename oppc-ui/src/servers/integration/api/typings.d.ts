declare namespace API {
  type ActivityIntegrationCodeDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    bizCaseCategory?: string;
    bizActivityKey?: string;
    sequence?: number;
    integrationCode?: string;
    retryFlag?: boolean;
    operationType?: string;
    raiseExceptionCaseFlag?: number;
    forceRetry?: string;
    maxRetry05?: number;
    companyCode?: string;
    allowManualRetry?: boolean;
  };

  type ActivityIntegrationCodeVO = {
    operationType?: string;
    regionCode?: string;
    caseCategory?: string;
    activityKey?: string;
    companyCode?: string;
  };

  type AdAuthenticationVO = {
    userName?: string;
    userPassword?: string;
    authStatusCode?: number;
    authMessage?: string;
    adServerAccount?: string;
    adServerPassword?: string;
    adServerUrl?: string;
    adSearchBase?: string;
    searchFilter?: string;
  };

  type Agent = {
    agentSurName?: string;
    agentName?: string;
    agentNumber?: string;
  };

  type AgentDO = {
    agentNumber?: string;
    agentIdCard?: string;
    agentSurName?: string;
    agentNameChi?: string;
    agentName?: string;
    agentEmail?: string;
    agentLeftDate?: string;
    agentUnit?: string;
    agentLocation?: string;
    agentPhone?: string;
    agentFax?: string;
    agentStatus?: string;
    agentLevel?: string;
    sourceOfBusiness?: string;
  };

  type ApplyToPoliciesVO = {
    policies?: Policy[];
  };

  type asyncCleanLogDataTaskParams = {
    params: string;
  };

  type AsyncExternalRequestParamsVO = {
    requestCode?: string;
    requestTime?: string;
    requestData?: Record;
    caseNo?: string;
    batchNo?: string;
    sequence?: number;
  };

  type BankAccount = {
    currentFrom?: string;
    currentTo?: string;
    factoringHouse?: string;
    bankCode?: string;
    bankAccountKey?: string;
    bankAccountDesc?: string;
    currencyCode?: string;
    branchCode?: string;
    dateTimeStamp?: string;
  };

  type BankAccountDO = {
    currentFrom?: string;
    currentTo?: string;
    factoringHouse?: string;
    bankCode?: string;
    branchCode?: string;
    bankAccountKey?: string;
    bankAccountDesc?: string;
    currencyCode?: string;
    dateTimeStamp?: string;
  };

  type BaseDocumentParamVO = {
    submissionId?: string;
  };

  type Beneficial = {
    policyId?: string;
    beneficiaryClientNumber?: string;
    beneficiaryList?: Beneficiary[];
    currentFrom?: string;
    currentTo?: string;
    beneficiaryPercentage?: number;
    effectiveDate?: string;
    beneficiaryType?: string;
    clientRelationshipCode?: string;
  };

  type BeneficialVO = {
    policyId?: string;
    beneficiaryClientNumber?: string;
    currentFrom?: string;
    currentTo?: string;
    beneficiaryPercentage?: number;
    effectiveDate?: string;
    beneficiaryType?: string;
    clientRelationshipCode?: string;
    beneficiaryList?: BeneficiaryDO[];
  };

  type Beneficiary = {
    identityType?: string;
    identityId?: string;
    surName?: string;
    givenName?: string;
    sex?: string;
    address?: string;
    country?: string;
    phone?: string;
    birthday?: string;
    email?: string;
  };

  type BeneficiaryDO = {
    identityType?: string;
    identityId?: string;
    surName?: string;
    givenName?: string;
    sex?: string;
    address?: string;
    country?: string;
    phone?: string;
    birthday?: string;
    email?: string;
  };

  type BusinessInfoVO = {
    bizCaseCategory?: string;
    bizCaseNo?: string;
    businessNo?: string;
    bizActivity?: string;
    bizTaskId?: string;
    bizAssignee?: string;
    policyNo?: string;
    inquiryBusinessNo?: string;
  };

  type BusinessProcess = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    processInstanceId?: string;
    processDefId?: string;
    caseCategory?: string;
    currentTaskId?: string;
    status?: string;
    urgent?: number;
    batchNo?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    insured?: string;
    insuredFirstName?: string;
    insuredLastName?: string;
    submissionDate?: string;
    nextProcess?: string;
    submissionChannel?: string;
    submissionId?: string;
    submissionActivityId?: string;
    assessmentType?: string;
    currentActivityKey?: string;
    manualAssessmentAssignee?: string;
    caseNo?: number;
    level?: string;
    partyId?: string;
    passStpRule?: number;
    policyNo?: string;
    editFlag?: string;
    createLocation?: string;
    procInsId?: string;
    isUrgent?: number;
    slaLevel?: string;
    businessType?: string;
    clientName?: string;
    agentName?: string;
    businessDecision?: string;
    customerType?: string;
    identityNo?: string;
    fullStp?: string;
  };

  type calculateHospitalBillParams = {
    claimNo: string;
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
      host?: {
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
        hostString?: string;
      };
      empty?: boolean;
      location?: string;
      all?: Record;
      lastModified?: number;
      date?: number;
      contentLength?: number;
      connection?: string[];
      allow?: HttpMethod[];
      origin?: string;
      range?: HttpRange[];
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
      accept?: MediaType[];
      basicAuth?: string;
      acceptCharset?: string[];
      cacheControl?: string;
      etag?: string;
      contentDisposition?: ContentDisposition;
      acceptLanguage?: { range?: string; weight?: number }[];
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
      accessControlExposeHeaders?: string[];
      accessControlMaxAge?: number;
      accessControlRequestHeaders?: string[];
      accessControlRequestMethod?: HttpMethod;
      bearerAuth?: string;
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

  type CallServiceVO = {
    serviceUrl?: string;
    requestData?: Record;
    serviceType?: string;
    headMap?: Record;
    proxyServer?: string;
  };

  type CaseCreateResultVO = {
    caseNo?: string;
    taskId?: string;
    activityKey?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    assignee?: string;
  };

  type CfgLogLevelVO = {
    serviceName?: string;
    logName?: string;
    logLevel?: string;
    logExtendName?: string;
    logExtendConfig?: LogExtendConfigVO;
  };

  type ChangeAddressContactInfoDTO = {
    policyNo?: string;
    changeContactInformation?: ChangeContactInformationVO;
    changePreferredMailingAddress?: ChangePreferredMailingAddressVO;
    applyToPolicies?: ApplyToPoliciesVO;
  };

  type ChangeContactInformationVO = {
    residenceTelNo?: string;
    businessTelNo?: string;
    mobileTelNo?: string;
    applyTo?: string[];
  };

  type ChangePreferredMailingAddressVO = {
    address1?: string;
    address2?: string;
    address3?: string;
    address4?: string;
    city?: string;
    country?: string;
    zipCode?: string;
    emailAddress?: string;
    preferredMailingAddress?: string;
    applyTo?: string[];
  };

  type checkIfStopCallingBoParams = {
    claimNo: string;
    daClaimNo: string;
  };

  type CheckPendingVO = {
    pendingDocument?: string;
  };

  type ClaimBenefitHistoryDO = {
    claimNo?: number;
    claimOccur?: number;
    seqNo?: number;
    policyNo?: string;
    coverage?: number;
    benefitCode?: string;
    benefitPcode?: string;
    presentAmt?: number;
    presentDay?: number;
    paidAmt?: number;
    paidDay?: number;
    boosterPaid?: number;
    prePolXrate?: number;
    polPayXrate?: number;
    planCode?: string;
    table1?: string;
    table2?: string;
    sugTime?: number;
    sysPaidAmt?: number;
    sysBoosterPaid?: number;
    planCurr?: string;
    getiCcalPaidAmt?: number;
  };

  type ClaimHeaderDetailsDO = {
    claimNo?: number;
    claimOccur?: number;
    receiveDate?: string;
    insuredId?: string;
    insuredName?: string;
    agentId?: string;
    agentUnit?: string;
    agentLocation?: string;
    agentPhone?: string;
    agentFax?: string;
    agentStatus?: string;
    accidentCode?: string;
    accidentDesc?: string;
    accidentDate?: string;
    hospitalIndate?: string;
    hospitalOutdate?: string;
    hospitalCode?: string;
    hospitalDesc?: string;
    hospitalPlace?: string;
    consultDate?: string;
    symptomDate?: string;
    pendingDate?: string;
    reminderDate1?: string;
    reminderDate2?: string;
    chqRemark1?: string;
    chqRemark2?: string;
    comment?: string;
    clmStatus?: string;
    returnDoc1?: string;
    returnDoc2?: string;
    returnDoc3?: string;
    impairment1?: string;
    impairment2?: string;
    presentCurr?: string;
    paymentCurr?: string;
    exchgRate?: number;
    suppressChq?: number;
    createDate?: string;
    createBy?: string;
    proxy?: string;
    settledDate?: string;
    lastchgDate?: string;
    lastchgby?: string;
    paymentChanged?: boolean;
    hospitalType?: string;
    mp?: string[];
    reverseDate?: string;
    reverseBy?: string;
    converted?: boolean;
    policyNo?: string;
    accountNo?: string;
    payeeName?: string;
    hospitalInDevelopedCountry?: string;
    isSpecialEndorsement?: string;
    operationName?: string;
    impairment3?: string;
    impairment4?: string;
    chqRemark3?: string;
    chqRemark4?: string;
    returnDoc4?: string;
    premiumSuspense?: boolean;
    premiumLoanApl?: boolean;
    approved?: boolean;
    checked?: boolean;
    checker?: string;
    approvedDate?: string;
    checkedDate?: string;
    preAssessment?: string;
    claimType?: string;
    markinId?: number;
    finalDecisionDate?: string;
    doubleForCancer?: boolean;
    hasNoClaimBenefitBooster?: boolean;
    secondClaim?: boolean;
    pendingNotification?: string;
    source?: string;
    hospitalPlaceCode?: string;
    operationNameCode?: string;
    congenitalIllness?: string;
    involuntaryUpgrade?: string;
    voluntaryUpgrade?: string;
    voluntaryUpgradeAdjfactor?: number;
    hkabRate?: string;
    hkabRateEffDate?: string;
    declineCodeVersion?: string;
    approvedBy?: string;
    approved2nd?: boolean;
    approvedby2nd?: string;
    approvedDate2nd?: string;
    loa?: string;
    loaPercentage?: number;
    cupidno?: string;
    cupidtype?: string;
    cupamount?: number;
    cupacno?: string;
    cupbankCode?: string;
    cupbankProvince?: string;
    cupbankCity?: string;
    cuptranChinese?: string;
    cupsimChinese?: string;
    cupcardExpiryDate?: string;
  };

  type ClaimPaymentDO = {
    claimNo?: number;
    claimOccur?: number;
    policyNo?: string;
    exchgRate?: number;
    paymentNo?: number;
    payAmount?: number;
    payType?: string;
    payMode?: string;
    payDate?: string;
    lastchgdate?: string;
    lastchgby?: string;
    timestamp?: string;
    accountNo?: string;
    payeeName?: string;
    claimPaymentId?: number;
  };

  type ClaimPolicyCoverageDO = {
    mcscpcClaimNo?: number;
    mcscpcClaimOccur?: number;
    mcscpcPolicyNo?: string;
    mcscpcCoverage?: number;
    mcscpcPlanCode?: string;
    mcscpcTable1?: string;
    mcscpcTable2?: string;
    mcscpcSumInsured?: number;
    mcscpcExpiryDate?: string;
    mcscpcEffectiveDate?: string;
    mcscpcCoverStatus?: string;
    mcscpcStatusCode?: string;
    mcscpcStatusDesc?: string;
    mcscpcPlanType?: string;
    mcscpcPlanCurr?: string;
    mcscpcPreexistsCond?: string;
    mcscpcPreexistsFactor?: number;
  };

  type ClaimPolicyDO = {
    claimNo?: number;
    claimOccur?: number;
    policyNo?: string;
    holderId?: string;
    payeeId?: string;
    payeeName?: string;
    policyCurr?: string;
    policyDate?: string;
    paidToDate?: string;
    policyStatus?: string;
    timestamp?: string;
    insuredRelate?: string;
  };

  type CleanAsyncSubmissionDataParamVO = {
    pageSize?: number;
    startTime?: string;
    cleanBeforeMonth?: number;
    serviceMillsSecondTimeLimit?: number;
    deleteSleepMillsSecondTime?: number;
    maxPages?: number;
  };

  type closeExpiredConnectionsParams = {
    idleTimeout: number;
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

  type ConnectionManagerConfigVO = {
    defaultMaxPerRoute?: number;
    maxTotal?: number;
    validateAfterInactivity?: number;
  };

  type ContactVO = {
    claimNo?: number;
    claimOccur?: number;
    contactType?: string;
    telNo?: string;
    emailAddress?: string;
    postalCode?: string;
    claimPaymentId?: number;
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

  type ContractMailingAddressVO = {
    residenceTelNo?: string;
    businessTelNo?: string;
    mobileTelNo?: string;
    preferredMailingAddress?: string;
    preferredMailingAddressDetails?: string;
  };

  type convertResponseParams = {
    request: ResponseConvertQO;
  };

  type CorrespondenceInitialBO = {
    processInstanceId?: string;
    businessNo?: string;
    relationType?: string;
    caseCategory?: string;
    correspondenceCode?: string;
    correspondenceType?: string;
    variables?: Record;
  };

  type CorrespondenceSendBO = {
    processInstanceId?: string;
    businessNo?: string;
    parameterData?: Record;
    templateStr?: string;
    correspondenceType?: string;
    channel?: string;
    correspondenceContent?: string;
  };

  type CorrespondenceVO = {
    actionCode?: string;
    correspondenceType?: string;
    claimNo?: string;
    caseId?: string;
    submissionId?: string;
    caseCategory?: string;
    operationType?: string;
    businessProcess?: BusinessProcess;
    variables?: Record;
  };

  type Coverage = {
    effectiveDate?: string;
    lifeNumber?: string;
    clientNo?: string;
    coverageSeq?: string;
    riderSeq?: string;
    componentCode?: string;
    benefitPlan?: string;
    issueEffectiveDate?: string;
    riskCessationDate?: string;
    reinstatementDate?: string;
    premiumCessationDate?: string;
    riskStatus?: string;
    premiumStatus?: string;
    currency?: string;
    sumAssured?: number;
    coveragePDT?: string;
    premium?: number;
    premiumPaidMonth?: number;
    totalPremiumPaid?: number;
    policyYear?: number;
    coverageAnnDate?: string;
    attainedAge?: number;
    terminateDate?: string;
  };

  type CoverageDO = {
    lifeNumber?: string;
    clientNo?: string;
    coverageSeq?: string;
    riderSeq?: string;
    componentCode?: string;
    benefitPlan?: string;
    issueEffectiveDate?: string;
    riskCessationDate?: string;
    reinstatementDate?: string;
    terminateDate?: string;
    premiumCessationDate?: string;
    riskStatus?: string;
    premiumStatus?: string;
    currency?: string;
    sumAssured?: number;
    coveragePDT?: string;
    premium?: number;
    premiumPaidMonth?: number;
    totalPremiumPaid?: number;
    policyYear?: number;
    coverageAnnDate?: string;
    attainedAge?: number;
    allowChgBt?: string;
    allowChgMode?: string;
  };

  type createIndexParams = {
    indexKey: string;
  };

  type CustomerDO = {
    identityType?: string;
    identityId?: string;
    surName?: string;
    givenName?: string;
    surNameChi?: string;
    givenNameChi?: string;
    sex?: string;
    district?: string;
    birthday?: string;
    phone?: string;
    email?: string;
    customerID?: string;
    governmentIDCard?: string;
    passportNumber?: string;
    useChiInd?: string;
    policyNo?: string;
    fecNationality?: string;
    phoneCountry?: string;
    contactCountry?: string;
    telCountry1?: string;
    telCountry2?: string;
    country?: string;
    address?: string;
    highriskind?: string;
    incorpPlaceCode?: string;
    hnwIndicator?: string;
  };

  type CustomerSnapshotVO = {
    inquiryDate?: string;
    policyInfoList?: PolicyInfoVO[];
    ddaAccountList?: HkDdaAccountVO[];
  };

  type CustomerVO = {
    identityType?: string;
    identityId?: string;
    surName?: string;
    givenName?: string;
    surNameChi?: string;
    givenNameChi?: string;
    sex?: string;
    district?: string;
    birthday?: string;
    phone?: string;
    email?: string;
    customerID?: string;
    governmentIDCard?: string;
    passportNumber?: string;
    useChiInd?: string;
    policyNo?: string;
    fecNationality?: string;
    phoneCountry?: string;
    contactCountry?: string;
    telCountry1?: string;
    telCountry2?: string;
    country?: string;
    address?: string;
    highriskind?: string;
    incorpPlaceCode?: string;
    hnwIndicator?: string;
    snapshotList?: CustomerSnapshotVO[];
  };

  type DailyBatchJobVO = {
    job?: Record;
    params?: Record;
  };

  type DataConversionConfigDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    dataConversionId?: string;
    tailCode?: string;
    fieldName?: string;
    startIndex?: number;
    endIndex?: number;
    columnSize?: number;
    dataType?: string;
    dataTypeFormat?: string;
    decimalSize?: number;
    tailType?: string;
    listItemLength?: number;
    relatedTailorCode?: string;
    resultAssertValue?: string;
    validCountField?: string;
    orderSeq?: number;
    companyCode?: string;
    mergeKey?: string;
  };

  type DataConversionDiffStructureDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    dataConversionId?: string;
    sourceFieldPath?: string;
    targetFieldPath?: string;
    dataStructure?: string;
    keepSourceField?: boolean;
    dataType?: string;
    dataTypeFormat?: string;
    orderSeq?: number;
    defaultValue?: string;
    companyCode?: string;
    mergeKey?: string;
  };

  type DataConversionDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    integrationCode?: string;
    regionCode?: string;
    scopeType?: string;
    propertyName?: string;
    handlerBean?: string;
    orderSeq?: number;
    validationParam?: string;
    validationBean?: string;
    rootTailCode?: string;
    applyDataConversionId?: string;
    companyCode?: string;
    convertUrl?: string;
    mergeKey?: string;
  };

  type DataConversionMapConfigDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    dataConversionId?: string;
    tailCode?: string;
    targetFieldName?: string;
    sourceFieldName?: string;
    dataType?: string;
    tailType?: string;
    dataTypeFormat?: string;
    relatedTailorCode?: string;
    resultAssertValue?: string;
    orderSeq?: number;
    companyCode?: string;
    mergeKey?: string;
  };

  type DataConversionValueConfigDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    dataConversionId?: string;
    tailCode?: string;
    fieldName?: string;
    fieldAlias?: string;
    dataType?: string;
    dataTypeFormat?: string;
    decimalSize?: number;
    tailType?: string;
    relatedTailorCode?: string;
    defaultValue?: string;
    substring?: string;
    aesEncoderBean?: string;
    maxLength?: number;
    mappingCode?: string;
    companyCode?: string;
    mergeKey?: string;
  };

  type DataConversionValueMapDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    integrationCode?: string;
    regionCode?: string;
    fieldName?: string;
    originValue?: string;
    finalValue?: string;
    mappingCode?: string;
    companyCode?: string;
    mergeKey?: string;
  };

  type decryptionParams = {
    encryptedText: string;
  };

  type DenyCodeReasonCodeMappingDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    denyCode?: string;
    reasonCode?: string;
  };

  type DespatchAddress = {
    address?: string;
    country?: string;
    postCode?: string;
  };

  type DespatchAddressDO = {
    address?: string;
    postCode?: string;
    country?: string;
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    addressLine4?: string;
    city?: string;
  };

  type DocExpiredVO = {
    fileId?: string;
    expired?: boolean;
  };

  type DownTimeResultVO = {
    downTimeFlag?: boolean;
    integrationDownTimeInfoList?: IntegrationDownTimeInfo[];
  };

  type EcmParamsVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    templateId?: string;
    attributeId?: string;
    submissionId?: string;
  };

  type EncoderConfig = {
    algorithm?: string;
    secretKey?: string;
  };

  type encryptionParams = {
    plainText: string;
  };

  type EndCaseCheck = {
    jobLogId?: string;
    config?: string;
    batchNo?: string;
  };

  type EnrolledBankAccount = {
    check?: boolean;
    policyOwner?: string;
    bankCode?: string;
    branchCode?: string;
    accountNumber?: string;
    accountName?: string;
    typeOfAccount?: string;
    currency?: string;
    factoringHouse?: string;
    activationDateFrom?: string;
    activationDateTo?: string;
  };

  type ErrorCodeMessageCodeVO = {
    errorCode?: string;
    messageCode?: string;
    categoryCode?: string;
  };

  type ErrorInfo = {
    errorCode?: string;
    errorMsg?: string;
  };

  type ExceptionHandlingDataVO = {
    businessInfo?: BusinessInfoVO;
    integrationExceptionHandlingDataList?: IntegrationExceptionHandlingDataVO[];
  };

  type ExceptionMessage = {
    code?: string;
    args?: string[];
    type?: string;
    metaData?: Record;
  };

  type ExceptionTestingRequest = {
    integrationCode?: string;
    regionCode?: string;
    systemCode?: string;
    category?: string;
    errorInfoList?: ErrorInfo[];
  };

  type FetchHosBillPaymentInfoParams = {
    paymentCompleteDate?: string;
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

  type findByInquiryClaimNoFunctionStatusResultParams = {
    inquiryClaimNo: string;
  };

  type FormulaConditionDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    conditionCode?: string;
    fieldName?: string;
    compareType?: string;
    compareValue?: string;
    compareValueType?: string;
    companyCode?: string;
  };

  type GeneralSubmissionVO = {
    businessCode?: string;
    interfaceId?: string;
    businessData?: Record;
    docInfo?: HkSubmissionDocInfoVO[];
    signatures?: SignatureInfoVO[];
  };

  type generateLaDailyReportByBatchNoParams = {
    batchNo: string;
  };

  type generateLaDailyReportParams = {
    date?: string;
  };

  type generateLaDailyReportWholeDayParams = {
    date?: string;
  };

  type generateReportParams = {
    currentMoth: string;
  };

  type GeneratorRequest = {
    tableName?: string;
    rootTailCode?: string;
    dataConversionId?: string;
    requestData?: { empty?: boolean; innerMap?: Record };
  };

  type getDispatchAddressByPolicyNoParams = {
    policyNo: string;
  };

  type getInsuredInfo1Params = {
    apiCode: string;
  };

  type getInsuredInfo2Params = {
    apiCode: string;
  };

  type getInsuredInfoParams = {
    apiCode: string;
  };

  type getIntegrationConfigs1Params = {
    integrationCode: string;
    companyCode?: string;
  };

  type getIntegrationConfigs2Params = {
    integrationCode: string;
    companyCode?: string;
  };

  type getIntegrationExecInfoParams = {
    domain: string;
    claimNo: string;
  };

  type getJsonMappingTypeParams = {
    regionCode: string;
    integrationCode: string;
    companyCode?: string;
  };

  type getLaResponseDetailParams = {
    inquiryClaimNo: string;
  };

  type getLogConfigCacheParams = {
    logName: string;
  };

  type getMachineConfigParams = {
    configKey: string;
  };

  type getPayInStatusByPolicyNoParams = {
    policyNo: string;
  };

  type getPolicyInfoFromLAByPolicyNoParams = {
    policyNo: string;
  };

  type getResultParseParams = {
    integrationCode: string;
    regionCode: string;
    companyCode?: string;
  };

  type getSystemConfigParams = {
    systemCode: string;
    protocol?: string;
  };

  type HealthCheckRequestVO = {
    batchNo?: string;
    healthCheckConfig?: IntegrationHealthCheckConfigDO;
  };

  type HealthCheckResponseVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    batchNo?: string;
    integrationCode?: string;
    regionCode?: string;
    interfaceCode?: string;
    systemCode?: string;
    status?: string;
    requestTime?: string;
    requestData?: string;
    responseTime?: string;
    responseData?: string;
    exceptionMsg?: string;
    spendTime?: number;
    nextTime?: string;
    requestUrl?: string;
    category?: string;
    intervalTime?: number;
  };

  type HkClaimInfoVO = {
    claimHeaderDetailsList?: ClaimHeaderDetailsDO[];
    claimPolicyList?: ClaimPolicyDO[];
    claimPolicyCoverageList?: ClaimPolicyCoverageDO[];
    claimBenefitHistoryList?: ClaimBenefitHistoryDO[];
    claimPaymentList?: ClaimPaymentDO[];
    insuredDataList?: CustomerDO[];
    policyOwnerDataList?: CustomerDO[];
    paymentFPSDataList?: ContactVO[];
    payment711DataList?: ContactVO[];
  };

  type HkClaimKeyVO = {
    claimNo?: number;
    claimOccurNo?: number;
  };

  type HkDdaAccountVO = {
    policyId?: string;
    tokenID?: string;
    name?: string;
    ddaAccountNumber?: string;
  };

  type HkSubmissionDocInfoVO = {
    indexClass?: string;
    formCategory?: string;
    docTypeCode?: string;
    fileFullName?: string;
    fileImageId?: string;
    imageData?: string;
    customNameScope?: string;
    personalDocInd?: string;
    clientId?: string;
    customerSeqNo?: string;
    fileSourceType?: string;
    fileSourceParam1?: string;
    fileSourceParam2?: string;
    fileSourceParam3?: string;
    beneficiarySepNo?: string;
  };

  type HospitalBillPaymentInfo = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    paymentNo?: string;
    medicalProviderCode?: string;
    paymentCompleteDate?: string;
    paymentAmount?: number;
    withholdingTaxAmount?: number;
    invoiceList?: Invoice[];
    paidDate?: string;
    paymentMethod?: string;
    bankCode?: string;
    bankAccountNo?: string;
    bankTransferDate?: string;
    chequeNo?: string;
    chequeDate?: string;
    adjustAmount?: number;
    discountAmount?: number;
    unmappedInvoiceNo?: string;
    inputPaymentCompleteDate?: string;
  };

  type HospitalBillPaymentInfoResponse = {
    paymentList?: HospitalBillPaymentInfo[];
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
    hopCount?: number;
    tunnelType?: 'PLAIN' | 'TUNNELLED';
    layerType?: 'PLAIN' | 'LAYERED';
    localSocketAddress?: {
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
      hostString?: string;
    };
    proxyHost?: HttpHost;
  };

  type IgnoreFieldConfig = {
    ignoreFieldKeyList?: string[];
    ignoreType?: string;
    criteria?: QueryConfig[];
  };

  type InformationLinkToVO = {
    id?: string;
    informationId?: string;
    linkToKey?: string;
    linkToValue?: string;
  };

  type InformationVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    category: string;
    processInstanceId: string;
    procActivityKey: string;
    effectiveDate: string;
    expiryDate: string;
    content: string;
    requestType?: string;
    status: string;
    defaultDate: boolean;
    author?: string;
    taskId: string;
    readStatus?: number;
    caseCategory?: string;
    businessNo?: string;
    informationLinkToList?: InformationLinkToVO[];
    referenceCode?: string;
  };

  type InquiryParamVO = {
    businessNo?: string;
  };

  type InquiryResultVO = {
    businessData?: Record;
  };

  type insertLaBusinessObjectResultByFunctionParams = {
    inquiryClaimNo: string;
    claimNo: string;
    caseCategory: string;
    function: string;
  };

  type insertLaBusinessObjectResultParams = {
    inquiryClaimNo: string;
    claimNo: string;
    caseCategory: string;
  };

  type InsuredInfo = {
    requestId?: string;
    identityType?: string;
    identityId?: string;
    surName?: string;
    givenName?: string;
    sex?: string;
    birthday?: string;
    snapshotList?: Snapshot[];
    country?: string;
    phone?: string;
    email?: string;
    newClaimHistoryInd?: string;
  };

  type InsuredInformationVO = {
    title?: string;
    firstName?: string;
    middleName?: string;
    surname?: string;
    extName?: string;
    gender?: string;
    dateOfBirth?: string;
    placeOfBirth?: string;
    nationality?: string;
  };

  type IntegrationAsyncSubmissionDataVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    integrationCode?: string;
    submissionRequestId?: string;
    originalRequestUrl?: string;
    submissionRequestData?: string;
    receiveDate?: string;
    requestStatus?: string;
    statusUpdateSource?: string;
    executeTimes?: number;
    caseNo?: string;
    executeContextMap?: string;
    latestExecuteDate?: string;
    latestExecuteInfo?: string;
    exceptionMsg?: string;
    integrationSessionId?: string;
    policyNo?: string;
    serviceException?: ServiceException;
  };

  type IntegrationBatchRetryDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    bizCaseCategory?: string;
    bizActivityKey?: string;
    bizCaseNo?: string;
    bizTaskId?: string;
    bizBusinessNo?: string;
    retryFlag?: string;
    retryNo?: number;
    callBackendNo?: number;
    returnCodeType?: string;
    requestTime?: string;
    forceRetryIntegrationCode?: string;
    exceptionIntegrationCode?: string;
    returnCode?: string;
    retry05Count?: number;
  };

  type IntegrationCacheConfigDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    integrationCode?: string;
    regionCode?: string;
    cacheKey?: string;
    ttl?: number;
    retryInterval?: number;
    retryTimes?: number;
    companyCode?: string;
  };

  type IntegrationCallBackEntry = {
    type?: string;
    exchange?: string;
    routeKey?: string;
    traceId?: string;
    traceData?: Record;
  };

  type IntegrationCallRecordBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    integrationCode?: string;
    integrationSessionId?: string;
    bizCaseNo?: string;
    bizTaskId?: string;
    status?: string;
    returnCode?: string;
    returnCodeType?: string;
    integrationProcessId?: string;
    bizCaseCategory?: string;
    bizActivityKey?: string;
    activityIntegrationCodeId?: string;
    errorMsg?: string;
    errorTranslate?: string;
    requestTime?: string;
    responseTime?: string;
    exceptionCaseNo?: string;
    exceptionBusinessNo?: string;
    bizBusinessNo?: string;
    batchRetryRequestNo?: string;
    retryKey?: string;
    sameRequestKey?: string;
    callStatus?: string;
    systemCode?: string;
    allowManualRetry?: boolean;
    nextRetryTime?: string;
    interfaceProcessList?: InterfaceProcessBO[];
  };

  type IntegrationChecklistInquiryParam = {
    caseNo?: string;
    businessNo?: string;
    caseCategory?: string;
    taskId?: string;
  };

  type IntegrationCleanDataParamVO = {
    pageSize?: number;
    startTime?: string;
    deleteSleepMillsSecondTime?: number;
    serviceMillsSecondTimeLimit?: number;
    integrationDocDataCleanLog?: IntegrationDocDataCleanLog;
  };

  type IntegrationConfigsVO = {
    integrationInfo?: IntegrationInfoDO;
    integrationInterfaceList?: IntegrationInterfaceDO[];
    requestV2ConversionConfigData?: V2ConversionConfigDataVO;
    requestV3ConversionConfigData?: V3ConversionConfigDataVO;
    responseV2ConversionConfigData?: V2ConversionConfigDataVO;
    responseV3ConversionConfigData?: V3ConversionConfigDataVO;
    interfaceResultParseConfigList?: InterfaceResultParseConfigDO[];
    integrationSystemList?: IntegrationSystemDO[];
  };

  type IntegrationConfigsVO2 = {
    integrationInfo?: IntegrationInfo;
    integrationInterfaceList?: IntegrationInterface[];
    requestV2ConversionConfigData?: V2ConversionConfigDataVO;
    responseV2ConversionConfigData?: V2ConversionConfigDataVO;
    integrationSystemList?: IntegrationSystemDO[];
  };

  type IntegrationContextV2 = {
    integrationInfo?: IntegrationInfo;
    integrationRequest?: IntegrationRequestVO;
    integrationInterfaceList?: IntegrationInterface[];
    interfaceResult?: Record;
    integrationSessionId?: string;
    requestTime?: string;
    frameworkLogger?: IntegrationProcessDO;
    interfaceCallStatus?: InterfaceCallStatusDO;
    forwardRequestTime?: string;
    lastExecutedInterfaceCode?: string;
    forwardIntegrationProcessList?: IntegrationProcessDO[];
    accumulateRequestData?: Record;
    integrationCacheConfig?: IntegrationCacheConfigDO;
    sessionId?: string;
    integrationCode?: string;
    regionCode?: string;
    companyCode?: string;
    submissionChannel?: string;
  };

  type IntegrationDocDataCleanLog = {
    mongoDbCountDeletedNum?: number;
    mysqlCountDeletedNum?: number;
  };

  type IntegrationDocDataDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    integrationSessionId?: string;
    docDataId?: string;
    docData?: string;
    docFileName?: string;
    targetField?: string;
    targetPosition?: string;
    createAt?: string;
  };

  type IntegrationDownTimeInfo = {
    downTimeIntegrationCode?: string;
    period?: string;
  };

  type IntegrationErrorInfo = {
    errorInfo?: IntegrationExternalSystemErrorMsgVO;
    returnCodeBO?: IntegrationReturnCodeBO;
    originalErrorMsg?: string;
    returnTypeCode?: string;
    triggered?: boolean;
    metaData?: Record;
  };

  type IntegrationExceptionBatchSubmitLogDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    batchNo?: string;
    caseNo?: string;
    taskId?: string;
    bizCaseNo?: string;
    bizTaskId?: string;
    status?: string;
    requestData?: string;
    requestTime?: string;
    responseTime?: string;
    exceptionMsg?: string;
  };

  type IntegrationExceptionHandlingDataDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    caseNo?: string;
    caseCategory?: string;
    bizCaseNo?: string;
    regionCode?: string;
    systemCode?: string;
    integrationCode?: string;
    integrationSessionId?: string;
    integrationApiHandler?: string;
    policyNo?: string;
    returnCode?: string;
    bizTaskId?: string;
    taskId?: string;
    exceptionBusinessNo?: string;
  };

  type IntegrationExceptionHandlingDataVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    caseNo?: string;
    caseCategory?: string;
    bizCaseNo?: string;
    regionCode?: string;
    systemCode?: string;
    integrationCode?: string;
    integrationSessionId?: string;
    integrationApiHandler?: string;
    policyNo?: string;
    returnCode?: string;
    bizTaskId?: string;
    taskId?: string;
    exceptionBusinessNo?: string;
    businessInfo?: BusinessInfoVO;
    integrationProcessInfoList?: IntegrationProcessVO[];
    errorInfoList?: IntegrationErrorInfo[];
    triggeredErrorInfo?: IntegrationErrorInfo;
    isSave?: boolean;
  };

  type IntegrationExternalSystemErrorMsgDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    systemCode?: string;
    errorMsg?: string;
    keyword?: string;
    returnCode: string;
    errorTranslate?: string;
    integrationCode?: string;
    activityKey?: string;
    forceRetryIntegrationCode?: string;
    priority?: number;
  };

  type IntegrationExternalSystemErrorMsgVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    systemCode?: string;
    errorMsg?: string;
    keyword?: string;
    returnCode: string;
    errorTranslate?: string;
    integrationCode?: string;
    activityKey?: string;
    forceRetryIntegrationCode?: string;
    priority?: number;
    messageCode?: string;
    exceptionCategory?: string;
  };

  type IntegrationHealthCheckConfigDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    integrationCode?: string;
    regionCode?: string;
    interfaceCode?: string;
    intervalTime?: number;
    requestData?: string;
    category?: string;
    systemCode?: string;
  };

  type IntegrationInfo = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    integrationCode: string;
    integrationName?: string;
    regionCode: string;
    category: string;
    interfaceUrl?: string;
    integrationAdaptorBean: string;
    syncIndicator?: boolean;
    retryTimes?: number;
    mock?: boolean;
    responseDataClass?: string;
    systemCode?: string;
    oppositeEnv?: string;
    requestControlCode?: string;
    retryInterval?: number;
    companyCode?: string;
    integrationResult?: string;
    formatResultData?: string;
    maxAccessCount?: number;
    integrationMockInfo?: IntegrationMockInfo;
    integrationKeyConfigList?: IntegrationInterfaceSkipRetryConfigDO[];
    activityIntegrationCodeDOList?: ActivityIntegrationCodeDO[];
    sameRequestKeyConfigs?: IntegrationInterfaceSkipRetryConfigDO[];
    skipRetryRequestKeyConfigs?: IntegrationInterfaceSkipRetryConfigDO[];
  };

  type IntegrationInfoDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    integrationCode: string;
    integrationName?: string;
    regionCode: string;
    category: string;
    interfaceUrl?: string;
    integrationAdaptorBean: string;
    syncIndicator?: boolean;
    retryTimes?: number;
    mock?: boolean;
    responseDataClass?: string;
    systemCode?: string;
    oppositeEnv?: string;
    requestControlCode?: string;
    retryInterval?: number;
    companyCode?: string;
    integrationResult?: string;
    formatResultData?: string;
    maxAccessCount?: number;
  };

  type IntegrationInterface = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    integrationCode?: string;
    regionCode?: string;
    interfaceCode?: string;
    interfaceUrl?: string;
    method?: string;
    sequence?: number;
    outPut?: boolean;
    async?: boolean;
    mock?: boolean;
    resultStatusField?: string;
    resultStatusAssertValue?: string;
    resultFailInterrupt?: boolean;
    supportBatch?: boolean;
    readTimeout?: number;
    connectTimeout?: number;
    parameterType?: string;
    applicationName?: string;
    systemCode?: string;
    headerJson?: string;
    jsonMappingType?: number;
    companyCode?: string;
    multipleCallRequestFieldName?: string;
    resultCombineFieldName?: string;
    addErrorIntoInformation?: boolean;
    responseType?: string;
    system?: IntegrationSystem;
    requestConvertConfigList?: ObjectFieldConvertConfig[];
    responseConvertConfigList?: ObjectFieldConvertConfig[];
    headerConvertConfigList?: ObjectFieldConvertConfig[];
    header?: Record;
    resultParseConfigList?: InterfaceResultParseConfigDO[];
    requestObjectStringConvertConfigDOList?: ObjectStringConvertConfigDO[];
    responseObjectStringConvertConfigDOList?: ObjectStringConvertConfigDO[];
    requestDiffStructureConfigList?: ObjectDiffStructConfigDO[];
    responseDiffStructureConfigList?: ObjectDiffStructConfigDO[];
    integrationMockInfo?: IntegrationMockInfo;
    wsRequest?: IntegrationInterfaceWsRequest;
    integrationInterfaceMockResponse?: IntegrationInterfaceMockResponseDO;
  };

  type IntegrationInterfaceDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    integrationCode?: string;
    regionCode?: string;
    interfaceCode?: string;
    interfaceUrl?: string;
    method?: string;
    sequence?: number;
    outPut?: boolean;
    async?: boolean;
    mock?: boolean;
    resultStatusField?: string;
    resultStatusAssertValue?: string;
    resultFailInterrupt?: boolean;
    supportBatch?: boolean;
    readTimeout?: number;
    connectTimeout?: number;
    parameterType?: string;
    applicationName?: string;
    systemCode?: string;
    headerJson?: string;
    jsonMappingType?: number;
    companyCode?: string;
    multipleCallRequestFieldName?: string;
    resultCombineFieldName?: string;
    addErrorIntoInformation?: boolean;
    responseType?: string;
  };

  type IntegrationInterfaceMockResponseDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    interfaceId?: string;
    mockKey?: string;
    mockResponseData?: string;
  };

  type IntegrationInterfaceSkipRetryConfigDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    integrationCode?: string;
    retryKey?: string;
    source?: string;
    category?: string;
  };

  type IntegrationInterfaceWsRequest = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode: string;
    integrationCode: string;
    interfaceCode: string;
    requestDataTemplate?: string;
    companyCode?: string;
    requestXml?: string;
  };

  type IntegrationMockInfo = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    userId?: string;
    integrationCode?: string;
    interfaceCode?: string;
    mock?: number;
    companyCode?: string;
    integrationMockResponse?: IntegrationMockResponseDO;
  };

  type IntegrationMockResponseDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    integrationCode: string;
    interfaceCode?: string;
    regionCode: string;
    mockKey: string;
    userId?: string;
    mockResponseData: string;
    companyCode?: string;
  };

  type IntegrationMockResponseVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    integrationCode: string;
    interfaceCode?: string;
    regionCode: string;
    mockKey: string;
    userId?: string;
    mockResponseData: string;
    companyCode?: string;
  };

  type IntegrationOpenMockVO = {
    integrationCode?: string;
    regionCode?: string;
    openMock?: boolean;
  };

  type IntegrationPocRequestVO = {
    convertType?: string;
    inputData?: Record;
    integrationInterface?: IntegrationInterface;
  };

  type IntegrationProcessDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    integrationSessionId?: string;
    integrationCode?: string;
    regionCode?: string;
    url?: string;
    requestData?: string;
    requestTime?: string;
    responseData?: string;
    responseTime?: string;
    category?: string;
    exceptionMsg?: string;
    businessNo?: string;
    bizCaseNo?: string;
    bizTaskId?: string;
    requestHeader?: string;
    isEnd?: number;
    companyCode?: string;
    interfaceCode?: string;
  };

  type IntegrationProcessInquireVO = {
    id?: string;
    businessNo?: string;
    caseNo?: string;
    integrationCode?: string;
    transId?: string;
    integrationSessionId?: string;
    existExceptionMsg?: string;
    category?: string;
    limit?: number;
    taskId?: string;
    integrationCodeList?: string[];
    integrationSessionIdList?: string[];
  };

  type IntegrationProcessVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    integrationSessionId?: string;
    integrationCode?: string;
    regionCode?: string;
    url?: string;
    requestData?: string;
    requestTime?: string;
    responseData?: string;
    responseTime?: string;
    category?: string;
    exceptionMsg?: string;
    businessNo?: string;
    bizCaseNo?: string;
    bizTaskId?: string;
    requestHeader?: string;
    isEnd?: number;
    companyCode?: string;
    interfaceCode?: string;
  };

  type IntegrationRequestVO = {
    integrationCode?: string;
    regionCode?: string;
    callBackEntry?: IntegrationCallBackEntry;
    businessInfo?: BusinessInfoVO;
    requestData?: Record;
    retry?: boolean;
    retryIntegrationCodeList?: string[];
    userId?: string;
    originalRequestUrl?: string;
    batchNo?: string;
    sequence?: number;
    companyCode?: string;
    submissionChannel?: string;
    retryKey?: string;
    checkApplicable?: boolean;
  };

  type IntegrationResponseVO = {
    integrationCode?: string;
    integrationSessionId?: string;
    regionCode?: string;
    responseData?: Record;
    callBackEntry?: IntegrationCallBackEntry;
    companyCode?: string;
    forwardRequestTime?: string;
    isNotApplicable?: boolean;
    skip?: boolean;
    abort?: boolean;
  };

  type IntegrationResponseVOObject = {
    integrationCode?: string;
    integrationSessionId?: string;
    regionCode?: string;
    responseData?: Record;
    callBackEntry?: IntegrationCallBackEntry;
    companyCode?: string;
    forwardRequestTime?: string;
    isNotApplicable?: boolean;
    skip?: boolean;
    abort?: boolean;
  };

  type IntegrationReturnCodeBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    systemCode?: string;
    returnCode: string;
    returnCodeDesc?: string;
    returnCodeType?: string;
    messageCode?: string;
    createHandleCase?: string;
    errorTranslate?: string;
    retryTimes?: number;
    integrationExternalSystemErrorMsgVO?: IntegrationExternalSystemErrorMsgVO;
  };

  type IntegrationSystem = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    host?: string;
    systemCode?: string;
    protocol?: string;
    headerJson?: string;
    bodyJson?: string;
    regionCode?: string;
    env?: string;
    basicAuthJson?: string;
    proxyServer?: string;
    companyCode?: string;
    submissionChannel?: string;
    header?: Record;
    body?: Record;
    basicAuthName?: string;
    basicAuthPassword?: string;
    basicAuthCharset?: string;
  };

  type IntegrationSystemDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    host?: string;
    systemCode?: string;
    protocol?: string;
    headerJson?: string;
    bodyJson?: string;
    regionCode?: string;
    env?: string;
    basicAuthJson?: string;
    proxyServer?: string;
    companyCode?: string;
    submissionChannel?: string;
  };

  type InterfaceCallStatusDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    integrationCode?: string;
    integrationSessionId?: string;
    bizCaseNo?: string;
    bizTaskId?: string;
    status?: string;
    returnCode?: string;
    returnCodeType?: string;
    integrationProcessId?: string;
    bizCaseCategory?: string;
    bizActivityKey?: string;
    activityIntegrationCodeId?: string;
    errorMsg?: string;
    errorTranslate?: string;
    requestTime?: string;
    responseTime?: string;
    exceptionCaseNo?: string;
    exceptionBusinessNo?: string;
    bizBusinessNo?: string;
    batchRetryRequestNo?: string;
    retryKey?: string;
    sameRequestKey?: string;
  };

  type InterfaceProcessBO = {
    id?: string;
    integrationSessionId?: string;
    integrationCode?: string;
    requestTime?: string;
    responseTime?: string;
    systemCode?: string;
    requestData?: string;
    responseData?: string;
    url?: string;
    errorMsg?: string;
    errorTranslate?: string;
    exceptionMsg?: string;
  };

  type InterfaceResultParseConfigDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    integrationCode?: string;
    regionCode?: string;
    interfaceCode?: string;
    fieldName?: string;
    operator?: string;
    value?: string;
    failMessage?: string;
    status?: string;
    messagePrefix?: string;
    companyCode?: string;
    defaultErrorMessage?: string;
    exceptionObjectField?: string;
  };

  type Invoice = {
    invoiceNo?: string;
  };

  type isMeet1Params = {
    systemCode: string;
  };

  type JSONObject = {
    empty?: boolean;
    innerMap?: Record;
  };

  type jweDecryptParams = {
    encryptedText: string;
  };

  type jweEncryptParams = {
    payload: string;
  };

  type LaBusinessObjectResultDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    inquiryClaimNo?: string;
    function?: string;
    sequenceNo?: number;
    claimNo?: string;
    status?: string;
    result?: number;
    errorMessage?: string;
    returnTimestamp?: string;
    executeSequence?: number;
    retry?: number;
    batchNo?: string;
    caseId?: string;
    triggerAction?: string;
    retryMax?: string;
    ilResult?: number;
    laResult?: number;
    onlyForIl?: number;
  };

  type LaResponseDetail = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    inquiryClaimNo?: string;
    policyNo?: string;
    coverageKey?: string;
    payableAmount?: number;
    validFlag?: number;
    claimNo?: string;
    benefitTypeCode?: string;
    benefitItemCode?: string;
    benefitCode?: string;
    payableUnit?: string;
    incidentNo?: string;
    lastIncidentNo?: string;
    excutionTime?: string;
    ilClaimRefNo?: string;
    endCaseKey?: string;
    benefitKey?: string;
  };

  type LaResponseIncident = {
    ilClaimRefNo?: string;
    incidentNo?: string;
  };

  type LaResponseResult = {
    resultFlag?: number;
    errorMsg?: string;
    incidents?: LaResponseIncident[];
  };

  type LaUpdateTrackVO = {
    lifeAsiaUpdateCompletedDate?: string;
    unCompleteReason?: string;
  };

  type LiquibaseDownLoadQo = {
    integrationInfo?: IntegrationInfo;
    integrationRequest?: IntegrationRequestVO;
    integrationInterfaceList?: IntegrationInterface[];
    interfaceResult?: Record;
    integrationSessionId?: string;
    requestTime?: string;
    frameworkLogger?: IntegrationProcessDO;
    interfaceCallStatus?: InterfaceCallStatusDO;
    forwardRequestTime?: string;
    lastExecutedInterfaceCode?: string;
    forwardIntegrationProcessList?: IntegrationProcessDO[];
    accumulateRequestData?: Record;
    integrationCacheConfig?: IntegrationCacheConfigDO;
    deleteByUniqueKey?: boolean;
    tableDataKeyMap?: Record;
    sessionId?: string;
    integrationCode?: string;
    regionCode?: string;
    companyCode?: string;
    submissionChannel?: string;
  };

  type loadIntegrationContextParams = {
    integrationCode: string;
  };

  type LogDataConfigVO = {
    discardFieldList?: string[];
    fieldLengthLimit?: number;
    lengthLimit?: number;
    skipEntityField?: boolean;
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

  type MappingQO = {
    callerName?: string;
    mappingData?: string;
  };

  type mappingResponseTestParams = {
    mppingQO: MappingQO;
  };

  type McsPAClaimParamVO = {
    claimType?: string;
    insuredList?: string[];
    exclusiveClaims?: HkClaimKeyVO[];
    pageSize?: number;
    lastMaxClaimNo?: number;
  };

  type MediaType = {
    type?: string;
    subtype?: string;
    parameters?: Record;
    qualityValue?: number;
    concrete?: boolean;
    charset?: string;
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

  type mockCheckPendingParams = {
    submissionId: string;
    pendingDocument?: string;
    deleteMock?: boolean;
  };

  type mockOperationLogParams = {
    o: Record;
  };

  type MockParams = {
    sheepTime?: number;
    content?: string;
    mockError?: boolean;
  };

  type MockRequestControlVO = {
    requestCode?: string;
    caseNo?: string;
    batchNo?: string;
    triggerNum?: number;
    mockParams?: MockParams;
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

  type NewAccount = {
    check?: boolean;
    payOutOption?: string;
    bankCode?: string;
    branchCode?: string;
    bankAccountName?: string;
    bankAccountNo?: string;
    securityCode?: string;
    typeOfAccount?: string;
    currency?: string;
    factoringHouse?: string;
    activationDateFrom?: string;
    activationDateTo?: string;
    other?: string;
  };

  type ObjectCompareResult = {
    equalFieldList?: string[];
    failFieldList?: string[];
    lackFieldList?: string[];
    abundantFieldList?: string[];
    existDiff?: boolean;
  };

  type ObjectDiffStructConfigDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    integrationCode?: string;
    regionCode?: string;
    interfaceCode?: string;
    type?: string;
    sourceFieldPath?: string;
    targetFieldPath?: string;
    dataStructure?: string;
    keepSourceField?: boolean;
    dataType?: string;
    dataTypeFormat?: string;
    orderSeq?: number;
    defaultValue?: string;
    companyCode?: string;
  };

  type ObjectFieldConvertConfig = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    integrationCode?: string;
    regionCode?: string;
    interfaceCode?: string;
    type?: string;
    targetFieldName?: string;
    defaultValue?: string;
    stringToDate?: string;
    transformCode?: string;
    mappingCode?: string;
    encrypt?: boolean;
    decrypt?: boolean;
    maxLength?: number;
    fieldFilterRule?: string;
    dataType?: string;
    dataTypeFormat?: string;
    convertOrder?: number;
    fileCaseTrans?: string;
    formulaConditionCode?: string;
    formula?: string;
    formulaConditionType?: string;
    companyCode?: string;
    convertUrl?: string;
    matchConditionCode?: string;
    encoderBean?: string;
    substring?: string;
    transformConfig?: ObjectTransformConfigDO[];
    valueMapList?: ValueMapDO[];
    formulaConditionList?: FormulaConditionDO[];
    originSourceObject?: Record;
  };

  type ObjectFieldConvertConfigDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    integrationCode?: string;
    regionCode?: string;
    interfaceCode?: string;
    type?: string;
    targetFieldName?: string;
    defaultValue?: string;
    stringToDate?: string;
    transformCode?: string;
    mappingCode?: string;
    encrypt?: boolean;
    decrypt?: boolean;
    maxLength?: number;
    fieldFilterRule?: string;
    dataType?: string;
    dataTypeFormat?: string;
    convertOrder?: number;
    fileCaseTrans?: string;
    formulaConditionCode?: string;
    formula?: string;
    formulaConditionType?: string;
    companyCode?: string;
    convertUrl?: string;
    matchConditionCode?: string;
    encoderBean?: string;
    substring?: string;
  };

  type ObjectStringConvertConfigDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    integrationCode?: string;
    regionCode?: string;
    interfaceCode?: string;
    type?: string;
    tailCode?: string;
    fieldName?: string;
    startIndex?: number;
    endIndex?: number;
    columnSize?: number;
    dataType?: string;
    dataTypeFormat?: string;
    decimalSize?: number;
    tailType?: string;
    listItemLength?: number;
    relatedTailorCode?: string;
    resultAssertValue?: string;
    validCountField?: string;
    rootLevel?: number;
    companyCode?: string;
  };

  type ObjectTransformConfigDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    integrationCode?: string;
    regionCode?: string;
    interfaceCode?: string;
    type?: string;
    targetFieldName?: string;
    transformCode?: string;
    fieldName?: string;
    sourceFieldName?: string;
    conditionCode?: string;
    conditionField?: string;
    conditionValue?: string;
    priority?: string;
    matchConditionCode?: string;
    companyCode?: string;
  };

  type OnlineReportVOObject = {
    headers?: ReportColumnEntityConfigVO[];
    data?: Record[];
  };

  type OriginalSectionDataVO = {
    changeContactInformation?: ChangeContactInformationVO;
    changePreferredMailingAddress?: ChangePreferredMailingAddressVO;
    applyToPolicies?: ApplyToPoliciesVO;
  };

  type Page = {
    totalPage?: number;
    pageSize?: number;
    currentPage?: number;
    sortName?: string;
    sortOrder?: string;
    total?: number;
    startPage?: number;
    offset?: number;
    params?: Record;
    rows?: Record[];
    firstResult?: number;
  };

  type PageIntegrationAsyncSubmissionDataVO = {
    totalPage?: number;
    pageSize?: number;
    currentPage?: number;
    sortName?: string;
    sortOrder?: string;
    total?: number;
    startPage?: number;
    offset?: number;
    params?: Record;
    rows?: IntegrationAsyncSubmissionDataVO[];
    firstResult?: number;
  };

  type PageIntegrationExceptionBatchSubmitLogDO = {
    totalPage?: number;
    pageSize?: number;
    currentPage?: number;
    sortName?: string;
    sortOrder?: string;
    total?: number;
    startPage?: number;
    offset?: number;
    params?: Record;
    rows?: IntegrationExceptionBatchSubmitLogDO[];
    firstResult?: number;
  };

  type PageOnlineReportVOObject = {
    totalPage?: number;
    pageSize?: number;
    currentPage?: number;
    sortName?: string;
    sortOrder?: string;
    total?: number;
    startPage?: number;
    offset?: number;
    params?: Record;
    rows?: OnlineReportVOObject[];
    firstResult?: number;
  };

  type PageReportStyleVO = {
    totalPage?: number;
    pageSize?: number;
    currentPage?: number;
    sortName?: string;
    sortOrder?: string;
    total?: number;
    startPage?: number;
    offset?: number;
    params?: Record;
    rows?: ReportStyleVO[];
    firstResult?: number;
  };

  type PartyData = {
    clientId?: string;
    identityType?: string;
    identityNo?: string;
    status?: string;
    firstName?: string;
    middleName?: string;
    surname?: string;
    gender?: string;
    dateOfBirth?: string;
    occupation?: string;
    nationality?: string;
    phoneNo?: string;
    email?: string;
    postCode?: string;
    address?: string;
    systemFlag?: string;
    apiCode?: string;
    businessNo?: string;
    partyId?: string;
    customerType?: string;
    relationshipWithInsured?: string;
    policyIdList?: string[];
    regionCode?: string;
    businessCode?: string;
    partyInfoList?: PartyInfo[];
  };

  type PartyInfo = {
    partyId?: string;
  };

  type PaymentTrackVO = {
    paymentToFinanceDate?: string;
    paymentStatus?: string;
  };

  type PayOutOptionVO = {
    enrolledBankAccounts?: EnrolledBankAccount[];
    newAccount?: NewAccount;
    sourceBank?: string;
  };

  type PhLifeAsiaResponseVO = {
    success?: boolean;
    responseMsg?: string;
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

  type Policy = {
    policyNo?: string;
    policyName?: string;
    contactNo?: string;
    contractAddress?: string;
    applyTo?: boolean;
  };

  type PolicyAndInsuredParamVO = {
    identityType?: string;
    identityId?: string;
    inquiryDate?: string[];
    surName?: string;
    givenName?: string;
    clientNo?: string;
    policyId?: string;
    policyOwnerSurName?: string;
    policyOwnerGivenName?: string;
  };

  type PolicyInfo = {
    policyId?: string;
    register?: string;
    policyOwnerClientNo?: string;
    policyOwnerSurName?: string;
    policyOwnerGivenName?: string;
    bankAccountList?: BankAccount[];
    despatchAddressList?: DespatchAddress[];
    agentList?: Agent[];
    coverageList?: Coverage[];
    beneficialList?: Beneficial[];
    specialExclusionList?: SpecialExclusion[];
    policyNotesList?: PolicyNotes[];
    contractType?: string;
    policyRiskStatus?: string;
    policyPremiumStatus?: string;
    riskCommDate?: string;
    paymentFrequency?: string;
    policyValue?: number;
    nextAnnualPremium?: number;
    nextSemiAnnualPremium?: number;
    nextQuarterlyPremium?: number;
    nextMonthlyPremium?: number;
    transactionList?: Transaction[];
  };

  type PolicyInfoVO = {
    policyId?: string;
    register?: string;
    contractType?: string;
    policyRiskStatus?: string;
    policyPremiumStatus?: string;
    riskCommDate?: string;
    policyOwnerClientNo?: string;
    policyOwnerSurName?: string;
    policyOwnerGivenName?: string;
    paymentFrequency?: string;
    ageAdmitIndicator?: string;
    useChiInd?: string;
    terminateDate?: string;
    currency?: string;
    coveragePTD?: string;
    billingType?: string;
    productID?: string;
    policyOwnerSex?: string;
    policyOwnerDOB?: string;
    identityType?: string;
    birthday?: string;
    identityId?: string;
    policyOwnerDistrict?: string;
    policyOwnerPhone?: string;
    policyOwnerEmail?: string;
    policyOwnerAddress?: string;
    assignee?: string;
    policyOwnerAddresscity?: string;
    policyOwnerFECNationality?: string;
    policyOwnerPhoneCountry?: string;
    policyOwnerContactCountry?: string;
    policyOwnerTelCountry1?: string;
    policyOwnerTelCountry2?: string;
    policyOwnerCountry?: string;
    policyOwnerIncorpPlaceCode?: string;
    policyInsuredRelationCode?: string;
    interestPeriodInd?: string;
    bankruptcyInd?: string;
    autoWdInd?: string;
    distributionChannel?: string;
    clientMergeInd?: string;
    policyOwnerHnwIndicator?: string;
    regularWdInd?: string;
    contractCurrency?: string;
    modalpremium?: number;
    pvwStpProcessInd?: string;
    juvenilePolicyInd?: string;
    annuityInd?: string;
    spoRiderInd?: string;
    policyChannelType?: string;
    governmentIdCard?: string;
    irreBeneInd?: string;
    getiDExpiryDate?: string;
    noIDExpiryDateIndicator?: string;
    idPassportExpiryDate?: string;
    noIdPassportExpiryDateInd?: string;
    policyOwnerIdType?: string;
    policyOwnerIdIssueDate?: string;
    policyOwnerIdExpiryDate?: string;
    policyOwnerIdExemptFlag?: string;
    policyOwnerNoIdExpiryDateFlag?: string;
    policyOwnerGivenNameChi?: string;
    policyOwnerSurNameChi?: string;
    policyOwnerNamePrefix?: string;
    isVhisConversion?: string;
    oldRcdDate?: string;
    company?: string;
    bankAccountList?: BankAccountDO[];
    despatchAddressList?: DespatchAddressDO[];
    agentList?: AgentDO[];
    coverageList?: CoverageDO[];
    beneficialList?: BeneficialVO[];
    specialExclusionList?: SpecialExclusionDO[];
    transactionList?: TransactionDO[];
    policyNotesList?: PolicyNote[];
  };

  type PolicyNote = {
    policyId?: string;
    transactionDate?: string;
    content?: string;
    entryDate?: string;
  };

  type PolicyNotes = {
    policyId?: string;
    transactionDate?: string;
    transactionTime?: string;
    sequenceNo?: string;
    message?: string;
    policyNoteCategory?: string;
  };

  type PolicyOwnerInformationVO = {
    clientId?: string;
    title?: string;
    firstName?: string;
    middleName?: string;
    surname?: string;
    extName?: string;
    gender?: string;
    dateOfBirth?: string;
    placeOfBirth?: string;
    nationality?: string;
  };

  type policyReprintParams = {
    policyNo: string;
  };

  type PoolStats = {
    leased?: number;
    pending?: number;
    available?: number;
    max?: number;
  };

  type PosDecisionVO = {
    posDecision?: string;
    declineReason?: string;
  };

  type PosRequestInformationVO = {
    policyNo?: string;
    transactionType?: string;
    policyName?: string;
    policyIssueDate?: string;
    policyStatus?: string;
    agentName?: string;
    agentPhone?: string;
    billToDate?: string;
    payToDate?: string;
    premiumStatus?: string;
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

  type PromptMessage = {
    code?: string;
    type?: string;
    content?: string;
    messageCode?: string;
    applicationName?: string;
    metaData?: Record;
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

  type queryConfigParams = {
    integrationCode: string;
  };

  type queryLoggerParams = {
    apiTraceId: string;
  };

  type queryReportParams = {
    currentMoth: string;
  };

  type RecordBusinessObjectVO = {
    inquiryBusinessNo?: string;
    policyNo?: string[];
    businessNo?: string;
    caseCategory?: string;
    activityKey?: string;
    action?: string;
    payAbleAmount?: number;
    processInstanceId?: string;
    modifier?: string;
    isFullStp?: boolean;
    businessProcess?: BusinessProcess;
  };

  type RedisCacheDeleteQO = {
    applicationName?: string;
    cacheName?: string;
    key?: string;
  };

  type RefundTransactionBO = {
    posNo?: string;
    businessNo?: string;
    policyNo?: string;
    transactionType?: string;
    caseCategory?: string;
    submissionDate?: string;
    submissionChannel?: string;
    posRequestInformation?: PosRequestInformationVO;
    policyOwnerInformation?: PolicyOwnerInformationVO;
    insuredInformation?: InsuredInformationVO;
    usTaxDeclarations?: UsTaxDeclarationsVO;
    uwInformation?: UWInformationVO;
    approvalPosDecision?: PosDecisionVO;
    inforcePosDecision?: PosDecisionVO;
    laUpdateTrack?: LaUpdateTrackVO;
    paymentTrack?: PaymentTrackVO;
    originalSectionData?: OriginalSectionDataVO;
    contractMailingAddress?: ContractMailingAddressVO;
    refund?: RefundVO;
    payOutOption?: PayOutOptionVO;
  };

  type RefundVO = {
    policyNo?: string;
    suspenseAmount?: number;
    currency?: string;
    subAccount?: string;
    refundAmount?: number;
  };

  type RemotePolicyInsuredQO = {
    identityType?: string;
    identityId?: string;
    givenName?: string;
    surName?: string;
    snapshotDate?: string;
    submissionId?: string;
  };

  type removeBusinessObjectParams = {
    businessNo: string;
    buttonCode: string;
  };

  type removeSplitCaseBusinessObjectParams = {
    businessNo: string;
  };

  type reNameProcessTableParams = {
    processOnOff: string;
  };

  type ReportColumnEntityConfigVO = {
    columnTitle?: string;
    entityField?: string;
    sortColumn?: string;
    render?: string;
  };

  type ReportStyleVO = {
    reportId?: string;
    reportDisplayName?: string;
    reportTitle?: string;
  };

  type ResponseConvertQO = {
    integrationCode?: string;
    regionCode?: string;
    resultData?: string;
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

  type ResultVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOBoolean = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: boolean;
    promptMessages?: PromptMessage[];
  };

  type ResultVOCaseCreateResultVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CaseCreateResultVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOConcurrentHashMapStringLogExtendConfigVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVODownTimeResultVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: DownTimeResultVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOHealthCheckResponseVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: HealthCheckResponseVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOHkClaimInfoVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: HkClaimInfoVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOHospitalBillPaymentInfoResponse = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: HospitalBillPaymentInfoResponse;
    promptMessages?: PromptMessage[];
  };

  type ResultVOInquiryResultVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: InquiryResultVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOIntegrationCallRecordBO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: IntegrationCallRecordBO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOIntegrationConfigsVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: IntegrationConfigsVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOIntegrationConfigsVO2 = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: IntegrationConfigsVO2;
    promptMessages?: PromptMessage[];
  };

  type ResultVOIntegrationContextV2 = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: IntegrationContextV2;
    promptMessages?: PromptMessage[];
  };

  type ResultVOIntegrationProcessDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: IntegrationProcessDO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOIntegrationResponseVOObject = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: IntegrationResponseVOObject;
    promptMessages?: PromptMessage[];
  };

  type ResultVOIntegrationSystemDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: IntegrationSystemDO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOListCorrespondenceSendBO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CorrespondenceSendBO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListCustomerVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CustomerVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListDenyCodeReasonCodeMappingDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: DenyCodeReasonCodeMappingDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListDocExpiredVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: DocExpiredVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListHealthCheckResponseVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: HealthCheckResponseVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListIntegrationCallRecordBO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: IntegrationCallRecordBO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListIntegrationInfoDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: IntegrationInfoDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListIntegrationProcessVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: IntegrationProcessVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListInterfaceCallStatusDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: InterfaceCallStatusDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListInterfaceResultParseConfigDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: InterfaceResultParseConfigDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListLaBusinessObjectResultDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: LaBusinessObjectResultDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListMapStringObject = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListPhLifeAsiaResponseVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PhLifeAsiaResponseVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListRetryInterfaceVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: RetryInterfaceVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListRuleCommonRpcFactInfoVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: RuleCommonRpcFactInfoVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOMapObjectObject = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOMapStringListErrorCodeMessageCodeVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOObject = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPageIntegrationAsyncSubmissionDataVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PageIntegrationAsyncSubmissionDataVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPageIntegrationExceptionBatchSubmitLogDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PageIntegrationExceptionBatchSubmitLogDO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPageOnlineReportVOObject = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PageOnlineReportVOObject;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPageReportStyleVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PageReportStyleVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPhLifeAsiaResponseVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PhLifeAsiaResponseVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOString = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: string;
    promptMessages?: PromptMessage[];
  };

  type ResultVOSubmitOutputVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: SubmitOutputVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOVoid = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type RetryIntegrationInterfaceQO = {
    caseCategory?: string;
    activityKey?: string;
    taskId?: string;
    caseNo?: string;
  };

  type RetryInterfaceVO = {
    regionCode?: string;
    bizCaseCategory?: string;
    bizActivityKey?: string;
    sequence?: number;
    integrationCode?: string;
    integrationSessionId?: string;
    bizCaseNo?: string;
    bizTaskId?: string;
    status?: string;
    returnCode?: string;
    returnCodeType?: string;
    integrationProcessId?: string;
    activityIntegrationCodeId?: string;
    errorMsg?: string;
    requestTime?: string;
    responseTime?: string;
    exceptionBusinessNo?: string;
  };

  type retryJobDataSetParams = {
    IdentityID: string;
    corn: string;
    tenant: string;
  };

  type RuleCommonRpcFactInfoVO = {
    objClassType?: string;
    objJsonContent?: string;
  };

  type ServiceException = {
    cause?: {
      stackTrace?: {
        classLoaderName?: string;
        moduleName?: string;
        moduleVersion?: string;
        methodName?: string;
        fileName?: string;
        lineNumber?: number;
        className?: string;
        nativeMethod?: boolean;
      }[];
      message?: string;
      localizedMessage?: string;
    };
    stackTrace?: {
      classLoaderName?: string;
      moduleName?: string;
      moduleVersion?: string;
      methodName?: string;
      fileName?: string;
      lineNumber?: number;
      className?: string;
      nativeMethod?: boolean;
    }[];
    exceptionMessage?: ExceptionMessage;
    message?: string;
    suppressed?: {
      stackTrace?: {
        classLoaderName?: string;
        moduleName?: string;
        moduleVersion?: string;
        methodName?: string;
        fileName?: string;
        lineNumber?: number;
        className?: string;
        nativeMethod?: boolean;
      }[];
      message?: string;
      localizedMessage?: string;
    }[];
    localizedMessage?: string;
  };

  type setOdsMockData1Params = {
    snapshotDate?: string;
  };

  type setOdsMockDataParams = {
    snapshotDate?: string;
  };

  type SignatureInfoVO = {
    indexClass?: string;
    formCategory?: string;
    docTypeCode?: string;
    fileFullName?: string;
    fileImageId?: string;
    customerSeqNo?: string;
    imageData?: string;
  };

  type SimplifyInsuredInfo = {
    id?: string;
    identityType?: string;
    identityId?: string;
    surName?: string;
    givenName?: string;
    sex?: string;
    birthday?: string;
    snapshotList?: SimplifySnapshot[];
  };

  type SimplifyPolicyInfo = {
    policyId?: string;
    policyOwner?: string;
    policyRiskStatus?: string;
  };

  type SimplifySnapshot = {
    policyInfoList?: SimplifyPolicyInfo[];
  };

  type SkipBoHandlerCaseVO = {
    inquiryClaimNo?: string;
    caseNo?: string;
    caseCategory?: string;
    currentActivityKey?: string;
    laFunction?: string;
    errorMessage?: string;
    claimNo?: string;
    ilResult?: number;
    laResult?: number;
    ilClaimRefNo?: string;
    policyNo?: string;
    coverageKey?: string;
    benefitTypeCode?: string;
    payableAmount?: number;
    incidentNo?: string;
  };

  type Snapshot = {
    snapshotDate?: string;
    policyInfoList?: PolicyInfo[];
  };

  type SpecialExclusion = {
    policyId?: string;
    lifeNumber?: string;
    coverageNumber?: string;
    riderNumber?: string;
    currentFrom?: string;
    currentTo?: string;
    exclusionText1?: string;
    exclusionText2?: string;
    exclusionText3?: string;
    exclusionType1?: string;
    exclusionType2?: string;
    exclusionType3?: string;
    exclusionType4?: string;
    exclusionType5?: string;
  };

  type SpecialExclusionDO = {
    policyId?: string;
    lifeNumber?: string;
    coverageNumber?: string;
    riderNumber?: string;
    currentFrom?: string;
    currentTo?: string;
    exclusionText1?: string;
    exclusionText2?: string;
    exclusionText3?: string;
    exclusionType1?: string;
    exclusionType2?: string;
    exclusionType3?: string;
    exclusionType4?: string;
    exclusionType5?: string;
  };

  type startDailyBatchJob1Params = {
    checkCode?: string;
    batchNo: string;
  };

  type startDailyBatchJobByClaimNoParams = {
    checkCode: string;
    claimNo: string;
  };

  type startDailyBatchJobParams = {
    checkCode?: string;
  };

  type SubmissionDataVO = {
    interfaceId?: string;
    businessCode?: string;
    caseNo?: string;
    caseCategory?: string;
    businessNo?: string;
    condition?: string;
    partyData?: PartyData;
    businessData?: Record;
  };

  type SubmissionInfo = {
    claimNo?: string;
    identityType?: string;
    identityId?: string;
    snapshotDate?: string;
    surName?: string;
    givenName?: string;
  };

  type SubmissionInfoList = {
    claimNo?: string;
    identityType?: string;
    identityId?: string;
    snapshotDateList?: string[];
    surName?: string;
    givenName?: string;
  };

  type SubmitInputVOExceptionHandlingDataVO = {
    caseNo?: string;
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    taskId?: string;
    activityKey?: string;
    assessmentType?: string;
    activityVariables?: Record;
    informationList?: InformationVO[];
    operationType?: string;
    businessData?: ExceptionHandlingDataVO;
  };

  type SubmitOutputVO = {
    businessNo?: string;
    inquiryBusinessNo?: string;
    activityVariables?: Record;
    notificationList?: string[];
    informationList?: InformationVO[];
    businessData?: Record;
    slaLevel?: string;
    businessType?: string;
    clientName?: string;
    agentName?: string;
    policyNo?: string;
  };

  type TableDataKey = {
    dataUniqueKeyList?: string[];
    uniqueKeyLevel?: string;
  };

  type testReadTimeOutParams = {
    readSecond: number;
  };

  type testRequestParams = {
    sleep: number;
  };

  type testRestTemplateForMaxStringLengthParams = {
    maxStringLength: number;
  };

  type Transaction = {
    effectiveDate?: string;
    validflag?: string;
    transactionCode?: string;
  };

  type TransactionDO = {
    transactionCode?: string;
    transactionName?: string;
    transactionStatus?: string;
    seqNo?: number;
  };

  type triggerCorrespondenceTaskParams = {
    createDate?: string;
  };

  type UpdateBusinessObjectVO = {
    claimNo?: string;
    inquiryClaimNo?: string;
    instantPaymentStatus?: string;
    caseCategory?: string;
    action?: string;
  };

  type UpdateConfig = {
    key?: string;
    valueFieldPath?: string;
  };

  type updateDataParams = {
    claimNo: string;
    modifier: string;
  };

  type updateJobLogParams = {
    jobId: string;
  };

  type updateJobLogStatusAndErrorMsgParams = {
    jobId: string;
    status: string;
    errorMsg: string;
    isUpdateEndTime: string;
    batchNo: string;
  };

  type updateLaBusinessDateParams = {
    date?: string;
  };

  type uploadLaDailyReportParams = {
    date?: string;
  };

  type UsTaxDeclarationsVO = {
    checked?: boolean;
    cardNo?: string;
    identificationNumber?: string;
    address?: string;
  };

  type UWInformationVO = {
    uwDecision?: string;
  };

  type V2ConversionConfigDataVO = {
    dataConversionList?: DataConversionDO[];
    stringToMapConingList?: DataConversionConfigDO[];
    diffStructureList?: DataConversionDiffStructureDO[];
    mapConfigList?: DataConversionMapConfigDO[];
    valueConfigList?: DataConversionValueConfigDO[];
    valueMapConfigList?: DataConversionValueMapDO[];
  };

  type V3ConversionConfigDataVO = {
    objectFieldConvertConfigList?: ObjectFieldConvertConfigDO[];
    objectStringConvertConfigList?: ObjectStringConvertConfigDO[];
    objectTransformConfigList?: ObjectTransformConfigDO[];
    valueMapList?: ValueMapDO[];
    diffStructConfigList?: ObjectDiffStructConfigDO[];
  };

  type ValueMapDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    mappingCode?: string;
    originalValue?: string;
    finalValue?: string;
    remark?: string;
    source?: string;
    dictTypeCode?: string;
    priorityLevel?: number;
    companyCode?: string;
    mappingFormula?: string;
  };

  type xurasTestParams = {
    screenCode: string;
  };
}
