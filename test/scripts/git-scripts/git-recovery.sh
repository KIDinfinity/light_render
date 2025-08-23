select bundle_name in `ls *.bundle`; do
  echo "word is: $bundle_name"
  branch_name=`sed 's/\.[0-9]*\.bundle//g' <<<"$bundle_name"`

  echo "branch name: $branch_name"
  # git bundle unbundle $branch_name
  # echo `sed -i "s/refs\/heads\/'$branch_name'//g"` <<<`git bundle unbundle $bundle_name | sed '2d'`
  echo `git bundle unbundle $bundle_name | sed -i "s/$branch_name/123/g"`
done