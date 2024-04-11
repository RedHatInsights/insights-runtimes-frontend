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
    // add the appName value to a JvmInstance
    if (!instance['appName']) {
      instance.appName = instance.details['app.name'];
    }
    // change the unidentified workload type, and set the title to the application name
    if (instance.workload === 'Unidentified') {
      instance.workload = `General Java Application`;
      instance.title = instance.appName;
    }
    // format the date string
    instance.created = new Date(instance.created).toLocaleString();
    // format the GC details string
    const regex = new RegExp('gc::(.*?)::(.*?)$');
    const match = regex.exec(instance.jvmHeapGcDetails);
    if (match && match[1] && match[2]) {
      instance.jvmHeapGcDetails = match[1] + ', ' + match[2];
    }
  });
  return instances;
};
