/*
 * tinyosf_exportmodules.js
 *
 * Copyright 2013, Simon Waldherr - http://simon.waldherr.eu/
 * Released under the MIT Licence
 * http://opensource.org/licenses/MIT
 *
 * Github:  https://github.com/shownotes/tinyOSF.js/
 * Version: 0.3.3
 */

/*jslint browser: true, white: true, indent: 2 */
/*global tinyosf */

//these functions are only examples, please consider making your own

var osfExportTemp, osfExportModules = {
  html: function (osfItem, status) {
    "use strict";
    var line, parsed;
    if (status !== undefined) {
      return '';
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
      line = '<h2>' + line + ' <small>(' + osfItem.timeHMS + ')</small></h2>';
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
      line = '<h2>' + line + ' <small>(' + osfItem.timeHMS + ')</small></h2>';
      parsed = line;
    } else {
      parsed = line + '; ';
    }
    return parsed;
  },
  htmllist: function (osfItem, status) {
    "use strict";
    var line, parsed = '', derank, i;
    if (status !== undefined) {
      if (status === 'post') {
        return '</ol>';
      }
      if (status === 'pre') {
        return '';
      }
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
      derank = '';
      for (i = 0; i < osfItem.rank.prev; i += 1) {
        derank += '</ol>';
      }
      line = derank + '<h' + (osfItem.rank.curr + 2) + '><span>' + osfItem.timeHMS + '</span> ' + line + '</h' + (osfItem.rank.curr + 2) + '>';
      parsed = line;
    } else {
      if (osfItem.iteminfo.afterChapter === 1) {
        line += '<ol>';
      } else {
        if (osfItem.rank.prev > osfItem.rank.curr) {
          for (i = 0; i < (osfItem.rank.prev - osfItem.rank.curr); i += 1) {
            line = '</ol>' + line;
          }
        }
      }
      if (osfItem.rank.prev < osfItem.rank.curr) {
        for (i = 0; i < (osfItem.rank.curr - osfItem.rank.prev); i += 1) {
          line = '<ol>' + line;
        }
      }
      parsed = '<li>' + line + '</li>';
      if (osfItem.iteminfo.nextisChapter === true) {
        parsed += '</ol>';
      }
    }
    return parsed;
  },
  oldmarkdown: function (osfItem, status) {
    "use strict";
    var line, parsed, rank, i;
    if (status !== undefined) {
      return '';
    }
    if (osfItem.url !== false) {
      line = '[' + osfItem.osftext + '](' + osfItem.url + ')';
    } else {
      line = osfItem.osftext;
    }
    if (osfItem.tags.indexOf('chapter') !== -1) {
      line = '\n#' + line + ' ^' + osfItem.timeHMS + '  \n';
      parsed = line;
    } else {
      rank = '';
      if (osfItem.rank.curr !== 0) {
        for (i = 1; i < osfItem.rank.curr; i += 1) {
          rank += '    ';
        }
        parsed = rank + '*' + ' ' + line;
      } else {
        if (osfItem.rank.prev !== 0) {
          line = '\n' + line;
        }
        parsed = line + '  ';
      }
    }
    return '\n' + parsed;
  },
  markdown: function (osfItem, status) {
    "use strict";
    var line, parsed, rank, i;
    if (status !== undefined) {
      return '';
    }
    if (osfItem.url !== false) {
      osfItem.url = osfItem.url.replace(/[\(\)]/gmi, function (match, capture) {
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
      line = '\n#' + rank + line + ' ```' + osfItem.timeHMS + '```  \n';
      parsed = line;
    } else {
      //item is no chapter
      rank = '';
      if ((osfItem.rank.curr !== 0) && (osfItem.iteminfo.afterChapter !== 1)) {
        for (i = 0; i < osfItem.rank.curr; i += 1) {
          rank += '    ';
        }
        parsed = rank + '*' + ' ' + line;
      } else {
        if (osfItem.rank.prev !== 0) {
          line = '\n' + line;
        }
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
    var line, parsed, rank, i, itemTime;
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
    itemTime = osfItem.timeSec !== false ? osfItem.timeSec : osfItem.timeSecLast;
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
    var line = '';
    if (status !== undefined) {
      return '';
    }
    if (typeof osfItem.timeSec === 'number') {
      line += osfItem.timeHMS + ' ';
    }
    line += osfItem.osftext;
    if (osfItem.url !== false) {
      line += ' <' + osfItem.url + '>';
    }
    if (osfItem.tags.length === 1) {
      line += ' #' + osfItem.tags;
    } else if (osfItem.tags.length > 1) {
      line += osfItem.tags.join(' #');
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
