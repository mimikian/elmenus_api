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