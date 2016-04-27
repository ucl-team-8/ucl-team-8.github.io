# Project Requirements

The two main deliverables in the project can be summarised concisely as:

1. Efficient real-time service matching algorithm
2. Prototype application using this algorithm to match units and services based on data received and display output

However, this can be broken down into many more detailed requirements&emdash;these are listed in the MoSCoW format below:

## Must have

- The algorithm should work in real time. This comes with several sub-goals that needs to be achieved namely :
  - Consume data feeds in real time (Feeds that needs to be consumed in real time include TRUST data and GPS data)
  - Store newly consumed data in a suitable format for processing as they come in
  - Process the pattern matching with the new data along with static data sources( Schedule data, Diagram data)
- The prototype also has several components to it
  - Return list of units that have diverged

## Should have

- You can select any Rolling Stock, to get more accurate information
- Track all Rolling Stock throughout the day
- Deploy system to be accessible via the web

## Could have

- Support more complex scenarios, discussed in under discoveries
- Visualise the output data
- Test system using real data instead of test data

## Would have

- Return the data in the same form as the diagrams and highlights where changes have happened
- Compare the milage record obtained from the algorithm to the milage record calculated from all GPS events
- Handle situations where Rolling Stock go to the maintenance depot after running the Services

Our prototype as of April 2016 satisfies all of the must and should have requirements. We have not been able to test the system using real-time data, which is one of our could have requirements but we have tested it on different static data sets. This is almost as good as it helped us to quantify how well our algorithm works on different datasets.
