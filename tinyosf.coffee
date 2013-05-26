#
# * tinyosf.js
# *
# * Copyright 2013, Simon Waldherr - http://simon.waldherr.eu/
# * Released under the MIT Licence
# * http://opensource.org/licenses/MIT
# *
# * Github:  https://github.com/shownotes/tinyOSF.js/
# * Version: 0.1.4
# 

osfExtractTags = (tagString, urlString) ->
  "use strict"
  tagArray = []
  tagTempArray = []
  i = undefined
  urlTemp = undefined
  tagTemp = undefined
  tagTempArray = tagString.split(" ")
  i = 0
  while i < tagTempArray.length
    tagTemp = tagTempArray[i].replace("#", "").trim()
    if tagTemp.length is 1
      if tagTemp is "c"
        tagTemp = "chapter"
      else if tagTemp is "t"
        tagTemp = "topic"
      else if tagTemp is "g"
        tagTemp = "glossary"
      else if tagTemp is "l"
        tagTemp = "link"
      else if tagTemp is "s"
        tagTemp = "section"
      else if tagTemp is "v"
        tagTemp = "video"
      else if tagTemp is "a"
        tagTemp = "audio"
      else if tagTemp is "i"
        tagTemp = "image"
      else tagTemp = "quote"  if tagTemp is "q"
    tagArray[i] = tagTemp  if tagTemp.length > 3
    i += 1
  if urlString isnt false
    urlTemp = urlString.split("/")[2]
    if Array.isArray(urlTemp)
      urlTemp = urlTemp.split(".")
      tagArray[i + 1] = urlTemp[urlTemp.length - 2] + urlTemp[urlTemp.length - 1]
  tagArray
osfBuildTags = (tagArray, withClass) ->
  "use strict"
  i = undefined
  output = ""
  i = 0
  while i < tagArray.length
    output += " osf_" + tagArray[i]  if tagArray[i].trim().length > 3  if typeof tagArray[i] is "string"
    i += 1
  return " class=\"" + output + "\""  if withClass is true
  output
osfTimestampsToHMS = (now, starttimestamp) ->
  "use strict"
  time = parseInt(now, 10) - parseInt(starttimestamp, 10)
  hours = undefined
  minutes = undefined
  seconds = undefined
  returntime = ""
  hours = Math.floor(time / 3600)
  minutes = Math.floor((time - (hours * 3600)) / 60)
  seconds = time - (hours * 3600) - (minutes * 60)
  returntime += (if (hours < 10) then "0" + hours + ":" else hours + ":")
  returntime += (if (minutes < 10) then "0" + minutes + ":" else minutes + ":")
  returntime += (if (seconds < 10) then "0" + seconds else seconds)
  returntime
osfHMSToTimestamp = (hms) ->
  "use strict"
  time = 0
  timeArray = undefined
  regex = /((\d+\u003A)?(\d+\u003A)?(\d+)(\u002E\d+)?)/
  return  if hms is `undefined`
  timeArray = regex.exec(hms.trim())
  if timeArray isnt null
    time += parseInt(timeArray[2], 10) * 3600
    time += parseInt(timeArray[3], 10) * 60
    time += parseInt(timeArray[4], 10)
  else
    return `undefined`
  time
osfParser = (string) ->
  "use strict"
  osfArray = undefined
  i = 0
  splitAt = false
  output = []
  osfRegex = /(^([(\d{8,})(\u002D+)(\d+\u003A\d+\u003A\d+(\u002E\d*)?)]*)?\h*([\u0020-\u0022\u0024-\u003B\u003D\u003F-\u007D\u00C0-\u00FF„“@€!"§$%&\(\)=\?`´\+ ]+) *(\u003C[\S]*\u003E)?((\s*\u0023[\S]* ?)*)\n*)/g

  #about this Regex:
  #^([(\d{8,})(\u002D+)(\d+\u003A\d+\u003A\d+(\u002E\d*)?)]*)?                           => 1234567890 or - or 00:01:02[.000] or nothing at the beginning of the line
  #([\u0020-\u0022\u0024-\u003B\u003D\u003F-\u007D\u00C0-\u00FF„“@€!"§$%&\(\)=\?`´\+]+)  => a wide range of chars (excluding #,<,> and a few more) maybe this will change to ([^#<>]+) anytime
  #(\u003C[\S]*\u003E)?                                                                  => a string beginning with < and ending with > containing no whitespace or nothing
  #((\s*\u0023[\S]* ?)*)                                                                 => a string beginning with a whitespace, then a # and then some not whitespace chars or nothing
  if string.indexOf("/HEADER") isnt -1
    splitAt = "/HEADER"
  else splitAt = "/HEAD"  if string.indexOf("/HEAD") isnt -1
  if typeof splitAt is "string"
    string = string.split(splitAt, 2)[1].trim()
  else
    splitAt = string.split(/([(\d{9,})(\d+\u003A\d+\u003A\d+(\u002E\d*)?)]+\s*\S)/i, 3)
    splitAt = string.indexOf(splitAt[1])
    string = string.slice(splitAt)
  string = string.replace(/\s+/, " ")
  osfArray = osfRegex.exec(string)
  while osfArray isnt null
    osfArray[3] = (" " + osfArray[3] + " ").toString().replace(" \"", " &#8222;").replace("\" ", "&#8220 ").trim()
    output[i] = osfArray
    osfArray = osfRegex.exec(string)
    i += 1
  output
osfExport = (osf, modefunction) ->
  "use strict"
  i = undefined
  osfline = undefined
  tags = undefined
  url = undefined
  osfFirstTS = undefined
  osfFirstHMS = undefined
  osfTime = undefined
  timeSec = undefined
  timeHMS = undefined
  iteminfo = {}
  parsed = ""
  parsed += modefunction("", "pre")
  iteminfo.afterChapter = 0
  iteminfo.nextisChapter = false
  i = 0
  while i < osf.length
    osfline = osf[i]
    osfTime = osfline[2]
    if /(\d{9,})/.test(osfTime) isnt false
      osfTime = parseInt(osfTime, 10)
      osfFirstTS = osfTime  if osfFirstTS is `undefined`
      timeHMS = osfTimestampsToHMS(osfTime, osfFirstTS)
      timeSec = osfTime - osfFirstTS
    else if /(\d+:\d+:\d+(\.\d*)?)/.test(osfTime) isnt null
      osfFirstHMS = osfTime  if osfFirstHMS is `undefined`
      timeHMS = osfTime
      timeSec = osfHMSToTimestamp(osfTime)
    if typeof osfline[4] is "string"
      url = osfline[4].replace(/\u003C/, "").replace(/\u003E/, "")
    else
      url = false
    tags = osfExtractTags(osfline[5], url)
    if tags.indexOf("chapter") isnt -1
      iteminfo.afterChapter = 0
    else
      iteminfo.afterChapter += 1
    if osf[i + 1] isnt `undefined`
      if osfExtractTags(osf[i + 1][5], false).indexOf("chapter") isnt -1
        iteminfo.nextisChapter = true
      else
        iteminfo.nextisChapter = false
    if (osfline isnt `undefined`) and (modefunction isnt `undefined`)
      parsed += modefunction(
        timeSec: timeSec
        timeHMS: timeHMS
        osfline: osfline
        url: url
        tags: tags
        iteminfo: iteminfo
      )
    i += 1
  parsed += modefunction("", "post")
  parsed
