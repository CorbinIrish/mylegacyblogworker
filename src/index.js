export default {
    async fetch(request) {
        const { pathname } = new URL(request.url);
        const allowedOrigin = 'https://mylegacyblog.com';

        if (request.method === 'OPTIONS') {
            return handleOptions(allowedOrigin);
        }

        if (pathname === '/load-navbar' && request.method === 'GET') {
            return new Response(getNavbarHTML(), {
                headers: {
                    'Content-Type': 'text/html',
                    'Access-Control-Allow-Origin': allowedOrigin,
                    'Access-Control-Allow-Methods': 'GET, OPTIONS',
                    'Access-Control-Allow-Headers': getAllowedHeaders(),
                },
            });
        }

        return new Response('Not Found', { status: 404 });
    },
};

function getNavbarHTML() {
    const articles = [
        { title: "Planning for Death/Dying", link: "https://mylegacyblog.com/final-wishes" },
        { title: "Final Burial Expenses", link: "https://mylegacyblog.com/burial-expense" },
        { title: "Eco-Friendly Funerals", link: "https://mylegacyblog.com/eco-funerals" },
        { title: "Minimalist Exit", link: "https://mylegacyblog.com/minimalist-exit" },
        { title: "Pet Lovers", link: "https://mylegacyblog.com/posthumous-pet-care" },
        { title: "Protecting Your Family", link: "https://mylegacyblog.com/protecting-family" },
    ];

    const articlesHTML = articles
        .map(article => `<a href="${article.link}" style="display: block; padding: 5px 0; color: white;">${article.title}</a>`)
        .join('');

    return `
        <div id="navbar-container">
            <nav style="background-color: #333; color: white; padding: 10px;">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li class="dropdown">
                        <a href="#">Articles</a>
                        <div class="dropdown-content" style="display: none; position: absolute; background-color: #424242; padding: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);">
                            ${articlesHTML}
                        </div>
                    </li>
                    <li><a href="tel:2393504100">239-350-4100</a></li>
                </ul>
            </nav>
        </div>
    `;
}

function handleOptions(allowedOrigin) {
    const headers = {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': getAllowedHeaders(),
    };
    return new Response(null, { headers });
}

function getAllowedHeaders() {
    return [
        'Content-Type',
        'HX-Request',
        'HX-Trigger',
        'HX-Target',
        'HX-Current-URL',
        'HX-Prompt',
        'HX-Trigger-Name',
    ].join(', ');
}
