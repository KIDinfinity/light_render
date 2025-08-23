git_repack() {
  rm -rf .git/refs/original/

  git reflog expire --expire=now --all

  git fsck --full --unreachable

  git repack -A -d

  git gc --aggressive --prune=now
}