git fetch
git tag | grep $(date +'%Y%m%d') | xargs -I {} git push origin --delete {}
git tag | grep $(date +'%Y%m%d') | xargs -I {} git tag -d {}