#!/usr/bin/env node --max_old_space_size=4096

import * as commander from 'commander';
import chalk from 'chalk';
import Convert from './Convert';
import Replace from './Replace';
import Shift from './Shift';
import Illustration from './Illustration';

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
    .description('renames files and finds and replace text having the passed string in it')
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

commander
    .command('illustration <filePath>')
    .alias('i')
    .description('reads excel illustration and maps it to a json using the configuration passed')
    .option("-c, --configpath [configpath]", "Required: Path of config file")
    .option("-d, --dividend [dividend]", "Required: Type of dividend option used (Accumulate, PRCash, PRPUA, PUA, Cash)")
    .action(function(filePath, options){
        console.log(chalk.red('========= Converting Illustration =========='));
        Illustration.convert(filePath, options);
    });

commander
    .command('append <filePath>')
    .alias('a')
    .description('append as many zero as the last value in the key')
    .action(function(filePath, options){
        console.log(chalk.red('========= Appending =========='));
        Shift.shift(filePath, options);
    });

commander.parse(process.argv);