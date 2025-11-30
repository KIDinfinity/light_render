import requests
from requests.auth import HTTPBasicAuth
import argparse
import sys
from config import username, password
from setting import projectId, doneId, group_jira_url, local_jira_url

if not username or not password:
    print("❌ Username and password must be provided. Please check your credentials.")
    sys.exit(1)

def get_account_id():
    """
    获取当前用户的 Jira accountId
    """
    url = f"{local_jira_url}/rest/api/3/myself"
    resp = requests.get(url, auth=HTTPBasicAuth(username, password), timeout=10)
    resp.raise_for_status()
    return resp.json()["accountId"]


def get_my_issues_not_done(project_id, account_id):
    """
    获取当前用户在指定项目下所有状态不是 Done 的 issue
    """
    jql = f"project={project_id} AND assignee={account_id} AND status != Done"
    url = f"{local_jira_url}/rest/api/3/search"
    params = {"jql": jql, "fields": "key,status,summary,assignee", "maxResults": 100}
    resp = requests.get(
        url, auth=HTTPBasicAuth(username, password), params=params, timeout=10
    )
    resp.raise_for_status()
    return resp.json()["issues"]


def transition_issue_to_done(issue_key):
    """
    把指定 issue 状态切换为 Done
    """
    transition_url = f"{local_jira_url}/rest/api/3/issue/{issue_key}/transitions"
    transition_payload = {"transition": {"id": doneId}}
    response = requests.post(
        transition_url,
        auth=HTTPBasicAuth(username, password),
        headers={"Content-Type": "application/json"},
        json=transition_payload,
    )
    return response.status_code == 204


try:
    local_account_id = get_account_id()
    print(f"🔑 Local Jira accountId: {local_account_id}")

    issues = get_my_issues_not_done(projectId, local_account_id)
    print(
        f"📋 Found {len(issues)} issues not Done in project {projectId} assigned to you"
    )

    for issue in issues:
        print("🧼" * 3)
        print("Issue Key: ", issue["key"])
        print("Summary  : ", issue["fields"]["summary"])
        print("Assignee : ", issue["fields"]["assignee"]["displayName"])
        print("Status   : ", issue["fields"]["status"]["name"])
        print("=" * 60)

    confirm = input("是否将所有这些 issue 状态改为 Done? (y/n): ")
    if confirm.lower() == "y":
        print(f"✅ Issue confirm")
        for issue in issues:
            key = issue["key"]
            print(f"⏳ Changing status for {key} ...")
            if transition_issue_to_done(key):
                print(f"✅ Issue {key} status changed to Done")
            else:
                print(f"⚠️ Failed to change status for {key}")
    else:
        print("操作已取消。")

except requests.exceptions.RequestException as e:
    print(f"❌❌ An error occurred: {e}")
