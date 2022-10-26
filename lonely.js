
const duplicated_array = [4,7,9,3,9,4,7];

const lonely=(arr)=>{
    const unique=[];
    arr.filter(item=> arr.indexOf(item) === arr.lastIndexOf(item) && unique.push(item))
    return unique
}
console.log(lonely(duplicated_array))
