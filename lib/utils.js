/**
* get the current time in format HH:MM:SS
*/
function getDateTime() {
  var date = new Date();
  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;
  var min  = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;
  var sec  = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;
  return hour + ":" + min + ":" + sec;
}
exports.getDateTime = getDateTime;

/**
* converts the 12-hour format to 24 hour-format
*/
function convertTo24Hour(time) {
    var hours = parseInt(time.substr(0, 2));
    if(time.indexOf('AM') != -1 && hours == 12) {
        time = time.replace('12', '00');
    }
    if(time.indexOf('PM')  != -1 && hours < 12) {
        time = time.replace(hours, (hours + 12));
        if(time.split(":")[0].length > 2 )
          time = time.substr(1,time.length);
    }
    return time.replace(/(AM|PM)/, '').trim();
}
exports.convertTo24Hour = convertTo24Hour;

/**
* checks if the end time is less than the start time, if so, then it adds 24 hours to the end time
*/
function returnEndTimeAfterStartingTime(startTime, endTime) {
    startTime = convertTo24Hour(startTime);
    endTime = convertTo24Hour(endTime);
    var startTimeHours = parseInt(startTime.substr(0, 2));
    var endTimeHours = parseInt(endTime.substr(0, 2));
    if(endTimeHours <= startTimeHours)
      endTime = endTime.replace(endTimeHours, (endTimeHours + 24));
    if(endTime.split(":")[0].length > 2 )
      endTime = endTime.substr(1,endTime.length);
    return endTime;
}
exports.returnEndTimeAfterStartingTime = returnEndTimeAfterStartingTime;

/**
* converts time format "HH::MM:SS" to seconds
*/
function timeToSeconds(time) {
  tt=time.split(":");
  return tt[0]*3600+tt[1]*60+tt[2]*1;
}
exports.timeToSeconds = timeToSeconds;