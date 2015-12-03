---
layout: home
---

# Introduction
Most Train Operating Companies (TOCs) have to deal with a major safety issue. How often do they have to maintain their trains? This might seem like an easy problem, but it is not. Large TOC’s are not able to keep track of the exact mileage of each Rolling Stock and therefore they cannot determine how often they need to be maintained. We are solving this problem by writing an algorithm, which uses various data streams, to track each rolling stock real time. Finally, we will use the output of that pattern-matching algorithm to calculate the distance each rolling stock has travelled.

# Background and Context
The solution to the problem lies in matching Train Services to Rolling Stock. Train Operators use the term Train Service to refer to a sequence of locations and times at which a particular service is expected to arrive at or depart from. For instance a service A might depart at 7 am from King’s Cross, arrive at 7.10 am at Holloway and depart at 7.12 from Holloway to Finsbury Park and so on. However we still do not know which physical train (or Rolling Stock) will run service A.

Usually, the Train Operators will create a Diagram that states which particular Rolling Stock will run (part of) a service. Under normal circumstances, the operators follow these plans. But when any disruption occurs, everything needs to be re-planned. Depending on the severity of the problem and the size of the TOC, it is not always possible to keep track of all the decisions that were made.

If no accurate record was kept, at the end of the day the operators need to manually figure out which Rolling Stock ended up running which Service. This is a very time-consuming and error-prone task. However since some of the Rolling Stock has a GPS and we know exactly what happened to each Service, we can use that data, together with the Diagrams and the Schedule, to automate this process. A potential algorithm would consume various real-time data feeds and give as an output which Rolling Stock actually ran which Service.

# Client information
Atos is a European IT services company that provides consulting, managed services and system integration. The company also provides management services to Network Rail. Essentially, Atos provides all of the resource planning, diagramming and the services to distribute data amongst multiple systems. But since the railway is very old and large organization, managing it is a very difficult task. Therefore our challenge is to an essential part of the entire system more efficient and effective.

# Project Requirements
+ Train Service Real Time Pattern Matching algorithms
  + Using data from GPS, real time train service data (TRUST), train schedule data and train diagrams
  + The algorithm should be able to handle real-time data
  + Return a prediction for the services that a particular rolling stock has run
  + This is used for more accurate mileage records that will help with servicing and maintaining the rolling stock
+ Prototype Application that uses the algorithm to match Rolling Stock to Services in real time from multiple data feeds
  + The Application should have a web-based interface
  + Simulate a real-time environment

# Research
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
The Trust Reports, unlike the Schedule and the Diagrams, are real-time. Every track is divided into berths. At the border of 2 berths, there is a sensor, which creates a report every time a services passes. These reports are called Trust Reports and they provide us real-time information on the services. Some of the most important column headings are:

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
To discover any important data, we first used a node application to analyze the data from the feeds. The application calculated how often the value in a column is not null. Hence, we know which columns we can use reliably.

//TODO: Daniel can you add stuff?
Using the STOMP protocol, we could get the Trust Data in JSON.

### Visualization 1.0
Understanding what the column headings mean was one part however actually understanding what the data means is another. We started going through the data by hand however this seemed to be inefficient. Therefore we started researching visualization technologies, like D3, to get a clear view on everything and identify common inconsistencies that our algorithm needs to be able to handle.

//TODO: Add stuff

## Infrastructure
//TODO: Add stuff
//Notes: We chose Flask because: Minimal, Extensible, Small, Easy to use with different services, everyone knows python, because daniel said so...

## Algorithms
Our first algorithm, was a simple statistical one. The program calculated how likely a Service was run by a particular Rolling Stock by calculating how many Trust Reports match with a GPS Report. Next, we combined that algorithm with our visualization to see how accurate it was. After careful evaluation, we concluded that it was not accurate enough and therefore we had to move on to a more complex version.

# Prototype
The first iteration of our prototype, implemented the statistical algorithm. Essentially, it matched the Trust Reports to the GPS Reports by comparing the Tiploc codes and Event Types within a certain time limit. Next, the algorithm checked if the Unit was supposed to run that service and gave a preference to those Units. Finally, we calculated how the percentage of how likely a given Rolling Stock ran the services.

## Discoveries
We discovered various patterns that the algorithm has to take in consideration. For example it occurs often that 2 services run very close to each other. The current algorithm has difficulties distinguishing which rolling stock ran which service. Hence, in the next iteration of the algorithm, we will track the rolling stock long-term and analyze the headcode of the service to know which general direction it is going.

Some other issues that we came across is that some trains run in circle and therefore we do not the the overall direction they are travelling in. Additionally, sometimes 2 Rolling Stock seem to run the same service (and they do) but at a certain point they split. Or the other way is possible as well, when 2 Rolling Stock join to run a service together.

Another important fact is that different types of trains tend to behave differently. For instance an Empty Coaching Stock is very unpredictable because they are not considered as important as Passenger Trains. They are also more likely to be affected by external factors therefore the algorithm will assign a higher probability of an Empty Coaching Stock changing than for example a Passenger Train. Additionally, several TOCs will turn the train around to manage crowd control.

Finally, the GPS data can return results where for example a train seems to depart and arrive at the same station various times. This is because the GPS data divides the world up into several areas. If the train is first outside the area according to the GPS and then inside, a report will be generated where it arrives and the other way around. So if a Rolling Stock is parked near the border of an area for several hours, various reports might be generated where the the train keeps arriving and departing from the same station.
//TODO: Include picture

# User Interface
//TODO: Check if you agree and add pictures

We would like to have a couple of different screens, each displaying the results in a different way. First of all, the first screen will display all the changes that have already happened. Hence, the user can have a quick view if all the Rolling Stock are following the Diagrams or if something has not gone according to plan.

Then, the user will also be able to select a particular Rolling Stock, which will redirect to a page, displaying all of the GPS Reports we have already received and all of the services that it might have run in a similar fashion than our second visualization.
Next, the user can also select to see the Diagrams of what actually happened and perhaps even compare them to the actual Diagrams.

# Testing Strategies


## Unit Tests
We will have a test suite written for the main algorithm itself which includes:
  + The matching of station names and the geographical locations
  + The matching of the time within x minutes
  + Matching of event type
  + Matching headcodes with specific train types and rough destinations
  + Matching services to rolling stock with Genius Allocations
