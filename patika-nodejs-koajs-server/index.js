const koa = require('koa');

const app = new koa();

const port = 3000;

app.use(ctx => {
    const path = ctx.path;
    switch (path) {
        case '/':
            ctx.status = 200;
            ctx.body = '<h1 style="color:black">Index Page</h1>';
            break;
        case '/about':
            ctx.status = 200;
            ctx.body = '<h1 style="color:blue">About Page</h1>';
            break;
        case '/contact':
            ctx.status = 200;
            ctx.body = '<h1 style="color:green">Contact Page</h1>';
            break;
        default:
            ctx.status = 404;
            ctx.body = '<h1 style="color:red">404 Page Not Found</h1>';
            break;
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});