"use strict";

var Command = require('./command');
var jsforce = require('jsforce');

var doc = "Usage:\n" +
"	force-dev-tool query [options] <SOQL> [<remote>]\n" +
"\n" +
"Options:\n" +
"	--format=<format>    Output format [default: json].";

var SubCommand = module.exports = function(project) {
	Command.call(this, doc, project);
};

SubCommand.prototype = Object.create(Command.prototype);
SubCommand.prototype.constructor = SubCommand;

SubCommand.prototype.process = function(callback) {
	var self = this;
	self.opts = self.docopt();
	var client = self.project.determineRemote(self.opts['<remote>']);
	var format = self.opts['--format'];
	var soql = self.opts['<SOQL>'];
	client.login(function(loginErr) {
		if (loginErr) {
			callback(loginErr);
		}
		client.query(soql, function(err, res) {
		if (err) { return console.error(err); }
		if (format === 'csv') {
			callback("CSV currently not supported.");
		}
		console.log(res);
		});
	});
};

