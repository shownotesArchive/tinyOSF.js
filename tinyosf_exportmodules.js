/*
 * tinyosf_exportmodules.js
 *
 * Copyright 2013, Simon Waldherr - http://simon.waldherr.eu/
 * Released under the MIT Licence
 * http://opensource.org/licenses/MIT
 *
 * Github:  https://github.com/shownotes/tinyOSF.js/
 * Version: 0.1.6
 */

/*jslint browser: true, white: true, indent: 2 */
/*global osfBuildTags */

//these functions are only examples, please consider making your own

var osfExportModules = {
  html: function (osfItem, status) {
    "use strict";
    var line, parsed;
    if (status !== undefined) {
      return '';
    }
    if (typeof osfItem.timeSec === 'number') {
      if (osfItem.url !== false) {
        line = '<a data-tooltip="' + osfItem.timeSec + '" title="' + osfItem.timeHMS + ': ' + osfItem.osfline[3].trim() + ' (' + osfBuildTags(osfItem.tags, false, false) + ')" ' + osfBuildTags(osfItem.tags, true, true) + ' href="' + osfItem.url + '">' + osfItem.osfline[3].trim() + '</a>';
      } else {
        line = '<span data-tooltip="' + osfItem.timeSec + '" ' + osfBuildTags(osfItem.tags, true, true) + ' title="' + osfItem.timeHMS + ': ' + osfItem.osfline[3].trim() + ' (' + osfBuildTags(osfItem.tags, false, false) + ')">' + osfItem.osfline[3].trim() + '</span>';
      }
    } else {
      if (osfItem.url !== false) {
        line = '<a' + osfBuildTags(osfItem.tags, true, true) + ' title="' + osfItem.osfline[3].trim() + ' (' + osfBuildTags(osfItem.tags, false, false) + ')" href="' + osfItem.url + '">' + osfItem.osfline[3].trim() + '</a>';
      } else {
        line = '<span' + osfBuildTags(osfItem.tags, true, true) + ' title="' + osfItem.osfline[3].trim() + ' (' + osfBuildTags(osfItem.tags, false, false) + ')">' + osfItem.osfline[3].trim() + '</span>';
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
        line = '<a data-tooltip="' + osfItem.timeSec + '" ' + osfBuildTags(osfItem.tags, true, true) + ' href="' + osfItem.url + '">' + osfItem.osfline[3].trim() + '</a>';
      } else {
        line = '<span data-tooltip="' + osfItem.timeSec + '" ' + osfBuildTags(osfItem.tags, true, true) + '>' + osfItem.osfline[3].trim() + '</span>';
      }
    } else {
      if (osfItem.url !== false) {
        line = '<a' + osfBuildTags(osfItem.tags, true, true) + ' href="' + osfItem.url + '">' + osfItem.osfline[3].trim() + '</a>';
      } else {
        line = '<span' + osfBuildTags(osfItem.tags, true, true) + '>' + osfItem.osfline[3].trim() + '</span>';
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
    var line, parsed = '';
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
        line = '<a data-tooltip="' + osfItem.timeSec + '" ' + osfBuildTags(osfItem.tags, true, true) + ' href="' + osfItem.url + '">' + osfItem.osfline[3].trim() + '</a>';
      } else {
        line = '<span data-tooltip="' + osfItem.timeSec + '" ' + osfBuildTags(osfItem.tags, true, true) + '>' + osfItem.osfline[3].trim() + '</span>';
      }
    } else {
      if (osfItem.url !== false) {
        line = '<a' + osfBuildTags(osfItem.tags, true, true) + ' href="' + osfItem.url + '">' + osfItem.osfline[3].trim() + '</a>';
      } else {
        line = '<span' + osfBuildTags(osfItem.tags, true, true) + '>' + osfItem.osfline[3].trim() + '</span>';
      }
    }
    if (osfItem.tags.indexOf('chapter') !== -1) {
      line = '<h2><span>' + osfItem.timeHMS + '</span> ' + line + '</h2>';
      parsed = line;
    } else {
      if (osfItem.iteminfo.afterChapter === 1) {
        parsed += '<ol>';
      }
      parsed += '<li>' + line + '</li>';
      if (osfItem.iteminfo.nextisChapter === true) {
        parsed += '</ol>';
      }
    }
    return parsed;
  },
  markdown: function (osfItem, status) {
    "use strict";
    var line, parsed;
    if (status !== undefined) {
      return '';
    }
    if (osfItem.url !== false) {
      line = '[' + osfItem.osfline[3].trim() + '](' + osfItem.url + ')';
    } else {
      line = osfItem.osfline[3].trim();
    }
    if (osfItem.tags.indexOf('chapter') !== -1) {
      line = '\n#' + line + ' ^' + osfItem.timeHMS + '  \n';
      parsed = line;
    } else {
      parsed = line + '; ';
    }
    return parsed;
  },
  chapter: function (osfItem, status) {
    "use strict";
    if (status !== undefined) {
      return '';
    }
    if (osfItem.tags.indexOf('chapter') !== -1) {
      return osfItem.timeHMS + ' ' + osfItem.osfline[3].trim() + '\n';
    }
    return '';
  },
  glossary: function (osfItem, status) {
    "use strict";
    if (status !== undefined) {
      return '';
    }
    if (osfItem.tags.indexOf('glossary') !== -1) {
      return osfItem.timeHMS + ' ' + '<a' + osfBuildTags(osfItem.tags, true, true) + ' href="' + osfItem.url + '">' + osfItem.osfline[3].trim() + '</a>' + '\n';
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
    line += osfItem.osfline[3].trim();
    if (osfItem.url !== false) {
      line += ' <' + osfItem.url + '>';
    }
    if (osfItem.tags.length === 1) {
      line += ' #' + osfItem.tags;
    } else if (osfItem.tags.length > 1) {
      line += osfItem.tags.join(' #');
    }
    return line+'\n';
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
  },
  mp4chaps: function (osfItem, status) {
    "use strict";
    return osfExportModules.chapter(osfItem, status);
  }
};
