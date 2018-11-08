[![Build Status](https://travis-ci.org/cakriwut/spfx-jquery-list-accordion.svg?branch=master)](https://travis-ci.org/cakriwut/spfx-jquery-list-accordion)

## SPFx jQuery + jQueryUI List Accordion example

There are many online documentation on how to build SPFx jQuery Accordion webpart. Most of the example (if not all) are using static accordion template. The documentation expect developer to enhance so that it consume SharePoint list for the accordion data. However this means that there is still a gap in the example to be used in real-life scenario.

This contribution provides a real-life scenario to enhance the original SPFx jQuery Accordion webpart to connnect to SharePoint list. I keep the naming intact so that to avoid steep learning curve for the developer.

At the point of creation of this example, SPFx is only supports NPM 8.x.

### Notes for packaging

Following are two commands that you have to execute in sequence to create production package:

> gulp bundle --ship
> gupl package-solution --ship

### Notes configuration in SharePoint

As a proof of concept, the list names and columns names are hardcoded. In your SharePoint website you have to create following **Announcements** list. The list should have at least:
1. Title
2. Description

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO
