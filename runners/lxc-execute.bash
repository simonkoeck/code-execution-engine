#!/usr/bin/env bash
basepath="/var/lib/lxc/cee/rootfs"

id=$1

# runner
timeout -s KILL 20 \
    lxc-attach --clear-env -n cee -- \
        /bin/bash -l -c "/tmp/$id/runner.sh /tmp/$id/code.code"

rm -rf $basepath/tmp/$id