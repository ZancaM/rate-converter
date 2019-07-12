#!/usr/bin/env node

import * as commander from 'commander';
import chalk from 'chalk';
import Convert from './Convert';
import Replace from './Replace';
import Shift from './Shift';

commander
    .command('convert <filePath>')
    .alias('c')
    .description('converts a rate file to JSON')
    .option("-s, --sheet [sheet]", "Which sheet to use")
    .option("-n, --name [newName]", "path followed by JSON file name (no extension)")
    .option("-r, --removeTrailingZeros [removeTrailingZeros]", "remove railing zeros (by default is false)")
    .action(function(filePath, options){
        console.log(chalk.yellow('========= Beginning Conversion =========='));
        Convert.convert(filePath, options);
    });

commander
    .command('replace <folderPath>')
    .alias('r')
    .description('renames and text find and replaces files having the passed string in it')
    .option("-f, --from [from]", "Word to find")
    .option("-n, --name [newName]", "new name")
    .action(function(filePath, options){
        console.log(chalk.red('========= Beginning Conversion =========='));
        Replace.convert(filePath, options);
    });

commander
    .command('shift <filePath>')
    .alias('s')
    .description('shifts rates by n number of spaces')
    .option("-n, --num [num]", "Number of spaces to shift")
    .action(function(filePath, options){
        console.log(chalk.red('========= Shifting =========='));
        Shift.shift(filePath, options);
    });

commander.parse(process.argv);