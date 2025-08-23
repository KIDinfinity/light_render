. $PWD/scripts/git-scripts/remove-file.sh
# git fetch
tree_snapshot() {
  # file_path=./logs/git-branch-tree-snapshot-$(date +'%Y%m%d').log
  echo " file_path $1"
  file_path=$1
  if test -f "$file_path";then
  remove_file "$file_path"
  fi
  git log --oneline --graph --all  >> $file_path
}
