$(function () {
    getSources();
    $('img[data-failover]').on('error', function () {

    });
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