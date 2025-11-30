## TODO: 如果没comment忽略不必要附件，如果local没附件不需要call删除附件

import requests
from requests.auth import HTTPBasicAuth
from datetime import datetime
import re
import sys
from config import username, password
from setting import projectId, doneId, group_jira_url, local_jira_url
from shared.choice import select_choice

## 获取本地 Jira 单个 issue
def get_local_issue(issue_key):
    url = f"{local_jira_url}/rest/api/2/issue/{issue_key}"
    resp = requests.get(
        url,
        auth=HTTPBasicAuth(username, password),
        headers={"Accept": "application/json"},
        timeout=10,
    )
    resp.raise_for_status()
    return resp.json()

## 获取 group Jira 单个 issue
def get_group_issue(issue_key):
    url = f"{group_jira_url}/rest/api/2/issue/{issue_key}"
    resp = requests.get(
        url,
        auth=HTTPBasicAuth(username, password),
        headers={"Accept": "application/json"},
        timeout=10,
    )
    resp.raise_for_status()
    return resp.json()

## 获取本地 Jira accountId
def get_account_id():
    url = f"{local_jira_url}/rest/api/2/myself"
    resp = requests.get(url, auth=HTTPBasicAuth(username, password), timeout=10)
    resp.raise_for_status()
    local_account_id = resp.json()["accountId"]
    print(f"🔑 Local Jira accountId: {local_account_id}")
    return local_account_id


## 查找本地 Jira issue
def find_existing_local_issue(group_jira_id):
    search_url = f"{local_jira_url}/rest/api/2/search/jql"
    jql = f'summary ~ "{group_jira_id}"'
    params = {"jql": jql, "fields": "key,assignee,summary"}
    resp = requests.get(
        search_url,
        auth=HTTPBasicAuth(username, password),
        headers={"Accept": "application/json"},
        params=params,
    )
    resp.raise_for_status()
    issues = resp.json().get("issues", [])
    return issues


## 查找 group Jira issue
def find_group_issue(jira):
    jira_url = f"{group_jira_url}/rest/api/2/search/jql?jql=key%20in%20({jira})&startAt=0&maxResults=50&fields=summary,status,priority,fixVersions,assignee,labels,description,components,issuetype,project,attachment,comment"
    print("🚀 Fetching from group Jira:", jira)
    response = requests.get(
        jira_url,
        auth=HTTPBasicAuth(username, password),
        headers={"Accept": "application/json"},
        timeout=30,
    )
    response.raise_for_status()  # Raise an HTTPError for bad responses (4xx and 5xx)

    issues = response.json().get("issues", [])
    print(f"✅ Fetched {len(issues)} issues from group Jira.")
    return issues


## 检查本地是否已存在相应的 Jira issue
def checkExistingLocalIssue(issues):
    issue_actions = []
    for issue in issues:
        group_jira_id = issue["key"]
        existing_issues = find_existing_local_issue(group_jira_id)
        if existing_issues:
            print(
                f"⚠️ 已存在本地Jira issue: {[i['key'] for i in existing_issues]} for {group_jira_id}"
            )
            choice = select_choice(
                f"{group_jira_id} 请选择操作：",
                choices=["更新已有的", "创建新的", "跳过该Jira", "结束本次操作"],
            )
            if choice == "更新已有的":
                if len(existing_issues) > 1:
                    issue_choice = select_choice(
                        "有多个本地 issue 可选，请选择要修改的 issue：",
                        choices=[
                            f"{ei['key']} - {ei['fields']['assignee']['displayName']} - {ei['fields']['summary']}"
                            for ei in existing_issues
                        ],
                    )
                    local_key = issue_choice.split(" - ")[0]
                else:
                    local_key = existing_issues[0]["key"]
                issue_actions.append(
                    {"action": "update", "issue": issue, "local_key": local_key}
                )
            elif choice == "创建新的":
                issue_actions.append({"action": "create", "issue": issue})
            elif choice == "跳过该Jira":
                print("跳过该 issue。")
                continue
            else:
                print("结束。")
                sys.exit(1)
        else:
            issue_actions.append({"action": "create", "issue": issue})
    return issue_actions

## 获取 accountId 对应的用户名
def getAccountNames(fields):
    account_ids = set()
    # 1. 从comment+description提取accountId
    for comment in fields["comment"]["comments"]:
        ids_in_body = re.findall(r"\[~accountid:([^\]]+)\]", comment.get("body", ""))
        account_ids.update(ids_in_body)
        author_id = comment.get("author", {}).get("accountId")
        if author_id:
            account_ids.add(author_id)
        for user in comment.get("mentionedUsers", []):
            uid = user.get("accountId")
            if uid:
                account_ids.add(uid)
    # description
    desc_raw = fields.get("description", "")
    if isinstance(desc_raw, str):
        ids_in_desc = re.findall(r"\[~accountid:([^\]]+)\]", desc_raw)
        account_ids.update(ids_in_desc)
    elif isinstance(desc_raw, dict):

        def find_accountids(obj):
            if isinstance(obj, dict):
                for v in obj.values():
                    find_accountids(v)
            elif isinstance(obj, list):
                for item in obj:
                    find_accountids(item)
            elif isinstance(obj, str):
                ids = re.findall(r"\[~accountid:([^\]]+)\]", obj)
                account_ids.update(ids)

        find_accountids(desc_raw)

    # 2. 查询所有 accountId 对应人名
    accountid_to_name = {}
    if account_ids:
        bulk_url = f"{group_jira_url}/rest/api/2/user/bulk"
        params = [("accountId", aid) for aid in account_ids]
        bulk_resp = requests.get(
            bulk_url,
            auth=HTTPBasicAuth(username, password),
            headers={"Content-Type": "application/json"},
            params=params,
        )
        if bulk_resp.status_code == 200:
            for user in bulk_resp.json().get("values", []):
                aid = user.get("accountId")
                name = user.get("displayName")
                if aid and name:
                    accountid_to_name[aid] = name
        # 没查到的显示未知用户
        for aid in account_ids:
            if aid not in accountid_to_name:
                accountid_to_name[aid] = f"未知用户:{aid}"
    return accountid_to_name


## 忽略附件和引用
def ignore_attachment_or_reference(match):
    # 附件 !xxx|xxx! 匹配 group(1), group(2)
    if match.group(1) and match.group(2):
        filename = match.group(1)
        extra = match.group(2)
        alt_match = re.search(r'alt="([^"]+)"', extra)
        if alt_match:
            alt_text = alt_match.group(1)
            return "{color:#36b37e}(已忽略附件：" + alt_text + "){color}"
        else:
            return "{color:#36b37e}(已忽略附件：" + filename + "){color}"
    # 引用 [^xxx] 匹配 group(3)
    elif match.group(3):
        ref = match.group(3)
        return "{color:#36b37e}(已忽略引用附件：" + ref + "{color}"
    return match.group(0)


## 替换 accountId 为用户名
def replace_accountid(accountName, match):
    aid = match.group(1)
    name = accountName.get(aid)
    if name:
        name = name.strip()
    if aid:
        aid = aid.strip()
    print("replace_accountid", aid, " ==> ", name)
    if name and not name.startswith("未知用户"):
        return "{color:#4c9aff}" + "*@" + name + "*" + "{color}"
    else:
        return "{color:#4c9aff}" + "*@未知用户:" + aid + "*" + "{color}"


## 遍历替换 accountId 为用户名
def replace_accountid_in_content(accountName, content):
    if isinstance(content, list):
        return [replace_accountid_in_content(accountName, item) for item in content]
    elif isinstance(content, dict):
        for k, v in content.items():
            content[k] = replace_accountid_in_content(accountName, v)
        return content
    elif isinstance(content, str):
        return re.sub(
            r"\[~accountid:([^\]]+)\]",
            lambda m: replace_accountid(accountName, m),
            content,
        )
    else:
        return content


## 创建或修改 issue
def updateOrCreateIssue(
    group_jira_id, local_account_id, cleaned_description, action, local_key, fields, skipUpdate
):
    payload = {
        "fields": {
            "summary": f"({group_jira_id}) {fields.get('summary', '')}",
            "assignee": {"id": local_account_id},
            "reporter": {"id": local_account_id},
            "description": cleaned_description,
            "issuetype": {"id": "10123"},  # Task
            "project": {"id": projectId},  # OMNE  , Galaxy => 10008
        }
    }
    if action == "update" and local_key and skipUpdate:
        print(f"🧼 跳过更新本地 issue {local_key}，保持不变。")
        return local_key
    if action == "update" and local_key:
        local_jira_key = local_key
        local_jira_update_url = f"{local_jira_url}/rest/api/2/issue/{local_jira_key}"
        post_response = requests.put(
            local_jira_update_url,
            auth=HTTPBasicAuth(username, password),
            headers={"Content-Type": "application/json"},
            json=payload,
        )
    else:
        local_jira_post_url = f"{local_jira_url}/rest/api/2/issue"
        post_response = requests.post(
            local_jira_post_url,
            auth=HTTPBasicAuth(username, password),
            headers={"Content-Type": "application/json"},
            json=payload,
        )
    print(f"💡 Response status code: {post_response.status_code}, {post_response.text}")

    if post_response.status_code == 204:
        print(f"✅✅ Issue {group_jira_id} updated successfully ")
    else:
        post_response.raise_for_status()
        response_json = post_response.json()
        local_jira_key = response_json.get("key")
        jira_link = f"{local_jira_url}/browse/{local_jira_key}"
        print(f"✅✅ Issue {group_jira_id} copied to local Jira: {jira_link}")
    return local_jira_key


def updateJiraStatus(local_jira_key, updateStatus):
    if local_jira_key and updateStatus == True:
        transition_url = (
            f"{local_jira_url}/rest/api/2/issue/{local_jira_key}/transitions"
        )
        transition_payload = {"transition": {"id": doneId}}
        transition_response = requests.post(
            transition_url,
            auth=HTTPBasicAuth(username, password),
            headers={"Content-Type": "application/json"},
            json=transition_payload,
        )
        if transition_response.status_code == 204:
            print(f"✅✅ Issue {local_jira_key} status changed to Done")
        else:
            print(
                f"⚠️ Failed to change status for {local_jira_key}: {transition_response.text}"
            )


## 上传附件
def uploadAttachments(local_jira_key, fields, uploadAttachment):
    if local_jira_key and uploadAttachment == True:
        attachments = fields.get("attachment", [])
        print("🚀 start handling attachments...")
        del_url = f"{local_jira_url}/rest/api/2/issue/{local_jira_key}/attachments"
        del_resp = requests.delete(
            del_url,
            auth=HTTPBasicAuth(username, password),
            headers={"Accept": "application/json"},
            timeout=30,
        )
        if del_resp.status_code != 204 and del_resp.status_code != 200:
            print(f"⚠️ Failed to delete attachments", del_resp)
        else:
            print(f"✅✅ Deleted all attachments and start upload attachments ...")
            for att in attachments:
                file_binary = requests.get(
                    att["content"],
                    auth=HTTPBasicAuth(username, password),
                    timeout=30,
                    headers={"Accept": "*/*"},
                )
                file_binary.raise_for_status()
                files = {
                    "file": (
                        att["filename"],
                        file_binary.content,
                        att["mimeType"],
                    )
                }
                upload_url = (
                    f"{local_jira_url}/rest/api/2/issue/{local_jira_key}/attachments"
                )
                upload_resp = requests.post(
                    upload_url,
                    auth=HTTPBasicAuth(username, password),
                    headers={"X-Atlassian-Token": "no-check"},
                    files=files,
                )
                if upload_resp.status_code == 200:
                    print(f"✅ {att['filename']} uploaded to {local_jira_key}")
                else:
                    print(f"⚠️ Failed to upload {att['filename']}: {upload_resp.text}")


def uploadComments(local_jira_key, accountid_to_name, fields, uploadComment):
    if (
        local_jira_key
        and uploadComment == True
        and "comment" in fields
        and fields["comment"].get("comments")
    ):
        print("🚀 Start handling comments...")

        # 先获取所有本地评论并逐个删除
        get_comments_url = f"{local_jira_url}/rest/api/2/issue/{local_jira_key}/comment"
        get_comments_resp = requests.get(
            get_comments_url,
            auth=HTTPBasicAuth(username, password),
            headers={"Accept": "application/json"},
        )
        if get_comments_resp.status_code == 200:
            local_comments = get_comments_resp.json().get("comments", [])
            for lc in local_comments:
                del_comment_url = f"{local_jira_url}/rest/api/2/issue/{local_jira_key}/comment/{lc['id']}"
                del_comment_resp = requests.delete(
                    del_comment_url,
                    auth=HTTPBasicAuth(username, password),
                    headers={"Accept": "application/json"},
                )
                if del_comment_resp.status_code in [204, 200]:
                    print(f"🗑️ Deleted local comment {lc['id']}")
                else:
                    print(
                        f"⚠️ Failed to delete comment {lc['id']}: {del_comment_resp.text}"
                    )

        sorted_comments = sorted(
            fields["comment"]["comments"],
            key=lambda x: x.get("created", ""),
            reverse=True,
        )
        for comment in sorted_comments:
            comment_body = comment.get("body")
            author = comment.get("author", {}).get("displayName", "Unknown")
            created = comment.get("created", "")
            try:
                created_fmt = datetime.strptime(
                    created[:19], "%Y-%m-%dT%H:%M:%S"
                ).strftime("%Y-%m-%d %H:%M")
            except Exception:
                created_fmt = created  # 如果解析失败则用原始字符串

            if comment_body:
                comment_body = re.sub(
                    r"\[~accountid:([^\]]+)\]",
                    lambda m: replace_accountid(accountid_to_name, m),
                    comment_body,
                )
            comment_text = (
                "【原作者: {color:#36b37e}*"
                + author
                + "*{color} - {color:#97a0af}"
                + created_fmt
                + " {color}】\n"
                + comment_body
            )
            if not comment_text:
                continue
            comment_payload = {"body": comment_text}
            comment_url = f"{local_jira_url}/rest/api/2/issue/{local_jira_key}/comment"
            # print("comment_payload", comment_payload)
            comment_resp = requests.post(
                comment_url,
                auth=HTTPBasicAuth(username, password),
                headers={"Content-Type": "application/json"},
                json=comment_payload,
            )
            if comment_resp.status_code in [200, 201]:
                print(f"✅ Comment added: {author} {created}...")
            else:
                print(f"⚠️ Failed to add comment: {comment_resp.text}")

def logworkJira(local_jira_key, fields):
    if local_jira_key and "timetracking" in fields:
        print("🚀 Start handling logwork...")

## 复制 group Jira issue 到本地 Jira
def copy_group_to_local(
    jira, updateStatus=True, uploadAttachment=False, uploadComment=False, skipUpdate = False
):
    try:
        # Step 1: 获取 group Jira issue 详情
        issues = find_group_issue(jira)
        # Step 2: 遍历查找本地是否已存在，确认修改还是创建新的
        issue_actions = checkExistingLocalIssue(issues)
        if not issue_actions:
            print("没有需要处理的 issue，操作结束。")
            return
        # Step 3: 获取本地 accountId
        local_account_id = get_account_id()
        # Step 4: 遍历 issue_actions，进行创建或更新
        for item in issue_actions:
            issue = item["issue"]
            action = item["action"]
            local_key = item.get("local_key") 
            group_jira_id = issue["key"]
            fields = issue["fields"]

            # 1. 查询所有 accountId 对应人名
            accountid_to_name = getAccountNames(fields)

            # 2. description 前面加上链接,关联回groupJira
            panel_block = (
                "{panel:bgColor=#e3fcef}\n {color:#ff991f}*Group JIRA Link:*  {color}["
                + group_jira_url
                + "/browse/"
                + group_jira_id
                + "|"
                + group_jira_url
                + "/browse/"
                + group_jira_id
                + "|smart-link]{color:#ff991f} {color}\n{panel}"
            )
            desc_content = fields.get("description", "")
            # 3. 替换 accountId 为用户名
            if desc_content is None:
                desc_content = ""
            cleaned_description = panel_block + replace_accountid_in_content(
                accountid_to_name, desc_content
            )
            # 4. 忽略附件和引用 (没有uploadAttachment时)
            if not uploadAttachment and isinstance(cleaned_description, str):
                cleaned_description = re.sub(
                    r"!([^!|]+)\|([^!]+)!|\[\^([^\]]+)\]",
                    lambda m: ignore_attachment_or_reference(m),
                    cleaned_description,
                )

            # 5. 创建或修改jira
            local_jira_key = updateOrCreateIssue(
                group_jira_id,
                local_account_id,
                cleaned_description,
                action,
                local_key,
                fields,
                skipUpdate
            )

            # 6. 更新jira状态
            updateJiraStatus(local_jira_key, updateStatus)

            # 7. 上传附件
            uploadAttachments(local_jira_key, fields, uploadAttachment)

            # 8. 上传评论
            uploadComments(local_jira_key, accountid_to_name, fields, uploadComment)
            
            print(f"✅ Issue processed: {local_jira_key} \n")
            return local_jira_key
    except requests.exceptions.RequestException as e:
        print(f"❌❌ An error occurred: {e}")
