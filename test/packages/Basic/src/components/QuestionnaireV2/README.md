---
tag: packages/Basic/components
order: 1
title: Questionnaire
group:
  title: Basic
nav:
  title: packages
---

# 通用问卷组件

#### 设计 http://10.22.25.95:8090/display/Issac/Questionnaire+Business+Flow

#### 入口

- 泰国的vanilla - 左侧边栏的questionnaire button里
- NB - Manual Underwriting activity
- NB - 左侧边栏 e-worksheet button 里
- NB History
- AFI - Manual Underwriting 

#### 问题类型

| type          | description                                                  |
| ------------- | ------------------------------------------------------------ |
| SINGLE_OPTION | 单选                                                         |
| MULTI_OPTION  | 多选                                                         |
| TEXT          | 单条填空（类型为string、number、date）                       |
| FILLING       | 分割填空（类型为string、number、date） eg: name{1}age{2} -> name ____    age____ |



#### 请求接口



| interface                               | request                                                      | response                      | description                                                  |      |
| --------------------------------------- | ------------------------------------------------------------ | ----------------------------- | ------------------------------------------------------------ | ---- |
| api/questionnaire/case/answer/query     | caseNo (必填)<br />identityNo (非必填)<br />identityType (非必填)<br />caseCategory (非必填) | List<CustomerQuestionnaireVO> | 查询case的问卷答案,包括问卷题目。<br />目前一进来就选择调用这个接口，之后可能会变 |      |
| api/nb/cfg/getDefaultValueByCode        | codeType=routeToQuestionnaire                                | “1”\|“0”\|null                | （目前）在NB中，由于现在问卷还没有迁移完成，需要这个接口对NB的问卷进行一个开关。<br />1 使用新的问卷组件<br />不为 1 使用旧的问卷组件和旧的数据 |      |
| api/questionnaire/loadQuestionnaire     | clientType<br />eg:CUS001: Insured，CUS002: Policy owner     | List<QuestionnaireVO>         | 加载指定clientType空白问卷。(未使用)                         |      |
| api/questionnaire/loadAllQuestionConfig |                                                              | List<QuestionVO>              | 加载所有问卷题目。(未使用)                                   |      |
| rpc/questionnaire/case/submit           | CaseSubmitVO                                                 | CaseSubmitResultVO            | submit case时调用（未使用）                                  |      |
| rpc/questionnaire/case/create           | CaseCreationVO                                               | CaseCreateResultVO            | create case时调用（跟前端没关系吧）                          |      |

#### 数据填充

| <Clients />   ↓<br />clientInfo.firstName clientInfo.surname （客户名）<br />role （角色1）<br />role （角色2） | ...<Clients />                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| <QuestionnaireTitles />   ↓<br />**questionnaireLabel (问卷1)**<br />**questionnaireLabel (问卷2)** | <Questions />    ↓<br /><Header>  →  ...**<Type>sourceType** (几个field)<br /><br />sectionLabel（问卷section的label）<br /><Type>Description （问题）<br /><Answers />(单双选、填空、多填空)<br /><Children /> （选项命中题目，出现子题目，目前只有单选能命中）<br /><Type>Description （问题）<br /><Answers />(单双选、填空、多填空)<br /><Children /> （选项命中题目，出现子题目，目前只有单选能命中）<br />sectionLabel（问卷section的label）<br /><Type>Description （问题）<br /><Answers />(单双选、填空、多填空)<br /><Children /> （选项命中题目，出现子题目，目前只有单选能命中）<br /> |



#### 数据处理

```javascript
CustomerQuestionnaireVO // (根据客户划分问卷)

[{
    clientInfo:{
    	identityNo:xxx // 证件编码
    	...
    }, // (客户信息)
    questionnaireList:[{
    	...
    	clientType:xxx, // 角色
    	questionnaireCode:xxx, // 问卷编号
    	questionnaireLabel:xxx, // 问题标题 （左侧）
    	sectionList:[{
    		...
    		sectionCode:xxx, // sectionCode 问卷中，问题被section划分，一个section有多个问题。
			sectionLabel:xxx, // section标题
			sequence:xxx, // section的排序
			sectionQuestionList:[{
				...
				isDisplay:xxx, // 是否显示 0不显示
				sequence:xxx, // section下question的排序
                sectionCode:xxx,
                questionCode:xxx, // questionCode
                question:{
                	...
                	text:xxx, // 问题的标题，当类型为FILLING时，根据占位符分割为多个小问题
                	questionTitle:xxx, // 当问题类型为FILLING并且isDisplay不为0时，为问题的标题
                	questionType:xxx, // 问题类型
                	questionOptionList:[{
                		...
                		optionCode:xxx, // 问题选项Code
                		referAnswer:xxx, // 关联答案，answerVOList中的optionText跟它匹配，就会在此问题下拼接一道新问题。（目前只有单选题存在）
                		triggerQuestionCode:xxx, // 关联问题编号，该问题只会存在于同一份问卷中
                		triggerSectionCode:xxx, // 关联问题集编号
                		option:{
                			...
                			optionCode:xxx, // 选项的code （不一定是选项，也可以是填空题的）
                			optionLabel:xxx, // 选项的标题（非选择题不会用到）
                			optionValue:xxx, // 选项的值（非选择题不会用到）
                			optionValueType:xxx, // 选项的类型（只有填空题才有）
                			sequence:xxx // 排序
                		}
                	}],
                	answerVOList:[{
                		optionCode:xxx,
                        optionText:xxx // 选项的值（选择题时为optionValue，填空题时自己输入）
                	}]
                }
			}]
    	}]
    }]
}]

// 扁平化 将所有的问卷放到一个maping中，key如下

CustomerQuestionnaireVO->questionnaireList->sectionList->sectionQuestionList

// key ↓
${clientInfo.clientInfo}${questionnaireList.questionnaireCode}-${sectionList.sectionCode}${sectionQuestionList.questionCode}--${sectionQuestionList.sequence}

entities:{
    sectionQuestionListMap:{
        [key]:{...},
        [key]:{...}
    }
}

// 整理sectionMap
sectionQuestionListMap:{
    {userA}{questionnaireCodeA}-{sectionCodeA}{questionCodeA}--1,
    {userA}{questionnaireCodeA}-{sectionCodeA}{questionCodeB}--0,
    {userA}{questionnaireCodeA}-{sectionCodeB}{questionCodeA}--0,
    {userB}{questionnaireCodeA}-{sectionCodeA}{questionCodeB}--1,
}
->
sectionMap:{
    {userA}{questionnaireCodeA}:[
        {
			sectionLabel:xxx,
            sectionQuestionList:[ {userA}{questionnaireCodeA}-{sectionCodeA}{questionCodeA}--0,
                    {userA}{questionnaireCodeA}-{sectionCodeA}{questionCodeB}--1]
		},{
           sectionLabel:xxx,
            sectionQuestionList:[ {userA}{questionnaireCodeA}-{sectionCodeB}{questionCodeA}--0] 
        }
    ],
	{userB}{questionnaireCodeA}:[
		{
			sectionLabel:xxx,
            sectionQuestionList:[ {userA}{questionnaireCodeA}-{sectionCodeA}{questionCodeB}--1]
		}
    ]
}

sectionMap:{
    [${clientInfo.clientInfo}${questionnaireList.questionnaireCode}]:[
        {
            sectionLabel:xxx,
            sectionQuestionList
        }
    ]
}    
       
```



#### 手动必填校验
   1. 用户选中需要提交的问卷 
   2. 从当前的所有问卷中过滤出选中的问卷
   3. 先过滤掉问卷中display和isMandatory为0
   4. 根据不同类型对值进行校验
      1. 单选：判断answerVOList的长度是否为1。
            1. 如果为一，将answer跟questionOptionList进行匹配，查看是否有匹配questionOption的referAnswer与optionText一致的questionOption。
            2. 如果匹配到，说明单选后面会接一个FILLING||TEXT，此时需要将对应FILLING||TEXT进行校验。
      2. 多选：判断answerVOList的长度是否大于1。
      3. 普通填空(TEXT):判断answerVOList的长度是否为1，并且其中的optionText不为空。
      4. 多行填空(FILLING):(按照跟后端的约定，answerVOList的长度与questionOptionList的长度相等且一一匹配。)判断answerVOList中的optionText不为空。
   5. 校验不通过的值会被添加error，将最终结果根据问卷分类然后返回。
