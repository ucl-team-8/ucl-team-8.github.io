# Research

The data that the algorithm has to consume is very extensive and has a lot of inconsistencies. Understanding the data we are given has been the largest focus of our research, and took a considerable amount of time. Next, we looked into efficient ways of storing everything and technologies that we will use for the back-end and the API. Finally, we analyzed various algorithms and compared their efficiency.

## Data

Most of the data can be broken down into 4 main parts: The Schedule, Diagrams, Trust Reports and GPS Reports. There are also some additional parts like geographical locations for all tiploc codes and tables that map the unit codes into a particular gps_car_id (more on this later), however they are static and should rarely change.

We will try to outline some of the data, without going into too many details.

### Schedule

The Schedule is used to outline where a particular train should be at a point in time. For example it might state that the service with headcode 5A21 might depart A at 9am.

To understand the data, we will discuss the main column headings:

+ **Headcode** - This is a code that is used to identify a particular service. An example is 5A07. However it also contains other useful information:
  + The first character identifies the kind of train it is:
    + **0** - Locomotive
    + **1** - Express Passenger
    + **2** - Other Train
    + **3** - Expedited Empty Coaching Stock
    + **5** - ECS
  + The second character identifies roughly where the service is going. Some examples:
    + **A** - London
    + **N** - Newcastle
    + **E** - Scotland to Eastern Region
    + **S** - Western Region
    + **D** - Leeds
+ **Time** - Outlines when this event should happen.
+ **Event type** - Can be departure (D), arrival (A) or a pass through the station (P).
+ **Tiploc** - a code used to identify a location (station or junction).
+ **CIF_UID** - Identifies a particular service, but unlike Headcode, it is unique.
+ **Schedule_days_run** - A 7 bit field that represent the days of the week the service is run
+ **Line** - If a service can run through more than 1 line, this field will specify which
+ **Pathing_allowance** - The time taken to cross a junction

The main part of the Schedule is usually set for several months. However a new copy will be available at the start of each day to make sure that it includes any last-minute changes. The Schedule can be accessed on the [Netowork Rail Datafeeds website](http://datafeeds.networkrail.co.uk) through the STOMP protocol.

Additional information can be found [here](http://nrodwiki.rockshore.net/index.php/SCHEDULE).

### Diagrams

After the Schedule has been created, we still need to know which Rolling Stock will run which Service. Hence, every Rolling Stock has a Diagram that outlines the services it will run on a particular day.

Some of the main column headings are:

+ **Unit** - Identifies a particular Rolling Stock
+ **Headcode** - See [Schedule](#schedule)
+ **CIF_UID** - See [Schedule](#schedule)

In addition to using the Diagrams, we will also be using the Genius Allocation, which is a very similar format to the Diagram. However, instead of having one Diagram for every Rolling Stock, we only have one Genius Allocation per day. The file contains all of the services that will be run that day, the origin location and which Rolling Stock is supposed to run the service.

Due to the fact that the Diagrams are considered as sensitive information, we are not able to show any.

### Trust Reports

The Trust Reports, unlike the Schedule and the Diagrams, are real-time. Every track is divided into berths. At the border of 2 berths, there is a sensor, which creates a report every time a service passes. These reports are called Trust Reports and they provide us real-time information on the services. Some of the most important column headings are:

+ **Headcode** - See [Schedule](#schedule)
+ **Tiploc** - See [Schedule](#schedule)
+ **Location Sequence** - Identifies which stop in the service sequence
+ **Time**
+ **Auto_Expected** - If an automatic report was expected from a signal If this is false, the report is often unreliable
+ **Stanox** - The location code that the operational systems use
+ **TOC_ID** - The Train Operating Company's numerical ID

Essentially, the Trust Reports help us to identify the location of a particular Service, but it does not tell us anything about the Rolling Stock.

One problem with TRUST reports is their delay. A report can be off by several minutes. Additionally, some reports are still done manually, so there can also be some false data in the system.

We can get the Trust Reports using the STOMP Protocol through the [Network Rail Datafeeds website](http://datafeeds.networkrail.co.uk). Additional information can be found on [this website](http://nrodwiki.rockshore.net/index.php/Train_Movements).

### GPS Reports

The GPS reports are used to find the location of the Rolling Stock. We mainly use the GPS and Trust Reports to find which Rolling Stock is running which service. The essential column headings are:

+ **Device** - The device is a unique identifier for a particular Rolling Stock, like the unit. We have a different data source to convert between both.
+ **Event Type** - See Schedule
+ **Tiploc** - See Schedule
+ **Easting and Northing** - To define the location
+ **Speed of the Rolling Stock**
+ **Time**

There are a couple of examples where GPS does not work well. One of them is in tunnels because the satellites are near the horizon. Or another example is in stations where there is a lot of steelwork. Any of the above, or even various other situations will result in offsets.

The GPS data is considered sensitive information therefore we cannot display any examples.

## Visualisation

### Node Feeds

    TODO: add link to visualisation

To understand the data, we started with a simple Node.js application that consumed "train movements" messages from the Network Rail [data feeds](https://datafeeds.networkrail.co.uk/), which is realtime data of the locations of all the trains in the UK.

The application stores every field that occurs, all the values it can have and how often they occur. It enabled us to roughly guess what the fields and values mean, which we found hard initially because of the lack of documentation, and it was also helpful in our meeting with the client, where he could go through explaining what each field and value means.

### TRUST & GPS event matching

    TODO: add link to visualisation

Understanding what the column headings mean was one part however actually understanding what the data means is another. We started going through the data by hand however this seemed to be inefficient. Therefore, we started researching visualization technologies, like D3, to get a clear view on everything and identify common inconsistencies that our algorithm needs to be able to handle.

For this visualization, we used D3 and we kept the UI relatively simple. In the top left corner, you can choose which Rolling Stock you want to analyze by selecting the appropriate gps_car_id. Then we display all of the GPS Reports of that Rolling Stock in the left column, ordered by time. We also state the type of the report and the Tiploc code of where the report was generated.

Next, we use the Genius Allocations to find all of the Services that that particular Rolling Stock was planned to run. An algorithm goes through all the Trust Reports of these services and tries to match them to the correct GPS Report. We first check if the GPS Report is within a given time limit. Then we check if the event has the same Tiploc code and the same event type. If the algorithm finds a matching GPS Report for a given Trust Report, we display the Trust Report next to the appropriate GPS Report with a green circle. If no match if found, we still display the event but with a red circle.

Now we can easily see if a Rolling Stock actually ran all of the services it was supposed to run, by simply looking at the amount and order of red and green circles.

## Infrastructure

In the beginning of the project, we researched various technologies and analyzed them to determine which ones were the most appropriate. Below is the full list of all the technologies we have used and why:

### PostgreSQL

#### Why a Database?

We receive data in various different sources (JSON, CSV, text files). Therefore querying and analyzing data is not always easy in their original form. So the team decided to have a database, to store all of the data.

#### Why an SQL Database?

Since some of the data is very inconsistent and is missing several values quite often, we first considered a NoSQL database since it would make storing the data very easy. However, we noticed some relations between several data sources that we could express very naturally in an SQL database. Additionally, our algorithm will be querying and joining the data very often. Therefore the advantages of using an SQL database outweighed the disadvantages.

#### Why PostgeSQL?

Now that we have decided to use an SQL database, we still had to choose from a wide range of options. After some research we found that PostgreSQL would be the most appropriate for several reasons:

+ PostgreSQL is easily extensible. We learned that the [PostGIS](http://postgis.net/) extension is very capable and popular when it comes to querying and storing location data in a database, whereas MySQL is much more limited.
+ PostgreSQL is widely used, which means that there is a strong community that can offer support.
+ It's open-source.

### Flask

We wanted to use a language that everyone in the team was already comfortable with. Therefore, we decided on using Python for the backend and a web application for the frontend. However, in order to use Python to create a web application, we needed a web framework.

Everyone wanted a small, minimal framework with a very short learning curve so we could immediately start developing. Additionally, the framework had to be extensible so we could use it with PostgreSQL and any other technologies that we might decide on later. So since Flask checked all of these requirements, we decided to use it, together with various dependencies.

#### SQLAlchemy and psycopg2

SQLAlchemy is one of the most used tools to use SQL inside a Python application. Together with psycopg2, a Python adapter for PostgreSQL, we can use it to access our database. We mainly chose both tools because they are very easy to install through pip and to integrate with Flask. Additionally, there are a lot of examples, which use the same setup.

#### Virtual Environment

A Virtual Environment is a tool to keep all of the Python dependencies in the same place. In order to do so, virtualenv creates a folder with all of the necessary executable to use the packages. Therefore all of the team members do not need to worry about which version of a dependency they are using. This makes the development process a lot easier because we spend less time trying to configure each other's machines.

### D3.js

D3.js is a JavaScript library for manipulating HTML DOM elements based on data. There are a lot of JavaScript libraries for visualizations, but D3.js is one of the most flexible ones. Even though it might not be easy to learn, the library will allow us to customize everything in the visualization. Additionally, there is a lot of documentation and examples available online that helped us to learn.

So the overall infrastructure of our application looks like:

    TODO: Add image (Its on drive)

## Algorithms

The first algorithm we used was a simple statistical one, and it was used in last year's project. It calculated how likely a Service was run by a particular Rolling Stock by calculating how many Trust Reports match with a GPS Report. Next, we combined that algorithm with our visualization to see how accurate it was. After careful evaluation, we concluded that it was not accurate enough and therefore we had to move on to a more complex version.

### Statistical Algorithm

    TODO: Add link to visualisation

Like the first visualization, the statistical algorithm uses D3.js in order to display the results. The interface looks similar as well. In the top left corner, you can select the gps_car_id of the Rolling Stock you want to analyze. Then the algorithm lists all of the GPS Reports in the first column.

Next, for all services, we compare all of the Trust Reports to the GPS Reports. Using that data, we can calculate how many Trust Reports match with a GPS Report and calculate the probability of a Rolling Stock running the service.

Finally, we display all of the Services with a high enough probability. Every column, which represents a service, lists all of the Trust events and again, a green circle is shown if the Reports match and a red circle if no match is found.