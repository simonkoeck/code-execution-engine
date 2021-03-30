runners=$1

for i in {1..$runners}; do
    userdel runner$i
done
