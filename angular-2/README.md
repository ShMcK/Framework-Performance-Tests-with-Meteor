# Find Waldos Test

## Angular 2.0.0-alpha 40

### Setup 

    meteor create angular-2
    cd angular-2
    meteor add urigo:angular2-meteor
    meteor add spectrum:material-design-lite
    meteor add meteor-base
    meteor add mongo
    meteor add standard-minifiers
    meteor add underscore

Copy Folders to `angular-2` directory.

    ./client
    ./model
    ./server

##### Run

    meteor 
        
##### Type Definition Files (optional)
    
    tsd install angular2/angular meteor/meteor underscore/underscore --save
    
    [copy angular2-meteor.d.ts... not currently available on tsd]
    
Pageload Time: 1207ms (Google Page Load Time plugin)