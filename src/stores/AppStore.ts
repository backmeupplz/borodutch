import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'

export class AppStore extends PersistableStore {
  opened: { [code: string]: boolean } = {}
}

export const appStore = proxy(new AppStore()).makePersistent()
