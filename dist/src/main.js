"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'), {
        prefix: '/uploads/',
    });
    app.enableShutdownHooks();
    process.on('SIGTERM', async () => {
        await app.close();
        process.exit(0);
    });
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    const port = parseInt(process.env.PORT ?? '5000');
    await app.listen(port);
    console.log(`🚀 Backend is running on: http://localhost:${port}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map