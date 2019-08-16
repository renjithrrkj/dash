Dashboard testmate

Accessing EC2
Open the AWS management console.
go to Ec2 dashboard and select the security group of your ec2.
click Add rule and allow all traffic to your ip.(ie sekect my ip from the list)

Hosting nodejs server
In the node js project folder(backend), run nodemon server.js command.
execute a git pull to update the 

Hosting and updating chnages to angular app on nginx seerver.

update the changes from remote repo using git pull.
run sudo ng build --prod in the project directory(ie frontend).
The build project is saved in dist folder.
Copy the files in dist folder of  Dashboard project to var/www/html and Testmate to var/www/testmate.
restart the nginx server.

db.js
The information regarding coonection to db is entered in this file.

No_of_tests.js
Retrives information for Test_IN_Interval which powers test history graph.

resolver.js
powers the bar graphs(ie test results).

graph component(bar graph)

Hours saved.js:
information for hours saved graph


server.js
The basic fuction of node js api


issue.service.ts:
contains all functions to hit specific api endpoint of node api







