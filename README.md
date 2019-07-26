# rate-converter

## Getting Started

`npm i && tsc`

Make sure you are using node 10+ 

`npm i . -g`

`rate-converter -h`

**Example:**

Convert Rates to JSON

`rate-converter convert ratefile.xlsx -n outputFileName --removeTrailingZeros false`

Convert CONTROL.xlsb (Illustration_Report tab) to Illustration

`rate-converter illustration CONTROL.xlsb -c illustrationConfig.json -d PUA`

Replace a string in folder and it's files and within the body of the files containing that string

`rate-converter replace <FolderPath> -f stringToReplace -n newStringtoreplacewith`

Shift rates by # spaces

`rate-converter shift <FilePath> -n 2`