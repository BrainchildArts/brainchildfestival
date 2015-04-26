# This is Brainchild HQ




# Dev Instructions

This site is currently built using Assemble, a clever static site generator which means we can store lots of data in separate, easy to edit YAML format and then compile it all together to create a single HTML file. No working parts for the server to run. 

Assemble runs on a task-runner called Grunt and the rest runs on Gulp. Don't ask why, it's a long and painful story and one that will be fixed one day (when assemble gets an update). Gulp and Grunt run on node.js. 

##Setting Up

1. First things first - install node. Assuming you have a mac - follow [this](http://blog.teamtreehouse.com/install-node-js-npm-mac) guide (it involves installing Brew - but that's a good thing). For other systems, [here](https://github.com/joyent/node/wiki/Installation#installing-on-windows) are the official install instructions.
2. Now you want to get Gulp installed - just run this from command line to install it globally.```$ npm install --global gulp```
3. Now we want to pull the brainchild project from github to your system. I recommend installing [SourceTree](http://www.sourcetreeapp.com/) which makes git a lot simpler to learn.
4. With SourceTree open, select 'Add Repository' and enter the following url ```https://github.com/BrainchildArts/brainchildfestival.git```. Select where you want to keep it and continue.
5. With the project downloaded, return to the command line and 'cd' into your project folder.
6. Run ```npm install``` and all the gulp and grunt modules should automatically install.
7. test the project by running ```gulp watch```.

## Editing the project
All the settings and commands are in ```gulpfile.js``` apart from the assemble settings which reside in ```gruntfile.js```. Have a look and acqaint yourself with the build processes. We are basically just compiling the [scss](http://sass-lang.com/guide), the javascript, the .hbs file with data from yaml files and then local hosting the thing with browser-sync.

To see how we can create new pages, and change stuff, most information will be on the Assemble docs - [here](http://assemble.io/docs/)

any questions, ask me - <jerome@brainchildfestival.co.uk>
