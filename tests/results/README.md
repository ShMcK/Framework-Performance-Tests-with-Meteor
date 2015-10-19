# Benchpress Output Table Generator

Put results into an easy to understand table

##### Setup

    npm i
    
##### Run

    gulp
 
##### Output to file
 
    gulp > results.md
 
##### Example Output

Example output in `results.md`:

    File: angular-1.txt

    |           Counts |        Paint DOM |     Re-Paint DOM |
    | ----------------:| ----------------:| ----------------:|
    |               10 |        9.49+-10% |        0.99+-34% |
    |              100 |       17.57+-12% |        2.28+-12% |
    |              500 |   11021.64+-140% |       27.02+-66% |
    |             1000 |   22496.24+-141% |       60.25+-70% |

##### Create a chart

Partially incomplete.

    gulp chart > charts/generated-data.js  // rough version
    browserify charts/charts.js > charts/generated-data-script.js
    
open `charts/charts.html`.
    

      