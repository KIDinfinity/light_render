. $PWD/scripts/git-scripts/functions/git-log-stat.sh

log_main_branchs_before() {
	for branch in presit sit-hk sit-jp sit-th-p2 sit-ph demohk  demo-jp demoph demo-th master
	do
		git pull
		echo $branch
		log_file_name="$branch.$(date +'%Y%m%d')-before-commit-log-stat.log"
		git_log_stat $log_file_name
	done
}

