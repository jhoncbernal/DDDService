namespace compare {
  export function array(array1: Array<string>, array2: Array<string>) {
    return (
      array1.length === array2.length && array1.every((v, i) => v === array2[i])
    );
  }
  export function object(object1: object, object2: object) {
    return JSON.stringify(object1) === JSON.stringify(object2);
  }
}
export default compare;
