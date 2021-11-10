## How to run Coastar

To run Coastar locally, download the repo and [install Meteor](https://www.meteor.com/install).

Open your terminal and cd into the directory of the project and install the necessary libaries:
```
$ meteor npm install
$ npm install axios
```

After meteor is installed, you can run the application by typing in the command:

```
$ meteor npm run start
```
The first time you run the app, it will create some default users that have been added to the database. Here is an
example of how the output may look:

```
I20201119-23:01:44.024(-10)? Creating the default user(s)
I20201119-23:01:44.024(-10)?   Creating user admin@foo.com.
I20201119-23:01:44.332(-10)?   Creating user john@foo.com.
I20201119-23:01:44.754(-10)? Monti APM: completed instrumenting the app
=> Started your app.
```

Note regarding bcrypt warning: You may also get a similar message when running this application:

```
=> Started proxy.                             
=> Started MongoDB.                           
W20201119-22:58:19.472(-10)? (STDERR) Note: you are using a pure-JavaScript implementation of bcrypt.
W20201119-22:58:19.515(-10)? (STDERR) While this implementation will work correctly, it is known to be
W20201119-22:58:19.516(-10)? (STDERR) approximately three times slower than the native implementation.
W20201119-22:58:19.516(-10)? (STDERR) In order to use the native implementation instead, run
W20201119-22:58:19.516(-10)? (STDERR) 
W20201119-22:58:19.516(-10)? (STDERR)   meteor npm install --save bcrypt
W20201119-22:58:19.516(-10)? (STDERR) 
W20201119-22:58:19.517(-10)? (STDERR) in the root directory of your application.
I20201119-22:58:20.471(-10)? Monti APM: completed instrumenting the app
=> Started your app.
```

On some operating systems (particularly Windows), installing bcrypt is much more difficult than implied by the above
message. Bcrypt is only used in Meteor for password checking, so the performance implications are negligible until your
site has very high traffic. You can safely ignore this warning without any problems during initial stages of
development.

If all goes well, the template application will appear at http://localhost:3000. You can login in using the credentials:
admin@foo.com | changeme
john@foo.com | changeme
in setting.development.json, or else you can register an new account.



## Security and Privacy 

As of right now, our application includes a report form that anyone is able to fill out. This includes inputting data such as the latitude and longitude, and uploading a phone number, name, and an image of the sighted animal. This information is available for the public, which may be an issue. If there were not time limitations due to participating in the HACC, we would create some sort of authentication before the users are able to access the application. By doing this, we can prevent any malicious attempts to write any scripts into the fields to access the HNLR's data. We also would make sure that the applicaiton is modern encryption standards and would be sure to have our application deployed using HTTPS protocol.

Since the application also must access the GPS location of the user reporting the animal sighting, we would have the application request permissions to access the users GPS and their location. We would like to implement this so that the user has a choice as to whether or not they would like to allow the application to access their location or not. If they choose not to, the user will still be able to use the application, but they will just have to input the latitude and longitude coordinates themselves. 

Lastly, we would include an admin user role that would be the only role to see the reports in the application. Since we know that the reports may contain data that the user would not like to be available for the public, such as a phone number. The only individuals that would be able to view the reports are the individuals tat have an admin role in the application, which can be created by another admin role assigned to someone. 


Below are some of the links we used for our solution:
https://cordova.apache.org/docs/en/latest/guide/appdev/security/index.html
https://web.ecs.syr.edu/~wedu/Research/paper/webview_acsac2011.pdf
https://discord.com/channels/@me/879136306721067038/908067187976175616
https://github.com/marketplace/actions/owasp-zap-baseline-scan


For details, please see http://ics-software-engineering.github.io/meteor-application-template-react-production/
