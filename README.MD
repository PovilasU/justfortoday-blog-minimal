Optional: Use pm2 for auto-start & restart
Install pm2 globally:

bash
Copy
Edit
sudo npm install -g pm2
Start your server with pm2:

bash
Copy
Edit
cd ~/justfortoday-blog-minimal/server
pm2 start server.js --name justfortoday-server
Save the process list:

bash
Copy
Edit
pm2 save
Set up pm2 to launch on boot:

bash
Copy
Edit
pm2 startup
Follow the printed instructions (it usually asks you to run a command like sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u povilas --hp /home/povilas)

Now pm2 will:

Run your server on boot

Restart it automatically if it crashes
