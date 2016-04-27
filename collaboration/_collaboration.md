We keep track of bugs, feature requests and development discussions using Github issues: See [all our current issues](https://github.com/ucl-team-8/service/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement) for collaboration opportunities.
{: .lead}

# Getting started

To get started, you will need to have [pip](https://pip.pypa.io/en/stable/installing/), [git](https://confluence.atlassian.com/bitbucket/set-up-git-744723531.html), [PostgreSQL](http://www.postgresql.org/download/) and [brew](http://brew.sh/) installed. Next, you can follow the steps in our [README](https://github.com/ucl-team-8/service).

# Contributing

If you want to contribute to the code, follow these steps:

1. Fork the [project repo](https://github.com/ucl-team-8/service).
2. Create a branch with the name of the particular issue or improvement that you are working on.
3. After you are done, make sure that you run all of the tests in the tests folder and check if everything works.
4. Submit a [pull request](https://help.github.com/articles/creating-a-pull-request/) from your branch to our repo's master branch. Make sure that all of the tests pass on [Travis CI](https://travis-ci.org/ucl-team-8/service).
5. Wait for someone to give you feedback or merge your pull request.  If you are still unsure about using git and Github, there is a lot of excellent documentation [here](https://help.github.com/).

## Improving the [2nd iteration]({{ site.baseurl }}/iterations/segments-algorithm) of the algorithm

Even though this algorithm is not being used, there are still a couple opportunities for you to improve the initial 'segments' algorithm but they are not restricted to the list below.

- Improve locking and threading
- Make the interpolating more efficient
- Improve how GPS and TRUST reports are added to segments
- Better filtering of which segments were not supposed to be run.

There is documentation available on this version of the algorithm [here](https://github.com/ucl-team-8/service/blob/master/algorithm%2FREADME.md) or on [our website](http://students.cs.ucl.ac.uk/2015/group8/). So please go through it and make sure you have a basic understanding of how everything works.

If you add any constant parameters that might impact the algorithm, please add them in the [globals.py](https://github.com/ucl-team-8/service/blob/master/algorithm%2Fglobals.py) file. Also, if you introduce new locks, they should also be included in the same file. Make sure that once you start playing around with those locks, you do not introduce any concurrency issues because they are hard to spot.

All of the database querying is done by the [db_queries.py](https://github.com/ucl-team-8/service/blob/master/algorithm%2Fdb_queries.py) file. So make sure that it stays this way to maintain simplicity.

## Improving the [3rd iteration]({{ site.baseurl }}/iterations/statistical-algorithm) of the algorithm

The third iteration of the algorithm is the one currently being used. We have written how it works in detail in a [separate page]({{ site.baseurl }}/iterations/statistical-algorithm). We have a list of bugs and enhancements that you can work on on our Github [issues page](https://github.com/ucl-team-8/service/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement).

# Discovered an issue?

If you have found an issue, please go to our Github [issues page](https://github.com/ucl-team-8/service/issues). First, check if someone else has already found the bug and created an issue. If not, create a new one and try to be as descriptive as possible—include how somebody else might be able to recreate the issue.

**Important:** Even if you want to fix the bug yourself, it is still important that you go through the steps mentioned so people know that this bug has been discovered and somebody is working on it.
