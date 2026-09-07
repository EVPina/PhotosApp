import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application, Request, Response } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Photo Album API',
      version: '1.0.0',
      description: 'API para gestión de álbumes de fotos con Cloudinary',
    },
    servers: [
      {
        url: 'http://localhost:3001/api',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'accessToken',
        },
      },
    },
  },
  apis: [
    './src/infrastructure/webserver/routes/*.ts', // rutas documentadas
    './src/interfaces/controllers/*.ts',          // controladores con anotaciones
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Application): void {
  // Ruta para la documentación
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

   // Redirigir la raíz a la documentación
  app.get('/', (_req: Request, res: Response) => {
    res.redirect('/api/docs');
  });

  // Ruta para obtener el JSON de Swagger (útil para testing)
  app.get('/api/docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}