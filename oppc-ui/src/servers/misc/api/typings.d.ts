declare namespace API {
  type ActivityButton = {
    buttonId?: string;
    pageController?: string;
    buttonCode?: string;
    buttonName?: string;
    activityStatus?: string;
    checkInformationApiUrl?: string;
    preSubmitValidationUrl?: string;
    buttonServiceOrder?: number;
    afterHook?: string;
    activityButtonServiceList?: ButtonService[];
  };

  type AuditLogVO = {
    id?: string;
    operaor?: string;
    operatorId?: string;
    date?: string;
    action?: string;
    taskId?: string;
    formerAssigneeId?: string;
    beAssignedUserId?: string;
    beAssignedUserName?: string;
    processInstanceId?: string;
    procActivityKey?: string;
    content?: Record[];
    businessNo?: string;
    inquiryBusinessNo?: string;
    sourceType?: string;
  };

  type BaseAddress = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    postCode?: string;
    country?: string;
    province?: string;
    city?: string;
    area?: string;
    street?: string;
    address?: string;
  };

  type BaseInfoParam = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    caseNo?: string;
    activityCode?: string;
    categoryCode?: string;
    activityStatus?: string;
    taskId?: string;
    caseCategory?: string;
  };

  type BatchCancelAndSaveInformationVO = {
    caseNoList?: string[];
    informationReasonCode?: string;
    informationContent?: string;
  };

  type BpmInfoReasonDetailVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    caseNo?: string;
    taskId?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    categoryCode?: string;
    reasonType?: string;
    reasonCode?: string;
    reasonTypeOrder?: string;
    informationId?: string;
  };

  type BusinessEnvoyInfoVO = {
    referenceCodes?: string;
    caseNo?: string;
    taskId?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    activityKey?: string;
    caseCategory?: string;
    requestedClientInfos?: MemoRequestedClientInfoVO[];
    sendOutFlag?: boolean;
    skipNbValidation?: boolean;
    businessData?: Record;
    operationType?: string;
    variables?: Record;
    extraPremiumStatus?: string;
  };

  type BusinessInfo = {
    businessNo?: string;
    effectiveDate?: string;
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
    isStp?: number;
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
    passStpRule?: number;
    withdraw?: boolean;
    notWait?: boolean;
    autoActivityKeys?: string[];
    policyNoList?: string[];
    fullStp?: string;
    businessCode?: string;
    companyCode?: string;
  };

  type BusinessQueryVO = {
    caseCategory?: string;
    activityKey?: string;
    taskId?: string;
    businessNo?: string;
    operationType?: string;
    skipSnapshot?: boolean;
  };

  type BusinessSubmitResultVO = {
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    partyId?: string;
    policyNo?: string;
    businessType?: string;
    clientName?: string;
    agentName?: string;
    businessDecision?: string;
    cleanBusinessData?: boolean;
    companyCode?: string;
    businessCode?: string;
    businessTransactionProcess?: BusinessTransactionProcess;
    activityVariables?: Record;
    notificationList?: string[];
    businessData?: Record;
    informationList?: InformationVO[];
    businessProcessIdList?: string[];
    touchId?: string;
    operateCondition?: OperateCondition;
    holdType?: string;
    envoyInfo?: BusinessEnvoyInfoVO;
    operationType?: string;
    progressData?: ProgressInfo[];
    ignoreErrorMsg?: boolean;
    trickButtonServiceOperators?: string[];
    async?: boolean;
  };

  type BusinessTransactionProcess = {
    inquiryBusinessNo?: string;
    needQc?: string;
    processTransitionStatus?: string;
    transitionProcessBusinessNo?: string;
    reversalCount?: number;
  };

  type ButtonService = {
    activityButtonId?: string;
    buttonParams?: string;
    buttonServiceUrl?: string;
    buttonServiceOrder?: number;
    triggerSnapshot?: number;
  };

  type CacheableOperationVO = {
    cacheName?: string;
    key?: string;
    cacheManager?: string;
    ignoreRegion?: boolean;
    cacheNullResult?: boolean;
  };

  type CallbackControlInfoVO = {
    callbackExchange?: string;
    callbackRouteKey?: string;
    businessDataMap?: Record;
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
      contentDisposition?: ContentDisposition;
      acceptCharset?: string[];
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
      empty?: boolean;
      location?: string;
      all?: Record;
      lastModified?: number;
      date?: number;
      contentLength?: number;
      connection?: string[];
      ifModifiedSince?: number;
      contentType?: MediaType;
      origin?: string;
      range?: HttpRange[];
      allow?: HttpMethod[];
      cacheControl?: string;
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
      etag?: string;
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
      acceptLanguage?: { range?: string; weight?: number }[];
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

  type CancelCaseRequestVO = {
    caseNo?: string;
    endCaseRemarkContent?: string;
    endCaseRemarkReason?: string;
    buttonCode?: string;
    skipCheckBusinessData?: boolean;
  };

  type CancelEnvoyEvent = {
    caseNo?: string;
    caseCategory?: string;
    waiveDraft?: boolean;
    ignoreReasonGroupCodeList?: string[];
    copyToCaseInfo?: CopyToCaseInfoVO;
  };

  type CaseBusinessVO = {
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    partyId?: string;
    policyNo?: string;
    businessType?: string;
    clientName?: string;
    agentName?: string;
    businessDecision?: string;
    cleanBusinessData?: boolean;
    companyCode?: string;
    businessCode?: string;
    businessTransactionProcess?: BusinessTransactionProcess;
    caseNo?: string;
    submissionDate?: string;
    submissionChannel?: string;
    operator?: string;
    editFlag?: string;
    createLocation?: string;
    applicant?: string;
    operationType?: string;
    businessData?: Record;
    categoryType?: string;
    status?: string;
    subCaseCategory?: string;
    activityVariables?: Record;
  };

  type CaseCancellationVO = {
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    partyId?: string;
    policyNo?: string;
    businessType?: string;
    clientName?: string;
    agentName?: string;
    businessDecision?: string;
    cleanBusinessData?: boolean;
    companyCode?: string;
    businessCode?: string;
    businessTransactionProcess?: BusinessTransactionProcess;
    caseNo?: string;
    submissionDate?: string;
    submissionChannel?: string;
    operator?: string;
    editFlag?: string;
    createLocation?: string;
    applicant?: string;
    operationType?: string;
    taskId?: string;
    activityKey?: string;
    checkType?: string;
    cancelReason?: string;
    reversedReason?: string;
    updateBy?: string;
    businessData?: Record;
    activityVariables?: Record;
    informationList?: InformationVO[];
    businessProcessIdList?: string[];
    isAutoCancel?: string;
  };

  type CaseCreateResultVO = {
    caseNo?: string;
    taskId?: string;
    activityKey?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    assignee?: string;
    questionnaireIds?: string[];
    policyNo?: string;
    activityVariables?: Record;
    businessTransactionProcess?: BusinessTransactionProcess;
    touchId?: string;
    operationType?: string;
    autoActivity?: boolean;
  };

  type CaseCreationVO = {
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    partyId?: string;
    policyNo?: string;
    businessType?: string;
    clientName?: string;
    agentName?: string;
    businessDecision?: string;
    cleanBusinessData?: boolean;
    companyCode?: string;
    businessCode?: string;
    businessTransactionProcess?: BusinessTransactionProcess;
    caseNo?: string;
    submissionDate?: string;
    submissionChannel?: string;
    operator?: string;
    editFlag?: string;
    createLocation?: string;
    applicant?: string;
    operationType?: string;
    parentId?: string;
    taskId?: string;
    activityKey?: string;
    messageJobId?: number;
    assignee?: string;
    autoActivity?: boolean;
    relatedCase?: RelatedCaseVO;
    activityVariables?: Record;
    businessData?: Record;
    answerData?: Record;
    answerDataConverter?: string;
    notificationList?: string[];
    informationList?: InformationVO[];
    businessProcessIdList?: string[];
    isBusinessMandatory?: number;
    integrationSessionId?: string;
    questionnaireIds?: string[];
    transId?: string;
    docViewVOList?: DocViewVO[];
    waivedDocMandatoryIndicator?: string;
    callbackControlInfo?: CallbackControlInfoVO;
    touchId?: string;
  };

  type CaseDetailList = {
    caseDetailList?: ClaimProgressResponseVO[];
  };

  type CaseDetailQueryVO = {
    taskId?: string;
    caseCategory?: string;
    businessNo?: string;
  };

  type CaseLabelVO = {
    labelCode?: string;
    labelValue?: string;
    valueTypeCode?: string;
    inquiryBusinessNo?: string;
    caseNo?: string;
    labelTypeCode?: string;
    labelDictCode?: string;
  };

  type CaseOverdueJobVO = {
    businessNo?: string;
    inquiryBusinessNo?: string;
    caseCategory?: string;
    activityKey?: string;
    caseNo?: string;
    triggerPoint?: string;
    operationType?: string;
    overdueTime?: string;
    status?: string;
    needCompare?: boolean;
    reasonId?: string;
    manualExtend?: boolean;
  };

  type CaseRevertVO = {
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    partyId?: string;
    policyNo?: string;
    businessType?: string;
    clientName?: string;
    agentName?: string;
    businessDecision?: string;
    cleanBusinessData?: boolean;
    companyCode?: string;
    businessCode?: string;
    businessTransactionProcess?: BusinessTransactionProcess;
    caseNo?: string;
    submissionDate?: string;
    submissionChannel?: string;
    operator?: string;
    editFlag?: string;
    createLocation?: string;
    applicant?: string;
    operationType?: string;
    taskId?: string;
    activityKey?: string;
    checkType?: string;
    businessData?: Record;
    activityVariables?: Record;
    informationList?: InformationVO[];
    businessProcessIdList?: string[];
  };

  type CaseSubmitVO = {
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    partyId?: string;
    policyNo?: string;
    businessType?: string;
    clientName?: string;
    agentName?: string;
    businessDecision?: string;
    cleanBusinessData?: boolean;
    companyCode?: string;
    businessCode?: string;
    businessTransactionProcess?: BusinessTransactionProcess;
    caseNo?: string;
    submissionDate?: string;
    submissionChannel?: string;
    operator?: string;
    editFlag?: string;
    createLocation?: string;
    applicant?: string;
    operationType?: string;
    parentId?: string;
    taskId?: string;
    activityKey?: string;
    messageJobId?: number;
    assignee?: string;
    autoActivity?: boolean;
    assessmentType?: string;
    activityVariables?: Record;
    businessData?: Record;
    mandatoryDocList?: string[];
    notificationList?: string[];
    checkType?: string;
    businessProcessIdList?: string[];
    informationList?: InformationVO[];
    nextActivityStatus?: string;
    snapshotSync?: boolean;
    touchId?: string;
    hasBeenHoldFlag?: boolean;
    ocrFillData?: boolean;
    retry?: boolean;
    regionCode?: string;
    validateType?: string;
    platformCode?: string;
    holeType?: string;
    reminderJobOperationValue?: string;
  };

  type CaseSubmitVOObject = {
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    partyId?: string;
    policyNo?: string;
    businessType?: string;
    clientName?: string;
    agentName?: string;
    businessDecision?: string;
    cleanBusinessData?: boolean;
    companyCode?: string;
    businessCode?: string;
    businessTransactionProcess?: BusinessTransactionProcess;
    caseNo?: string;
    submissionDate?: string;
    submissionChannel?: string;
    operator?: string;
    editFlag?: string;
    createLocation?: string;
    applicant?: string;
    operationType?: string;
    parentId?: string;
    taskId?: string;
    activityKey?: string;
    messageJobId?: number;
    assignee?: string;
    autoActivity?: boolean;
    assessmentType?: string;
    activityVariables?: Record;
    businessData?: Record;
    mandatoryDocList?: string[];
    notificationList?: string[];
    checkType?: string;
    businessProcessIdList?: string[];
    informationList?: InformationVO[];
    nextActivityStatus?: string;
    snapshotSync?: boolean;
    touchId?: string;
    hasBeenHoldFlag?: boolean;
    ocrFillData?: boolean;
    retry?: boolean;
    regionCode?: string;
    validateType?: string;
    platformCode?: string;
    holeType?: string;
    reminderJobOperationValue?: string;
  };

  type CategoryReasonParam = {
    caseCategory?: string;
    activityCode?: string;
    categoryCode?: string;
    businessNo?: string;
  };

  type CfFieldDefaultValueBO = {
    fieldName?: string;
    department?: string;
    defaultValue?: string;
    fieldType?: number;
  };

  type CfgLogLevelVO = {
    serviceName?: string;
    logName?: string;
    logLevel?: string;
    logExtendName?: string;
    logExtendConfig?: LogExtendConfigVO;
  };

  type changeNewCorrespondenceSwitchParams = {
    newEnableFlag: boolean;
    oldEnableFlag: boolean;
  };

  type ChannelDataVO = {
    id?: string;
    reasonGroupId?: string;
    ownerId?: string;
    ownerType?: number;
    channel?: string;
    content?: string;
    enable?: boolean;
  };

  type ChartVO = {
    data?: string;
    object?: QueryObject;
    fields?: string;
  };

  type CheckInfoParam = {
    caseCategory?: string;
    activityCode?: string;
    buttonCode?: string;
    caseNo?: string;
    taskId?: string;
    activityStatus?: string;
    messageCode?: string;
    operationType?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
  };

  type Claimant = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    claimNo?: string;
    relationshipWithInsured?: string;
    firstName?: string;
    surname?: string;
    identityType?: string;
    identityNo?: string;
    nationality?: string;
    gender?: string;
    dateOfBirth?: string;
    occupation?: string;
    phoneNo?: string;
    email?: string;
    address?: string;
    claimant?: string;
    postCode?: string;
    mailCode?: string;
    age?: string;
  };

  type ClaimAppealCaseInfoVO = {
    processInstanceId?: string;
    claimNo?: string;
    insuredName?: string;
    assessmentDecision?: string;
    payableAmount?: string;
    claimType?: string;
    claimTypeArray?: string[];
  };

  type ClaimAppealVO = {
    claimNo?: string;
    originalProcessInstanceId?: string;
    originalClaimNo?: string;
    appealType?: string;
    inquiryClaimNo?: string;
    caseCategory?: string;
    claimType?: string;
    claimTypeArray?: string[];
  };

  type ClaimCase = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    claimant?: Claimant;
    submissionChannel?: string;
    submissionDate?: string;
    claimNo?: string;
    closeDate?: string;
    caseCategory?: string;
    status?: string;
    caseSource?: string;
    parentClaimNo?: string;
    inquiryClaimNo?: string;
    receivedDate?: string;
    processInstanceId?: string;
    taskId?: string;
    appealCount?: number;
    firstFormReceiveDate?: string;
    lastFormReceiveDate?: string;
    firstMcReceiveDate?: string;
    eligibilityCheckDate?: string;
    dispatchDate?: string;
  };

  type ClaimProgressRequestListVO = {
    businessCode?: string;
    interfaceId?: string;
    regionCode?: string;
    caseNoList?: string[];
  };

  type ClaimProgressRequestVO = {
    businessCode?: string;
    interfaceId?: string;
    regionCode?: string;
    caseNoOfRCS?: string;
  };

  type ClaimProgressResponseVO = {
    stpFlag?: number;
    claimNo?: string;
    statusOfClaim?: string;
    claimNoOfLocalSystem?: string;
    policyPaymentList?: PolicyPayment[];
    caseNoOfRCS?: string;
    instantPaymentStatus?: string;
  };

  type ClientInfoDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    clientId?: string;
    identityType?: string;
    identityNo?: string;
    status?: string;
    firstName?: string;
    middleName?: string;
    surname?: string;
    gender?: string;
    dateOfBirth?: string;
    occupationCode?: string;
    nationality?: string;
    phoneNo?: string;
    email?: string;
    postCode?: string;
    address?: string;
    title?: string;
    extName?: string;
    placeOfBirth?: string;
    currentState?: string;
    ageAdmitIndicator?: string;
    companyName?: string;
    representative?: string;
    position?: string;
    district?: string;
    useChiInd?: string;
    vip?: string;
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

  type ConfigurableNavigatorQueryDTO = {
    organizationCode?: string;
  };

  type ConfigurableNavigatorVO = {
    categoryCode?: string;
    categoryName?: string;
    inquiryField?: InquiryFieldBO[];
    resultField?: ResultFieldBO[];
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

  type CopyToCaseInfoVO = {
    caseNo?: string;
    taskId?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    caseCategory?: string;
    activityKey?: string;
  };

  type createIndexParams = {
    indexKey: string;
  };

  type CreatePendingCaseVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    claimant?: Claimant;
    submissionChannel?: string;
    submissionDate?: string;
    claimNo?: string;
    closeDate?: string;
    caseCategory?: string;
    status?: string;
    caseSource?: string;
    parentClaimNo?: string;
    inquiryClaimNo?: string;
    receivedDate?: string;
    processInstanceId?: string;
    taskId?: string;
    appealCount?: number;
    firstFormReceiveDate?: string;
    lastFormReceiveDate?: string;
    firstMcReceiveDate?: string;
    eligibilityCheckDate?: string;
    dispatchDate?: string;
    parentId?: string;
    taskDefKey?: string;
    startTime?: string;
    endTime?: string;
    duration?: number;
    isNotReminder?: number;
    pendCategoryCode?: string;
    pendingReason?: string;
    pendingType?: string;
    pendingPeriod?: number;
    pendingToRole?: string;
    pendingTo?: string;
    pendingMessageTypeString?: string;
    pendingMessageTypes?: string[];
    pendingMessageTemplate?: string;
    reminders?: PendReminder[];
    pendingCaseCategories?: string[];
    pendingPageType?: string;
    pendingActions?: string;
    pendInfoDispatchDate?: string;
    subCaseProcessInstanceId?: string;
    applicationNo?: string;
    businessNo?: string;
    sendPendingType?: string;
    variables?: Record;
  };

  type CustomTaskInfo = {
    id?: string;
    owner?: string;
    assignee?: string;
    parentTaskId?: string;
    name?: string;
    description?: string;
    priority?: number;
    createTime?: string;
    dueDate?: string;
    category?: string;
    executionId?: string;
    processInstanceId?: string;
    processDefinitionId?: string;
    taskDefinitionId?: string;
    scopeId?: string;
    subScopeId?: string;
    scopeType?: string;
    scopeDefinitionId?: string;
    taskDefinitionKey?: string;
    formKey?: string;
    identityLinkCount?: number;
    subTaskCount?: number;
    claimTime?: string;
    tenantId?: string;
    processActivityOrder?: number;
    autoActivity?: boolean;
  };

  type DataMaskingLog = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    maskFieldId?: string;
    value?: string;
    fieldKeyId?: string;
    taskNo?: string;
  };

  type DocInfo = {
    indexClass?: string;
    formCategory?: string;
    docTypeCode?: string;
    fileImageId?: string;
    fileFullName?: string;
  };

  type DocInfoParam = {
    caseNo?: string;
    activityCode?: string;
    caseCategory?: string;
    businessNo?: string;
    policyNo?: string;
    documentTypeCode?: string;
    documentId?: string;
    documentName?: string;
    awplDocumentIndex?: string;
    caseNoToCategoryMap?: Record;
    whetherUnique?: boolean;
    resources?: string;
    mineType?: string;
    pendMemo?: string;
    oriDocumentTypeCode?: string;
    wakeUpSkipFlag?: string;
    sourceOfDoc?: string;
  };

  type DocViewVO = {
    id?: string;
    docId?: string;
    srcDocId?: string;
    submissionId?: string;
    batchNo?: string;
    formCategory?: string;
    docTypeCode?: string;
    receivedDate?: string;
    name?: string;
    classification?: number;
    content?: string;
    image?: string;
    policies?: string;
    insuredName?: string;
    contentType?: number;
    caseNo?: string;
    caseCategory?: string;
    parentBusinessNo?: string;
    businessNo?: string;
    appNo?: string;
    type?: number;
    replaceDocId?: string;
    creationDate?: string;
    formerDocId?: string;
    voidFlag?: number;
    indexClass?: string;
    policyNo?: string;
    insuredId?: string;
    imageData?: string;
    customNameScope?: string;
    firstName?: string;
    surname?: string;
    identityNo?: string;
    identityType?: string;
    docDataId?: string;
    personalDocInd?: string;
    clientId?: string;
    customerSeqNo?: string;
    customerRole?: string;
    customerName?: string;
    customerType?: string;
    nric?: string;
    otherId?: string;
    fileSourceType?: string;
    fileSourceParam1?: string;
    fileSourceParam2?: string;
    fileSourceParam3?: string;
    beneficiarySepNo?: string;
    productCode?: string;
    submissionDate?: string;
    externalDocTypeCode?: string;
    imageUploadStatus?: string;
    sourceOfDoc?: string;
  };

  type doRetryNbSendCcmParams = {
    caseNo: string;
    reasonGroupId?: string;
  };

  type downloadWorksheetParams = {
    caseNo: string;
    fileName: string;
  };

  type DropdownResult = {
    dictCode?: string;
    dictName?: string;
    typeCode?: string;
  };

  type EncoderConfig = {
    algorithm?: string;
    secretKey?: string;
  };

  type EnvoyInfo = {
    caseNo?: string;
    taskId?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    caseCategory?: string;
    activityKey?: string;
    taskStatus?: string;
    currentReasonGroups?: ReasonGroupVO[];
    historyReasonGroups?: ReasonGroupVO[];
    assignee?: string;
  };

  type ExceptionMessage = {
    code?: string;
    args?: string[];
    type?: string;
    metaData?: Record;
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

  type findAASameClientTaskParams = {
    domain: string;
    claimNo: string;
  };

  type findReasonInfoParams = {
    caseNo: string;
    taskId: string;
  };

  type GenerateNoRequestVO = {
    numberType?: string;
    conditions?: Record;
    empty?: boolean;
  };

  type getClaimAppealParams = {
    claimNo: string;
  };

  type getClassificationParams = {
    caseNo: string;
  };

  type getDataMaskingLogParams = {
    fieldKeyId: string;
  };

  type getDefaultActivityParams = {
    dataKey: string;
    dataValue: string;
  };

  type getLogConfigCacheParams = {
    logName: string;
  };

  type getMachineConfigParams = {
    configKey: string;
  };

  type getRemarksParams = {
    insuredId: string;
  };

  type getTaskParams = {
    taskId: string;
  };

  type handleCasePresitParams = {
    applicationNo: string;
    policyDecision?: string;
    policyPremium?: string;
    triggerPostQC?: string;
    policyIssueDate?: string;
    isWithDraw?: string;
    isNtu?: string;
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
    proxyHost?: HttpHost;
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
    hopCount?: number;
    tunnelType?: 'PLAIN' | 'TUNNELLED';
    layerType?: 'PLAIN' | 'LAYERED';
  };

  type IgnoreFieldConfig = {
    ignoreFieldKeyList?: string[];
    ignoreType?: string;
    criteria?: QueryConfig[];
  };

  type IndicatorVO = {
    isUrgent?: string;
    fullStp?: string;
    isSta?: string;
    withdraw?: string;
    notWait?: string;
    onHold?: string;
    appealFlag?: string;
    preDefineDecisionInd?: string;
    vip?: string;
    applicationNo?: string;
    gsIndicator?: string;
    saleSubChannel?: string;
    payorPOrelation?: string;
    claimsAdvice?: string;
    riAdvice?: string;
    ageCross?: string;
    caseLabelList?: CaseLabelVO[];
  };

  type InfoCategoryReasonVO = {
    reasonCode?: string;
    reasonType?: string;
    isDefault?: number;
    canHide?: number;
  };

  type InfoClassification = {
    caseNo?: string;
    insuredId?: string;
    policyIdList?: string[];
  };

  type InfoReasonType = {
    fieldName?: string;
    typeCode?: string;
    descriptionTypeCode?: string;
    value?: InfoCategoryReasonVO[];
    reasonTypeOrder?: number;
  };

  type InformationDO = {
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
    reason?: string;
    reasonType?: string;
    infoReasons?: BpmInfoReasonDetailVO[];
    itemCode?: string;
  };

  type InformationLinkToDO = {
    id?: string;
    informationId?: string;
    linkToKey?: string;
    linkToValue?: string;
  };

  type InformationLinkToVO = {
    id?: string;
    informationId?: string;
    linkToKey?: string;
    linkToValue?: string;
  };

  type InformationReferenceBatchVO = {
    informationIds?: string[];
    informations?: InformationVO[];
  };

  type InformationReferenceVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    informationId?: string;
    referenceCode?: string;
    readStatus?: number;
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
    reason?: string;
    reasonType?: string;
    infoReasons?: BpmInfoReasonDetailVO[];
    itemCode?: string;
    informationLinkToList?: InformationLinkToVO[];
    referenceCode?: string;
    businessCode?: string;
    createdDate?: string;
    saveIfNull?: number;
    effectiveStringDate?: string;
    useTaskLevelActInfoCategoryCfg?: string;
  };

  type InquiryFieldBO = {
    fieldName?: string;
    hidden?: boolean;
    sequence?: number;
    fieldType?: number;
    fieldCode?: string;
    businessCode?: string;
    typeCode?: string;
    dictCode?: string;
    dictTypeCode?: string;
    defaultValueList?: CfFieldDefaultValueBO[];
  };

  type IntegratedPendInfoVO = {
    taskStatus?: string;
    currentPendInfo?: PendQueryVO;
    historicalPendInfo?: PendQueryVO;
    snapshot?: boolean;
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
    callStatus?: string;
    systemCode?: string;
    allowManualRetry?: boolean;
    nextRetryTime?: string;
  };

  type IntegrationChecklistBO = {
    taskId?: string;
    caseNo?: string;
    caseCategory?: string;
    activityKey?: string;
    taskStatus?: string;
    autoActivity?: number;
    allowManualRetry?: boolean;
    integrationCallRecordList?: IntegrationCallRecordBO[];
  };

  type IntegrationChecklistInquiryParam = {
    caseNo?: string;
    businessNo?: string;
    caseCategory?: string;
  };

  type isShowUploadButtonParams = {
    caseNo: string;
  };

  type IWSRequestMigrateVO = {
    receivedDateFrom?: string;
    receivedDateTo?: string;
    claimCaseIdList?: string[];
    pageSize?: number;
  };

  type JobContext = {
    id?: string;
    tenant?: string;
    region?: string;
    name?: string;
    transId?: string;
    caseCategory?: string;
    data?: Record;
  };

  type LinkToCaseParam = {
    linkToCaseNo?: string;
    documentIds?: string[];
  };

  type listCaseManagementByClaimNosParams = {
    claimNos: string[];
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

  type LogQueryVO = {
    logId?: string;
    logCollection?: string;
    businessNo?: string;
    caseNo?: string;
    taskId?: string;
    integrationCodeList?: string[];
    transId?: string;
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

  type MarkInfoParam = {
    id?: string;
    readStatus?: number;
    userId?: string;
  };

  type MaskLogConfig = {
    masking?: boolean;
    maskFields?: string[];
    maskLoggerNames?: string[];
  };

  type MediaType = {
    type?: string;
    subtype?: string;
    parameters?: Record;
    qualityValue?: number;
    wildcardType?: boolean;
    wildcardSubtype?: boolean;
    subtypeSuffix?: string;
    charset?: string;
    concrete?: boolean;
  };

  type MemoRequestedClientInfoVO = {
    referenceCode?: string;
    requestedClientId?: string;
    requestedClientRole?: string;
    subTypeCodeList?: string[];
  };

  type MessageVO = {
    code?: string;
    content?: string;
    type?: string;
    metaData?: Record;
    application?: string;
  };

  type migrate1Params = {
    oldCaseNo: string;
  };

  type MigrateInfoToC360VO = {
    infoIds?: string[];
    categoryCodes?: string[];
    businessCode?: string;
    cleanHtmlTag?: boolean;
  };

  type MigrationRequestVO = {
    bizCode?: string;
    regionCode?: string;
    oldCaseNoList?: string[];
  };

  type MigrationTaskCompletedMessage = {
    currentTask?: CustomTaskInfo;
    newTask?: CustomTaskInfo;
    businessProcess?: BusinessProcess;
    assign?: string;
    variables?: Record;
    processEnded?: boolean;
  };

  type ModuleConfig = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    region?: string;
    module?: string;
    submodule?: string;
    remark?: string;
    isOption?: number;
    isDefault?: number;
  };

  type ModuleConfigVO = {
    module?: string;
    isDefault?: number;
    submodule?: ModuleConfig[];
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

  type NaviExecuteJobInfoVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    jobName?: string;
    batchNo?: string;
    caseNo?: string;
    businessNo?: string;
    startTime?: string;
    endTime?: string;
    status?: string;
    errorMsg?: string;
    retry?: number;
  };

  type NavigatorCaseManagementDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    processInstanceId: string;
    businessNo: string;
    businessType: string;
  };

  type NavigatorInformationDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    informationId?: string;
    category: string;
    processInstanceId: string;
    procActivityKey?: string;
    effectiveDate: string;
    expiryDate: string;
    content: string;
    requestType?: string;
    status: string;
    linkToId?: string;
    linkToKey: string;
    linkToValue: string;
    author?: string;
    taskId?: string;
    defaultDate?: boolean;
    caseCategory?: string;
  };

  type ObjectCompareResult = {
    equalFieldList?: string[];
    failFieldList?: string[];
    lackFieldList?: string[];
    abundantFieldList?: string[];
    existDiff?: boolean;
  };

  type OcrConversionRequestVO = {
    requestData?: Record;
    caseSubmitVO?: CaseSubmitVOObject;
    ocrValidationDefinitionList?: OcrValidationDefinition[];
  };

  type OcrConversionResponseVOObject = {
    conversionResult?: Record;
    ocrExceptionalMessageList?: OcrExceptionalMessage[];
    caseSubmitVO?: CaseSubmitVOObject;
  };

  type OcrExceptionalMessage = {
    exceptionMsg?: string;
    docNameReceiptPage?: string;
    validationCode?: string;
  };

  type OcrValidationDefinition = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    validationCode?: string;
    category?: string;
    validationName?: string;
    description?: string;
    updateBusinessData?: boolean;
    failStp?: boolean;
    messageCode?: string;
    messageDesc?: string;
    messageLevel?: string;
    ocrResultScreenDesc?: string;
    showInformation?: boolean;
    notificationDesc?: string;
    actionDesc?: string;
  };

  type OperateCondition = {
    ignoreCompleteTask?: boolean;
    createPostQc?: boolean;
    createSnapshot?: boolean;
    updateCase?: boolean;
    deleteSnapshot?: boolean;
  };

  type Page = {
    totalPage?: number;
    pageSize?: number;
    currentPage?: number;
    sortName?: string;
    sortOrder?: string;
    total?: number;
    startPage?: number;
    params?: Record;
    offset?: number;
    rows?: Record[];
    firstResult?: number;
  };

  type PageDropdownResult = {
    totalPage?: number;
    pageSize?: number;
    currentPage?: number;
    sortName?: string;
    sortOrder?: string;
    total?: number;
    startPage?: number;
    params?: Record;
    offset?: number;
    rows?: DropdownResult[];
    firstResult?: number;
  };

  type PageInformationDO = {
    totalPage?: number;
    pageSize?: number;
    currentPage?: number;
    sortName?: string;
    sortOrder?: string;
    total?: number;
    startPage?: number;
    params?: Record;
    offset?: number;
    rows?: InformationDO[];
    firstResult?: number;
  };

  type PageObject = {
    totalPage?: number;
    pageSize?: number;
    currentPage?: number;
    sortName?: string;
    sortOrder?: string;
    total?: number;
    startPage?: number;
    params?: Record;
    offset?: number;
    rows?: Record[];
    firstResult?: number;
  };

  type PageRemoteServiceCallRecordDO = {
    totalPage?: number;
    pageSize?: number;
    currentPage?: number;
    sortName?: string;
    sortOrder?: string;
    total?: number;
    startPage?: number;
    params?: Record;
    offset?: number;
    rows?: RemoteServiceCallRecordDO[];
    firstResult?: number;
  };

  type PageUserInfoVO = {
    totalPage?: number;
    pageSize?: number;
    currentPage?: number;
    sortName?: string;
    sortOrder?: string;
    total?: number;
    startPage?: number;
    params?: Record;
    offset?: number;
    rows?: UserInfoVO[];
    firstResult?: number;
  };

  type PartyData = {
    regionCode?: string;
    businessCode?: string;
    partyResponseResult?: PartyResponseResult;
  };

  type PartyQueryResultVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    partyId?: string;
    category?: string;
    effectiveDate?: string;
    expireDate?: string;
    status?: string;
    clientId?: string;
    identityType?: string;
    identityNo?: string;
    phoneNo?: string;
    emailAddress?: string;
    postCode?: string;
    address?: string;
    baseAddress?: BaseAddress;
    firstName?: string;
    surname?: string;
    middleName?: string;
    extName?: string;
    gender?: string;
    dateOfBirth?: string;
    nationality?: string;
    occupationCode?: string;
    companyName?: string;
    memberNo?: string;
    policyIdList?: string[];
    policyResultList?: PolicyResult[];
    partySource?: string;
    district?: string;
  };

  type PartyResponseResult = {
    moreIndicator?: string;
    partyInfoList?: PartyQueryResultVO[];
  };

  type PendInfo = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    taskId?: string;
    parentId?: string;
    taskDefKey?: string;
    processInstanceId?: string;
    startTime?: string;
    endTime?: string;
    duration?: number;
    status?: string;
    pendCategoryCode?: string;
    pendingReason?: string;
    pendingType?: string;
    pendingPeriod?: number;
    pendingToRole?: string;
    pendingToRoleString?: string;
    pendingToRoles?: string[];
    pendingTo?: string;
    isNotReminder?: number;
    pendInfoDispatchDate?: string;
    pendingMessageTypeString?: string;
    pendingMessageTypes?: string[];
    pendingMessageTemplate?: string;
    reminders?: PendingReminder[];
    pendingCaseCategories?: string[];
    subCaseProcessInstanceId?: string;
    applicationNo?: string;
    triggerCaseProcInstId?: string;
    pendingPageType?: string;
    pendingActions?: string;
    region?: string;
    businessNo?: string;
    sendPendingControl?: boolean;
    pendingUserInfos?: PendingUserInfoVO[];
    permissionLimitResults?: PermissionLimitResult[];
  };

  type PendingMemoSubInfoVO = {
    id?: string;
    reasonDetailId?: string;
    reasonGroupId?: string;
    memoId?: string;
    subTypeCode?: string;
    subRemark?: string;
  };

  type PendingMemoVO = {
    id?: string;
    reasonDetailId?: string;
    reasonGroupId?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    pendingDate?: string;
    memoSeq?: number;
    memoCode?: string;
    memoDesc?: string;
    memoStatus?: string;
    gmtModified?: string;
    gmtCreate?: string;
    creator?: string;
    subTypeCode?: string;
    memoRemark?: string;
    requestedClientRole?: string;
    requestedClientId?: string;
    memoCategory?: string;
    readFlag?: string;
    medicalProviderCode?: string;
    pendingMemoSubInfoList?: PendingMemoSubInfoVO[];
    statusChangeTime?: string;
    submitStatus?: string;
    submittedTime?: string;
    statusChangeReason?: string;
    surveyCompany?: string;
    coreSeqNo?: number;
    source?: string;
  };

  type PendingReminder = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    pendInfoId?: string;
    taskId?: string;
    sequence?: number;
    sendDay?: number;
    startTime?: string;
    reminderMessageTypeString?: string;
    reminderMessageTypes?: string[];
    reminderMessageTemplate?: string;
    pendingToRole?: string;
    pendingToRoleString?: string;
    pendingToRoles?: string[];
    pendingTo?: string;
    overdue?: number;
    sendDate?: string;
    reminderDispatchDate?: string;
  };

  type PendingUserInfoVO = {
    role?: string;
    claimNo?: string;
    roleCode?: string;
    type?: string;
    address?: string;
    postCode?: string;
    surname?: string;
    firstName?: string;
    phoneNo?: string;
    email?: string;
    userName?: string;
    mailAddress?: string;
  };

  type PendQueryVO = {
    caseCategory?: string;
    businessNo?: string;
    taskId?: string;
    activityKey?: string;
    activityName?: string;
    pendingInfoList?: PendInfo[];
  };

  type PendReminder = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    pendInfoId?: string;
    taskId?: string;
    sequence?: number;
    sendDay?: number;
    startTime?: string;
    reminderMessageTypeString?: string;
    reminderMessageTypes?: string[];
    reminderMessageTemplate?: string;
    pendingToRole?: string;
    pendingTo?: string;
    pendingToRoleString?: string;
    pendingToRoles?: string[];
    reminderDispatchDate?: string;
  };

  type PermissionLimitDefinitionVO = {
    permissionCode?: string;
    categoryCode?: string;
    limitCode?: string;
    limitTargetField?: string;
    compareType?: string;
    min?: number;
    max?: number;
    assertValue?: string;
  };

  type PermissionLimitResult = {
    categoryCode?: string;
    result?: boolean;
    scopeResult?: number;
    errorCode?: string;
    equalsAttrs?: string;
    limitResult?: string[];
  };

  type PieChartVO = {
    data?: string;
    object?: QueryObject;
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

  type PolicyContractDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    policyId?: string;
    regionCode?: string;
    contractType?: string;
    riskStatus?: string;
    premiumStatus?: string;
    riskCommenceDate?: string;
    paymentMode?: string;
    policyValue?: number;
    nextAnnualPremium?: number;
    nextSemiAnnualPremium?: number;
    nextQuarterlyPremium?: number;
    nextMonthlyPremium?: number;
    pledgeFlg?: string;
    sizureFlg?: number;
    originalRegionCode?: string;
    informDate?: string;
    pnsPayRidr?: number;
    billToDate?: string;
    payToDate?: string;
    issueEffectiveDate?: string;
    riskCessationDate?: string;
    reinstatementDate?: string;
    terminateDate?: string;
    payInStatus?: string;
    distributionChannel?: string;
    billingFrequency?: string;
    policySource?: string;
  };

  type PolicyInsured = {
    clientId?: string;
    vip?: string;
    customerID?: string[];
  };

  type PolicyOwner = {
    clientId?: string;
    vip?: string;
    customerID?: string[];
  };

  type PolicyPayment = {
    policyNo?: string;
    currencyOfPayment?: string;
    amountOfPayment?: number;
  };

  type PolicyQO = {
    regionCode?: string;
    businessCode?: string;
    customerType?: string;
    businessNo?: string;
    requestType?: string;
    partyId?: string;
    clientId?: string;
    identityType?: string;
    identityNo?: string;
    firstName?: string;
    middleName?: string;
    surname?: string;
    extName?: string;
    gender?: string;
    dateOfBirth?: string;
    phoneNo?: string;
    email?: string;
    address?: string;
    partySource?: string;
    policyId?: string;
    memberNo?: string;
    enquiryDateList?: string[];
    policyIdList?: string[];
  };

  type PolicyResult = {
    policyId?: string;
    policySource?: string;
    memberNo?: string;
    policyContractDO?: PolicyContractDO;
    ownerClientInfo?: ClientInfoDO;
  };

  type PoolStats = {
    leased?: number;
    pending?: number;
    available?: number;
    max?: number;
  };

  type PosDataCaptureVO = {
    posNo?: string;
    caseNo?: string;
    taskId?: string;
    policyNo?: string;
    transactionType?: string;
    caseCategory?: string;
    submissionDate?: string;
    submissionChannel?: string;
    posDataDetail?: string;
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

  type ProcessDefinitionStatusVO = {
    processDefId?: string;
    caseCategory?: string;
    processActivityKey?: string;
    variables?: Record;
    assignee?: string;
    isWarning?: boolean;
    organizationMemberList?: string[];
    taskOrder?: number;
  };

  type ProgressInfo = {
    id?: number;
    title?: string;
    status?: string;
    error?: string;
  };

  type PromptMessage = {
    code?: string;
    type?: string;
    content?: string;
    messageCode?: string;
    applicationName?: string;
    metaData?: Record;
  };

  type queryCaseManagementByProcessInstantIdsParams = {
    processInstantIdList: string[];
  };

  type queryCaseNoByClaimNoParams = {
    claimNo: string;
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

  type queryDispatchFlowInfoParams = {
    code: string;
    letter: string;
  };

  type queryLoggerParams = {
    apiTraceId: string;
  };

  type QueryObject = {
    year?: number;
    month?: number;
    day?: number;
    quarter?: number;
  };

  type queryParams = {
    processInstanceId: string;
  };

  type ReasonAttachDocVO = {
    id?: string;
    docId?: string;
    docName?: string;
    externalDocId?: string;
  };

  type ReasonDetailVO = {
    id?: string;
    reasonGroupId?: string;
    reasonCode?: string;
    reasonName?: string;
    type?: string;
    period?: number;
    startTime?: string;
    endTime?: string;
    expiryTime?: string;
    status?: string;
    destRole?: string;
    dest?: string;
    subCaseCategory?: string;
    subCaseNo?: string;
    triggerCaseNo?: string;
    enableReminder?: boolean;
    enableAutoReminder?: boolean;
    enableReminderNotice?: boolean;
    enableWorkday?: boolean;
    triggerDocDispatch?: boolean;
    dispatchDate?: string;
    defaultChannel?: string;
    destRoleOpt?: string[];
    channelDataList?: ChannelDataVO[];
    reasonReminders?: ReasonReminderVO[];
    pendingMemoList?: PendingMemoVO[];
    reasonDocs?: ReasonDocVO[];
    docGroupCodes?: string[];
    displayConfig?: string;
    policy?: string;
    attachment?: string;
    delayLetter?: boolean;
    define?: string;
    copyData?: string;
    attachDocs?: ReasonAttachDocVO[];
    syncDestToReminder?: boolean;
    triggerCcm?: boolean;
    remark?: string;
    payment?: string;
    emailAddress?: string;
    dataType?: string;
    policyNo?: string;
    requestFormArrivalDate?: string;
    investigationCompanyName?: string;
    confirmationNo?: string;
    declinedReasonBranchOffice?: string;
    declinedReasonClient?: string;
    policyTerminationReason?: string;
    announcementObligation?: string;
    deceisionDetail?: string;
    investigationPoint?: string;
    attentionItems?: string;
    branchOffice?: string;
    branchOfficeTittle?: string;
    multiplePolicyIndicator?: string;
    caseRelationWithSubCase?: string;
    subCaseRelationWithCase?: string;
    subCaseBusinessType?: string;
    ccmSyncFlag?: string;
    letterCode?: string;
    destId?: string;
    hospitalCategory?: string;
    hospRecipientCode?: string;
    subTaskId?: string;
    requestPurpose?: string;
  };

  type ReasonDocVO = {
    id?: string;
    reasonGroupId?: string;
    reasonDetailId?: string;
    caseNo?: string;
    taskId?: string;
    activityKey?: string;
    appNo?: string;
    reasonCode?: string;
    docGroupCode?: string;
    docTypeCode?: string;
    docId?: string;
    docName?: string;
    docStatus?: string;
    comment?: string;
    copies?: number;
    businessNo?: string;
    inquiryBusinessNo?: string;
    enableFreeTextDoc?: boolean;
    enableComment?: boolean;
    enableCopies?: boolean;
    memoId?: string;
  };

  type ReasonGroupVO = {
    id?: string;
    name?: string;
    groupCode?: string;
    caseNo?: string;
    taskId?: string;
    caseCategory?: string;
    activityKey?: string;
    status?: string;
    startTime?: string;
    endTime?: string;
    enableAutoPend?: boolean;
    sendControl?: boolean;
    currentActivityKey?: string;
    allowActions?: string[];
    reasonDetails?: ReasonDetailVO[];
    assignee?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    businessData?: Record;
    stopSla?: boolean;
    stopTat?: boolean;
    ntuDate?: string;
    readStatus?: boolean;
    activateUser?: string;
    autoSendFlag?: string;
    refreshMainPageFlag?: boolean;
    skipNbValidation?: boolean;
    version?: string;
    submissionChannel?: string;
    externalUrl?: string;
    previewDataId?: string;
    triggerType?: string;
    hasExtraFuncFail?: boolean;
    emailToEM?: string;
    emailCcEM?: string;
    emailBccEM?: string;
    emailTitleEM?: string;
    emailContentEM?: string;
    smsToEM?: string;
    smsContentEM?: string;
    isVisible?: string;
    fromBatchSend?: boolean;
    handledReason?: string;
    isInternal?: number;
    needRefreshPremium?: boolean;
    lastUpdateTime?: string;
    autoExpand?: string;
    enableCorrespondenceHistory?: boolean;
    waivedFromActive?: boolean;
  };

  type ReasonReminderVO = {
    id?: string;
    gmtCreate?: string;
    gmtModified?: string;
    creator?: string;
    reasonGroupId?: string;
    reasonDetailId?: string;
    reminderCode?: string;
    reminderSequence?: number;
    cron?: number;
    noticeLead?: string;
    scheduleSendTime?: string;
    actualSendTime?: string;
    status?: string;
    destRole?: string;
    dest?: string;
    dispatchDate?: string;
    defaultChannel?: string;
    destRoleOpt?: string[];
    channelDataList?: ChannelDataVO[];
    triggerCcm?: boolean;
    cronExpression?: string;
    expressionType?: string;
  };

  type refreshDataParams = {
    caseCategory: string;
    claimNo: string;
  };

  type RelatedCaseVO = {
    caseNo?: string;
    taskId?: string;
    dataType?: string;
    copyData?: string;
    relationship?: string;
    subCaseRelationShipWithCase?: string;
    businessData?: Record;
  };

  type Remark360DO = {
    id?: string;
    content?: string;
    creator?: string;
    createDate?: string;
    effectiveDate?: string;
    expiryDate?: string;
    isDefaultDate?: number;
    caseCategory?: string;
    procActivityKey?: string;
    readStatus?: number;
    linkType?: string;
  };

  type RemoteRequestVO = {
    caseNo?: string;
    reasonGroupId?: string;
    caseCategory?: string;
    activityKey?: string;
    taskId?: string;
    remark?: string;
    userId?: string;
    decision?: string;
    inquiryBusinessNo?: string;
    permissionLimit?: PermissionLimitDefinitionVO[];
  };

  type RemoteServiceCallRecordDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    operationType?: string;
    executeCode?: string;
    executeSequence?: number;
    requestContext?: string;
    applicationName?: string;
    requestMethod?: string;
    requestUrl?: string;
    returnCode?: string;
    requestData?: string;
    responseData?: string;
    errorMsg?: string;
    startTime?: string;
    endTime?: string;
    status?: string;
    retryStatus?: string;
    caseCategory?: string;
    activityKey?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    caseNo?: string;
    taskId?: string;
    retryFlag?: boolean;
    regionCode?: string;
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

  type ResultFieldBO = {
    fieldName?: string;
    sortable?: boolean;
    sequence?: number;
    fieldType?: number;
    fieldCode?: string;
    filter?: boolean;
    businessCode?: string;
    typeCode?: string;
    dictCode?: string;
    dictTypeCode?: string;
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

  type ResultVOBusinessSubmitResultVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: BusinessSubmitResultVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOCaseBusinessVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CaseBusinessVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOCaseCreateResultVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CaseCreateResultVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOCaseDetailList = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CaseDetailList;
    promptMessages?: PromptMessage[];
  };

  type ResultVOChartVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ChartVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOClaimAppealVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ClaimAppealVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOClaimProgressResponseVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ClaimProgressResponseVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOConcurrentHashMapStringLogExtendConfigVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVODate = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: string;
    promptMessages?: PromptMessage[];
  };

  type ResultVOEnvoyInfo = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: EnvoyInfo;
    promptMessages?: PromptMessage[];
  };

  type ResultVOInfoClassification = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: InfoClassification;
    promptMessages?: PromptMessage[];
  };

  type ResultVOInfoReasonType = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: InfoReasonType;
    promptMessages?: PromptMessage[];
  };

  type ResultVOInformationVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: InformationVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOInteger = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: number;
    promptMessages?: PromptMessage[];
  };

  type ResultVOIntegratedPendInfoVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: IntegratedPendInfoVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOListClaimAppealCaseInfoVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ClaimAppealCaseInfoVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListConfigurableNavigatorVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ConfigurableNavigatorVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListExceptionMessage = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ExceptionMessage[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListIndicatorVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: IndicatorVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListInfoReasonType = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: InfoReasonType[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListIntegrationChecklistBO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: IntegrationChecklistBO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListListInformationVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: InformationVO[][];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListModuleConfigVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ModuleConfigVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListNaviExecuteJobInfoVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: NaviExecuteJobInfoVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListNavigatorInformationDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: NavigatorInformationDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListReasonGroupVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ReasonGroupVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListRemark360DO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Remark360DO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListRuleCommonRpcFactInfoVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: RuleCommonRpcFactInfoVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListString = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: string[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListUserProcessDefinitionVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: UserProcessDefinitionVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOLong = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: number;
    promptMessages?: PromptMessage[];
  };

  type ResultVOMapObjectObject = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOMapStringObject = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVONavigatorCaseManagementDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: NavigatorCaseManagementDO;
    promptMessages?: PromptMessage[];
  };

  type ResultVONavigatorInformationDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: NavigatorInformationDO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOObject = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOOcrConversionResponseVOObject = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: OcrConversionResponseVOObject;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPageDropdownResult = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PageDropdownResult;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPageInformationDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PageInformationDO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPageObject = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PageObject;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPageRemoteServiceCallRecordDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PageRemoteServiceCallRecordDO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPageUserInfoVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PageUserInfoVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPieChartVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PieChartVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOReasonGroupVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ReasonGroupVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOReturnTString = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ReturnTString;
    promptMessages?: PromptMessage[];
  };

  type ResultVOSplitCaseSubmitVOObject = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: SplitCaseSubmitVOObject;
    promptMessages?: PromptMessage[];
  };

  type ResultVOString = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: string;
    promptMessages?: PromptMessage[];
  };

  type ResultVOSummaryPageResultVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: SummaryPageResultVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOSummaryPageVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: SummaryPageVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOTaskDataVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: TaskDataVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOTaskDetail = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: TaskDetail;
    promptMessages?: PromptMessage[];
  };

  type ResultVOVoid = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type RetryCaseSubmitVO = {
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    partyId?: string;
    policyNo?: string;
    businessType?: string;
    clientName?: string;
    agentName?: string;
    businessDecision?: string;
    cleanBusinessData?: boolean;
    companyCode?: string;
    businessCode?: string;
    businessTransactionProcess?: BusinessTransactionProcess;
    caseNo?: string;
    submissionDate?: string;
    submissionChannel?: string;
    operator?: string;
    editFlag?: string;
    createLocation?: string;
    applicant?: string;
    operationType?: string;
    parentId?: string;
    taskId?: string;
    activityKey?: string;
    messageJobId?: number;
    assignee?: string;
    autoActivity?: boolean;
    assessmentType?: string;
    activityVariables?: Record;
    businessData?: Record;
    mandatoryDocList?: string[];
    notificationList?: string[];
    checkType?: string;
    businessProcessIdList?: string[];
    informationList?: InformationVO[];
    nextActivityStatus?: string;
    snapshotSync?: boolean;
    touchId?: string;
    hasBeenHoldFlag?: boolean;
    ocrFillData?: boolean;
    retry?: boolean;
    regionCode?: string;
    validateType?: string;
    platformCode?: string;
    holeType?: string;
    reminderJobOperationValue?: string;
    ignoreWarnMsg?: boolean;
    retryIntegrationCodes?: string;
  };

  type ReturnTString = {
    code?: number;
    msg?: string;
    content?: string;
  };

  type RuleCommonRpcFactInfoVO = {
    objClassType?: string;
    objJsonContent?: string;
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

  type SnapshotQueryVO = {
    taskId?: string;
    businessNo?: string;
    dataType?: string;
  };

  type SnapshotVersion = {
    forceUpdateFlag?: string;
    userName?: string;
    versionNo?: number;
  };

  type SnapshotVO = {
    taskId?: string;
    optionType?: string;
    dataType?: string;
    dataValue?: string;
    businessNo?: string;
    version?: SnapshotVersion;
  };

  type SpecialHandlingAppealParam = {
    businessNoList?: string[];
    businessInfoList?: BusinessInfo[];
    skipProposalChange?: boolean;
  };

  type SpecialHandlingParam = {
    applicationNo?: string;
    policyDecision?: string;
    policyPremium?: string;
    triggerPostQC?: string;
    policyIssueDate?: string;
    isWithDraw?: string;
    isNtu?: string;
    caseCategory?: string;
    activityKey?: string;
    taskId?: string;
    inquiryBusinessNo?: string;
    caseNo?: string;
    businessCode?: string;
    decision?: string;
    getDataFromSnapshot?: boolean;
    triggerOmneNotify?: boolean;
    currentActivityKey?: string;
    status?: string;
    systemRemark?: string;
    executeLastActivityBusiness?: boolean;
    sendSms?: string;
    sendLetter?: string;
    releasePolicyPack?: string;
    businessNo?: string;
    declineReason?: string;
    editDeclineReason?: string;
    triggerSmsSend?: boolean;
    triggerEmailSend?: boolean;
    triggerSuitability?: boolean;
    fromPolicyStatusJob?: boolean;
    riskCommencementDate?: string;
  };

  type splitCase1Params = {
    caseNo: string;
  };

  type SplitCaseSubmitVO = {
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    partyId?: string;
    policyNo?: string;
    businessType?: string;
    clientName?: string;
    agentName?: string;
    businessDecision?: string;
    cleanBusinessData?: boolean;
    companyCode?: string;
    businessCode?: string;
    businessTransactionProcess?: BusinessTransactionProcess;
    caseNo?: string;
    submissionDate?: string;
    submissionChannel?: string;
    operator?: string;
    editFlag?: string;
    createLocation?: string;
    applicant?: string;
    operationType?: string;
    parentId?: string;
    taskId?: string;
    activityKey?: string;
    messageJobId?: number;
    assignee?: string;
    autoActivity?: boolean;
    originalCase?: CaseSubmitVOObject;
    newCase?: CaseSubmitVOObject;
    newRemark?: string;
    originalRemark?: string;
  };

  type SplitCaseSubmitVOObject = {
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    partyId?: string;
    policyNo?: string;
    businessType?: string;
    clientName?: string;
    agentName?: string;
    businessDecision?: string;
    cleanBusinessData?: boolean;
    companyCode?: string;
    businessCode?: string;
    businessTransactionProcess?: BusinessTransactionProcess;
    caseNo?: string;
    submissionDate?: string;
    submissionChannel?: string;
    operator?: string;
    editFlag?: string;
    createLocation?: string;
    applicant?: string;
    operationType?: string;
    parentId?: string;
    taskId?: string;
    activityKey?: string;
    messageJobId?: number;
    assignee?: string;
    autoActivity?: boolean;
    originalCase?: CaseSubmitVOObject;
    newCase?: CaseSubmitVOObject;
    newRemark?: string;
    originalRemark?: string;
  };

  type SubmissionDataVO = {
    interfaceId?: string;
    businessCode?: string;
    caseNo?: string;
    caseCategory?: string;
    businessNo?: string;
    condition?: string;
    partyData?: PartyData;
    policyQO?: PolicyQO;
    businessData?: Record;
    docInfos?: DocInfo[];
  };

  type SummaryPageQueryVO = {
    caseCategory?: string;
    activityKey?: string;
    taskId?: string;
    businessNo?: string;
    operationType?: string;
    skipSnapshot?: boolean;
    sectionIds?: string[];
    caseNo?: string;
  };

  type SummaryPageResultVO = {
    businessData?: Record;
  };

  type SummaryPageVO = {
    businessData?: Record;
  };

  type TaskDataVO = {
    taskId?: string;
    processInstanceId?: string;
    processDefId?: string;
    caseCategory?: string;
    taskDefKey?: string;
    activityName?: string;
    assignee?: string;
    taskStatus?: string;
    pageController?: string;
    startTime?: string;
    endTime?: string;
    duration?: number;
    batchNo?: string;
    businessNo?: string;
    insured?: string;
    dueDate?: string;
    urgent?: boolean;
    rejected?: boolean;
    taskOrder?: number;
    caseDueDate?: string;
    submissionDate?: string;
    submissionChannel?: string;
    procActOrder?: number;
    assessmentType?: string;
    submissionId?: string;
    initialDataInherit?: number;
    inheritSource?: number;
    editFlag?: string;
    inquiryBusinessNo?: string;
    createLocation?: string;
    isEditPage?: boolean;
    customerType?: string;
    partyId?: string;
    withdraw?: boolean;
    notWait?: boolean;
    caseStatus?: string;
    businessCode?: string;
    companyCode?: string;
    enableInvestigation?: boolean;
    originalSubmissionDate?: string;
    caseType?: string;
    autoActivity?: number;
    caseNo?: string;
    activityKey?: string;
    activityButtonList?: ActivityButton[];
    businessData?: Record;
    snapshotData?: boolean;
  };

  type TaskDetail = {
    taskId?: string;
    processInstanceId?: string;
    processDefId?: string;
    caseCategory?: string;
    taskDefKey?: string;
    activityName?: string;
    assignee?: string;
    taskStatus?: string;
    pageController?: string;
    startTime?: string;
    endTime?: string;
    duration?: number;
    batchNo?: string;
    businessNo?: string;
    insured?: string;
    dueDate?: string;
    urgent?: boolean;
    rejected?: boolean;
    taskOrder?: number;
    caseDueDate?: string;
    submissionDate?: string;
    submissionChannel?: string;
    procActOrder?: number;
    assessmentType?: string;
    submissionId?: string;
    initialDataInherit?: number;
    inheritSource?: number;
    editFlag?: string;
    inquiryBusinessNo?: string;
    createLocation?: string;
    isEditPage?: boolean;
    customerType?: string;
    partyId?: string;
    withdraw?: boolean;
    notWait?: boolean;
    caseStatus?: string;
    businessCode?: string;
    companyCode?: string;
    enableInvestigation?: boolean;
    originalSubmissionDate?: string;
    caseType?: string;
    autoActivity?: number;
  };

  type TaskInfoVO = {
    taskId?: string;
    processInstanceId?: string;
    snapshotDataList?: SnapshotVO[];
    syncData?: boolean;
  };

  type TaskQueryVO = {
    taskId?: string;
    dataType?: string;
    skipSnapshot?: boolean;
    needTransform?: boolean;
    touchId?: string;
  };

  type TaskStatusSwitchVO = {
    taskId?: string;
    taskStatus?: string;
  };

  type TestObj = {
    applicationName?: string;
    targetUrl?: string;
    params?: Record;
    className?: string;
  };

  type testRabbitMQParams = {
    caseCategory: string;
  };

  type triggerClaimAssessmentWorksheetJobParams = {
    param: string;
  };

  type triggerDownTimeCaseByManualDTO = {
    caseNo?: string;
  };

  type TriggerJobResultVO = {
    resultFlag?: string;
    dependenceType?: string;
    errorMsg?: string;
    batchNo?: string;
  };

  type TriggerProcessCreationVO = {
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    processInstanceId?: string;
    triggerCaseCategory?: string;
    assignee?: string;
    submissionChannel?: string;
    businessData?: Record;
    relationShip?: string;
    variables?: Record;
    operationType?: string;
    waivedDocMandatoryIndicator?: string;
    subRelationShip?: string;
  };

  type UpdateCaseC360PolicyInfo = {
    caseNo?: string;
    policyInsuredList?: PolicyInsured[];
    policyOwnerList?: PolicyOwner[];
  };

  type UpdateConfig = {
    key?: string;
    valueFieldPath?: string;
  };

  type UpdateMemoVO = {
    groupCode?: string;
    caseNo?: string;
    taskId?: string;
    businessNo?: string;
    caseCategory?: string;
    activityKey?: string;
    pendingMemoId?: string;
    status?: string;
    readFlag?: string;
    submitStatus?: string;
    submittedTime?: string;
    operationType?: string;
  };

  type uploadWorksheetParams = {
    caseNo: string;
    fileName: string;
  };

  type UserInfoVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    userId?: string;
    firstName?: string;
    lastName?: string;
    userName?: string;
    gender?: string;
    birthday?: string;
    status?: number;
    employmentDate?: string;
    mailAddress?: string;
    extNo?: string;
    phoneNo?: string;
    title?: string;
    directSupervisor?: string;
    organizationCode?: string;
    organizationName?: string;
    roleNames?: string;
    todoCnt?: number;
    pendingCnt?: number;
    taskId?: string;
    userGroupCode?: string;
    userGroupName?: string;
    userGroupDesc?: string;
    newUserGroupCode?: string;
    newUserGroupName?: string;
    newUserGroupDesc?: string;
  };

  type UserProcessDefinitionVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    processName?: string;
    processDefId?: string;
    caseCategory?: string;
    assignee?: string;
    activityColorList?: UserTask[];
    warning?: boolean;
  };

  type UserTask = {
    taskDefKey?: string;
    color?: string;
  };

  type WorkflowConfirmVO = {
    caseNo?: string;
    businessNo?: string;
    taskId?: string;
    caseCategory?: string;
    activityKey?: string;
    targetActivity?: string;
    autoActivity?: boolean;
    reject?: boolean;
    businessData?: Record;
    activityVariables?: Record;
  };
}
