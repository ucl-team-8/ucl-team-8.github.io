# Prototype

The first iteration of our prototype, implemented the statistical algorithm. Essentially, it matched the Trust Reports to the GPS Reports by comparing the Tiploc codes and Event Types within a certain time limit. Next, the algorithm checked if the Unit was supposed to run that service and gave a preference to those Units. Finally, we calculated how the percentage of how likely a given Rolling Stock ran the services.

## Discoveries

We discovered various patterns that the algorithm has to take in consideration. For example it occurs often that 2 services run very close to each other. The current algorithm has difficulties distinguishing which rolling stock ran which service. Hence, in the next iteration of the algorithm, we will track the rolling stock long-term and analyze the headcode of the service to know which general direction it is going.

Some other issues that we came across is that some trains run in circle and therefore we do not know the overall direction they are travelling in. Additionally, sometimes 2 Rolling Stock seem to run the same service (and they do) but at a certain point they split. Or the other way is possible as well, when 2 Rolling Stock join to run a service together.

Another important fact is that different types of trains tend to behave differently. For instance an Empty Coaching Stock is very unpredictable because they are not considered as important as Passenger Trains. They are also more likely to be affected by external factors therefore the algorithm will assign a higher probability of an Empty Coaching Stock changing than for example a Passenger Train. Additionally, several TOCs will turn the train around to manage crowd control.

Finally, the GPS data can return results where for example a train seems to depart and arrive at the same station various times. This is because the GPS data divides the world up into several areas. If the train is first outside the area according to the GPS and then inside, a report will be generated where it arrives and the other way around. So if a Rolling Stock is parked near the border of an area for several hours, various reports might be generated where the train keeps arriving and departing from the same station.

    TODO: Include picture

# User Interface

    TODO: Add pictures + wireframe?

We would like to have a couple of different screens, each displaying the results in a different way. First of all, the first screen will display all the changes that have already happened. Hence, the user can have a quick view if all the Rolling Stock are following the Diagrams or if something has not gone according to plan.

Then, the user will also be able to select a particular Rolling Stock, which will redirect to a page, displaying all of the GPS Reports we have already received and all of the services that it might have run in a similar fashion than our second visualization.
Next, the user can also select to see the Diagrams of what actually happened and perhaps even compare them to the actual Diagrams.