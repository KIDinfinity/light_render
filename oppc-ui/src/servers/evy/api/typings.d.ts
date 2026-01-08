declare namespace API {
  type ActRuTaskVariableVO = {
    taskId?: string;
    procInstId?: string;
    text?: string;
    assignee?: string;
    caseNoTask?: string;
  };

  type appendPendingMemoByReasonGroupId1Params = {
    reasonGroupId: string;
    memoCode: string;
    syncFollowup: boolean;
  };

  type appendPendingMemoByReasonGroupIdParams = {
    reasonGroupId: string;
    memoCode: string;
    syncFollowup: boolean;
  };

  type AttachmentTemplateInfoVO = {
    attachmentTemplateCode?: string;
    docConfigList?: LetterDocConfigDO[];
    editable?: boolean;
  };

  type AutoGenerationParam = {
    caseNo?: string;
    referenceCodes?: string[];
  };

  type AutoWakeUpRequestVO = {
    wakeUpReason?: string;
    caseCategory?: string;
    businessNo?: string;
    policyNo?: string;
    caseNo?: string;
    businessCode?: string;
    interfaceId?: string;
    clinicAppointmentInfo?: ClinicAppointmentInfo;
    geteKycResult?: EKycResultInfo;
    docReturn?: DocReturnVO;
    sourceChannel?: string;
    wakeUpSkipFlag?: string;
    resolveFlag?: string;
    mappingKey?: string;
    businessType?: string;
  };

  type AutoWakeUpResultVO = {
    unknowDocInfo?: UnknowDocInfo;
    udDocCaseRelationBO?: UdDocCaseRelationBO[];
    caseNo?: string;
    inquiryBusinessNo?: string;
    pendingMemoCode?: string;
    reasonGroupId?: string;
    reasonDetailId?: string;
  };

  type BatchAutoWakeUpResultVO = {
    batchRequestId?: string;
    message?: string;
  };

  type BatchRequestVO = {
    batchRequestList?: BusinessRequestVO[];
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
    policyOwnerName?: string;
    firstName?: string;
    lastName?: string;
    businessCode?: string;
    companyCode?: string;
    isMain?: string;
  };

  type BusinessProcessVO = {
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
    policyOwnerName?: string;
    firstName?: string;
    lastName?: string;
    businessCode?: string;
    companyCode?: string;
    isMain?: string;
  };

  type BusinessRequestVO = {
    businessCode?: string;
    batchRequestNo?: string;
    businessData?: AutoWakeUpRequestVO;
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
      range?: HttpRange[];
      origin?: string;
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

  type CaseReasonGroupDTO = {
    currentReasonGroups?: ReasonGroupVO[];
    historyReasonGroups?: ReasonGroupVO[];
  };

  type CaseSubmitVO = {
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
    mandatoryDocList?: string[];
    notificationList?: string[];
    informationList?: InformationVO[];
    partyId?: string;
  };

  type CfgLogLevelVO = {
    serviceName?: string;
    logName?: string;
    logLevel?: string;
    logExtendName?: string;
    logExtendConfig?: LogExtendConfigVO;
  };

  type ChannelData = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    reasonGroupId?: string;
    ownerId?: string;
    ownerType?: number;
    channel?: string;
    content?: string;
    enable?: boolean;
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

  type ChannelTemplateConfigVO = {
    channel?: string;
    enable?: boolean;
    template?: string;
  };

  type checkActiveEnvoy1Params = {
    caseNo: string;
  };

  type checkActiveEnvoyParams = {
    caseNo: string;
  };

  type checkExistActiveExternalReasonGroupByCaseNo1Params = {
    caseNo: string;
  };

  type checkExistActiveExternalReasonGroupByCaseNoParams = {
    caseNo: string;
  };

  type checkExistSentReason1Params = {
    caseNo: string;
    reasonGroupCode: string;
  };

  type checkExistSentReasonParams = {
    caseNo: string;
    reasonGroupCode: string;
  };

  type checkIsTickedDelayLetter1Params = {
    caseNo: string;
    currentGroupId: string;
  };

  type checkIsTickedDelayLetterParams = {
    caseNo: string;
    currentGroupId: string;
  };

  type checkMedMemo1Params = {
    caseNo: string;
  };

  type checkMedMemo2Params = {
    caseNo: string;
  };

  type checkMedMemoParams = {
    caseNo: string;
  };

  type checkReasonDetailSendSuccessfullyFlag1Params = {
    reasonDetailId: string;
  };

  type checkReasonDetailSendSuccessfullyFlagParams = {
    reasonDetailId: string;
  };

  type checkSentReasonByGroupAndCaseParams = {
    caseNoList: string[];
    reasonGroupCodeList: string[];
  };

  type checkSubmittedAndNotReceive1Params = {
    caseNo: string;
  };

  type checkSubmittedAndNotReceiveParams = {
    caseNo: string;
  };

  type ClinicAppointmentInfo = {
    appointmentDate?: string;
    applicationId?: string;
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

  type CopyReasonVO = {
    copyToCaseInfoVO?: CopyToCaseInfoVO;
    reasonGroupVO?: ReasonGroupVO;
    reasonGroupId?: string;
  };

  type CopyToCaseInfoVO = {
    caseNo?: string;
    taskId?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    mainCaseNo?: string;
    caseCategory?: string;
    activityKey?: string;
  };

  type CorrespondenceEventVO = {
    processInstanceId?: string;
    businessNo?: string;
    taskId?: string;
    relationType?: string;
    caseCategory?: string;
    activeKey?: string;
    reasonCode?: string;
    operationType?: string;
    correspondenceCodeList?: string[];
    reasonDetailVO?: ReasonDetailVO;
    reasonGroupVO?: ReasonGroupVO;
    reasonReminderVO?: ReasonReminderVO;
    pendingMemoList?: PendingMemoVO[];
    currentPendingMemoList?: PendingMemoVO[];
    letterDocConfigList?: LetterDocConfigDO[];
    businessProcess?: BusinessProcess;
    newTask?: CustomTaskInfo;
    currentTask?: CustomTaskInfo;
    businessData?: Record;
    snapshotBusinessData?: Record;
    variables?: Record;
    externalUrl?: string;
    updateStatus?: boolean;
    operationStatus?: string;
    triggerType?: string;
    letterDateLatestPendMemo?: string;
    extraFunctionExecution?: boolean;
    premiumIsReceived?: boolean;
    retryCorrespondenceCodeList?: string[];
    correspondenceSendResultList?: CorrespondenceSendResult[];
    failureCorrespondenceCfgList?: CorrespondenceOperationCfgDO[];
    nbPolicyDTO?: NbPolicyDTO;
    ntuTriggerPoint?: string;
    forceReTrigger?: boolean;
    previewData?: ReasonGroupPreviewDataDO;
  };

  type CorrespondenceInitialBO = {
    processInstanceId?: string;
    businessNo?: string;
    taskId?: string;
    relationType?: string;
    caseCategory?: string;
    correspondenceCode?: string;
    correspondenceType?: string;
    correspondenceCategory?: string;
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
    templateId?: string;
    sendCorrespondenceResult?: boolean;
    letterDateLatestPendMemo?: string;
    sendChannel?: string;
    correspondenceTemplateInfo?: CorrespondenceTemplateInfoVO;
    previewData?: ReasonGroupPreviewDataDO;
    triggerType?: string;
  };

  type CorrespondenceOperationCfgDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    correspondenceCode?: string;
    correspondenceType?: string;
    category?: string;
    prepareDataUrl?: string;
    sendUrl?: string;
    sendChannel?: string;
    previewUrl?: string;
    regionCode?: string;
    order?: string;
    templateId?: string;
    failureNotice?: string;
    skipIfNoContact?: string;
  };

  type CorrespondencePreviewVO = {
    region?: string;
    operationType?: string;
    letters?: Record[];
    previewRequestId?: string;
  };

  type CorrespondenceRelationCfgDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    relationType?: string;
    caseCategory?: string;
    activeKey?: string;
    reasonCode?: string;
    operationType?: string;
    correspondenceCode?: string;
    regionCode?: string;
    condition?: string;
  };

  type CorrespondenceResultInfoVO = {
    reasonGroupId?: string;
    functionCode?: string;
    functionName?: string;
    executeStatus?: string;
    correspondenceId?: string;
    templateInfoList?: TemplateResultInfoVO[];
  };

  type CorrespondenceResultVO = {
    resultInfoStatus?: string;
    correspondenceResultInfoList?: CorrespondenceResultInfoVO[];
  };

  type CorrespondenceSendResult = {
    correspondenceCode?: string;
    sendCorrespondenceSuccess?: boolean;
    correspondenceId?: string;
    skip?: boolean;
  };

  type CorrespondenceTemplateInfoVO = {
    correspondenceCode?: string;
    templateCode?: string;
    attachmentTemplateCodes?: string[];
    attachmentTemplateInfoList?: AttachmentTemplateInfoVO[];
    channelType?: string;
    emailSubjectTemplate?: string;
    interfaceId?: string;
    regionCode?: string;
    companyCode?: string;
    inheritPreviewParams?: boolean;
  };

  type createIndexParams = {
    indexKey: string;
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
  };

  type DataPatchRequestVO = {
    inquiryBusinessNoList?: string[];
    reasonGroupCode?: string;
    excludeGroupCodeList?: string[];
    statusList?: string[];
    status?: string;
    batchPolicyCount?: number;
    coreSeqNo?: number;
  };

  type DataPatchResultVO = {
    successInquiryBusinessNoList?: string[];
    failedInquiryBusinessNoList?: string[];
  };

  type deleteReasonGroup1Params = {
    reasonGroupId: string;
  };

  type deleteReasonGroup2Params = {
    reasonGroupId: string;
  };

  type deleteReasonGroupParams = {
    reasonGroupId: string;
  };

  type DictMappingDataVO = {
    regionCode?: string;
    bizCode?: string;
    oldCaseNo?: string;
    oldBusinessNo?: string;
    oldInquiryBusinessNo?: string;
    category?: string;
    oldValue?: string;
    newValue?: string;
    remark?: string;
  };

  type DocChangedItem = {
    documentTypeCode?: string;
    documentName?: string;
    externalDocumentTypeCode?: string;
    identityNo?: string;
    policyOwnerName?: string;
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
    whetherUnique?: boolean;
    mineType?: string;
    pendMemo?: string;
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
    caseNo?: string;
    businessNo?: string;
    caseCategory?: string;
    policies?: string;
    docId?: string;
    docTypeCode?: string;
    receivedDate?: string;
    type?: number;
    voidFlag?: number;
    image?: string;
    classification?: number;
    name?: string;
    policyNo?: string;
    parentBusinessNo?: string;
    formCategory?: string;
    clientId?: string;
    customerType?: string;
    customerRole?: string;
    customerName?: string;
    identityNo?: string;
    identityType?: string;
    docDataId?: string;
    fileSourceType?: string;
    fileSourceParam1?: string;
    fileSourceParam2?: string;
    imageData?: string;
  };

  type DraftEnvoyVO = {
    groupCode?: string;
    caseNo?: string;
    taskId?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    activityKey?: string;
    caseCategory?: string;
    autoSendFlag?: string;
    envoyAutoGenerationCfg?: EnvoyAutoGenerationCfg[];
    existPendingMemoList?: PendingMemoDO[];
    requestedClientInfoList?: MemoRequestedClientInfo[];
    hospitalCategory?: string;
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

  type EnvoyAutoGenerationCfg = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    bizCode?: string;
    referenceCode?: string;
    referenceCodeDesc?: string;
    triggerOnActivity?: string;
    reasonGroupCode?: string;
    autoSendOutFlag?: string;
    pendingMemoCode?: string;
    autoResolveFlag?: string;
    companyCode?: string;
    activityKey?: string;
    autoSendOut?: boolean;
  };

  type EnvoyBatchSendConfigDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    reasonGroupCode?: string;
    regionCode?: string;
    caseCategory?: string;
    enableBatchSend?: boolean;
  };

  type EnvoyRequestVO = {
    referenceCodes?: string;
    caseNo?: string;
    taskId?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    activityKey?: string;
    caseCategory?: string;
    businessData?: Record;
    requestedClientInfos?: MemoRequestedClientInfo[];
    sendOutFlag?: boolean;
    skipNbValidation?: boolean;
    operationType?: string;
    variables?: Record;
    ntuTriggerPoint?: string;
    extraPremiumStatus?: string;
    source?: string;
    forceCreate?: boolean;
    overwriteMemoDesc?: string;
  };

  type ExceptionMessage = {
    code?: string;
    args?: string[];
    type?: string;
    metaData?: Record;
  };

  type existSentReasonByBusinessNo1Params = {
    businessNo: string;
    reasonGroupCode: string;
  };

  type existSentReasonByBusinessNoParams = {
    businessNo: string;
    reasonGroupCode: string;
  };

  type existUnreadReasonGroupParams = {
    caseNo: string;
    activityKey: string;
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

  type findActiveAndDraftReasonGroupByCaseNoAndReasonGroupCode1Params = {
    caseNo: string;
    reasonGroupCode: string;
  };

  type findActiveAndDraftReasonGroupByCaseNoAndReasonGroupCodeParams = {
    caseNo: string;
    reasonGroupCode: string;
  };

  type findActiveMemoDescByReasonGroupId1Params = {
    reasonGroupId: string;
  };

  type findActiveMemoDescByReasonGroupIdParams = {
    reasonGroupId: string;
  };

  type findActiveReasonGroupByCaseNo1Params = {
    caseNo: string;
  };

  type findActiveReasonGroupByCaseNoParams = {
    caseNo: string;
  };

  type findActiveReasonGroupByInquiryBusinessNo1Params = {
    inquiryBusinessNo: string;
  };

  type findActiveReasonGroupByInquiryBusinessNoParams = {
    inquiryBusinessNo: string;
  };

  type findActiveReasonGroupCodes1Params = {
    caseNo: string;
  };

  type findActiveReasonGroupCodesByBusinessNo1Params = {
    businessNo: string;
  };

  type findActiveReasonGroupCodesByBusinessNoParams = {
    businessNo: string;
  };

  type findActiveReasonGroupCodesByBusinessNoV21Params = {
    businessNo: string;
  };

  type findActiveReasonGroupCodesByBusinessNoV2Params = {
    businessNo: string;
  };

  type findActiveReasonGroupCodesParams = {
    caseNo: string;
  };

  type findAllReasonGroupByCaseNo1Params = {
    businessNo: string;
  };

  type findAllReasonGroupByCaseNoParams = {
    businessNo: string;
  };

  type findApplicationNoByPendingMemo1Params = {
    applicationNo: string;
  };

  type findApplicationNoByPendingMemoParams = {
    applicationNo: string;
  };

  type findByCodeParams = {
    reminderCode: string;
  };

  type findCorrespondenceRelationByCaseCategory1Params = {
    correspondenceCode: string;
    caseCategory: string;
  };

  type findCorrespondenceRelationByCaseCategoryParams = {
    correspondenceCode: string;
    caseCategory: string;
  };

  type findDocTypeCodeByMemoCode1Params = {
    reasonCode: string;
    memoCode: string;
  };

  type findDocTypeCodeByMemoCodeParams = {
    reasonCode: string;
    memoCode: string;
  };

  type findEarliestExternalPending1Params = {
    businessNo: string;
  };

  type findEarliestExternalPendingParams = {
    businessNo: string;
  };

  type findExternalEndReasonInfoList1Params = {
    businessNo: string;
  };

  type findExternalEndReasonInfoListParams = {
    businessNo: string;
  };

  type findExtraFunctionsByGroupId1Params = {
    regionCode: string;
  };

  type findExtraFunctionsByGroupIdParams = {
    reasonGroupId: string;
    reasonExecuteType: string;
  };

  type findHighestRankingActiveReasonType1Params = {
    caseNo: string;
  };

  type findHighestRankingActiveReasonTypeParams = {
    caseNo: string;
  };

  type findLatestExternalPending1Params = {
    businessNo: string;
  };

  type findLatestExternalPendingParams = {
    businessNo: string;
  };

  type findMemoByInquiryBusinessNo1Params = {
    inquiryBusinessNo: string;
    reasonGroupCodeList: string[];
  };

  type findMemoByInquiryBusinessNoParams = {
    inquiryBusinessNo: string;
    reasonGroupCodeList: string[];
  };

  type findPendingListByBusinessNo1Params = {
    businessNo: string;
  };

  type findPendingListByBusinessNoParams = {
    businessNo: string;
  };

  type findReasonDetailListByCaseNo1Params = {
    caseNo: string;
  };

  type findReasonDetailListByCaseNoParams = {
    caseNo: string;
  };

  type findReasonGroupList1Params = {
    applicationNo: string;
  };

  type findReasonGroupListParams = {
    applicationNo: string;
  };

  type findReasonInfo2Params = {
    caseNo: string;
    currentActivityKey?: string;
  };

  type findReasonInfo3Params = {
    caseNo: string;
    currentActivityKey?: string;
  };

  type findReasonInfo4Params = {
    caseNo: string;
    activityKey: string;
  };

  type findReceivedPendingByBusinessNo1Params = {
    businessNo: string;
  };

  type findReceivedPendingByBusinessNoParams = {
    businessNo: string;
  };

  type findReGroupCodeByReasonGroupId1Params = {
    reasonGroupId: string;
  };

  type findReGroupCodeByReasonGroupIdParams = {
    reasonGroupId: string;
  };

  type FurtherRequirement = {
    referenceCodes?: string;
    caseNo?: string;
    taskId?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    activityKey?: string;
    caseCategory?: string;
    requestedClientInfos?: MemoRequestedClientInfo[];
    sendOutFlag?: string;
    skipNbValidation?: boolean;
    hospitalCategory?: string;
  };

  type GetAttachmentInfoListRequest = {
    correspondenceCode?: string;
    businessData?: Record;
  };

  type getAutoAppendEnvoy1Params = {
    caseNo: string;
    reasonGroupCode: string;
  };

  type getAutoAppendEnvoyId1Params = {
    caseNo: string;
    reasonGroupCode: string;
  };

  type getAutoAppendEnvoyIdParams = {
    caseNo: string;
    reasonGroupCode: string;
  };

  type getAutoAppendEnvoyParams = {
    caseNo: string;
    reasonGroupCode: string;
  };

  type getByCaseNoAndReasonGroupCode1Params = {
    caseNo: string;
    reasonGroupCode: string;
  };

  type getByCaseNoAndReasonGroupCodeParams = {
    caseNo: string;
    reasonGroupCode: string;
  };

  type getClassNameByReasonCodeAndRegionCode1Params = {
    reasonCode: string;
    regionCode: string;
  };

  type getClassNameByReasonCodeAndRegionCodeParams = {
    reasonCode: string;
    regionCode: string;
  };

  type getEmailAddressBySubCaseNo1Params = {
    subCaseNo: string;
  };

  type getEmailAddressBySubCaseNoParams = {
    subCaseNo: string;
  };

  type getEnvoyDomainByBusinessNo10Params = {
    domain: string;
    claimNo: string;
  };

  type getEnvoyDomainByBusinessNo11Params = {
    domain: string;
    claimNo: string;
  };

  type getEnvoyDomainByBusinessNo12Params = {
    domain: string;
    claimNo: string;
  };

  type getEnvoyDomainByBusinessNo2Params = {
    domain: string;
    claimNo: string;
  };

  type getEnvoyDomainByBusinessNo3Params = {
    domain: string;
    claimNo: string;
  };

  type getEnvoyDomainByBusinessNo4Params = {
    domain: string;
    claimNo: string;
  };

  type getEnvoyDomainByBusinessNo5Params = {
    domain: string;
    claimNo: string;
  };

  type getEnvoyDomainByBusinessNo7Params = {
    domain: string;
    claimNo: string;
  };

  type getEnvoyDomainByBusinessNo9Params = {
    domain: string;
    claimNo: string;
  };

  type getEnvoyDomainByBusinessNoParams = {
    domain: string;
    claimNo: string;
  };

  type getFirstPendingDateByCaseNo1Params = {
    caseNo: string;
  };

  type getFirstPendingDateByCaseNoParams = {
    caseNo: string;
  };

  type getLoadingRemarkList1Params = {
    reasonGroupId: string;
  };

  type getLoadingRemarkListParams = {
    reasonGroupId: string;
  };

  type getLogConfigCacheParams = {
    logName: string;
  };

  type getMachineConfigParams = {
    configKey: string;
  };

  type getNtuLastReceiverEmail1Params = {
    caseNo: string;
  };

  type getNtuLastReceiverEmailParams = {
    caseNo: string;
  };

  type getNtuReasonCodeParams = {
    caseNo: string;
    reasonGroupCode: string;
  };

  type getPendingMemoDate1Params = {
    claimNo: string;
  };

  type getPendingMemoDateParams = {
    claimNo: string;
  };

  type getPendingMemoDesc1Params = {
    claimNo: string;
  };

  type getPendingMemoDescParams = {
    claimNo: string;
  };

  type getReasonDetailBySubCaseNo1Params = {
    subCaseNo: string;
  };

  type getReasonDetailBySubCaseNoParams = {
    subCaseNo: string;
  };

  type getReasonDetailByTriggerCaseNo1Params = {
    triggerCaseNo: string;
  };

  type getReasonDetailByTriggerCaseNoParams = {
    triggerCaseNo: string;
  };

  type getReasonGroupBySubCaseNo1Params = {
    subCaseNo: string;
  };

  type getReasonGroupBySubCaseNoParams = {
    subCaseNo: string;
  };

  type getSpecialNtuDate1Params = {
    letterDate: number;
    addDays: number;
    reasonCode?: string;
  };

  type getSpecialNtuDateParams = {
    letterDate: number;
    addDays: number;
    reasonCode?: string;
  };

  type HkClaimPending = {
    penClaimNo?: number;
    penClaimOccur?: number;
    penPendingSeq?: number;
    penPendingDate?: string;
    penPendingCode?: string;
    penPendingDesc?: string;
    penPendingStatus?: string;
    penResolvedDate?: string;
    penResolvedCode?: string;
    penResolvedDesc?: string;
    penCreateDate?: string;
    penCreateBy?: string;
    penLastChgDate?: string;
    penLastChgBy?: string;
    penMemoDate?: string;
    penFirstRemDate?: string;
    penFinalRemDate?: string;
    penMemoSent?: boolean;
    penFirstRemSent?: boolean;
    penFinalRemSent?: boolean;
    penMemoTocuse?: boolean;
    penMemoTocusp?: boolean;
    caseNo?: string;
    taskId?: string;
    caseCategory?: string;
    activityKey?: string;
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
    category?: string;
    processInstanceId?: string;
    procActivityKey?: string;
    effectiveDate?: string;
    expiryDate?: string;
    content?: string;
    requestType?: string;
    status?: string;
    defaultDate?: boolean;
    author?: string;
    taskId?: string;
    readStatus?: number;
    caseCategory?: string;
    reason?: string;
    reasonType?: string;
    itemCode?: string;
    informationLinkToList?: InformationLinkToVO[];
    referenceCode?: string;
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
    docSource?: string;
    companyCode?: string;
    docName?: string;
  };

  type listActiveGroupMemosByCaseNo1Params = {
    caseNo: string;
  };

  type listActiveGroupMemosByCaseNoParams = {
    caseNo: string;
  };

  type listCaseReasonConfigsParams = {
    caseCategory: string;
  };

  type listCaseReasonGroupConfigsParams = {
    reasonGroupCode: string;
  };

  type listConfigsParams = {
    caseCategory: string;
    activityKey: string;
  };

  type listEnvoyBatchSendConfigParams = {
    caseCategory: string;
  };

  type listMemosParams = {
    reasonCode: string;
    caseCategory: string;
  };

  type listReasonGroupByReasonCodeAndDateRange1Params = {
    groupCode: string;
    dateRange: string;
  };

  type listReasonGroupByReasonCodeAndDateRangeParams = {
    groupCode: string;
    dateRange: string;
  };

  type listReasonGroupByReasonCodeAndLimitDate1Params = {
    groupCode: string;
    limitDate: string;
  };

  type listReasonGroupByReasonCodeAndLimitDateParams = {
    groupCode: string;
    limitDate: string;
  };

  type listReasonGroupByReminderCodeAndDateRange1Params = {
    reminderCode: string;
    dateRange: string;
  };

  type listReasonGroupByReminderCodeAndDateRangeParams = {
    reminderCode: string;
    dateRange: string;
  };

  type listSentMemosByCaseNo1Params = {
    caseNo: string;
  };

  type listSentMemosByCaseNoParams = {
    caseNo: string;
  };

  type listSentMemosByInquiryBusinessNo1Params = {
    inquiryBusinessNo: string;
  };

  type listSentMemosByInquiryBusinessNoParams = {
    inquiryBusinessNo: string;
  };

  type listUnWaiveReasonInfo1Params = {
    caseNo: string;
  };

  type listUnWaiveReasonInfoParams = {
    caseNo: string;
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

  type lsLetterDocCfgParams = {
    productType?: string;
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

  type markReasonGroupReadParams = {
    caseNo: string;
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

  type MemoClientRequest = {
    businessNo?: string;
    requestedClientRole?: string;
    businessCode?: string;
    caseCategory?: string;
    caseNo?: string;
    taskId?: string;
    groupCodeList?: string[];
    groupStatusList?: string[];
    memoStatusList?: string[];
  };

  type MemoConfigRequest = {
    bizCode?: string;
    reasonGroupCode?: string;
    memoCode?: string;
    caseCategory?: string;
    activityKey?: string;
    taskId?: string;
    companyCode?: string;
  };

  type MemoRequestedClientInfo = {
    referenceCode?: string;
    requestedClientId?: string;
    requestedClientRole?: string;
    subTypeCodeList?: string[];
  };

  type MemoRequestedClientInfoDTO = {
    businessNo?: string;
    requestedClientId?: string;
    requestedClientRole?: string;
    requestedClientName?: string;
  };

  type MemoSubInfoRequest = {
    memoSubTypeCodeList?: string[];
    memoCode?: string;
    reasonCode?: string;
  };

  type MemoSubTypeDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    memoCode?: string;
    memoSubTypeCode?: string;
    memoSubTypeDesc?: string;
    sequenceNo?: number;
  };

  type MessageVO = {
    code?: string;
    content?: string;
    type?: string;
    metaData?: Record;
    application?: string;
  };

  type MigrationDataKey = {
    oldCaseNo?: string;
    oldBusinessNo?: string;
    oldInquiryBusinessNo?: string;
    regionCode?: string;
    bizCode?: string;
  };

  type MigrationEnvoyData = {
    oldCaseData?: TaskDetail;
    newCaseData?: TaskDetail;
    envoyInfo?: CaseReasonGroupDTO;
    dataMappingList?: DictMappingDataVO[];
    key?: MigrationDataKey;
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

  type NbPolicyCoverageDTO = {
    applicationNo?: string;
    policyId?: string;
    coverageNum?: string;
    isMain?: string;
    embedFlag?: string;
    planCategory?: string;
    productCode?: string;
    productName?: string;
    coreCode?: string;
    timeRiskMark?: string;
    isBack?: string;
    isExemptions?: string;
    isExempt?: string;
    indemnifyPeriod?: string;
    indemnifyPeriodUnit?: string;
    payPeriod?: string;
    payPeriodUnit?: string;
    sumAssured?: number;
    unit?: number;
    premiumMode?: string;
    basePremium?: number;
    loadingPremium?: number;
    loadedPremium?: number;
    discount?: number;
    grossPremium?: number;
    tax?: string;
    taxAmount?: number;
    rspPremiumTerm?: string;
    instalmentPremiumWithTax?: number;
    riskType?: string;
    priority?: string;
    compareSeq?: string;
    annualPrem?: number;
    monthlyPrem?: number;
    quarterlyPrem?: number;
    semiAnnualPrem?: number;
    annualizedPrem?: number;
    underwritingType?: string;
    packageId?: string;
    packageCode?: string;
    planBusinessCode?: string;
    planName?: string;
    laCategory?: string;
    backDay?: number;
    pbCodes?: string;
    matureDate?: string;
    occupationType?: string;
    occupationRate?: string;
    rsp?: string;
    rspCharge?: string;
    unionInsuredSeqNum?: string;
    benefitSubType?: string;
    pid?: string;
    productType?: string;
    productLine?: string;
    upToAge?: string;
    lifeNo?: string;
    jointLifeNo?: string;
    coverageNo?: string;
    riderNo?: string;
    payerIndicator?: string;
    embedIndicator?: string;
    premiumTermType?: string;
    componentDescriptionEn?: string;
    componentDescriptionLocal?: string;
    hospitalPlanCode?: string;
    discountRate?: number;
    discountType?: string;
    customerSegment?: string;
    sinceCertificateYear?: number;
    stampDuty?: number;
    initialPrem?: number;
    indemnifyAgePeriod?: string;
    payAgePeriod?: string;
    systemAutoAddInd?: string;
    laPremium?: number;
    planMedexSmre?: string;
    saWaiver?: number;
    notManualRemove?: string;
    occupationLoading?: number;
    calculateBy?: string;
    originalCoi?: number;
    finalCoi?: number;
    extraCoi?: number;
    withdrawalTerm?: string;
    annuityTerm?: string;
    retirementTerm?: string;
    guaranteedMonthlyPayout?: number;
    sumAssuredWaive?: number;
    loadingPremiumWaive?: number;
    instalmentPremiumWithTaxWaive?: number;
    hasLoading?: string;
    returnOfPremium?: number;
    originalInstalmentPremiumWithTax?: number;
    originalGrossPremium?: number;
    originalBasePremium?: number;
    originalInitialPrem?: number;
    originalAnnualPrem?: number;
    originalLaPremium?: number;
    originalAnnualizedPrem?: number;
    originalSumAssured?: number;
    originalDiscount?: number;
    originalSaWaiver?: number;
    originalLoadingPremium?: number;
    sumAssuredMultiplier?: number;
    dividendPaymentMethod?: string;
    dividendPaymentOption?: string;
    icpPaymentMethod?: string;
    icpPaymentOption?: string;
    permDiscountType?: string;
    isTempDiscount?: string;
    baseProduct?: boolean;
  };

  type NbPolicyDTO = {
    applicationNo?: string;
    policyId?: string;
    policyReplacementFlag?: string;
    policyPlanName?: string;
    policyPlanType?: string;
    policyStatus?: string;
    laPolicyStatus?: string;
    relevanceCode?: string;
    policySource?: string;
    policyBenefitDrawMode?: string;
    policySurvivalDrawMode?: string;
    policyCashDividendDrawMode?: string;
    annualPrem?: number;
    policyBasePremium?: number;
    policyLoadingPremium?: number;
    policyGrossPremium?: number;
    policyTaxAmount?: number;
    policyInstalmentPremiumWithTax?: number;
    reasonForPaying?: string;
    sourceFund?: string;
    sourceFundOtherReason?: string;
    paidAccount?: string;
    paidAmount?: number;
    expireConfirm?: string;
    effectiveDate?: string;
    policyBackable?: string;
    isBack?: string;
    backDate?: string;
    isExempt?: string;
    medicalCode?: string;
    isLegalBeneficiary?: string;
    beneficialOwnerFlag?: string;
    pepCustomerSeqNo?: string;
    beneficialOwnerSeqNo?: string;
    currencyCode?: string;
    policyPayMode?: string;
    payType?: string;
    policyInitialPremium?: number;
    campaignCode?: string;
    syncSuccessfully?: number;
    renewalPayType?: string;
    discountedPrem?: number;
    ntuDate?: string;
    totalPremWithTax?: number;
    collectionStatus?: string;
    createReceiptStatus?: string;
    premiumMatch?: string;
    toleranceAmount?: number;
    premiumDue?: number;
    premiumReceived?: number;
    adjustPremium?: number;
    receiptNo?: string;
    annualizedPrem?: number;
    refundDate?: string;
    gsIndicator?: string;
    settlementReason?: string;
    keepOverpaidPremium?: string;
    paymentOption?: string;
    quotationRefNo?: string;
    riskCommencementDate?: string;
    reminderType?: string;
    replaceInforce?: string;
    paidByPolicyLoan?: string;
    updateXmlSurpressFlag?: string;
    monthlyPrem?: number;
    quarterlyPrem?: number;
    semiAnnualPrem?: number;
    manualExtendNtu?: boolean;
    policyIssueDate?: string;
    rpqScore?: string;
    sourceOfPremium?: string;
    survivalBenefitOption?: string;
    beneficialOwnerHasUsaFlag?: string;
    autoFundBalanceOption?: string;
    autoFundBalanceFrequency?: string;
    cardIssuerCountry?: string;
    remoteSelling?: string;
    laPolicyIssueDate?: string;
    haveCreditCard?: string;
    premiumMethod?: string;
    initialBeneficialOwnerSeqNo?: string;
    siToken?: string;
    siFileType?: string;
    sourceOfPremiumCountry?: string;
    gioCampaignCode?: string;
    paymentList?: NbPolicyPaymentDTO[];
    coverageList?: NbPolicyCoverageDTO[];
    primaryAgentChannelCode?: string;
    uwPremiumStatusTrackList?: UwPremiumStatusTrackDTO[];
  };

  type NbPolicyPaymentDTO = {
    applicationNo?: string;
    policyId?: string;
    accountNo?: string;
    policyInitialPremium?: number;
    currencyCode?: string;
    policyPayMode?: string;
    paidCustomerSeqNo?: string;
    renewalPremium?: number;
    renewalPayType?: string;
    payType?: string;
    refundPayType?: string;
    channelType?: string;
    dateOfDeduction?: string;
    reason?: string;
    deductionStatus?: string;
    firstBillingDate?: string;
    paymentTransactionId?: string;
    paymentUrl?: string;
    onlinePaymentTokenNumber?: string;
    merchantId?: string;
    paymentReferenceNo?: string;
    hasCreateReceipt?: string;
    paymentDate?: string;
  };

  type ObjectCompareResult = {
    equalFieldList?: string[];
    failFieldList?: string[];
    lackFieldList?: string[];
    abundantFieldList?: string[];
    existDiff?: boolean;
  };

  type PendingDateTime = {
    pendingDate?: string;
    reminderDate1?: string;
    reminderDate2?: string;
  };

  type PendingMemo = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    reasonDetailId?: string;
    reasonGroupId?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    pendingDate?: string;
    memoSeq?: number;
    memoCode?: string;
    memoDesc?: string;
    memoStatus?: string;
    subTypeCode?: string;
    memoRemark?: string;
    requestedClientRole?: string;
    requestedClientId?: string;
    memoCategory?: string;
    readFlag?: string;
    statusChangeTime?: string;
    statusChangeReason?: string;
    medicalProviderCode?: string;
    submitStatus?: string;
    submittedTime?: string;
    coreSeqNo?: number;
    source?: string;
    surveyCompany?: string;
    currentFlag?: boolean;
    action?: string;
    skipIntegrate?: boolean;
    pendingMemoSubInfoList?: PendingMemoSubInfo[];
    activate?: boolean;
  };

  type PendingMemoConfigDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    memoCode?: string;
    memoDesc?: string;
    reasonCode?: string;
    reminderCode?: string;
    ntuReasonCode?: string;
    memoCategory?: string;
    caseCategory?: string;
    memoToRole?: string;
    isDefault?: string;
    skipIntegrate?: boolean;
    companyCode?: string;
    multiSelect?: boolean;
    caseCategoryKey?: string;
  };

  type PendingMemoConfigVO = {
    haveMemoSubType?: boolean;
    memoSubTypeCodes?: string[];
    reminderConfigDO?: ReminderConfigDO;
    memoCategory?: string;
    isDefault?: string;
    skipIntegrate?: boolean;
    reasonCode?: string;
    reasonGroupCode?: string;
    memoCode?: string;
    multiSelect?: boolean;
  };

  type PendingMemoDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    reasonDetailId?: string;
    reasonGroupId?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    pendingDate?: string;
    memoSeq?: number;
    memoCode?: string;
    memoDesc?: string;
    memoStatus?: string;
    subTypeCode?: string;
    memoRemark?: string;
    requestedClientRole?: string;
    requestedClientId?: string;
    memoCategory?: string;
    readFlag?: string;
    statusChangeTime?: string;
    statusChangeReason?: string;
    medicalProviderCode?: string;
    submitStatus?: string;
    submittedTime?: string;
    coreSeqNo?: number;
    source?: string;
    surveyCompany?: string;
    activate?: boolean;
  };

  type PendingMemoSubInfo = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    reasonDetailId?: string;
    reasonGroupId?: string;
    memoId?: string;
    subTypeCode?: string;
    subRemark?: string;
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
    readFlag?: string;
    medicalProviderCode?: string;
    statusChangeTime?: string;
    pendingMemoSubInfoList?: PendingMemoSubInfoVO[];
    submitStatus?: string;
    submittedTime?: string;
    surveyCompany?: string;
    skipIntegrate?: boolean;
    coreSeqNo?: number;
    statusChangeReason?: string;
    source?: string;
  };

  type pendingReasonGroupExists1Params = {
    businessNo: string;
    reasonGroupCodes: string[];
  };

  type pendingReasonGroupExistsParams = {
    businessNo: string;
    reasonGroupCodes: string[];
  };

  type PendingReasonGroupVO = {
    isExternal?: string;
    reasonGroupDO?: ReasonGroupDO;
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

  type ReasonAttachDoc = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    reasonGroupId?: string;
    reasonDetailId?: string;
    docId?: string;
    docName?: string;
    externalDocId?: string;
  };

  type ReasonAttachDocVO = {
    id?: string;
    docId?: string;
    docName?: string;
    externalDocId?: string;
  };

  type ReasonCodeMapDTO = {
    className?: string;
  };

  type ReasonConfigVO = {
    reasonCode?: string;
    reasonName?: string;
    type?: string;
    subCaseCategory?: string;
    period?: number;
    enableReminder?: boolean;
    enableAutoReminder?: boolean;
    enableReminderNotice?: boolean;
    enableWorkday?: boolean;
    triggerDocDispatch?: boolean;
    roleChannelConfigs?: RoleChannelConfigVO[];
    reminderConfigs?: ReminderConfigVO[];
    docConfigs?: ReasonDocConfigVO[];
    displayConfig?: string;
    copyData?: string;
    triggerCcm?: boolean;
    syncDestToReminder?: boolean;
    caseRelationWithSubCase?: string;
    subCaseRelationWithCase?: string;
    subCaseBusinessType?: string;
    ccmSyncFlag?: string;
  };

  type ReasonDetail = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
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
    enableReminderNotice?: boolean;
    enableAutoReminder?: boolean;
    enableWorkday?: boolean;
    dispatchDate?: string;
    destRoleOpt?: string;
    defaultChannel?: string;
    triggerDocDispatch?: boolean;
    policy?: string;
    attachment?: string;
    delayLetter?: boolean;
    define?: string;
    displayConfig?: string;
    docGroupCodes?: string;
    copyData?: string;
    triggerCcm?: boolean;
    syncDestToReminder?: boolean;
    remark?: string;
    payment?: string;
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
    subCaseRelationWithCase?: string;
    subCaseBusinessType?: string;
    ccmSyncFlag?: string;
    externalUrl?: string;
    sendSuccessfullyFlag?: string;
    letterCode?: string;
    destId?: string;
    hospRecipientCode?: string;
    hospitalCategory?: string;
    requestPurpose?: string;
    channelDataList?: ChannelData[];
    reasonReminders?: ReasonReminder[];
    pendingMemoList?: PendingMemo[];
    reasonDocs?: ReasonDoc[];
    variables?: Record;
    reminderRecipient?: ReminderRecipient;
    dataType?: string;
    attachDocs?: ReasonAttachDoc[];
    subCaseAssignee?: string;
    triggerType?: string;
    defaultMemoCode?: string;
    defaultMemoDesc?: string;
    existCorrespondenceFlag?: string;
  };

  type ReasonDetailDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
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
    enableReminderNotice?: boolean;
    enableAutoReminder?: boolean;
    enableWorkday?: boolean;
    dispatchDate?: string;
    destRoleOpt?: string;
    defaultChannel?: string;
    triggerDocDispatch?: boolean;
    policy?: string;
    attachment?: string;
    delayLetter?: boolean;
    define?: string;
    displayConfig?: string;
    docGroupCodes?: string;
    copyData?: string;
    triggerCcm?: boolean;
    syncDestToReminder?: boolean;
    remark?: string;
    payment?: string;
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
    subCaseRelationWithCase?: string;
    subCaseBusinessType?: string;
    ccmSyncFlag?: string;
    externalUrl?: string;
    sendSuccessfullyFlag?: string;
    letterCode?: string;
    destId?: string;
    hospRecipientCode?: string;
    hospitalCategory?: string;
    requestPurpose?: string;
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
    subCaseRelationWithCase?: string;
    subCaseBusinessType?: string;
    ccmSyncFlag?: string;
    externalUrl?: string;
    letterCode?: string;
    destId?: string;
    hospRecipientCode?: string;
    hospitalCategory?: string;
    defaultMemoCode?: string;
    defaultMemoDesc?: string;
    existCorrespondenceFlag?: string;
    requestPurpose?: string;
  };

  type ReasonDoc = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    reasonGroupId?: string;
    reasonDetailId?: string;
    caseNo?: string;
    taskId?: string;
    activityKey?: string;
    reasonCode?: string;
    docGroupCode?: string;
    docTypeCode?: string;
    docId?: string;
    docName?: string;
    docStatus?: string;
    comment?: string;
    copies?: number;
    appNo?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    enableFreeTextDoc?: boolean;
    enableComment?: boolean;
    enableCopies?: boolean;
    memoId?: string;
    memoSubId?: string;
    caseCategory?: string;
    groupCode?: string;
    memoCode?: string;
    receivedDocId?: string;
    ontToManyMemoCode?: boolean;
  };

  type ReasonDocConfigVO = {
    docGroupCode?: string;
    defaultDocTypeCodes?: string[];
    enableFreeTextDoc?: boolean;
    enableComment?: boolean;
    enableCopies?: boolean;
    memoCode?: string;
    memoSubcode?: string;
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

  type ReasonExtraFunction = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    reasonGroupId?: string;
    reasonExecuteType?: string;
    functionCode?: string;
    functionName?: string;
    dependenceFunctionCode?: string;
    executeSequence?: number;
    caseCategory?: string;
    supportRetry?: boolean;
    canRetry?: boolean;
    executeStatus?: string;
    retryNum?: number;
    beanKey?: string;
    maxRetryNo?: number;
    autoRetry?: boolean;
    cron?: string;
    correspondenceId?: string;
    holdingConfig?: string;
    handleFailMaxRetry?: string;
    manualRetry?: boolean;
    autoJobRetry?: boolean;
    reTriggerTimeByHolding?: string;
    reachMaxRetryNo?: boolean;
  };

  type ReasonExtraFunctionVO = {
    reasonGroupId?: string;
    reasonExecuteType?: string;
    functionCode?: string;
    functionName?: string;
    dependenceFunctionCode?: string;
    executeSequence?: number;
    supportRetry?: boolean;
    canRetry?: boolean;
    executeStatus?: string;
    autoRetry?: boolean;
    cron?: string;
    maxRetryNo?: number;
    holdingConfig?: string;
  };

  type ReasonGroup = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    groupCode?: string;
    name?: string;
    caseNo?: string;
    taskId?: string;
    caseCategory?: string;
    activityKey?: string;
    status?: string;
    startTime?: string;
    endTime?: string;
    allowActions?: string;
    enableAutoPend?: boolean;
    businessNo?: string;
    inquiryBusinessNo?: string;
    stopSla?: boolean;
    stopTat?: boolean;
    readStatus?: boolean;
    activateUser?: string;
    autoSendFlag?: string;
    hasExtraFuncFail?: boolean;
    isVisible?: string;
    handledReason?: string;
    enableCorrespondenceHistory?: boolean;
    sendControl?: boolean;
    currentActivityKey?: string;
    currentTaskId?: string;
    reasonDetails?: ReasonDetail[];
    businessData?: Record;
    applicant?: string;
    assignee?: string;
    registerDoc?: boolean;
    ntuDate?: string;
    skipNbValidation?: boolean;
    externalUrl?: string;
    updateStatus?: boolean;
    previewDataId?: string;
    triggerType?: string;
    actionType?: string;
    reasonExtraFunctions?: ReasonExtraFunction[];
    emailToEM?: string;
    emailCcEM?: string;
    emailBccEM?: string;
    emailTitleEM?: string;
    emailContentEM?: string;
    smsToEM?: string;
    smsContentEM?: string;
    needRetryCorrespondenceList?: string[];
    canRetrySendCorrespondence?: boolean;
    letterDateLatestPendMemo?: string;
    operationType?: string;
    ntuTriggerPoint?: string;
    enableWorkingDay?: boolean;
    fromBatchSend?: boolean;
    isInternal?: number;
    handlePendingMemoId?: string;
    ranking?: number;
    needRefreshPremium?: boolean;
    extraFuncExecuteType?: string;
    exceptionMessage?: string;
    lastUpdateTime?: string;
    autoExpand?: string;
    waivedFromDraft?: boolean;
    waivedFromActive?: boolean;
    noneActiveReason?: boolean;
    sent?: boolean;
  };

  type ReasonGroupConfigVO = {
    code?: string;
    name?: string;
    allowActions?: string[];
    reasonConfigs?: ReasonConfigVO[];
    enableAutoPend?: boolean;
    stopSla?: boolean;
    stopTat?: boolean;
    version?: string;
    previewMode?: string;
    emailToEM?: string;
    emailCcEM?: string;
    emailBccEM?: string;
    emailTitleEM?: string;
    emailContentEM?: string;
    smsToEM?: string;
    smsContentEM?: string;
    isVisible?: string;
    existCorrespondenceFlag?: string;
    allowMerge?: string;
    enableCorrespondenceHistory?: boolean;
  };

  type ReasonGroupDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    groupCode?: string;
    name?: string;
    caseNo?: string;
    taskId?: string;
    caseCategory?: string;
    activityKey?: string;
    status?: string;
    startTime?: string;
    endTime?: string;
    allowActions?: string;
    enableAutoPend?: boolean;
    businessNo?: string;
    inquiryBusinessNo?: string;
    stopSla?: boolean;
    stopTat?: boolean;
    readStatus?: boolean;
    activateUser?: string;
    autoSendFlag?: string;
    hasExtraFuncFail?: boolean;
    isVisible?: string;
    handledReason?: string;
    enableCorrespondenceHistory?: boolean;
  };

  type ReasonGroupDocType = {
    reasonGroupId?: string;
    docTypeCodes?: string[];
  };

  type ReasonGroupPendingMemoVO = {
    businessNo?: string;
    caseNo?: string;
    groupCode?: string;
    memoCode?: string;
    subTypeCode?: string;
    pendingMemoId?: string;
  };

  type ReasonGroupPreviewDataDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    reasonGroupId?: string;
    reasonDetailId?: string;
    previewTime?: string;
    previewDataJson?: string;
  };

  type ReasonGroupPreviewDataVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    reasonGroupId?: string;
    reasonDetailId?: string;
    previewTime?: string;
    previewDataJson?: string;
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
    operationType?: string;
    isVisible?: string;
    fromBatchSend?: boolean;
    handledReason?: string;
    isInternal?: number;
    needRefreshPremium?: boolean;
    exceptionMessage?: string;
    enableCorrespondenceHistory?: boolean;
    lastUpdateTime?: string;
    autoExpand?: string;
  };

  type ReasonReminder = {
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
    reminderSequence: number;
    cron?: number;
    scheduleSendTime?: string;
    actualSendTime?: string;
    status?: string;
    destRole?: string;
    dest?: string;
    dispatchDate?: string;
    destRoleOpt?: string;
    defaultChannel?: string;
    triggerCcm?: boolean;
    cronExpression?: string;
    expressionType?: string;
    channelDataList?: ChannelData[];
    variables?: Record;
    reasonDetail?: ReasonDetail;
    reasonDocs?: ReasonDoc[];
    draft?: boolean;
    waiting?: boolean;
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
    cronExpression?: string;
    expressionType?: string;
  };

  type ReIndexDocVO = {
    businessCode?: string;
    policyNo?: string;
    policyOwnerName?: string;
    identityNo?: string;
    businessProcessVOS?: BusinessProcessVO[];
    docChangedItem?: DocChangedItem;
    docViewVOList?: DocViewVO[];
  };

  type ReminderConfigDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    code?: string;
    cron?: string;
    triggerCcm?: boolean;
    referenceCode?: string;
    cronExpression?: string;
    expressionType?: string;
    monthEndCronExpression?: string;
  };

  type ReminderConfigVO = {
    reminderCode?: string;
    cron?: number;
    reminderSequence?: number;
    triggerCcm?: boolean;
    cronExpression?: string;
    expressionType?: string;
    roleChannelConfigs?: RoleChannelConfigVO[];
  };

  type ReminderRecipient = {
    name?: string;
    role?: string;
  };

  type resolveByReasonCode1Params = {
    caseNo: string;
    currentActivityKey: string;
    groupCode: string;
  };

  type resolveByReasonCodeParams = {
    caseNo: string;
    currentActivityKey: string;
    groupCode: string;
  };

  type resolveParent1Params = {
    caseNo: string;
  };

  type resolveParentParams = {
    caseNo: string;
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

  type ResultVOAutoWakeUpResultVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: AutoWakeUpResultVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOBatchAutoWakeUpResultVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: BatchAutoWakeUpResultVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOBoolean = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: boolean;
    promptMessages?: PromptMessage[];
  };

  type ResultVOCaseReasonGroupDTO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CaseReasonGroupDTO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOConcurrentHashMapStringLogExtendConfigVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOCorrespondenceEventVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CorrespondenceEventVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOCorrespondencePreviewVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CorrespondencePreviewVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOCorrespondenceResultVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CorrespondenceResultVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVODataPatchResultVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: DataPatchResultVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVODate = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: string;
    promptMessages?: PromptMessage[];
  };

  type ResultVOListActRuTaskVariableVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ActRuTaskVariableVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListBusinessProcessVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: BusinessProcessVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListCorrespondenceRelationCfgDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CorrespondenceRelationCfgDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListEnvoyBatchSendConfigDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: EnvoyBatchSendConfigDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListExceptionMessage = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ExceptionMessage[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListLetterDocConfigDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: LetterDocConfigDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListMap = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListMemoRequestedClientInfoDTO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: MemoRequestedClientInfoDTO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListMemoSubTypeDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: MemoSubTypeDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListPendingMemoConfigDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PendingMemoConfigDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListPendingMemoConfigVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PendingMemoConfigVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListPendingMemoVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PendingMemoVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListReasonDoc = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ReasonDoc[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListReasonExtraFunctionVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ReasonExtraFunctionVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListReasonGroupConfigVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ReasonGroupConfigVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListReasonGroupPendingMemoVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ReasonGroupPendingMemoVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListReasonGroupVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ReasonGroupVO[];
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

  type ResultVOMapObjectObject = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOMigrationEnvoyData = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: MigrationEnvoyData;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPendingReasonGroupVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PendingReasonGroupVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOReasonCodeMapDTO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ReasonCodeMapDTO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOReasonGroupPreviewDataVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ReasonGroupPreviewDataVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOReasonGroupVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ReasonGroupVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOString = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: string;
    promptMessages?: PromptMessage[];
  };

  type ResultVOSubCaseOperationResult = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: SubCaseOperationResult;
    promptMessages?: PromptMessage[];
  };

  type ResultVOUdCaseResultVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: UdCaseResultVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOVoid = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type reTriggerByCaseNoParams = {
    caseNo: string;
    triggerKeys: string;
  };

  type RetryReasonExtraFunctionVO = {
    reasonGroupId?: string;
    reasonExecuteType?: string;
    functionCode?: string;
  };

  type ReturnTString = {
    code?: number;
    msg?: string;
    content?: string;
  };

  type RoleChannelConfigVO = {
    destRole?: string;
    defaultChannel?: string;
    channelTemplates?: ChannelTemplateConfigVO[];
  };

  type RuleCommonRpcFactInfoVO = {
    objClassType?: string;
    objJsonContent?: string;
  };

  type SendTimeQuery = {
    startTime?: string;
    cron?: number;
    enableWorkday?: boolean;
  };

  type SplitDoc = {
    docId?: string;
    appNo?: string;
  };

  type SplitRequest = {
    srcTaskInfo?: TaskInfo;
    destTaskInfo?: TaskInfo;
    srcSplitDocs?: SplitDoc[];
    destSplitDocs?: SplitDoc[];
  };

  type StatsInitDataVO = {
    eventType?: string;
    caseNos?: string[];
    caseCategoryList?: string[];
    forceFullInitFlag?: string;
  };

  type SubCaseOperationResult = {
    businessData?: Record;
  };

  type SubCaseOperatorInfo = {
    caseNo?: string;
    operationType?: string;
  };

  type switchReminderParams = {
    reasonDetailId: string;
    enableReminder: boolean;
  };

  type syncEnvoyParams = {
    envoyCodePrefix?: string;
    caseNo?: string;
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
    inquiryClaimNo?: string;
    assessmentType?: string;
    submissionId?: string;
    initialDataInherit?: number;
    inheritSource?: number;
    editFlag?: string;
    inquiryBusinessNo?: string;
    createLocation?: string;
    autoActivity?: number;
  };

  type TaskInfo = {
    businessNo?: string;
    inquiryBusinessNo?: string;
    processInstanceId?: string;
    taskId?: string;
    activityKey?: string;
    assignee?: string;
  };

  type TemplateParamDataRequest = {
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    caseNo?: string;
    role?: string;
    type?: string;
    roleCode?: string;
    claimNo?: string;
    taskId?: string;
    activityCode?: string;
    groupCode?: string;
  };

  type TemplateResultInfoVO = {
    templateCode?: string;
    templateName?: string;
    docId?: string;
    docFullName?: string;
  };

  type triggerStopSla1Params = {
    type: number;
    caseNo: string;
  };

  type triggerStopSlaParams = {
    type: number;
    caseNo: string;
  };

  type UdCaseResultVO = {
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
    udDocCaseRelationList?: UdDocCaseRelationVO[];
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

  type UdDocCaseRelationBO = {
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

  type UnknowDocInfo = {
    triggeUnCaseFlag?: boolean;
    unknowCaseNo?: string;
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

  type updateOverdueJobByCaseNoAndGroupCode1Params = {
    caseNo: string;
    groupCode: string;
  };

  type updateOverdueJobByCaseNoAndGroupCodeParams = {
    caseNo: string;
    groupCode: string;
  };

  type updatePendingMemoStatus1Params = {
    pendingMemoId: string;
    status: string;
  };

  type updatePendingMemoStatus2Params = {
    pendingMemoId: string;
    status: string;
  };

  type updatePendingMemoStatusParams = {
    pendingMemoId: string;
    status: string;
  };

  type updateReminderStatus1Params = {
    reasonGroupCodeList: string[];
    reminderCode: string;
    status: string;
  };

  type updateReminderStatusParams = {
    reasonGroupCodeList: string[];
    reminderCode: string;
    status: string;
  };

  type UwPremiumStatusTrackDTO = {
    applicationNo?: string;
    policyId?: string;
    status?: string;
    collectionAmount?: number;
    windPayerType?: string;
    bankCode?: string;
    requestAmount?: number;
    createReceiptStatus?: string;
    receiptNo?: string;
    ccExpiryMonth?: string;
    ccExpiryYear?: string;
    creditCardHolderName?: string;
    creditCardNumber?: string;
    paymentReferenceNo?: string;
    paymentStatus?: string;
    paymentTokenId?: string;
    paymentTransactionId?: string;
    creditCardMode?: string;
    creditCardType?: string;
    paymentMethodSubType?: string;
    collectionType?: string;
    paymentLink?: string;
    ccTokenId?: string;
    payType?: string;
    paymentMethodType?: string;
    requestAdvancePaymentAmount?: number;
    createOfflineReceiptRefStatus?: string;
    paymentDate?: string;
    paymentRequestType?: string;
    paymentOption?: string;
  };

  type waiveByCaseNoAndGroupCode1Params = {
    caseNo: string;
    groupCode: string;
  };

  type waiveByCaseNoAndGroupCodeParams = {
    caseNo: string;
    groupCode: string;
  };

  type waivedAndAutoUnpendByCaseNo1Params = {
    caseNo: string;
    handledReason?: string;
  };

  type waivedAndAutoUnpendByCaseNoParams = {
    caseNo: string;
    handledReason?: string;
  };

  type waivedEnvoyByCaseNo1Params = {
    caseNo: string;
    handledReason?: string;
  };

  type waivedEnvoyByCaseNoAndGroupCode1Params = {
    caseNo: string;
    groupCode: string;
    handledReason?: string;
  };

  type waivedEnvoyByCaseNoAndGroupCodeParams = {
    caseNo: string;
    groupCode: string;
    handledReason?: string;
  };

  type waivedEnvoyByCaseNoAndGroupCodes1Params = {
    caseNo: string;
    groupCodes: string[];
  };

  type waivedEnvoyByCaseNoAndGroupCodesParams = {
    caseNo: string;
    groupCodes: string[];
  };

  type waivedEnvoyByCaseNoParams = {
    caseNo: string;
    handledReason?: string;
  };

  type waivePendingMemoParams = {
    pendingMemoId: string;
  };
}
