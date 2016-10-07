$(function () {

    $(window).scroll(function (e) {
        didScroll = true;
    });

    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 500);

    $("img.lazy").lazyload();

    if (localStorage.getItem('today') && localStorage.getItem('tech') && localStorage.getItem('vehicles')) {
        articles.today_articles_array = JSON.parse(localStorage.getItem('today'));
        articles.tech_articles_array = JSON.parse(localStorage.getItem('tech'));
        articles.sports_articles_array = JSON.parse(localStorage.getItem('vehicles'));
        openCity(event, 'tab_today');
    } else {
        fetchAll();
        openCity(event, 'tab_today');
        setInterval(function () {
            fetchAll();
        }, 120000);
    }
});

var articles = {
    today_articles_array: [],
    tech_articles_array: [],
    vehicles_articles_array: []
};

function getQuery(form) {
    var data = $(form).serializeArray();
    var query;
    $('.webpages').html('');
    data.map(obj => {
        if (obj.name === "search") {
            query = obj;
        }
    });
    fetchToday(query);
}

function openModal(uuid, tab) {
    var tag = $('#' + uuid);

    var modal = $('<div class="modal col-xs-12 col-lg-6">');
    $('body').append(
        $('<a class="modal-close">').attr('onclick', 'closeModal("' + tab + '")').text('X'));

    var readableText;

    var currentArray = getCurrentArray(tab);
    currentArray.map(post => {
        if (post.uuid === uuid) {
            readableText = post.text.replace(/\n/g, '');
            var formattedText = post.text.replace(/\n/g, "</p><p>").trim();
            var article = $('<p class="article-text">');
            article.append(formattedText);
            modal.append(article);
        }
    });

    /*$('.tab').append($('<input class="button voice-button" type="button" value="play">').click(function () {
        responsiveVoice.speak(readableText, 'US English Female');
    }));

    $('.tab').append($('<input class="button voice-button" type="button" value="stop">').click(function () {
        responsiveVoice.cancel();
    }));
    */

    $('#' + tab).html(modal);
    $('#' + tab).prepend(tag);
    window.scroll(0, 0);
    window.scroll(10, 0);
    window.scroll(0, 0);
}

function getCurrentArray(tab) {
    var currentArray = [];
    switch (tab) {
        case 'tab_today': currentArray = articles.today_articles_array; break;
        case 'tab_tech': currentArray = articles.tech_articles_array; break;
        case 'tab_vehicles': currentArray = articles.sports_articles_array; break;
        case 'default': console.log('ERROR: You seem to be looking for a page that is nonexistent.', tab);
    }
    return currentArray;
}

function closeModal(tab) {
    var currentTab = $('#' + tab);
    currentTab.html('');
    $('.modal-close').remove();
    $('.voice-button').remove();
    displayArticles(tab);
}


function imgError(image) {
    $(image).attr('src', '/lib/images/default_news_icon.svg');
    $(image).onerror = null;
    return;
}
function displayArticles(tab) {
    var currentArray = getCurrentArray(tab);
    var currentTab = $('#' + tab);
    currentTab.html('');

    currentArray.map((post, key) => {

        var post_container = $('<div class="post col-xs-12 col-sm-6 col-md-4 col-lg-3">').attr('onclick', 'openModal("' + post.uuid + '","' + tab + '")').attr('id', post.uuid);

        var post_image = $('<div class="post-image">');
        if (post.thread.main_image !== null) {
            var imgUrl = post.thread.main_image;
            post_image.append($('<img class="lazy" onerror="imgError(this)">').attr('src', imgUrl));
        } else {
            post_image.append($('<img class="lazy" original="/lib/images/default_news_icon.svg">').attr('src', '/lib/images/default_news_icon.svg'));
        }

        //var formattedText = post.text.replace(/\n/g, "</p><p>").trim();
        //var article = $('<p class="article-text">');
        //article.append(formattedText);
        //article.append($('<hr/>'));
        //post_container.append(article);


        post_container.append($('<div class="post-header">').append(
            $('<p>').text(post.title)));

        post_container.prepend(post_image);
        currentTab.append(post_container);

        if (key % 25 === 0 && key > 0) {
            currentTab.append($('<div class="quote">')
                .append($('<p>').text('Inspirational Quotes here')));
        }
    });

    //console.log(articles);
}

function clearStorage() {
    localStorage.clear();
}
function fetchAll() {
    localStorage.clear();
    articles.today_article_array = [];
    articles.tech_articles_array = [];
    articles.sports_articles_array = [];

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    var base_url = 'https://webhose.io/';
    var param = 'search?token=ac283902-3c83-4eb5-baf3-8108376e137e&q=language:(english) performance_score:>3';

    fetchToday(base_url + param, myInit);
    fetchTech(base_url + param, myInit);
    fetchSports(base_url + param, myInit);
}

function fetchTech(url, myInit) {
    var query_url = url + ' site_category:tech';
    var myRequest = new Request(query_url, myInit);
    fetch(myRequest, myInit)
        .then(res => {
            return res.json();
        })
        .then(json => {
            json.posts.map(post => {
                articles.tech_articles_array.push(post);
            });
            localStorage.setItem("tech", JSON.stringify(articles.tech_articles_array));
        });
}
function fetchSports(url, myInit) {
    var query_url = url + ' site_category:vehicles';
    var myRequest = new Request(query_url, myInit);
    fetch(myRequest, myInit)
        .then(res => {
            return res.json();
        })
        .then(json => {
            json.posts.map(post => {
                articles.vehicles_articles_array.push(post);
            });
            localStorage.setItem("vehicles", JSON.stringify(articles.vehicles_articles_array));
        });
}
function fetchToday(url, myInit) {
    var query_url = url;
    var myRequest = new Request(query_url, myInit);
    fetch(myRequest, myInit)
        .then(res => {
            return res.json();
        })
        .then(json => {
            json.posts.map(post => {
                articles.today_articles_array.push(post);
            });
            localStorage.setItem("today", JSON.stringify(articles.today_articles_array));
        });
}

function openCity(e, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    displayArticles(tabName);
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(tabName).style.display = "flex";
    //evt.currentTarget.className += " active";
    if (e) {
        e.target.className += " active";
    }
}

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.header').height();

function hasScrolled() {
    var st = $(window).scrollTop();
    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        $('header').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if (st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
        }
    }

    lastScrollTop = st;
}