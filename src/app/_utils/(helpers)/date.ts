class dateHelper {
  // MONTH FORMAT
  monthFormat = [
    {
      index: 1,
      full_name: "January",
      abbrev: "Jan",
    },
    {
      index: 2,
      full_name: "February",
      abbrev: "Feb",
    },
    {
      index: 3,
      full_name: "March",
      abbrev: "Mar",
    },
    {
      index: 4,
      full_name: "April",
      abbrev: "Apr",
    },
    {
      index: 5,
      full_name: "May",
      abbrev: "May",
    },
    {
      index: 6,
      full_name: "June",
      abbrev: "Jun",
    },
    {
      index: 7,
      full_name: "July",
      abbrev: "Jul",
    },
    {
      index: 8,
      full_name: "August",
      abbrev: "Aug",
    },
    {
      index: 9,
      full_name: "September",
      abbrev: "Sept",
    },
    {
      index: 10,
      full_name: "October",
      abbrev: "Oct",
    },
    {
      index: 11,
      full_name: "November",
      abbrev: "Nov",
    },
    {
      index: 12,
      full_name: "December",
      abbrev: "Dec",
    },
  ];

  // WEEK FORMAT
  weekFormat = [
    {
      full_name: "Sunday",
      abbrev: "Sun",
    },
    {
      full_name: "Monday",
      abbrev: "Mon",
    },
    {
      full_name: "Tuesday",
      abbrev: "Tue",
    },
    {
      full_name: "Wednesday",
      abbrev: "Wed",
    },
    {
      full_name: "Thursday",
      abbrev: "Thur",
    },
    {
      full_name: "Friday",
      abbrev: "Fri",
    },
    {
      full_name: "Saturday",
      abbrev: "Sat",
    },
  ];

  datetime_zone: any = null;

  // FORMAT DATE TIME
  formatDate(date: any, date_string = true) {
    this.datetime_zone = date_string
      ? new Date(date?.endsWith("Z") ? date : this.checkDateHasTime(date))
      : date;

    return this;
  }

  checkDateHasTime(date: string) {
    if (date.split(" ").length > 1) return date?.replace(/\s/, "T") + "Z";
    else return `${date}T00:00:00Z`;
  }

  formatTimestamp(timestamp: any) {
    this.datetime_zone = new Date(parseInt(timestamp) * 1000);
    return this;
  }

  timeDifference() {
    const timeStamp = this.datetime_zone.getTime();

    const differenceInSeconds = Math.abs(Date.now() - timeStamp) / 1000;
    const differenceInMinutes = differenceInSeconds / 60;
    const differenceInHours = differenceInMinutes / 60;
    const differenceInDays = differenceInHours / 24;

    // GET MONTHS IF DAYS IS GREATER THAN OR EQUAL TO 30
    if (differenceInDays >= 30) {
      if (differenceInDays === 30) return `1 month ago`;
      const monthData = Math.round(differenceInDays / 30);
      return monthData === 1
        ? `${monthData} month ago`
        : `${monthData} months ago`;
    }

    // GET DAYS IF HOURS IS GREATER THAN OR EQUAL TO 24
    if (differenceInHours >= 24) {
      if (differenceInHours === 24) return `1 day ago`;
      return `${Math.round(differenceInHours / 24)} days ago`;
    }

    //Get HOURS IF MINUTES IS GREATER OR EQUAL TO 60
    if (differenceInMinutes >= 60) {
      if (differenceInMinutes === 60) return `1 hour ago`;
      return Math.round(differenceInMinutes / 60) === 1
        ? `${Math.round(differenceInMinutes / 60)} hour ago`
        : `${Math.round(differenceInMinutes / 60)} hours ago`;
    }

    //GET MINUTES IF SECONDS IS GREATER OR EQUAL TO 60
    if (differenceInSeconds >= 60) {
      if (differenceInSeconds === 60) return `1 minute ago`;
      else {
        const per_seconds = Math.round(differenceInSeconds / 60);

        return per_seconds === 0
          ? `less than a minute`
          : `${per_seconds} minutes ago`;
      }
    }

    //GET SECONDS IF LESS THAN A MINTE
    if (differenceInSeconds < 60) {
      return `${Math.round(differenceInSeconds)} seconds ago`;
    }
  }

  timeFromNow() {
    const timeStamp = this.datetime_zone.getTime();

    const differenceInSeconds = (timeStamp - Date.now()) / 1000;
    const differenceInMinutes = differenceInSeconds / 60;
    const differenceInHours = differenceInMinutes / 60;
    const differenceInDays = differenceInHours / 24;

    // PAST EVENT
    if (Math.sign(differenceInSeconds) === -1) return false;
    // FUTURE EVENTS
    else {
      // DAYS
      if (differenceInDays > 1) {
        if (differenceInDays >= 30) {
          if (differenceInDays === 30) return `1 month`;
          return `${Math.round(differenceInDays / 30)} months`;
        }

        if (differenceInDays >= 2 || differenceInDays < 30)
          return `${Math.round(differenceInDays)} days`;

        if (Math.round(differenceInDays) === 1 || differenceInDays >= 1)
          return `1 day`;
      }

      // HOURS
      else if (differenceInDays < 1) {
        const hour_resolve = differenceInHours - 1;
        if (hour_resolve > 1) {
          const hour = Math.floor(differenceInHours) - 1;
          const minute =
            Math.floor(Math.ceil(differenceInMinutes) / 60) === 2
              ? Math.ceil(differenceInMinutes) - 120 * hour
              : Math.ceil(differenceInMinutes) - 60 * hour;

          return hour === 1 ? `${hour}hr ${minute}m` : `${hour}hrs ${minute}m`;
        }

        if (hour_resolve < 1) {
          const minute = Math.round(differenceInMinutes);
          return `${minute}min`;
        }
      }
    }
  }

  // GET DATE ORDINAL FORMAT
  getDateSuffix(day: any) {
    const one = [1, 21, 31];
    const two = [2, 22];
    const three = [3, 23];

    if (one.includes(day)) return `${day}st`;
    else if (two.includes(day)) return `${day}nd`;
    else if (three.includes(day)) return `${day}rd`;
    else return `${day}th`;
  }

  // GET DATE TIME IN DAY FORMAT
  getDay(format: any) {
    const get_day = this.datetime_zone?.getDate();

    switch (format) {
      case "d1":
        return get_day;

      case "d2":
        return get_day <= 9 ? `0${get_day}` : get_day;

      case "d3":
        return this.getDateSuffix(get_day);

      case "all":
        return {
          d1: get_day,
          d2: get_day <= 9 ? `0${get_day}` : get_day,
          d3: this.getDateSuffix(get_day),
        };

      default:
        throw new Error("Please check the day format entered!!");
    }
  }

  // GET DATE TIME IN MONTH FORMAT
  getMonth(month: any) {
    const get_month = this.datetime_zone.getMonth();
    const month_value = this.monthFormat[get_month]?.index;

    switch (month) {
      case "m1":
        return month_value;

      case "m2":
        return month_value <= 9 ? `0${month_value}` : month_value;

      case "m3":
        return this.monthFormat[get_month]?.full_name;

      case "m4":
        return this.monthFormat[get_month]?.abbrev;

      case "all":
        return {
          m1: month_value,
          m2: month_value <= 9 ? `0${month_value}` : month_value,
          m3: this.monthFormat[get_month]?.full_name,
          m4: this.monthFormat[get_month]?.abbrev,
        };

      default:
        throw new Error("Please check the month format entered!!");
    }
  }

  // GET DATE TIME IN YEAR FORMAT
  getYear(year: any) {
    const get_year = this.datetime_zone?.getFullYear()?.toString();

    switch (year) {
      case "y1":
        return get_year;

      case "y2":
        return get_year?.substring(1);

      case "all":
        return {
          y1: get_year,
          y2: get_year?.substring(1),
        };

      default:
        throw new Error("Please check the year format entered!!");
    }
  }

  // GET WEEK FORMAT
  getWeek(week: any) {
    const get_week = this.datetime_zone?.getDay();

    switch (week) {
      case "w1":
        return this.weekFormat[get_week]?.full_name;

      case "w2":
        return this.weekFormat[get_week]?.abbrev;

      case "all":
        return {
          w1: this.weekFormat[get_week]?.full_name,
          w2: this.weekFormat[get_week]?.abbrev,
        };

      default:
        throw new Error("Please check the week format entered!!");
    }
  }
  // GET DATE TIME IN HOUR FORMAT
  getHour(hour: any) {
    let get_hour = this.datetime_zone?.getHours();
    get_hour = get_hour === -1 ? 12 : get_hour;
    const twelve_hour_value = get_hour > 12 ? get_hour - 12 : get_hour;

    switch (hour) {
      case "h1":
        return twelve_hour_value;

      case "h01":
        return twelve_hour_value <= 9
          ? `0${twelve_hour_value}`
          : twelve_hour_value;

      case "h2":
        return get_hour;

      case "h02":
        return get_hour <= 9 ? `0${get_hour}` : get_hour;

      case "all":
        return {
          h1: twelve_hour_value,
          h01:
            twelve_hour_value <= 9
              ? `0${twelve_hour_value}`
              : twelve_hour_value,

          h2: get_hour,
          h02: get_hour <= 9 ? `0${get_hour}` : get_hour,
        };

      default:
        throw new Error("Please check the hour format entered!!");
    }
  }

  // GET DATE TIME IN MINUTE FORMAT
  getMinute(minute: any) {
    const get_minute = this.datetime_zone?.getMinutes();

    switch (minute) {
      case "b1":
        return get_minute;

      case "b2":
        return get_minute <= 9 ? `0${get_minute}` : get_minute;

      case "all":
        return {
          b1: get_minute,
          b2: get_minute <= 9 ? `0${get_minute}` : get_minute,
        };

      default:
        throw new Error("Please check the minute format entered!!");
    }
  }

  // GET DATE TIME IN SECONDS FORMAT
  getSeconds(seconds: any) {
    const get_seconds = this.datetime_zone?.getSeconds();

    switch (seconds) {
      case "s1":
        return get_seconds;

      case "s2":
        return get_seconds <= 9 ? `0${get_seconds}` : get_seconds;

      case "all":
        return {
          s1: get_seconds,
          s2: get_seconds <= 9 ? `0${get_seconds}` : get_seconds,
        };

      default:
        throw new Error("Please check the seconds format entered!!");
    }
  }

  // GET DATE TIME IN MERIDIAN FORMAT
  getMeridian() {
    const get_hour = this.datetime_zone.getHours() - 1;

    if (get_hour < 12) return "am";
    // else if (get_hour >= 13) return "pm";
    else return "pm";
  }

  // GET ALL DATE TIME FORMAT AVAILABLE
  getAll() {
    return {
      ...this.getDay("all"),
      // @ts-expect-error: This is expected due to the current implementation of getMonth which may not return a valid type.
      ...this.getMonth("all"),
      ...this.getYear("all"),
      ...this.getHour("all"),
      ...this.getMinute("all"),
      ...this.getSeconds("all"),
      // @ts-expect-error: getWeek function may return an unexpected type for merging.
      ...this.getWeek("all"),
      a0: this.getMeridian(),
    };
  }
}

const dateUtil = new dateHelper();
export default dateUtil;

//****************
//DATETIME FORMATS
//**************//

// 1. DAY FORMATS
// -  (d1) Day without 0 prefix (3)
// -  (d2) Day with 0 prefix (03)
// -  (d3) Day with text suffix (3rd)

// 2. WEEK FORMATS
// -  (w1) Week in full length (Monday)
// -  (w2) Week in short length (Mon)

// 3. MONTH FORMATS
// -  (m1) Month without 0 prefix (4)
// -  (m2) Month with 0 prefix (04)
// -  (m3) Month with text (April)
// -  (m4) Month with text abbreviated (Apr)

// 4. YEAR FORMATS
// -  (y1) Year in full length (2021)
// -  (y2) Year in short length (21)

// 5. HOURS FORMATS
// -  (h1) 12-Hour without 0 prefix (1)
// -  (h01) 12-Hour with 0 prefix (01)
// -  (h2) 24-Hour without 0 prefix (9)
// -  (h02) 24-Hour with 0 prefix (09)

// 6. MINUTE FORMATS
// -  (b1) Minute without 0 prefix (5)
// -  (b2) Minute with 0 prefix (05)

// 7. SECONDS FORMATS
// -  (s1) Seconds without 0 prefix (5)
// -  (s2) Seconds with 0 prefix (05)

// 8. MERIDIAN FORMATS
// -  (a0) Meridian format ("am", "pm", "noon")
