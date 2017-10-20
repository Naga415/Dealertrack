'use strict';
export default class ObjectUtil {

  static clone(objectToClone, propsToMerge) {
    return Object.assign(Object.create(Object.getPrototypeOf(objectToClone)), objectToClone, propsToMerge);
  }

  static cloneArray(array) {
    if (!array) {
      return array;
    }
    return array.map(o => this.clone(o));
  }
}
