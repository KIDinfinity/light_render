export default {

    method: 'POST',
    url: 'rbac2/resource/listPermissionMenu',
    status: 200,
    data: {
        body: {
            "success": true,
            "type": null,
            "warnData": null,
            "resultData": [
                "revertCaseManagement",
                "urgentCaseManagement",
                "cancelCaseManagement",
                "informationManagement",
                "envoyManagement",
                "360Management",
                "advancedQueryOfRuleSet",
                "advancedQueryOfCase",
                "advancedQueryOfTask",
                "advancedQueryOfUser",
                "advancedQueryOfClaimHistory"
            ],
            "promptMessages": [
                null
            ]
        }

    }
}