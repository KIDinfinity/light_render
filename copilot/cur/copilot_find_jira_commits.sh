#!/bin/bash

# 检查参数数量
if [ $# -ne 2 ]; then
    echo "使用方法: $0 <base_path> <jira_id>"
    echo "示例: $0 /path/to/base JIRA-123"
    exit 1
fi

base_path="$1"
jira_id="$2"

# 检查base_path是否存在
if [ ! -d "$base_path" ]; then
    echo "错误: 路径 '$base_path' 不存在"
    exit 1
fi

echo "在路径 '$base_path' 中查找包含JIRA ID '$jira_id' 的提交记录..."
echo "=============================================="

# 遍历所有子目录
find "$base_path" -type d -not -path "$base_path" -not -path "$base_path/*/*" | while read -r dir; do
    # 检查目录是否为git仓库
    if [ -d "$dir/.git" ]; then
        echo ""
        echo "目录: $dir"
        echo "----------------------------------------------"
        
        # 在该目录的git仓库中查找包含jira_id的提交
        git -C "$dir" log --format="%H %s" --grep="$jira_id" --all 2>/dev/null | while read -r commit_line; do
            if [ -n "$commit_line" ]; then
                # 提取完整的commit hash和message
                commit_hash=$(echo "$commit_line" | cut -d' ' -f1)
                commit_message=$(echo "$commit_line" | cut -d' ' -f2-)
                echo "  $commit_hash - $commit_message"
            fi
        done
        
        # 如果没有找到匹配的提交
        if [ -z "$(git -C "$dir" log --oneline --grep="$jira_id" --all 2>/dev/null)" ]; then
            echo "  未找到包含 '$jira_id' 的提交记录"
        fi
    fi
done

echo ""
echo "查找完成。"
