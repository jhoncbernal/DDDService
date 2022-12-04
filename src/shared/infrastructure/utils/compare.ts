namespace compare {
  export function array(array1: Array<string>, array2: Array<string>) {
    return (
      array1.length === array2.length && array1.every((v, i) => v === array2[i])
    );
  }
}
export default compare;
