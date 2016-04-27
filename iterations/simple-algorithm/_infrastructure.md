# Infrastructure

In the beginning of the project, we researched various technologies and analyzed them to determine which ones were the most appropriate. Below is the full list of all the technologies we have used and why:

## PostgreSQL

### Why a Database?

We receive data in various different sources (JSON, CSV, text files). Therefore querying and analyzing data is not always easy in their original form. So the team decided to have a database, to store all of the data.

### Why an SQL Database?

Since some of the data is very inconsistent and is missing several values quite often, we first considered a NoSQL database since it would make storing the data very easy. However, we noticed some relations between several data sources that we could express very naturally in an SQL database. Additionally, our algorithm will be querying and joining the data very often. Therefore the advantages of using an SQL database outweighed the disadvantages.

### Why PostgreSQL?

Now that we have decided to use an SQL database, we still had to choose from a wide range of options. After some research we found that PostgreSQL would be the most appropriate for several reasons:

+ PostgreSQL is easily extensible. We learned that the [PostGIS](http://postgis.net/) extension is very capable and popular when it comes to querying and storing location data in a database, whereas MySQL is much more limited.
+ PostgreSQL is widely used, which means that there is a strong community that can offer support.
+ It's open-source.

## Flask

We wanted to use a object-oriented language that everyone in the team was already comfortable with. Thus essentially we had to choose between Python and Java. However Python seemed more appropriate because it is dynamically typed, it also is a lot more concise and therefore also easier to read and debug and then finally, Python is a very compact and powerful language.
Therefore, we decided on using Python for the backend and a web application for the frontend. But in order to use Python to create a web application, we needed a web framework.

Everyone wanted a small, minimal framework with a very short learning curve so we could immediately start developing. Additionally, the framework had to be extensible so we could use it with PostgreSQL and any other technologies that we might decide on later. So since Flask checked all of these requirements, we decided to use it, together with various dependencies.

### SQLAlchemy and psycopg2

SQLAlchemy is one of the most used tools to use SQL inside a Python application. Together with psycopg2, a Python adapter for PostgreSQL, we can use it to access our database. We mainly chose both tools because they are very easy to install through pip and to integrate with Flask. Additionally, there are a lot of examples, which use the same setup.

### Virtual Environment

A Virtual Environment is a tool to keep all of the Python dependencies in the same place. In order to do so, virtualenv creates a folder with all of the necessary executable to use the packages. Therefore all of the team members do not need to worry about which version of a dependency they are using. This makes the development process a lot easier because we spend less time trying to configure each other's machines.

## D3.js

D3.js is a JavaScript library for manipulating HTML DOM elements based on data. There are a lot of JavaScript libraries for visualisations, but D3.js is one of the most flexible ones. Even though it might not be easy to learn, the library will allow us to customize everything in the visualisation. Additionally, there is a lot of documentation and examples available online that helped us to learn.

So the overall infrastructure of our application looks like:

<div class="mxgraph" style="position:relative;overflow:auto;width:100%;background-color:#ffffff;"><div style="width:1px;height:1px;overflow:hidden;">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</div></div>

## Heroku

Heroku is a could-based application platform that aims to make building, deploying and scaling a lot easier. Therefore we would not have to worry about deployment because it abstracts away a lot of the SysAdmin work. Thus we can focus on the actual algorithm and prototype. Another reason why we use Heroku is because it allows us to automate a large part of the deployment process. We simply have to push our code to the server and then deployment is automated from there on. In general, Heroku seemed to have a lot of advantages over traditional deployment on an amazon EC2 instance.

In order to deploy, we only need to run 3 commands.

```
heroku login
```

In your git repo, add git remote to Heroku

```
heroku git:remote -a atos-service
```

Pushing to production

```
git push heroku master
```

## Building the application

There are a couple of tools you need in order to build, run and deploy the application:

+ Python
+ pip - A Python Package Manager to share and reuse code
  + Flask - The Python web framework
  + psycopg2 - A Python adapter for PostgreSQL
  + SQLAlchemy - Tool to write SQL within a python application
  + virtualenv - Manages all of your Python dependencies
+ Node Package Manager (npm) - A package manager that can be used by JavaScript developers to share and reuse code
+ JavaScript Package Manager (jspm) - A second JavaScript package manager, which is required to use ES6
+ d3 - JavaScript library for manipulating HTML DOM elements based on data
+ git - Version Control Software
+ PostgreSQL - SQL Database
+ Heroku - Cloud-Application Platform to deploy the application

A description of how to download, install and use these tools can be found on [the project's readme](https://github.com/ucl-team-8/service/blob/master/README.md).
