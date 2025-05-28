function getTimeWorked(date1, date2) {
    // Not super accurate time diff calculator, but good enough
    // for getting overall time worked at a place

    var diff = Math.floor(date1.getTime() - date2.getTime());
    var day = 1000 * 60 * 60 * 24;

    var days = Math.floor(diff / day);
    var months = Math.floor(days / 31);
    var years = Math.floor(months / 12);

    //Get proper months left in year
    if (months > 12) { months = months % 12; }

    // Format work time in (YEAR / MONTHS)
    var dateDisplay = ''
    if (years > 1) { dateDisplay += years + " Years"; }
    else { dateDisplay += years + " Year"; }

    dateDisplay += " / "

    if (months > 1) { dateDisplay += months + " Months"; }
    else { dateDisplay += months + " Month" }

    return dateDisplay
  }

  var startDate = new Date("2024-03-01");
  var today = new Date();
  var worked = getTimeWorked(today, startDate)

  document.getElementById("workTime").innerHTML = worked;