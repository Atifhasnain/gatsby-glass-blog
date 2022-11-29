---
title: Zabbix 6.0 Installation on Ubuntu 22.04 Using Apache2
date: 2022-11-29 15:39
tags:
  - Zabbix
description: Setup & Install Zabbix on Ubuntu using Apache
---
##### Install Zabbix repository

```
wget https://repo.zabbix.com/zabbix/6.0/ubuntu/pool/main/z/zabbix-release/zabbix-release_6.0-4%2Bubuntu22.04_all.deb
 
sudo dpkg -i zabbix-release_6.0-4+ubuntu22.04_all.deb

sudo apt update
```

##### Install Zabbix server, frontend, agent

```
apt install zabbix-server-mysql zabbix-frontend-php zabbix-apache-conf zabbix-sql-scripts zabbix-agent
```

##### Edit php.ini File

```
sudo vi /etc/php/8.1/apache2/php.ini

Change the following settings:

memory_limit 256M
upload_max_filesize 16M
post_max_size 16M
max_execution_time 300
max_input_time 300
max_input_vars 10000
date.timezone = Asia/Karachi
```

##### Setup MySQL Password using Secure Installation

```
mysql_secure_installation
```

##### Start MySQL

```
mysql -uroot -p
Enter Password for MySQL
```

##### Create initial database

```
create database zabbix character set utf8mb4 collate utf8mb4_bin;
create user zabbix@localhost identified by 'password';
grant all privileges on zabbix.* to zabbix@localhost;
set global log_bin_trust_function_creators = 1;
quit; 
```

##### Import Initial Schema & Data

```
zcat /usr/share/zabbix-sql-scripts/mysql/server.sql.gz | mysql --default-character-set=utf8mb4 -uzabbix -p zabbix
```

Now **disable log_bin_trust_function_creators** option.

```
mysql -uroot -p
Enter Password for MySQL

set global log_bin_trust_function_creators = 0;
```

##### Configure the database for Zabbix server

```
vi /etc/zabbix/zabbix_server.conf

DBPassword=<new_passoword>
```

##### Start & Enable zabbix server and agent processes

```
systemctl restart zabbix-server zabbix-agent apache2

systemctl enable zabbix-server zabbix-agent apache2
```