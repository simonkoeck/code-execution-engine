runners=$1
nproc=$2
nofile=$3

for i in {1..$runners}; do
    useradd -M runner$i
    usermod -d /tmp runner$i
    echo "runner$i soft nproc $nproc" >> /etc/security/limits.conf
    echo "runner$i hard nproc $nproc" >> /etc/security/limits.conf
    echo "runner$i soft nofile $nofile" >> /etc/security/limits.conf
    echo "runner$i hard nofile $nofile" >> /etc/security/limits.conf
done
