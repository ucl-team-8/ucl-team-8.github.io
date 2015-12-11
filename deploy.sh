cd "$(dirname "$0")"
jekyll build --config _config.yml,_config_deploy.yml

if [ -z ${CSUSER+x} ]; then
  printf "\nEnter CS username: "
  read CSUSER
fi

echo "Syncing server... "
rsync -a --chmod=Du=rwx,Dgo=rx,Fu=rw,Fgo=r ./_site/* $CSUSER@newgate.cs.ucl.ac.uk:/cs/student/www/2015/group8/
echo "done."
