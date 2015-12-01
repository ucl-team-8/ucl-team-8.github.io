---
layout: home
---

# Introduction
Most Train Operating Companies (TOCs) have to deal with a major safety issue. How often do they have to maintain their trains? This might seem like an easy problem, but it is not. Large TOC’s are not able to keep track of the exact mileage of each Rolling Stock and therefore they cannot determine how often they need to be maintained. We are solving this problem by writing an algorithm, which uses various data streams, to track each rolling stock real time.  Finally, we will use the output of that pattern-matching algorithm to calculate the distance each rolling stock has travelled.

# Background and Context
The solution to the problem lies in matching Train Services to Rolling Stock. Train Operators use the term Train Service to refer to a sequence of locations and times at which a particular service is expected to arrive at or depart from. For instance a service A might depart at 7 am from King’s Cross, arrive at 7.10 am at Holloway and depart at 7.12 from Holloway to Finsbury Park and so on. However we still do not know which physical train (or Rolling Stock) will run service A.

Usually, the Train Operators will create a Diagram that states which particular Rolling Stock will run (part of) a service. Under normal circumstances, the operators follow these plans. But when any disruption occurs, everything needs to be re-planned. Depending on the severity of the problem and the size of the TOC, it is not always possible to keep track of all the decisions that were made.

If no accurate record was kept, at the end of the day the operators need to manually figure out which Rolling Stock ended up running which Service. This is a very time-consuming and error-prone task. However since some of the Rolling Stock has a GPS and we know exactly what happened to each Service, we can use that data, together with the Diagrams and the Schedule, to automate this process. A potential algorithm would consume various real-time data feeds and give as an output which Rolling Stock actually ran which Service.

# Project Requirements
//TODO: Should be more detailed
+ Train Service Real Time Pattern Matching Algorithm
+ Prototype Application that uses the algorithm to match Rolling Stock to Services

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
  + The first letter on the other hand identifies where the service is going for example //TODO add values
+ Time - Outlines when this event should happen.
+ Event type - We need to know whether the service should depart (D), arrive (A) or pass through the station (P).
+ Tiploc - is a code, which is used to identify a location.
+ CIF_UID - The headcode is used to identify the service, however there is no guarantee for it to be unique. Therefore we use the CIF_UID to identify uniqueness.

### Diagrams
After the Schedule has been created, we still need to know which Rolling Stock will run which Service. Hence, every Rolling Stock has a Diagram that outlines the services it will run on a particular day.

Some of the main column headings are:
+ Unit - This is another primary key, used to identify a particular Rolling Stock
+ Headcode - See Schedule
+ CIF_UID - See Schedule

### Trust Reports
The Trust Reports, unlike the Schedule and the Diagrams, are real-time. Every track is divided into berths. At the border of 2 berths, there is a sensor, which creates a report every time a services passes. These reports are called Trust Reports and they provide us real-time information on the services. Some of the most important column headings are:

+ Headcode - See Schedule
+ Tiploc - See Schedule
+ Location Sequence - These are used to identify where in the Schedule the current event took place
+ Time

Essentially, the Trust Reports help us to identify the location of a particular Service but it does not tell us anything about the Rolling Stock.

### GPS Reports
Finally, the GPS reports are used to find the location of the Rolling Stock. Hence, we mainly use the GPS and Trust Reports to find which Rolling Stock is running which service. The essential column headings are:

+ Device - The device is a unique identifier for a particular Rolling Stock, like the unit. We have a different data source to convert between both.
+ Event Type - See Schedule
+ Tiploc - See Schedule
+ Time

## Visualization
Understanding what the column headings mean was one part however actually understanding what the data means is another. We started going through the data by hand however this seemed to be inefficient. Therefore we started researching visualization technologies, like D3, to get a clear view on everything and identify common inconsistencies that our algorithm needs to be able to handle.

## Infrastructure
//TODO: Add stuff
//Notes: We chose Flask because: Minimal, Extensible, Small, Easy to use with different services, everyone knows python, because daniel said so...

## Algorithms
The first algorithm that we wrote, was a simple statistical one. The program calculated how likely a Service was run by a particular Rolling Stock by calculating how many Trust Reports match with a GPS Report. Next, we combined that algorithm with our visualization to see how accurate it was. After careful evaluation, we concluded that it was not accurate enough and therefore we had to move on to a more complex version.

# Prototype
The first iteration of our prototype, implemented the statistical algorithm. Essentially, it matched the Trust Reports to the GPS Reports by comparing the Tiploc codes and Event Types within a certain time limit. Next, the algorithm checked if the Unit was supposed to run that service and gave a preference to those Units. Finally, we calculated how the percentage of how likely a given Rolling Stock ran the services.

//TODO: Add algorithm to website

## Discoveries

# User Interface

# Testing Strategies

## Unit Tests

## Functional Tests
