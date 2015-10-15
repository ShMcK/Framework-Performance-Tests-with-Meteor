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

5. Check the output in your console

Alternatively, you can output the results to a file. See the results folder as an example.


    protractor benchpress.conf.js > results/blaze.txt

![](http://cdn2.hubspot.net/hubfs/520701/Blog/shmck/benchpressRun.gif?t=1444781138300 "Benchpress output")

##### Example output: (Angular 2, count: 10, sampleSize: 10)

```
BENCHMARK test
Description:
- forceGc: true
- regressionSlopeMetric: scriptTime
- sampleSize: 10
- userAgent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36
Metrics:
- forcedGcAmount: forced garbage collection amount in kbytes
- forcedGcTime: forced gc time in ms
- gcAmount: gc amount in kbytes
- gcTime: gc time in ms
- majorGcTime: time of major gcs in ms
- pureScriptTime: script execution time in ms, without gc nor render
- renderTime: render time in ms
- scriptTime: script execution time in ms, including gc and render

    forcedGcAmount |       forcedGcTime |           gcAmount |             gcTime |        majorGcTime |     pureScriptTime |         renderTime |         scriptTime
------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------------
          31815.90 |              42.42 |               0.00 |               0.00 |               0.00 |              14.19 |              11.14 |              14.19
           1336.00 |              25.55 |               0.00 |               0.00 |               0.00 |               0.18 |               1.71 |               0.18
           1441.06 |              16.44 |               0.00 |               0.00 |               0.00 |               0.14 |               3.19 |               0.14
            804.88 |              18.65 |               0.00 |               0.00 |               0.00 |               0.30 |               4.24 |               0.30
            817.70 |              18.48 |               0.00 |               0.00 |               0.00 |               0.21 |               2.10 |               0.21
            823.64 |              22.31 |               0.00 |               0.00 |               0.00 |               0.14 |               2.41 |               0.14
            803.66 |              20.39 |               0.00 |               0.00 |               0.00 |               0.12 |               2.52 |               0.12
           2475.33 |              77.98 |               0.00 |               0.00 |               0.00 |               6.87 |              25.01 |               6.87
            815.92 |              67.94 |               0.00 |               0.00 |               0.00 |               0.11 |               1.19 |               0.11
           1411.75 |              59.84 |               0.00 |               0.00 |               0.00 |               0.11 |               2.18 |               0.11
            948.29 |              63.05 |               0.00 |               0.00 |               0.00 |               0.12 |               2.40 |               0.12
================== | ================== | ================== | ================== | ================== | ================== | ================== | ==================
      1167.82+-43% |         39.06+-60% |               0.00 |               0.00 |               0.00 |         0.83+-243% |         4.69+-145% |         0.83+-243%

1 spec, 0 failures
Finished in 20.571 seconds
[launcher] 0 instance(s) of WebDriver still running
[launcher] chrome #1 passed
```

#### Issues / Fixes

* `Error: Could not find chromedriver at /usr/local/lib/node_modules/protractor/selenium/chromedriver.exe`

Re-install protractor, and restart your computer.
    
* `A Jasmine spec timed out. Resetting the WebDriver Control Flow.`

Consider increasing your `TIMEOUT_INTERVAL_VAR` in `tests.spec.js`.
Consider increasing `defaultTimeoutInterval` in `benchpress.conf.js`.
