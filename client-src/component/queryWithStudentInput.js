import $ from 'jquery';

const init = function(){
    bindClickBtn();
};

const bindClickBtn = function(){
    const $searchBtn = $('#student-search');
    const $searchInput = $('#inputSmall');
    $searchBtn.click(function(){
        const value = $searchInput[0].value;
        if(!value){
            return null
        }

        $.ajax('./')

    })

};

export {
    init
}