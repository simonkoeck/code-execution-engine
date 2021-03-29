#!/usr/bin/env bash

dir="$( cd "$( dirname "$0" )" && pwd )"

id=$1


touch $dir/lockfile

# process incrementor
exec 200>$dir/lockfile
flock 200

touch $dir/i
runner=$(cat $dir/i)
let 'runner = runner % 150 + 1'

echo $runner > $dir/i
exec 200>&-

# prevent users from spying on each other
lxc-attach --clear-env -n cee -- \
    /bin/bash -c "
        chown runner$runner: -R /tmp/$id
        chmod 700 /tmp/$id
    " > /dev/null 2>&1

# runner
timeout -s KILL 20 \
    lxc-attach --clear-env -n cee -- \
        /bin/bash -l -c "runuser runner$runner /tmp/$id/runner.sh /tmp/$id"


lxc-attach --clear-env -n cee -- \
    /bin/bash -c "
        while pgrep -u runner$runner > /dev/null
        do
            pkill -u runner$runner --signal SIGKILL
        done
        find /tmp -user runner$runner -delete
        find /var/tmp -user runner$runner -delete
        find /var/lock -user runner$runner -delete
        find /dev/shm -user runner$runner -delete
        find /run/lock -user runner$runner -delete
    " > /dev/null 2>&1 &
