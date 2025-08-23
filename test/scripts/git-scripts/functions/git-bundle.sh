. $PWD/scripts/git-scripts/functions/git-log-stat.sh
bundle_branch(){
	git bundle create $1.$(date +'%Y%m%d').bundle $1 HEAD
}
git fetch

bandle_main_branchs() {
	for branch in presit sit-hk sit-jp sit-th-p2 sit-ph demohk  demo-jp demoph demo-th master
	do
		echo $branch
		bundle_branch $branch
	done
}

