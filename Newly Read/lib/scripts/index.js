$(function () {
    getSources();
    $('img[data-failover]').on('error', function () {

    });
    getWikis();
});
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
    });
}
// Get the list of sources and 
// then the articles for each source in a category
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
    }
    currentSource.map(function (source) {
        $.get('https://newsapi.org/v1/articles?apiKey=' + apiKey + '&source=' + source.id)
        .done(function (res) {
            //console.log(res);
            //Container for each sources articles
            var source_container = $('<div class="source-container">');
                // Source header and collapse button
                var source_header = $('<div class="source-header" onclick="closeSource(this)">');
                    var source_header_tag = $('<h3 class="source-header-tag">').text(source.id);
                    var source_header_collapse = $('<i class="material-icons">').text('keyboard_arrow_down');
                source_header.append(source_header_tag).append(source_header_collapse);
            source_container.append(source_header).append($('<hr/>'));

            res.articles.map(function (article) {
                var article_container = $('<div class="post-container">');
                    var article_card = $('<div class="post card-square">');
                    article_card.append($('<a class="post-header" target="_blank">').attr('href', article.url).text(article.title).append($('<br/>')).append($('<span>').text(article.author)));

                    if (article.urlToImage != null) {
                        article_card.prepend($('<img data-failover="/lib/images/default_news_icon.svg" onerror="imgFailover(this)">').attr('src', article.urlToImage));
                    } else {
                        article_card.prepend($('<img src="/lib/images/default_news_icon.svg">'));
                    }
                article_container.append(article_card);
                source_container.append(article_container);

                $('.featured').append(source_container);
            });
        });
    });
}

function openArticle(article) {
    console.log(article);
}

function closeSource(source) {
    console.log(source);
    var parent = source.parentElement;
    console.log(parent);
    $(parent).find('.post-container').slideToggle(500);
}

function imgFailover(img) {
    var failover = $(img).data('failover');
    if (img.src != failover) {
        img.src = failover;
    }
}

function display(item) {
    var item_container = $('<div class="post-container">');
    item_container.append(
        $('<a href="Home/Article/?id=' + item.guid + '">').text(item.title)
    );
    var string = $.parseHTML(item.description);
    string.map((node, key) => {
        if (node.nodeName == "A") {
            string[key] = '';
        }
    })
    item_container.append($('<p>').append(string));
    $('.featured').append(item_container);
}
function getArticle(source) {
    var url = $(source).attr('id');
    fetch('http://api.embed.ly/1/extract?key=08ad220089e14298a88f0810a73ce70a&url=' + url)
    .then(res => {
        return res.json();
    })
    .then(json => {
        console.log(json);
        var article_container = $('<div class="post_container card">');
        article_container.append(json.content);
        $('.featured').html(article_container);
    });
    console.log(url);
}

var superFeedrApiKey = 'f500f82c2dc5c5d6814518fbe1f90c6d';
function getWikis() {
    var rss2json = 'http://rss2json.com/api.json?rss_url=';
    var rss = ['http://rss.nytimes.com/services/xml/rss/nyt/Technology.xml', 'https://www.wired.com/feed', '	http://feeds.bbci.co.uk/news/world/rss.xml'];
    rss.map(function (url) {
        fetch(rss2json + url).then(res => { 
            return res.json();
        })
        .then(json => {
            console.log(json);
            $('.featured').append('<hr/>');
            json.items.map(item => {
                display(item);
            });
            
        })
    })
}