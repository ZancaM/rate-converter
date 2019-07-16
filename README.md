# rate-converter

##Getting Started

`npm i && tsc`

Make sure you are using node 10+ 

`npm i . -g`

`rate-converter -h`


**Example:**

Convert Rates to JSON

`rate-converter convert ratefile.xlsx -n outputFileName`

Convert CONTROL.xlsb (Illustration_Report tab) to Illustration

`rate-converter illustration CONTROL.xlsb -c illustrationConfig.json -d PUA`
