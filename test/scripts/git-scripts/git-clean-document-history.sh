. $PWD/scripts/git-scripts/functions/git-log-stat.sh
. $PWD/scripts/git-scripts/functions/git-branch-tree-snapshot.sh
. $PWD/scripts/git-scripts/functions/git-bundle.sh
. $PWD/scripts/git-scripts/functions/git-pull-branchs.sh
. $PWD/scripts/git-scripts/functions/git-push-branchs.sh
. $PWD/scripts/git-scripts/functions/git-repack.sh
. $PWD/scripts/git-scripts/functions/git-backup-branchs-before.sh
. $PWD/scripts/git-scripts/functions/git-backup-branchs-after.sh

git_pull_branchs
backup_before
branch_name=$(git rev-parse --abbrev-ref HEAD)
file_name=$(echo $branch_name | sed -e "s/\//-/g")
echo $file_name

log_path_before="git-branch-tree-snapshot-$(date +'%Y%m%d')-before.log"
log_path_after="git-branch-tree-snapshot-$(date +'%Y%m%d')-after.log"

tree_snapshot $log_path_before

git filter-branch --tree-filter 'rm -rf docusaurus' -f -d ../rewrite-logs -- --all

git_repack
tree_snapshot $log_path_after
backup_after
#git_push_branchs