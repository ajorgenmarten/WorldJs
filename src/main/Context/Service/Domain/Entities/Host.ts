import { posix } from 'path'

export default class Host {
  private so: string
  private hostsPath: string
  constructor() {
    this.so = process.platform == 'win32' ? 'windows' : 'unix'
    const winRoot = process.env.SystemRoot || process.env.WINDIR || 'C:\\WINDOWS'
    const unixRoot = '/etc'
    this.hostsPath =
      this.so == 'windows'
        ? posix.join(winRoot, 'System', 'drivers', 'etc', 'hosts')
        : posix.join(unixRoot, 'hosts')
  }
}
