get_current_branch() {
  current_branch=$(git rev-parse --abbrev-ref HEAD)
  echo ${current_branch}
}



