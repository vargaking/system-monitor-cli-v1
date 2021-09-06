const os = require('os-utils');
const boxen = require('boxen');
const figlet = require('figlet');
const chalk = require('chalk');
var asciichart = require('asciichart');

const screenWidth = process.stdout.columns;
const screenHeight = process.stdout.rows;

figlet('System Monitor', function (err, data) {
	console.log(
		chalk.blue(
			boxen(data, {
				borderColor: 'blue',
				borderStyle: 'double',
				padding: 1,
				margin: { left: screenWidth - 2 - data.length / 5, right: screenWidth - 2 - data.length / 5 },
			})
		)
	);
});

var percentagePerLine = Math.floor(100 / screenHeight);

setTimeout(() => {
	console.clear();
}, 2000);
var chartOutput = '';
var s0 = new Array(screenWidth - 30);
s0.fill(0);
var chartData = new Array(screenWidth - 30);
var currentColumn = new Array(Math.floor(100 / percentagePerLine));
var cpuData = new Array(screenWidth - 30);
cpuData.fill(0);
var cpuIndex = 0;
var cpuUsage;
setInterval(() => {
	setTimeout(() => {
		console.clear();
	}, 1000);
	os.cpuUsage(function (v) {
		cpuUsage = v * 100;
		cpuData[cpuIndex] = Math.floor(cpuUsage);
		if (cpuIndex == screenWidth - 30) {
			cpuIndex = 0;
		} else {
			cpuIndex++;
		}
		for (i = 0; i < s0.length; i++) {
			s0[i] = cpuData[i];
		}
		/*for (i = 0; i < chartData.length; i++) {
			for (x = 0; x < currentColumn.length; x++) {
				if (cpuData[i] > x + 1) {
					console.log(cpuData[i]);
					console.log(x + ' x');
					currentColumn[x] = '@';
				} else {
					currentColumn[x] = 'o';
				}
			}
			chartData[i] = currentColumn;
		}*/
		console.log(asciichart.plot(s0, { height: screenHeight * 0.8 }));
		/*for (x = 0; x < currentColumn.length; x++) {
			for (i = 0; i < chartData.length; i++) {
				chartOutput += chartData[i][x];
				if (i == chartData.length) {
					chartOutput += '\n';
				}
				//console.log(chartData[i][x]);
			}
		}*/

		//console.log(chartOutput);
	});
}, 1000);
