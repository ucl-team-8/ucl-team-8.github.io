# Testing and Evaluation

Due to the nature of the problem, the output of the algorithm is very hard to test programmatically. Initially, our plan was to get all of the manual matches and write tests that use results from historic data to verify the accuracy of the algorithm. However, our client warned us that those matchings were still prone to error because they were all made manually. So we decided to use other techniques to test our final solution.

## Unit Tests

We wrote unit tests to test almost all individual units of the algorithm. All of the different components such as db_queries, geographical distance, cleaner thread and so on have their set of unit tests. In addition to just testing the parts of the algorithm, wrote tests to see if all of the flask end points still work as they are supposed to. All of these tests have been implemented using the Python [unittest module](https://docs.python.org/2/library/unittest.html)

We also use [Travis](https://travis-ci.org/), which is a popular, free and has easy integration with Github for continuous integration. Every time somebody pushes a commit to the remote repository, Travis upgrades the database, tests the import script by importing all of the data and runs all of the unit tests. This way we can identify if a particular commit affects any of the functionality. You can see our Travis built [here](https://travis-ci.org/ucl-team-8/service).

## Testing the Output

Unit tests mainly check whether a particular component is working, but this does not guarantee that the output of our algorithm will be of high quality. And as discussed earlier since the output is very hard to test programmatically, we will have to do it manually.

### Visualizations

Throughout the project, we have used various visualizations to make the process of manual testing easier. In general, the UI consists of 2 visualizations that are supposed to help the user see the whole picture. First of all, we improved upon the old view that shows all of the matches by using a polylinear time scale. This gives the user an idea as to when a GPS report happened compared to a trust report and vice versa. We also included a new visualization, which shows you all of the reports on a map, so the user can see the events graphically as opposed to a string of text.

Just having a static overview already helps but we realized that being able to see where a unit or service is at a given point in time will make the process of manually checking a lot more accurate. Therefore, you can now scroll through the events and see if it was likely if the service was run by a particular unit.

We have used this visualization to go through most of the matches. Until now all of them appear to be correct, which is the first guarantee that the algorithm produces results with a high quality.

### Client Feedback

We can use the visualization to a certain extent whether a unit is running a particular service. However we do not have the years of experience that some people have had at Atos. Therefore we have asked our client to evaluate a static extract of the outputs from our algorithm. The client is still in the process of checking a large amount of matchings in the extract. However after random sampling various allocations, our client concluded that the algorithm performs well and returns  very accurate results. In general, the allocations created by our algorithm are at least as accurate as a human.
