# User Interface

The user interface of our application contains a map that visualises all of the reported data points and colours indicate whether the algorithm has found a match. The section to the right would list all of the units (of rolling stock) that have been identified as not matching their services. The algorithm parameter option allows the user to change the matching algorithms parameters like time and distance tolerance between Tiplocs. The user can select a particular mismatched service and the system will display details of the mismatched reports and it's predictions.

A rough UI wireframe is shown below:
<img src="{{ site.baseurl }}/assets/photos/UI.png">

## HCI Considerations

As the client did not have any explicit usability requirements (as the project itself is an algorithm rather than an application), we explored a few UI styles that may help make interpreting the output of the algorithm easier.

The map is a solution to a common problem that we have been experiencing with train services data. It helps the user see the whole picture, as to where the GPS or TRUST reports happened, and what the algorithm has decided. In odd situations where trains loop around the user is also able to see it graphically as opposed to a string of text that doesn't tell you much.

The right section displays the most important information that the client needs in this project, which is which services aren't being run by the planned rolling stock. The details pane below will initially be hidden, but once the user selects a particular mismatched service, the details of what the algorithm has found is displayed.

The button that is used to export the corrected diagrams is also easily accessible and the only button on the page to help emphasise the most important feature.

## User Testing

We will provide a group of users with background and context and ask them to perform common tasks on the test application and then observe their behaviour. After this we will have a brief interview with them to gather feedback on specific points of the application.

Some open questions we would ask:

1. How easy was it trying to find the new corrected diagrams?
2. Do you feel like you could easily find mismatched services?
3. What do you feel about the representation of data points on the map?
4. Are you able to tell what is happening to the services as a whole at a particular time?

As our main target audience for this algorithm are people working in the train industry, our focus would be to test on people in this audience, the most important one being our client.
