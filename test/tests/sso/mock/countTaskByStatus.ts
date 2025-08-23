export default {

    method: 'POST',
    url: 'dc/homepage/countTaskByStatus',
    status: 200,
    data: {
        body: {
            "success": true,
            "type": null,
            "warnData": null,
            "resultData": [
                {
                    "taskId": null,
                    "taskDefKey": null,
                    "name": "To Do",
                    "count": 677,
                    "assignee": null,
                    "status": "todo"
                },
                {
                    "taskId": null,
                    "taskDefKey": null,
                    "name": "Pending",
                    "count": 14,
                    "assignee": null,
                    "status": "pending"
                }
            ],
            "promptMessages": [
                null
            ]
        }

    }
}