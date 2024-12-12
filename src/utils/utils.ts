import { To } from 'react-router-dom';
import { JvmInstance } from '../api/interfaces';

export const linkBasename = '/staging/starter';
export const mergeToBasename = (to: To, basename: string): To => {
  if (typeof to === 'string') {
    // replace possible "//" after basename
    return `${basename}/${to}`.replace(`^${basename}//`, '/');
  }

  return {
    ...to,
    pathname: `${basename}/${to.pathname}`.replace(`^${basename}//`, '/'),
  };
};

export const formatInstancesData = (instances: JvmInstance[]) => {
  instances.forEach((instance) => {
    instance.title = instance.workload;
    // if there is no appName, use the workload as it's accordion title
    if (!instance['appName']) {
      instance.title = instance.workload;
    }
    // change the unidentified workload type, and set the title to the application name
    if (
      instance.workload === 'Unidentified' ||
      instance.workload === '[None]'
    ) {
      instance.workload = 'General Java Application';
      if (instance.appName) {
        // if it's an eap instance, use the app name as it's title
        instance.title = instance.appName;
      } else {
        // if it's a jvm instance, use the workload as it's title
        instance.title = instance.workload;
      }
    } else if (instance.workload === '') {
      // MWTELE-271: the UI should accommodate redacted workload & app.name
      instance.workload = 'Unknown workload';
      if (instance.appName) {
        instance.title = instance.appName;
      } else {
        instance.title = instance.workload;
      }
    }
    // format the date string
    instance.created = formatDateTimeString(instance.created);
    // format the GC details string
    const regex = new RegExp('gc::(.*?)::(.*?)$');
    const match = regex.exec(instance.jvmHeapGcDetails);
    if (match && match[1] && match[2]) {
      instance.jvmHeapGcDetails = match[1] + ', ' + match[2];
    }
  });
  return instances;
};

/**
 * To better integrate within the host inventory frontend, we will use the same formatting function they
 * use to format their date strings. This would be the "exact" function from the frontend-components
 * DateFormat helper.
 *
 * See: https://github.com/RedHatInsights/insights-inventory-frontend/blob/master/src/components/InventoryDetail/FactsInfo.js#L50
 * See: https://github.com/RedHatInsights/frontend-components/blob/master/packages/components/src/DateFormat/helper.tsx#L41
 * @param utcString a UTC date string
 * @returns a datestring formatted to 'exact' as seen in the frontend-components DateFormat component
 */
export const formatExactUTCString = (utcstring: string) =>
  utcstring.split(',')[1].slice(0, -7).trim() + ' UTC';

/**
 * Function that tries to convert a date string into a Date object, and returns a special UTC date string.
 * The incoming date string can be a timestamp string, or a type of Date Time string.
 *
 * The runtimes-inventory backend stores the "created" time as a Java ZonedDateTime, which follows the
 * the ISO-8601 calendar system in the format YYYY-MM-DDTHH:MM:ss.ssssssZ, with the milliseconds at 6 digits.
 *
 * See: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/time/ZonedDateTime.html
 *
 * The JavaScript Date constructor can parse date time strings, but expects a ECMA Date Time String format,
 * which is a simplification of the ISO-8601 format that only counts to three millisecond digits:
 * YYYY-MM-DDTHH:mm:ss.sssZ.
 *
 * See: https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-date-time-string-format
 *
 * This function attempts to pass the Java ZonedDateTime string into the JavaScript Date constructor,
 * and convert it into a UTC string. If the resulting string is 'Invalid Date' then the formatting
 * of the ZonedDateTime failed, and will try to use a regex to grab the simplified Date Time String
 * from the ZonedDateTime. If that fails, it will just return the ZonedDateTime string as written.
 *
 */
export const formatDateTimeString = (created: string) => {
  const date = new Date(created);
  let utcstring = date.toUTCString();
  let datestring = '';
  if (utcstring !== 'Invalid Date') {
    datestring = formatExactUTCString(utcstring);
  } else {
    const regex = new RegExp(
      '^([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3})[0-9]{3}(Z|[+-][0-9]{2}:[0-9]{2})$'
    );
    const match = regex.exec(created);
    if (match && match[1] && match[2]) {
      utcstring = new Date(
        match[1].valueOf().concat(match[2].valueOf())
      ).toUTCString();
      if (utcstring === 'Invalid Date') {
        // if the regex capture works but still results in an invalid date, just return the ISO-8061
        datestring = created;
      } else {
        datestring = formatExactUTCString(datestring);
      }
    } else {
      datestring = created;
    }
  }
  return datestring;
};
