git_pull_branchs(){
	current_branch=$(git rev-parse --abbrev-ref HEAD)
	for branch in ` git ls-remote --heads origin | sed 's/[0-9|a-z]*[[:blank:]]//g' | sed 's/refs\/heads\///g'`;do
		echo $branch
		git checkout $branch
		git pull
	done
	git checkout $current_branch
}