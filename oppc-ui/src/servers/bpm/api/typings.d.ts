declare namespace API {
  type AABusinessTask = {
    taskID?: string;
    activityCode?: string;
    activityName?: string;
    triggeringAction?: string;
    assignee?: string;
    assigneeMentor?: string;
    orgOfAssignee?: string;
    activityStatus?: string;
    sourceType?: string;
  };

  type ActionUserInfo = {
    assignUserInfo?: PermissionTeamUserResultVO;
    submitUserInfo?: PermissionTeamUserResultVO;
    autoEscalateUserInfo?: PermissionTeamUserResultVO;
    manualEscalateUserInfo?: PermissionTeamUserResultVO;
  };

  type activateProcessDefinitionParams = {
    processDefinitionId: string;
    suspendInstances: boolean;
  };

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

  type ActivityCategoryDO = {
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
    pageController?: string;
    parentCaller?: string;
    applicationType?: string;
    showAddButton?: boolean;
    showHistory?: number;
    showReadButton?: number;
    showReasonDropdown?: number;
    saveIfNull?: number;
    placeholder?: string;
    flowIndicator?: string;
    showEffectivePeriod?: number;
    operatorFlag?: string;
    reasonRequired?: string;
    confirmMsg?: string;
    maxNo?: number;
    checkSpecialChar?: number;
    linkTo?: string;
  };

  type ActivityCategoryLinkDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    caseNo?: string;
    businessNo?: string;
    activityCode?: string;
    categoryCode?: string;
    activityStatus?: string;
    taskId?: string;
    caseCategory?: string;
    author?: string;
    linkType?: string;
    linkCode?: string;
    tipCode?: string;
  };

  type ActivityCompleteTimeDO = {
    businessNo?: string;
    completeTime?: string;
  };

  type ActivityCompleteTimeQO = {
    activityKey?: string;
    businessNos?: string[];
  };

  type ActivityDetail = {
    defaultCategoryCode?: string;
    activityCategoryList?: ActivityCategoryDO[];
    activityCode?: string;
  };

  type ActivitySLADetail = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    taskId?: string;
    taskDefKey?: string;
    activityName?: string;
    businessNo?: string;
    caseCategory?: string;
    processInstanceId?: string;
    processDefId?: string;
    pageController?: string;
    taskStatus?: string;
    assignee?: string;
    taskLevel?: string;
    caseLevel?: string;
    currentTime?: string;
    startTime?: string;
    endTime?: string;
    duration?: number;
    dueDate?: string;
    caseDueDate?: string;
    sla?: number;
    caseSla?: number;
    taskOtTime?: number;
    caseOtTime?: number;
    reassignStatus?: number;
    taskUsedTime?: number;
    caseUsedTime?: number;
    insured?: string;
    remainingTime?: number;
    caseRemainingTime?: number;
    batchNo?: string;
    rejected?: boolean;
    taskOrder?: number;
    completedTime?: string;
    activityButtonList?: ActivityButton[];
    activePendingReason?: string;
    nextReminderTime?: string;
    urgent?: boolean;
  };

  type ActRuTaskVariableVO = {
    taskId?: string;
    procInstId?: string;
    text?: string;
    assignee?: string;
    caseNoTask?: string;
  };

  type ActRuVariableVO = {
    name?: string;
    procInstId?: string;
    text?: string;
  };

  type AssigneeTaskSummaryVO = {
    assignee?: string;
    todoTaskCount?: number;
  };

  type AssignmentEvaluation = {
    scoreL1?: number;
    scoreL2?: number;
    scoreL3?: number;
    scoreL4?: number;
  };

  type assignTasksParams = {
    messageJobId: number;
  };

  type AssignTaskVO = {
    caseCategory?: string;
    activityKey?: string;
    businessNo?: string;
  };

  type AssignTeam = {
    teamCode?: string;
    teamName?: string;
    teamGroupUserList?: AssignTeamUser[];
  };

  type AssignTeamUser = {
    userId?: string;
    groupCode?: string;
  };

  type AssignTeamVO = {
    userId?: string;
    caseNo?: string;
    taskId?: string;
    caseCategory?: string;
    activityKey?: string;
    team?: AssignTeam;
    businessNo?: string;
    user?: AssignUser;
  };

  type AssignUser = {
    userId?: string;
    escalateReason?: string;
  };

  type AutoRuleTaskVO = {
    processInstanceId?: string;
    taskId?: string;
    caseCategory?: string;
    taskDefinitionKey?: string;
    autoActivity?: number;
    autoAssign?: number;
    assignee?: string;
    status?: string;
    hisTaskAssignee?: string[];
    procActOrder?: number;
  };

  type AutoTaskDetail = {
    taskId?: string;
    processInstanceId?: string;
    caseCategory?: string;
    taskDefKey?: string;
    startTime?: string;
    region?: string;
  };

  type AutoTaskMonitorInfo = {
    autoTaskDetailList?: AutoTaskDetail[];
    totalCount?: number;
  };

  type autoUnPendParams = {
    processInstanceId: string;
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
    businessNo?: string;
    activityCode?: string;
    categoryCode?: string;
    activityStatus?: string;
    taskId?: string;
    caseCategory?: string;
    author?: string;
  };

  type BatchAssignee = {
    batchNo?: string;
    assignee?: string;
  };

  type BatchAssignRequestVO = {
    taskAssignmentList?: TaskAssignmentVO[];
    assignee?: string;
    assigner?: string;
    level?: string;
    assignType?: string;
  };

  type BatchProcessInstance = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    processDefId?: string;
    processInstanceId?: string;
    processActKey?: string;
    taskId?: string;
    batchNo?: string;
    status?: string;
    type?: string;
  };

  type BenefitRelationGroupVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    procInstId?: string;
    businessNo?: string;
    parentClaimNo?: string;
    caseStatus?: string;
    policyId?: string;
    benefitItemCode?: string;
    benefitTypeCode?: string;
    insuredId?: string;
    status?: string;
    groupId?: string;
    shareBenefitItemCodes?: string;
    taskId?: string;
    caseCategory?: string;
    shareItems?: string[];
  };

  type BizObjReadRecordRequestVO = {
    caseNo?: string;
    subjectType?: string;
    readUserId?: string;
    inquiryBusinessNo?: string;
    subjectIdList?: string[];
  };

  type BizObjReadRecordVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    requestTime?: string;
    caseNo?: string;
    subjectType?: string;
    subjectId?: string;
    readType?: string;
    readUserId?: string;
    caseCategory?: string;
    activityKey?: string;
    inquiryBusinessNo?: string;
    subjectIdList?: string[];
  };

  type BpmCaseLabel = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    caseNo?: string;
    inquiryBusinessNo?: string;
    labelCode?: string;
    labelValue?: string;
  };

  type BpmCaseLabelVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    caseNo?: string;
    inquiryBusinessNo?: string;
    labelCode?: string;
    labelValue?: string;
    valueTypeCode?: string;
    orderNo?: number;
    labelTypeCode?: string;
    labelDictCode?: string;
    correspondenceCode?: string;
    displayInSubProcess?: string;
    userId?: string;
  };

  type BpmCfgInfoGroupDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    infoGroupCode?: string;
    infoCategoryCode?: string;
    infoCategoryDefaultLinkTo?: string;
    hidden?: boolean;
    groupDisplayOrder?: number;
    infoCategoryDisplayOrder?: number;
    caseCategory?: string;
    businessCode?: string;
    regionCode?: string;
    companyCode?: string;
  };

  type BpmDashboardActivityBO = {
    activityName?: string;
    costTime?: number;
    operatorName?: string;
    activityCode?: string;
  };

  type BpmDashboardBO = {
    processInstantId?: string;
    manualAssessment?: boolean;
    claimApproval?: boolean;
  };

  type BusinessData = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    processInstanceId?: string;
    businessData?: string;
    taskId?: string;
  };

  type BusinessNoQO = {
    businessNoList?: string[];
    reasonType?: string;
  };

  type BusinessOperationDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    caseCategory?: string;
    activityKey?: string;
    operationType?: string;
    applicationName?: string;
    url?: string;
    isBusinessMandatory?: number;
    extendedField?: string;
    businessExchange?: string;
    businessRoutingKey?: string;
    rollbackApplicationName?: string;
    rollbackUrl?: string;
    async?: boolean;
  };

  type BusinessOperationSubDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    caseCategory?: string;
    activityKey?: string;
    operationType?: string;
    applicationName?: string;
    url?: string;
    extendedField?: string;
    operationOrder?: number;
    effectToAll?: number;
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
    insuredMiddleName?: string;
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
    isSta?: string;
    preDefineDecisionInd?: boolean;
    indicator?: Indicator;
    vip?: number;
    operationDate?: string;
    policyOwnerName?: string;
    ocrFlag?: string;
    dataFromOcr?: string;
    companyCode?: string;
    businessCode?: string;
    medCase?: boolean;
    passAdminRule?: number;
    agentId?: string;
    frontendSystemReferenceNo?: string;
    systemRemark?: string;
    caseType?: string;
    originalSubmissionDate?: string;
    isMain?: string;
  };

  type BusinessProcessTaskVO = {
    caseNo?: string;
    caseCategory?: string;
    status?: string;
    businessNo?: string;
    currentActivity?: string;
    currentAssignee?: string;
    taskId?: string;
  };

  type BusinessTransactionProcess = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    inquiryBusinessNo?: string;
    needQc?: string;
    processTransitionStatus?: string;
    transitionProcessBusinessNo?: string;
    reversalCount?: number;
  };

  type ButtonLinkCategoryResult = {
    checkResult?: boolean;
    popUpCaseNo?: string;
    categoryCode?: string;
  };

  type ButtonService = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
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
      ifModifiedSince?: number;
      contentType?: MediaType;
      connection?: string[];
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
      allow?: HttpMethod[];
      cacheControl?: string;
      etag?: string;
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

  type CancelEnvoyEvent = {
    caseNo?: string;
    caseCategory?: string;
    waiveDraft?: boolean;
    copyToCaseInfo?: CopyToCaseInfoVO;
  };

  type CancleCaseVO = {
    caseCategoryList?: string[];
    startTime?: string;
    endTime?: string;
    statusList?: string[];
    statusExclusionList?: string[];
  };

  type CaseBusinessInfoVO = {
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    partyId?: string;
    policyNo?: string;
    businessType?: string;
    clientName?: string;
    agentName?: string;
    businessDecision?: string;
    companyCode?: string;
    businessCode?: string;
    businessTransactionProcess?: BusinessTransactionProcess;
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
    urgent?: number;
    operationType?: string;
    taskId?: string;
    activityKey?: string;
    checkType?: string;
    cancelReason?: string;
    reversedReason?: string;
    businessData?: Record;
    activityVariables?: Record;
    informationList?: InformationVO[];
    cancelEnvoyEvent?: CancelEnvoyEvent;
    isAutoCancel?: string;
  };

  type CaseCategoryList = {
    caseCategoryList?: string[];
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
    urgent?: number;
    operationType?: string;
    activityVariables?: Record;
    notificationList?: string[];
    relatedCase?: RelatedCaseVO;
    businessData?: Record;
    informationList?: InformationVO[];
    docViewVOList?: DocViewVO[];
    businessProcessIdList?: string[];
  };

  type CaseEndMassage = {
    caseNo?: number;
    businessNo?: string;
    caseCategory?: string;
    inquiryBusinessNo?: string;
  };

  type CaseOperationInfoVO = {
    caseNo?: string;
    businessNo?: string;
    caseCategory?: string;
    currentTaskId?: string;
    currentActivityKey?: string;
    userId?: string;
    actionList?: string[];
  };

  type CaseRelationship = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    businessNo?: string;
    caseCategory?: string;
    procInstId?: string;
    batchNo?: string;
    relationship?: string;
    relatedProcInstId?: string;
    topPriorityRelationship?: string;
    targetPage?: string;
    pageCode?: string;
    processActivityKey?: string;
    taskStatus?: string;
    assignee?: string;
    caseRelationshipDetails?: CaseRelationshipDetail[];
    taskId?: string;
    relatedBusinessNo?: string;
    needNotice?: boolean;
    assignBy?: string;
    assignFrom?: string;
    assigneeName?: string;
    assignByName?: string;
    assignFromName?: string;
  };

  type CaseRelationshipDetail = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    procInstId?: string;
    relationship?: string;
  };

  type CaseRelationshipRecord = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    procInstId?: string;
    businessNo?: string;
    relatedProcInstId?: string;
    relatedBusinessNo?: string;
    relationship?: string;
    caseCategory?: string;
    relateCaseCategory?: string;
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
    urgent?: number;
    operationType?: string;
    taskId?: string;
    activityKey?: string;
    checkType?: string;
    businessData?: Record;
    activityVariables?: Record;
    informationList?: InformationVO[];
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
    assignee?: string;
    activityVariables?: Record;
    businessData?: Record;
    notificationList?: string[];
    companyCode?: string;
  };

  type CaseTaskVO = {
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    partyId?: string;
    policyNo?: string;
    businessType?: string;
    clientName?: string;
    agentName?: string;
    businessDecision?: string;
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
    urgent?: number;
    operationType?: string;
    parentId?: string;
    taskId?: string;
    activityKey?: string;
    messageJobId?: number;
    assignee?: string;
    level?: string;
    autoActivity?: boolean;
  };

  type CategoryReasonListParam = {
    caseCategory?: string;
    activityCode?: string;
    categoryCodes?: string[];
    content?: string;
  };

  type CategoryReasonParam = {
    caseCategory?: string;
    activityCode?: string;
    categoryCode?: string;
  };

  type CcmTriggerVO = {
    businessNo?: string;
    actionCodes?: string[];
  };

  type CCProcessParam = {
    caseCategory?: string;
    batchNo?: string;
    operator?: string;
    statusChangeDesc?: string;
    operateTime?: string;
  };

  type CCTaskInfoVO = {
    taskId?: string;
    batchNo?: string;
    assignee?: string;
    operator?: string;
    appliedComment?: string;
    operateTime?: string;
  };

  type CCTaskParam = {
    taskId?: string;
    variables?: Record;
  };

  type CfgCaseLabelVO = {
    regionCode?: string;
    caseCategory?: string;
    labelCode?: string;
    applicable?: string;
    valueTypeCode?: string;
    orderNo?: number;
    labelTypeCode?: string;
    labelDictCode?: string;
    displayInSubProcess?: string;
  };

  type CfgLogLevelVO = {
    serviceName?: string;
    logName?: string;
    logLevel?: string;
    logExtendName?: string;
    logExtendConfig?: LogExtendConfigVO;
  };

  type CfgToolBarAutoExpandDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    caseCategory?: string;
    activityKey?: string;
    taskStatus?: string;
    caseType?: string;
    functionType?: string;
    conditionJson?: string;
    priority?: number;
  };

  type changeAssigneeParams = {
    caseNo: string;
    activityKey: string;
    assignee: string;
  };

  type checkAddInfoPermissionParams = {
    taskId: string;
  };

  type checkCanRevert1Params = {
    taskId: string;
  };

  type CheckCaseParamsVO = {
    inquiryBusinessNo?: string;
    caseCategories?: string[];
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
    checkSubField?: CheckSubField;
  };

  type CheckMainActivityRequest = {
    caseNo?: string;
  };

  type CheckMainActivityResponse = {
    caseNo?: string;
    beforeMainActivity?: boolean;
    mainActivityCompletedDate?: string;
  };

  type checkProcessInstanceParams = {
    processInstanceId: string;
  };

  type checkSnapshotParams = {
    taskId: string;
  };

  type checkSplitCaseByBusinessNoParams = {
    businessNo: string;
  };

  type CheckSubField = {
    fieldCode?: string;
    buttonType?: string;
  };

  type checkTaskCompletedParams = {
    taskNo: string;
  };

  type claimTaskParams = {
    roleCode: string;
    assignee: string;
  };

  type CompareConfig = {
    actualObjectPath?: string;
    expectObjectPath?: string;
    groupByFieldList?: string[];
    fieldJoinStr?: string;
    ignoreFieldConfigList?: IgnoreFieldConfig[];
  };

  type completeProcessParams = {
    applicationNo: string;
    skipActivity?: string;
  };

  type CompleteProcessVO = {
    cascade?: boolean;
    caseNo?: string;
    variables?: Record;
    skipActivity?: string;
  };

  type completeRelationGroupParams = {
    processInstanceId: string;
  };

  type CompleteTaskBOV2 = {
    operationType?: string;
    taskCompletionVO?: TaskCompletionVO;
    currentTask?: CustomTaskInfo;
    newTask?: CustomTaskInfo;
    variables?: Record;
    businessProcess?: BusinessProcess;
    assign?: string;
    businessTransactionProcess?: BusinessTransactionProcess;
    businessCode?: string;
    caseNo?: string;
    caseCategory?: string;
    businessData?: Record;
    processEnded?: boolean;
    completeTaskActivityKey?: string;
    historyTask?: boolean;
    newTaskId?: string;
    newActivityKey?: string;
    currentTaskActivityKey?: string;
    newTaskActivityKey?: string;
  };

  type completeTasksParams = {
    messageJobId: number;
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

  type CopyToCaseInfoVO = {
    caseNo?: string;
    taskId?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    caseCategory?: string;
    activityKey?: string;
  };

  type countAllUserTaskVolumeParams = {
    domain: string;
    claimNo?: string;
  };

  type createCaseRegistrationRequestQueueParams = {
    submissionId: string;
  };

  type createFavoriteTaskParams = {
    userId: string;
    taskId: string;
  };

  type createIndexParams = {
    indexKey: string;
  };

  type createJpNonOpusPostProcessing1Params = {
    caseNo: string;
  };

  type createJpNonOpusPostProcessingParams = {
    caseNo: string;
  };

  type createPostQc1Params = {
    mainCaseNo: string;
  };

  type CreateUnknownDocCaseVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    caseNo?: string;
    submissionId?: string;
    identityType?: string;
    identityId?: string;
    firstName?: string;
    lastName?: string;
    activityType?: string;
    processParam?: ProcessParam;
  };

  type CustomerTypeConfigDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    caseCategory?: string;
    customerType?: string;
    businessCode?: string;
  };

  type CustomTaskInfo = {
    id?: string;
    owner?: string;
    assignee?: string;
    delegationState?: 'PENDING' | 'RESOLVED';
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

  type decryptParams = {
    decryptText: string;
  };

  type deleteBatchProcessByProcessIdParams = {
    batchNo: string;
    processInstanceId: string;
  };

  type deleteByJobId1Params = {
    jobId: string;
  };

  type deleteByJobIdParams = {
    jobId: string;
  };

  type deleteDeploymentParams = {
    deploymentId: string;
    cascade?: boolean;
  };

  type DeploymentResponse = {
    id?: string;
    name?: string;
    deploymentTime?: string;
    category?: string;
    parentDeploymentId?: string;
    url?: string;
    tenantId?: string;
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

  type docScanningAssignParams = {
    taskId: string;
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

  type EncoderConfig = {
    algorithm?: string;
    secretKey?: string;
  };

  type encryptParams = {
    plainText: string;
  };

  type endCaseByCaseNoParams = {
    caseNo: string;
  };

  type endCaseForThaiParams = {
    caseNo: string;
    modifier?: string;
  };

  type EndCaseJobResultVO = {
    resultFlag?: string;
    dependenceType?: string;
    errorMsg?: string;
  };

  type ExceptionMessage = {
    code?: string;
    args?: string[];
    type?: string;
    metaData?: Record;
  };

  type executePendReminderJobParams = {
    pendInfoId: string;
    pendReminderId: string;
    jobKey: string;
    language: string;
  };

  type ExternalUser = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    userId?: string;
    firstName?: string;
    surname?: string;
    userName?: string;
    type?: string;
    state?: string;
    gender?: number;
    nationality?: string;
    identityType?: string;
    identityNo?: string;
    phoneNo?: string;
    email?: string;
    address?: string;
  };

  type extractInformationDataParams = {
    caseNo: string;
  };

  type FavoriteProcessInfo = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    procInsId?: string;
    userId?: string;
  };

  type FavouriteActivityVo = {
    caseNo?: number;
    caseCategory?: string;
    insured?: string;
    batchNo?: string;
    taskStatus?: string;
    taskRemainingTime?: number;
    caseRemainingTime?: number;
    creationDate?: string;
    caseDueDate?: string;
    taskDueDate?: string;
    assignee?: string;
    claimNo?: string;
    taskDefKey?: string;
    slaActivityPercentage?: number;
    slaCasePercentage?: number;
    taskId?: string;
    favouriteTime?: string;
    inquiryClaimNo?: string;
  };

  type FavouriteTask = {
    id?: string;
    userId?: string;
    taskId?: string;
    favouriteTime?: string;
  };

  type FavouriteTaskDetailVO = {
    id?: string;
    taskId?: string;
    batchNo?: string;
    slaRemainTime?: number;
    sla?: number;
    insured?: string;
    caseNo?: number;
    currentActivityName?: string;
    caseCategory?: string;
    taskPriorityScore?: TaskPriorityScore;
    assignee?: string;
    taskStatus?: string;
    caseSla?: number;
    favouriteTime?: string;
    businessNo?: string;
    dueDate?: string;
    caseDueDate?: string;
    taskDefKey?: string;
    requestType?: string;
    remainingTime?: number;
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

  type FileContent = {
    filePath?: string;
    processInstanceId?: string;
    taskId?: string;
    fileName?: string;
    filePrefix?: string;
    fileSubfix?: string;
    localPath?: string;
  };

  type filterBusinessNoByReasonTypeParams = {
    businessNoList: string[];
    reasonType: string;
  };

  type findActHiTaskInstParams = {
    domain: string;
    claimNo: string;
  };

  type findActivitiesByCaseCategoryParams = {
    caseCategory: string;
  };

  type findAllLastManualTaskByCaseNoParams = {
    caseNo: string;
  };

  type findAllPendingTaskParams = {
    assignee: string;
  };

  type findAssigneeByProcessInstIdParams = {
    processInstanceId: string;
  };

  type findAutoActivitiesByCaseCategoryParams = {
    caseCategory: string;
  };

  type findBizDataObjectParams = {
    caseNo: string;
  };

  type findBizDataParams = {
    processInstanceId: string;
  };

  type findBusinessDataByCaseNoParams = {
    processInstanceId: string;
  };

  type findByBusinessNo1Params = {
    businessNo: string;
  };

  type findByBusinessNoAndCastCategoryParams = {
    claimNo: string;
    caseCategory: string;
  };

  type findByBusinessNoParams = {
    businessNo: string;
  };

  type findByInquiryBusinessNoParams = {
    inquiryBusinessNo: string;
  };

  type findByProcessInstanceIdParams = {
    processInstanceId: string;
  };

  type findByRelatedBusinessNoParams = {
    relatedBusinessNo: string;
  };

  type findCaseLabelsParams = {
    domain: string;
    claimNo: string;
  };

  type findEndTimeByCaseCategoryAndPolicyNoParams = {
    caseCategory: string;
    policyNo: string;
  };

  type findHistoryTaskParams = {
    caseNo: string;
    activityKey: string;
  };

  type findInformationByCaseNoParams = {
    caseNo: string;
  };

  type findInformationByTaskIdParams = {
    taskId: string;
  };

  type findInprogressBusinessProcessByPolicyIdParams = {
    policyId: string;
  };

  type findInquiryBusinessTasksByCaseNoParams = {
    claimNo: string;
  };

  type findLastAssigneeByActivityParams = {
    businessNo: string;
    activityKey: string;
  };

  type findLastManualTaskByCaseNoParams = {
    caseNo: string;
  };

  type findLastTaskByTaskIdParams = {
    taskId: string;
  };

  type findLatestActivityAssigneeByBusinessNoParams = {
    businessNo: string;
  };

  type findLatesTaskByCaseNo1Params = {
    caseNo: string;
  };

  type findLatesTaskByCaseNoParams = {
    caseNo: string;
  };

  type findLatesTaskByInquiryBusinessNoParams = {
    inquiryBusinessNo: string;
  };

  type findLatesTaskByProcessInstIdParams = {
    processInstanceId: string;
  };

  type findPolicyTaskByPolicyNoParams = {
    domain: string;
    policyNo: string;
  };

  type findPOSAssigneeByCaseNoParams = {
    caseNo: string;
  };

  type findProcessStatus1Params = {
    processInstanceId: string;
  };

  type findProcessStatusParams = {
    processInstanceId: string;
  };

  type findRelatedBusinessNoParams = {
    procInstId: string;
  };

  type findRelatedBusinessProcessParams = {
    processInstanceId: string;
    relationship: string;
  };

  type findRelationCaseByBusinessNoParams = {
    domain: string;
    claimNo: string;
  };

  type findRelationshipRecordsParams = {
    caseNo: string;
    relationship: string;
  };

  type findRuleEffectiveDateParams = {
    domain: string;
    claimNo: string;
  };

  type findSharingTaskByBusinessNo1Params = {
    domain: string;
    claimNo: string;
  };

  type findSubmissionIdByProcessInstIdParams = {
    caseNo: string;
  };

  type findSunmarryTaskVolumeParams = {
    domain: string;
    claimNo: string;
  };

  type findSystemTaskByTaskIdParams = {
    taskId: string;
  };

  type findTaskApproverParams = {
    domain: string;
    claimNo: string;
  };

  type findTaskByBusinessNoParams = {
    businessNo: string;
  };

  type findTaskCountByUserAndStatus1Params = {
    assignee: string[];
    taskStatus: string[];
  };

  type findTaskCountByUserAndStatusParams = {
    name: string;
    userIdList: string[];
  };

  type findTaskIdByCaseNoParams = {
    caseNo: string;
  };

  type findTaskListByProcInstIdParams = {
    procInstId: string;
  };

  type findTaskVolumeParams = {
    domain: string;
    claimNo: string;
  };

  type findUncloseCaseInfoParams = {
    policyNo: string;
    caseCategory: string;
  };

  type findUnCloseCaseTaskInfoByPolicyIdAndBusinessCodeParams = {
    policyNo: string;
    businessCode: string;
  };

  type findUnknownDocParams = {
    caseNo: string;
  };

  type findUserIdByTaskId1Params = {
    taskId: string;
    name: string;
  };

  type findUserIdByTaskIdParams = {
    taskId: string;
    name: string;
  };

  type FlowModeTask = {
    taskId?: string;
    processInstanceId?: string;
    activityName?: string;
    assignee?: string;
    dueDate?: string;
    occurredTime?: string;
    taskDefKey?: string;
    caseCategory?: string;
  };

  type FlowModeTaskParam = {
    processDefId?: string;
    caseCategory?: string;
    assignees?: string[];
    processActivityKey?: string;
  };

  type genDocIdParams = {
    docTypeCode: string;
    parentClaimNo: string;
  };

  type getActivityStatusByProcInstIdParams = {
    processInstanceId: string;
  };

  type getActivityStatusByTaskIdParams = {
    taskId: string;
  };

  type getActivityTaskListParams = {
    processInstanceId: string;
  };

  type getAutoActivityValueByClaimNoParams = {
    businessNo: string;
  };

  type getAutoRuleArgsParams = {
    caseNo: string;
  };

  type getBusinessByCaseNoParams = {
    caseNo: string;
  };

  type getBusinessDataParams = {
    processInstanceId: string;
  };

  type getBusinessProcessByCaseNoListParams = {
    caseNoList: string[];
    status: string;
  };

  type getBusinessProcessByCaseNoParams = {
    caseNo: string;
  };

  type getBusinessProcessByPolicyNoAndBusinessTypeParams = {
    policyNo: string;
    businessType: string;
  };

  type getBusinessProcessByPolicyNoAndCaseCategoryParams = {
    policyNo: string;
    caseCategory: string;
  };

  type getBusinessProcessWithLatestFullStpParams = {
    caseNo: string;
  };

  type getByJobId1Params = {
    jobId: string;
  };

  type getByJobIdParams = {
    jobId: string;
  };

  type getCaseAfterManualUwWithSpecialErrorParams = {
    needUseLaPolicyStatus?: string;
  };

  type getCaseHisVariablesParams = {
    caseNo: string;
  };

  type getCaseNoListByInquiryBusinessNoParams = {
    inquiryBusinessNo: string;
    caseCategory?: string;
  };

  type getCaseNoListByInquiryClaimNoParams = {
    inquiryBusinessNo: string;
    caseCategory?: string;
  };

  type getCaseNoListParams = {
    businessNo: string;
    caseCategory?: string;
  };

  type getCaseNoListV2Params = {
    businessNo: string;
    caseCategory?: string;
  };

  type getCaseNoParams = {
    businessNo: string;
    caseCategory?: string;
  };

  type getClaimCaseNoParams = {
    claimNo: string;
    caseCategory?: string;
  };

  type getCommentsByBusinessNoParams = {
    businessNo: string;
  };

  type getCompleteTaskByCaseNoParams = {
    caseNo: string;
  };

  type getCurrentAssigneeByBusinessNoParams = {
    businessNo: string;
  };

  type getCurrentAssigneeListByInquiryBusinessNoParams = {
    inquiryBusinessNo: string;
  };

  type getCurrentCaseAndTaskInfoByCaseNoParams = {
    processInstanceId: string;
  };

  type getCurrentTaskByCaseNoParams = {
    caseNo: string;
  };

  type getCurrentTaskByTaskIdParams = {
    taskId: string;
  };

  type getCurrentTaskByTaskIdV2Params = {
    taskId: string;
  };

  type getCurrentTaskIdByCaseNoParams = {
    caseNo: string;
  };

  type getCurrentTaskSlaByCaseNoParams = {
    processInstanceId: string;
  };

  type getDashBoardDataParams = {
    startTime: string;
    endTime: string;
  };

  type getDefaultActivityParams = {
    dataKey: string;
    dataValue: string;
  };

  type getDeploymentParams = {
    deploymentId: string;
  };

  type getEncryptionConfigureParams = {
    objectName: string;
  };

  type getFavoriteTaskParams = {
    userId: string;
    taskId: string;
  };

  type getFullStpFLagByBusinessNoParams = {
    businessNo: string;
  };

  type getHolidayByRegionAndTimeRangeParams = {
    regionCode: string;
    startDate: string;
    endDate: string;
  };

  type getHolidaysSettingParams = {
    regionCode: string;
  };

  type getInfoByCaseNoAndCategoryParams = {
    caseNo: string;
  };

  type getInfoReasonByCaseNoAndCategoryParams = {
    caseNo: string;
    categoryCode: string;
  };

  type getInformationGroupParams = {
    groupCodes: string[];
    businessCode: string;
  };

  type getLastAssigneeOfSameActivityByBusinessNoParams = {
    businessNo: string;
    activityKey: string;
  };

  type getLastAssigneeOfSameActivityParams = {
    processInstanceId: string;
    activityKey: string;
  };

  type getLastTaskParams = {
    claimNo: string;
    caseCategory: string;
  };

  type getLatestActiveProcessParams = {
    inquiryBusinessNo: string;
    caseCategory: string;
  };

  type getLatestAssigneeByCaseNoAndActivityKeyParams = {
    caseNo: string;
    activityKey: string;
  };

  type getLatestAssigneeByCaseNoParams = {
    caseNo: string;
  };

  type getLatestAssigneeByCaseNoV2Params = {
    caseNo: string;
  };

  type getLatestInfoForIntegrationParams = {
    taskId: string;
    category: string;
    integrationCode: string;
  };

  type getLogConfigCacheParams = {
    logName: string;
  };

  type getMachineConfigParams = {
    configKey: string;
  };

  type getManuallyWorkflowParams = {
    caseNo: string;
  };

  type getMCSCommentsByBusinessNoParams = {
    businessNo: string;
  };

  type getModelResourceParams = {
    processDefinitionId: string;
  };

  type getNewestInformationParams = {
    inquiryBusinessNo: string;
    category: string;
  };

  type getNextActivityByCaseNoParams = {
    caseNo: string;
  };

  type getPreApprovalValueParams = {
    inquiryBusinessNo: string;
  };

  type getProcessBusinessFlagsParams = {
    caseNo: string;
  };

  type getProcessByCaseNoParams = {
    caseNo: string;
  };

  type getProcessCreatorParams = {
    caseNo: string;
  };

  type getProcessDefinition1Params = {
    processDefinitionId: string;
  };

  type getProcessDefinitionParams = {
    caseCategory: string;
  };

  type getProcessInstanceHistoryByBusinessNoParams = {
    businessNo: string;
  };

  type getProcessInstanceHistoryByCaseNoParams = {
    caseNo: string;
  };

  type getProcessJobInfo1Params = {
    caseNo: string;
  };

  type getProcessJobInfo2Params = {
    caseNo: string;
  };

  type getProcessJobInfoParams = {
    caseNo: string;
  };

  type getQcPassDateParams = {
    applicationNo: string;
  };

  type getQueueMessageBySubmissionIdParams = {
    submissionId: string;
  };

  type getRegisterTaskParams = {
    businessNo: string;
  };

  type getRelatedCaseParams = {
    caseNo: string;
    relationShip: string;
  };

  type getRemarksParams = {
    insuredId: string;
  };

  type getStpFlagByBusinessNoParams = {
    businessNo: string;
  };

  type getSubmissionChannelByCaseNoParams = {
    processInstanceId: string;
  };

  type getTaskAssigneeByTaskIdParams = {
    taskId: string;
  };

  type getTaskByBusinessNoV2Params = {
    businessNo: string;
  };

  type getTaskByTaskIdParams = {
    taskId: string;
  };

  type getTriggerPointParams = {
    caseCategory: string;
    activityCode: string;
    showSwitch?: string;
  };

  type getUnclosedByCaseNoParams = {
    caseNo: string;
  };

  type getVipFlagByBusinessNoParams = {
    businessNo: string;
  };

  type hasPendingForFactConfirmationParams = {
    processInstanceId: string;
  };

  type HistoricTaskInstance = {
    startTime?: string;
    durationInMillis?: number;
    endTime?: string;
    deleteReason?: string;
    workTimeInMillis?: number;
    completedBy?: string;
    name?: string;
    priority?: number;
    id?: string;
    state?: string;
    owner?: string;
    scopeId?: string;
    parentTaskId?: string;
    processDefinitionId?: string;
    executionId?: string;
    processInstanceId?: string;
    processVariables?: Record;
    taskLocalVariables?: Record;
    category?: string;
    description?: string;
    tenantId?: string;
    propagatedStageInstanceId?: string;
    assignee?: string;
    formKey?: string;
    claimTime?: string;
    dueDate?: string;
    scopeDefinitionId?: string;
    scopeType?: string;
    taskDefinitionKey?: string;
    subScopeId?: string;
    createTime?: string;
    taskDefinitionId?: string;
    caseVariables?: Record;
    inProgressStartTime?: string;
    inProgressStartedBy?: string;
    claimedBy?: string;
    suspendedTime?: string;
    suspendedBy?: string;
    inProgressStartDueDate?: string;
    identityLinks?: IdentityLinkInfo[];
    time?: string;
  };

  type HolidaySetting = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    name?: string;
    type?: number;
    region?: string;
    holiday?: string;
    isCompensation?: number;
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

  type IdentityLinkInfo = {
    type?: string;
    scopeId?: string;
    processInstanceId?: string;
    userId?: string;
    groupId?: string;
    taskId?: string;
    scopeDefinitionId?: string;
    scopeType?: string;
    subScopeId?: string;
  };

  type IgnoreFieldConfig = {
    ignoreFieldKeyList?: string[];
    ignoreType?: string;
    criteria?: QueryConfig[];
  };

  type Indicator = {
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
    fastLoan?: string;
    ageCross?: string;
    caseNo?: string;
    businessNo?: string;
    caseLabelList?: BpmCaseLabelVO[];
  };

  type InfoCategoryReasonVO = {
    reasonCode?: string;
    reasonType?: string;
    isDefault?: number;
    canHide?: number;
  };

  type InfoReasonDetailDO = {
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
    reasonTypeOrder?: number;
    informationId?: string;
    typeCode?: string;
  };

  type InfoReasonType = {
    fieldName?: string;
    typeCode?: string;
    descriptionTypeCode?: string;
    reasonTypeOrder?: number;
    value?: InfoCategoryReasonVO[];
  };

  type InformationCategoryVO = {
    categoryCode?: string;
    informationList?: SortedInformationVO[];
  };

  type InformationDataVO = {
    informationDOList?: InformationDO[];
    informationLinkToDOList?: InformationLinkToDO[];
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
    readFlag?: number;
    caseCategory?: string;
    reason?: string;
    reasonType?: string;
    itemCode?: string;
    batchOrder?: number;
    integrationCode?: string;
    linkToInquiryNo?: boolean;
    integrationProcessKey?: string;
    sendEmail?: number;
  };

  type InformationGroupsVO = {
    groupCodes?: string[];
    informationGroups?: Record;
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
    readFlag?: number;
    caseCategory?: string;
    reason?: string;
    reasonType?: string;
    itemCode?: string;
    batchOrder?: number;
    integrationCode?: string;
    linkToInquiryNo?: boolean;
    integrationProcessKey?: string;
    sendEmail?: number;
    informationLinkToList?: InformationLinkToVO[];
    referenceCode?: string;
    businessCode?: string;
    creatorName?: string;
    infoReasons?: InfoReasonDetailDO[];
  };

  type InitialProcessDocument = {
    documentId?: string;
    documentType?: string;
    variables?: string;
  };

  type InitialProcessQueueParam = {
    submissionId?: string;
    caseId?: string;
    activityKey?: string;
    activityType?: string;
    processType?: string;
    batchId?: string;
    caseCategory?: string;
    submissionData?: SubmissionData;
    documentList?: InitialProcessDocument[];
  };

  type InquiryBusinessNoInfoParam = {
    inquiryBusinessNo?: string;
    category?: string;
  };

  type InquiryBusinessObjectVO = {
    businessNo?: string;
    inquiryBusinessNo?: string;
    caseNo?: string;
  };

  type InquiryParamVO = {
    processInstanceId?: string;
  };

  type InsuredDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    claimNo: string;
    insuredId?: string;
    firstName: string;
    surname: string;
    identityType: string;
    identityNo: string;
    gender: string;
    nationality?: string;
    dateOfBirth: string;
    currentState: string;
    dateTimeOfDeath?: string;
    occupation?: string;
    phoneNo?: string;
    email?: string;
    address?: string;
  };

  type IntegratedPendInfoVO = {
    taskStatus?: string;
    currentPendInfo?: PendQueryVO;
    historicalPendInfo?: PendQueryVO;
  };

  type InterfaceIdentifyBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    interfaceId?: string;
    regionCode?: string;
    interfaceName?: string;
    description?: string;
    interfaceCode?: string;
    submissionIdentifyConfigList?: SubmissionIdentifyDO[];
  };

  type isCurrentTaskByTaskIdParams = {
    taskId: string;
  };

  type LinkToCaseParam = {
    linkToCaseNo?: string;
    documentIds?: string[];
  };

  type listActivityButton1Params = {
    taskId: string;
  };

  type listActivityButtonParams = {
    taskId: string;
  };

  type listActivityByCaseCategoryParams = {
    caseCategory: string;
  };

  type listAssigneesQueryParams = {
    caseCategory: string;
    activityKey: string;
    businessNo: string;
  };

  type listAssigneesTaskNum1Params = {
    caseCategory: string;
    activityKey: string;
    claimNo: string;
  };

  type listAssigneesTaskNumParams = {
    caseCategory: string;
    activityKey: string;
    claimNo: string;
  };

  type listAutoActByProcDefIdsParams = {
    procDefIds: string[];
  };

  type listBizProcessByTaskIdsParams = {
    taskIds: string[];
  };

  type listBusinessProcessByInquiryBusinessNoParams = {
    inquiryBusinessNo: string;
  };

  type listByCaseCategoryStatusParams = {
    caseCategory: string;
    status: string;
  };

  type listExternalUsersByType1Params = {
    type: string;
  };

  type listExternalUsersByTypeParams = {
    'External user type': string;
  };

  type listFormerCasesParams = {
    businessNos: string[];
    nextProcess: string;
  };

  type listIntegratedPendInfoParams = {
    processInstanceId: string;
    taskId?: string;
  };

  type listLatestTasksByBusinessNoParams = {
    businessNo: string;
  };

  type listMainActivityKeyParams = {
    businessCode: string;
  };

  type listProcessActByProcDefIdParams = {
    procDefId: string;
  };

  type listProcessByBusinessNoParams = {
    businessNo: string;
  };

  type listProcessTracesParams = {
    caseNo: string;
    order?: string;
  };

  type listTaskByCaseNoParams = {
    caseNo: string;
  };

  type listTaskByClaimNosParams = {
    claimNos: string[];
  };

  type listTaskByPolicyNoParams = {
    caseCategory: string;
    activity: string;
    policyNo: string;
  };

  type listUsersWithCurrentTaskAmountParams = {
    userIds: string[];
  };

  type listUsersWithTotalTaskAmountParams = {
    userIds: string[];
  };

  type loadActivityCategoryParams = {
    taskId?: string;
    caseNo: string;
    userId: string;
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

  type logTaskTrackParams = {
    taskId: string;
    operate: string;
    operateId?: string;
    originalAssignee?: string;
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

  type MainCaseInfoVO = {
    caseNo?: string;
    businessNo?: string;
    caseStatus?: string;
    caseCategory?: string;
    currentActivity?: string;
    currentTaskId?: string;
    autoActivity?: number;
    lastManualTaskId?: string;
  };

  type ManualFlowElementVO = {
    nextActivityKey?: string;
    reject?: boolean;
    end?: boolean;
    activityVariables?: Record;
    auto?: boolean;
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

  type MatchUserGroup = {
    groupCode?: string;
    groupName?: string;
    manuallyAssignmentGroup?: string;
    showMember?: number;
    userIdList?: string[];
    userContactList?: UserContacts[];
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

  type MessageJob = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    jobId?: number;
    serviceName?: string;
    taskId?: string;
    processInstanceId?: string;
    processDefinitionId?: string;
    processActivityKey?: string;
    caseCategory?: string;
    params?: string;
    status?: string;
    finalStatus?: string;
    startTime?: string;
    endTime?: string;
    retryCount?: number;
    errorCause?: string;
    hostName?: string;
    assignee?: string;
    systemStatus?: string;
    language?: string;
    variables?: Record;
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

  type MigrationInformationDataVO = {
    oldCaseData?: TaskDetail;
    newCaseData?: TaskDetail;
    informationData?: InformationDataVO;
    dictMappingDataVOList?: DictMappingDataVO[];
    key?: MigrationDataKey;
  };

  type mockSendCaseRegistrationInitQueueParams = {
    queueContent: string;
  };

  type mockSendQueueParams = {
    name: string;
    queueContent: string;
    addSuffix?: boolean;
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

  type ObjectCompareResult = {
    equalFieldList?: string[];
    failFieldList?: string[];
    lackFieldList?: string[];
    abundantFieldList?: string[];
    existDiff?: boolean;
  };

  type OperateInfoBean = {
    operate?: string;
    operateTime?: string;
  };

  type OverDueTask = {
    taskId?: string;
    processInstanceId?: string;
    caseCategory?: string;
    activityName?: string;
    taskDefKey?: string;
    assignee?: string;
    slaPercent?: number;
    caseSlaPercent?: number;
    remainingTime?: number;
    caseRemainingTime?: number;
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

  type PageActivitySLADetail = {
    totalPage?: number;
    pageSize?: number;
    currentPage?: number;
    sortName?: string;
    sortOrder?: string;
    total?: number;
    startPage?: number;
    params?: Record;
    offset?: number;
    rows?: ActivitySLADetail[];
    firstResult?: number;
  };

  type PageCaseRelationship = {
    totalPage?: number;
    pageSize?: number;
    currentPage?: number;
    sortName?: string;
    sortOrder?: string;
    total?: number;
    startPage?: number;
    params?: Record;
    offset?: number;
    rows?: CaseRelationship[];
    firstResult?: number;
  };

  type PageFavouriteActivityVo = {
    totalPage?: number;
    pageSize?: number;
    currentPage?: number;
    sortName?: string;
    sortOrder?: string;
    total?: number;
    startPage?: number;
    params?: Record;
    offset?: number;
    rows?: FavouriteActivityVo[];
    firstResult?: number;
  };

  type PageFavouriteTaskDetailVO = {
    totalPage?: number;
    pageSize?: number;
    currentPage?: number;
    sortName?: string;
    sortOrder?: string;
    total?: number;
    startPage?: number;
    params?: Record;
    offset?: number;
    rows?: FavouriteTaskDetailVO[];
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

  type PagePendInfo = {
    totalPage?: number;
    pageSize?: number;
    currentPage?: number;
    sortName?: string;
    sortOrder?: string;
    total?: number;
    startPage?: number;
    params?: Record;
    offset?: number;
    rows?: PendInfo[];
    firstResult?: number;
  };

  type PagePrioritizedTaskDetailVO = {
    totalPage?: number;
    pageSize?: number;
    currentPage?: number;
    sortName?: string;
    sortOrder?: string;
    total?: number;
    startPage?: number;
    params?: Record;
    offset?: number;
    rows?: PrioritizedTaskDetailVO[];
    firstResult?: number;
  };

  type PagePriorityActivityVO = {
    totalPage?: number;
    pageSize?: number;
    currentPage?: number;
    sortName?: string;
    sortOrder?: string;
    total?: number;
    startPage?: number;
    params?: Record;
    offset?: number;
    rows?: PriorityActivityVO[];
    firstResult?: number;
  };

  type PageTaskDetail = {
    totalPage?: number;
    pageSize?: number;
    currentPage?: number;
    sortName?: string;
    sortOrder?: string;
    total?: number;
    startPage?: number;
    params?: Record;
    offset?: number;
    rows?: TaskDetail[];
    firstResult?: number;
  };

  type PageTaskSLADetail = {
    totalPage?: number;
    pageSize?: number;
    currentPage?: number;
    sortName?: string;
    sortOrder?: string;
    total?: number;
    startPage?: number;
    params?: Record;
    offset?: number;
    rows?: TaskSLADetail[];
    firstResult?: number;
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
    reminders?: PendReminder[];
    pendingCaseCategories?: string[];
    subCaseProcessInstanceId?: string;
    applicationNo?: string;
    triggerCaseProcInstId?: string;
    pendingPageType?: string;
    pendingActions?: string;
    region?: string;
    reminderSendNotice?: number;
    businessNo?: string;
    sendPendingType?: string;
    inquiryBusinessNo?: string;
    caseCategory?: string;
    subCaseCategory?: string;
    permissionLimitResults?: PermissionLimitResult[];
    sendPendingControl?: boolean;
    pendingUserInfos?: PendingUserInfoVO[];
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
    pendingToRoleString?: string;
    pendingToRoles?: string[];
    pendingTo?: string;
    overdue?: number;
    sendDate?: string;
    reminderDispatchDate?: string;
    reminderSendDate?: string;
  };

  type pendTaskParams = {
    caseNo: string;
  };

  type pendTaskV2Params = {
    caseNo: string;
  };

  type PermissionLimitResult = {
    categoryCode?: string;
    result?: boolean;
    scopeResult?: number;
    errorCode?: string;
    equalsAttrs?: string;
    limitResult?: string[];
  };

  type PermissionTeam = {
    teamCode?: string;
    teamName?: string;
    teamGroupUserList?: TeamGroupUser[];
  };

  type PermissionTeamUserResultVO = {
    havePermissionUserInfoList?: UserContacts[];
    teamList?: PermissionTeam[];
  };

  type PermissionUserInfoResultVO = {
    havePermissionUserInfoList?: UserContacts[];
    userGroupInfoList?: UserGroupResultVO[];
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

  type PrioritizedTaskDetailVO = {
    id?: string;
    taskId?: string;
    batchNo?: string;
    slaRemainTime?: number;
    sla?: number;
    insured?: string;
    caseNo?: number;
    currentActivityName?: string;
    caseCategory?: string;
    taskPriorityScore?: TaskPriorityScore;
    assignee?: string;
    taskStatus?: string;
    caseSla?: number;
    favouriteTime?: string;
    businessNo?: string;
    dueDate?: string;
    caseDueDate?: string;
    taskDefKey?: string;
    requestType?: string;
    remainingTime?: number;
  };

  type PriorityActivityVO = {
    caseNo?: number;
    taskId?: string;
    caseCategory?: string;
    insured?: string;
    batchNo?: string;
    taskStatus?: string;
    claimNo?: string;
    taskRemainingTime?: number;
    caseRemainingTime?: number;
    creationDate?: string;
    caseDueDate?: string;
    taskDueDate?: string;
    endTime?: string;
    taskDefKey?: string;
    slaActivityPercentage?: number;
    slaCasePercentage?: number;
    inquiryClaimNo?: string;
    isUrgent?: number;
  };

  type ProcessActivity = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
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
    endPause?: number;
    pageController?: string;
    operableActivity?: number;
    operableActivityAssigneeReference?: string;
    businessCode?: string;
    caseNo?: string;
    status?: string;
    businessNo?: string;
    currentActivity?: string;
    currentAssignee?: string;
    systemActivity?: boolean;
  };

  type ProcessActivityVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
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
    endPause?: number;
    pageController?: string;
    operableActivity?: number;
    operableActivityAssigneeReference?: string;
    businessCode?: string;
    caseNo?: string;
    status?: string;
    businessNo?: string;
    currentActivity?: string;
    currentAssignee?: string;
    assignee?: string;
    startTime?: string;
    endTime?: string;
    processActivityStatus?: string;
    splitCaseSkip?: boolean;
    taskId?: string;
    sortOrder?: number;
    systemActivity?: boolean;
  };

  type ProcessBusinessFlagVO = {
    urgent?: number;
    editFlag?: string;
    createLocation?: string;
    passStpRule?: number;
    passAdminRule?: number;
    fullStp?: string;
    withdraw?: boolean;
    notWait?: boolean;
    appealFlag?: number;
    isSta?: string;
    preDefineDecisionInd?: boolean;
    vip?: number;
    ocrFlag?: string;
    medCase?: boolean;
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

  type ProcessDefinition = {
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
    applicableStp?: string;
    businessCode?: string;
    priorityLevel?: number;
    applicableAdminRule?: string;
    isMainProcess?: string;
    mainActivityKey?: string;
  };

  type ProcessDefinitionResponse = {
    id?: string;
    url?: string;
    key?: string;
    version?: number;
    name?: string;
    description?: string;
    tenantId?: string;
    deploymentId?: string;
    deploymentUrl?: string;
    resource?: string;
    diagramResource?: string;
    category?: string;
    graphicalNotationDefined?: boolean;
    suspended?: boolean;
    startFormDefined?: boolean;
  };

  type ProcessDefinitionStatus = {
    processDefId?: string;
    caseCategory?: string;
    processActivityKey?: string;
    variables?: Record;
    assignee?: string;
    isWarning?: boolean;
    organizationMemberList?: string[];
    taskOrder?: number;
  };

  type ProcessDetail = {
    id?: string;
    processDefId?: string;
    processName?: string;
    caseCategory?: string;
    processActivities?: ProcessActivity[];
  };

  type ProcessInfoVO = {
    parentId?: string;
    processInstanceId?: string;
    taskId?: string;
    messageJobId?: number;
    status?: '0' | '1';
    processDefinitionId?: string;
    activityKey?: string;
    assignee?: string;
    caseCategory?: string;
    businessNo?: string;
    submissionDate?: string;
    createFlag?: boolean;
  };

  type ProcessInstance = {
    name?: string;
    localizedName?: string;
    processDefinitionId?: string;
    processVariables?: Record;
    description?: string;
    suspended?: boolean;
    tenantId?: string;
    deploymentId?: string;
    startUserId?: string;
    startTime?: string;
    businessKey?: string;
    businessStatus?: string;
    callbackId?: string;
    callbackType?: string;
    processDefinitionKey?: string;
    processDefinitionName?: string;
    localizedDescription?: string;
    processDefinitionVersion?: number;
    processDefinitionCategory?: string;
    id?: string;
    processInstanceId?: string;
    ended?: boolean;
    activityId?: string;
    referenceId?: string;
    referenceType?: string;
    propagatedStageInstanceId?: string;
    parentId?: string;
    superExecutionId?: string;
    rootProcessInstanceId?: string;
  };

  type ProcessInstanceHistory = {
    processInstanceId?: string;
    startTime?: string;
    endTime?: string;
  };

  type ProcessJobInfoDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    jobId?: string;
    caseNo?: string;
    overdueTime?: string;
    startTime?: string;
    endTime?: string;
    jobParams?: string;
    retryNum?: number;
    manualExtendTime?: string;
    status?: string;
    executeStatus?: number;
    executeFailRetry?: number;
    manualExtend?: boolean;
  };

  type ProcessParam = {
    processInstanceId?: string;
    processDefinitionId?: string;
    caseCategory?: string;
    deploymentId?: string;
    deleteReason?: string;
    cascade?: boolean;
    suspendInstances?: boolean;
    variables?: Record;
    manual?: boolean;
    businessData?: Record;
  };

  type ProcessQueryRequestVO = {
    inquiryBusinessNo?: string;
    businessNo?: string;
    caseNo?: string;
  };

  type ProcessQueryResponseVO = {
    inquiryBusinessNo?: string;
    qcSamplingResult?: boolean;
    hasReversal?: boolean;
    mainCaseInfo?: MainCaseInfoVO;
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

  type queryOperatorAndCostTimeParams = {
    startTime: string;
    endTime: string;
  };

  type querySPApprovalRequestByCaseNoParams = {
    caseNo: string;
  };

  type QueueRelevantCaseActionVO = {
    operationType?: string;
    claimNo?: string;
    operationDate?: string;
    operator?: string;
    updateData?: Record;
    subClaimNo?: string;
  };

  type reAssignByCaseNoParams = {
    caseNo: string;
  };

  type RegisterTask = {
    taskId?: string;
    activityKey?: string;
    processInstanceId?: string;
  };

  type RelatedCaseVO = {
    caseNo?: string;
    relationship?: string;
    subCaseRelationShipWithCase?: string;
    taskId?: string;
    dataType?: string;
    copyData?: number;
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

  type RestVariable = {
    name?: string;
    type?: string;
    value?: Record;
    valueUrl?: string;
    scope?: string;
  };

  type ResultVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOActionUserInfo = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ActionUserInfo;
    promptMessages?: PromptMessage[];
  };

  type ResultVOActivityCategoryLinkDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ActivityCategoryLinkDO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOActivityDetail = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ActivityDetail;
    promptMessages?: PromptMessage[];
  };

  type ResultVOAutoTaskMonitorInfo = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: AutoTaskMonitorInfo;
    promptMessages?: PromptMessage[];
  };

  type ResultVOBizObjReadRecordRequestVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: BizObjReadRecordRequestVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOBoolean = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: boolean;
    promptMessages?: PromptMessage[];
  };

  type ResultVOBusinessData = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: BusinessData;
    promptMessages?: PromptMessage[];
  };

  type ResultVOBusinessProcess = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: BusinessProcess;
    promptMessages?: PromptMessage[];
  };

  type ResultVOBusinessTransactionProcess = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: BusinessTransactionProcess;
    promptMessages?: PromptMessage[];
  };

  type ResultVOButtonLinkCategoryResult = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ButtonLinkCategoryResult;
    promptMessages?: PromptMessage[];
  };

  type ResultVOCaseSubmitVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CaseSubmitVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOCaseTaskVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CaseTaskVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOCheckMainActivityResponse = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CheckMainActivityResponse;
    promptMessages?: PromptMessage[];
  };

  type ResultVOCompleteTaskBOV2 = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CompleteTaskBOV2;
    promptMessages?: PromptMessage[];
  };

  type ResultVOConcurrentHashMapStringLogExtendConfigVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOCustomerTypeConfigDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CustomerTypeConfigDO;
    promptMessages?: PromptMessage[];
  };

  type ResultVODate = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: string;
    promptMessages?: PromptMessage[];
  };

  type ResultVODeploymentResponse = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: DeploymentResponse;
    promptMessages?: PromptMessage[];
  };

  type ResultVOFavoriteProcessInfo = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: FavoriteProcessInfo;
    promptMessages?: PromptMessage[];
  };

  type ResultVOInfoReasonType = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: InfoReasonType;
    promptMessages?: PromptMessage[];
  };

  type ResultVOInformationGroupsVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: InformationGroupsVO;
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

  type ResultVOListAABusinessTask = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: AABusinessTask[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListActivityButton = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ActivityButton[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListActRuVariableVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ActRuVariableVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListAssigneeTaskSummaryVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: AssigneeTaskSummaryVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListBatchProcessInstance = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: BatchProcessInstance[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListBpmCfgInfoGroupDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: BpmCfgInfoGroupDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListBusinessProcess = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: BusinessProcess[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListBusinessProcessTaskVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: BusinessProcessTaskVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListCaseRelationship = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CaseRelationship[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListCfgCaseLabelVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CfgCaseLabelVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListCfgToolBarAutoExpandDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CfgToolBarAutoExpandDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListExceptionMessage = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ExceptionMessage[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListExternalUser = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ExternalUser[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListFlowModeTask = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: FlowModeTask[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListHistoricTaskInstance = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: HistoricTaskInstance[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListHolidaySetting = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: HolidaySetting[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListIndicator = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Indicator[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListInfoReasonType = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: InfoReasonType[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListInformationCategoryVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: InformationCategoryVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListInformationDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: InformationDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListInformationVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: InformationVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListMapStringObject = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListOverDueTask = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: OverDueTask[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListProcessActivity = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ProcessActivity[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListProcessActivityVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ProcessActivityVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListProcessDefinition = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ProcessDefinition[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListProcessDefinitionStatus = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ProcessDefinitionStatus[];
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

  type ResultVOListSideBarDisplayConfigVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: SideBarDisplayConfigVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListString = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: string[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListTaskCount = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: TaskCount[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListTaskDetail = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: TaskDetail[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListThPendPolicyReasonVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ThPendPolicyReasonVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListUDRelationTaskVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: UDRelationTaskVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListUserProcessDefinition = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: UserProcessDefinition[];
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

  type ResultVOMapStringListProcessActivity = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOMapStringListString = {
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

  type ResultVOMigrationInformationDataVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: MigrationInformationDataVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOObject = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPageActivitySLADetail = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PageActivitySLADetail;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPageCaseRelationship = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PageCaseRelationship;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPageFavouriteActivityVo = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PageFavouriteActivityVo;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPageFavouriteTaskDetailVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PageFavouriteTaskDetailVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPageInformationDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PageInformationDO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPagePrioritizedTaskDetailVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PagePrioritizedTaskDetailVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPagePriorityActivityVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PagePriorityActivityVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPageTaskDetail = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PageTaskDetail;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPageTaskSLADetail = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PageTaskSLADetail;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPermissionTeamUserResultVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PermissionTeamUserResultVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPermissionUserInfoResultVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PermissionUserInfoResultVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOProcessDefinition = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ProcessDefinition;
    promptMessages?: PromptMessage[];
  };

  type ResultVOProcessDefinitionResponse = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ProcessDefinitionResponse;
    promptMessages?: PromptMessage[];
  };

  type ResultVOProcessInfoVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ProcessInfoVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOProcessInstance = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ProcessInstance;
    promptMessages?: PromptMessage[];
  };

  type ResultVOProcessInstanceHistory = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ProcessInstanceHistory;
    promptMessages?: PromptMessage[];
  };

  type ResultVOProcessJobInfoDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ProcessJobInfoDO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOProcessQueryResponseVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ProcessQueryResponseVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOResponseEntityByteArray = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: string[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOString = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: string;
    promptMessages?: PromptMessage[];
  };

  type ResultVOTaskDetail = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: TaskDetail;
    promptMessages?: PromptMessage[];
  };

  type ResultVOTaskInfo = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: TaskInfo;
    promptMessages?: PromptMessage[];
  };

  type ResultVOTaskResponse = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: TaskResponse;
    promptMessages?: PromptMessage[];
  };

  type ResultVOVoid = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOWorkflowVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: WorkflowVO;
    promptMessages?: PromptMessage[];
  };

  type resumeTaskParams = {
    caseNo: string;
  };

  type resumeTaskWithActionTypeParams = {
    caseNo: string;
    actionType: string;
  };

  type reTriggerSubProcessJobParams = {
    requestVO: TriggerProcessRequestVO;
  };

  type revertParams = {
    currentTaskId: string;
  };

  type RuleCommonRpcFactInfoVO = {
    objClassType?: string;
    objJsonContent?: string;
  };

  type saveEnvoyInfoParams = {
    caseNo: string;
    caseCategory: string;
    activityKey: string;
    content: string;
  };

  type saveInformationByBusinessNoListParams = {
    businessNoList: string[];
    content: string;
    category: string;
  };

  type sendEmailParams = {
    informationId: string;
  };

  type SideBarDisplayConfigVO = {
    pageController?: string;
    insured?: number;
    information?: number;
    envoy?: number;
    caseCategory?: string;
    activityKey?: string;
  };

  type SortedInformationVO = {
    procActivityKey?: string;
    caseCategory?: string;
    recordFormatting?: string;
    creator?: string;
    creationDate?: string;
    informationDOList?: InformationVO[];
  };

  type SpecialHandlingBpmResultVO = {
    isNtu?: string;
    isWithdraw?: string;
  };

  type SpecialHandlingParam = {
    applicationNo?: string;
    isWithDraw?: string;
    isNtu?: string;
    systemRemark?: string;
  };

  type SplitCaseSubmitVO = {
    originalCase?: CaseSubmitVO;
    newCase?: CaseSubmitVO;
    newRemark?: string;
    originalRemark?: string;
  };

  type SplitRemarkVO = {
    businessNo?: string;
    caseNo?: string;
    splitRemark?: string;
  };

  type startProcessInstance2Params = {
    messageJobId: number;
  };

  type startScheduleParams = {
    startTime: string;
    periodTime: string;
  };

  type StatsBusinessDataBean = {
    taskInfo?: StatTaskInfoBean;
    operateInfoList?: OperateInfoBean[];
    envoyInfoList?: StatsEnvoyInfoBean[];
    infoList?: StatsInformationBean[];
    caseLabelList?: StatsCaseLabelBean[];
    hisTaskList?: StatTaskInfoBean[];
  };

  type StatsCaseEvent = {
    eventType?: number;
    caseNo?: string;
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    taskId?: string;
    activityKey?: string;
    businessCode?: string;
    businessData?: StatsBusinessDataBean;
  };

  type StatsCaseLabelBean = {
    labelCode?: string;
    labelValue?: string;
  };

  type StatsEnvoyInfoBean = {
    groupCode?: string;
    inquiryBusinessNo?: string;
    caseNo?: string;
    caseCategory?: string;
    enableAutoPend?: boolean;
    isInternal?: number;
    status?: string;
    startTime?: string;
    reasonDetails?: StatsEnvoyReasonDetailBean[];
    name?: string;
    ranking?: number;
  };

  type StatsEnvoyPendingMemoBean = {
    memoCode?: string;
    memoStatus?: string;
    subTypeCode?: string;
    memoCategory?: string;
    memoRemark?: string;
    memoDesc?: string;
  };

  type StatsEnvoyReasonDetailBean = {
    reasonCode?: string;
    reasonName?: string;
    type?: string;
    pendingMemoList?: StatsEnvoyPendingMemoBean[];
  };

  type StatsInformationBean = {
    category?: string;
    content?: string;
  };

  type StatsInitDataBO = {
    eventType?: string;
    caseNos?: string[];
    caseCategoryList?: string[];
    forceFullInitFlag?: string;
    latestSuccessCaseNo?: string;
  };

  type StatsInitDataVO = {
    eventType?: string;
    caseNos?: string[];
    caseCategoryList?: string[];
    forceFullInitFlag?: string;
  };

  type StatTaskInfoBean = {
    assignee?: string;
    activityName?: string;
    startTime?: string;
    withdrawTime?: string;
  };

  type SubmissionConfigQO = {
    interfaceId?: string;
    businessCode?: string;
    interfaceCode?: string;
  };

  type SubmissionData = {
    date?: string;
    time?: string;
    channel?: string;
    id?: string;
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
  };

  type SubmitUnknownDocCaseVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    caseNo?: string;
    submissionId?: string;
    identityType?: string;
    identityId?: string;
    firstName?: string;
    lastName?: string;
    activityType?: string;
    taskParam?: TaskParam;
    caseId?: string;
    decision?: string;
    resumeCaseIdList?: string[];
  };

  type suspendProcessDefinitionParams = {
    processDefinitionId: string;
    suspendInstance: boolean;
  };

  type TaskAssigneeInfoVO = {
    businessNo?: string;
    assignee?: string;
    endTime?: string;
  };

  type TaskAssignment = {
    taskId?: string;
    assignee?: string;
    assigner?: string;
    caseCategory?: string;
    level?: string;
    assignType?: string;
  };

  type TaskAssignmentVO = {
    caseCategory?: string;
    activityKey?: string;
    taskId?: string;
    caseNo?: string;
    assignee?: string;
  };

  type TaskCompletionVO = {
    caseCategory?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    partyId?: string;
    policyNo?: string;
    businessType?: string;
    clientName?: string;
    agentName?: string;
    businessDecision?: string;
    companyCode?: string;
    businessCode?: string;
    businessTransactionProcess?: BusinessTransactionProcess;
    caseNo?: string;
    taskId?: string;
    activityKey?: string;
    operationType?: string;
    assessmentType?: string;
    businessData?: Record;
    activityVariables?: Record;
    mandatoryDocList?: string[];
    notificationList?: string[];
    informationList?: InformationVO[];
    businessProcessIdList?: string[];
    nextActivityStatus?: string;
  };

  type TaskCount = {
    taskId?: string;
    taskDefKey?: string;
    name?: string;
    count?: number;
    assignee?: string;
    status?: string;
  };

  type TaskDetail = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
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
    activityButtonList?: ActivityButton[];
    caseDueDate?: string;
    submissionDate?: string;
    submissionChannel?: string;
    procActOrder?: number;
    assessmentType?: string;
    submissionId?: string;
    submissionActivityId?: string;
    autoActivity?: number;
    initialDataInherit?: number;
    inheritSource?: number;
    editFlag?: string;
    inquiryBusinessNo?: string;
    createLocation?: string;
    caseStatus?: string;
    editPageStatus?: string;
    isEditPage?: boolean;
    customerType?: string;
    partyId?: string;
    withdraw?: boolean;
    notWait?: boolean;
    businessDecision?: string;
    businessCode?: string;
    companyCode?: string;
    operationDate?: string;
    assignPriority?: string;
    enableInvestigation?: boolean;
    originalSubmissionDate?: string;
    caseType?: string;
    variables?: Record;
  };

  type TaskInfo = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    taskIdList?: string[];
    pending?: boolean;
  };

  type TaskParam = {
    owner?: string;
    assignee?: string;
    delegationState?: string;
    name?: string;
    description?: string;
    dueDate?: string;
    priority?: number;
    parentTaskId?: string;
    category?: string;
    tenantId?: string;
    formKey?: string;
    ownerSet?: boolean;
    assigneeSet?: boolean;
    delegationStateSet?: boolean;
    nameSet?: boolean;
    descriptionSet?: boolean;
    duedateSet?: boolean;
    prioritySet?: boolean;
    parentTaskIdSet?: boolean;
    categorySet?: boolean;
    tenantIdSet?: boolean;
    formKeySet?: boolean;
    taskId?: string;
    deleteReason?: string;
    cascadeHistory?: boolean;
    caseCategory?: string;
    assignees?: string[];
    taskStatus?: string[];
    variables?: Record;
  };

  type TaskPriorityScore = {
    scoreL1?: number;
    scoreL2?: number;
    scoreL3?: number;
    scoreL4?: number;
  };

  type TaskQueryRequestVo = {
    applicationNoList?: string[];
    taskDefKeyList?: string[];
  };

  type TaskRequestParam = {
    taskId?: string;
    variables?: Record;
  };

  type TaskResponse = {
    id?: string;
    url?: string;
    owner?: string;
    assignee?: string;
    delegationState?: string;
    name?: string;
    description?: string;
    createTime?: string;
    dueDate?: string;
    priority?: number;
    suspended?: boolean;
    claimTime?: string;
    taskDefinitionKey?: string;
    scopeDefinitionId?: string;
    scopeId?: string;
    subScopeId?: string;
    scopeType?: string;
    propagatedStageInstanceId?: string;
    tenantId?: string;
    category?: string;
    formKey?: string;
    parentTaskId?: string;
    parentTaskUrl?: string;
    executionId?: string;
    executionUrl?: string;
    processInstanceId?: string;
    processInstanceUrl?: string;
    processDefinitionId?: string;
    processDefinitionUrl?: string;
    variables?: RestVariable[];
  };

  type TaskSLADetail = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    taskId?: string;
    taskDefKey?: string;
    activityName?: string;
    caseCategory?: string;
    processInstanceId?: string;
    processDefId?: string;
    pageController?: string;
    taskStatus?: string;
    assignee?: string;
    taskLevel?: string;
    caseLevel?: string;
    currentTime?: string;
    startTime?: string;
    endTime?: string;
    duration?: number;
    dueDate?: string;
    caseDueDate?: string;
    sla?: number;
    caseSla?: number;
    taskOtTime?: number;
    caseOtTime?: number;
    reassignStatus?: number;
    taskUsedTime?: number;
    caseUsedTime?: number;
    insured?: string;
    remainingTime?: number;
    caseRemainingTime?: number;
    tatUsedHours?: number;
    tatRemainHours?: number;
    tatOtHours?: number;
    tatSla?: number;
    batchNo?: string;
    rejected?: boolean;
    taskOrder?: number;
    completedTime?: string;
    businessNo?: string;
    activityButtonList?: ActivityButton[];
    urgent?: boolean;
  };

  type TaskTrackDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    caseCategory?: string;
    activityKey?: string;
    caseNo?: string;
    taskId?: string;
    operate?: string;
    operateTime?: string;
    operatorId?: string;
    operator?: string;
  };

  type TeamGroupUser = {
    userId?: string;
    groupCode?: string;
    userName?: string;
    status?: number;
    taskNum?: number;
  };

  type testParams = {
    businessNo: string;
    inquiryBusinessNo: string;
  };

  type ThPendPolicyReasonVO = {
    code?: string;
    name?: string;
    requiredDate?: boolean;
    requiredOtherReason?: boolean;
  };

  type toggleUrgentParams = {
    processInstanceId: string;
    urgent: number;
  };

  type TransferTaskTrackVO = {
    taskId?: string;
    operatorId?: string;
    newOperatorId?: string;
    operate?: string;
  };

  type triggerExecutionParams = {
    executionId: string;
  };

  type triggerPaymentTrackProcessParams = {
    processInstanceId: string;
  };

  type TriggerProcessRequestVO = {
    operationType?: string;
    checkExistCaseCategory?: string;
    caseNoList?: string[];
    sqlTemplate?: string;
  };

  type triggerTLICCheckParams = {
    businessNo: string;
  };

  type UDQueryTaskVO = {
    insuredNames?: string[];
    policies?: string[];
    claimNos?: string[];
    caseNos?: string[];
  };

  type UDRelationTaskVO = {
    caseCategory?: string;
    caseNo?: string;
    businessNo?: string;
    parentBusinessNo?: string;
    policies?: string;
    insuredName?: string;
    activity?: string;
    status?: string;
  };

  type updateAssessmentTypeParams = {
    processInstanceId: string;
    assessmentType: string;
  };

  type UpdateConfig = {
    key?: string;
    valueFieldPath?: string;
  };

  type UpdateDataVO = {
    operation?: string;
    requestData?: Record;
  };

  type updateDayEndPauseTimeZoneParams = {
    timeZone: string;
  };

  type updatePendInfoParams = {
    triggerCaseId: string;
    parentCaseId: string;
    id: string;
  };

  type updateRcsAutoSubmissionFlagParams = {
    flag: string;
  };

  type updateStatusManualByCaseNoParams = {
    caseNo: string;
    status: string;
    modifier: string;
  };

  type updateVipFlagByCaseParams = {
    caseNoList: string[];
    vip: number;
  };

  type updateVipFlagParams = {
    businessNoList: string[];
    vip: number;
  };

  type uploadDeploymentParams = {
    deploymentName?: string;
    deploymentKey?: string;
    deploymentCategory?: string;
    tenantId?: string;
    file: string;
  };

  type User = {
    currentTaskAmount?: number;
    totalTaskAmount?: number;
    id?: string;
    joinDay?: number;
    groups?: (
      | 'ClaimAdmin'
      | 'ClaimAssessorD'
      | 'ClaimAssessorND'
      | 'ClaimAssessorSND'
    )[];
    skillSets?: ('SkillSetA' | 'SkillSetB' | 'Medical' | 'NonMedical')[];
    assignmentEvaluation?: AssignmentEvaluation;
  };

  type UserAutoRuleFactInfoInquiryVO = {
    domain?: string;
    userAutoRuleVO?: UserAutoRuleVO;
  };

  type UserAutoRuleVO = {
    taskList?: AutoRuleTaskVO[];
    userId?: string;
    ruleOperationType?: string;
  };

  type UserContacts = {
    userId?: string;
    userAvatar?: string;
    userName?: string;
    gender?: string;
    title?: string;
    status?: number;
    accountStatus?: number;
    chatRoom?: string;
    taskNum?: number;
  };

  type UserGroupResultVO = {
    matchUserGroupList?: MatchUserGroup[];
    allNotMatchIndicator?: boolean;
  };

  type UserProcessDefinition = {
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
    applicableStp?: string;
    businessCode?: string;
    priorityLevel?: number;
    applicableAdminRule?: string;
    isMainProcess?: string;
    mainActivityKey?: string;
    assignee?: string;
    activityColorList?: UserTask[];
    warning?: boolean;
  };

  type UserTask = {
    taskDefKey?: string;
    color?: string;
  };

  type ValidatedResultVO = {
    success?: boolean;
    errorCode?: string;
  };

  type validateSubmissionParams = {
    taskId: string;
  };

  type waiveEnvoyParams = {
    applicationNo: string;
  };

  type WakeUpAssignVO = {
    caseNo?: string;
    checkSubmitPermission?: boolean;
    type?: string;
  };

  type wasCaseRejectedParams = {
    caseNo: string;
  };

  type WorkflowVO = {
    caseNo?: string;
    businessNo?: string;
    caseCategory?: string;
    taskId?: string;
    currentActivityKey?: string;
    autoActivity?: boolean;
    targetActivities?: ManualFlowElementVO[];
  };
}
