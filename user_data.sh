#!/bin/bash
sudo apt update
sudo apt install unzip curl -y
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
sudo apt install nodejs npm -y
aws s3 sync s3://your-bucket-name/front-end/ /home/ubuntu/
aws s3 sync s3://your-bucket-name/server/ /home/ubuntu/

cd /home/ubuntu || exit 1
npm install

nohup node app.js > app.log 2>&1 &

echo "Application has started"
