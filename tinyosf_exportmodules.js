/*
 * tinyosf_exportmodules.js
 *
 * Copyright 2013, Simon Waldherr - http://simon.waldherr.eu/
 * Released under the MIT Licence
 * http://simon.waldherr.eu/license/mit/
 *
 * Github:  https://github.com/shownotes/tinyOSF.js/
 * Version: 0.3.7
 */

/*jslint browser: true, node: true, white: true, indent: 2, plusplus: true */
/*global tinyosf */

//these functions are only examples, please consider making your own

var osfExportTemp, osfExportModules = {
  html: function (osfItem, status) {
    "use strict";
    var line, parsed;
    if (status !== undefined) {
      return '';
    }
    if (tinyosf.includetags !== undefined) {
      if (!tinyosf.containsTag(tinyosf.includetags, osfItem.tags)) {
        return '';
      }
    }
    if (typeof osfItem.timeSec === 'number') {
      if (osfItem.url !== false) {
        line = '<a data-tooltip="' + osfItem.timeSec + '" title="' + osfItem.timeHMS + ': ' + osfItem.osftext + ' (' + tinyosf.buildTags(osfItem.tags, 1, false) + ')" ' + tinyosf.buildTags(osfItem.tags, 2, true) + ' href="' + osfItem.url + '">' + osfItem.osftext + '</a>';
      } else {
        line = '<span data-tooltip="' + osfItem.timeSec + '" ' + tinyosf.buildTags(osfItem.tags, 2, true) + ' title="' + osfItem.timeHMS + ': ' + osfItem.osftext + ' (' + tinyosf.buildTags(osfItem.tags, 1, false) + ')">' + osfItem.osftext + '</span>';
      }
    } else {
      if (osfItem.url !== false) {
        line = '<a' + tinyosf.buildTags(osfItem.tags, 2, true) + ' title="' + osfItem.osftext + ' (' + tinyosf.buildTags(osfItem.tags, 1, false) + ')" href="' + osfItem.url + '">' + osfItem.osftext + '</a>';
      } else {
        line = '<span' + tinyosf.buildTags(osfItem.tags, 2, true) + ' title="' + osfItem.osftext + ' (' + tinyosf.buildTags(osfItem.tags, 1, false) + ')">' + osfItem.osftext + '</span>';
      }
    }
    if (osfItem.tags.indexOf('chapter') !== -1) {
      line = '<h2>' + line + ' <small>(' + osfItem.timeHMS.substr(0, 8) + ')</small></h2>';
      parsed = line;
    } else {
      parsed = line + '; ';
    }
    return parsed;
  },
  newhtml: function (osfItem, status) {
    "use strict";
    var line, parsed;
    if (status !== undefined) {
      return '';
    }
    if (typeof osfItem.timeSec === 'number') {
      if (osfItem.url !== false) {
        line = '<a data-tooltip="' + osfItem.timeSec + '" ' + tinyosf.buildTags(osfItem.tags, 2, true) + ' href="' + osfItem.url + '">' + osfItem.osftext + '</a>';
      } else {
        line = '<span data-tooltip="' + osfItem.timeSec + '" ' + tinyosf.buildTags(osfItem.tags, 2, true) + '>' + osfItem.osftext + '</span>';
      }
    } else {
      if (osfItem.url !== false) {
        line = '<a' + tinyosf.buildTags(osfItem.tags, 2, true) + ' href="' + osfItem.url + '">' + osfItem.osftext + '</a>';
      } else {
        line = '<span' + tinyosf.buildTags(osfItem.tags, 2, true) + '>' + osfItem.osftext + '</span>';
      }
    }
    if (osfItem.tags.indexOf('chapter') !== -1) {
      line = '<h2>' + line + ' <small>(' + osfItem.timeHMS.substr(0, 8) + ')</small></h2>';
      parsed = line;
    } else {
      parsed = line + '; ';
    }
    return parsed;
  },
  htmllist: function (osfItem, status) {
    "use strict";
    var line,
      parsed = '',
      derank,
      preline = '',
      i;

    if (status !== undefined) {
      if (status === 'post') {
        return '</ol>';
      }
      if (status === 'pre') {
        return '';
      }
      return '';
    }
    if (tinyosf.includetags !== undefined) {
      if (!tinyosf.containsTag(tinyosf.includetags, osfItem.tags)) {
        return '';
      }
    }
    if (typeof osfItem.timeSec === 'number') {
      if (osfItem.url !== false) {
        line = '<a data-tooltip="' + osfItem.timeSec + '" title="' + osfItem.timeHMS + ': ' + osfItem.osftext + ' (' + tinyosf.buildTags(osfItem.tags, 1, false) + ')" ' + tinyosf.buildTags(osfItem.tags, 2, true) + ' href="' + osfItem.url + '">' + osfItem.osftext + '</a>';
      } else {
        line = '<span data-tooltip="' + osfItem.timeSec + '" ' + tinyosf.buildTags(osfItem.tags, 2, true) + ' title="' + osfItem.timeHMS + ': ' + osfItem.osftext + ' (' + tinyosf.buildTags(osfItem.tags, 1, false) + ')">' + osfItem.osftext + '</span>';
      }
    } else {
      if (osfItem.url !== false) {
        line = '<a' + tinyosf.buildTags(osfItem.tags, 2, true) + ' title="' + osfItem.osftext + ' (' + tinyosf.buildTags(osfItem.tags, 1, false) + ')" href="' + osfItem.url + '">' + osfItem.osftext + '</a>';
      } else {
        line = '<span' + tinyosf.buildTags(osfItem.tags, 2, true) + ' title="' + osfItem.osftext + ' (' + tinyosf.buildTags(osfItem.tags, 1, false) + ')">' + osfItem.osftext + '</span>';
      }
    }

    if (osfItem.tags.indexOf('chapter') !== -1) {
      derank = '';
      for (i = 0; i < osfItem.rank.prev; i += 1) {
        derank += '</ol>';
      }
      line = derank + '<h' + (osfItem.rank.curr + 2) + '><span>' + osfItem.timeHMS.substr(0, 8) + '</span> ' + line + '</h' + (osfItem.rank.curr + 2) + '>';
      parsed = line;
    } else {
      if (osfItem.iteminfo.afterChapter === 1) {
        preline += '<ol>';
      } else {
        if (osfItem.rank.prev > osfItem.rank.curr) {
          for (i = 0; i < (osfItem.rank.prev - osfItem.rank.curr); i += 1) {
            preline += '</ol>';
          }
        }
      }
      if (osfItem.rank.prev < osfItem.rank.curr) {
        for (i = 0; i < (osfItem.rank.curr - osfItem.rank.prev); i += 1) {
          preline += '<ol>';
        }
      }
      parsed = preline + '<li>' + line + '</li>';
      if (osfItem.iteminfo.nextisChapter === true) {
        parsed += '</ol>';
      }
    }
    return parsed;
  },
  markdown: function (osfItem, status) {
    "use strict";
    var line, parsed, rank, i;
    if (status !== undefined) {
      return '';
    }
    if (tinyosf.includetags !== undefined) {
      if (tinyosf.includetags.length > 0) {
        if (!tinyosf.containsTag(tinyosf.includetags, osfItem.tags)) {
          return '';
        }
      }
    }
    if (osfItem.url !== false) {
      osfItem.url = osfItem.url.replace(/[\(\)]/gmi, function (match) {
        return window.escape(match);
      });
      line = '[' + osfItem.osftext + '](' + osfItem.url + ')';
    } else {
      line = osfItem.osftext;
    }
    if (osfItem.tags.indexOf('chapter') !== -1) {
      //item is a chapter
      rank = '#';
      for (i = 0; i < osfItem.rank.curr; i += 1) {
        rank += '#';
      }
      line = '\n#' + rank + line + ' ```' + osfItem.timeHMS.substr(0, 8) + '```  ';
      parsed = line;
    } else {
      //item is no chapter
      rank = '';
      if ((osfItem.rank.curr !== 0) && (osfItem.iteminfo.afterChapter !== 1)) {
        //hierarchy is set
        for (i = 0; i < osfItem.rank.curr; i += 1) {
          rank += '    ';
        }
        parsed = rank + '*' + ' ' + line;
      } else {
        //no hierarchy
        parsed = '* ' + line + '  ';
      }
    }
    return '\n' + parsed;
  },
  audacity: function (osfItem, status) {
    "use strict";
    var line, parsed, rank, i, itemTime;
    if (status !== undefined) {
      return '';
    }
    if (osfItem.url !== false) {
      line = osfItem.osftext + ' &lt;' + osfItem.url + '&gt;';
    } else {
      line = osfItem.osftext;
    }
    rank = '';
    if (osfItem.rank.curr !== 0) {
      for (i = 1; i < osfItem.rank.curr; i += 1) {
        rank += '-';
      }
    }
    itemTime = osfItem.timeSec !== false ? osfItem.timeSec : osfItem.timeSecLast;
    parsed = itemTime + '.000000' + "\t" + osfItem.timeSecNext + '.000000' + "\t" + rank + ' ' + line;
    parsed += ' ' + tinyosf.buildTags(osfItem.tags, 0, false);
    return '\n' + parsed;
  },
  audacitychapter: function (osfItem, status) {
    "use strict";
    var line, parsed, rank, i, itemTime;
    if (status !== undefined) {
      return '';
    }
    if (osfItem.tags.indexOf('chapter') !== -1) {
      if (osfItem.url !== false) {
        line = osfItem.osftext + ' &lt;' + osfItem.url + '&gt;';
      } else {
        line = osfItem.osftext;
      }
      rank = '';
      if (osfItem.rank.curr !== 0) {
        for (i = 1; i < osfItem.rank.curr; i += 1) {
          rank += '-';
        }
      }
      itemTime = osfItem.timeSec !== false ? osfItem.timeSec : osfItem.timeSecLast;
      parsed = itemTime + '.000000' + "\t" + osfItem.timeSecNext + '.000000' + "\t" + rank + ' ' + line;
      parsed += ' ' + tinyosf.buildTags(osfItem.tags, 0, false);
      return '\n' + parsed;
    }
    return '';
  },
  reaper: function (osfItem, status) {
    "use strict";
    var line, parsed, rank, i, itemTime, timeOffset = 0;
    if (status === 'pre') {
      osfExportTemp = 0;
      return '#,Name,Start,End,Length,Color';
    }
    osfExportTemp += 1;
    if (status !== undefined) {
      return '';
    }
    if (osfItem.url !== false) {
      line = osfItem.osftext + ' &lt;' + osfItem.url + '&gt;';
    } else {
      line = osfItem.osftext;
    }
    rank = '';
    if (osfItem.rank.curr !== 0) {
      for (i = 1; i < osfItem.rank.curr; i += 1) {
        rank += '-';
      }
      line += rank + ' ';
    }
    if (osfItem.timeSec !== false) {
      itemTime = osfItem.timeSec;
      timeOffset = 0;
    } else {
      // Reaper hides markers with the same timestamp -> add a second for lines without a time
      // thanks to Andreas Hubel (https://github.com/saerdnaer/tinyOSF.js/commit/43e84dcbb5b54851c89547229d1df202a1eecaf6)
      timeOffset++;
      itemTime = osfItem.timeSecLast + timeOffset;
    }
    parsed = 'M' + osfExportTemp + ',' + line + ' ' + tinyosf.buildTags(osfItem.tags, 0, false) + ',' + tinyosf.TimeIntToHMS(itemTime) + ":0," + ",";
    if (osfItem.tags.indexOf('chapter') !== -1) {
      parsed += ',DD0F22';
    } else {
      parsed += ',';
    }
    return '\n' + parsed;
  },
  chapter: function (osfItem, status) {
    "use strict";
    if (status !== undefined) {
      return '';
    }
    if (osfItem.tags.indexOf('chapter') !== -1) {
      return osfItem.timeHMS + ' ' + osfItem.osftext + '\n';
    }
    return '';
  },
  mp4chaps: function (osfItem, status) {
    "use strict";
    if (status !== undefined) {
      return '';
    }
    if (osfItem.tags.indexOf('chapter') !== -1) {
      if (osfItem.url !== false) {
        return osfItem.timeHMS + ' ' + osfItem.osftext + ' &lt;' + osfItem.url + '&gt;' + '\n';
      }
      return osfItem.timeHMS + ' ' + osfItem.osftext + '\n';
    }
    return '';
  },
  glossary: function (osfItem, status) {
    "use strict";
    if (status !== undefined) {
      return '';
    }
    if (osfItem.tags.indexOf('glossary') !== -1) {
      return osfItem.timeHMS + ' ' + '<a href="' + osfItem.url + '">' + osfItem.osftext + '</a>' + '\n';
    }
    return '';
  },
  osf: function (osfItem, status) {
    "use strict";
    var line = '', rank = 0;
    if (status !== undefined) {
      return '';
    }
    if (typeof osfItem.timeSec === 'number') {
      line += osfItem.timeHMS + ' ';
    }
    for (rank = 0; rank < osfItem.osfline[6]; rank += 1) {
      line += '-';
    }
    if (rank !== 0) {
      line += ' ';
    }
    line += osfItem.osftext;
    if (osfItem.url !== false) {
      line += ' <' + osfItem.url + '>';
    }
    if (osfItem.tags.length === 1) {
      line += ' #' + osfItem.tags[0];
    } else if (osfItem.tags.length > 1) {
      line += ' #'+osfItem.tags.join(' #');
    }
    return line + '\n';
  },
  anycast: function (osfItem, status) {
    "use strict";
    return osfExportModules.html(osfItem, status);
  },
  source: function (osfItem, status) {
    "use strict";
    return osfExportModules.html(osfItem, status);
  },
  wikigeeks: function (osfItem, status) {
    "use strict";
    return osfExportModules.htmllist(osfItem, status);
  },
  md: function (osfItem, status) {
    "use strict";
    return osfExportModules.markdown(osfItem, status);
  }
};

if (typeof module !== "undefined" && module.exports !== undefined) {
  module.exports.osfExportModules = osfExportModules;
}