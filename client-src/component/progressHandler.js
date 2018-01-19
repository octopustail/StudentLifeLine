import $ from 'jquery';

const $progress = $('#global-progress');
let count = 0;
/**
 * 关闭或者展示 progress
 * @param status open代表继续等待+1，close 代表关闭 -1；每次 close 的时候计算 count，如果count=0，那么就应该关闭，如果 count 大于
 * 0，那么就应该打开；
 */
const toggle = function (status) {

    if (status === 'open') {
        count++;
        $progress.fadeIn();
    } else if (status === 'close') {
        count--;
        if(count <= 0){
            $progress.fadeOut();
            count = 0;
        }
    }
};


export default toggle;