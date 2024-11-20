export default {
    async fetch(request) {
        const { pathname, origin } = new URL(request.url);
        const allowedOrigin = 'https://mylegacyblog.com';

        // Handle CORS pre-flight request
        if (request.method === 'OPTIONS') {
            return handleOptions(request, allowedOrigin);
        }

        // Only allow requests from allowedOrigin
        if (request.headers.get('Origin') !== allowedOrigin) {
            return new Response('Forbidden', { status: 403 });
        }

        // Serve navbar HTML on /load-navbar path
        if (pathname === '/load-navbar' && request.method === 'GET') {
            // Check if the request is coming from HTMX
            if (request.headers.get('HX-Request') === 'true') {
                console.log('HTMX request detected');
            }

            return new Response(getNavbarHTML(), {
                headers: {
                    'Content-Type': 'text/html',
                    'Access-Control-Allow-Origin': allowedOrigin,
                    'Access-Control-Allow-Methods': 'GET, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, HX-Request',
                },
            });
        } else {
            return new Response('Not Found', { status: 404 });
        }
    },
};

// Function to generate the navbar HTML
function getNavbarHTML() {
    const articles = [
        { title: "Planning for Death/Dying", link: "https://mylegacyblog.com/final-wishes" },
        { title: "Final Burial Expenses", link: "https://mylegacyblog.com/burial-expense" },
        { title: "Eco-Friendly Funerals", link: "https://mylegacyblog.com/eco-funerals" },
        { title: "Minimalist Exit", link: "https://mylegacyblog.com/minimalist-exit" },
        { title: "Pet Lovers", link: "https://mylegacyblog.com/posthumous-pet-care" },
        { title: "Protecting Your Family", link: "https://mylegacyblog.com/protecting-family" },
    ];

    // Generate dropdown content first
    const dropdownContent = articles
        .map(
            article =>
                `<a href="${article.link}" style="color: white; text-decoration: none; display: block; margin: 5px 0;">${article.title}</a>`
        )
        .join('');

    // Return the navbar HTML with the processed dropdown content
    return `
        <div id="navbar-container">
            <nav style="display: flex; background-color: #333; padding: 1em; position: relative;">
                <a href="/" style="color: white; text-decoration: none; margin-right: 1em;">Home</a>
                <a href="/about" style="color: white; text-decoration: none; margin-right: 1em;">About</a>
                <a href="/services" style="color: white; text-decoration: none; margin-right: 1em;">Services</a>
                <a href="/contact" style="color: white; text-decoration: none; margin-right: 1em;">Contact</a>
                <div id="articles-dropdown" style="margin-left: auto;">
                    <span style="color: white; text-decoration: none; cursor: pointer;">Articles</span>
                    <div style="display: none; background-color: #444; position: absolute; padding: 1em;">
                        ${dropdownContent}
                    </div>
                </div>
            </nav>
        </div>
    `;
}

// Function to handle CORS preflight requests
function handleOptions(request, allowedOrigin) {
    const headers = {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, HX-Request',
    };
    return new Response(null, { headers });
}
