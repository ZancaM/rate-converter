#!/usr/bin/env node

import * as commander from 'commander';
import chalk from 'chalk';
import Convert from './Convert';

commander
    .command('convert <filePath>')
    .alias('c')
    .description('converts a rate file to JSON')
    .option("-s, --sheet [sheet]", "Which sheet to use")
    .option("-n, --name [newName]", "path followed by JSON file name (no extension)")
    .option("-r, --removeZeros [removeTrailingZeros]", "remove railing zeros")
    .action(function(filePath, options){
        console.log(chalk.yellow('========= Beginning Conversion =========='));
        Convert.convert(filePath, options);
    });

commander.parse(process.argv);