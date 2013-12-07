Periodic Web service
========================================

Boilerplate web service / api

## Starting Service
Hop into the app directory (the app gets copied via a grunt task), install dependencies for the app, create a log directory, fire up the app.

    $ cd periodic/app.web-service
    $ npm install
    $ mkdir logs
    $ npm run webservice
    
## Developing
**You need to make sure you have nodemon and grunt installed globally first**

### Installing nodemon
    $ npm install nodemon -g
    $ npm install grunt-cli -g

### Starting service 
    $ cd periodic/app.web-service
    $ npm run appdev
    
### JSLinting
It's wise to run JSLinting while developing to catch errors on the fly

    $ npm run watch