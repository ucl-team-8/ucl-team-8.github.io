The data that the algorithm has to consume is very extensive and has a lot of inconsistencies. Therefore understanding everything is the largest part of our research took a considerable amount of time. Next, we looked into efficient ways of storing everything and technologies that we will use for the back-end and the API. Finally, we analyzed various algorithms and compared their efficiency.

## Data

Most of the data can be broken down into 4 main parts: The Schedule, Diagrams, Trust Reports and GPS Reports. There are also some additional parts like geographical locations for all tiploc codes and tables that map the unit code into a particular gps_car_id (more on this later) however they are static and should never change.

We will outline some of the data, without going into too many details.

### Schedule

The Schedule is used to outline where a particular train should be at a point in time. For example it might state that the service with headcode 5A21 might depart A at 9 am.

To understand the data, we will discuss the main column headings:

+ Headcode - This is a code that is used to identify a particular service. An example is 5A07. However it also contains other useful information:
  + The first number identifies the kind of train it is:
    + 0 - Locomotive
    + 1 - Express Passenger
    + 2 - Other Train
    + 3 - Expedited Empty Coaching Stock
    + 5 - ECS
  + The first letter on the other hand identifies where the service is going for example:
    + A - London
    + N - Newcastle
    + E - Scotland to Eastern Region
    + S - Western Region
    + D - Leeds
+ Time - Outlines when this event should happen.
+ Event type - We need to know whether the service should depart (D), arrive (A) or pass through the station (P).
+ Tiploc - is a code, which is used to identify a location.
+ CIF_UID - The headcode is used to identify the service, however there is no guarantee for it to be unique. Therefore we use the CIF_UID to identify uniqueness.
+ Schedule_days_run - A 7 bit field that represent the days of the week the service is run
+ Line - If a service can run through more than 1 line, this field will specify which
+ Pathing_allowance - The time taken to cross a junction

The main part of the Schedule is usually set for several months. However a new copy will be available at the start of each day to make sure that it includes any last-minute changes. The Schedule should be downloaded on [this website](http://datafeeds.networkrail.co.uk) using the STOMP protocol.

Any additional information can be found [here](http://nrodwiki.rockshore.net/index.php/SCHEDULE).

### Diagrams

After the Schedule has been created, we still need to know which Rolling Stock will run which Service. Hence, every Rolling Stock has a Diagram that outlines the services it will run on a particular day.

Some of the main column headings are:

+ Unit - This is another primary key, used to identify a particular Rolling Stock
+ Headcode - See Schedule
+ CIF_UID - See Schedule

In addition to using the Diagrams, we will also be using the Genius Allocation, which is a very similar format than the Diagram. However instead of having one Diagram for every Rolling Stock, we only have one Genius Allocation per day. The file contains all of the services that will be run that day. Then it states the origin location of the service and which Rolling Stock is supposed to run the service.

Due to the fact that the Diagrams are considered as sensitive information, we are not able to show any.

### Trust Reports
The Trust Reports, unlike the Schedule and the Diagrams, are real-time. Every track is divided into berths. At the border of 2 berths, there is a sensor, which creates a report every time a service passes. These reports are called Trust Reports and they provide us real-time information on the services. Some of the most important column headings are:

+ Headcode - See Schedule
+ Tiploc - See Schedule
+ Location Sequence - These are used to identify where in the Schedule the current event took place
+ Time
+ Auto_Expected - If an automatic report was expected from a signal If this is false, the report is often unreliable
+ Stanox - The location code that the operational systems use
+ TOC_ID - The Train Operating Company's numerical ID

Essentially, the Trust Reports help us to identify the location of a particular Service but it does not tell us anything about the Rolling Stock.

There are some problems with the Trust Reports and those are mainly time. There is a lag on the system and therefore a report can be off by several minutes. Additionally, some reports are still done manually therefore there can also be some false data in the system

We can get the Trust Reports using the STOMP Protocol through the [the network rail datafeeds website](http://datafeeds.networkrail.co.uk). Additional information can be found on [this website](http://nrodwiki.rockshore.net/index.php/Train_Movements).

### GPS Reports

Finally, the GPS reports are used to find the location of the Rolling Stock. Hence, we mainly use the GPS and Trust Reports to find which Rolling Stock is running which service. The essential column headings are:

+ Device - The device is a unique identifier for a particular Rolling Stock, like the unit. We have a different data source to convert between both.
+ Event Type - See Schedule
+ Tiploc - See Schedule
+ Easting and Northing - To define the location
+ Speed of the Rolling Stock
+ Time

There are a couple of examples where GPS does not work well. One of them is in tunnels because the satellites are near the horizon. Or another example is in stations where there is a lot of steelwork. Any of the above, or even various other situations will result in offsets.

The GPS data is considered sensitive information therefore we cannot display any examples.

## Visualization

### Node Feeds

To understand the data, we started with a simple Node.js application that consumed "train movements" messages from the Network Rail [data feeds](https://datafeeds.networkrail.co.uk/), which is realtime data of the locations of all the trains in the UK.

The application stores every field that occurs, all the values it can have and how often they occur. It enabled us to roughly guess what the fields and values mean, which we found hard initially because of the lack of documentation, and it was also helpful in our meeting with the client, where he could go through explaining what each field and value means.

### Visualization 1.0

Understanding what the column headings mean was one part however actually understanding what the data means is another. We started going through the data by hand however this seemed to be inefficient. Therefore we started researching visualization technologies, like D3, to get a clear view on everything and identify common inconsistencies that our algorithm needs to be able to handle.

For this visualization, we used D3 and we kept the UI relatively simple. In the top left corner, you can choose which Rolling Stock you want to analyze by selecting the appropriate gps_car_id. Then we display all of the GPS Reports of that Rolling Stock in the left column, ordered by time. We also state the type of the report and the Tiploc code of where the report was generated.

Next, we use the Genius Allocations to find all of the Services that that particular Rolling Stock was planned to run. An algorithm goes through all the Trust Reports of these services and tries to match them to the correct GPS Report. We first check if the GPS Report is within a given time limit. Then we check if the event has the same Tiploc code and the same event type. If the algorithm finds a matching GPS Report for a given Trust Report, we display the Trust Report next to the appropriate GPS Report with a green circle. If no match if found, we still display the event but with a red circle.

Now we can easily see if a Rolling Stock actually ran all of the services it was supposed to run, by simply looking at the amount and order of red and green circles.