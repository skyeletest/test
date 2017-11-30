import {info} from './logs'
import utils from './utils'
import windowInstall from './windowInstall'

let storage = {}

const get = (id, isRemove = false) => {
  let retData
  if (storage.hasOwnProperty(id)) {
    let { data, name } = storage[ id ]
    retData = data
    info(`[${name}]storage.get[${id}], remove = ${isRemove}`, data)
  }
  if (isRemove) {
    delete storage[ id ]
  }
  return retData
}

const set = (data, name) => {
  let id = utils.uRandom.id()
  storage[ id ] = { data, name }
  info(`[${name}]storage.set[${id}]`, data)
  return id
}

const remove = (id) => {
  if (storage.hasOwnProperty(id)) {
    let { name } = storage[ id ]
    info(`[${name}]storage.remove[${id}]`)
  }
  delete storage[ id ]
}

const clear = () => {
  info('storage.clear')
  storage = {}
}

windowInstall('showStorage', () => {
  let len = Object.keys(storage).length
  for (let k in storage) { get(k) }
  return len
})

export default { get, set, remove, clear }
