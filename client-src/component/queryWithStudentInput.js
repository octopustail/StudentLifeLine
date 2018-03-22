import $ from 'jquery';
import {queryServerWithTerm} from './calendarView';

const init = function(){
    bindClickBtn();
};

const bindClickBtn = function(){
    const $searchBtn = $('#student-search');
    const $searchInput = $('#inputSmall');
    $searchBtn.click(function(){
        const value = $searchInput[0].getAttribute('studentid');
        const inputvalue = $searchInput[0].value;
       //直接将从input中输入获得的值和从checkbox中点选得到的值连接成一个字符串就可以
        let searchvalue = value + ','+inputvalue;


        if(!searchvalue){
            return null
        }
        queryServerWithTerm(searchvalue);
    })

};

export {
    init
}