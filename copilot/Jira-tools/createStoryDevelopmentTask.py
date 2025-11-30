import requests
from requests.auth import HTTPBasicAuth
from config import username, password
from setting import local_jira_url


def get_account_id():
    """
    获取当前用户的 Jira accountId
    """
    url = f"{local_jira_url}/rest/api/3/myself"
    resp = requests.get(url, auth=HTTPBasicAuth(username, password), timeout=10)
    resp.raise_for_status()
    return resp.json()["accountId"]


def get_issue_info(issue_key):
    """
    通过 issue key 查询所属项目的 projectId 和标题
    """
    url = f"{local_jira_url}/rest/api/3/issue/{issue_key}"
    resp = requests.get(url, auth=HTTPBasicAuth(username, password), timeout=10)
    resp.raise_for_status()
    data = resp.json()
    project_id = data["fields"]["project"]["id"]
    summary = data["fields"]["summary"]
    return project_id, summary

def link_issues(child_key, parent_key):
    """
    将 child_key 作为子任务链接到 parent_key
    """
    url = f"{local_jira_url}/rest/api/3/issueLink"
    payload = {
        "type": {"name": "Child"},  # 可根据实际需求选择类型，如 Parent-Child、Blocks、Relates 等
        "inwardIssue": {"key": parent_key},
        "outwardIssue": {"key": child_key}
    }
    resp = requests.post(url, auth=HTTPBasicAuth(username, password), headers={"Content-Type": "application/json"}, json=payload)
    if resp.status_code == 201 or resp.status_code == 204:
        print(f"成功将 {child_key} 链接为 {parent_key} 的子任务")
    else:
        print(f"链接失败: {resp.status_code}, {resp.text}")

def create_task_jira(summary, projectId):
    local_account_id = get_account_id()
    """
    创建一个 Task 类型的 Jira issue
    """
    url = f"{local_jira_url}/rest/api/3/issue"
    payload = {
        "fields": {
            "summary": summary,
            "assignee": {"id": local_account_id},
            "reporter": {"id": local_account_id},
            "issuetype": {"id": "10123"},  # Task 类型
            "project": {"id": projectId}
        }
    }
    resp = requests.post(url, auth=HTTPBasicAuth(username, password), headers={"Content-Type": "application/json"}, json=payload)
    resp.raise_for_status()
    data = resp.json()
    print(f"新建 Task 成功，key: {data['key']}, 链接: {local_jira_url}/browse/{data['key']}")
    return data['key']

def create_multi_tasks_and_link_to_parent(parent_issue_key):
    """
    依次新建三个 Task，并全部作为 child 链接到 parent_issue_key
    """
    projectId, parent_summary = get_issue_info(parent_issue_key)
    prefixes = ["[FE][DES]", "[FE][DEV]", "[FE][TEST]"]
    child_keys = []
    for prefix in prefixes:
        new_summary = f"{prefix} {parent_summary}"
        child_key = create_task_jira(new_summary, projectId)
        child_keys.append(child_key)
        link_issues(child_key, parent_issue_key)
        print(f"新建的 Task {child_key} 已作为 child 链接到 {parent_issue_key}")
    print(f"全部新建并关联完成，child keys: {child_keys}")

if __name__ == "__main__":
    parent_keys = input("请输入 parent issue key（可用逗号分隔多个）: ")
    for key in [k.strip() for k in parent_keys.split(',') if k.strip()]:
        create_multi_tasks_and_link_to_parent(key)

