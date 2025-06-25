#!/bin/bash

# Navigate to the project folder
cd /home/povilas/justfortoday-blog-minimal || exit

# Pull latest changes and log output
/usr/bin/git pull >> /home/povilas/justfortoday-blog-minimal/git-pull.log 2>&1
