# How we made this website

This website is generated using [Jekyll](http://jekyllrb.com/), and the source code it is generated from is available on our [website repo](https://github.com/ucl-team-8/website).

We chose Jekyll because it allowed us to write all our content in [Markdown](https://daringfireball.net/projects/markdown/syntax) and have reusable templates which relieve us from editing plain HTML and making mistakes. Our website is modularised, with a separate header, footer, different content layouts for different pages, which allows us to iterate quickly, with changes propagating across all the pages.

Finally, we use a [deploy script](https://github.com/ucl-team-8/website/blob/master/deploy.sh) to automatically sync our locally generated folder with the server folder. It simply asks for our CS username & password and uses `rsync` to synchronise the folders.
