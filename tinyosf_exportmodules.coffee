#
# tinyosf_exportmodules.js
#
# Copyright 2013, Simon Waldherr - http://simon.waldherr.eu/
# Released under the MIT Licence
# http://opensource.org/licenses/MIT
#
# Github:  https://github.com/shownotes/tinyOSF.js/
# Version: 0.3.1
#

osfExportTemp = undefined
osfExportModules =
  html: (osfItem, status) ->
    "use strict"
    line = undefined
    parsed = undefined
    return ""  if status isnt `undefined`
    if typeof osfItem.timeSec is "number"
      if osfItem.url isnt false
        line = "<a data-tooltip=\"" + osfItem.timeSec + "\" title=\"" + osfItem.timeHMS + ": " + osfItem.osftext + " (" + tinyosf.buildTags(osfItem.tags, 1, false) + ")\" " + tinyosf.buildTags(osfItem.tags, 2, true) + " href=\"" + osfItem.url + "\">" + osfItem.osftext + "</a>"
      else
        line = "<span data-tooltip=\"" + osfItem.timeSec + "\" " + tinyosf.buildTags(osfItem.tags, 2, true) + " title=\"" + osfItem.timeHMS + ": " + osfItem.osftext + " (" + tinyosf.buildTags(osfItem.tags, 1, false) + ")\">" + osfItem.osftext + "</span>"
    else
      if osfItem.url isnt false
        line = "<a" + tinyosf.buildTags(osfItem.tags, 2, true) + " title=\"" + osfItem.osftext + " (" + tinyosf.buildTags(osfItem.tags, 1, false) + ")\" href=\"" + osfItem.url + "\">" + osfItem.osftext + "</a>"
      else
        line = "<span" + tinyosf.buildTags(osfItem.tags, 2, true) + " title=\"" + osfItem.osftext + " (" + tinyosf.buildTags(osfItem.tags, 1, false) + ")\">" + osfItem.osftext + "</span>"
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
        line = "<a data-tooltip=\"" + osfItem.timeSec + "\" " + tinyosf.buildTags(osfItem.tags, 2, true) + " href=\"" + osfItem.url + "\">" + osfItem.osftext + "</a>"
      else
        line = "<span data-tooltip=\"" + osfItem.timeSec + "\" " + tinyosf.buildTags(osfItem.tags, 2, true) + ">" + osfItem.osftext + "</span>"
    else
      if osfItem.url isnt false
        line = "<a" + tinyosf.buildTags(osfItem.tags, 2, true) + " href=\"" + osfItem.url + "\">" + osfItem.osftext + "</a>"
      else
        line = "<span" + tinyosf.buildTags(osfItem.tags, 2, true) + ">" + osfItem.osftext + "</span>"
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
    derank = undefined
    i = undefined
    if status isnt `undefined`
      return "</ol>"  if status is "post"
      return ""  if status is "pre"
      return ""
    if typeof osfItem.timeSec is "number"
      if osfItem.url isnt false
        line = "<a data-tooltip=\"" + osfItem.timeSec + "\" " + tinyosf.buildTags(osfItem.tags, 2, true) + " href=\"" + osfItem.url + "\">" + osfItem.osftext + "</a>"
      else
        line = "<span data-tooltip=\"" + osfItem.timeSec + "\" " + tinyosf.buildTags(osfItem.tags, 2, true) + ">" + osfItem.osftext + "</span>"
    else
      if osfItem.url isnt false
        line = "<a" + tinyosf.buildTags(osfItem.tags, 2, true) + " href=\"" + osfItem.url + "\">" + osfItem.osftext + "</a>"
      else
        line = "<span" + tinyosf.buildTags(osfItem.tags, 2, true) + ">" + osfItem.osftext + "</span>"
    if osfItem.tags.indexOf("chapter") isnt -1
      derank = ""
      i = 0
      while i < osfItem.rank.prev
        derank += "</ol>"
        i += 1
      line = derank + "<h" + (osfItem.rank.curr + 2) + "><span>" + osfItem.timeHMS + "</span> " + line + "</h" + (osfItem.rank.curr + 2) + ">"
      parsed = line
    else
      if osfItem.iteminfo.afterChapter is 1
        parsed += "<ol>"
      else
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

  audacity: (osfItem, status) ->
    "use strict"
    line = undefined
    parsed = undefined
    rank = undefined
    i = undefined
    itemTime = undefined
    return ""  if status isnt `undefined`
    if osfItem.url isnt false
      line = osfItem.osftext + " &lt;" + osfItem.url + "&gt;"
    else
      line = osfItem.osftext
    rank = ""
    if osfItem.rank.curr isnt 0
      i = 1
      while i < osfItem.rank.curr
        rank += "-"
        i += 1
    itemTime = (if osfItem.timeSec isnt false then osfItem.timeSec else osfItem.timeSecLast)
    parsed = itemTime + ".000000" + "\t" + osfItem.timeSecNext + ".000000" + "\t" + rank + " " + line
    parsed += " " + tinyosf.buildTags(osfItem.tags, 0, false)
    "\n" + parsed

  reaper: (osfItem, status) ->
    "use strict"
    line = undefined
    parsed = undefined
    rank = undefined
    i = undefined
    itemTime = undefined
    if status is "pre"
      osfExportTemp = 0
      return "#,Name,Start,End,Length,Color"
    osfExportTemp += 1
    return ""  if status isnt `undefined`
    if osfItem.url isnt false
      line = osfItem.osftext + " &lt;" + osfItem.url + "&gt;"
    else
      line = osfItem.osftext
    rank = ""
    if osfItem.rank.curr isnt 0
      i = 1
      while i < osfItem.rank.curr
        rank += "-"
        i += 1
      line += rank + " "
    itemTime = (if osfItem.timeSec isnt false then osfItem.timeSec else osfItem.timeSecLast)
    parsed = "M" + osfExportTemp + "," + line + " " + tinyosf.buildTags(osfItem.tags, 0, false) + "," + tinyosf.TimeIntToHMS(itemTime) + ":0," + ","
    if osfItem.tags.indexOf("chapter") isnt -1
      parsed += ",DD0F22"
    else
      parsed += ","
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
