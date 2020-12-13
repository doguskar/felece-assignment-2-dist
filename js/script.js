$('#btnNavbar').click(function(){
    $('#navbar').toggleClass('active')
})
$('#searchBox input').focus(function(){
    $('#searchBox .last-searches').addClass('active')
})
$('#searchBox input').blur(function(){
    setTimeout(() => {
        $('#searchBox .last-searches').removeClass('active')
    }, 100);
})
$('.btnSearchPage').click(function(){
    $('#searchPage').addClass('active')
})
$('#btnCloseSearchPage').click(function(){
    $('#searchPage').removeClass('active')
})

/* navbar */
$('#btnCloseNavbar').click(function(){
    $('#navbar').toggleClass('active')
})
navbarActive = 0
$(document).click(function(){
    if($('#navbarContents').hasClass('active') && $(document).width() > 766){
        if(navbarActive == 1){
            $('#navbarContents').removeClass('active')
            $(`.menu-item-content.active`).removeClass('active')
            navbarActive = 0
        }
    }
})
$('.menu-item').on('click', function(){
    var contentId = $(this).attr('data-content')
    if(contentId){
        var head = $(this).text()
        $('#btnNavbarContentsBack').html(`<i class="fa fa-chevron-left"></i> ${head}`)
        $('#navbarContents').toggleClass('active')
        $(`#${contentId}`).toggleClass('active')
        navbarActive = 1
    }else{
        var head = $(this).find('a').first().text()
        $('#btnNavbarContentsBack').attr('data-back', $('#btnNavbarContentsBack').text())
        $('#btnNavbarContentsBack').html(`<i class="fa fa-chevron-left"></i> ${head}`)
        $(this).find('ul').addClass('active')
    }
})
$('.menu-item').on('mouseover ', function(){
    if($(document).width() < 767)
        return
    var contentId = $(this).attr('data-content')
    if(contentId){
        var head = $(this).text()
        $('#btnNavbarContentsBack').html(`<i class="fa fa-chevron-left"></i> ${head}`)
        $(`.menu-item-content.active`).removeClass('active')
        $('#navbarContents').addClass('active')
        $(`#${contentId}`).addClass('active')
        navbarActive = 1
    }
})

$('#btnNavbarContentsBack').click(function(){
    var backId = $(this).attr('data-back')
    if(!backId){
        $('#navbarContents').removeClass('active')
        $('#navbarContents .active').removeClass('active')
    }else{
        $('#navbarContents li > ul.active').removeClass('active')
        $('#btnNavbarContentsBack').html(`<i class="fa fa-chevron-left"></i> ${$(this).attr('data-back')}`)
        $(this).attr('data-back', null)
    }
})
/* navbar end */
/* last searches */
$(document).ready(function(){
    if(!checkCookie('anonymousId')){
        var UID = '_' + Math.random().toString(36).substr(2, 9);
        setCookie('anonymousId', UID, 365)
        var lastSearchesArr = ['Bilgisayar', 'Laptop', 'Mause']
        setCookie('lastSearches', JSON.stringify(lastSearchesArr), 365)
    }

    var body = `<h1>Son Aramalar</h1>
                <ul>`
    var lastSearchesArr = JSON.parse(getCookie('lastSearches')) 
    for(var i in lastSearchesArr){
        body += `<li>
                    <a href="#">${lastSearchesArr[i]}</a>
                    <a href="javascript:;" class='last-search-remove' data-index="${i}"><i class="fa fa-times"></i></a>
                </li>`
    }
    body += `</ul>`
    $('.last-searches').html(body)
    addRemoveLastSearchClick()
})
$('#searchInput').keypress(function(e){
    if(e.keyCode == 13){
        addLastSearches($('#searchInput').val())
    }
})
$('#btnSearch').click(function(e){
    addLastSearches($('#searchInput').val())
})
$('#btnSearch2').click(function(e){
    addLastSearches($('#searchInput2').val())
})
function addLastSearches(item){
    if(!item)
        return
    var lastSearchesArr = JSON.parse(getCookie('lastSearches')) 
    lastSearchesArr.unshift(item)
    if(lastSearchesArr.length > 10)
        lastSearchesArr.pop()
    setCookie('lastSearches', JSON.stringify(lastSearchesArr), 365)
    
    var body = `<li>
                    <a href="#">${item}</a>
                    <a href="javascript:;" class='last-search-remove' data-index="0"><i class="fa fa-times"></i></a>
                </li>`
    $('.last-searches ul').prepend(body)
    addRemoveLastSearchClick()
}
function addRemoveLastSearchClick(){
    $('.last-search-remove').click(function(){
        var i = $(this).attr('data-index')
        $(this).parent().remove()

        var lastSearchesArr = JSON.parse(getCookie('lastSearches')) 
        lastSearchesArr.splice(i, 1);
        setCookie('lastSearches', JSON.stringify(lastSearchesArr), 365)
    })
}
/* last searches end */
/* cookie functions */
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  function checkCookie(cname) {
    if(getCookie(cname))
        return true
    return false
  }
/* cookie functions end */
