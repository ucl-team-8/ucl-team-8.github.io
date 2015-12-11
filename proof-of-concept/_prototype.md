# Prototype

The first iteration of our prototype, implemented the statistical algorithm. Essentially, it matched the Trust Reports to the GPS Reports by comparing the Tiploc codes and Event Types within a certain time limit. Next, the algorithm checked if the Unit was supposed to run that service and gave a preference to those Units. Finally, we calculated how the percentage of how likely a given Rolling Stock ran the services.

## Algorithms

The first algorithm we used was a simple statistical one, and it was used in last year's project. It calculated how likely a Service was run by a particular Rolling Stock by calculating how many Trust Reports match with a GPS Report. Next, we combined that algorithm with our visualization to see how accurate it was. After careful evaluation, we concluded that it was not accurate enough and therefore we had to move on to a more complex version.

### Statistical Algorithm ([see demo]({{ site.baseurl }}/visualisations/algorithm))

<a href="{{ site.baseurl }}/visualisations/algorithm">
  <img src="{{ site.baseurl }}/assets/photos/vis-algorithm.png" style="width: 100%">
</a>

Like the first visualization, the statistical algorithm uses D3.js in order to display the results. The interface looks similar as well. In the top left corner, you can select the gps_car_id of the Rolling Stock you want to analyze. Then the algorithm lists all of the GPS Reports in the first column.

Next, for all services, we compare all of the Trust Reports to the GPS Reports. Using that data, we can calculate how many Trust Reports match with a GPS Report and calculate the probability of a Rolling Stock running the service.

Finally, we display all of the Services with a high enough probability. Every column, which represents a service, lists all of the Trust events and again, a green circle is shown if the Reports match and a red circle if no match is found.
