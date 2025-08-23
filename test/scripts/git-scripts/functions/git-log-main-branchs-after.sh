. $PWD/scripts/git-scripts/functions/git-log-stat.sh

log_main_branchs_after() {
	flag=after
	for branch in presit sit-hk sit-jp sit-th-p2 sit-ph demohk  demo-jp demoph demo-th master
	do
		echo $branch
		log_file_name="$branch.$(date +'%Y%m%d')-$flag-commit-log-stat.log"
		git_log_stat $log_file_name
	done
}

