remove_file() {
  if test -f $1;then
    rm $1
  fi
}