import testCheckFunctions from './checkFunctions.test'
import testUtils from './utils.test'

export default (...args) => {
  testCheckFunctions(...args)
  testUtils(...args)
}
