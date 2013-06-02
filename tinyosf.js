/*
 * tinyosf.js
 *
 * Copyright 2013, Simon Waldherr - http://simon.waldherr.eu/
 * Released under the MIT Licence
 * http://opensource.org/licenses/MIT
 *
 * Github:  https://github.com/shownotes/tinyOSF.js/
 * Version: 0.1.6
 */

/*jslint browser: true, white: true, indent: 2 */
/*exported osfParser, osfExport, osfBuildTags */

function osfExtractTags(tagString, urlString) {
  "use strict";
  var tagArray = [],
    tagTempArray = [],
    i, urlTemp, tagTemp;
  tagTempArray = tagString.split(' ');
  for (i = 0; i < tagTempArray.length; i += 1) {
    tagTemp = tagTempArray[i].replace('#', '').trim();
    if (tagTemp.length === 1) {
      if (tagTemp === 'c') {
        tagTemp = 'chapter';
      } else if (tagTemp === 't') {
        tagTemp = 'topic';
      } else if (tagTemp === 'g') {
        tagTemp = 'glossary';
      } else if (tagTemp === 'l') {
        tagTemp = 'link';
      } else if (tagTemp === 's') {
        tagTemp = 'section';
      } else if (tagTemp === 'v') {
        tagTemp = 'video';
      } else if (tagTemp === 'a') {
        tagTemp = 'audio';
      } else if (tagTemp === 'i') {
        tagTemp = 'image';
      } else if (tagTemp === 'q') {
        tagTemp = 'quote';
      }
    }
    if (tagTemp.length > 3) {
      tagArray[i] = tagTemp;
    }
  }
  if (urlString !== false) {
    urlTemp = urlString.split('/')[2];
    if (Array.isArray(urlTemp)) {
      urlTemp = urlTemp.split('.');
      tagArray[i + 1] = urlTemp[urlTemp.length - 2] + urlTemp[urlTemp.length - 1];
    }
  }
  return tagArray;
}

function osfBuildTags(tagArray, withOSF, withClass) {
  "use strict";
  var i, output = '';
  for (i = 0; i < tagArray.length; i += 1) {
    if (typeof tagArray[i] === 'string') {
      if (tagArray[i].trim().length > 3) {
        if (withOSF === true) {
          output += ' osf_' + tagArray[i];
        } else {
          if (output !== '') {
            output += ', ';
          }
          output += tagArray[i];
        }
      }
    }
  }
  if (withClass === true) {
    return ' class="' + output + '"';
  }
  return output;
}

function osfTimestampsToHMS(now, starttimestamp) {
  "use strict";
  var time = parseInt(now, 10) - parseInt(starttimestamp, 10),
    hours, minutes, seconds, returntime = '';
  hours = Math.floor(time / 3600);
  minutes = Math.floor((time - (hours * 3600)) / 60);
  seconds = time - (hours * 3600) - (minutes * 60);
  returntime += (hours < 10) ? '0' + hours + ':' : hours + ':';
  returntime += (minutes < 10) ? '0' + minutes + ':' : minutes + ':';
  returntime += (seconds < 10) ? '0' + seconds : seconds;
  return returntime;
}

function osfHMSToTimestamp(hms) {
  "use strict";
  var time = 0,
    timeArray, regex = /((\d+\u003A)?(\d+\u003A)?(\d+)(\u002E\d+)?)/;
  if (hms === undefined) {
    return;
  }
  timeArray = regex.exec(hms.trim());
  if (timeArray !== null) {
    time += parseInt(timeArray[2], 10) * 3600;
    time += parseInt(timeArray[3], 10) * 60;
    time += parseInt(timeArray[4], 10);
  } else {
    return undefined;
  }
  return time;
}

function escapeHtml (string) {
  "use strict";
  return string.replace(/[\u00A0-\u2666<>\&]/g, function(c) {
    var entityTable = {34:'quot',38:'amp',39:'apos',60:'lt',62:'gt',160:'nbsp',161:'iexcl',162:'cent',163:'pound',164:'curren',165:'yen',166:'brvbar',167:'sect',168:'uml',169:'copy',170:'ordf',171:'laquo',172:'not',173:'shy',174:'reg',175:'macr',176:'deg',177:'plusmn',178:'sup2',179:'sup3',180:'acute',181:'micro',182:'para',183:'middot',184:'cedil',185:'sup1',186:'ordm',187:'raquo',188:'frac14',189:'frac12',190:'frac34',191:'iquest',192:'Agrave',193:'Aacute',194:'Acirc',195:'Atilde',196:'Auml',197:'Aring',198:'AElig',199:'Ccedil',200:'Egrave',201:'Eacute',202:'Ecirc',203:'Euml',204:'Igrave',205:'Iacute',206:'Icirc',207:'Iuml',208:'ETH',209:'Ntilde',210:'Ograve',211:'Oacute',212:'Ocirc',213:'Otilde',214:'Ouml',215:'times',216:'Oslash',217:'Ugrave',218:'Uacute',219:'Ucirc',220:'Uuml',221:'Yacute',222:'THORN',223:'szlig',224:'agrave',225:'aacute',226:'acirc',227:'atilde',228:'auml',229:'aring',230:'aelig',231:'ccedil',232:'egrave',233:'eacute',234:'ecirc',235:'euml',236:'igrave',237:'iacute',238:'icirc',239:'iuml',240:'eth',241:'ntilde',242:'ograve',243:'oacute',244:'ocirc',245:'otilde',246:'ouml',247:'divide',248:'oslash',249:'ugrave',250:'uacute',251:'ucirc',252:'uuml',253:'yacute',254:'thorn',255:'yuml',402:'fnof',913:'Alpha',914:'Beta',915:'Gamma',916:'Delta',917:'Epsilon',918:'Zeta',919:'Eta',920:'Theta',921:'Iota',922:'Kappa',923:'Lambda',924:'Mu',925:'Nu',926:'Xi',927:'Omicron',928:'Pi',929:'Rho',931:'Sigma',932:'Tau',933:'Upsilon',934:'Phi',935:'Chi',936:'Psi',937:'Omega',945:'alpha',946:'beta',947:'gamma',948:'delta',949:'epsilon',950:'zeta',951:'eta',952:'theta',953:'iota',954:'kappa',955:'lambda',956:'mu',957:'nu',958:'xi',959:'omicron',960:'pi',961:'rho',962:'sigmaf',963:'sigma',964:'tau',965:'upsilon',966:'phi',967:'chi',968:'psi',969:'omega',977:'thetasym',978:'upsih',982:'piv',8226:'bull',8230:'hellip',8242:'prime',8243:'Prime',8254:'oline',8260:'frasl',8472:'weierp',8465:'image',8476:'real',8482:'trade',8501:'alefsym',8592:'larr',8593:'uarr',8594:'rarr',8595:'darr',8596:'harr',8629:'crarr',8656:'lArr',8657:'uArr',8658:'rArr',8659:'dArr',8660:'hArr',8704:'forall',8706:'part',8707:'exist',8709:'empty',8711:'nabla',8712:'isin',8713:'notin',8715:'ni',8719:'prod',8721:'sum',8722:'minus',8727:'lowast',8730:'radic',8733:'prop',8734:'infin',8736:'ang',8743:'and',8744:'or',8745:'cap',8746:'cup',8747:'int',8756:'there4',8764:'sim',8773:'cong',8776:'asymp',8800:'ne',8801:'equiv',8804:'le',8805:'ge',8834:'sub',8835:'sup',8836:'nsub',8838:'sube',8839:'supe',8853:'oplus',8855:'otimes',8869:'perp',8901:'sdot',8968:'lceil',8969:'rceil',8970:'lfloor',8971:'rfloor',9001:'lang',9002:'rang',9674:'loz',9824:'spades',9827:'clubs',9829:'hearts',9830:'diams',338:'OElig',339:'oelig',352:'Scaron',353:'scaron',376:'Yuml',710:'circ',732:'tilde',8194:'ensp',8195:'emsp',8201:'thinsp',8204:'zwnj',8205:'zwj',8206:'lrm',8207:'rlm',8211:'ndash',8212:'mdash',8216:'lsquo',8217:'rsquo',8218:'sbquo',8220:'ldquo',8221:'rdquo',8222:'bdquo',8224:'dagger',8225:'Dagger',8240:'permil',8249:'lsaquo',8250:'rsaquo',8364:'euro'};
    return '&' + (entityTable[c.charCodeAt(0)] || '#'+c.charCodeAt(0)) + ';';
  });
}

function osfParser(string) {
  "use strict";
  var osfArray, i = 0,
    splitAt = false,
    output = [],
    osfRegex = /(^([(\d{8,})(\u002D+)(\d+\u003A\d+\u003A\d+(\u002E\d*)?)]*)?\h*([\u0020-\u0022\u0024-\u003B\u003D\u003F-\u007D\u00C0-\u00FF\u2013„“@€!"§$%&\(\)=\?`´\+ ]+) *(\u003C[\S]*\u003E)?((\s*\u0023[\S]* ?)*)\n*)/gmi;
  //about this Regex:
  //^([(\d{8,})(\u002D+)(\d+\u003A\d+\u003A\d+(\u002E\d*)?)]*)?                                => 1234567890 or - or 00:01:02[.000] or nothing at the beginning of the line
  //([\u0020-\u0022\u0024-\u003B\u003D\u003F-\u007D\u00C0-\u00FF\u2013„“@€!"§$%&\(\)=\?`´\+]+) => a wide range of chars (excluding #,<,> and a few more) maybe this will change to ([^#<>]+) anytime
  //(\u003C[\S]*\u003E)?                                                                       => a string beginning with < and ending with > containing no whitespace or nothing
  //((\s*\u0023[\S]* ?)*)                                                                      => a string beginning with a whitespace, then a # and then some not whitespace chars or nothing

  if (string.indexOf('/HEADER') !== -1) {
    splitAt = '/HEADER';
  } else if (string.indexOf('/HEAD') !== -1) {
    splitAt = '/HEAD';
  }

  if (typeof splitAt === 'string') {
    string = string.split(splitAt, 2)[1].trim();
  } else {
    splitAt = string.split(/([(\d{9,})(\d+\u003A\d+\u003A\d+(\u002E\d*)?)]+\s*\S)/i, 3);
    splitAt = string.indexOf(splitAt[1]);
    string = string.slice(splitAt);
  }

  string = string.replace(/\s+/, ' ');
  osfArray = osfRegex.exec(string);
  while (osfArray !== null) {
    osfArray[3] = (' '+escapeHtml(osfArray[3])+' ').toString().replace(' "', ' &#8222;').replace('" ', '&#8220 ').trim();
    output[i] = osfArray;
    osfArray = osfRegex.exec(string);
    i += 1;
  }
  return output;
}

function osfExport(osf, modefunction) {
  "use strict";
  var i, osfline, tags, url, osfFirstTS, osfFirstHMS, osfTime, timeSec, timeHMS, iteminfo = {}, parsed = '';
  parsed += modefunction('', 'pre');
  iteminfo.afterChapter = 0;
  iteminfo.nextisChapter = false;
  for (i = 0; i < osf.length; i += 1) {
    osfline = osf[i];
    osfTime = osfline[2];
    if (/(\d{9,})/.test(osfTime) !== false) {
      osfTime = parseInt(osfTime, 10);
      if (osfFirstTS === undefined) {
        osfFirstTS = osfTime;
      }
      timeHMS = osfTimestampsToHMS(osfTime, osfFirstTS);
      timeSec = osfTime - osfFirstTS;
    } else if (/(\d+:\d+:\d+(\.\d*)?)/.test(osfTime) !== null) {
      if (osfFirstHMS === undefined) {
        osfFirstHMS = osfTime;
      }
      timeHMS = osfTime;
      timeSec = osfHMSToTimestamp(osfTime);
    }
    if (typeof osfline[4] === 'string') {
      url = osfline[4].replace(/\u003C/, '').replace(/\u003E/, '');
    } else {
      url = false;
    }
    tags = osfExtractTags(osfline[5], url);
    if (tags.indexOf('chapter') !== -1) {
      iteminfo.afterChapter = 0;
    } else {
      iteminfo.afterChapter += 1;
    }
    if (osf[i + 1] !== undefined) {
      if (osfExtractTags(osf[i + 1][5], false).indexOf('chapter') !== -1) {
        iteminfo.nextisChapter = true;
      } else {
        iteminfo.nextisChapter = false;
      }
    }
    if ((osfline !== undefined) && (modefunction !== undefined)) {
      parsed += modefunction({
        "timeSec": timeSec,
        "timeHMS": timeHMS,
        "osfline": osfline,
        "url": url,
        "tags": tags,
        "iteminfo": iteminfo
      });
    }
  }
  parsed += modefunction('', 'post');
  return parsed;
}
