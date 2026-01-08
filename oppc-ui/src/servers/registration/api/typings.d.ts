declare namespace API {
  type AddressVO = {
    houseRegAddr?: string;
    bizAddr?: string;
    address1?: string;
    address2?: string;
    address3?: string;
    address4?: string;
    address5?: string;
    address6?: string;
    postalCode?: string;
    country?: string;
  };

  type AgentInfo = {
    agentCode?: string;
    agentName?: string;
    agentPhoneNumber?: string;
    agentEmail?: string;
    agentChannelCode?: string;
  };

  type AgentInfoVO = {
    salesChannel?: string;
    subChannel?: string;
    agentCode?: string;
    agentName?: string;
    proportion?: string;
    coAgentCode?: string;
    coAgentName?: string;
    coAgentProportion?: string;
    salesSource?: string;
    servicingBranch?: string;
    coAgentBranch?: string;
  };

  type AnswerVO = {
    optionCode?: string;
    optionText?: string;
    optionTextLocal?: string;
    optionValue?: string;
  };

  type AppointmentDateInfoVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    businessNo?: string;
    applicationId?: string;
    appointmentDate?: string;
    status?: string;
  };

  type AsyncPolicyResultVO = {
    asyncId?: string;
    status?: string;
    errorMsg?: string;
    owbRegVanCaseVO?: OwbRegVanCaseVO;
  };

  type AutoWakeUpRequestVO = {
    wakeUpReason?: string;
    caseCategory?: string;
    businessNo?: string;
    policyNo?: string;
    caseNo?: string;
    businessCode?: string;
    clinicAppointmentInfo?: ClinicAppointmentInfo;
    geteKycResult?: EKycResultInfo;
    docReturn?: DocReturnVO;
    sourceChannel?: string;
    wakeUpSkipFlag?: string;
    resolveFlag?: string;
    mappingKey?: string;
    interfaceId?: string;
    submissionChannel?: string;
    submissionDate?: string;
    rcsApplicable?: string;
    applyToPolicyList?: string[];
    businessType?: string;
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

  type BatchCreateCaseRequestVO = {
    docId?: string;
    keepErrorHandle?: boolean;
  };

  type BatchCreateCaseResponseVO = {
    message?: ExceptionMessage;
    errorMsgMap?: Record;
    success?: boolean;
  };

  type BatchDocScanningDataBO = {
    id?: string;
    operationType?: string;
    regionCode?: string;
    method?: string;
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    caseNo?: string;
    taskId?: string;
    activityKey?: string;
    activityVariables?: Record;
    submissionDate?: string;
    assessmentType?: string;
    businessData?: BatchDocScanSubmissionDataBO;
    informationVOList?: InformationVO[];
    businessCode?: string;
  };

  type BatchDocScanningMainDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    caseNo?: string;
    regionCode?: string;
    businessNo?: string;
    requestDate?: string;
    requestType?: string;
    caseCategory?: string;
    businessCode?: string;
    interfaceId?: string;
  };

  type BatchDocScanSubmissionBatchDataBO = {
    id?: string;
    businessData?: Record;
    docInfos?: DocInfo[];
    caseInfo?: CaseInfo;
    successFlag?: number;
    resultMessage?: string;
  };

  type BatchDocScanSubmissionDataBO = {
    submissionType?: string;
    interfaceId?: string;
    businessCode?: string;
    businessNo?: string;
    submissionBatchDatas?: BatchDocScanSubmissionBatchDataBO[];
  };

  type BatchDocScanSubmissionDataVO = {
    submissionType?: string;
    interfaceId?: string;
    businessCode?: string;
    businessNo?: string;
    submissionBatchDatas?: BatchDocScanSubmissionBatchDataBO[];
  };

  type BeneficiaryVO = {
    beneficiaryRelationship?: string;
    beneficiaryproportion?: string;
    id?: string;
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
    withdraw?: boolean;
    notWait?: boolean;
    appealFlag?: number;
    submissionRequestId?: string;
  };

  type BusinessValidationVO = {
    caseNo?: string;
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    taskId?: string;
    activityKey?: string;
    businessData?: Record;
    bizVariables?: Record;
  };

  type BusinessValidationVOOwbRegVanCaseVO = {
    caseNo?: string;
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    taskId?: string;
    activityKey?: string;
    businessData?: OwbRegVanCaseVO;
    bizVariables?: Record;
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
      origin?: string;
      range?: HttpRange[];
      allow?: HttpMethod[];
      acceptCharset?: string[];
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
      contentDisposition?: ContentDisposition;
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

  type CaseBusinessResultVO = {
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    caseNo?: string;
    taskId?: string;
    activityKey?: string;
    activityVariables?: Record;
    informationList?: Information[];
    operationType?: string;
    businessDecision?: string;
    notificationList?: string[];
    businessData?: Record;
    envoyInfo?: BusinessEnvoyInfoVO;
    businessProcessIdList?: string[];
    operateCondition?: OperateCondition;
  };

  type CaseBusinessVOSrvCaseVO = {
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    caseNo?: string;
    taskId?: string;
    activityKey?: string;
    activityVariables?: Record;
    informationList?: Information[];
    operationType?: string;
    businessDecision?: string;
    businessData?: SrvCaseVO;
  };

  type CaseCancellationVO = {
    taskId?: string;
    activityKey?: string;
    checkType?: string;
    cancelReason?: string;
    reversedReason?: string;
    updateBy?: string;
    businessData?: Record;
    activityVariables?: Record;
    informationList?: InformationVO[];
    caseNo?: string;
    caseCategory?: string;
  };

  type CaseCreateResultVO = {
    caseNo?: string;
    taskId?: string;
    activityKey?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    assignee?: string;
    activityVariables?: Record;
    policyNo?: string;
    businessData?: Record;
    caseCategory?: string;
    operationType?: string;
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
    claimType?: string[];
    caseNo?: string;
    submissionDate?: string;
    submissionChannel?: string;
    operator?: string;
    editFlag?: string;
    createLocation?: string;
    applicant?: string;
    operationType?: string;
    relatedCase?: RelatedCaseVO;
    activityVariables?: Record;
    businessData?: Record;
    answerData?: Record;
    answerDataConverter?: string;
    notificationList?: string[];
    informationList?: InformationVO[];
    integrationSessionId?: string;
    docViewVOList?: DocViewVO[];
    companyCode?: string;
    businessCode?: string;
    callbackControlInfo?: CallbackControlInfoVO;
  };

  type CaseCreationVOMedicalCheckCaseVO = {
    caseNo?: string;
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    submissionDate?: string;
    submissionChannel?: string;
    operator?: string;
    editFlag?: string;
    createLocation?: string;
    policyNo?: string;
    activityVariables?: Record;
    businessData?: MedicalCheckCaseVO;
    informationList?: InformationVO[];
  };

  type CaseCreationVOObject = {
    caseNo?: string;
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    submissionDate?: string;
    submissionChannel?: string;
    operator?: string;
    editFlag?: string;
    createLocation?: string;
    policyNo?: string;
    activityVariables?: Record;
    businessData?: Record;
    informationList?: InformationVO[];
  };

  type CaseCreationVOVanillaCaseVO = {
    caseNo?: string;
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    submissionDate?: string;
    submissionChannel?: string;
    operator?: string;
    editFlag?: string;
    createLocation?: string;
    policyNo?: string;
    activityVariables?: Record;
    businessData?: VanillaCaseVO;
    informationList?: InformationVO[];
  };

  type CaseInfo = {
    requestCaseNo?: string;
    relationShipWithNewCase?: string;
  };

  type CaseInquiryParamVO = {
    businessNo?: string;
  };

  type CaseInquiryResultVOObject = {
    businessData?: Record;
  };

  type CaseSubmitVOBatchDocScanSubmissionDataVO = {
    caseNo?: string;
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    taskId?: string;
    activityKey?: string;
    operationType?: string;
    assessmentType?: string;
    activityVariables?: Record;
    businessData?: BatchDocScanSubmissionDataVO;
    informationList?: InformationVO[];
    customerQuestionnaireList?: CustomerQuestionnaireVO[];
  };

  type CaseSubmitVOFecCaseInfo = {
    caseNo?: string;
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    taskId?: string;
    activityKey?: string;
    operationType?: string;
    assessmentType?: string;
    activityVariables?: Record;
    businessData?: FecCaseInfo;
    informationList?: InformationVO[];
    customerQuestionnaireList?: CustomerQuestionnaireVO[];
  };

  type CaseSubmitVOMedicalCheckCaseVO = {
    caseNo?: string;
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    taskId?: string;
    activityKey?: string;
    operationType?: string;
    assessmentType?: string;
    activityVariables?: Record;
    businessData?: MedicalCheckCaseVO;
    informationList?: InformationVO[];
    customerQuestionnaireList?: CustomerQuestionnaireVO[];
  };

  type CaseSubmitVOOwbRegVanCaseVO = {
    caseNo?: string;
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    taskId?: string;
    activityKey?: string;
    operationType?: string;
    assessmentType?: string;
    activityVariables?: Record;
    businessData?: OwbRegVanCaseVO;
    informationList?: InformationVO[];
    customerQuestionnaireList?: CustomerQuestionnaireVO[];
  };

  type CaseSubmitVOPaperApplicationVO = {
    caseNo?: string;
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    taskId?: string;
    activityKey?: string;
    operationType?: string;
    assessmentType?: string;
    activityVariables?: Record;
    businessData?: PaperApplicationVO;
    informationList?: InformationVO[];
    customerQuestionnaireList?: CustomerQuestionnaireVO[];
  };

  type CaseSubmitVOSubmissionData = {
    caseNo?: string;
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    taskId?: string;
    activityKey?: string;
    operationType?: string;
    assessmentType?: string;
    activityVariables?: Record;
    businessData?: SubmissionData;
    informationList?: InformationVO[];
    customerQuestionnaireList?: CustomerQuestionnaireVO[];
  };

  type CaseSubmitVOUdCaseVO = {
    caseNo?: string;
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    taskId?: string;
    activityKey?: string;
    operationType?: string;
    assessmentType?: string;
    activityVariables?: Record;
    businessData?: UdCaseVO;
    informationList?: InformationVO[];
    customerQuestionnaireList?: CustomerQuestionnaireVO[];
  };

  type CaseSubmitVOVanillaCaseVO = {
    caseNo?: string;
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    taskId?: string;
    activityKey?: string;
    operationType?: string;
    assessmentType?: string;
    activityVariables?: Record;
    businessData?: VanillaCaseVO;
    informationList?: InformationVO[];
    customerQuestionnaireList?: CustomerQuestionnaireVO[];
  };

  type CfgFund = {
    regionCode?: string;
    fundCode?: string;
    fundName?: string;
    fundCurrency?: string;
    usdPayoutInd?: string;
    fundRiskLevel?: string;
    fundType?: string;
    fundStatus?: string;
    companyCode?: string;
    amcFundCode?: string;
  };

  type CfgLogLevelVO = {
    serviceName?: string;
    logName?: string;
    logLevel?: string;
    logExtendName?: string;
    logExtendConfig?: LogExtendConfigVO;
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

  type cleanSubmissionDataLogParams = {
    param: number;
  };

  type ClientInfoBO = {
    ownerName?: string;
    dateOfBirth?: string;
    contactNo?: string;
    email?: string;
    insuredName?: string;
    ownerClientId?: string;
    identityNo?: string;
    identityType?: string;
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
    sourceSystem?: string;
    officeTelNo?: string;
    homeTelNo?: string;
    blackList?: boolean;
    maritalStatus?: string;
    vip?: string;
    specialIndicator?: string;
    additionalField1?: string;
    additionalField2?: string;
    additionalField3?: string;
    additionalDate1?: string;
    additionalDate2?: string;
    additionalDate3?: string;
    authorityCode?: string;
  };

  type ClientInfoVO = {
    clientId?: string;
    smartClientId?: string;
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
    customerRole?: string;
    policyIdList?: string[];
  };

  type ClinicAppointmentInfo = {
    applicationId?: string;
    appointmentDate?: string;
    appointmentDecision?: string;
    clientName?: string;
    medicalItem?: string[];
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

  type ContactVO = {
    mobilePhoneNo?: string;
    homePhoneNo?: string;
    officePhoneNo?: string;
    email?: string;
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

  type CorrespondenceInitialBO = {
    regionCode?: string;
    processInstanceId?: string;
    businessNo?: string;
    taskId?: string;
    relationType?: string;
    caseCategory?: string;
    correspondenceCode?: string;
    correspondenceType?: string;
    reasonDetailVO?: ReasonDetailVO;
    reasonGroupVO?: ReasonGroupVO;
    reasonReminderVO?: ReasonReminderVO;
    businessProcess?: BusinessProcess;
    pendingMemoList?: PendingMemoVO[];
    currentPendingMemoList?: PendingMemoVO[];
    letterDocConfigList?: LetterDocConfigDO[];
    businessData?: Record;
    snapshotBusinessData?: Record;
    variables?: Record;
    correspondenceResult?: Record;
    operationStatus?: string;
    sendCorrespondenceResult?: boolean;
    owbRegVanCaseBO?: OwbRegVanCaseBO;
    channelType?: string;
    letterDateLatestPendMemo?: string;
  };

  type CorrespondenceRecipientBO = {
    recipientType?: string;
    firstName?: string;
    surname?: string;
    identityType?: string;
    identityNo?: string;
    gender?: string;
    phoneNo?: string;
    email?: string;
    address?: string;
    recipientParameters?: Record;
  };

  type CorrespondenceSendBO = {
    processInstanceId?: string;
    businessNo?: string;
    taskId?: string;
    parameterData?: Record;
    templateStr?: string;
    correspondenceType?: string;
    channel?: string;
    correspondenceContent?: string;
    correspondenceRecipient?: CorrespondenceRecipientBO;
    interfaceId?: string;
    templateInfo?: TemplateInfoVO[];
  };

  type createIndexParams = {
    indexKey: string;
  };

  type CrsVO = {
    name?: string;
    lastName?: string;
    tin?: string;
    city?: string;
    countryOfTaxResidency?: string;
    crsDeclareDate?: string;
    nonUsCrsList?: NonUsCrs[];
    nonUsTaxCountry?: string;
    ctf_Place?: string;
    ctfCountryCode?: string;
    nonUsTaxOption?: string;
  };

  type CustomerQuestionnaireVO = {
    clientInfo?: ClientInfoVO;
    questionnaireList?: QuestionnaireVO[];
  };

  type CustomerVO = {
    relationshipOfInsured?: string;
    titleName?: string;
    title?: string;
    name?: string;
    lastName?: string;
    previousName?: string;
    gender?: string;
    dateOfBirth?: string;
    age?: number;
    nationality?: string;
    idCard?: string;
    wholeLifeIdCard?: string;
    countryOfNationality?: string;
    passportNo?: string;
    expiryDate?: string;
    maritalStatus?: string;
    idType?: string;
  };

  type DeliveryMethodVO = {
    fillerPipIndicator?: string;
    geteDocument?: string;
  };

  type DispatchAddrVO = {
    dispatchAddress?: string;
  };

  type DividendIcpVO = {
    dividendIcpPaymentOption?: string;
    bankName?: string;
    accountNumber?: string;
    accountName?: string;
    idCard?: string;
  };

  type DocInfo = {
    indexClass?: string;
    formCategory?: string;
    docTypeCode?: string;
    fileImageId?: string;
    fileImageData?: string;
    fileFullName?: string;
    policyNo?: string;
    insuredId?: string;
    insuredName?: string;
    customNameScope?: string;
    customerSeqNo?: string;
    docDataId?: string;
    personalDocInd?: string;
    clientId?: string;
    fileSourceType?: string;
    fileSourceParam1?: string;
    fileSourceParam2?: string;
    fileSourceParam3?: string;
    beneficiarySepNo?: string;
    receivedDate?: string;
    sourceOfDoc?: string;
  };

  type DocReturnVO = {
    documentTypeCode?: string;
    documentName?: string;
    fileImageId?: string;
    mineType?: string;
    pendMemo?: string;
    docDataId?: string;
    fileSourceType?: string;
    fileSourceParam1?: string;
    fileSourceParam2?: string;
    imageData?: string;
    pendingTransactionId?: string;
    submitDate?: string;
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

  type EKycResultInfo = {
    clientIdType?: string;
    clientIdNo?: string;
    status?: string;
  };

  type EncoderConfig = {
    algorithm?: string;
    secretKey?: string;
  };

  type ExceptionMessage = {
    code?: string;
    args?: string[];
    type?: string;
    metaData?: Record;
  };

  type FatcaVO = {
    fatcaQ1?: string;
    fatcaQ1Condition?: string;
    fatcaQ2?: string;
    greencardNo?: string;
    greencardExpDate?: string;
    fatcaQ3?: string;
    fatcaQ4?: string;
  };

  type FecCaseInfo = {
    proposal?: Record;
    fecInfo?: FecInfo;
  };

  type FecDecision = {
    approvalDecision01?: string;
    approvalDecision02?: string;
  };

  type FecDetail = {
    roleCode?: string;
    laClientId?: string;
    fecItem?: string;
    fecItemDesc?: string;
    fecSequence?: string;
    riskLevel?: string;
    riskMessage?: string;
    riskScore?: string;
    originalScore?: string;
    acceptRisk?: string;
    reason?: string;
  };

  type FecInfo = {
    policyId?: string;
    requestType?: string;
    fecRiskInfo?: FecRiskInfo;
    fecDecision?: FecDecision;
    detailList?: FecDetail[];
    transactionNo?: string;
    fecType?: string;
  };

  type FecRiskInfo = {
    riskLevel?: string;
    totalLevel?: string;
    totalScore?: string;
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

  type FurtherRequirement = {
    referenceCodes?: string;
    caseNo?: string;
    taskId?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    activityKey?: string;
    caseCategory?: string;
    sendOutFlag?: string;
    skipNbValidation?: boolean;
    hospitalCategory?: string;
  };

  type getAllCaseCategoryCompanyMap1Params = {
    caseCreationVO: CaseCreationVO;
  };

  type getCaseRelevantSubmissionBatchInfoParams = {
    caseNo: string;
  };

  type getExistMedicalCaseParams = {
    inquiryBusinessNo: string;
  };

  type getLogConfigCacheParams = {
    logName: string;
  };

  type getMachineConfigParams = {
    configKey: string;
  };

  type getSrvRbacBizInfoParams = {
    businessNo: string;
    taskId?: string;
  };

  type getVanillaCaseInfoByBusinessNoParams = {
    businessNo: string;
  };

  type HealthQuestionPAVO = {
    healthPaQ1?: boolean;
    healthPaQ1TotalSa?: number;
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
    hopCount?: number;
    tunnelType?: 'PLAIN' | 'TUNNELLED';
    layerType?: 'PLAIN' | 'LAYERED';
  };

  type IdentificationBO = {
    clientSeq?: string;
    clientInfoList?: SrvTxIdentificationClientInfoBO[];
  };

  type IgnoreFieldConfig = {
    ignoreFieldKeyList?: string[];
    ignoreType?: string;
    criteria?: QueryConfig[];
  };

  type Information = {
    content?: string;
    category?: string;
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
    reason?: string;
    reasonType?: string;
    informationLinkToList?: InformationLinkToVO[];
    referenceCode?: string;
    integrationCode?: string;
    integrationProcessKey?: string;
  };

  type InquiryParamVO = {
    businessNo?: string;
    inquiryBusinessNo?: string;
    caseCategory?: string;
    caseNo?: string;
  };

  type InquiryResultVO = {
    businessData?: Record;
  };

  type InsuredHQV0 = {
    insuredHealthQ1?: string;
    insuredHealthQ2Height?: number;
    insuredHealthQ2Weight?: number;
    insuredHealthQ3?: boolean;
    insuredWeightChgAmt?: number;
    insuredWeightChgReason?: string;
    insuredHealthQ4?: string;
    insuredHealthQ5?: string;
  };

  type InsuredInfo = {
    isMainInsured?: string;
    insuredId?: string;
    salutation?: string;
    identityType?: string;
    identityNo?: string;
    firstName?: string;
    middleName?: string;
    surname?: string;
    gender?: string;
    phoneNo?: string;
    email?: string;
    dateOfBirth?: string;
  };

  type InsuredMemoChecklistVO = {
    pdpaDoc?: string;
    pdpaConsent?: string;
    noIdcardInsured?: string;
    salsePropDoc?: string;
    signOnApp?: string;
    dataNotMatch?: string;
    beneficiaryNotMatch?: string;
    parents?: string;
    crsform?: string;
    CRSForm?: string;
  };

  type LetterDocConfigDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    letterType?: string;
    productType?: string;
    docTypeCode?: string;
  };

  type LetterInfoBO = {
    claimNumber?: string;
    claimant?: string;
    eventDate?: string;
    address1?: string;
    address2?: string;
    address3?: string;
    address4?: string;
    postCode?: string;
    town?: string;
    state?: string;
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
    charset?: string;
    concrete?: boolean;
    wildcardType?: boolean;
    wildcardSubtype?: boolean;
    subtypeSuffix?: string;
  };

  type MedicalCheckCaseVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    regionCode?: string;
    hospitalCategory?: string;
    policyNo?: string;
    status?: string;
    variables?: Record;
    appointmentDateList?: AppointmentDateInfoVO[];
  };

  type MemoRequestedClientInfoVO = {
    referenceCode?: string;
    requestedClientId?: string;
    requestedClientRole?: string;
  };

  type MessageVO = {
    code?: string;
    content?: string;
    type?: string;
    metaData?: Record;
    application?: string;
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

  type NavigatorSubmissionData = {
    caseNo?: string;
    businessData?: SubmissionData;
  };

  type NbClinetInfo = {
    clientId?: string;
    customerRole?: string;
    customerName?: string;
    customerType?: string;
    customerSeqNo?: string;
    nric?: string;
    otherId?: string;
    identityType?: string;
    identityNo?: string;
    companyRegistrationNumber?: string;
  };

  type NonUsCrs = {
    nonUsTaxCountry?: string;
    nonUsTin?: string;
    noTinReasonCode?: string;
    noTinExplanation?: string;
  };

  type ObjectCompareResult = {
    equalFieldList?: string[];
    failFieldList?: string[];
    lackFieldList?: string[];
    abundantFieldList?: string[];
    existDiff?: boolean;
  };

  type OccupationVO = {
    occupationName?: string;
    occupationClass?: number;
    position?: string;
    jobDescription?: string;
    natureOfBusiness?: string;
    annualIncome?: number;
    otherOccupation?: string;
    otherPosition?: string;
    otherJobDescription?: string;
    otherNatureOfBusiness?: string;
    otherAnnualIncome?: number;
    occupationGroup?: string;
    otherOccupationGroup?: string;
    otherOccupationClass?: number;
  };

  type OmneCallBackRequestVO = {
    caseNo?: string;
    transactionId?: string;
    businessCode?: string;
    updateBOList?: UpdateBOVO[];
  };

  type OperateCondition = {
    ignoreCompleteTask?: boolean;
    createPostQc?: boolean;
    createSnapshot?: boolean;
    updateCase?: boolean;
    deleteSnapshot?: boolean;
  };

  type OptionVO = {
    optionCode?: string;
    optionCategory?: string;
    optionValue?: string;
    optionValueType?: string;
    sequence?: number;
    optionLabel?: string;
    optionLabelLocal?: string;
    format?: string;
    optionSelectionDesc?: string;
    optionSelectionDescLocal?: string;
  };

  type OwbRegVanCaseBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    caseNo?: string;
    vanillaNo?: string;
    caseCategory?: string;
    regionCode?: string;
    transactionTypeCode?: string;
    policyNo?: string;
    businessType?: string;
    submissionDate?: string;
    inquiryVanillaNo?: string;
    operationType?: string;
    policyInfo?: PolicyInfoBO;
    clientInfo?: ClientInfoBO;
    letterInfo?: LetterInfoBO;
    taskInfo?: TaskInfoBO;
    ownerClientId?: string;
    owbRegVanCaseBusinessDataBO?: OwbRegVanCaseBusinessDataBO;
  };

  type OwbRegVanCaseBusinessDataBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    caseNo?: string;
    vanillaNo?: string;
    businessDataStr?: string;
  };

  type OwbRegVanCaseVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    caseNo?: string;
    vanillaNo?: string;
    caseCategory?: string;
    regionCode?: string;
    transactionTypeCode?: string;
    policyNo?: string;
    businessType?: string;
    submissionDate?: string;
    inquiryVanillaNo?: string;
    operationType?: string;
    policyInfo?: PolicyInfoBO;
    clientInfo?: ClientInfoBO;
    letterInfo?: LetterInfoBO;
    taskInfo?: TaskInfoBO;
    ownerClientId?: string;
    owbRegVanCaseBusinessDataBO?: OwbRegVanCaseBusinessDataBO;
  };

  type OwnerHQV0 = {
    ownerHealthQ1?: string;
    ownerHealthQ2Height?: number;
    ownerHealthQ2Weight?: number;
    ownerHealthQ3?: boolean;
    ownerWeightChgAmt?: number;
    ownerWeightChgReason?: string;
    ownerHealthQ4?: string;
    ownerHealthQ5?: string;
  };

  type OwnerInfo = {
    ownerId?: string;
    salutation?: string;
    identityType?: string;
    identityNo?: string;
    firstName?: string;
    middleName?: string;
    surname?: string;
    gender?: string;
    phoneNo?: string;
    email?: string;
    dateOfBirth?: string;
  };

  type PaperApplicationVO = {
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    caseNo?: string;
    taskId?: string;
    activityKey?: string;
    operationType?: string;
    companyCode?: string;
    submissionChannel?: string;
    submissionDate?: string;
    activityVariables?: Record;
    policyNoInfo?: PolicyNoVO;
    agentInfo?: AgentInfoVO;
    beneficiaries?: BeneficiaryVO[];
    deliveryMethod?: DeliveryMethodVO;
    dividendIcp?: DividendIcpVO;
    insuredBizAddr?: AddressVO;
    insuredCrs?: CrsVO;
    insuredContact?: ContactVO;
    insuredCurrentAddr?: AddressVO;
    insuredDispatchAddr?: DispatchAddrVO;
    insuredFatca?: FatcaVO;
    insuredHomeAddr?: AddressVO;
    insuredInfo?: CustomerVO;
    insuredOccupation?: OccupationVO;
    insuredPDPA?: PdpaVO;
    insuredMemoChecklist?: InsuredMemoChecklistVO;
    payorMemoChecklist?: PayorMemoChecklistVO;
    payorBizAddr?: AddressVO;
    payorCrs?: CrsVO;
    payorContact?: ContactVO;
    payorCurrentAddr?: AddressVO;
    payorDispatchAddr?: DispatchAddrVO;
    payorFatca?: FatcaVO;
    payorHomeAddr?: AddressVO;
    payorInfo?: CustomerVO;
    payorOccupation?: OccupationVO;
    payorPDPA?: PdpaVO;
    productInfo?: ProductVO;
    productInfoBasicPlan?: ProductBasicPlanVO;
    productInfoRiders?: ProductRiderVO[];
    taxConsent?: TaxConsentVO;
    uploadDocuments?: UploadDocumentVO;
    insuredHQ?: InsuredHQV0;
    healthQuestionPA?: HealthQuestionPAVO;
    payorHQ?: PayorHQVO;
    ownerBizAddr?: AddressVO;
    ownerCrs?: CrsVO;
    ownerContact?: ContactVO;
    ownerCurrentAddr?: AddressVO;
    ownerDispatchAddr?: DispatchAddrVO;
    ownerFatca?: FatcaVO;
    ownerHomeAddr?: AddressVO;
    ownerInfo?: CustomerVO;
    ownerOccupation?: OccupationVO;
    ownerPDPA?: PdpaVO;
    ownerHQ?: OwnerHQV0;
    ownerFrom?: string;
    taskInfo?: TaskInfoBO;
    manualSubmissionDate?: string;
    customerQuestionnaireList?: CustomerQuestionnaireVO[];
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

  type PayorHQVO = {
    payorHealthQ1?: string;
    payorHealthQ2Height?: number;
    payorHealthQ2Weight?: number;
    payorHealthQ3?: boolean;
    payorWeightChgAmt?: number;
    payorWeightChgReason?: string;
    payorHealthQ4?: string;
  };

  type PayorMemoChecklistVO = {
    noIdcardPayer?: string;
    signOnAppPayer?: string;
    isCorporation?: string;
  };

  type PdpaVO = {
    pdpaConsent1?: string;
    pdpaConsent2?: string;
    pdpaConsentDate?: string;
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
    gmtCreate?: string;
    gmtModified?: string;
    creator?: string;
    subTypeCode?: string;
    memoRemark?: string;
    requestedClientRole?: string;
    requestedClientId?: string;
    memoCategory?: string;
    pendingMemoSubInfoList?: PendingMemoSubInfoVO[];
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

  type PolicyInfo = {
    policyStatus?: string;
    premiumStatus?: string;
    productCode?: string;
    commencementDate?: string;
    expiryDate?: string;
    ulPolicyIndicator?: string;
    sourceSystem?: string;
    internalPolicyId?: string;
    policyId?: string;
    paidToDate?: string;
    paymentFrequency?: string;
    lapseDate?: string;
    uwType?: string;
  };

  type PolicyInfoBO = {
    basePlan?: string;
    riskStatus?: string;
    premiumStatus?: string;
    issueEffectiveDate?: string;
    agentCode?: string;
    agentName?: string;
    agencyName?: string;
    agencyMobileNo?: string;
    agentBranch?: string;
    agentPhone?: string;
    agentEmail?: string;
    policyNo?: string;
    distributionChannel?: string;
  };

  type PolicyNoVO = {
    policyNo?: string;
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

  type PosCustomerClientAddressResponseVO = {
    addressType?: string;
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    addressLine4?: string;
    addressLine5?: string;
    zipCode?: string;
    provinceCode?: string;
    countryCode?: string;
    phoneNo?: string;
    officeNo?: string;
    mobileNo?: string;
    homeNo?: string;
    faxNo?: string;
    email?: string;
  };

  type PosCustomerClientResidencyResponseVO = {
    countryOfTaxResidence?: string;
    dateInSelfCert?: string;
    explanationForNoTin1?: string;
    explanationForNoTin2?: string;
    reasonIfNoTin?: string;
    taxIdNoTin?: string;
  };

  type PosCustomerClientResponseVO = {
    clientNo?: string;
    title?: string;
    firstName?: string;
    surname?: string;
    middleName?: string;
    gender?: string;
    birthDate?: string;
    maritalStatus?: string;
    identityType?: string;
    identityNo?: string;
    addresses?: PosCustomerClientAddressResponseVO[];
    nationality?: string;
    birthPlace?: string;
    occupationCode?: string;
    secondOccupation?: string;
    idExpiryDate?: string;
    directMail?: string;
    mailingInd?: string;
    vip?: string;
    taxIdNo?: string;
    specialIndicator?: string;
    greenCardNo?: string;
    greenCardExpiryDate?: string;
    documentNo?: string;
    language?: string;
    nameFormat?: string;
    soe?: string;
    inceptionDate?: string;
    category?: string;
    taxFlag?: string;
    birthCountry?: string;
    companyDoctor?: string;
    oldIdNumber?: string;
    getdIdTelNo?: string;
    staffFlag?: string;
    acceptanceDate?: string;
    nationality3?: string;
    firstRegisterDate?: string;
    signDate?: string;
    nationality2?: string;
    countryWorkPlace?: string;
    fatcaIndicator?: string;
    provinceWorkPlace?: string;
    taxIdNumber?: string;
    usFatcaPerson?: string;
    provinceWorkPlaceCode?: string;
    additionalField1?: string;
    additionalField2?: string;
    additionalField3?: string;
    additionalDate1?: string;
    additionalDate2?: string;
    additionalDate3?: string;
    deathDate?: string;
    clientStatus?: string;
    servicingBranch?: string;
    addressProof?: string;
    riskIndicator?: string;
    changeReason?: string;
    issueDate?: string;
    issueAuth?: string;
    docNo?: string;
    identityProof?: string;
    incomeProof?: string;
    suspiciousDeclineIndicator?: string;
    suspiciousDeclineReason?: string;
    socialSecurityNumber?: string;
    riskProfileScore?: string;
    riskProfileStartDate?: string;
    vulnerableFlag?: string;
    riskProfileExpiry?: string;
    riskLevel?: string;
    communicationDecision?: string;
    hearingLoss?: string;
    financialInvestment?: string;
    moneyNeed?: string;
    noKnowledgeInsurance?: string;
    noExperienceInv?: string;
    overAge60?: string;
    physicalLoss?: string;
    visualLoss?: string;
    provincesInThailand?: string;
    city?: string;
    taxResidencyList?: PosCustomerClientResidencyResponseVO[];
    sourceSystem?: string;
    clientType?: string;
    clientTypeIndicator?: string;
    taxCountry?: string;
  };

  type ProcessActivityBO = {
    processDefId?: string;
    processActivityKey?: string;
    processActivityName?: string;
    caseCategory?: string;
    processActivityOrder?: number;
    roleCodes?: string[];
    autoAssign?: number;
    autoActivity?: number;
    poolTask?: number;
    initialDataInherit?: number;
    inheritSource?: number;
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

  type ProductBasicPlanVO = {
    baseProductCode?: string;
    coveredPeriod?: string;
    premiumPeriod?: string;
    premiumFrequency?: string;
    sumAssuredBase?: number;
    premiumBasePlan?: string;
    pid?: string;
    productName?: string;
  };

  type ProductRiderVO = {
    riderProductCode?: string;
    sumAssuredRider?: number;
    premiumRider?: number;
    pid?: string;
    productName?: string;
    coverageDuration?: number;
    paymentDuration?: number;
    id?: string;
  };

  type ProductVO = {
    productCategory?: string;
    totalPremium?: number;
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

  type queryLoggerParams = {
    apiTraceId: string;
  };

  type QuestionnaireVO = {
    questionnaireCode?: string;
    regionCode?: string;
    versionId?: string;
    questionnaireLabel?: string;
    questionnaireLabelLocal?: string;
    questionnaireCategory?: string;
    caseCategory?: string;
    activityKey?: string;
    clientType?: string;
    versionUpdateTime?: string;
    isCalculate?: number;
    sequence?: number;
    sourceType?: string;
    submissionDate?: string;
    totalScore?: number;
    fundRiskLevel?: string;
    investorRiskLevel?: string;
    investorType?: string;
    sectionList?: SectionVO[];
    satisfied?: boolean;
    modify?: boolean;
  };

  type QuestionOptionVO = {
    questionCode?: string;
    optionCode?: string;
    referAnswer?: string;
    score?: number;
    triggerSectionCode?: string;
    sequence?: number;
    triggerFurtherText?: string;
    triggerQuestionCodesStr?: string;
    option?: OptionVO;
    triggerQuestionCodes?: string[];
    triggerSectionCodes?: string[];
  };

  type QuestionVO = {
    questionCode?: string;
    questionType?: string;
    text?: string;
    helpText?: string;
    questionTitle?: string;
    subText?: string;
    textLocal?: string;
    questionOptionList?: QuestionOptionVO[];
    answerVOList?: AnswerVO[];
    parentName?: string;
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
    subTaskId?: string;
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
    remark?: string;
    payment?: string;
    dataType?: string;
    attachDocs?: ReasonAttachDocVO[];
    triggerCcm?: boolean;
    syncDestToReminder?: boolean;
    emailAddress?: string;
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
    ccmSyncFlag?: string;
    externalUrl?: string;
    letterCode?: string;
    destId?: string;
    hospRecipientCode?: string;
    hospitalCategory?: string;
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
    businessNo?: string;
    inquiryBusinessNo?: string;
    allowActions?: string[];
    reasonDetails?: ReasonDetailVO[];
    businessData?: Record;
    stopSla?: boolean;
    stopTat?: boolean;
    readStatus?: boolean;
    activateUser?: string;
    autoSendFlag?: string;
    previewDataId?: string;
    emailToEM?: string;
    emailCcEM?: string;
    emailBccEM?: string;
    emailTitleEM?: string;
    emailContentEM?: string;
    smsToEM?: string;
    smsContentEM?: string;
    applicant?: string;
    assignee?: string;
    ntuDate?: string;
    skipNbValidation?: boolean;
    externalUrl?: string;
    sendSuccessfullyFlag?: string;
    triggerType?: string;
    hasExtraFuncFail?: boolean;
    canRetrySendCorrespondence?: boolean;
  };

  type ReasonReminderVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    reasonGroupId?: string;
    reasonDetailId?: string;
    reminderCode?: string;
    reminderSequence?: number;
    cron?: number;
    scheduleSendTime?: string;
    actualSendTime?: string;
    status?: string;
    destRole?: string;
    dest?: string;
    dispatchDate?: string;
    defaultChannel?: string;
    destRoleOpt?: string[];
    triggerCcm?: boolean;
    channelDataList?: ChannelDataVO[];
  };

  type RedisPatternQO = {
    pattern?: string;
    count?: number;
  };

  type RelatedCaseVO = {
    caseNo?: string;
    taskId?: string;
    dataType?: string;
    copyData?: string;
    relationship?: string;
    businessData?: Record;
  };

  type RequestAsyncPolicyVO = {
    asyncId?: string;
  };

  type RequestPolicyVO = {
    policyId?: string;
    caseCategory?: string;
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

  type ResultVOAsyncPolicyResultVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: AsyncPolicyResultVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOBatchCreateCaseResponseVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: BatchCreateCaseResponseVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOCaseBusinessResultVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CaseBusinessResultVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOCaseCreateResultVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CaseCreateResultVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOCaseInquiryResultVOObject = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CaseInquiryResultVOObject;
    promptMessages?: PromptMessage[];
  };

  type ResultVOConcurrentHashMapStringLogExtendConfigVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOFecCaseInfo = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: FecCaseInfo;
    promptMessages?: PromptMessage[];
  };

  type ResultVOInquiryResultVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: InquiryResultVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOListBatchDocScanningMainDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: BatchDocScanningMainDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListCorrespondenceSendBO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CorrespondenceSendBO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListExceptionMessage = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ExceptionMessage[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListNbClinetInfo = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: NbClinetInfo[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListObject = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListSubmissionIdentifyDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: SubmissionIdentifyDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOMapObjectObject = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOMapStringSetObject = {
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

  type ResultVORuleCommonRpcBatchArgVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: RuleCommonRpcBatchArgVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOSrvRbacBizInfo = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: SrvRbacBizInfo;
    promptMessages?: PromptMessage[];
  };

  type ResultVOString = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: string;
    promptMessages?: PromptMessage[];
  };

  type ResultVOSubmissionBatchInfoVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: SubmissionBatchInfoVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOSubmitCaseResultVOObject = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: SubmitCaseResultVOObject;
    promptMessages?: PromptMessage[];
  };

  type ResultVOSubmitCaseResultVOPaperApplicationVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: SubmitCaseResultVOPaperApplicationVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOVanillaCaseDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: VanillaCaseDO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOVariablesControlConfigDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: VariablesControlConfigDO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOVoid = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type RuleCommonRpcArgVO = {
    ruleSetId?: string;
    factInfos?: RuleCommonRpcFactInfoVO[];
    ruleMonitorInfo?: RuleMonitorInfoVO;
  };

  type RuleCommonRpcBatchArgVO = {
    argVOS?: RuleCommonRpcArgVO[];
  };

  type RuleCommonRpcFactInfoVO = {
    objClassType?: string;
    objJsonContent?: string;
  };

  type RuleMonitorInfoVO = {
    startParentSessionId?: string;
    executedRuleNames?: string[];
  };

  type SectionQuestionVO = {
    sectionCode?: string;
    questionCode?: string;
    sequence?: number;
    isMandatory?: number;
    isDisplay?: number;
    question?: QuestionVO;
    questionGroupCode?: string;
  };

  type SectionVO = {
    questionnaireCode?: string;
    sectionCode?: string;
    sectionLabel?: string;
    sequence?: number;
    isDisplay?: number;
    sectionQuestionList?: SectionQuestionVO[];
  };

  type SignatureInfo = {
    indexClass?: string;
    formCategory?: string;
    docTypeCode?: string;
    fileFullName?: string;
    fileImageId?: string;
    customerSeqNo?: string;
    imageData?: string;
  };

  type SrvAmlNameScreeningDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    policyNo?: string;
    srvNo?: string;
    clientId?: string;
    relationship?: string;
    fullName?: string;
    dateOfBirth?: string;
    gender?: string;
    result?: string;
    lastCheckedOn?: string;
    riskLevel?: string;
    riskMessage?: string;
    identityNo?: string;
  };

  type SrvCaseIndicatorBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    operationType?: string;
    indicatorCode?: string;
    indicatorValue?: string;
  };

  type SrvCaseVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    regionCode?: string;
    submissionChannel?: string;
    submissionDate?: string;
    rcsApplicable?: string;
    caseCategory?: string;
    mainPolicyId?: string;
    mainOwnerClientId?: string;
    mainInsuredClientId?: string;
    mainPayorClientId?: string;
    sourceSystem?: string;
    caseNo?: string;
    crsFACTAUpdateFlag?: string;
    inquirySrvNo?: string;
    qaRequired?: string;
    mainCompanyCode?: string;
    ntuFlag?: boolean;
    skipSettlement?: boolean;
    subCaseSubmissionChannel?: string;
    subCaseSubmissionDate?: string;
    externalCaseStatus?: string;
    caseAssessor?: string;
    cftFlag?: boolean;
    preDecision?: string;
    submissionId?: string;
    fatcaInfo?: SrvFatcaInfoBO[];
    transactionTypes?: TxTypeVO[];
    policyInfo?: SrvPolicyVO;
    stpResult?: string;
    stpFlag?: string;
    taskId?: string;
    activityKey?: string;
    integrationLogList?: SrvIntegrationLogBO[];
    srvCaseIndicatorList?: SrvCaseIndicatorBO[];
    cfgFundList?: CfgFund[];
    srvUiSectionEditControlList?: SrvUiSectionEditControlBO[];
    inquiryBusinessNo?: string;
    clientInfoSubmissionList?: SrvClientInfoSubmissionBO[];
    cft?: boolean;
  };

  type SrvClientAddrDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    clientId?: string;
    sourceSystem?: string;
    addressType?: string;
    postCode?: string;
    country?: string;
    city?: string;
    street?: string;
    address1?: string;
    address2?: string;
    address3?: string;
    address4?: string;
    address5?: string;
    mailing?: string;
    directMail?: string;
    despatchAddrFlag?: string;
    policyId?: string;
    srvNo?: string;
  };

  type SrvClientBankAccountDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    clientId?: string;
    currentFrom?: string;
    currentTo?: string;
    bankCode?: string;
    bankAccountNo?: string;
    bankAccountName?: string;
    currencyCode?: string;
    branchCode?: string;
    dateTimestamp?: string;
    typeOfAccount?: string;
    securityCode?: string;
    usage?: string;
    policyId?: string;
    passbookCode?: string;
    passbookNo?: string;
    bankType?: string;
    accountHolder?: string;
    accountType?: string;
    postCode?: string;
    sourceSystem?: string;
    preferPaymentFlow?: string;
    bankAccountId?: string;
    srvNo?: string;
  };

  type SrvClientContactDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    clientId?: string;
    sourceSystem?: string;
    email?: string;
    phoneNo?: string;
    workNo?: string;
    homeNo?: string;
    celphoneNumber?: string;
    countryCodeOfPhoneNo?: string;
    srvNo?: string;
    directMail?: string;
    faxNumber?: string;
    mailing?: string;
  };

  type SrvClientExtraDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    clientId?: string;
    extraType?: string;
    extraCode?: string;
    extraText?: string;
  };

  type SrvClientInfoDO = {
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
    sourceSystem?: string;
    officeTelNo?: string;
    homeTelNo?: string;
    blackList?: boolean;
    maritalStatus?: string;
    vip?: string;
    specialIndicator?: string;
    additionalField1?: string;
    additionalField2?: string;
    additionalField3?: string;
    additionalDate1?: string;
    additionalDate2?: string;
    additionalDate3?: string;
    authorityCode?: string;
    srvNo?: string;
    blacklistFlag?: string;
    dob?: string;
    age?: number;
  };

  type SrvClientInfoSubmissionBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    clientId?: string;
    identityType?: string;
    identityNo?: string;
    firstName?: string;
    middleName?: string;
    surname?: string;
    gender?: string;
    customerSeqNo?: string;
    customerType?: string;
    companyRegistrationNumber?: string;
  };

  type SrvClientSuitabilityProfileDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    clientId?: string;
    srvNo?: string;
    versionCode?: string;
    sourceCode?: string;
    suitabilityDate?: string;
    suitabilityScore?: number;
    customerRiskLevel?: number;
  };

  type SrvFatcaInfoBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    clientId?: string;
    countryCode?: string;
    tin?: string;
    hasTin?: string;
    reasonCode?: string;
    reasonDesc?: string;
    remark?: string;
  };

  type SrvIntegrationLogBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    requestTime?: string;
    taskId?: string;
    integrationCode?: string;
    integrationSessionId?: string;
    status?: string;
    currentLogIndicator?: string;
  };

  type SrvPaymentTrackBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    payoutDate?: string;
    paymentStatus?: string;
    paymentNo?: string;
  };

  type SrvPolicyAddrDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    policyId?: string;
    sourceSystem?: string;
    countryCode?: string;
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    addressLine4?: string;
    addressLine5?: string;
    zipCode?: string;
    email?: string;
    preferredMailingAddress?: string;
    srvNo?: string;
  };

  type SrvPolicyAgentDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    policyId?: string;
    sourceSystem?: string;
    firstName?: string;
    agentAddress01?: string;
    agentAddress02?: string;
    agentAddress03?: string;
    agentAddress04?: string;
    agentAddress05?: string;
    agentZipCode?: string;
    agentCountryCode?: string;
    agentExpiryDate?: string;
    branchCode?: string;
    agencyCode?: string;
    agencyName?: string;
    agentIdNo?: string;
    agentNumber?: string;
    agentStatus?: string;
    agentPhone?: string;
    email?: string;
    agentIdentityType?: string;
    surname?: string;
    middleName?: string;
    title?: string;
  };

  type SrvPolicyClientRoleBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    policyId?: string;
    clientId?: string;
    sourceSystem?: string;
    customerRole?: string;
    srvNo?: string;
  };

  type SrvPolicyContractDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    policyId?: string;
    regionCode?: string;
    contractType?: string;
    riskStatus?: string;
    premiumStatus?: string;
    lastAutoDebitStatus?: string;
    pendingFundTransactionFlag?: string;
    preferPayoutMethod?: string;
    ulPolicyIndicator?: string;
  };

  type SrvPolicyCoverageDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    policyId?: string;
    sourceSystem?: string;
    lifeNumber?: string;
    coverageSeq?: string;
    riderSeq?: string;
    productCode?: string;
    productName?: string;
    terminateDate?: string;
    modePremium?: number;
    sumAssured?: number;
    benefitPlan?: string;
    coverageExclusionList?: SrvPolicyCoverageExclusionDO[];
    coverageLoadingList?: SrvPolicyCoverageLoadingDO[];
    insuredClientId?: string;
    indemnifyPeriod?: number;
    payPeriod?: number;
    basePremium?: number;
    instalmentPremiumWithTax?: number;
    mortalityClass?: string;
  };

  type SrvPolicyCoverageExclusionDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    coverageId?: string;
    code?: string;
    status?: string;
    lifeNo?: string;
    coverageSeq?: string;
    riderSeq?: string;
    remarks?: string;
    orderNo?: number;
  };

  type SrvPolicyCoverageLoadingDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    coverageId?: string;
    code?: string;
    rateAdjust?: string;
    duration?: string;
    flatMortality?: string;
    orderNo?: number;
  };

  type SrvPolicyDespatchAddressDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    clientId?: string;
    policyId?: string;
    preferredMailingAddress?: string;
    sourceSystem?: string;
    dispatchAddress01?: string;
    dispatchAddress02?: string;
    dispatchAddress03?: string;
    dispatchAddress04?: string;
    dispatchAddress05?: string;
    dispatchZipCode?: string;
    residenceTelNo?: string;
    businessOfficeNo?: string;
    mobilePhoneNo?: string;
    emailAddress?: string;
    wholeAddress?: string;
    dispatchAddress01Name?: string;
    dispatchAddress02Name?: string;
    dispatchAddress03Name?: string;
    dispatchAddress04Name?: string;
    dispatchAddress05Name?: string;
    dispatchCountryCode?: string;
  };

  type SrvPolicyFundDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    policyId?: string;
    fundCode?: string;
    fundName?: string;
    currency?: string;
    pricePerUnit?: number;
    unitHolding?: number;
    totalValue?: number;
    coverageSeq?: string;
    lifeNo?: string;
    riderSeq?: string;
    premiumType?: string;
    surrenderChargeRate?: string;
  };

  type SrvPolicyInfoDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    policyId?: string;
    sourceSystem?: string;
    riskStatus?: string;
    premiumStatus?: string;
    issueEffectiveDate?: string;
    billingFrequency?: string;
    lastPaidDate?: string;
    paidToDate?: string;
    totalModePremium?: number;
    paymentMethod?: string;
    salesChannel?: string;
    agentFirstName?: string;
    ownerFullName?: string;
    policyName?: string;
    coverageTerminateDate?: string;
    insuredFullName?: string;
    insuredClientId?: string;
    ownerClientId?: string;
    distributionChannel?: string;
    terminateDate?: string;
    companyCode?: string;
    billingCurrency?: string;
    lastPaymentDate?: string;
    ownerRelationshipWithNominee?: string;
    assigneeRelationshipWithNominee?: string;
    policyCurrency?: string;
    billToDate?: string;
    payorClientId?: string;
    payoutPaymentMethod?: string;
    trusteeIndicator?: string;
    riskCommencementDate?: string;
    premiumPaymentMethod?: string;
    internalPolicyId?: string;
    lapseDate?: string;
    lapseDuration?: number;
    highlightPolicyNote?: string;
    uwType?: string;
    lastAutoDebitStatus?: string;
    pendingFundTransactionFlag?: string;
    irrevocableBeneficiaryFlag?: string;
    assignmentFlag?: string;
  };

  type SrvPolicyInsuredDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    policyId?: string;
    clientId?: string;
    sourceSystem?: string;
    srvNo?: string;
  };

  type SrvPolicyLoanQuotationBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    policyId?: string;
    numberOfLoans?: number;
    effectiveDate?: string;
    surrenderValue?: number;
    currentLoanAmount?: number;
    duePremiumAmount?: number;
    netCv?: number;
    loanAmountAvailable?: number;
    loanAllow?: number;
    loanAmountRequired?: number;
    stampDuty?: number;
    counterpartiesFee?: number;
    netLoadAmountPaid?: number;
  };

  type SrvPolicyOwnerDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    policyId?: string;
    clientId?: string;
    relationshipWithInsured?: string;
    sourceSystem?: string;
    ownerBlacklistFlag?: string;
    srvNo?: string;
  };

  type SrvPolicyPmModeChangeValBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    policyId?: string;
    modeChangeVal01?: string;
    modeChangeVal02?: string;
    modeChangeVal04?: string;
    modeChangeVal12?: string;
    premiumAmt01?: number;
    premiumAmt02?: number;
    premiumAmt04?: number;
    premiumAmt12?: number;
  };

  type SrvPolicySubAccountBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    policyId?: string;
    subAcCode?: string;
    subAcType?: string;
    subAcBalance?: number;
    subAcCurrency?: string;
  };

  type SrvPolicySurrenderChargeRateDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    productCode?: string;
    coverageSeq?: string;
    lifeNo?: string;
    riderSeq?: string;
    feeRate?: number;
    chargeType?: string;
    chargeDesc?: string;
  };

  type SrvPolicySurrenderQuotationBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    policyId?: string;
    srvNo?: string;
    contractType?: string;
    effectiveDate?: string;
    policyCurrency?: string;
    netSurrenderDebit?: number;
    imposedAmount?: number;
    policyLoans?: number;
    refundAmount?: number;
    cashDeposit?: number;
    policyDebitAmount?: number;
    otherAdjustments?: number;
    suspenseBalance?: number;
    totalEstimationValue?: number;
    totalSurrender?: number;
    noOfCoverage?: string;
    requestEffectiveDate?: string;
    coverageList?: SrvPolicySurrenderQuotationCoverageBO[];
  };

  type SrvPolicySurrenderQuotationCoverageBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    policyId?: string;
    coverageSeq?: string;
    lifeNo?: string;
    riderSeq?: string;
    fundCode?: string;
    fundType?: string;
    surrenderType?: string;
    currency?: string;
    estimatedValue?: number;
    actualValue?: number;
  };

  type SrvPolicyTransactionHistoryDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    effectiveDate?: string;
    transactionCode?: string;
    transactionDate?: string;
    transactionStatus?: string;
    completeDate?: string;
    transferType?: string;
    transactionName?: string;
    transBizNo?: string;
    transType?: string;
    reinstatementDate?: string;
    policyId?: string;
    seqNo?: number;
  };

  type SrvPolicyVO = {
    mainPolicyId?: string;
    mainOwnerClientId?: string;
    mainInsuredClientId?: string;
    mainPayorClientId?: string;
    sourceSystem?: string;
    billingChannel?: string;
    mainCompanyCode?: string;
    policyClientRoleList?: SrvPolicyClientRoleBO[];
    policyInfoList?: SrvPolicyInfoDO[];
    policyCoverageList?: SrvPolicyCoverageDO[];
    policyContractList?: SrvPolicyContractDO[];
    policyAgentList?: SrvPolicyAgentDO[];
    policyAddrList?: SrvPolicyAddrDO[];
    policyInsuredList?: SrvPolicyInsuredDO[];
    policyOwnerList?: SrvPolicyOwnerDO[];
    clientContactList?: SrvClientContactDO[];
    clientInfoList?: SrvClientInfoDO[];
    clientAddressList?: SrvClientAddrDO[];
    clientSuitabilityProfileList?: SrvClientSuitabilityProfileDO[];
    clientBankAccountList?: SrvClientBankAccountDO[];
    clientExtraList?: SrvClientExtraDO[];
    policyFundDOList?: SrvPolicyFundDO[];
    applyToPolicyInfoList?: SrvPolicyInfoDO[];
    policyTransactionHistoryList?: SrvPolicyTransactionHistoryDO[];
    srvAmlNameScreeningList?: SrvAmlNameScreeningDO[];
    policySurrenderQuotationList?: SrvPolicySurrenderQuotationBO[];
    policySubAccountList?: SrvPolicySubAccountBO[];
    policyLoanQuotationList?: SrvPolicyLoanQuotationBO[];
    policyDespatchAddressList?: SrvPolicyDespatchAddressDO[];
    policySurrenderChargeRateList?: SrvPolicySurrenderChargeRateDO[];
    policyPaymentModeChangeVal?: SrvPolicyPmModeChangeValBO;
  };

  type SrvRbacBizInfo = {
    transactionType?: string;
    estimatedPartialWithdrawAmount?: number;
    totalRefundAmount?: number;
    currency?: string;
    sourceSystem?: string;
    ulPolicyIndicator?: string;
    decision?: string;
    chequeType?: string;
    companyCode?: string;
    transactionCategory?: string;
  };

  type SrvTransactionProcessBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    processJson?: string;
    caseCategory?: string;
    transactionTypeCode?: string;
    processList?: ProcessActivityBO[];
    slaDuration?: string;
    transactionTypeName?: string;
  };

  type SrvTransactionTypeDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    transactionTypeCode?: string;
    applyTo?: string;
    regionCode?: string;
    caseCategory?: string;
    transactionTypeName?: string;
    slaLevel?: string;
    isUnitLink?: number;
    payment?: string;
    pvCheck?: string;
    financialFlag?: boolean;
    majorFlag?: boolean;
    needUW?: boolean;
    cftFlag?: boolean;
    slaDuration?: string;
    qcCheckPercent?: number;
    clientLevelFlag?: boolean;
    needReview?: number;
    cft?: boolean;
    clientLevel?: boolean;
  };

  type SrvTxIdentificationClientAddressBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    clientSeq?: string;
    ccrClientId?: string;
    clientId?: string;
    sourceSystem?: string;
    customerAddressId?: string;
    addressType?: string;
    countryCode?: string;
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    addressLine4?: string;
    addressLine5?: string;
    zipCode?: string;
  };

  type SrvTxIdentificationClientInfoBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    clientSeq?: string;
    ccrClientId?: string;
    clientId?: string;
    sourceSystem?: string;
    dateOfBirth?: string;
    relationship?: string;
    surname?: string;
    firstName?: string;
    middleName?: string;
    gender?: string;
    identityNo?: string;
    identityType?: string;
    nationality?: string;
    occupation?: string;
    exactDuty?: string;
    nameOfBusinessEmployer?: string;
    natureOfBusiness?: string;
    addressOfBusinessEmployer?: string;
    companyRegistrationNumber?: string;
    email?: string;
    addressList?: SrvTxIdentificationClientAddressBO[];
  };

  type SrvTxIdentificationClientResultBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    clientSeq?: string;
    identificationResult?: string;
    operationResult?: string;
    selectCcrClientId?: string;
    selectClientId?: string;
  };

  type SrvTxMailCertificateCorrespondenceBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    mailType?: string;
    sendTo?: string;
    branchCode?: string;
    docTypeCode?: string;
    subTypeCode?: string;
    docViewVOList?: DocViewVO[];
  };

  type SrvTxPayInDetailBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    receiptNumber?: string;
    transactionStatus?: string;
    receiptType?: string;
    paymentGatewayRefNo?: string;
    transactionId?: string;
    payorNumber?: string;
    paymentRefNo?: string;
    paymentDate?: string;
    paymentMethod?: string;
    paymentAmount?: number;
    currency?: string;
    paymentStatus?: string;
    srvNo?: string;
    txTypeId?: string;
    txPmBankList?: TxPmBankDO[];
    txPmCreditCardList?: TxPmCreditCardDO[];
  };

  type SrvTxPaymentInMethodBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    payinOption?: string;
    txPmCreditCardList?: TxPmCreditCardBO[];
    paymentBankList?: TxPmBankBO[];
  };

  type SrvTxSubChangeCustomerInfoBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    subTypeCode?: string;
    clientSeq?: string;
    clientName?: string;
    surname?: string;
    firstName?: string;
    middleName?: string;
    title?: string;
    maritalStatus?: string;
    clientId?: string;
    posCustomerClientList?: PosCustomerClientResponseVO[];
  };

  type SrvTxSubChangeIcpBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    txTypeId?: string;
    srvNo?: string;
    originalIcpOption?: string;
    icpOption?: string;
    icpEligible?: string;
  };

  type SrvTxSubDeleteRiderBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    riderList?: SrvTxSubDeleteRiderDetailBO[];
  };

  type SrvTxSubDeleteRiderDetailBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    productCode?: string;
    productName?: string;
    insuredId?: string;
  };

  type SrvTxSubDuplicatePolicyBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    txTypeId?: string;
    srvNo?: string;
    regenerateContract?: string;
    sendTo?: string;
    branchCode?: string;
    timesOfReplacement?: number;
    freeOfCharge?: string;
    requestType?: string;
  };

  type SrvTxSubFreelookCancellationBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    subTypeCode?: string;
    cancelReasonCode?: string;
    otherReason?: string;
  };

  type SrvTxSubFundAllocationBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    txTypeId?: string;
    srvNo?: string;
    subTypeCode?: string;
    fundAllocationFundList?: SrvTxSubFundAllocationFundBO[];
  };

  type SrvTxSubFundAllocationFundBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    txTypeId?: string;
    srvNo?: string;
    fundCode?: string;
    fundName?: string;
    riskLevel?: string;
    allocation?: number;
    orderNo?: number;
  };

  type SrvTxSubFundSwitchingBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    txTypeId?: string;
    srvNo?: string;
    switchingOutOption?: string;
    subTypeCode?: string;
    policyId?: string;
    moniesDate?: string;
    fundSwitchingFundList?: SrvTxSubFundSwitchingFundBO[];
  };

  type SrvTxSubFundSwitchingFundBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    txTypeId?: string;
    srvNo?: string;
    subTypeCode?: string;
    policyId?: string;
    applyToFuturePremium?: string;
    fundCode?: string;
    accountValue?: number;
    unitHolding?: number;
    currency?: string;
    unitPrice?: number;
    switchOutAmount?: number;
    switchInAmount?: number;
    switchInPerc?: number;
    switchOutPerc?: number;
    totalSwitchAmt?: number;
    fxRateRiskFlag?: string;
    switchOutCurrency?: string;
    totalSwitchCurrency?: string;
    riskAwareness?: string;
    totalValue?: number;
    allocationPercentage?: number;
    switchOutUnit?: number;
    switchingOutOption?: string;
    moniesDate?: string;
    orderNo?: number;
    switchOutByPercentage?: boolean;
    switchingOutByAmount?: boolean;
    switchingOutFund?: boolean;
    switchOutByUnit?: boolean;
  };

  type SrvTxSubMaturityBoosterBO = {
    eventList?: SrvTxSubMaturityBoosterEventBO[];
    eventHistoryList?: SrvTxSubMaturityBoosterEventHistoryBO[];
  };

  type SrvTxSubMaturityBoosterEventBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    subTypeCode?: string;
    eventCode?: string;
    validity?: string;
    occurrenceDate?: string;
    orderNo?: number;
  };

  type SrvTxSubMaturityBoosterEventHistoryBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    subTypeCode?: string;
    eventCode?: string;
    occurrenceDate?: string;
    orderNo?: number;
  };

  type SrvTxSubPartialWithdrawalBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    txTypeId?: string;
    srvNo?: string;
    subTypeCode?: string;
    payoutOption?: string;
    withdrawalOpt?: string;
    estimatedWithdrawAmt?: number;
    totalAmount?: number;
    totalAccountValue?: number;
    withdrawalLevel?: string;
    requestTotalPerc?: number;
    requestTotalAmount?: number;
    partialWithdrawalReason?: string;
    partialWithdrawalFundList?: SrvTxSubPartialWithdrawalFundBO[];
    partialWithdrawalFundOriginalList?: SrvTxSubPartialWithdrawalFundOriginalBO[];
  };

  type SrvTxSubPartialWithdrawalFundBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    txTypeId?: string;
    srvNo?: string;
    subTypeCode?: string;
    payoutOption?: string;
    fundCode?: string;
    fundName?: string;
    riskLevel?: string;
    fundType?: string;
    accountValue?: number;
    unitHolding?: number;
    currency?: string;
    unitPrice?: number;
    valuationDate?: string;
    withdrawalPct?: number;
    withdrawalAmt?: number;
    withdrawalOpt?: string;
    premiumType?: string;
    withdrawalUnit?: number;
    fundChargeAmt?: number;
    orderNo?: number;
    decimalPlaces?: number;
    withdrawalOut?: boolean;
  };

  type SrvTxSubPartialWithdrawalFundOriginalBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    txTypeId?: string;
    srvNo?: string;
    subTypeCode?: string;
    payoutOption?: string;
    fundCode?: string;
    fundName?: string;
    riskLevel?: string;
    fundType?: string;
    accountValue?: number;
    unitHolding?: number;
    currency?: string;
    unitPrice?: number;
    valuationDate?: string;
    withdrawalPct?: number;
    withdrawalAmt?: number;
    withdrawalOpt?: string;
    premiumType?: string;
    withdrawalUnit?: number;
    fundChargeAmt?: number;
    orderNo?: number;
  };

  type SrvTxSubPolicyLoanBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    txTypeId?: string;
    srvNo?: string;
    subTypeCode?: string;
    fastLoanInd?: string;
    loanRequest?: string;
    loanRequestAmt?: number;
    contractSurrenderAmt?: number;
    loanAllowPerc?: number;
    currentLoanAmt?: number;
    duePremiumAmt?: number;
    loanAvailableAmt?: number;
    loanDutyStamp?: number;
    netLoanAmtPaid?: number;
    quotationDate?: string;
    netCv?: number;
    loanAmountRequired?: number;
    counterpartiesFee?: number;
    payableAmount?: number;
  };

  type SrvTxSubPolicySurrenderBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    txTypeId?: string;
    srvNo?: string;
    subTypeCode?: string;
    addrContactChangeInd?: string;
    cvDate?: string;
    cvAmtBase?: number;
    cvAmtRider?: number;
    proRateRider?: number;
    cashDeposit?: number;
    policyLoan?: number;
    totalSurrenderAmt?: number;
    activityType?: string;
    surrenderReasonCode?: string;
    otherReason?: string;
    dueDateForRetention?: string;
    totalEstimatedValue?: number;
    penalty?: number;
    suspBalanceAmt?: number;
    cashValue?: number;
    policySurrenderCoverageList?: SrvTxSubPolicySurrenderCoverageBO[];
  };

  type SrvTxSubPolicySurrenderCoverageBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    txTypeId?: string;
    srvNo?: string;
    policyId?: string;
    coverageSeq?: string;
    lifeNo?: string;
    riderSeq?: string;
    fundCode?: string;
    fundType?: string;
    surrenderType?: string;
    currency?: string;
    estimatedValue?: number;
    actualValue?: number;
  };

  type SrvTxSubPolicyTaxConsentBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    policyId?: string;
    taxConsentOption?: string;
    orderNo?: number;
  };

  type SrvTxSubRefundAccountDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    subTypeCode?: string;
    srvNo?: string;
    txTypeId?: string;
    subAcBalance?: number;
    policyId?: string;
    subAcCode?: string;
    subAcType?: string;
    subAcCurrency?: string;
    refundAmount?: number;
  };

  type SrvTxSubRefundBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    subTypeCode?: string;
    srvNo?: string;
    txTypeId?: string;
    totalRefundAmount?: number;
    refundAccountList?: SrvTxSubRefundAccountDO[];
  };

  type SrvTxSubReissueChequeBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    txTypeId?: string;
    srvNo?: string;
    chequeTypeCode?: string;
    chequeCancelReasonCode?: string;
    payableAmount?: number;
    currency?: string;
  };

  type SrvTxSubSingleTopupBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    subTypeCode?: string;
    allocateOption?: string;
    totalTopupAmount?: number;
    srvNo?: string;
    txTypeId?: string;
    fundList?: SrvTxSubSingleTopupFundDO[];
  };

  type SrvTxSubSingleTopupFundDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    fundCode?: string;
    topupAmount?: number;
    allocatePct?: number;
    srvNo?: string;
    txTypeId?: string;
  };

  type SrvTxSubSpecimenSignatureChangeBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    subTypeCode?: string;
    srvNo?: string;
    txTypeId?: string;
  };

  type SrvTxSubTaxConsentBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    taxConsentOption?: string;
  };

  type SrvTxUpdateTrackBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    uncompletedReason?: string;
    completedDate?: string;
    paymentNo?: string;
  };

  type SrvTxUsTaxInformationBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    taxDeclarationsFlag?: string;
    cardNo?: string;
    residenceAddress?: string;
    identificationNo?: string;
  };

  type SrvTxUwCoverageBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    policyId?: string;
    mainFlag?: boolean;
    clientId?: string;
    productCode?: string;
    sumAssured?: number;
    indemnifyPeriod?: string;
    indemnifyAgePeriod?: string;
    payPeriod?: string;
    payAgePeriod?: string;
    basePremium?: number;
    loadingPremium?: number;
    instalmentPremiumWithTax?: number;
    lifeNo?: string;
    coverageSeq?: string;
    riderSeq?: string;
    orderNo?: number;
    mortalityClass?: string;
    newAddFlag?: string;
    uwCoverageLoadingList?: SrvTxUwCoverageLoadingBO[];
    uwCoverageExclusionList?: SrvTxUwCoverageExclusionBO[];
    uwCoverageDecision?: SrvTxUwCoverageDecisionBO;
  };

  type SrvTxUwCoverageDecisionBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    coverageId?: string;
    decision?: string;
    decisionValue?: string;
    decisionReason?: string;
  };

  type SrvTxUwCoverageExclusionBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    coverageId?: string;
    code?: string;
    shortName?: string;
    longDescription?: string;
    orderNo?: number;
  };

  type SrvTxUwCoverageLoadingBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    coverageId?: string;
    code?: string;
    pmLoading?: number;
    pmPeriod?: number;
    flatMortality?: number;
    fmPeriod?: number;
    orderNo?: number;
  };

  type SrvTxUwInformationBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    uwDecision?: string;
  };

  type SrvTxUwPolicyBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    policyId?: string;
    campaignCode?: string;
    totalBasePremium?: number;
    totalLoadingPremium?: number;
    totalInstalmentPremiumWithTax?: number;
    uwCoverageList?: SrvTxUwCoverageBO[];
    uwPolicyDecision?: SrvTxUwPolicyDecisionBO;
  };

  type SrvTxUwPolicyDecisionBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    policyId?: string;
    decision?: string;
    decisionValue?: string;
    decisionReason?: string;
  };

  type SrvUiSectionEditControlBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    sectionCode?: string;
    editControlFlag?: string;
  };

  type SubmissionBatchData = {
    submissionBatchNo?: string;
    condition?: string;
    caseNo?: string;
    caseCategory?: string;
    businessNo?: string;
    integrationSessionId?: string;
    partyData?: PartyData;
    policyQO?: PolicyQO;
    businessData?: Record;
    answerData?: Record;
    answerDataConverter?: string;
    docInfos?: DocInfo[];
    signatures?: SignatureInfo[];
    informationList?: InformationDO[];
    caseInfo?: CaseInfo;
    subCaseOperationType?: string;
    successFlag?: number;
    resultMessage?: string;
    wakeUpSkipFlag?: string;
  };

  type SubmissionBatchInfoVO = {
    submissionNo?: string;
    submissionBatchNo?: string;
    submitDate?: string;
    interfaceId?: string;
    businessCode?: string;
    businessData?: Record;
    clientId?: string;
    clientName?: string;
  };

  type SubmissionData = {
    submissionNo?: string;
    submissionType?: string;
    interfaceId?: string;
    businessCode?: string;
    businessNo?: string;
    submissionBatchDatas?: SubmissionBatchData[];
    caseNo?: string;
    taskId?: string;
    caseCategory?: string;
    activityKey?: string;
  };

  type SubmissionFileInfoDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    submissionNo?: string;
    caseNo?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    taskId?: string;
    caseCategory?: string;
    fileType?: string;
    fileData?: string;
  };

  type SubmissionIdentifyDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    interfaceCode?: string;
    businessCode?: string;
    isPartyMandatory?: number;
    isIdentifyBusinessData?: number;
    conditionValue?: string;
    caseCategory?: string;
    applicationName?: string;
    url?: string;
    applicable?: string;
    isDefault?: number;
    companyCode?: string;
  };

  type SubmitCaseResultVOObject = {
    caseNo?: string;
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    taskId?: string;
    activityKey?: string;
    operationType?: string;
    assessmentType?: string;
    activityVariables?: Record;
    businessData?: Record;
    informationList?: InformationVO[];
    policyNo?: string;
    operateCondition?: OperateCondition;
  };

  type SubmitCaseResultVOPaperApplicationVO = {
    caseNo?: string;
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    taskId?: string;
    activityKey?: string;
    operationType?: string;
    assessmentType?: string;
    activityVariables?: Record;
    businessData?: PaperApplicationVO;
    informationList?: InformationVO[];
    policyNo?: string;
    operateCondition?: OperateCondition;
  };

  type TaskInfoBO = {
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    caseNo?: string;
    taskId?: string;
    activityKey?: string;
    activityVariables?: Record;
    informationList?: Information[];
    operationType?: string;
    businessDecision?: string;
    auto?: boolean;
  };

  type TaxConsentVO = {
    taxConsentOption?: string;
    tin?: string;
    taxConsentDate?: string;
  };

  type TemplateInfoVO = {
    templateCode?: string;
    templateParams?: Record;
    docUploadParams?: Record;
    docId?: string;
    templateProcessResult?: Record;
  };

  type TestRequestVO = {
    testData?: string;
    jobId?: string;
  };

  type TxApplyToPolicyBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    policyId?: string;
    sourceSystem?: string;
    policyDecision?: string;
    remark?: string;
  };

  type TxApplyToPolicyOriginalBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    policyId?: string;
    sourceSystem?: string;
    policyDecision?: string;
    remark?: string;
  };

  type TxCheckBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    code?: string;
    value?: string;
    expiryDate?: string;
  };

  type TxClientAddressInfoBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    clientSeq?: string;
    addressType?: string;
    countryCode?: string;
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    addressLine4?: string;
    addressLine5?: string;
    zipCode?: string;
    correspondenceAddress?: string;
    residentialAddress?: string;
  };

  type TxClientContactInfoBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    clientSeq?: string;
    contactType?: string;
    contactNo?: string;
    contactCode?: string;
    contactName?: string;
    contactDisplayName?: string;
  };

  type TxClientInfoBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    ccrClientId?: string;
    clientSeq?: string;
    clientId?: string;
    sourceSystem?: string;
    dateOfBirth?: string;
    relationship?: string;
    otherRelationship?: string;
    surname?: string;
    firstName?: string;
    middleName?: string;
    gender?: string;
    identityNo?: string;
    identityType?: string;
    nationality?: string;
    occupation?: string;
    exactDuty?: string;
    nameOfBusinessEmployer?: string;
    email?: string;
    natureOfBusiness?: string;
    addressOfBusinessEmployer?: string;
    companyRegistrationNumber?: string;
    title?: string;
    maritalStatus?: string;
    addressList?: TxClientAddressInfoBO[];
    roleList?: TxClientRoleBO[];
    contactList?: TxClientContactInfoBO[];
  };

  type TxClientRoleBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    clientSeq?: string;
    customerRole?: string;
    roleSeqNo?: string;
  };

  type TxInvestmentConsultantBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    requester?: string;
    validICInformation?: string;
    investmentConsultantsFullName?: string;
    investmentConsultantsICCode?: string;
    valid?: string;
  };

  type TxPaymentMethodBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    payoutOption?: string;
    setPreferredPayout?: string;
    paymentRefNo?: string;
    instantPayFlag?: string;
    txPmBankList?: TxPmBankBO[];
    txPmPromptPayList?: TxPmPromptPayBO[];
    txPmChequeList?: TxPmChequeBO[];
  };

  type TxPmBankBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    paymentMethodId?: string;
    bankCode?: string;
    bankName?: string;
    branchCode?: string;
    bankBranchName?: string;
    bankAccountNo?: string;
    bankAccountName?: string;
    bankNewAdd?: string;
    bankCurrency?: string;
    sourceBank?: string;
    typeOfAccount?: string;
    securityCode?: string;
    currentFrom?: string;
    currentTo?: string;
    type?: string;
    bankAccessApprovalNo?: string;
    selected?: boolean;
  };

  type TxPmBankDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    paymentMethodId?: string;
    bankCode?: string;
    bankName?: string;
    branchCode?: string;
    bankBranchName?: string;
    bankAccountNo?: string;
    bankAccountName?: string;
    bankNewAdd?: string;
    bankCurrency?: string;
    sourceBank?: string;
    typeOfAccount?: string;
    securityCode?: string;
    currentFrom?: string;
    currentTo?: string;
    type?: string;
    bankAccessApprovalNo?: string;
  };

  type TxPmChequeBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    paymentMethodId?: string;
    type?: string;
    sourceBank?: string;
  };

  type TxPmCreditCardBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    paymentMethodId?: string;
    cardHolderName?: string;
    creditCardNumber?: string;
    expiryDateYear?: string;
    expiryDateMonth?: string;
    creditCardType?: string;
    isPolicyOwner?: string;
    creditBank?: string;
    type?: string;
    bankCode?: string;
  };

  type TxPmCreditCardDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    paymentMethodId?: string;
    cardHolderName?: string;
    creditCardNumber?: string;
    expiryDateYear?: string;
    expiryDateMonth?: string;
    creditCardType?: string;
    isPolicyOwner?: string;
    creditBank?: string;
    type?: string;
    bankCode?: string;
  };

  type TxPmPromptPayBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    paymentMethodId?: string;
    promptPayId?: string;
    type?: string;
  };

  type TxSubBeneficiaryBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    subTypeCode?: string;
    txTypeId?: string;
    clientSeq?: string;
    relationship?: string;
    otherRelationship?: string;
    benefitPercentage?: number;
    surname?: string;
    firstName?: string;
    middleName?: string;
    srvNo?: string;
    beneficiaryType?: string;
  };

  type TxSubContactBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    clientId?: string;
    sourceSystem?: string;
    email?: string;
    phoneNo?: string;
    workNo?: string;
    homeNo?: string;
    celphoneNumber?: string;
    countryCodeOfPhoneNo?: string;
    srvNo?: string;
    txTypeId?: string;
    subTypeCode?: string;
    identityNo?: string;
    identityType?: string;
    applyToDispatchInfo?: string;
    applyToPersonalInfo?: string;
    editFlag?: boolean;
  };

  type TxSubNameChangeBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    subTypeCode?: string;
    policyId?: string;
    clientId?: string;
    sourceSystem?: string;
    ownerId?: string;
    identityType?: string;
    salutation?: string;
    firstName?: string;
    middleName?: string;
    surname?: string;
    reasonForChange?: string;
  };

  type TxSubPaymentModeBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    subTypeCode?: string;
    policyId?: string;
    currentPaymentMode?: string;
    nextPaymentMode?: string;
    nextPremiumAmount?: number;
    currency?: string;
  };

  type TxSubPolicyAddrBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    policyId?: string;
    sourceSystem?: string;
    countryCode?: string;
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    addressLine4?: string;
    addressLine5?: string;
    zipCode?: string;
    email?: string;
    preferredMailingAddress?: string;
    srvNo?: string;
    txTypeId?: string;
    subTypeCode?: string;
    addressType?: string;
    clientId?: string;
    applyToDispatchInfo?: string;
    applyToPersonalInfo?: string;
    editFlag?: boolean;
  };

  type TxSuitabilityBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    txTypeId?: string;
    suitabilityScore?: string;
    suitabilityDate?: string;
    riskToleranceLevel?: string;
    validSuitability?: string;
    editFlag?: boolean;
  };

  type TxTypeVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    srvNo?: string;
    businessProcessId?: string;
    transactionTypeCode?: string;
    applyTo?: string;
    decision?: string;
    remark?: string;
    declineReason?: string;
    editDeclineReason?: string;
    referenceTransactionNo?: string;
    effectiveDate?: string;
    orderNo?: number;
    policyId?: string;
    subTransactionTypeCode?: string;
    crsfatcaFlag?: string;
    transactionTypeLevel?: string;
    needReCalEffective?: string;
    backDateFlag?: string;
    requestDate?: string;
    branchReceivedDate?: string;
    hoReceivedDate?: string;
    chargeFee?: number;
    feeCurrency?: string;
    nameChange?: TxSubNameChangeBO;
    policyAddr?: TxSubPolicyAddrBO;
    contactInfo?: TxSubContactBO;
    paymentMode?: TxSubPaymentModeBO;
    applyToPolicyBOList?: TxApplyToPolicyBO[];
    applyToPolicyOriginalList?: TxApplyToPolicyOriginalBO[];
    beneficiaryList?: TxSubBeneficiaryBO[];
    clientInfoList?: TxClientInfoBO[];
    identificationClientResultList?: SrvTxIdentificationClientResultBO[];
    identificationList?: IdentificationBO[];
    fundSwitching?: SrvTxSubFundSwitchingBO;
    partialWithdrawal?: SrvTxSubPartialWithdrawalBO;
    freelookCancellation?: SrvTxSubFreelookCancellationBO;
    changeCustomerInfoList?: SrvTxSubChangeCustomerInfoBO[];
    duplicatePolicy?: SrvTxSubDuplicatePolicyBO;
    fundAllocation?: SrvTxSubFundAllocationBO;
    policyLoan?: SrvTxSubPolicyLoanBO;
    policySurrender?: SrvTxSubPolicySurrenderBO;
    ownerInfo?: OwnerInfo;
    policyInfo?: PolicyInfo[];
    paymentMethodList?: TxPaymentMethodBO[];
    checkList?: TxCheckBO[];
    suitability?: TxSuitabilityBO;
    investmentConsultant?: TxInvestmentConsultantBO;
    moniesDate?: string;
    srvTransactionType?: SrvTransactionTypeDO;
    uwInformation?: SrvTxUwInformationBO;
    updateTrack?: SrvTxUpdateTrackBO;
    usTaxInformation?: SrvTxUsTaxInformationBO;
    paymentTrack?: SrvPaymentTrackBO;
    transactionProcessList?: SrvTransactionProcessBO[];
    payInDetailList?: SrvTxPayInDetailBO[];
    singleTopup?: SrvTxSubSingleTopupBO;
    refund?: SrvTxSubRefundBO;
    specimenSignatureChange?: SrvTxSubSpecimenSignatureChangeBO;
    uwPolicy?: SrvTxUwPolicyBO;
    paymentInMethodList?: SrvTxPaymentInMethodBO[];
    taxConsent?: SrvTxSubTaxConsentBO;
    taxConsentList?: SrvTxSubPolicyTaxConsentBO[];
    maturityBooster?: SrvTxSubMaturityBoosterBO;
    deleteRider?: SrvTxSubDeleteRiderBO;
    changeIcp?: SrvTxSubChangeIcpBO;
    reissueCheque?: SrvTxSubReissueChequeBO;
    insuredInfoList?: InsuredInfo[];
    agentInfoList?: AgentInfo[];
    mailCertificateCorrespondence?: SrvTxMailCertificateCorrespondenceBO;
    applyToPolicyList?: string[];
  };

  type UdCaseVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    udNo?: string;
    caseNo?: string;
    submissionNo?: string;
    requestType?: string;
    submissionChannel?: string;
    submissionDate?: string;
    submissionTime?: string;
    caseCategory?: string;
    unknownDocList?: UdDocVO[];
    udSelectedCaseList?: UdSelectedCaseVO[];
    udDocCaseRelationList?: UdDocCaseRelationVO[];
    operationType?: string;
  };

  type UdDocCaseRelationVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    udNo?: string;
    relatedCaseNo?: string;
    relatedCaseType?: string;
    udDocId?: string;
    status?: string;
    exceptionMsg?: string;
    originalExceptionMsg?: string;
  };

  type UdDocVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    udNo?: string;
    docId?: string;
    docTypeCode?: string;
    formCategory?: string;
    name?: string;
    image?: string;
    classification?: string;
    policies?: string;
    insuredName?: string;
  };

  type UdSelectedCaseDocBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    udNo?: string;
    selectedCaseNo?: string;
    docId?: string;
    name?: string;
  };

  type UdSelectedCaseVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    udNo?: string;
    selectedCaseNo?: string;
    selectedBusinessNo?: string;
    selectedCaseCategory?: string;
    selectedActivity?: string;
    policyNo?: string;
    clientId?: string;
    insuredName?: string;
    status?: string;
    selectedDocInfoList?: UdSelectedCaseDocBO[];
  };

  type UpdateBOVO = {
    policyId?: string;
    clientId?: string;
    status?: string;
    boName?: string;
    errorMsg?: string;
  };

  type UpdateConfig = {
    key?: string;
    valueFieldPath?: string;
  };

  type UploadDocumentVO = {
    uploadDocOption?: string;
    uploadDocList?: DocViewVO[];
  };

  type VanillaCaseDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    vanillaNo?: string;
    referenceNo?: string;
    caseCategory?: string;
    regionCode?: string;
    requestType?: string;
    policyNo?: string;
    customerName?: string;
    identityNo?: string;
    identityType?: string;
    businessDataStr?: string;
    eclaimSequenceNo?: number;
    insuredName?: string;
    insuredIdentityNo?: string;
    insuredIdentityType?: string;
    businessCode?: string;
  };

  type VanillaCaseVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    vanillaNo?: string;
    referenceNo?: string;
    caseCategory?: string;
    regionCode?: string;
    requestType?: string;
    policyNo?: string;
    customerName?: string;
    identityNo?: string;
    identityType?: string;
    businessDataStr?: string;
    eclaimSequenceNo?: number;
    insuredName?: string;
    insuredIdentityNo?: string;
    insuredIdentityType?: string;
    businessCode?: string;
    variables?: Record;
    businessData?: Record;
    submissionChannel?: string;
    submissionDate?: string;
    operationType?: string;
    caseNo?: string;
  };

  type VariablesControlConfigDO = {
    passPreChecking?: boolean;
    skipDataCapture?: boolean;
    qaRequired?: boolean;
  };
}
