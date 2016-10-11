var apiKey = 'ccfdc66609fc4b7b87258020b85d4380';
var sources = {
    business: [],
    entertainment: [],
    gaming: [],
    general: [],
    music: [],
    science: [],
    sport: [],
    technology: [],
}

$(function () {
    //if (!localStorage.getItem('sources')) {
    //    getSources();
    //} else {
    //    sources = JSON.parse(localStorage.getItem('sources'));
    //}
    getSources();
    $("#categories").sticky({ topSpacing: 0 });
    checkDarkMode();
});
function checkDarkMode() {
    var isTrue = localStorage.getItem('dark-mode');
    console.log(localStorage.getItem('dark-mode'));

    if (isTrue == "true") {
        $('.dark-toggle').addClass('dark-mode');
        $('a').addClass('light-link');
    } else {
        $('.dark-toggle').removeClass('dark-mode');
        $('a').removeClass('light-link');
    }

    $('#dark-check').change(function (e) {
        isTrue = localStorage.getItem('dark-mode');
        console.log(isTrue);
        $('.dark-toggle').toggleClass('dark-mode');
        if (isTrue == "true") {
            localStorage.setItem('dark-mode', "false");
        } else {
            localStorage.setItem('dark-mode', "true");
        }
    });
}

// Get the list of sources
function getSources() {
    $.get('https://newsapi.org/v1/sources?apiKey=' + apiKey)
    .done(function (res) {
        res.sources.map(function (source) {
            switch (source.category) {
                case 'business': sources.business.push(source); break;
                case 'entertainment': sources.entertainment.push(source); break;
                case 'gaming': sources.gaming.push(source); break;
                case 'general': sources.general.push(source); break;
                case 'music': sources.music.push(source); break;
                case 'science-and-nature': sources.science.push(source); break;
                case 'sport': sources.sport.push(source); break;
                case 'technology': sources.technology.push(source); break;
            }
        });
        localStorage.setItem('storage', JSON.stringify(sources));
    });
}

function getSourcesForCategory(category) {
    $('.featured').html('');
    var currentSource = [];
    switch (category) {
        case 'business': currentSource = sources.business; break;
        case 'entertainment': currentSource = sources.entertainment; break;
        case 'gaming': currentSource = sources.gaming; break;
        case 'general': currentSource = sources.general; break;
        case 'music': currentSource = sources.music; break;
        case 'science-and-nature': currentSource = sources.science; break;
        case 'sport': currentSource = sources.sport; break;
        case 'technology': currentSource = sources.technology; break;
        case 'defaut': console.log('You fucked up. Try again.'); break;
    }
    currentSource.map(function (source) {
        console.log(source);
        $.get('https://newsapi.org/v1/articles?sortBy=latest&apiKey=' + apiKey + '&source=' + source.id)
        .done(function (res) {
            res.articles.map(function (item, key) {
                var item_container;
                item_container = $('<div class="post-container">');
                item_container.click(function () {
                    showArticle('' + item.url);
                })

                if (!item.urlToImage) {
                    item_container.append($('<img>').attr('src', '../../lib/images/default_news_icon.svg'));
                } else {
                    item_container.append($('<img onerror="imgError(this)">').attr('src', item.urlToImage));
                }

                item_container.append($('<h4>').text(item.title));
                item_container.append($('<p>').append(item.description));

                $('.featured').append(item_container);
            });
            $(".featured .post-container:nth-child(3n)").addClass('wide');
        });
    });
}

function imgError(image) {
    image.onerror = "";
    image.src = "../../lib/images/default_news_icon.svg";
    return true;
}

function closeSource(source) {
    console.log(source);
    var parent = source.parentElement;
    console.log(parent);
    $(parent).find('.post-container').slideToggle(500);
}

function showArticle(url) {

    window.requestAnimationFrame(function () {
        $('.reader').velocity({
            'display': 'flex',
            'height': '100%',
            opacity: 1,
            duration: 500
        });
        $('.featured').velocity({
            'display': 'none',
            'height': '0',
            opacity: 0,
            duration: 500
        });
        if (localStorage.getItem('dark-mode') == "true") {
            $('.reader').css('background', '#3e3e3e');
        }
        $('.reader').velocity("scroll", { duration: 100, easing: "linear" });
    });
    window.requestAnimationFrame(function () {
        closeAnimation('.featured');
    });
    fetch('http://api.embed.ly/1/extract?key=08ad220089e14298a88f0810a73ce70a&url=' + url)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return false;
            }
        })
        .then(json => {
            var article_container = $('<div class="article-container dark-toggle">');
            if (!json) {
                article_container.append($('<h4>').text('Sorry, but it looks like that article is not longer available.'));
                article_container.append($('<p>').text('Here is the link for the original article: ' + url));
                $('.reader').html(article_container);
                $('.reader').append($('<a id="back-btn" onclick="closeArticle()">').text('Close'));
                return false;
            }

            var article_title = $('<div>');
            article_title.append($('<h3>').text(json.title));

            var article_authors = $('<p>').text('Written by: ');
            if (json.authors) {
                json.authors.map(author => {
                    article_authors.append($('<span>').text(author.name));
                })
            }

            article_title.append(article_authors);


            var attribution_header = $('<div>');
            attribution_header.append('<p>').text('This article was originally published by: ');
            attribution_header.append($('<a>').text(json.provider_display).attr('href', url));

            article_container.append(article_title);
            article_container.append(attribution_header);
            article_container.append(json.content);

            $('.reader').html(article_container);
            $('.reader').append($('<a id="back-btn" onclick="closeArticle()">').text('Close'));
        });
}
function closeArticle() {
    $('.reader').velocity({
        'display': 'none',
        'height': '0',
        opacity: 0,
        duration: 500
    });
    $('.featured').velocity({
        'display': 'flex',
        'height': '100%',
        opacity: 1,
        duration: 500
    });
}