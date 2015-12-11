---
layout: home
---

# Background and Context

The solution to the problem lies in matching Train Services to Rolling Stock.

Train Operators use the term Train Service to refer to a sequence of locations and times at which a particular service is expected to arrive at or depart from. For instance a service A might depart at 7 am from King’s Cross, arrive at 7.10 am at Holloway and depart at 7.12 from Holloway to Finsbury Park and so on. However, it does not state which physical train (or Rolling Stock) will run service A.

Usually, the Train Operators will create a Diagram that states which particular Rolling Stock will run (part of) a service. Under normal circumstances, the operators follow these plans. But when any disruption occurs, everything needs to be re-planned. Depending on the severity of the problem and the size of the company, it is not always possible to keep track of all the decisions that were made.

If no accurate record was kept, at the end of the day the operators need to manually figure out which Rolling Stock ended up running which Service. This is a very time-consuming and error-prone task. However, since Rolling Stock usually have GPS and we know exactly what happened to each Service, we can use that data, together with the Diagrams and the Schedule, to automate this process. A potential algorithm would consume various real-time data feeds and give as an output which Rolling Stock actually ran which Service.

## Client information

Atos is a European IT services company that provides consulting, managed services and system integration. The company also provides management services to Network Rail. Essentially, Atos provides all of the resource planning, diagramming and the services to distribute data amongst multiple systems. But since the railway is very old and large organization, managing it is a very difficult task. Therefore our challenge is to an essential part of the entire system more efficient and effective.

# Project Requirements

Below are the requirements in a MoSCoW format:

### Must Have:

+ Train Service Real Time Pattern Matching Algorithm
  + Use data from GPS, real time train service data (TRUST), train schedule data and train diagrams
  + Operate in real-time
  + Return a list of units which have been identified as not matching their planned services
  + Support only basic scenarios
+ Prototype Application that uses the algorithm to match Rolling Stock to Services in real time
  + Display the output of the algorithm

### Should Have:

+ The prototype application simulates a real-time environment
+ You can select any Rolling Stock, to get more accurate information
+ Track all Rolling Stock on a long-term to improve accuracy
+ Use additional information in the headcode of the Service to make predictions
+ Deploy system on [Heroku](https://heroku.com)

### Could Have:

+ Predict a more accurate mileage record
+ Support more complex scenarios, discussed in under [discoveries](#discoveries)
+ Visualise the output data
+ Use additional data streams (from [Network Rail data feeds](https://datafeeds.networkrail.co.uk)) to generate more accurate results
+ Test system using real data instead of test data

### Would Like:

+ Return the data in the same form as the diagrams and highlights where changes have happened
+ Compare the milage record obtained from the algorithm to the milage record calculated from all GPS events
+ Handle situations where Rolling Stock go to the maintenance depot after running the Services

## Use Cases

To describe the system and its requirements to a further extend, we will use some use cases.

    TODO: See drive for use cases
