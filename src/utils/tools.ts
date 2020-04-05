export const deepCopy = (origin: any) => {
  let target: any = Array.isArray(origin) ? [] : {};
  for (let prop in origin) {
    if (target[prop]) {
      continue;
    }
    let childOrigin = origin[prop];
    target[prop] =
      typeof childOrigin !== "object" ? childOrigin : deepCopy(childOrigin);
  }
  return target;
};
