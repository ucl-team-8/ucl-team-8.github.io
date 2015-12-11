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
+ Compare the milage record obtained from the algorithm to the milage record calculated from all GPS events
+ Handle situations where Rolling Stock go to the maintenance depot after running the Services

Currently, our Proof of Concept covers all of the Must Have requirements except for supporting a real-time environment and output a list of the units which have been identified as not matching their planned services. Instead, it returns the probability of a Rolling Stock running a Service. Therefore in the current state it still needs human assistance.

However we believe that we are on track to cover all the requirements. We are already working on improving the algorithm and si,ulating a real-time environment.

# Use Cases

To describe the system and its requirements to a further extend, we will use some use cases.

{% for case in site.data.use_cases %}
<table class="table table-bordered">
  <thead>
    <tr>
      <th><strong>Use Case:</strong> {{ case.name }}</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>ID:</strong> {{ case.id }}</td>
    </tr>
    <tr>
      <td><strong>Brief description:</strong>
      {{ case.description | markdownify }}</td>
    </tr>
    <tr>
      <td><strong>Primary actor(s):</strong>
      {{ case.primary_actor | markdownify }}</td>
    </tr>
    <tr>
      <td><strong>Secondary actor(s):</strong>
      {{ case.secondary_actor | markdownify }}</td>
    </tr>
    <tr>
      <td><strong>Precondition(s):</strong>
      {{ case.preconditions | markdownify }}</td>
    </tr>
    <tr>
      <td><strong>Main flow:</strong>
      {{ case.main_flow | markdownify }}</td>
    </tr>
    <tr>
      <td><strong>Postcondition(s):</strong>
      {{ case.postconditions | markdownify }}</td>
    </tr>
    <tr>
      <td><strong>Alternative flows:</strong>
      {{ case.alternative_flows | markdownify }}</td>
    </tr>
  </tbody>
</table>
{% endfor %}
