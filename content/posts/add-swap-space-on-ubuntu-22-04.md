---
title: Add Swap Space on Ubuntu 22.04
date: 2022-10-08 11:40
tags:
  - OOM
  - Ubuntu
  - VPS
  - VM
  - WordPress
  - Out of memory
  - Swap space
description: Protect your VPS against out of memory in applications by adding swap space.
---
## Check Swap Information

```
sudo swapon --show
```

V﻿erify that there is no active swap using the `free` utility:

```
free -h
```

```
Output
                total        used        free      shared  buff/cache   available
Mem:            15Gi       2.6Gi       7.5Gi       821Mi       5.3Gi        11Gi
Swap:          2.0Gi          0B       2.0Gi

```

## C﻿heck Available Space on Hard Drive

```
df -h
```

```
Output
Filesystem      Size  Used Avail Use% Mounted on
tmpfs           1.6G  2.3M  1.6G   1% /run
/dev/nvme0n1p2  234G   24G  198G  11% /
tmpfs           7.7G  155M  7.6G   2% /dev/shm
tmpfs           5.0M  4.0K  5.0M   1% /run/lock
/dev/nvme0n1p1  511M  5.3M  506M   2% /boot/efi
tmpfs           1.6G  8.2M  1.6G   1% /run/user/1000
```

The device with `/` in the `Mounted on` the column is our disk in this case.

## Creating a Swap File

The best way of creating a swap file is with the `fallocate` program. This command instantly creates a file of the specified size.

```
sudo fallocate -l 1G /swapfile
```

V﻿erify this by using:

```
ls -lh /swapfile
```

```
-rw------- 1 root root 2.0G اگست   23 09:28 /swapfile
```

## E﻿nable Swap File

Make the file only accessible to **root** by typing:

```
sudo chmod 600 /swapfile
```

V﻿erify by using this:

```
ls -lh /swapfile
```

```
-rw------- 1 root root 2.0G اگست   23 09:28 /swapfile
```

We can now mark the file as swap space by typing:

```
sudo mkswap /swapfile
```

```
Setting up swapspace version 1, size = 2048 MiB (1073737728 bytes)
no label, UUID=6e965805-2ab9-450f-aed6-577e74089dbf
```

After marking the file, we can enable the swap file, allowing our system to start using it:

```
sudo swapon /swapfile
```

Verify that the swap is available by using:

```
sudo swapon --show
```

```
NAME      TYPE SIZE USED PRIO
/swapfile file   2G   0B   -2
```

N﻿ow check again output of the`free` utility 

```
free -h
```

## M﻿ake Swap File Permanent

Back up the `/etc/fstab` file in case anything goes wrong:

```
sudo cp /etc/fstab /etc/fstab.bakcup
```

Add the swap file information to the end of your `/etc/fstab` file by typing:

```
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```