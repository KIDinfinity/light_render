declare namespace API {
  type ActivityButtonVO = {
    buttonId?: string;
    pageController?: string;
    buttonCode?: string;
    buttonName?: string;
    activityStatus?: string;
    buttonServiceOrder?: number;
    checkInformationApiUrl?: string;
    preSubmitValidationUrl?: string;
    afterHook?: string;
    activityButtonServiceList?: ButtonServiceVO[];
  };

  type ActivityPermissionLimitVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    permissionCode?: string;
    categoryCode?: string;
    limitCode?: string;
    limitValue?: string;
    limitJson?: string;
    errorCode?: string;
    description?: string;
    userId?: string;
    caseCategory?: string;
    activityKey?: string;
    limitJsonObj?: { empty?: boolean; innerMap?: Record };
  };

  type ActivityResourceDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    activityResourceCode?: string;
    processDefId?: string;
    processActivityKey?: string;
    processActivityName?: string;
    processActivityOrder?: number;
    processName?: string;
    caseCategory?: string;
    categoryCode?: string;
    key?: string;
    keyWithCaseCategory?: string;
    procActInfo?: string;
    activityInfo?: string;
  };

  type ActivityResourceVO = {
    activityProcessName?: string;
    activityResourceDOList?: ActivityResourceDO[];
  };

  type AssignmentVO = {
    taskId?: string;
    assignee?: string;
    caseCategory?: string;
    activityKey?: string;
    level?: string;
    caseNo?: string;
    businessNo?: string;
  };

  type AssignPermissionBO = {
    categoryCodeList?: string[];
    permissionType?: string;
    taskInfo?: TaskInfo;
    beAssignedUserId?: string;
    nbPolicyDecisionSummary?: NBPolicyDecisionSummary;
  };

  type AuthorityResultVO = {
    authorityCode?: string;
    type?: string;
    source?: string;
    result?: boolean;
  };

  type AuthorityTypeSubTypeAmount = {
    benefitType?: string;
    benefitSubType?: string;
    amount?: number;
  };

  type AutoRuleTaskVO = {
    processInstanceId?: string;
    taskId?: string;
    caseCategory?: string;
    activityKey?: string;
    taskDefinitionKey?: string;
    assignee?: string;
    status?: string;
  };

  type BatchAssignPermssionVO = {
    caseCategoryAndProcActKeyList?: string[];
    claimActivityPermissionLimitMap?: Record;
    claimActivityPermissionLimitVO?: BusinessActivityPermissionLimitVO;
  };

  type BatchAssignRbacPermissionVO = {
    taskInfoForPermissionList?: TaskInfoForPermission[];
    permissionCategoryCode?: string;
    assignee?: string;
    operationType?: string;
  };

  type BatchHigherAuthorityBusinessData = {
    functionId?: string;
    caseCategoryList?: string[];
  };

  type beAssignedPermissionParams = {
    caseCategory: string;
    actKey: string;
    userId: string;
  };

  type BenefitAuthorityLimit = {
    authorityType?: string;
    policyNo?: string;
    benefitItem?: string[];
    payableAmount?: number;
    payableDays?: number;
    saPercentage?: number;
    payableYears?: number;
  };

  type BusinessActivityPermissionLimitVO = {
    categoryCodeList?: string[];
    taskLimitData?: TaskLimitDataVO;
    claimLimitData?: ClaimLimitDataVO;
    userId?: string;
    skipEditLogCheck?: boolean;
  };

  type ButtonServiceVO = {
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
      range?: HttpRange[];
      connection?: string[];
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
      basicAuth?: string;
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

  type CategoryPermissionResultVO = {
    categoryCode?: string;
    result?: boolean;
  };

  type CfgLogLevelVO = {
    serviceName?: string;
    logName?: string;
    logLevel?: string;
    logExtendName?: string;
    logExtendConfig?: LogExtendConfigVO;
  };

  type CheckPermissionContextVO = {
    taskInfo?: TaskInfo;
    userId?: string;
    srvRbacBizInfo?: SrvRbacBizInfo;
    nbPolicyDecisionSummary?: NBPolicyDecisionSummary;
    claimBusinessInfo?: ClaimBusinessInfo;
    categoryCodeList?: string[];
  };

  type checkUserOwnCreateCaseResource2Params = {
    userId: string;
    resourceCode: string;
  };

  type ClaimBusinessInfo = {
    totalPayableAmount?: number;
    claimType?: string[];
    claimDecision?: string;
    taskId?: string;
    benefitProceedType?: string[];
    fetchBusinessDataSuccess?: boolean;
  };

  type ClaimLimitDataVO = {
    totalPayableAmount?: number;
    claimType?: string[];
    benefitProceedType?: string[];
    claimNo?: string;
    assessmentDecision?: string;
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

  type CoverageInfo = {
    productCode?: string;
    decision?: string;
    loadingInfoList?: Record;
    exclusionList?: string[];
  };

  type createIndexParams = {
    indexKey: string;
  };

  type DataMaskingDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    dataMaskingCode?: string;
    applicationModule?: string;
    controlValue?: string;
    limitType?: string;
  };

  type DataResourceDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    dataResourceCode?: string;
    tableName?: string;
    fieldName?: string;
    operationType?: string;
    compareType?: string;
    limitedValue?: string;
    controlValue?: string;
    functionId?: string;
    field?: string;
    alias?: string;
    value?: string;
    applicationName?: string;
    url?: string;
    aliasField?: string;
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

  type findAllUserGroupByCaseCategoryAndProcActKeyParams = {
    caseCategory: string;
    processActivityKey: string;
    businessNo?: string;
    currentTaskId?: string;
  };

  type findAllUserIdByCaseCategoryAndProcActKeyParams = {
    caseCategory: string;
    processActivityKey: string;
    claimNo?: string;
    currentTaskId?: string;
  };

  type findAllUserIdByGroupCodeParams = {
    groupCode: string;
  };

  type findAllUserIdByResourceCodeParams = {
    resourceCode: string;
  };

  type findAllUserIdByResourceValuesParams = {
    resourceValues: string[];
  };

  type findAllUserIdByRoleCodeParams = {
    roleCode: string;
  };

  type findAuthorityTeamUserGroupByUserIdParams = {
    userId: string;
  };

  type findByBusinessNoParams = {
    businessNo: string;
  };

  type findByFunctionIdParams = {
    functionId: string;
    userId: string;
  };

  type findByTaskIdParams = {
    taskId: string;
  };

  type findCommonAuthorityUserGroupV2Params = {
    caseCategory: string;
    processActivityKey: string;
    businessNo: string;
    currentTaskId?: string;
    currentVipFlag?: number;
    functionName?: string;
  };

  type findDataResourceParams = {
    functionId: string;
    userId: string;
  };

  type findGroupByUserIdListParams = {
    userIdList: string[];
  };

  type findGroupByUserIdParams = {
    userId: string;
  };

  type findGroupProcessByUserIdParams = {
    userIdList: string[];
  };

  type findLargerLevelUserParams = {
    userId: string;
    caseCategory: string;
    processActivityKey: string;
    businessNo: string;
    largeLevel: number;
  };

  type findRelativeGroupAndUserInfo1Params = {
    caseCategory: string;
    processActivityKey: string;
    claimNo?: string;
    currentVipFlag?: number;
    functionName?: string;
  };

  type findRelativeGroupAndUserInfoParams = {
    caseCategory: string;
    processActivityKey: string;
    claimNo?: string;
  };

  type findRoleGroupByUserIdParams = {
    userId: string;
  };

  type findSubmitGroupAndUserInfoParams = {
    caseCategory: string;
    processActivityKey: string;
    businessNo?: string;
    caseVipFlag?: number;
    useSnapShotData?: boolean;
    functionName?: string;
  };

  type findSubmitGroupAndUserInfoV2Params = {
    caseCategory: string;
    processActivityKey: string;
    businessNo?: string;
    caseVipFlag?: number;
    useSnapShotData?: boolean;
    functionName?: string;
  };

  type findTeamByUserIdParams = {
    userIdList: string[];
  };

  type findUserGroupInformationByUserIdParams = {
    userId: string;
  };

  type getActiAuthorityAuthorityByUserIdParams = {
    userId: string;
  };

  type getAllDataMaskingCodeParams = {
    userId: string;
  };

  type getCaseCategoryActivityKeyConfigPermissionLimitsParams = {
    caseCategory: string;
    activityKey: string;
  };

  type getCommAuthorityByUserIdParams = {
    userId: string;
  };

  type getCommonAuthorityBySpecifiedUserIdParams = {
    specifiedUserId: string;
  };

  type getCommonAuthorityByUserIdParams = {
    userId: string;
  };

  type getDashboardAuthorityByUserIdParams = {
    userId: string;
  };

  type getInfoCategoryAuthorityByUserIdParams = {
    userId: string;
  };

  type getLogConfigCacheParams = {
    logName: string;
  };

  type getMachineConfigParams = {
    configKey: string;
  };

  type getMenuAuthorityByUserIdParams = {
    userId: string;
  };

  type getReportAuthorityByUserIdParams = {
    userId: string;
  };

  type getUserPermissionLimitsParams = {
    userId: string;
  };

  type getValidUserListParams = {
    permissionCategoryCode: string;
    functionName: string;
  };

  type GroupDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    groupCode: string;
    groupName: string;
    groupDesc?: string;
    sysFlag?: boolean;
    systemInd?: string;
    roleList?: RoleDO[];
    manuallyAssignmentGroup?: string;
    showMemberIndicator?: number;
    teamCode?: string;
  };

  type GroupResourceVO = {
    groupCode?: string;
    groupName?: string;
    resourceCode?: string;
  };

  type HigherAuthority = {
    functionId?: string;
    methodName?: string;
    doBefore?: boolean;
    doAfter?: boolean;
    args?: Record[];
    responseData?: Record;
  };

  type HigherAuthorityBusinessData = {
    functionId?: string;
    caseCategory?: string;
    controlValue?: string;
  };

  type HigherAuthorityBusinessDataVO = {
    functionId?: string;
    caseCategory?: string;
    controlValue?: string;
    userId?: string;
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

  type IgnoreFieldConfig = {
    ignoreFieldKeyList?: string[];
    ignoreType?: string;
    criteria?: QueryConfig[];
  };

  type LimitTransactionRequestVO = {
    caseNo?: string;
    reasonGroupId?: string;
    caseCategory?: string;
    activityKey?: string;
    taskId?: string;
    remark?: string;
    userId?: string;
    decision?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    seniorUserId?: string;
    permissionLimit?: PermissionLimitDefinitionDO[];
  };

  type listCaseCategoryByUserIdParams = {
    userId: string;
  };

  type listRoleCodesByUserIdParams = {
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

  type MachineConfig = {
    get_id?: string;
    configKey?: string;
    processList?: ProcessConfig[];
    description?: string;
    currentVersion?: number;
    newVersion?: number;
    skipNullProcess?: boolean;
  };

  type mapListGroupNamesByUserIdsParams = {
    userIds: string[];
  };

  type mapListRoleNamesByUserIdsParams = {
    userIds: string[];
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
  };

  type MatchUserGroupVO = {
    groupCode?: string;
    groupName?: string;
    userIdList?: string[];
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

  type MemoryCacheAdminVO = {
    serviceName?: string;
    cacheName?: string[];
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

  type NBPolicyDecisionSummary = {
    policyDecision?: string;
    maxExtraMortality?: number;
    totalSumAssured?: number;
    declineMaxSumAssured?: number;
    ciSumAssured?: number;
    tpdSumAssured?: number;
    phUwTsar?: number;
    phUwLifeEm?: number;
    phUwAdEm?: number;
    phUwCiEm?: number;
    thUwTsar?: number;
    thUwLifeEm?: number;
    vnUwTsar?: number;
    uwTotalSA?: number;
    uwCiSA?: number;
    uwTpdSA?: number;
    myExtraAmount?: number;
    myPreLifeTsarAmount?: number;
    idUwSa?: number;
    idUwEm?: number;
    idUwCina?: number;
    idUwHcp?: number;
    idUwHs?: number;
    idUwAhs?: number;
    idUwEp?: number;
    backDateFlag?: string;
    componentCode?: string[];
    planCode?: string[];
    medCase?: string;
    policyStatus?: string;
    premiumReceived?: number;
    policyCancelDate?: string;
    policyCancelDate30?: string;
    laBusinessDate?: string;
    gsIndicator?: string;
    historyUwDecision?: string;
    exclusionCode?: string;
    rdocNum?: string;
    coverageInfoList?: CoverageInfo[];
    qcRequired?: string;
    loadingFlag?: string;
    sourceSystem?: string;
    typeSubTypeAmountList?: AuthorityTypeSubTypeAmount[];
  };

  type ObjectCompareResult = {
    equalFieldList?: string[];
    failFieldList?: string[];
    lackFieldList?: string[];
    abundantFieldList?: string[];
    existDiff?: boolean;
  };

  type PermissionLimitBO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    permissionCode?: string;
    categoryCode?: string;
    limitCode?: string;
    limitValue?: string;
    limitJson?: string;
    errorCode?: string;
    description?: string;
  };

  type PermissionLimitCodeMappingDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    region?: string;
    limitCode?: string;
    benefitType?: string;
    benefitSubType?: string;
  };

  type PermissionLimitDefinitionDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    permissionCode?: string;
    categoryCode?: string;
    limitCode?: string;
    limitTargetField?: string;
    compareType?: string;
    min?: number;
    max?: number;
    assertValue?: string;
  };

  type PermissionLimitDefinitionRequestVO = {
    businessNo?: string;
    caseCategory?: string;
    activity?: string;
    userId?: string;
    businessData?: Record;
  };

  type PermissionLimitResult = {
    categoryCode?: string;
    result?: boolean;
    scopeResult?: number;
    errorCode?: string;
    equalsAttrs?: string;
    limitResult?: string[];
  };

  type PermissionTeamVO = {
    teamCode?: string;
    teamName?: string;
    teamGroupUserList?: TeamGroupUserVO[];
  };

  type PermissionVO = {
    categoryCodeList?: string[];
    permissionType?: string;
    taskInfo?: TaskInfo;
    userId?: string;
    businessInfo?: Record;
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

  type PosPermissionVO = {
    taskInfo?: TaskInfo;
    userId?: string;
    srvRbacBizInfo?: SrvRbacBizInfo;
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
    authActivity?: boolean;
  };

  type ProcessActivityResourceVO = {
    processDefId?: string;
    processActivityKey?: string;
    processActivityName?: string;
    authActivity?: boolean;
    processActivityOrder?: number;
    processName?: string;
    caseCategory?: string;
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

  type RBACTaskButton = {
    activityButtons?: ActivityButtonVO[];
    taskLimitData?: TaskLimitDataVO;
  };

  type ResourceDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    code?: string;
    name?: string;
    type?: string;
    value?: string;
    parentCode?: string;
    commonAccessIndicator?: string;
  };

  type ResourcePermissionLimitResult = {
    code?: string;
    permissionLimitResultList?: PermissionLimitResult[];
  };

  type ResourceValuePermissionLimitVO = {
    categoryCodeList?: string[];
    taskLimitData?: TaskLimitDataVO;
    claimLimitData?: ClaimLimitDataVO;
    userId?: string;
    skipEditLogCheck?: boolean;
    type?: string;
    resourceValues?: string[];
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

  type ResultVOConcurrentHashMapStringLogExtendConfigVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOListActivityPermissionLimitVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ActivityPermissionLimitVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListActivityResourceDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ActivityResourceDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListActivityResourceVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ActivityResourceVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListAuthorityResultVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: AuthorityResultVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListCategoryPermissionResultVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CategoryPermissionResultVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListDataMaskingDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: DataMaskingDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListDataResourceDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: DataResourceDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListExceptionMessage = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ExceptionMessage[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListGroupDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: GroupDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListMatchUserGroupVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: MatchUserGroupVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListPermissionLimitBO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PermissionLimitBO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListPermissionLimitResult = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PermissionLimitResult[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListPermissionTeamVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PermissionTeamVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListProcessActivityResourceVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ProcessActivityResourceVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListResourceDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: ResourceDO[];
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

  type ResultVOListTaskUserOperationVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: TaskUserOperationVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListTransactionLimit = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: TransactionLimit[];
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

  type ResultVOMapStringBoolean = {
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

  type ResultVOObject = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOString = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: string;
    promptMessages?: PromptMessage[];
  };

  type ResultVOTaskUserOperationVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: TaskUserOperationVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOUserGroupRelationshipVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: UserGroupRelationshipVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOUserGroupResultVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: UserGroupResultVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOVoid = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type RoleDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    roleCode: string;
    roleName: string;
    roleDesc?: string;
    systemInd?: string;
  };

  type RuleCommonRpcFactInfoVO = {
    objClassType?: string;
    objJsonContent?: string;
  };

  type SeniorUserSubmitPermissionVO = {
    userIds?: string[];
    caseNo?: string;
    caseCategory?: string;
    activityKey?: string;
    businessNo?: string;
    taskId?: string;
    nbPolicyDecisionSummary?: NBPolicyDecisionSummary;
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

  type TaskInfo = {
    activityKey?: string;
    taskId?: string;
    caseNo?: string;
    businessNo?: string;
    caseCategory?: string;
  };

  type TaskInfoForPermission = {
    caseCategory?: string;
    activityKey?: string;
    validPermissionCodeList?: string[];
    businessNo?: string;
    caseVipFlag?: number;
    useSnapShotData?: boolean;
  };

  type TaskLimitDataVO = {
    processDefId?: string;
    taskDefKey?: string;
    caseCategory?: string;
    taskId?: string;
    caseNo?: string;
    businessNo?: string;
    assignee?: string;
    vip?: boolean;
  };

  type TaskOperationRequest = {
    businessNo?: string;
    caseCategory?: string;
    activityKey?: string;
    caseNo?: string;
    taskId?: string;
  };

  type TaskUserOperationVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    caseNo?: string;
    businessNo?: string;
    inquiryBusinessNo?: string;
    taskId?: string;
    userId?: string;
    regionCode?: string;
    operationLabelCode?: string;
    operationLabelValue?: string;
    operationTime?: string;
    reAssignUserId?: string;
    operationCounts?: number;
  };

  type TeamGroupUserVO = {
    userId?: string;
    groupCode?: string;
  };

  type testCacheParams = {
    paramOne: string[];
    paramTwo: string;
  };

  type TransactionLimit = {
    max?: number;
    min?: number;
    limitCode?: string;
    decline?: boolean;
    empty?: boolean;
    maxStr?: string;
    minStr?: string;
  };

  type UpdateConfig = {
    key?: string;
    valueFieldPath?: string;
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
    groupName?: string;
    groupDesc?: string;
    manuallyAssignmentGroup?: string;
    showMemberIndicator?: number;
    effectiveDate?: string;
    status?: string;
    newUserGroupCode?: string;
    autoReAssignIndicator?: string;
    manualEscalateAssignIndicator?: string;
  };

  type UserGroupProcessDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    userId?: string;
    groupCode?: string;
    effectiveDate?: string;
    commitStatus?: string;
  };

  type UserGroupRelationshipVO = {
    userId?: string;
    groupCodeList?: string[];
    relationshipCodeList?: string[];
  };

  type UserGroupResultVO = {
    matchUserGroupList?: MatchUserGroup[];
    allNotMatchIndicator?: boolean;
  };

  type UserGroupVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    userId?: string;
    groupCode?: string;
    groupName?: string;
    groupDesc?: string;
    roleList?: RoleDO[];
  };

  type UserPermissionLimitVO = {
    caseCategory?: string;
    procActKey?: string;
    categoryCode?: string;
    userId?: string;
    totalPayableAmount?: number;
    claimType?: string[];
    claimDecision?: string;
  };

  type UserTeamVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    userId?: string;
    teamCode?: string;
  };

  type ValidatedResultVO = {
    success?: boolean;
    errorCode?: string;
  };
}
