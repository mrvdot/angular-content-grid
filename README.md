# Angular Content Grid
_An AngularJS component built to integrate dynamic feeds of HTML content into Masonry (Isotope coming soon)_

## Installation
To install via bower, run `bower install angular-content-grid`, or simply clone this repository via git.

Once you have it downloaded, you'll need to include both the directive and masonry javascript files in your HTML and import the module into your own app (unless this masonry app is all you need, in which case you can just use `ng-app="mvd.contentGrid"`). For the masonry dependencies, you can either import them all individually from the components directory, or use the packaged file that's included in the libraries directory.

## Example
For a full example, see the `examples/index.html` file. In short, you simply pass in your array of content elements into the `content-grid` directive attribute, then let masonry handle organizing them. Anytime your content array changes, angular-content-grid will detect the change and tell masonry to reload the layout.
