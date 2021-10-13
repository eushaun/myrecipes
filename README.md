<h1 align="center">Capstone Project</h1>
<h6 align="center">COMP9900-W16A-FIFA</h6>
<hr>

## Installation

We will be running the system on the Lubuntu 20.4.1 LTS virtual machine image. 

First, update the packages and install pip for Python3 on the Lubuntu VM.
```bash 
sudo apt update && sudo apt upgrade -y 
sudo apt install python3-pip 
```

To install Node.js, 
```bash
sudo apt install npm 
```

To download the latest source code from GitHub, 
```bash
git clone https://github.com/COMP3900-9900-Capstone-Project/capstoneproject-comp9900-w16a-fifa.git 
```

Make sure that **config.js** is in capstoneproject-comp9900-w16a-fifa/server and **config.ini** is in capstoneproject-comp9900-w16a-fifa/server/recommender. 
These two files contain the login credentials required to connect to the PostgreSQL database. 

To install the required Python libraries needed by the recommender system, 
```bash
cd capstoneproject-comp9900-w16a-fifa/server/recommender 
pip install -r requirements.txt 
```
The nltk Python library needs to download a set of corpus in order to perform word stemming. This will only need to be **run once**. 
```bash
cd capstoneproject-comp9900-w16a-fifa/server
python3 run.py
```

In separate terminals:

To start the back-end code, 
```bash
cd capstoneproject-comp9900-w16a-fifa/server
npm install  
npm run start
```

To start the front-end code,
```bash 
cd capstoneproject-comp9900-w16a-fifa/client
npm install  
npm run start
```
If for some reason, *npm install* gives an error, run *npm install --force*
