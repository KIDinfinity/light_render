import lodash from 'lodash';

export default function* (_: any, { call, put, select }: any): any {

    const businessData = yield put.resolve({
        type: 'getPaperSubmissionSubmitFormat'
    })
    const taskDetail = yield select(({ processTask }: any) => processTask.getTask);

const taskId = taskDetail.taskId

businessData.taskId = taskId

let submissionBatchData = {
    "answerData" :  {},
    "answerDataConverter" : "nb_smart",
    "docInfos": [],
    "integrationSessionId": ""
}

const businessDataForBuild = lodash.cloneDeep(businessData)
businessDataForBuild.businessData.submissionChannel = "01"

submissionBatchData = lodash.merge(submissionBatchData, businessDataForBuild)

const submissionBatchDatas = [submissionBatchData]
const innerBusinessData = {
    "businessCode": "BIZ003",
	"interfaceId": "I004002",
    "submissionBatchDatas" : submissionBatchDatas
}

    businessData.businessData = innerBusinessData 
    return businessData
}