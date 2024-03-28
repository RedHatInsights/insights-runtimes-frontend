export interface RuntimesInventoryResponse {
  response: Array<JvmInstance | EapInstance>;
}

/**
 * Interfaces borrowed from insights-runtimes-inventory
 */
export interface JvmInstance {
  id: string;
  accountId: string;
  appName?: string;
  orgId: string;
  hostname: string;
  launchTime: number;
  vendor: string;
  versionString: string;
  version: string;
  majorVersion: number;
  osArch: string;
  processors: number;
  heapMin: number;
  heapMax: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details: any;
  // details: { [key: string]: string };
  created: string;
  javaClassPath: string;
  javaClassVersion: string;
  javaHome: string;
  javaLibraryPath: string;
  javaSpecificationVendor: string;
  javaVendor: string;
  javaVendorVersion: string;
  javaVmName: string;
  javaVmVendor: string;
  jvmHeapGcDetails: string;
  jvmPid: string;
  jvmReportTime: string;
  systemOsName: string;
  systemOsVersion: string;
  javaCommand: string;
  jvmPackages: string;
  jvmArgs: string;
  workload: string;
  isOcp: boolean;
}

export interface EapInstance extends JvmInstance {
  appClientExtension: string;
  appName: string;
  appTransportCertHttps: string;
  appTransportTypeFile: string;
  appTransportTypeHttps: string;
  appUserDir: string;
  appUserName: string;
  configuration?: EapConfiguration;
  deployments?: Array<EapDeployment>;
  eapBootableJar: boolean;
  eapUseGit: boolean;
  eapVersion: string;
  eapXp: boolean;
  eapYamlExtension: boolean;
  jars?: Array<JarHash>;
  modules?: Array<JarHash>;
  raw?: string;
}

export interface EapDeployment {
  id: string;
  EapInstance?: EapInstance;
  name: string;
  archives?: Array<JarHash>;
}

export interface EapConfiguration {
  id: string;
  eapInstance?: EapInstance;
  extensions?: Array<EapExtension>;
  subsystems?: Map<string, string>;
  deployments?: Map<string, string>;
  version: string;
  launchType: string;
  name: string;
  organization: string;
  processType: string;
  productName: string;
  productVersion: string;
  profileName: string;
  releaseCodename: string;
  releaseVersion: string;
  runningMode: string;
  runtimeConfigurationState: string;
  serverState: string;
  suspendState: string;
  socketBindingGroups?: string;
  paths?: string;
  interfaces?: string;
  coreServices?: string;
}

export interface EapExtension {
  id: string;
  module: string;
  subsystems: NameVersionPair;
}

export interface NameVersionPair {
  name: string;
  version: string;
}

export interface JarHash {
  id: string;
  name: string;
  groupId: string;
  vendor: string;
  version: string;
  sha1Checksum: string;
  sha256Checksum: string;
  sha512Checksum: string;
}
