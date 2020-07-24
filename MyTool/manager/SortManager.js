//排序

var SortManager = {

    //快速排序
    quickSort(arr){

        let length = arr.length;

        let center = length % 2 == 0 ? length / 2 : length + 1 / 2 ;

        let arrLeft = [];
        let arrRight = [];

        for( let i = 0 ; i < length ; i++ ){
            arr[i] < arr[center] ? arrLeft.push(arr[i]) : arrRight.push(arr[i]);
        }

        arr = arrLeft.concat(arr[center],arrRight);

        let left = 0;
        let right = 0;
        if(arrLeft.length > 1 ){
            left = arrLeft.length % 2 == 0 ? arrLeft.length / 2 : arrLeft.length + 1 / 2 ;
        }else {
            left = 0;
        }

        if(arrRight.length > 1){
            right = arrRight.length % 2 == 0 ? arrRight.length / 2 : arrRight.length + 1 / 2;
        }else {
            right = 0;
        }

        let sortLeftAndRight = function (arr,center,left,right) {

        }

        return sortLeftAndRight(arr,left,right);
    },

    //冒泡排序
    bubbleSort(arr){

        for(let i = 0 ; i < arr.length ; i++ ){
            for(let j = i+1 ; j < arr.length ; j++ ){

                if(arr[i] < arr){
                    let temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }

        return arr;
    }


}

module.exports = SortManager;