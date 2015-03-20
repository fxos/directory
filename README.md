[![Build Status](https://travis-ci.org/fxos/directory.svg?branch=master)](https://travis-ci.org/fxos/directory)

# Hackerplace
This is a directory of apps and add-ons for customizing Firefox OS.

# Submission Process
Here's how to submit your app or add-on to the Hackerplace:

1. Fork the Hackerplace repository: https://github.com/fxos/directory.
1. In your fork, edit the [App List](https://github.com/fxos/directory/blob/master/app/js/model/list_model.js) by adding an item with the follow data:
  * **manifestURL**: the URL at which your app/add-on's manifest resides
  * **name**: the name of you app/add-on shown in the hackerplace list
  * **icon**: the URL of your icon, if you want it can be relative, and you can add your icon [here](https://github.com/fxos/directory/tree/master/app/img/app_icons)
  * **description**: a brief description of your application
  * **author**: your name, or github handle
  * **type**: can be `hosted`, `packaged` or `addon`, see [MDN](https://developer.mozilla.org/en-US/Marketplace/Options/Packaged_or_hosted) for more info
  * **url**: the public git repository url for your app/add-on
  * **revision**: a revision hash for the current version of your app/add-on
1. Submit a Pull Request request containing the updated app list with your app/add-on info to the Hackerplace repository. (For more information on how to create a Github Pull Request, see the [Documentation](https://help.github.com/articles/creating-a-pull-request/))

Once the PR has been reviewed, approved, and merged, your add-on or app will appear in the Hackerplace!
