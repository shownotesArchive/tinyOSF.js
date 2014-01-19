/*
 * tinyosf.js
 *
 * Copyright 2013, Simon Waldherr - http://simon.waldherr.eu/
 * Released under the MIT Licence
 * http://simon.waldherr.eu/license/mit/
 *
 * Github:  https://github.com/shownotes/tinyOSF.js/
 * Version: 0.3.8
 */

/*jslint browser: true, node: true, regexp: true, indent: 2 */

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    "use strict";
    return this.replace(/^\s+|\s+$/g, '');
  };
}

if (!String.prototype.trimSC) {
  String.prototype.trimSC = function () {
    "use strict";
    return this.replace(/^[\s\.;:,_]+|[\s\.\-;:,_]+$/g, '');
  };
}

var tinyosf = {
  containsTag: function (includeTags, itemTags) {
    "use strict";
    var i;
    if ((includeTags !== undefined) && (itemTags !== undefined)) {
      for (i = 0; i < includeTags.length; i += 1) {
        if (itemTags.indexOf(includeTags[i]) !== -1) {
          return true;
        }
      }
    }
    return false;
  },
  extractTags: function (tagString, urlString) {
    "use strict";
    var tagArray = [],
      tagTempArray = [],
      i,
      urlTemp,
      tagTemp;

    tagTempArray = tagString.split(' ');
    for (i = 0; i < tagTempArray.length; i += 1) {
      tagTemp = tagTempArray[i].replace('#', '').trim();
      if (tagTemp.length === 1) {
        if (tagTemp === 'c') {
          tagArray.push('chapter');
        } else if (tagTemp === 't') {
          tagArray.push('topic');
        } else if (tagTemp === 'g') {
          tagArray.push('glossary');
        } else if (tagTemp === 'l') {
          tagArray.push('link');
        } else if (tagTemp === 'p') {
          tagArray.push('prediction');
        } else if (tagTemp === 's') {
          tagArray.push('section');
        } else if (tagTemp === 'v') {
          tagArray.push('video');
        } else if (tagTemp === 'a') {
          tagArray.push('audio');
        } else if (tagTemp === 'i') {
          tagArray.push('image');
        } else if (tagTemp === 'q') {
          tagArray.push('quote');
        } else if (tagTemp === 'r') {
          tagArray.push('revision');
        }
      } else if (tagTemp.length > 2) {
        tagArray.push(tagTemp);
      }
    }

    if (urlString !== false) {
      if (urlString.indexOf('/') !== -1) {
        urlTemp = urlString.split('/');
        if (urlTemp[1].length === 0) {
          urlTemp = urlTemp[2].split('.');
        } else {
          urlTemp = urlTemp[0].split('.');
        }
        if (Array.isArray(urlTemp)) {
          tagArray.push(urlTemp[urlTemp.length - 2].replace(/[^\w\d]/g, '') + urlTemp[urlTemp.length - 1]);
        }
      }
    }
    return tagArray;
  },
  buildTags: function (tagArray, withOSF, withClass) {
    "use strict";
    var i, output = '';
    for (i = 0; i < tagArray.length; i += 1) {
      if (typeof tagArray[i] === 'string') {
        if (tagArray[i].trim().length > 3) {
          if (withOSF === 2) {
            output += ' osf_' + tagArray[i];
          } else if (withOSF === 1) {
            if (output !== '') {
              output += ', ';
            }
            output += tagArray[i];
          } else {
            if (output !== '') {
              output += ' ';
            }
            output += '#' + tagArray[i];
          }
        }
      }
    }
    if (withClass === true) {
      return ' class="' + output + '"';
    }
    return output;
  },
  timestampsToHMS: function (now, starttimestamp) {
    "use strict";
    var time = parseFloat(now) - parseFloat(starttimestamp),
      hours,
      minutes,
      seconds,
      returntime = '';

    hours = Math.floor(time / 3600);
    minutes = Math.floor((time - (hours * 3600)) / 60);
    seconds = time - (hours * 3600) - (minutes * 60);
    returntime += (hours < 10) ? '0' + hours + ':' : hours + ':';
    returntime += (minutes < 10) ? '0' + minutes + ':' : minutes + ':';
    returntime += (seconds < 10) ? '0' + seconds.toFixed(3) : seconds.toFixed(3);
    return returntime;
  },
  HMSToTimeFloat: function (hms) {
    "use strict";
    var time = 0,
      timeArray,
      regex = /((\d+\u003A)?(\d+\u003A)?(\d+)(\u002E\d+)?)/;

    if (hms === undefined) {
      return;
    }
    timeArray = regex.exec(hms.trim());
    if (timeArray !== null) {
      if (timeArray[5] === undefined) {
        timeArray[5] = '000';
      } else {
        timeArray[5] = timeArray[5] + '000';
        timeArray[5] = timeArray[5].substr(1, 3);
      }
      time += parseInt(timeArray[2], 10) * 3600;
      time += parseInt(timeArray[3], 10) * 60;
      time += parseInt(timeArray[4], 10);
      time += parseFloat('0.' + timeArray[5]);
    } else {
      return undefined;
    }
    return time;
  },
  TimeIntToHMS: function (now) {
    "use strict";
    return tinyosf.timestampsToHMS(now, 0);
  },
  htmldecode: function (string) {
    "use strict";
    var div = document.createElement('div');
    div.innerHTML = string;
    string = div.innerText || div.textContent;
    div = undefined;
    return string;
  },
  htmlencode: function (string) {
    "use strict";
    if (document === undefined) {
      // we're in node
      return require('htmlencode').htmlEncode(string);
    }
    // we're in the browser
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(string));
    string = div.innerHTML;
    div = undefined;
    return string;
  },
  Parser: function (string) {
    "use strict";
    var osfArray, i = 0,
      splitAt = false,
      output = {},
      rank,
      osfTime,
      timeHMS,
      timeSec,
      osfFirstTS,
      osfFirstHMS,
      header,
      osfRegex = /(^([(\d{8,})((\d+\u003A)?\d+\u003A\d+(\u002E\d+)?)]*)?\h*([^#<>\n\v]+) *(\u003C[\S]*\u003E)?((\s*\u0023[\S]* ?)*)\n*)/gmi;
    //about this Regex:
    //^([(\d{8,})(\u002D+)(\d+\u003A\d+\u003A\d+(\u002E\d*)?)]*)?   => 1234567890 or - or 00:01:02[.000] or nothing at the beginning of the line
    //([^#<>\n\v]+)                                                 => a wide range of chars (excluding #,<,> and new lines (vertical whitespace))
    //(\u003C[\S]*\u003E)?                                          => a string beginning with < and ending with > containing no whitespace or nothing
    //((\s*\u0023[\S]* ?)*)                                         => a string beginning with a whitespace, then a # and then some not whitespace chars or nothing

    output.items = [];
    output.info = {};

    if (string.indexOf('/HEADER') !== -1) {
      splitAt = '/HEADER';
    } else if (string.indexOf('/HEAD') !== -1) {
      splitAt = '/HEAD';
    }

    if (typeof splitAt === 'string') {
      header = string.split(splitAt, 2)[0].trim();
      string = string.split(splitAt, 2)[1].trim();
    } else {
      splitAt = string.split(/([(\d{8,})((\d+\u003A)?\d+\u003A\d+(\u002E\d+)?)]+\s*\S{5,})/i, 2);
      splitAt = string.indexOf(splitAt[1]);
      header = string.slice(0, splitAt);
      string = string.slice(splitAt);
    }

    output.info.ready = false;
    output.info.header = false;
    output.info.compatible = false;
    output.info.podcast = false;
    output.info.episode = false;
    output.info.title = false;
    output.info.chapters = 0;
    output.info.revision = 0;
    output.info.revision = string.match(/( \#r | \#revision | \#r\n| \#revision\n)/gmi);
    output.info.revision = (output.info.revision === null) ? 0 : output.info.revision.length;
    output.info.ready = /^ *ready: ?(false|no|not|nicht)/gmi.test(header) ? false : (output.info.revision > 0) ? false : true;
    output.info.podcast = /^ *podcast: ?\w{3,}/gmi.test(header);
    output.info.episode = /^ *episode: ?0*\d+/gmi.test(header);
    output.info.title = /^ *(episode)?tit(le|el): *[\w\d\-öäüß ]{5,}/gmi.test(header);
    output.info.header = (header.length > 23) ? output.info.podcast ? output.info.episode ? output.info.title ? header.length : false : false : false : false;

    string = '\n' + string.replace(/\s+/, ' ') + '\n';
    osfArray = osfRegex.exec(string);
    while (osfArray !== null) {
      osfArray[3] = osfArray[3].trimSC();
      if (osfArray[3].replace(/[\s\d\.:\-]+/gmi, '').length > 2) {
        osfArray[0] = osfArray[0].trim();

        osfTime = osfArray[2];
        if (/(\d{8,})/.test(osfTime)) {
          osfTime = parseInt(osfTime, 10);
          if (osfFirstTS === undefined) {
            osfFirstTS = osfTime;
          }
          timeHMS = tinyosf.timestampsToHMS(osfTime, osfFirstTS);
          timeSec = osfTime - osfFirstTS;
        } else if (/((\d+\u003A)?\d+\u003A\d+(\u002E\d+)?)/.test(osfTime)) {
          timeSec = tinyosf.HMSToTimeFloat(osfTime);
          timeHMS = tinyosf.TimeIntToHMS(timeSec);
          if (osfFirstHMS === undefined) {
            osfFirstHMS = osfTime;
          }
        } else {
          timeHMS = false;
          timeSec = false;
        }
        if (osfArray[5].indexOf('#c') !== -1) {
          output.info.chapters += 1;
        }

        osfArray[1] = timeHMS; //HH:MM:SS
        osfArray[2] = timeSec; //Seconds

        osfArray[6] = 0;
        if (/^[\-\–\—]+/.test(osfArray[3])) {
          rank = /^[\-\–\—]+/.exec(osfArray[3]);
          if (rank !== undefined) {
            if (rank[0] !== undefined) {
              osfArray[6] = rank[0].length;
              osfArray[3] = osfArray[3].substr(osfArray[6]).trim();
            }
          }
        }
        osfArray[3] = (' ' + tinyosf.htmlencode(osfArray[3]) + ' ').toString().replace(' "', ' &#8222;').replace('" ', '&#8220; ').trim();
        output.items[i] = osfArray;
        i += 1;
      }
      osfArray = osfRegex.exec(string);
    }
    /*
    [i][0] = original item line
    [i][1] = time in HH:MM:SS
    [i][2] = time in sec
    [i][3] = clean text
    [i][4] = URL
    [i][5] = Tags
    [i][6] = Rank
    */

    output.info.compatible = (output.info.chapters > 3) ? true : (output.items.length > 23) ? true : false;

    return output;
  },
  Export: function (osf, modefunction) {
    "use strict";
    var i,
      osfline,
      osftext,
      tags,
      url,
      nextTime,
      lastTime,
      timeSec,
      timeHMS,
      iteminfo = {},
      parsed = '',
      ranks = {};

    parsed += modefunction('', 'pre');
    iteminfo.afterChapter = 0;
    iteminfo.nextisChapter = false;
    for (i = 0; i < osf.items.length; i += 1) {
      osfline = osf.items[i];
      timeHMS = osfline[1];
      timeSec = osfline[2];
      osftext = osfline[3];

      if (typeof osfline[4] === 'string') {
        url = osfline[4].replace(/\u003C/, '').replace(/\u003E/, '');
      } else {
        url = false;
      }
      tags = tinyosf.extractTags(osfline[5], url);
      if (tags.indexOf('chapter') !== -1) {
        iteminfo.afterChapter = 0;
      } else {
        iteminfo.afterChapter += 1;
      }
      if (osf.items[i + 1] !== undefined) {
        if (tinyosf.extractTags(osf.items[i + 1][5], false).indexOf('chapter') !== -1) {
          iteminfo.nextisChapter = true;
        } else {
          iteminfo.nextisChapter = false;
        }
      }

      ranks.prev = osf.items[i - 1] !== undefined ? osf.items[i - 1][6] : 0;
      ranks.curr = osf.items[i][6];
      ranks.next = osf.items[i + 1] !== undefined ? osf.items[i + 1][6] : 0;

      if ((osf.items[i][2] !== undefined) && (osf.items[i][2] !== false)) {
        lastTime = osf.items[i][2];
      }

      if (osf.items[i + 1] !== undefined) {
        if ((osf.items[i + 1][2] !== undefined) && (osf.items[i + 1][2] !== false)) {
          nextTime = osf.items[i + 1][2];
        } else {
          nextTime = lastTime;
        }
        //nextTime = osf.items[i+1] !== undefined ? osf.items[i+1][2] : undefined;
      }
      if ((osfline !== undefined) && (modefunction !== undefined)) {
        parsed += modefunction({
          "timeSec": timeSec,
          "timeSecLast": lastTime,
          "timeSecNext": nextTime,
          "timeHMS": timeHMS,
          "osftext": osftext,
          "osfline": osfline,
          "url": url,
          "tags": tags,
          "iteminfo": iteminfo,
          "rank": ranks
        });
      }
    }
    parsed += modefunction('', 'post');
    return parsed;
  }
};

if (typeof module !== "undefined" && module.exports !== undefined) {
  module.exports.tinyosf = tinyosf;
}
