#
# * tinyosf_exportmodules.js
# *
# * Copyright 2013, Simon Waldherr - http://simon.waldherr.eu/
# * Released under the MIT Licence
# * http://opensource.org/licenses/MIT
# *
# * Github:  https://github.com/shownotes/tinyOSF.js/
# * Version: 0.2.0
#

osfExportModules =
  html: (osfItem, status) ->
    "use strict"
    line = undefined
    parsed = undefined
    return ""  if status isnt `undefined`
    if typeof osfItem.timeSec is "number"
      if osfItem.url isnt false
        line = "<a data-tooltip=\"" + osfItem.timeSec + "\" title=\"" + osfItem.timeHMS + ": " + osfItem.osftext + " (" + osfBuildTags(osfItem.tags, false, false) + ")\" " + osfBuildTags(osfItem.tags, true, true) + " href=\"" + osfItem.url + "\">" + osfItem.osftext + "</a>"
      else
        line = "<span data-tooltip=\"" + osfItem.timeSec + "\" " + osfBuildTags(osfItem.tags, true, true) + " title=\"" + osfItem.timeHMS + ": " + osfItem.osftext + " (" + osfBuildTags(osfItem.tags, false, false) + ")\">" + osfItem.osftext + "</span>"
    else
      if osfItem.url isnt false
        line = "<a" + osfBuildTags(osfItem.tags, true, true) + " title=\"" + osfItem.osftext + " (" + osfBuildTags(osfItem.tags, false, false) + ")\" href=\"" + osfItem.url + "\">" + osfItem.osftext + "</a>"
      else
        line = "<span" + osfBuildTags(osfItem.tags, true, true) + " title=\"" + osfItem.osftext + " (" + osfBuildTags(osfItem.tags, false, false) + ")\">" + osfItem.osftext + "</span>"
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
        line = "<a data-tooltip=\"" + osfItem.timeSec + "\" " + osfBuildTags(osfItem.tags, true, true) + " href=\"" + osfItem.url + "\">" + osfItem.osftext + "</a>"
      else
        line = "<span data-tooltip=\"" + osfItem.timeSec + "\" " + osfBuildTags(osfItem.tags, true, true) + ">" + osfItem.osftext + "</span>"
    else
      if osfItem.url isnt false
        line = "<a" + osfBuildTags(osfItem.tags, true, true) + " href=\"" + osfItem.url + "\">" + osfItem.osftext + "</a>"
      else
        line = "<span" + osfBuildTags(osfItem.tags, true, true) + ">" + osfItem.osftext + "</span>"
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
    i = undefined
    if status isnt `undefined`
      return "</ol>"  if status is "post"
      return ""  if status is "pre"
      return ""
    if typeof osfItem.timeSec is "number"
      if osfItem.url isnt false
        line = "<a data-tooltip=\"" + osfItem.timeSec + "\" " + osfBuildTags(osfItem.tags, true, true) + " href=\"" + osfItem.url + "\">" + osfItem.osftext + "</a>"
      else
        line = "<span data-tooltip=\"" + osfItem.timeSec + "\" " + osfBuildTags(osfItem.tags, true, true) + ">" + osfItem.osftext + "</span>"
    else
      if osfItem.url isnt false
        line = "<a" + osfBuildTags(osfItem.tags, true, true) + " href=\"" + osfItem.url + "\">" + osfItem.osftext + "</a>"
      else
        line = "<span" + osfBuildTags(osfItem.tags, true, true) + ">" + osfItem.osftext + "</span>"
    if osfItem.tags.indexOf("chapter") isnt -1
      line = "<h2><span>" + osfItem.timeHMS + "</span> " + line + "</h2>"
      parsed = line
    else
      parsed += "<ol>"  if osfItem.iteminfo.afterChapter is 1
      if osfItem.rank.prev < osfItem.rank.curr
        i = 0
        while i < (osfItem.rank.curr - osfItem.rank.prev)
          line = "<ol>" + line
          i += 1
      else if osfItem.rank.prev > osfItem.rank.curr
        i = 0
        while i < (osfItem.rank.prev - osfItem.rank.curr)
          line = "</ol>" + line
          i += 1
      parsed += "<li>" + line + "</li>"
      parsed += "</ol>"  if osfItem.iteminfo.nextisChapter is true
    parsed

  markdown: (osfItem, status) ->
    "use strict"
    line = undefined
    parsed = undefined
    rank = undefined
    i = undefined
    return ""  if status isnt `undefined`
    if osfItem.url isnt false
      line = "[" + osfItem.osftext + "](" + osfItem.url + ")"
    else
      line = osfItem.osftext
    if osfItem.tags.indexOf("chapter") isnt -1
      line = "\n#" + line + " ^" + osfItem.timeHMS + "  \n"
      parsed = line
    else
      rank = ""
      if osfItem.rank.curr isnt 0
        i = 1
        while i < osfItem.rank.curr
          rank += "    "
          i += 1
        parsed = rank + "*" + " " + line
      else
        line = "\n" + line  if osfItem.rank.prev isnt 0
        parsed = line + "  "
    "\n" + parsed

  chapter: (osfItem, status) ->
    "use strict"
    return ""  if status isnt `undefined`
    return osfItem.timeHMS + " " + osfItem.osftext + "\n"  if osfItem.tags.indexOf("chapter") isnt -1
    ""

  glossary: (osfItem, status) ->
    "use strict"
    return ""  if status isnt `undefined`
    return osfItem.timeHMS + " " + "<a href=\"" + osfItem.url + "\">" + osfItem.osftext + "</a>" + "\n"  if osfItem.tags.indexOf("glossary") isnt -1
    ""

  osf: (osfItem, status) ->
    "use strict"
    line = ""
    return ""  if status isnt `undefined`
    line += osfItem.timeHMS + " "  if typeof osfItem.timeSec is "number"
    line += osfItem.osftext
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
