import extend from 'lodash/extend';
import clone from 'lodash/clone';

export function reduceAtSubState(rootState, action, subStatePath, subStateReducer){
  return subStatePath.reverse().reduce((p, n, i) => {
    if (i === 0){
      return extend({}, p, {
        [n]: subStateReducer(getSubState(rootState, subStatePath), action)
      });
    }
    return extend({},
      getSubState(rootState, clone(subStatePath).slice(0, subStatePath.length - i)),
      {
        [n]: p
      });
  }, getSubState(rootState, clone(subStatePath).slice(0, subStatePath.length - 1)));
}

export function getSubState(rootState, subStatePath){
  if (!subStatePath.length){
    return rootState;
  }

  return subStatePath.reduce((p, n) => p[n], rootState);
}

export function convertNullOrUndefinedToEmptyStrings(source, targetKeys){
  const result = clone(source);
  targetKeys.forEach(k => !result[k] && ( result[k] = ""));
  return result;
}
