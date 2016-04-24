# User manual

## UI

<a href="{{ site.baseurl }}/visualisations/demo/">
  <img src="{{ site.baseurl }}/assets/photos/demo.png" alt="A demo of the user interface" style="width: 100%"/>
</a>

([See a demo of the UI]({{ site.baseurl }}/visualisations/demo/))

The UI is divided up into three vertical panes.

### Left pane

On the left are all the **services** that the algorithm has seen so far. There are some numbers in coloured circles:

- **green** is the number of **new** matchings found that **didn't** exist in the allocations
- **gray** is the number of matchings found that **did** already exist in the allocations
- **red** is the number of matchings that **did** exist in the allocations, but are **wrong** according to the algorithm

The **search field** at the top allows searching for:

- a headcode (e.g. `2C07`)
- a gps_car_id (e.g. `150148`), which will find all services for the gps_car_id
- `added` will find services with **green** circles
- `unchanged` will find services with **gray** circles
- `removed` will find services with **red** circles

Selecting a service will show more information in the middle and right pane.

### Middle pane

The middle pane shows a **map** with:

- TRUST reports of the service in **green**
- GPS reports of the unit in **brown**

Only the selected service is plotted by default, but you can plot matchings by moving your mouse over them in the right pane.

You can also zoom by scrolling (or the **+** and **-** buttons) and pan by dragging. The current time of the simulation is shown in the top right corner (if the simulation is running).

### Right pane

The right pane shows matchings of the selected service with different units.

At the top is the **headcode** or **gps_car_id**. If they are shown in **green** then the algorithm decided that they **match**, otherwise, if they're in **red**, then they **do not match**, but are planned in the allocations.

Below them are the reports. In **green** are TRUST reports of the service, and in **brown** are GPS reports of the unit. The reports are sorted **chronologically**, with earliest at the top and latest and the bottom.

Moving your mouse over the reports will display on the map the approximate, interpolated location of the service and the unit at that specific time. This helps determine how close they were running, and whether they do indeed match.
