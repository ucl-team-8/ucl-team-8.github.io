if [ -z ${CSUSER+x} ]; then
  echo "CSUSER not set."
else
  cd "$(dirname "$0")"
  jekyll build
  printf "\nSyncing server... "
  rsync -a --chmod=Du=rwx,Dgo=rx,Fu=rw,Fgo=r ./_site/* $CSUSER@newgate.cs.ucl.ac.uk:/cs/student/www/2015/group8/
  printf "done.\n"
fi
