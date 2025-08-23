bundle_branch(){
	git bundle create $1.$(date +'%Y%m%d').bundle $1 HEAD
}