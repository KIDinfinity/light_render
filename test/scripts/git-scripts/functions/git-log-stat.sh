. $PWD/scripts/git-scripts/remove-file.sh
git_log_stat() {
  file_name=$1 
  echo $file_name
  remove_file $file_name
  git log --stat >> $file_name
}