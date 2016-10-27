var sources = {
    business: [],
    entertainment: [],
    gaming: [],
    general: [],
    music: [],
    science: [],
    sport: [],
    technology: [],
};

$(function () {
    getSources();
    $("#categories").sticky({ topSpacing: 0 });
    checkDarkMode();
    setClickListeners();
});

function setClickListeners() {

    $('.dropdown').bind("click", function (e) {
        event.stopPropagation();
        $('.dropdown-content').css('display', 'none');
        var thisDropdown = e.currentTarget;
        var list = $(e.currentTarget).find('ul')[0];

        switch (list.style.display) {
            case 'none':
                $(list).css({
                    'display': 'flex'
                });
                break;

            case 'flex':
                $(list).css({
                    'display': 'none'
                });
                break;

            default:
                $(list).css({
                    'display': 'flex'
                });
                break;
        }
    });

    $(window).click(function (e) {
        if ($('.dropdown-content').css({
            'display': 'flex'
        })) {
            $('.dropdown-content').css({
                'display': 'none'
            });
        } else {
            return;
        }
    });
}

function checkDarkMode() {
    var isTrue = localStorage.getItem('dark-mode');

    if (isTrue == "true") {
        $('#dark-check').attr("checked", "true");
        $('.dark-toggle').addClass('dark-mode');
        $('a').addClass('light-link');
    } else {
        $('#dark-check').attr("unchecked");
        $('.dark-toggle').removeClass('dark-mode');
        $('a').removeClass('light-link');
    }

    $('#dark-check').change(function (e) {
        isTrue = localStorage.getItem('dark-mode');
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
    $.get('../../Sources/GetSources')
    .done(function (res) {
        res = JSON.parse(res);
        res.map(function (source) {
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
        localStorage.setItem('sources', JSON.stringify(sources));
    });
}

function getSourcesForCategory(category) {
    $('.featured').html('');

    var sourceArray = [];
    $.get("../../Sources/GetArticles/?category=" + category)
            .fail(function (res) {
                console.log("failed to load articles for source", source.sourceID);
            })
            .done(function (res) {
                res = JSON.parse(res);
                console.log(res);
                res.map(function (item, key) {
                    sourceArray.push(item);
                });
                console.log(sourceArray);
                appendArticle(sourceArray);
            });
}

function appendArticle(array) {
    // Used to shuffle array order
    //array = shuffleArray(array);

    array.map(function (item, key) {
        var item_container = $('<div class="post-container">');

        //var item_content = $('<a class="article-link">').attr('href', '../Article/?url=' + item.url);
        var item_content = $('<a class="article-link">').click(function () {
            showArticle('' + item.url);
        });

        var shareBar = $('<div class="sharebar">');
        var shareSaver = $('<p>Save this Article</p>');
        shareSaver.click(function (e) {
            console.log(item.url);

            alert("Sorry this feature isn't ready for primetime just yet.");
        });
        shareSaver.append($('<i class="material-icons">').text('save'));

        shareBar.append(shareSaver);
        //shareBar.append($('<p>').append($('<i class="material-icons">').text('comment')));

        var sharebar_votes = $('<p>');
        sharebar_votes.append($('<i class="material-icons">').text('keyboard_arrow_up'));
        sharebar_votes.append($('<i class="material-icons">').text('keyboard_arrow_down'));
        sharebar_votes.append($('<small>').text("500"));
        //shareBar.append(sharebar_votes);

        item_content.append($('<p class="thread">').text(item.author));
        item_content.append($('<p>').append(item.title));
        if (!item.urlToImage) {
            item_content.append($('<img>').attr('src', '../../lib/images/default_news_icon.svg'));
        } else {
            item_content.append($('<img onerror="imgError(this)">').attr('src', item.urlToImage));
        }

        item_container.append(item_content);
        item_container.append(shareBar);
        $('.featured').append(item_container);
    });
    //$(".featured .post-container:nth-child(3n)").addClass('wide');
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
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

function showArticle(url, articleID) {

    if (window.innerWidth > 768) {
        $('.right-container').velocity({
            'opacity': '0',
        }, { duration: 100 });
    } else {
        $('.left-container').velocity({
            'position': 'fixed'
        }, { duration: 250, delay: 200 });

        $('.inner_nav').velocity({
            'display': 'flex',
            'height': '32px'
        }, { duration: 250, delay: 50 });
        $('#back-btn').velocity({
            'opacity': '1'
        }, { duration: 250, delay: 50 });
        $('header').velocity({
            'height': '0'
        }, { duration: 250, delay: 200 });
    }

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
                return;
            }

            var article_title = $('<div>');
            article_title.append($('<h3>').text(json.title));

            var article_authors = $('<p>').text('Written by: ');
            if (json.authors) {
                json.authors.map(author => {
                    article_authors.append($('<span>').text(author.name));
                });
            };

            article_title.append(article_authors);


            var attribution_header = $('<div>');
            attribution_header.append('<p>').text('This article was originally published by: ');
            attribution_header.append($('<a>').text(json.provider_display).attr('href', url));

            article_container.append(article_title);
            article_container.append(attribution_header);
            article_container.append(json.content);

            $('.reader').html(article_container);
            $('.reader').prepend($('<span id="top">'));
        });

    if (window.innerWidth > 768) {
        $('.right-container').velocity({
            'opacity': '1'
        }, { duration: 250, delay: 350 });
    } else {
        $('.right-container').velocity({
            'display': 'flex',
            'left': '0'
        }, { duration: 250, delay: 200 });
    }
}
function closeArticle() {
    if (window.innerWidth > 768) {
        $('.right-container').velocity({
            'opacity': '0',
        }, { duration: 250, delay: 50 });
    } else {
        $('.left-container').velocity({
            'display': 'flex',
            'left': '0'
        }, { duration: 250, delay: 50 });
        $('.right-container').velocity({
            'display': 'none',
            'left': '100vw'
        }, { duration: 250, delay: 50 });
        $('.inner_nav').velocity({
            'height': '0'
        }, { duration: 250, delay: 50 });
        $('#back-btn').velocity({
            'opacity': '0'
        }, { duration: 250, delay: 50 });
        $('header').velocity({
            'height': '48px'
        }, { duration: 250, delay: 200 });
    }
    setTimeout(function () {
        $(".reader").html('');
    }, 250);
}