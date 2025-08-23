git cherry-pick b68f9363abc17b6998e5c473420fb2921ecf6868 -n
cd node_modules
rm -r .cache
rm -r @umijs/plugins
rm -r redux-saga
rm -r dva-core
cd .. 
yarn --check-files
git reset HEAD patches/redux-saga+0.16.2.patch
git checkout -f patches/redux-saga+0.16.2.patch
git reset HEAD patches/dva-core+2.0.4.patch
git checkout -f patches/dva-core+2.0.4.patch
git reset HEAD patches/@umijs+plugins+4.2.5.patch
git clean -f patches/@umijs+plugins+4.2.5.patch