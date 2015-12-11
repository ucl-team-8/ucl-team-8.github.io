# Prototype

The first iteration of our prototype, implemented the statistical algorithm. Essentially, it matched the Trust Reports to the GPS Reports by comparing the Tiploc codes and Event Types within a certain time limit. Next, the algorithm checked if the Unit was supposed to run that service and gave a preference to those Units. Finally, we calculated how the percentage of how likely a given Rolling Stock ran the services.

## Discoveries

### Trains runnning close to each other

It sometimes happens that 2 services are travelling very close to each other. The current algorithm has difficulties distinguishing which rolling stock ran which service. Hence, in the next iteration of the algorithm, we will track the rolling stock long-term and analyze the headcode of the service to know which general direction it is going.

### Trains running in a loop

Another issue we came across is trains running in a circle, where we don't know the overall direction they are travelling in.

### Service run by multiple rolling stock

Sometimes 2 Rolling Stock seem to run the same service (and they do) but at a certain point they split. Or the other way is possible as well, when 2 Rolling Stock join to run a service together.

### Train travelling behaviours

Another important fact is that different types of trains tend to behave differently. For instance an Empty Coaching Stock is very unpredictable because they are not considered as important as Passenger Trains. They are also more likely to be affected by external factors therefore the algorithm will assign a higher probability of an Empty Coaching Stock changing than for example a Passenger Train. Additionally, some companies may turn the train around to manage crowds.

### Inaccurate reports

The GPS data can sometimes repeately report arrivals and departures of the same train, at the same station, even though the train itself is stationary. This is because the GPS data divides the world up into several areas. If the train is first outside the area according to the GPS and then inside, a report will be generated where it arrives and the other way around. So if a Rolling Stock is parked near the border of an area for several hours, various reports might be generated where the train keeps arriving and departing from the same station.

    TODO: Include picture
