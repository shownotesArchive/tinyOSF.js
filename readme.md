#tinyOSF.js

##a few lines of code to convert OSF to HTML

###About

tinyOSF.js is a JavaScript implementation of the OpenShownotesFormat.  
You can get more informations about OSF at [OSF in a Nutshell](http://shownotes.github.io/OSF-in-a-Nutshell/).  
This OSF Parser is used in the following projects: 

* [ShowPad](https://github.com/shownotes/show-pad) - [@shownot.es](http://pad.shownot.es/)
* [OSF Wordpress Plugin](https://github.com/SimonWaldherr/wp-osf-shownotes)
* if your project use it too, please add it here

###HowTo

```js
var osfShownotes = '1358966352 Sendungsbeginn #c ...';
var exportMode = 'html';
shownotes = osfExport(osfParser(osfShownotes),osfExportModules[exportMode]);
document.getElementById('parsed').innerHTML = shownotes;
```

###Demo

[shownotes.github.io/tinyOSF.js/](http://shownotes.github.io/tinyOSF.js/)

###License

[MIT](http://simon.waldherr.eu/license/mit/)

###Version

0.1.6
