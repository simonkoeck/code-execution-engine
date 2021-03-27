lxc-attach --clear-env -n $1 -- \
    /bin/bash -l -c "id"