export const snapShotSchema = {
    "id": "snapShotSchema",
    "type": "object",
    "properties": {
        "caseCategory": {"type": "string"},
        "claimNo": {"type": "string"},
        "inquiryClaimNo": {"type": "string"},
        "status": {"type": "string"},
        "id": {"type": "string"},
      },
    "required": ["caseCategory", "claimNo", "inquiryClaimNo", "status", "id"]
}
