#
# tinyosf.js
#
# Copyright 2013, Simon Waldherr - http://simon.waldherr.eu/
# Released under the MIT Licence
# http://opensource.org/licenses/MIT
#
# Github:  https://github.com/shownotes/tinyOSF.js/
# Version: 0.3.2
#

tinyosf =
  extractTags: (tagString, urlString) ->
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

  buildTags: (tagArray, withOSF, withClass) ->
    "use strict"
    i = undefined
    output = ""
    i = 0
    while i < tagArray.length
      if typeof tagArray[i] is "string"
        if tagArray[i].trim().length > 3
          if withOSF is 2
            output += " osf_" + tagArray[i]
          else if withOSF is 1
            output += ", "  if output isnt ""
            output += tagArray[i]
          else
            output += " "  if output isnt ""
            output += "#" + tagArray[i]
      i += 1
    return " class=\"" + output + "\""  if withClass is true
    output

  timestampsToHMS: (now, starttimestamp) ->
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

  HMSToTimeInt: (hms) ->
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

  TimeIntToHMS: (now) ->
    "use strict"
    tinyosf.timestampsToHMS now, 0

  htmldecode: (string) ->
    "use strict"
    div = document.createElement("div")
    div.innerHTML = string
    string = div.innerText or div.textContent
    div = `undefined`
    string

  htmlencode: (string) ->
    "use strict"
    div = document.createElement("div")
    div.appendChild document.createTextNode(string)
    string = div.innerHTML
    div = `undefined`
    string

  Parser: (string) ->
    "use strict"
    osfArray = undefined
    i = 0
    splitAt = false
    output = []
    rank = undefined
    osfTime = undefined
    timeHMS = undefined
    timeSec = undefined
    osfFirstTS = undefined
    osfFirstHMS = undefined
    osfRegex = /(^([(\d{8,})((\d+\u003A)?\d+\u003A\d+(\u002E\d+)?)]*)?\h*([^#<>\n\v]+) *(\u003C[\S]*\u003E)?((\s*\u0023[\S]* ?)*)\n*)/g

    #about this Regex:
    #^([(\d{8,})(\u002D+)(\d+\u003A\d+\u003A\d+(\u002E\d*)?)]*)?   => 1234567890 or - or 00:01:02[.000] or nothing at the beginning of the line
    #([^#<>\n\v]+)                                                 => a wide range of chars (excluding #,<,> and new lines (vertical whitespace))
    #(\u003C[\S]*\u003E)?                                          => a string beginning with < and ending with > containing no whitespace or nothing
    #((\s*\u0023[\S]* ?)*)                                         => a string beginning with a whitespace, then a # and then some not whitespace chars or nothing
    if string.indexOf("/HEADER") isnt -1
      splitAt = "/HEADER"
    else splitAt = "/HEAD"  if string.indexOf("/HEAD") isnt -1
    if typeof splitAt is "string"
      string = string.split(splitAt, 2)[1].trim()
    else
      splitAt = string.split(/([(\d{8,})((\d+\u003A)?\d+\u003A\d+(\u002E\d+)?)]+\s*\S)/i, 3)
      splitAt = string.indexOf(splitAt[1])
      string = string.slice(splitAt)
    string = "\n" + string.replace(/\s+/, " ") + "\n"
    osfArray = osfRegex.exec(string)
    while osfArray isnt null
      osfArray[3] = osfArray[3].trim()
      if osfArray[3].replace(/[\s\d\.:\-]+/g, "").length > 2
        osfArray[0] = osfArray[0].trim()
        osfTime = osfArray[2]
        if /(\d{8,})/.test(osfTime)
          osfTime = parseInt(osfTime, 10)
          osfFirstTS = osfTime  if osfFirstTS is `undefined`
          timeHMS = tinyosf.timestampsToHMS(osfTime, osfFirstTS)
          timeSec = osfTime - osfFirstTS
        else if /((\d+\u003A)?\d+\u003A\d+(\u002E\d+)?)/.test(osfTime)
          osfFirstHMS = osfTime  if osfFirstHMS is `undefined`
          timeHMS = osfTime
          timeSec = tinyosf.HMSToTimeInt(osfTime)
        else
          timeHMS = false
          timeSec = false
        osfArray[1] = timeHMS #HH:MM:SS
        osfArray[2] = timeSec #Seconds
        osfArray[6] = 0
        if /^[\-\–\—]+/.test(osfArray[3])
          rank = /^[\-\–\—]+/.exec(osfArray[3])
          if rank isnt `undefined`
            if rank[0] isnt `undefined`
              osfArray[6] = rank[0].length
              osfArray[3] = osfArray[3].substr(osfArray[6]).trim()
        osfArray[3] = (" " + tinyosf.htmlencode(osfArray[3]) + " ").toString().replace(" \"", " &#8222;").replace("\" ", "&#8220 ").trim()
        output[i] = osfArray
        i += 1
      osfArray = osfRegex.exec(string)

    #
    #    [i][0] = original item line
    #    [i][1] = time in HH:MM:SS
    #    [i][2] = time in sec
    #    [i][3] = clean text
    #    [i][4] = URL
    #    [i][5] = Tags
    #    [i][6] = Rank
    #    
    output

  Export: (osf, modefunction) ->
    "use strict"
    i = undefined
    osfline = undefined
    osftext = undefined
    tags = undefined
    url = undefined
    nextTime = undefined
    lastTime = undefined
    timeSec = undefined
    timeHMS = undefined
    iteminfo = {}
    parsed = ""
    ranks = {}
    parsed += modefunction("", "pre")
    iteminfo.afterChapter = 0
    iteminfo.nextisChapter = false
    i = 0
    while i < osf.length
      osfline = osf[i]
      timeHMS = osfline[1]
      timeSec = osfline[2]
      osftext = osfline[3]
      if typeof osfline[4] is "string"
        url = osfline[4].replace(/\u003C/, "").replace(/\u003E/, "")
      else
        url = false
      tags = tinyosf.extractTags(osfline[5], url)
      if tags.indexOf("chapter") isnt -1
        iteminfo.afterChapter = 0
      else
        iteminfo.afterChapter += 1
      if osf[i + 1] isnt `undefined`
        if tinyosf.extractTags(osf[i + 1][5], false).indexOf("chapter") isnt -1
          iteminfo.nextisChapter = true
        else
          iteminfo.nextisChapter = false
      ranks.prev = (if osf[i - 1] isnt `undefined` then osf[i - 1][6] else 0)
      ranks.curr = osf[i][6]
      ranks.next = (if osf[i + 1] isnt `undefined` then osf[i + 1][6] else 0)
      lastTime = osf[i][2]  if (osf[i][2] isnt `undefined`) and (osf[i][2] isnt false)
      if osf[i + 1] isnt `undefined`
        if (osf[i + 1][2] isnt `undefined`) and (osf[i + 1][2] isnt false)
          nextTime = osf[i + 1][2]
        else
          nextTime = lastTime

      #nextTime = osf[i+1] !== undefined ? osf[i+1][2] : undefined;
      if (osfline isnt `undefined`) and (modefunction isnt `undefined`)
        parsed += modefunction(
          timeSec: timeSec
          timeSecLast: lastTime
          timeSecNext: nextTime
          timeHMS: timeHMS
          osftext: osftext
          osfline: osfline
          url: url
          tags: tags
          iteminfo: iteminfo
          rank: ranks
        )
      i += 1
    parsed += modefunction("", "post")
    parsed
