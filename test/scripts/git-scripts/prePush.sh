presitHash=$(git merge-base HEAD origin/presit);
sitHash=$(git merge-base HEAD origin/sit);
firstHash=$(git merge-base $sitHash $presitHash);
# 这里要用较晚的hash，如果当前代码是从presit上切出来的，和presit的交叉commit就是较晚的，应当用presit的commit来diff
# 因此先找最早的hash，如果最早的hash与sit的相同，那presit就是较晚的。如果不同，那可能是sit较晚，也可能是有不合规范的操作导致最早的hash与两边都不同，这两种情况我们都用sit来diff。
if [ $firstHash == $sitHash ]; then
  closestHash=$presitHash
else
  closestHash=$sitHash
fi
fileList=$(git diff-tree $closestHash HEAD -r --name-only | grep -E '^(src/|packages/)');
if [ -z "$fileList" ]; then
  echo "No change, autoPush"
  exit 0;
fi
echo "Diff end, start testing, files changed:"
echo $fileList;
npx umi-test $fileList --passWithNoTests --cache --findRelatedTests;
exit $?;