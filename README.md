## Setting up

First, install Ruby & Node:

```
brew install ruby node
```

Then install Jekyll, which will be used to build the site:

```
gem install jekyll
```

Install bower, which will be used to manage JavaScript dependencies:

```
npm install -g bower
```

Install all bower dependencies for the website by running:

```
bower install
```

## Previewing the site

To set up a local webserver & regenerate the site on every edit, run:

```
jekyll serve
```

This allows you to edit & preview the site instantly. Read below about deploying once you're done developing.

## Deploying the site

To deploy, execute `deploy.sh` by running:

```
./deploy.sh
```

in the website folder. It will ask you for your CS username & password, and will automatically sync your local folder with the server folder using `rsync`.
