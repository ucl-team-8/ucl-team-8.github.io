## Infrastructure

In the beginning of the project, we researched various technologies and analyzed them to determine which ones were the most appropriate. Below is the full list of all the technologies we have used and why:

### PostgreSQL

#### Why a Database?

We receive data in various different sources (JSON, csv files, txt files,...). Therefore querying and analyzing data is not always easy in their original form. So the team decided to have a database, to store all of the data.

#### Why an SQL Database?

Since some of the data is very inconsistent and is missing several values quite often, we first considered a NoSQL database since it would make storing the data very easy. However we noticed some relations between several data sources that we could express very naturally in an SQL database. Additionally, our algorithm will be querying and joining the data very often. Therefore the advantages of using an SQL database outweight the disadvantages.

#### Why PostgeSQL?

Now that we have decided to use an SQL database, we still had to choose from a wide range of options. After a considerable amount of research we found that PostgreSQL would be the most appropriate for several reasons:
+ PostgreSQL is a very powerful and extensible DBMS. A simple one would probably not suffice since we will perform several complex queries.
+ PostgreSQL is widely used, which means that there is a strong community that can offer support.
+ All of the software is open-source.

### Flask

We wanted to use a language that everyone in the team was already comfortable with. Therefore we decided on using Python for the backend and a web application for the frontend. However in order to use Python to create a web application, we needed a web framework.

Everyone wanted a small, minimal framework with a very short learning curve so we could immediately start developing. Additionally, the framework had to be extensible so we could use it with PostgreSQL and any other technologies that we might decide on later. So since Flask checked all of these requirements, we decided to use it, together with various dependencies.

#### SQLAlchemy and psycopg2

SQLAlchemy is one of the most used tools to use SQL inside a Python application. Together with psycopg2, a Python adapter for PostgreSQL, we can use it to access our database. We mainly chose both tools because they are very easy to install through pip and to integrate with Flask. Additionally, there are a lot of examples, which use the same setup.

#### Virtual Environment

A Virtual Environment is a tool to keep all of the Python dependencies in the same place. In order to do so, virtualenv creates a folder with all of the necessary executable to use the packages. Therefore all of the team members do not need to worry about which version of a dependency they are using. This makes the development process a lot easier because we spend less time trying to configure each other's machines.

### D3.js

D3.js is a javascript library for manipulating HTML DOM elements based on data. There are a lot of javascript libraries for visualizations but D3.js is one of the most flexible ones. Even though it might not be easy to learn, the library will allow us to customize everything in the visualization. Additionally, there is a lot of documentation and examples available online that helped us to learn.

So the overall infrastructure of our application looks like:

    TODO: Add image (Its on drive)

## Algorithms

Our first algorithm was a simple statistical one. The program calculated how likely a Service was run by a particular Rolling Stock by calculating how many Trust Reports match with a GPS Report. Next, we combined that algorithm with our visualization to see how accurate it was. After careful evaluation, we concluded that it was not accurate enough and therefore we had to move on to a more complex version.

### Statistical Algorithm
Like the first visualization, the statistical algorithm uses D3.js in order to display the results. The interface looks similar as well. In the top left corner, you can select the gps_car_id of the Rolling Stock you want to analyze. Then the algorithm lists all of the GPS Reports in the first column.

Next, for all services, we compare all of the Trust Reports to the GPS Reports. Using that data, we can calculate how many Trust Reports match with a GPS Report and calculate the probability of a Rolling Stock running the service.

Finally, we display all of the Services with a high enough probability. Every column, which represents a service, lists all of the Trust events and again, a green circle is shown if the Reports match and a red circle if no match is found.