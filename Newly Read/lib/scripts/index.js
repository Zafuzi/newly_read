var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
var myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
};

var base_url = "https://webhose.io/search?token=ac283902-3c83-4eb5-baf3-8108376e137e&q=language:(english)%20performance_score:>3%20(site_type:news%20OR%20site_type:blogs)%20";

$(function () {
    responsiveVoice.cancel();
    if (localStorage.getItem('today')) {
        articles.today_articles_array = JSON.parse(localStorage.getItem('today'));
    } else {
        fetchToday(base_url);
    }

    if (localStorage.getItem('tech')) {
        articles.tech_articles_array = JSON.parse(localStorage.getItem('tech'));
    } else {
        fetchTech(base_url);
    }

    if (localStorage.getItem('vehicles')) {
        articles.vehicles_articles_array = JSON.parse(localStorage.getItem('vehicles'));
    } else {
        fetchVehicles(base_url);
    }

    openCity(null, 'tab_today');

    $('form').submit(function (e) {
        e.preventDefault();
    });

    setTimeout(function () {
        $('#loading').css({
            'display': 'none'
        });
    }, 2000);
});

var articles = {
    today_articles_array: [],
    tech_articles_array: [],
    vehicles_articles_array: []
};

function getQuery(form, e) {
    var data = $(form).serializeArray();
    var query;
    localStorage.removeItem('today');
    $('#tab_today').html('');
    data.map(obj => {
        if (obj.name === "search") {
            query = obj;
        }
    });
    fetchToday(base_url + query);
    articles.today_articles_array = JSON.parse(localStorage.getItem('today'));
    displayArticles('tab_today');
}

function openModal(uuid, tab) {
    var tag = $('#' + uuid);

    var modal = $('<div class="modal col-xs-12 col-sm-6 col-md-6 col-lg-4">');
    $('body').append(
        $('<a class="modal-close">').attr('onclick', 'closeModal("' + tab + '"); responsiveVoice.cancel();').append($('<i class="material-icons">').text('keyboard_arrow_left')));

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

    $(modal).prepend($('<input class="button voice-button" type="button" value="stop">').click(function () {
        responsiveVoice.cancel();
    }));
    $(modal).prepend($('<input class="button voice-button" type="button" value="play">').click(function () {
        responsiveVoice.speak(readableText, 'US English Female');
    }));

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
        case 'tab_vehicles': currentArray = articles.vehicles_articles_array; break;
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
    var articleContainer = $('<div class="post-container row">');
    currentArray.map((post, key) => {
        if (key > 35) {
            return false;
        }
        if (!post) {
            return false;
        }
        var post_container = $('<div class="post col-xs-12 col-sm-6 col-md-4 col-lg-3">').attr('onclick', 'openModal("' + post.uuid + '","' + tab + '")').attr('id', post.uuid);

        var post_image = $('<div class="post-image">');
        if (post.thread.main_image !== null) {
            var imgUrl = post.thread.main_image;
            post_image.append($('<img class="lazy" onerror="imgError(this)">').attr('src', imgUrl));
        } else {
            post_image.append($('<img class="lazy" original="/lib/images/default_news_icon.svg">').attr('src', '/lib/images/default_news_icon.svg'));
        }

        post_container.append($('<div class="post-header">').append(
            $('<p>').text(post.title)));

        post_container.prepend(post_image);
        articleContainer.append(post_container);
    });
    currentTab.html(articleContainer);
}

function clearStorage() {
    localStorage.clear();
    fetchAll();
    location.reload();
}

function fetchAll() {
    localStorage.clear();
    fetchToday(base_url);
    fetchTech(base_url);
    fetchVehicles(base_url);
}

function fetchTech(url) {
    articles.tech_articles_array = [];
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

function fetchVehicles(url) {
    articles.Vehicles_articles_array = [];
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

function fetchToday(url) {
    articles.today_article_array = [];
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
            openCity(null, 'tab_today')
        });
}

function openCity(e, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
    responsiveVoice.cancel();

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
}

$(".menu").unbind('change');
$('.menu').change(function () {
    var option = $(this).find('option:selected');
    var optionValue = option.val();
    if (optionValue == "Refresh") {
        clearStorage();
    } else {
        openCity(this, optionValue.toString());
    }
});