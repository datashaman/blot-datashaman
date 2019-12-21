{{{appJS}}}

const activities = {
    like: 'liked this',
    link: 'linked to this',
    repost: 'reposted this',
    reply: 'replied to this',
};

jQuery(function ($) {
    feather.replace();
    $('.mentions').each(function () {
        const $mentions = $(this);

        $mentions.empty();

        $.getJSON('https://webmention.io/api/mentions?jsonp=?', {
            target: window.location.href
        }, function (data) {
            if (!data.links.length) {
                return;
            }

            $(data.links).each(function (index, mention) {
                $('#mention-template')
                    .clone()
                    .contents()
                    .find('.u-photo')
                        .attr('src', mention.data.author.photo)
                        .attr('title', mention.data.author.name)
                    .end()
                    .find('.mention-photo .u-author')
                        .attr('href', mention.data.author.url)
                    .end()
                    .find('.mention-card .u-author')
                        .attr('href', mention.data.author.url)
                        .text(mention.data.author.name)
                    .end()
                    .find('.activity')
                        .text(activities[mention.activity.type])
                    .end()
                    .find('.u-url')
                        .attr('href', mention.source)
                    .end()
                    .find('.dt-published')
                        .attr('datetime', mention.data.published)
                        .attr('title', new Date(mention.data.published))
                        .text(vagueTime.get({to: new Date(mention.data.published)}))
                    .end()
                    .find('.e-content')
                        .html(mention.data.content)
                    .end()
                    .appendTo($mentions);
            });
        }).fail(console.error);
    });
});
