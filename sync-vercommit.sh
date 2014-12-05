#!/bin/sh

file_name="package.json"
logcount=`git log --oneline --no-merges | wc -l`
logcount=`echo $logcount | tr -d " "`
logcount=$(( logcount + 1 ))

sed -i -e "s/\"version\": \"\([0-9]*\)\.\([0-9]*\)\.\([0-9]*\)\"/\"version\": \"\1\.\2\.$logcount\"/g" $file_name
rm $file_name-e;


