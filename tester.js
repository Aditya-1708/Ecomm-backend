let array=[1,2,3,4,5,6,7,8,9,10];
var elementIndex=array.indexOf(array.find((element)=>{
  if(element===5){
    return element;
  }
}));
console.log(elementIndex);


