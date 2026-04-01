@echo off
echo Starting SOKOON Local Preview Server...
echo Your browser should open automatically to http://localhost:4173
echo Please leave this window open while you test the site.
start http://localhost:4173
node node_modules/vite/bin/vite.js preview
pause
