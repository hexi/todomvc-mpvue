export default class ParamsBuilder {
  _params;

  constructor () {
    this._params = {}
  }

  param (key, value) {
    if (value == null || key == null) {
      return this
    }
    this._params[key] = value
    return this
  }

  build () {
    return this._params
  }
}
