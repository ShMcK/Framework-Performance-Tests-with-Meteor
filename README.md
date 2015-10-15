# Front-End Framework Performance Tests with Meteor.js

### [Comparing Performance of Blaze, React, Angular-Meteor & Angular2-Meteor](http://info.meteor.com/blog/comparing-performance-of-blaze-react-angular-meteor-and-angular-2-with-meteor): 

Rendering & Re-Rendering Speeds

![](http://cdn2.hubspot.net/hubfs/520701/Blog/shmck/perfMethod.gif?t=1444781138300 "Waldo Test Example")

* [Blaze](https://github.com/ShMcK/Framework-Performance-Tests-with-Meteor/tree/master/blaze) (Meteor default)
* [React-Meteor](https://github.com/ShMcK/Framework-Performance-Tests-with-Meteor/tree/master/react)
* [Angular-Meteor](https://github.com/ShMcK/Framework-Performance-Tests-with-Meteor/tree/master/angular-1)
* [Angular2-Meteor](https://github.com/ShMcK/Framework-Performance-Tests-with-Meteor/tree/master/angular-2)

See also: [AngularJS `track by` & one-time binding Performance](http://www.shmck.com/measuring-angular-performance-track-by-and-one-time-binding/).

## Testing using Angular BenchPress

#### Setup

* Setup up [Protractor](https://angular.github.io/protractor/#/)
* Setup [BenchPress](https://github.com/angular/angular/blob/master/modules/benchpress/docs/index.md)


    cd tests
    npm install --save

#### Run a Test

![](http://cdn2.hubspot.net/hubfs/520701/Blog/shmck/benchpress-setup.gif?t=1444781138300 "Run Benchpress")

1. Open a different terminal and start webdriver

        webdriver-manager start
    
2. Run an instance of the app you want to test
  example:
  
        cd angular-2
        meteor
       
3. Set the settings for your test in `tests.spec.js`
   
        var TEST = {
          sampleSize: 20, // number of times the test runs
          address: 'http://localhost:3000/',
          counts: [100, 500, 1000, 2000, 3000, 4000, 5000]
        };
               
4. Run Benchpress

        protractor benchpress.conf.js

5. Check the output

![](http://cdn2.hubspot.net/hubfs/520701/Blog/shmck/benchpressRun.gif?t=1444781138300 "Benchpress output")