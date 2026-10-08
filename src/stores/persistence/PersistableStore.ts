import { subscribe } from 'valtio'

export default class PersistableStore {
  makePersistent(key: string) {
    // key is explicit: minified builds rename classes, so constructor.name is unstable
    // localStorage can throw (private mode, blocked storage); persistence is a nicety
    try {
      const savedString = localStorage.getItem(key)
      if (savedString) {
        Object.assign(this, JSON.parse(savedString))
      }
      subscribe(this, () => {
        try {
          localStorage.setItem(key, JSON.stringify(this))
        } catch {
          // ignore
        }
      })
    } catch {
      // ignore
    }
    return this
  }
}
