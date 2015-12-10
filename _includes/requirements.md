# Project Requirements

We display to requirements in a MoSCoW format in order to prioritize certain tasks.

### Must Have:

+ Train Service Real Time Pattern Matching Algorithm
  + Uses data from GPS, real time train service data (TRUST), train schedule data and train diagrams
  + The algorithm can handle real-time data
  + Returns a list of units which have been identified as not matching their planned services
  + Support basic scenarios
+ Prototype Application that uses the algorithm to match Rolling Stock to Services in real time from multiple data feeds
  + Application displays the output of the algorithm in a very simple format

### Should Have:

+ The prototype application simulates a real-time environment
+ You can select any Rolling Stock, to get more accurate information
+ Track all Rolling Stock on a long-term to improve accuracy
+ Use additional information in the headcode of the Service to make predictions
+ Deploy system on Heroku

### Could Have:

+ Predict a more accurate mileage record
+ Algorithm supports more complex scenarios, discussed in under discoveries
+ Visualizing the output data
+ Use additional open-data to return more accurate results
+ Test system using real data instead of test data

### Would Like:

+ Returns the data in the same form as the diagrams and highlights where changes have happened
+ Compared the milage record obtained from the algorithm to the milage record calculated from all GPS events.
+ Handle situations where Rolling Stock go to the maintenance depot after running the Services.

## Use Cases

To describe the system and its requirements to a further extend, we will use some use cases.

    TODO: See drive for use cases
