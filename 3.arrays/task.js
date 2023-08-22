function compareArrays(arr1, arr2) {
    if(arr1.length !== arr2.length) {
        return false;
    }
    return arr1.every((element, index) => element === arr2[index]);
}
compareArrays([8, 9], [6]) // false, разные значения
compareArrays([8, 9, 5, 4], [8, 9, 5, 4, 8, 3, 5]) // false, разные значения
compareArrays([9, 2, 4, 8, 2], [9, 2, 4]) // false, разные значения
compareArrays([1, 2, 3], [2, 3, 1]) // false, разные индексы, хотя и одинаковые значения
compareArrays([8, 1, 2], [8, 1, 2]) // true

function getUsersNamesInAgeRange(users, gender) {
  
}