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
+ Support more complex scenarios, discussed in under [discoveries](/research#discoveries)
+ Visualise the output data
+ Use additional data streams (from [Network Rail data feeds](https://datafeeds.networkrail.co.uk)) to generate more accurate results
+ Test system using real data instead of test data

### Would Like:

+ Return the data in the same form as the diagrams and highlights where changes have happened
+ Compare the mileage record obtained from the algorithm to the milage record calculated from all GPS events
+ Handle situations where Rolling Stock go to the maintenance depot after running the Services

Currently, our Proof of Concept covers all of the Must Have requirements except for supporting a real-time environment and output a list of the units which have been identified as not matching their planned services. Instead, it returns the probability of a Rolling Stock running a Service. Therefore in the current state it still needs human assistance.

However we believe that we are on track to cover all the requirements. We are already working on improving the algorithm and si,ulating a real-time environment.
