#
# * tinyosf_exportmodules.js
# *
# * Copyright 2013, Simon Waldherr - http://simon.waldherr.eu/
# * Released under the MIT Licence
# * http://opensource.org/licenses/MIT
# *
# * Github:  https://github.com/shownotes/tinyOSF.js/
# * Version: 0.1.6
#

#these functions are only examples, please consider making your own
osfExportModules =
  html: (osfItem, status) ->
    "use strict"
    line = undefined
    parsed = undefined
    return ""  if status isnt `undefined`
    if typeof osfItem.timeSec is "number"
      if osfItem.url isnt false
        line = "<a data-tooltip=\"" + osfItem.timeSec + "\" title=\"" + osfItem.timeHMS + ": " + osfItem.osfline[3].trim() + " (" + osfBuildTags(osfItem.tags, false, false) + ")\" " + osfBuildTags(osfItem.tags, true, true) + " href=\"" + osfItem.url + "\">" + osfItem.osfline[3].trim() + "</a>"
      else
        line = "<span data-tooltip=\"" + osfItem.timeSec + "\" " + osfBuildTags(osfItem.tags, true, true) + " title=\"" + osfItem.timeHMS + ": " + osfItem.osfline[3].trim() + " (" + osfBuildTags(osfItem.tags, false, false) + ")\">" + osfItem.osfline[3].trim() + "</span>"
    else
      if osfItem.url isnt false
        line = "<a" + osfBuildTags(osfItem.tags, true, true) + " title=\"" + osfItem.osfline[3].trim() + " (" + osfBuildTags(osfItem.tags, false, false) + ")\" href=\"" + osfItem.url + "\">" + osfItem.osfline[3].trim() + "</a>"
      else
        line = "<span" + osfBuildTags(osfItem.tags, true, true) + " title=\"" + osfItem.osfline[3].trim() + " (" + osfBuildTags(osfItem.tags, false, false) + ")\">" + osfItem.osfline[3].trim() + "</span>"
    if osfItem.tags.indexOf("chapter") isnt -1
      line = "<h2>" + line + " <small>(" + osfItem.timeHMS + ")</small></h2>"
      parsed = line
    else
      parsed = line + "; "
    parsed

  newhtml: (osfItem, status) ->
    "use strict"
    line = undefined
    parsed = undefined
    return ""  if status isnt `undefined`
    if typeof osfItem.timeSec is "number"
      if osfItem.url isnt false
        line = "<a data-tooltip=\"" + osfItem.timeSec + "\" " + osfBuildTags(osfItem.tags, true, true) + " href=\"" + osfItem.url + "\">" + osfItem.osfline[3].trim() + "</a>"
      else
        line = "<span data-tooltip=\"" + osfItem.timeSec + "\" " + osfBuildTags(osfItem.tags, true, true) + ">" + osfItem.osfline[3].trim() + "</span>"
    else
      if osfItem.url isnt false
        line = "<a" + osfBuildTags(osfItem.tags, true, true) + " href=\"" + osfItem.url + "\">" + osfItem.osfline[3].trim() + "</a>"
      else
        line = "<span" + osfBuildTags(osfItem.tags, true, true) + ">" + osfItem.osfline[3].trim() + "</span>"
    if osfItem.tags.indexOf("chapter") isnt -1
      line = "<h2>" + line + " <small>(" + osfItem.timeHMS + ")</small></h2>"
      parsed = line
    else
      parsed = line + "; "
    parsed

  htmllist: (osfItem, status) ->
    "use strict"
    line = undefined
    parsed = ""
    if status isnt `undefined`
      return "</ol>"  if status is "post"
      return ""  if status is "pre"
      return ""
    if typeof osfItem.timeSec is "number"
      if osfItem.url isnt false
        line = "<a data-tooltip=\"" + osfItem.timeSec + "\" " + osfBuildTags(osfItem.tags, true, true) + " href=\"" + osfItem.url + "\">" + osfItem.osfline[3].trim() + "</a>"
      else
        line = "<span data-tooltip=\"" + osfItem.timeSec + "\" " + osfBuildTags(osfItem.tags, true, true) + ">" + osfItem.osfline[3].trim() + "</span>"
    else
      if osfItem.url isnt false
        line = "<a" + osfBuildTags(osfItem.tags, true, true) + " href=\"" + osfItem.url + "\">" + osfItem.osfline[3].trim() + "</a>"
      else
        line = "<span" + osfBuildTags(osfItem.tags, true, true) + ">" + osfItem.osfline[3].trim() + "</span>"
    if osfItem.tags.indexOf("chapter") isnt -1
      line = "<h2><span>" + osfItem.timeHMS + "</span> " + line + "</h2>"
      parsed = line
    else
      parsed += "<ol>"  if osfItem.iteminfo.afterChapter is 1
      parsed += "<li>" + line + "</li>"
      parsed += "</ol>"  if osfItem.iteminfo.nextisChapter is true
    parsed

  markdown: (osfItem, status) ->
    "use strict"
    line = undefined
    parsed = undefined
    return ""  if status isnt `undefined`
    if osfItem.url isnt false
      line = "[" + osfItem.osfline[3].trim() + "](" + osfItem.url + ")"
    else
      line = osfItem.osfline[3].trim()
    if osfItem.tags.indexOf("chapter") isnt -1
      line = "\n#" + line + " ^" + osfItem.timeHMS + "  \n"
      parsed = line
    else
      parsed = line + "; "
    parsed

  chapter: (osfItem, status) ->
    "use strict"
    return ""  if status isnt `undefined`
    return osfItem.timeHMS + " " + osfItem.osfline[3].trim() + "\n"  if osfItem.tags.indexOf("chapter") isnt -1
    ""

  glossary: (osfItem, status) ->
    "use strict"
    return ""  if status isnt `undefined`
    return osfItem.timeHMS + " " + "<a" + osfBuildTags(osfItem.tags, true, true) + " href=\"" + osfItem.url + "\">" + osfItem.osfline[3].trim() + "</a>" + "\n"  if osfItem.tags.indexOf("glossary") isnt -1
    ""

  osf: (osfItem, status) ->
    "use strict"
    line = ""
    return ""  if status isnt `undefined`
    line += osfItem.timeHMS + " "  if typeof osfItem.timeSec is "number"
    line += osfItem.osfline[3].trim()
    line += " <" + osfItem.url + ">"  if osfItem.url isnt false
    if osfItem.tags.length is 1
      line += " #" + osfItem.tags
    else line += osfItem.tags.join(" #")  if osfItem.tags.length > 1
    line + "\n"

  anycast: (osfItem, status) ->
    "use strict"
    osfExportModules.html osfItem, status

  source: (osfItem, status) ->
    "use strict"
    osfExportModules.html osfItem, status

  wikigeeks: (osfItem, status) ->
    "use strict"
    osfExportModules.htmllist osfItem, status

  md: (osfItem, status) ->
    "use strict"
    osfExportModules.markdown osfItem, status

  mp4chaps: (osfItem, status) ->
    "use strict"
    osfExportModules.chapter osfItem, status
