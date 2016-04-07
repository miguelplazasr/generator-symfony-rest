'use strict';

var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var yaml = require('js-yaml');
var fs = require('fs-extra');
var child_process = require('child_process');
var http = require("http");

module.exports = generators.Base.extend({
	constructor: function () {
		generators.Base.apply(this, arguments);
		this.pkg = require('../package.json');
	},
	
	
	prompting: function () {
		var done = this.async();
		
	    this.log(yosay(
	      'Welcome to the smashing ' + chalk.red('generator-symfony-rest ') + ' generator!'
	    ));
		
		var prompts = [{
			type	: 'input',
			name	: 'name',
			message	: 'Your project name',
			store	: true,
			default	: this.appname
		}]
		
		this.prompt(prompts, function (answers) {
			this.log(answers.name);
			done();
		}.bind(this));
	},
	
	informationConf: function () {
		this.log('');
		this.log('Symfony : ' + chalk.blue.bold('2.8'));
		this.log('');
	},
	
	// Instalar composer. Se debe evaluar si composer existe o no en el sistema
	/*
	installComposer: function() {
	    this.log('');
	    var done = this.async();
	    this.log(chalk.green.bold('     Installation de composer'));
	    child_process.exec('php -r "readfile(\'https://getcomposer.org/installer\');" | php', function(error, stdout, stderr) {
	      if (error)
	      {
	        console.log('     Composer : '+chalk.red.bold('Error.'));
	      }
	      else{
	        console.log('     Composer : '+chalk.green.bold('Install success.'));
	      }
	      done();
	    }.bind(this));
	  },
	*/
	  
	  
	/*
	install: function () {
		this.spawnCommand('composer', ['install']);
	},
	*/
	

    installComposer: function() {
      this.log('');
      var done = this.async();
      this.log(chalk.green.bold('     Installation de composer'));
      child_process.exec('php -r "readfile(\'https://getcomposer.org/installer\');" | php', function(error, stdout, stderr) {
        if (error)
        {
          console.log('     Composer : '+chalk.red.bold('Error.'));
        }
        else{
          console.log('     Composer : '+chalk.green.bold('Install success.'));
        }
        done();
      }.bind(this));
    },

    confirmInstall: function(){
      console.log('');
      var done = this.async();

      var prompts = [{
        type: 'confirm',
        name: 'confirmInstall',
        message: 'Confirm generation project ?',
        default: true
      }];

      this.prompt(prompts, function(answers) {
		  this.writingConfirm = answers.confirmInstall;
		  this.log('');
		  done();

      }.bind(this));
    },

    writing: function () {
        if (this.writingConfirm)  {
          this.log('');
          this.fs.copy(this.templatePath('app'), this.destinationPath('app'));
          //this.fs.copy(this.templatePath('bin'), this.destinationPath('bin'));
          this.fs.copy(this.templatePath('src'), this.destinationPath('src'));
          this.fs.copy(this.templatePath('web'), this.destinationPath('web'));


          this.template('_gitignore', '.gitignore');
          this.template('composer.json', 'composer.json');

          //this.fs.copy(this.templatePath(this.projectMode + '/editorconfig'),this.destinationPath('.editorconfig'));
          //this.fs.copy(this.templatePath(this.projectMode + '/jshintrc'), this.destinationPath('.jshintrc'));
          this.log('');
          this.log('');
        }
      },
	  
	  end: {

      installVendors: function(){
        if (this.writingConfirm)  {
          var done = this.async();

          var command = 'php composer.phar update';

          console.log('');
          this.log(chalk.cyan('         Install Vendors...'));
          child_process.exec(command, function (error, stdout, stderr) {
            if (error != null)
            {
              console.log(chalk.red.bold(error));
              console.log(chalk.red.bold('         Error'));
            }
            else{
              console.log(chalk.green.bold('         Success'));
            }
            console.log('');
            done();
          });
        }
      },
  },
  
	method1: function () {
		console.log(this.sourceRoot());
		console.log('');
		console.log(this.templatePath);
	},
});