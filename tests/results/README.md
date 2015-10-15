# Benchpress Output Table Generator

Put results into an easy to understand table

##### Setup

    npm i
    
##### Run

    gulp
 
##### Output to file
 
    gulp > output.md
 
##### Example Output

Example output in `results.md`:
  
    File: blaze.txt
    |       Counts |    Paint DOM | Re-Paint DOM |
    |--------------|--------------|--------------|
    |          100 |    0.81+-30% |         0.00 |
    |         1000 |    0.35+-56% |         0.00 |
    |         5000 |   0.04+-300% |         0.00 |
    
    ...
      