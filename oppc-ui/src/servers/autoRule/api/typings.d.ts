declare namespace API {
  type AssignGroupVO = {
    caseNo?: string;
    taskId?: string;
    caseCategory?: string;
    activityKey?: string;
    assignUserGroup?: AssignUserGroup;
    businessNo?: string;
  };

  type AssignResult = {
    assignee?: string;
    unAssignIndicator?: boolean;
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
  };

  type AssignUserGroup = {
    groupCode?: string;
    groupName?: string;
    manuallyAssignmentGroup?: string;
    showMember?: number;
    userIdList?: string[];
  };

  type AutoRuleResponseVO = {
    resultFlag?: string;
    resultList?: string[];
  };

  type AutoRuleTaskVO = {
    processInstanceId?: string;
    taskId?: string;
    caseCategory?: string;
    activityKey?: string;
    taskDefinitionKey?: string;
    autoActivity?: number;
    autoAssign?: number;
    assignee?: string;
    status?: string;
    hisTaskAssignee?: string[];
    systemActivity?: boolean;
  };

  type AutoRuleVO = {
    newTask?: AutoRuleTaskVO;
    previousTask?: AutoRuleTaskVO;
    newActivity?: ProcessActivityVO;
    previousActivity?: ProcessActivityVO;
    posSamePolicyNoTaskList?: AutoRuleTaskVO[];
    sameInsuredTaskList?: AutoRuleTaskVO[];
    originalTaskList?: AutoRuleTaskVO[];
    variables?: Record;
    delegateId?: string;
    checkSubmitPermission?: boolean;
    useSnapShotData?: boolean;
    procInstId?: string;
    claimNo?: string;
    businessType?: string;
    assessmentType?: string;
    businessNo?: string;
    caseCategory?: string;
    previousAssignee?: string;
    type?: string;
    rulingClericalNum?: number;
    srcDocIds?: string[];
    userGroupDOS?: UserGroupDO[];
    activityAssigneeMap?: Record;
    steps?: { empty?: boolean; length?: number };
    companyCode?: string;
    ruleSetId?: string;
    permissionLimitFuncName?: string;
    ruleType?: string;
    operationType?: string;
    taskId?: string;
    taskDefKey?: string;
    manualEscalateSelectedTeam?: string;
    businessData?: Record;
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
      origin?: string;
      range?: HttpRange[];
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
      accessControlAllowHeaders?: string[];
      accessControlAllowMethods?: HttpMethod[];
      accessControlAllowOrigin?: string;
      accessControlExposeHeaders?: string[];
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

  type CfgLogLevelVO = {
    serviceName?: string;
    logName?: string;
    logLevel?: string;
    logExtendName?: string;
    logExtendConfig?: LogExtendConfigVO;
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

  type createIndexParams = {
    indexKey: string;
  };

  type EncoderConfig = {
    algorithm?: string;
    secretKey?: string;
  };

  type executeParams = {
    type: string;
  };

  type ExecuteRuleRequestVO = {
    interfaceId?: string;
    businessCode?: string;
    businessNo?: string;
    policyId?: string;
    requestDate?: string;
    requestType?: string;
    companyCode?: string;
    businessData?: Record;
    domainList?: string[];
    businessDate?: string;
    regionCode?: string;
    ruleSetId?: string;
    processVariables?: OmneProcessVariablesVO;
    documentList?: OmneDocumentVO[];
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

  type getLogConfigCacheParams = {
    logName: string;
  };

  type getMachineConfigParams = {
    configKey: string;
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

  type ObjectCompareResult = {
    equalFieldList?: string[];
    failFieldList?: string[];
    lackFieldList?: string[];
    abundantFieldList?: string[];
    existDiff?: boolean;
  };

  type OmneDocumentVO = {
    docMatchInsuredNamePct?: number;
    docTypeCode?: string;
  };

  type OmneProcessVariablesVO = {
    policyDuration?: number;
    requestPolicyDuration?: number;
    stp?: boolean;
    hourOfDay?: number;
    duplicateClaimSubmission?: boolean;
  };

  type OmneRuleStpResultVO = {
    regionCode?: string;
    stp?: boolean;
    executedRuleNames?: string[];
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

  type PostQcRuleArg = {
    caseCategory?: string;
    postQcResult?: string;
    caseNo?: string;
    activity?: string;
    taskId?: string;
    nextCaseCategory?: string;
    needSubProcess?: string;
    businessNo?: string;
    operationType?: string;
    batchNo?: string;
  };

  type ProcessActivityVO = {
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
    systemActivity?: boolean;
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

  type ResultVOAssignResult = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: AssignResult;
    promptMessages?: PromptMessage[];
  };

  type ResultVOAutoRuleResponseVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: AutoRuleResponseVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOConcurrentHashMapStringLogExtendConfigVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOListMapObjectObject = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListString = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: string[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListUserGroupDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: UserGroupDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOMapObjectObject = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOOmneRuleStpResultVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: OmneRuleStpResultVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPostQcRuleArg = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PostQcRuleArg;
    promptMessages?: PromptMessage[];
  };

  type ResultVORuleCommonRpcArgVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: RuleCommonRpcArgVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOStpCheckingResponseVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: StpCheckingResponseVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOString = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: string;
    promptMessages?: PromptMessage[];
  };

  type ResultVOUserAssignResult = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: UserAssignResult;
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
    requestType?: string;
  };

  type RuleCommonRpcFactInfoVO = {
    objClassType?: string;
    objJsonContent?: string;
  };

  type RuleMonitorInfoVO = {
    startParentSessionId?: string;
    executedRuleNames?: string[];
    notExecutedRuleNames?: string[];
  };

  type RuleStpReportDO = {
    id?: string;
    caseNo?: string;
    ruleName?: string;
    policyNo?: string;
    ruleDesc?: string;
    ruleSetName?: string;
    gmtCreate?: string;
  };

  type StpCheckConfigDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    domain?: string;
    subTypeCode?: string;
    needExternalData?: string;
    businessScope?: string;
    applicationName?: string;
  };

  type StpCheckingRequestVO = {
    interfaceId?: string;
    businessCode?: string;
    businessNo?: string;
    policyId?: string;
    requestDate?: string;
    businessData?: Record;
    domainList?: string[];
    stpCheckConfigList?: StpCheckConfigDO[];
  };

  type StpCheckingResponseVO = {
    stpFlag?: string;
    stpResultList?: string[];
  };

  type UpdateConfig = {
    key?: string;
    valueFieldPath?: string;
  };

  type UserAssignResult = {
    taskId?: string;
  };

  type UserAssignVO = {
    userId?: string;
    unassignedTasks?: AutoRuleTaskVO[];
  };

  type UserGroupDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    userId?: string;
    groupCode?: string;
  };
}
