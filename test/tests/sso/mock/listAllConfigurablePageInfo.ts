export default {

    method: 'POST',
    url: 'navigator/configuration/listAllConfigurablePageInfo',
    status: 200,
    data: {
        body: {
            "success": true,
            "type": null,
            "warnData": null,
            "resultData": [
                {
                    "categoryName": "User",
                    "inquiryField": [
                        {
                            "fieldName": "User ID",
                            "hidden": false,
                            "sequence": 1,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "User Name",
                            "hidden": false,
                            "sequence": 2,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Status",
                            "hidden": true,
                            "sequence": 5,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Employment Date",
                            "hidden": true,
                            "sequence": 6,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Title",
                            "hidden": true,
                            "sequence": 7,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Organization",
                            "hidden": true,
                            "sequence": 8,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Report To",
                            "hidden": true,
                            "sequence": 9,
                            "fieldType": null,
                            "fieldCode": null
                        }
                    ],
                    "resultField": [
                        {
                            "fieldName": "User ID",
                            "sortable": true,
                            "sequence": 1
                        },
                        {
                            "fieldName": "User Name",
                            "sortable": false,
                            "sequence": 2
                        },
                        {
                            "fieldName": "Gender",
                            "sortable": false,
                            "sequence": 3
                        },
                        {
                            "fieldName": "DOB",
                            "sortable": true,
                            "sequence": 4
                        },
                        {
                            "fieldName": "Status",
                            "sortable": false,
                            "sequence": 5
                        },
                        {
                            "fieldName": "Employment Date",
                            "sortable": true,
                            "sequence": 6
                        },
                        {
                            "fieldName": "Title",
                            "sortable": false,
                            "sequence": 7
                        },
                        {
                            "fieldName": "Organization",
                            "sortable": false,
                            "sequence": 8
                        },
                        {
                            "fieldName": "Report To",
                            "sortable": false,
                            "sequence": 9
                        }
                    ]
                },
                {
                    "categoryName": "Hospital Billing",
                    "inquiryField": [
                        {
                            "fieldName": "Hospital Name",
                            "hidden": false,
                            "sequence": 1,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Status",
                            "hidden": false,
                            "sequence": 2,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Scan Date",
                            "hidden": false,
                            "sequence": 3,
                            "fieldType": null,
                            "fieldCode": null
                        }
                    ],
                    "resultField": [
                        {
                            "fieldName": "Cover Page No.",
                            "sortable": true,
                            "sequence": 1
                        },
                        {
                            "fieldName": "Hospital Name",
                            "sortable": false,
                            "sequence": 2
                        },
                        {
                            "fieldName": "Scan Date",
                            "sortable": false,
                            "sequence": 3
                        },
                        {
                            "fieldName": "Request Amount",
                            "sortable": false,
                            "sequence": 4
                        },
                        {
                            "fieldName": "No.Of Cases",
                            "sortable": false,
                            "sequence": 5
                        },
                        {
                            "fieldName": "Status",
                            "sortable": false,
                            "sequence": 6
                        },
                        {
                            "fieldName": "Receive Date",
                            "sortable": false,
                            "sequence": 7
                        },
                        {
                            "fieldName": "Final Amount",
                            "sortable": false,
                            "sequence": 8
                        }
                    ]
                },
                {
                    "categoryName": "Document",
                    "inquiryField": [
                        {
                            "fieldName": "Document ID",
                            "hidden": false,
                            "sequence": 1,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Document Type",
                            "hidden": false,
                            "sequence": 2,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Document Classification",
                            "hidden": false,
                            "sequence": 3,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Submission Batch No.",
                            "hidden": false,
                            "sequence": 4,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Case No.",
                            "hidden": false,
                            "sequence": 5,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Claim No.",
                            "hidden": false,
                            "sequence": 6,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Insured Name",
                            "hidden": false,
                            "sequence": 7,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Policy No.",
                            "hidden": false,
                            "sequence": 8,
                            "fieldType": null,
                            "fieldCode": null
                        }
                    ],
                    "resultField": [
                        {
                            "fieldName": "Document ID",
                            "sortable": true,
                            "sequence": 1
                        },
                        {
                            "fieldName": "Source Document ID",
                            "sortable": true,
                            "sequence": 2
                        },
                        {
                            "fieldName": "Document Type",
                            "sortable": false,
                            "sequence": 3
                        },
                        {
                            "fieldName": "Document Classification",
                            "sortable": false,
                            "sequence": 4
                        },
                        {
                            "fieldName": "Case No",
                            "sortable": true,
                            "sequence": 5
                        },
                        {
                            "fieldName": "Case Category",
                            "sortable": false,
                            "sequence": 6
                        },
                        {
                            "fieldName": "Creation Date",
                            "sortable": true,
                            "sequence": 7
                        },
                        {
                            "fieldName": "Last Updated Date",
                            "sortable": true,
                            "sequence": 8
                        },
                        {
                            "fieldName": "Import Channel",
                            "sortable": false,
                            "sequence": 9
                        },
                        {
                            "fieldName": "Submission Batch",
                            "sortable": true,
                            "sequence": 10
                        }
                    ]
                },
                {
                    "categoryName": "ClaimHistoryReport",
                    "inquiryField": [
                        {
                            "fieldName": "Policy No.",
                            "hidden": false,
                            "sequence": 1,
                            "fieldType": 1,
                            "fieldCode": "policyNo"
                        },
                        {
                            "fieldName": "Insured",
                            "hidden": false,
                            "sequence": 1,
                            "fieldType": 1,
                            "fieldCode": "insured"
                        },
                        {
                            "fieldName": "Submission Date",
                            "hidden": false,
                            "sequence": 1,
                            "fieldType": 2,
                            "fieldCode": "submissionDate"
                        }
                    ],
                    "resultField": []
                },
                {
                    "categoryName": "PendingDocument",
                    "inquiryField": [
                        {
                            "fieldName": "Pending submission date",
                            "hidden": false,
                            "sequence": 1,
                            "fieldType": 2,
                            "fieldCode": "pendingSubmissionDate"
                        }
                    ],
                    "resultField": []
                },
                {
                    "categoryName": "Rule",
                    "inquiryField": [
                        {
                            "fieldName": "Rule Set ID",
                            "hidden": false,
                            "sequence": 1,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Rule Set Name",
                            "hidden": false,
                            "sequence": 2,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Module",
                            "hidden": false,
                            "sequence": 3,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Rule Set Type",
                            "hidden": false,
                            "sequence": 4,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Effective Date",
                            "hidden": false,
                            "sequence": 5,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Expired Date",
                            "hidden": false,
                            "sequence": 6,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Expected Publish Date",
                            "hidden": false,
                            "sequence": 7,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Actual Publish Time",
                            "hidden": false,
                            "sequence": 8,
                            "fieldType": null,
                            "fieldCode": null
                        }
                    ],
                    "resultField": [
                        {
                            "fieldName": "Rule Set ID",
                            "sortable": false,
                            "sequence": 1
                        },
                        {
                            "fieldName": "Rule Set Name",
                            "sortable": false,
                            "sequence": 2
                        },
                        {
                            "fieldName": "Module",
                            "sortable": false,
                            "sequence": 3
                        },
                        {
                            "fieldName": "Rule Set Type",
                            "sortable": false,
                            "sequence": 4
                        },
                        {
                            "fieldName": "Effective Date",
                            "sortable": false,
                            "sequence": 5
                        },
                        {
                            "fieldName": "Expired Date",
                            "sortable": false,
                            "sequence": 6
                        },
                        {
                            "fieldName": "Expected Publish Date",
                            "sortable": false,
                            "sequence": 7
                        },
                        {
                            "fieldName": "Actual Publish Time",
                            "sortable": false,
                            "sequence": 8
                        }
                    ]
                },
                {
                    "categoryName": "PerformanceSummaryReport",
                    "inquiryField": [
                        {
                            "fieldName": "Date",
                            "hidden": false,
                            "sequence": 1,
                            "fieldType": 2,
                            "fieldCode": "date"
                        },
                        {
                            "fieldName": "User",
                            "hidden": false,
                            "sequence": 1,
                            "fieldType": 1,
                            "fieldCode": "user"
                        },
                        {
                            "fieldName": "Type of Admission",
                            "hidden": false,
                            "sequence": 1,
                            "fieldType": 1,
                            "fieldCode": "typeOfAdmission"
                        }
                    ],
                    "resultField": []
                },
                {
                    "categoryName": "ClaimApproveReport",
                    "inquiryField": [
                        {
                            "fieldName": "Case Category",
                            "hidden": false,
                            "sequence": 1,
                            "fieldType": 3,
                            "fieldCode": "caseCategory"
                        },
                        {
                            "fieldName": "Approved Date",
                            "hidden": false,
                            "sequence": 1,
                            "fieldType": 2,
                            "fieldCode": "approvedDate"
                        }
                    ],
                    "resultField": []
                },
                {
                    "categoryName": "posHistory",
                    "inquiryField": [
                        {
                            "fieldName": "businessNo",
                            "hidden": false,
                            "sequence": 1,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "policyNo",
                            "hidden": false,
                            "sequence": 2,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "policyOwner",
                            "hidden": false,
                            "sequence": 3,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "insuredName",
                            "hidden": false,
                            "sequence": 4,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "transactionType",
                            "hidden": false,
                            "sequence": 5,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "submissionDate",
                            "hidden": false,
                            "sequence": 6,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "submissionChannel",
                            "hidden": false,
                            "sequence": 7,
                            "fieldType": null,
                            "fieldCode": null
                        }
                    ],
                    "resultField": [
                        {
                            "fieldName": "businessNo",
                            "sortable": true,
                            "sequence": 1
                        },
                        {
                            "fieldName": "caseNo",
                            "sortable": true,
                            "sequence": 2
                        },
                        {
                            "fieldName": "caseCategory",
                            "sortable": false,
                            "sequence": 3
                        },
                        {
                            "fieldName": "policyNo",
                            "sortable": false,
                            "sequence": 4
                        },
                        {
                            "fieldName": "policyOwner",
                            "sortable": false,
                            "sequence": 5
                        },
                        {
                            "fieldName": "insuredName",
                            "sortable": false,
                            "sequence": 6
                        },
                        {
                            "fieldName": "transactionType",
                            "sortable": true,
                            "sequence": 7
                        },
                        {
                            "fieldName": "posDecision",
                            "sortable": false,
                            "sequence": 8
                        },
                        {
                            "fieldName": "submissionDate",
                            "sortable": true,
                            "sequence": 9
                        },
                        {
                            "fieldName": "submissionChannel",
                            "sortable": false,
                            "sequence": 10
                        },
                        {
                            "fieldName": "caseCompleteDate",
                            "sortable": true,
                            "sequence": 11
                        }
                    ]
                },
                {
                    "categoryName": "MonthlyClaimDetailReportOnline",
                    "inquiryField": [
                        {
                            "fieldName": "submission date",
                            "hidden": false,
                            "sequence": 1,
                            "fieldType": 2,
                            "fieldCode": "submissionDate"
                        },
                        {
                            "fieldName": "Provider Name",
                            "hidden": false,
                            "sequence": 1,
                            "fieldType": 3,
                            "fieldCode": "providerCode"
                        },
                        {
                            "fieldName": "Policy No.",
                            "hidden": false,
                            "sequence": 1,
                            "fieldType": 1,
                            "fieldCode": "policyNo"
                        },
                        {
                            "fieldName": "Client No.",
                            "hidden": false,
                            "sequence": 1,
                            "fieldType": 1,
                            "fieldCode": "clientNo"
                        },
                        {
                            "fieldName": "Claim Type",
                            "hidden": false,
                            "sequence": 1,
                            "fieldType": 3,
                            "fieldCode": "claimType"
                        }
                    ],
                    "resultField": []
                },
                {
                    "categoryName": "Task",
                    "inquiryField": [
                        {
                            "fieldName": "Claim No",
                            "hidden": false,
                            "sequence": 1,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Case No",
                            "hidden": false,
                            "sequence": 2,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Case Category",
                            "hidden": false,
                            "sequence": 3,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Activity",
                            "hidden": false,
                            "sequence": 4,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Business Type",
                            "hidden": false,
                            "sequence": 4,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Status",
                            "hidden": false,
                            "sequence": 5,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Assignee",
                            "hidden": false,
                            "sequence": 6,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Task Assignment Date",
                            "hidden": true,
                            "sequence": 7,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "ID/Passport No",
                            "hidden": false,
                            "sequence": 7,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Due Date",
                            "hidden": true,
                            "sequence": 8,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Remaining Time",
                            "hidden": true,
                            "sequence": 9,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Insured Name",
                            "hidden": true,
                            "sequence": 10,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Batch No",
                            "hidden": true,
                            "sequence": 11,
                            "fieldType": null,
                            "fieldCode": null
                        }
                    ],
                    "resultField": [
                        {
                            "fieldName": "Urgent Flag",
                            "sortable": false,
                            "sequence": 1
                        },
                        {
                            "fieldName": "Claim No",
                            "sortable": false,
                            "sequence": 2
                        },
                        {
                            "fieldName": "Case No",
                            "sortable": false,
                            "sequence": 3
                        },
                        {
                            "fieldName": "Case Category",
                            "sortable": false,
                            "sequence": 4
                        },
                        {
                            "fieldName": "Activity",
                            "sortable": true,
                            "sequence": 5
                        },
                        {
                            "fieldName": "Status",
                            "sortable": true,
                            "sequence": 6
                        },
                        {
                            "fieldName": "Assignee",
                            "sortable": true,
                            "sequence": 7
                        },
                        {
                            "fieldName": "Due Date",
                            "sortable": false,
                            "sequence": 8
                        },
                        {
                            "fieldName": "Remaining Time",
                            "sortable": false,
                            "sequence": 9
                        },
                        {
                            "fieldName": "Business Type",
                            "sortable": false,
                            "sequence": 10
                        },
                        {
                            "fieldName": "Policy No",
                            "sortable": false,
                            "sequence": 11
                        },
                        {
                            "fieldName": "Insured Name",
                            "sortable": false,
                            "sequence": 12
                        },
                        {
                            "fieldName": "Split Remark",
                            "sortable": false,
                            "sequence": 14
                        }
                    ]
                },
                {
                    "categoryName": "Unassigned",
                    "inquiryField": [],
                    "resultField": [
                        {
                            "fieldName": "Urgent Flag",
                            "sortable": false,
                            "sequence": 1
                        },
                        {
                            "fieldName": "Case No",
                            "sortable": true,
                            "sequence": 2
                        },
                        {
                            "fieldName": "Case Category",
                            "sortable": false,
                            "sequence": 3
                        },
                        {
                            "fieldName": "Activity Name",
                            "sortable": false,
                            "sequence": 4
                        },
                        {
                            "fieldName": "Creation Date",
                            "sortable": true,
                            "sequence": 5
                        },
                        {
                            "fieldName": "Task Due Date",
                            "sortable": true,
                            "sequence": 6
                        },
                        {
                            "fieldName": "Remaining Time",
                            "sortable": true,
                            "sequence": 7
                        },
                        {
                            "fieldName": "Insured Name",
                            "sortable": false,
                            "sequence": 8
                        },
                        {
                            "fieldName": "Batch No",
                            "sortable": true,
                            "sequence": 9
                        }
                    ]
                },
                {
                    "categoryName": "PerformanceDetailReport",
                    "inquiryField": [
                        {
                            "fieldName": "Type of Admission",
                            "hidden": false,
                            "sequence": 1,
                            "fieldType": 1,
                            "fieldCode": "typeOfAdmission"
                        },
                        {
                            "fieldName": "User",
                            "hidden": false,
                            "sequence": 1,
                            "fieldType": 1,
                            "fieldCode": "user"
                        },
                        {
                            "fieldName": "Date",
                            "hidden": false,
                            "sequence": 1,
                            "fieldType": 2,
                            "fieldCode": "date"
                        }
                    ],
                    "resultField": []
                },
                {
                    "categoryName": "Case",
                    "inquiryField": [
                        {
                            "fieldName": "Claim No",
                            "hidden": false,
                            "sequence": 1,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Case No",
                            "hidden": false,
                            "sequence": 2,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Case Category",
                            "hidden": false,
                            "sequence": 3,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Business Type",
                            "hidden": false,
                            "sequence": 3,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Assessment Decision",
                            "hidden": true,
                            "sequence": 4,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Submission Date",
                            "hidden": false,
                            "sequence": 5,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Insured Name",
                            "hidden": false,
                            "sequence": 6,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "ID/Passport No",
                            "hidden": false,
                            "sequence": 7,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Current Activity",
                            "hidden": true,
                            "sequence": 8,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Batch No",
                            "hidden": true,
                            "sequence": 9,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Split Remark",
                            "hidden": false,
                            "sequence": 10,
                            "fieldType": null,
                            "fieldCode": null
                        }
                    ],
                    "resultField": [
                        {
                            "fieldName": "Urgent Flag",
                            "sortable": false,
                            "sequence": 1
                        },
                        {
                            "fieldName": "Claim No",
                            "sortable": false,
                            "sequence": 2
                        },
                        {
                            "fieldName": "Case No",
                            "sortable": true,
                            "sequence": 3
                        },
                        {
                            "fieldName": "Case Category",
                            "sortable": false,
                            "sequence": 4
                        },
                        {
                            "fieldName": "Activity",
                            "sortable": true,
                            "sequence": 5
                        },
                        {
                            "fieldName": "Due Date",
                            "sortable": false,
                            "sequence": 6
                        },
                        {
                            "fieldName": "Remaining Time",
                            "sortable": false,
                            "sequence": 7
                        },
                        {
                            "fieldName": "Business Type",
                            "sortable": false,
                            "sequence": 8
                        },
                        {
                            "fieldName": "Policy No",
                            "sortable": false,
                            "sequence": 9
                        },
                        {
                            "fieldName": "Insured Name",
                            "sortable": false,
                            "sequence": 10
                        },
                        {
                            "fieldName": "Submission Channel",
                            "sortable": true,
                            "sequence": 12
                        },
                        {
                            "fieldName": "Submission Date",
                            "sortable": false,
                            "sequence": 13
                        }
                    ]
                },
                {
                    "categoryName": "Claim History",
                    "inquiryField": [
                        {
                            "fieldName": "Claim No",
                            "hidden": false,
                            "sequence": 1,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Case Category",
                            "hidden": false,
                            "sequence": 2,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Insured Name",
                            "hidden": false,
                            "sequence": 3,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "ID/Passport No",
                            "hidden": false,
                            "sequence": 3,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Claim Type",
                            "hidden": true,
                            "sequence": 4,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Assessment Decision",
                            "hidden": true,
                            "sequence": 5,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Payment Amount",
                            "hidden": true,
                            "sequence": 6,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Submission Date",
                            "hidden": true,
                            "sequence": 7,
                            "fieldType": null,
                            "fieldCode": null
                        },
                        {
                            "fieldName": "Close Date",
                            "hidden": true,
                            "sequence": 8,
                            "fieldType": null,
                            "fieldCode": null
                        }
                    ],
                    "resultField": [
                        {
                            "fieldName": "Claim No",
                            "sortable": true,
                            "sequence": 1
                        },
                        {
                            "fieldName": "Case Category",
                            "sortable": false,
                            "sequence": 2
                        },
                        {
                            "fieldName": "Insured Name",
                            "sortable": false,
                            "sequence": 3
                        },
                        {
                            "fieldName": "Claim Type",
                            "sortable": false,
                            "sequence": 4
                        },
                        {
                            "fieldName": "Assessment Decision",
                            "sortable": false,
                            "sequence": 5
                        },
                        {
                            "fieldName": "Payment Amount",
                            "sortable": true,
                            "sequence": 6
                        },
                        {
                            "fieldName": "Submission Date",
                            "sortable": true,
                            "sequence": 7
                        },
                        {
                            "fieldName": "Close Date",
                            "sortable": true,
                            "sequence": 8
                        }
                    ]
                },
                {
                    "categoryName": "To Do",
                    "inquiryField": [],
                    "resultField": [
                        {
                            "fieldName": "Urgent Flag",
                            "sortable": false,
                            "sequence": 1
                        },
                        {
                            "fieldName": "Claim No",
                            "sortable": false,
                            "sequence": 2
                        },
                        {
                            "fieldName": "Case No",
                            "sortable": true,
                            "sequence": 3
                        },
                        {
                            "fieldName": "Case Category",
                            "sortable": true,
                            "sequence": 4
                        },
                        {
                            "fieldName": "Activity",
                            "sortable": true,
                            "sequence": 5
                        },
                        {
                            "fieldName": "Remaining Time",
                            "sortable": true,
                            "sequence": 7
                        },
                        {
                            "fieldName": "Business Type",
                            "sortable": false,
                            "sequence": 8
                        },
                        {
                            "fieldName": "Insured Name",
                            "sortable": false,
                            "sequence": 9
                        }
                    ]
                },
                {
                    "categoryName": "Pending",
                    "inquiryField": [],
                    "resultField": [
                        {
                            "fieldName": "Urgent Flag",
                            "sortable": false,
                            "sequence": 1
                        },
                        {
                            "fieldName": "Claim No",
                            "sortable": false,
                            "sequence": 2
                        },
                        {
                            "fieldName": "Case No",
                            "sortable": true,
                            "sequence": 3
                        },
                        {
                            "fieldName": "Case Category",
                            "sortable": true,
                            "sequence": 4
                        },
                        {
                            "fieldName": "Activity",
                            "sortable": true,
                            "sequence": 5
                        },
                        {
                            "fieldName": "Remaining Time",
                            "sortable": true,
                            "sequence": 7
                        },
                        {
                            "fieldName": "Business Type",
                            "sortable": false,
                            "sequence": 8
                        },
                        {
                            "fieldName": "Insured Name",
                            "sortable": false,
                            "sequence": 9
                        }
                    ]
                },
                {
                    "categoryName": "Completed",
                    "inquiryField": [],
                    "resultField": [
                        {
                            "fieldName": "Urgent Flag",
                            "sortable": false,
                            "sequence": 1
                        },
                        {
                            "fieldName": "Claim No",
                            "sortable": false,
                            "sequence": 2
                        },
                        {
                            "fieldName": "Case No",
                            "sortable": true,
                            "sequence": 3
                        },
                        {
                            "fieldName": "Case Category",
                            "sortable": true,
                            "sequence": 4
                        },
                        {
                            "fieldName": "Activity",
                            "sortable": true,
                            "sequence": 5
                        },
                        {
                            "fieldName": "Remaining Time",
                            "sortable": true,
                            "sequence": 7
                        },
                        {
                            "fieldName": "Business Type",
                            "sortable": false,
                            "sequence": 8
                        },
                        {
                            "fieldName": "Insured Name",
                            "sortable": false,
                            "sequence": 9
                        }
                    ]
                },
                {
                    "categoryName": "Favorite",
                    "inquiryField": [],
                    "resultField": [
                        {
                            "fieldName": "Urgent Flag",
                            "sortable": false,
                            "sequence": 1
                        },
                        {
                            "fieldName": "Claim No",
                            "sortable": false,
                            "sequence": 2
                        },
                        {
                            "fieldName": "Case No",
                            "sortable": true,
                            "sequence": 3
                        },
                        {
                            "fieldName": "Case Category",
                            "sortable": true,
                            "sequence": 4
                        },
                        {
                            "fieldName": "Activity",
                            "sortable": true,
                            "sequence": 5
                        },
                        {
                            "fieldName": "Remaining Time",
                            "sortable": true,
                            "sequence": 7
                        },
                        {
                            "fieldName": "Business Type",
                            "sortable": false,
                            "sequence": 8
                        },
                        {
                            "fieldName": "Insured Name",
                            "sortable": false,
                            "sequence": 9
                        }
                    ]
                },
                {
                    "categoryName": "Card Mode",
                    "inquiryField": [],
                    "resultField": [
                        {
                            "fieldName": "Remaining Time",
                            "sortable": false,
                            "sequence": 0
                        },
                        {
                            "fieldName": "Activity",
                            "sortable": false,
                            "sequence": 0
                        },
                        {
                            "fieldName": "Case No",
                            "sortable": false,
                            "sequence": 0
                        },
                        {
                            "fieldName": "Case Category",
                            "sortable": false,
                            "sequence": 0
                        },
                        {
                            "fieldName": "Due Date",
                            "sortable": false,
                            "sequence": 0
                        },
                        {
                            "fieldName": "Claim No",
                            "sortable": false,
                            "sequence": 0
                        },
                        {
                            "fieldName": "Business Type",
                            "sortable": false,
                            "sequence": 0
                        },
                        {
                            "fieldName": "Insured Name",
                            "sortable": false,
                            "sequence": 0
                        }
                    ]
                }
            ],
            "promptMessages": [
                null
            ]
        }

    }
}