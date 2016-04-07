#Symfony-Rest Generator

symfony-rest is a YEOMAN package and provide a skeleton by Symfony 2.8 for a RestFull application.

##Dependencies

This package use this dependencies:

- [JMSSerializerBundle](http://jmsyst.com/bundles/JMSSerializerBundle)
- [AsseticBundle](https://symfony.com/doc/current/cookbook/assetic/index.html)
- [StofDoctrineExtensionsBundle](http://symfony.com/doc/current/bundles/StofDoctrineExtensionsBundle/index.html)
- [FOSRestBundle](http://symfony.com/doc/current/bundles/FOSRestBundle/1-setting_up_the_bundle.html)
- [NelmioApiDocBundle](https://github.com/nelmio/NelmioApiDocBundle)
- [NelmioCorsBundle](https://github.com/nelmio/NelmioCorsBundle)


##How to install

Firts, you need install [YEOMAN](http://yeoman.io/).

```
$ npm install -g yo
```

Then install generator-symfony-rest package.

```
$ npm -g install generator-symfony-rest
```

Finally, create a new work directory and generate the package.

```
$ mkdir project-name
$ cd project-name
$ yo symfony-rest
``` 

##How it works

Is very easy to use, only you need run the server

```
$ app/console server:run
```

Now, in you web borwser typing http://localhost:8000 and you should see

![](doc_resources/images/generator-symfony-rest.png?raw=true)

That is all!