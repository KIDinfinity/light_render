import argparse
from shared.jira import get_group_issue, get_local_issue

# custom field 映射
CUSTOM_FIELDS = {
    "description": "description",
    "businessRule": "customfield_10131",
    "acceptanceCriteria": "customfield_10132",
    "designDetail": "customfield_10133"
}

def get_custom_fields_str(ticket_id, source):
    if source == "group":
        try:
            issue = get_group_issue(ticket_id)
        except Exception as e:
            print(f"获取group Jira失败: {e}")
            return None
    elif source == "local":
        try:
            issue = get_local_issue(ticket_id)
        except Exception as e:
            print(f"获取local Jira失败: {e}")
            return None
    else:
        print("source参数必须为 'group' 或 'local'")
        return None
    if not issue or "fields" not in issue:
        print(f"未找到Jira: {ticket_id}")
        return None
    fields = issue["fields"]
    values = []
    for key in CUSTOM_FIELDS.keys():
        v = fields.get(CUSTOM_FIELDS[key], "")
        if isinstance(v, dict) and "content" in v:
            v = str(v["content"])
        value_str = str(v) if v is not None else ""
        # 拼接字段名和内容
        values.append(f"{key}: {value_str}")
    return "\n\n".join(values)


def parse_args():
    parser = argparse.ArgumentParser(description="获取Jira自定义字段内容")
    parser.add_argument("ticket_id", help="Jira Ticket ID")
    parser.add_argument("source", choices=["group", "local"], help="数据来源: group 或 local")
    return parser.parse_args()

if __name__ == "__main__":
    args = parse_args()
    result = get_custom_fields_str(args.ticket_id, args.source)
    if result is not None:
        print(result)
