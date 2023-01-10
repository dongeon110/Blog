#!/bin/bash

export STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8089)

export ANSWER=200

echo "$STATUS";

if [[ $STATUS -ne $ANSWER]]; then

    echo "error: tomcat is not found: tomcat Reload start";

    sudo fuser -k 8089/tcp

    /usr/local/src/apache-tomcat-8.5.59/bin/startup.sh

    echo "Run tomcat server";

    LOGDATE=$(date '+%Y%m%d')

    LOGDATETIME=$(date '+%Y-%m-%d %H:%M')

    echo "$LOGDATETIME Restart tomcat server" >> /저장경로/$LOGDATE.txt

else

    echo "tomcat is started";

fi