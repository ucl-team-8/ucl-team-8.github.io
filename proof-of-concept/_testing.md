# Testing Strategies

We have researched techniques and tools for testing which we plan to use once we start developing and experimenting with more complex algorithms. Our plan is to automate testing as much as possible, by connecting it to our version control system and testing on every change, so we detect errors early.

We plan to use [Travis](https://travis-ci.org/), which is popular, free and has easy integration with Github.

Below are some of our test plans for Term 2:

## Unit Tests

We will have a test suite written for the main algorithm itself which includes:

+ The matching of station names and the geographical locations
+ The matching of the time within x minutes
+ Matching of event type
+ Matching headcodes with specific train types and rough destinations
+ Matching services to rolling stock with Genius Allocations
