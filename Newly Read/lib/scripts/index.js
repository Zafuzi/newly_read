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
    if (!localStorage.getItem('sources')) {
        getSources();
    } else {
        sources = JSON.parse(localStorage.getItem('sources'));
    }
});

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
                    window.location.replace("../Article/?id=" + item.url);
                });

                if (!item.urlToImage) {
                    item_container.append($('<img>').attr('src', '../../lib/images/default_news_icon.svg'));
                } else {
                    item_container.append($('<img onerror="imgError(this)">').attr('src', item.urlToImage));
                }


                item_container.append(
                    $('<a href="../Article/?id=' + item.url + '">').text(item.title)
                );
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