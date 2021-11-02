# SG_COVID_SAFE_SOURCE_CODE

# Requirements to run application:

1) Must be connected to SOC VPN
2) Have a browser that run http (Microsoft Edge for Windows etc.)
3) Must have arduino installed

# Instruction to run program
1) Open a browser that is able to run http and enter this URL http://group3-1-i.comp.nus.edu.sg:5437/
2) Download Arduino and install the following libraries below

![image](https://user-images.githubusercontent.com/77485021/139623028-125339f1-2b65-4c43-a975-e110d0e81031.png)
![image](https://user-images.githubusercontent.com/77485021/139622981-094da464-6a2e-4635-837e-39663cfad9ba.png)

3) Upload arduino sketch of the account that you want to test into the dongle from Dongle files
4) For testing purposes, the MFA is disabled due to the availability of dongles in the provided URL.

# Testing Accounts

Admin:

Username: f2057642k
Password: QZAGkZcwX
BLE serial number: 5w4lj9nek0dpz1o73assgsx4pg6pj73ztjr8wz5bkzk3qtcj5miexhqajka7re4c


Covid Personnel:

Username: g1271758q
Password: ImipXgmvIEt 
BLE serial number: kpnz5r392si6cm3497ohj74spxsx13gjvagz09n9ynrvdu8pnr51k3zf1bha32po


Public User:

Username: s3616980z
Password: VFgJC6qw6RvqCVbR0V  
BLE serial number: m6cf0lxfncuy4gsckde7doudhzxfk7z1qe0bvcimurtb5x48sstzc5vr0n3g5mmk 

# Testing for Multi Factor Authentication
Assumption: Please do not access the .env file for backend repo

In order to test the connection between and BLE device and the web application, users need to run the backend and frontend folders of this repo.
1) Since the frameworks for these 2 servers are AngularJS and NodeJS, users need to Install NodeJs beforehand. It is available via this website: https://nodejs.org/en/download/.
After downloading, just make sure to add NodeJS as a global path inside environment variables if you are using Windows.

2) Afterwards, you need to install necessary modules/libraries for the backend and frontend folders. Please use command `npm install` in your project's path from the terminal to install the libraries for both frontend and backend.

3) Start the backend server by entering `npm start`, the server should be initiated by now.

4) To start the frontend server, entering `ng serve` or 'npm start` to initiate.

5) You should be able to access the frontend link http://localhost:4200/, using the testing accounts provided and try to do the MFA verification

If you got any problems regarding the setup, bugs, or security bugs, please email to any member of Group 3!

