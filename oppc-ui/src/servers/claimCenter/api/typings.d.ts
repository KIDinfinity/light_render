declare namespace API {
  type CfgLogLevelVO = {
    serviceName?: string;
    logName?: string;
    logLevel?: string;
    logExtendName?: string;
    logExtendConfig?: LogExtendConfigVO;
  };

  type deleteCacheParams = {
    cacheKey: string[];
  };

  type getLogConfigCacheParams = {
    logName: string;
  };

  type getPlanIdGenerateConditionParams = {
    idType: string;
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

  type PlanConditionBO = {
    conditionType?: string;
    sourceStr?: string;
    conditionValueList?: string[];
  };

  type PlanDataVO = {
    planIdGenerateCondition?: boolean;
    serialIDCachePersistence?: boolean;
  };

  type PlanIdGenerateCondition = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    idType?: string;
    planCondition?: string;
    batchSize?: number;
    initialMaximum?: number;
    extendedValue?: number;
    planConditionBOList?: PlanConditionBO[];
    regionCode?: string;
    regionCodeAndIdType?: string;
  };

  type PromptMessage = {
    code?: string;
    type?: string;
    content?: string;
    messageCode?: string;
    applicationName?: string;
    metaData?: Record;
  };

  type ResultVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOConcurrentHashMapStringLogExtendConfigVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOListString = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: string[];
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

  type ResultVOPlanIdGenerateCondition = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PlanIdGenerateCondition;
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

  type UniversalGeneratorVO = {
    idType?: string;
    batchSize?: number;
    paramsMap?: Record;
    cacheKey?: string;
    newNo?: string;
    expirationTime?: number;
    newStr?: string;
  };
}
