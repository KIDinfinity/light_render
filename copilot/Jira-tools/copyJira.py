import argparse
import sys
from config import username, password
from shared.jira import copy_group_to_local

updateStatus = True
uploadAttachment = False
uploadComment = False

if not username or not password:
    print("❌ Username and password must be provided. Please check your credentials.")
    sys.exit(1)

# Parse command-line arguments
parser = argparse.ArgumentParser(
    description="Fetch Jira issues based on a list of keys and copy them to local Jira."
)
parser.add_argument(
    "--jira", required=True, help="list of Jira issue keys. Sample: SOGOTMOMEN-31234"
)
parser.add_argument(
    "--no-status",
    action="store_true",
    help="Do not update issue status (default: True)",
)
parser.add_argument(
    "--attachment", action="store_true", help="Upload attachments (default: False)"
)
parser.add_argument(
    "--comment", action="store_true", help="Upload comments (default: False)"
)
args = parser.parse_args()

if not args.jira.strip():
    parser.error(
        "The --jira argument cannot be empty. Please provide a comma-separated list of Jira issue keys."
    )

uploadAttachment = args.attachment if args.attachment else False
uploadComment = args.comment if args.comment else False
if args.no_status:
    updateStatus = False


copy_group_to_local(args.jira, updateStatus, uploadAttachment, uploadComment)
