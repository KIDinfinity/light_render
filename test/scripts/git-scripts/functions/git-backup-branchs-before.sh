. $PWD/scripts/git-scripts/functions/git-bundle.sh
. $PWD/scripts/git-scripts/functions/git-log-main-branchs-before.sh

backup_before() {
  log_main_branchs_before
  bandle_main_branchs
}