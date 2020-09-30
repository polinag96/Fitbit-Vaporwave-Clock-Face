import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { me as appbit } from "appbit";
import { HeartRateSensor } from "heart-rate";
import { battery } from "power"; 
import userActivity from "user-activity"; 

// Get a handle on the <text> element
const TIME = document.getElementById("TIME");
const HR = document.getElementById("HR");
const STEPS = document.getElementById("STEPS");
const CALORIES = document.getElementById("CALORIES");
const BATTERY = document.getElementById("BATTERY");
const MONTH = document.getElementById("MONTH");
const DAY = document.getElementById("DAY");
const DOW = document.getElementById("DOW");

const t1 = document.getElementById("test1");
const t2 = document.getElementById("test2");
t1.text = `TEST`;  
t2.text = `TEST`; 

// function calls                                   
const hrm = new HeartRateSensor();
const batteryValue = battery.chargeLevel; 
// months
var month = new Array();
  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";  
  month[6] = "July";
  month[7] = "August";
  month[8] = "Sept";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
// HR
hrm.onreading = function() {
  HR.text = `${hrm.heartRate}`;
}
hrm.start()

// STEPS
STEPS.text = userActivity.today.adjusted["steps"] || 0;

// CALORIE
CALORIES.text = userActivity.today.adjusted["calories"] || 0;

// BATTERY
BATTERY.text = `${batteryValue} %`;

// Update the clock every minute
clock.granularity = "minutes";
// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  let monthnum = today.getMonth();
  let day = today.getDate();
  let monthname = month[monthnum];
  let downum = today.getDay();
  let dow = days[downum];
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  TIME.text = `${hours}:${mins}`;
  DAY.text = `${day}`;
  MONTH.text = `${monthname}`;
  DOW.text = `${dow}`;
}
