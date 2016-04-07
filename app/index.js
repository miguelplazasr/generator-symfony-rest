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
		
		this.log('	This package install:');
		this.log('');
		this.log('	Symfony : ' + chalk.blue.bold('2.8'));
		this.log('	Dependencies:');
		this.log('		JMSSerializerBundle');
		this.log('		AsseticBundle');
		this.log('		StofDoctrineExtensionsBundle');
		this.log('		FOSRestBundle');
		this.log('		NelmioApiDocBundle');
		this.log('		NelmioCorsBundle');
		this.log('');
		
		var prompts = [{
			type	: 'confirm',
			name	: 'startInstall',
			message	: 'Start generation project ?',
			default	: true
		}]
		
		this.prompt(prompts, function (answers) {
			this.startConfirm = answers.startInstall;
			done();
		}.bind(this));
	},

	
	informationConf: function () {
		if(this.startConfirm) {
		var done = this.async();
		
			this.log('');
			this.log(chalk.yellow.bold('Project Configuration'));
			this.log('');
		
		var prompts = [{
			type	: 'input',
			name	: 'name',
			message	: 'Your project name',
			default	: this.appname
		},{
			type	: 'input',
			name	: 'database_name',
			message	: 'Database name : ',
			default	: 'symfony',
			store	: true,
		},{
			type	: 'input',
			name	: 'database_user',
			message	: 'Database user : ',
			default	: 'root',
			store	: true,
		},{
			type	: 'input',
			name	: 'database_password',
			message	: 'Database password : ',
			default	: 'null',
			store	: true,
		},{
			type	: 'input',
			name	: 'secret_token',
			message	: 'Secret token : ',
			default	: 'ThisTokenIsNotSoSecretChangeIt',
			store	: true,
		}]
		
		this.prompt(prompts, function (answers) {
			this.log('');
			this.config.set(answers);
			this.config.save();
			done();
		}.bind(this));
	}
	},

    confirmInstall: function(){
		if (this.startConfirm) {
      this.log('');
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
  }
    },
  
	method1: function () {
		this.log('');
	},
	

    installComposer: function() {
		if(this.writingConfirm) {
      this.log('');
      var done = this.async();
      this.log(chalk.green.bold('	Installing composer ... '));
      child_process.exec('php -r "readfile(\'https://getcomposer.org/installer\');" | php', function(error, stdout, stderr) {
        if (error)
        {
          this.log('     Composer : '+chalk.red.bold('Error.'));
        }
        else{
          this.log('	Composer : '+chalk.bgGreen.bold('Install success!'));
        }
        done();
      }.bind(this));
  }
    },

    writing: function () {
        if (this.writingConfirm)  {
          this.log('');
          this.fs.copy(this.templatePath('app'), this.destinationPath('app'));
          //this.fs.copy(this.templatePath('bin'), this.destinationPath('bin'));
          this.fs.copy(this.templatePath('src'), this.destinationPath('src'));
          this.fs.copy(this.templatePath('web'), this.destinationPath('web'));
		  
		  this.fs.copyTpl(
		  	this.templatePath('parametersConfig.yml'),
			  this.destinationPath('app/config/parameters.yml'),
			  {
				  database_name: this.config.get('database_name'),
				  database_user: this.config.get('database_user'),
				  database_password: this.config.get('database_password'),
				  secret_token: this.config.get('secret_token')
			  }
		  )


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

          this.log('');
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
		this.log('');
	},
});