import { buildApp } from "./app";

async function start() {
    const app = await buildApp();

    const PORT = Number(process.env.PORT) || 3000;

    app.listen({ port: PORT, host: '0.0.0.0'})
        .then(() => {
            console.log(`Server running on port ${PORT}`);
        })
        .catch((err) => {
            app.log.error(err);
            process.exit(1);
        });
}

start();