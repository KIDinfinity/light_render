#!/bin/zsh

if [ $# -lt 1 ]; then
  echo "用法: $0 <Jira Issue ID>"
  exit 1
fi



issue_id="$1"
repo_base_path="/Users/226838/Documents/company/codeReview/ui/sourceCode"
target_dir="./review_prompts"
target_prompt="${target_dir}/${issue_id}_review.prompt.md"

# 确保 target_prompt 所在文件夹存在
mkdir -p "$(dirname "$target_prompt")"

python3 gen_reivew_prompt.py "$issue_id" "$repo_base_path" --source local --output "${target_prompt}"
