## Security and Privacy 

As of right now, our application includes a report form that anyone is able to fill out. This includes inputting data such as the latitude and longitude, and uploading a phone number, name, and an image of the sighted animal. This information is available for the public, which may be an issue. If there were not time limitations due to participating in the HACC, we would create some sort of authentication before the users are able to access the application. By doing this, we can prevent any malicious attempts to write any scripts into the fields to access the HNLR's data. Since the application also must access the GPS location of the user reporting the animal sighting, we would have the application request permissions to access the users GPS and their location. We would like to implement this so that the user has a choice as to whether or not they would like to allow the application to access their location or not. If they choose not to, the user will still be able to use the application, but they will just have to input the latitude and longitude coordinates themselves. 

Lastly, we would include an admin user role that would be the only role to see the reports in the application. Since we know that the reports may contain data that the user would not like to be available for the public, such as a phone number. The only individuals that would be able to view the reports are the individuals tat have an admin role in the application, which can be created by another admin role assigned to someone. 



For details, please see http://ics-software-engineering.github.io/meteor-application-template-react-production/
