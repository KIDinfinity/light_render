current_branch=$(git rev-parse --abbrev-ref HEAD)
echo $current_branch
for branch in presit sit-hk sit-jp sit-th-p2 sit-ph demohk  demo-jp demoph demo-th master
do
   git checkout $branch
   git pull
   tag_name=Feature-${branch}-$(date +'%Y%m%d')
   git tag $tag_name
   git push origin $tag_name
done
git checkout $current_branch
