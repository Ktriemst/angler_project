const errorResponseSchema = {
  type: 'object',
  properties: {
    error: { type: 'string' },
    details: { type: 'object', additionalProperties: true },
  },
  required: ['error'],
};

const authResponseSchema = {
  type: 'object',
  properties: {
    user: { $ref: '#/components/schemas/User' },
    accessToken: { type: 'string' },
  },
  required: ['user', 'accessToken'],
};

const tripInputSchema = {
  type: 'object',
  properties: {
    waterBody: { type: 'string', example: 'Lake Ontario' },
    date: { type: 'string', format: 'date', example: '2026-04-19' },
  },
  required: ['waterBody', 'date'],
  additionalProperties: false,
};

const catchInputSchema = {
  type: 'object',
  properties: {
    tripId: { type: 'integer', example: 1 },
    species: { type: 'string', example: 'Smallmouth Bass' },
    weightLbs: { type: 'number', format: 'float', example: 4.2 },
    lengthInches: { type: 'number', format: 'float', example: 18.3 },
    gender: { type: ['string', 'null'], example: 'male' },
    timeCaught: { type: 'string', format: 'date-time', example: '2026-04-19T15:30:00.000Z' },
    pictureUrl: { type: ['string', 'null'], example: 'https://example.com/catches/bass-1.jpg' },
  },
  required: ['tripId', 'species', 'weightLbs', 'lengthInches', 'timeCaught'],
  additionalProperties: false,
};

const spotInputSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', example: 'Owner Public Pier' },
    latitude: { type: 'number', format: 'float', example: 43.655 },
    longitude: { type: 'number', format: 'float', example: -79.384 },
    isPublic: { type: 'boolean', example: true },
  },
  required: ['name', 'latitude', 'longitude'],
  additionalProperties: false,
};

const tripSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer', example: 1 },
    userId: { type: 'integer', example: 1 },
    waterBody: { type: 'string', example: 'Lake Ontario' },
    date: { type: 'string', format: 'date', example: '2026-04-19' },
    catches: {
      type: 'array',
      items: { $ref: '#/components/schemas/Catch' },
    },
  },
  required: ['id', 'userId', 'waterBody', 'date'],
};

const catchSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer', example: 1 },
    tripId: { type: 'integer', example: 1 },
    species: { type: 'string', example: 'Smallmouth Bass' },
    weightLbs: { type: 'number', format: 'float', example: 4.2 },
    lengthInches: { type: 'number', format: 'float', example: 18.3 },
    gender: { type: ['string', 'null'], example: 'male' },
    timeCaught: { type: 'string', format: 'date-time', example: '2026-04-19T15:30:00.000Z' },
    pictureUrl: { type: ['string', 'null'], example: 'https://example.com/catches/bass-1.jpg' },
  },
  required: ['id', 'tripId', 'species', 'weightLbs', 'lengthInches', 'timeCaught'],
};

const spotSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer', example: 1 },
    userId: { type: 'integer', example: 1 },
    name: { type: 'string', example: 'Owner Public Pier' },
    latitude: { type: 'number', format: 'float', example: 43.655 },
    longitude: { type: 'number', format: 'float', example: -79.384 },
    isPublic: { type: 'boolean', example: true },
  },
  required: ['id', 'userId', 'name', 'latitude', 'longitude', 'isPublic'],
};

const baseErrorResponses = {
  '400': {
    description: 'Bad Request',
    content: { 'application/json': { schema: errorResponseSchema } },
  },
  '401': {
    description: 'Unauthorized',
    content: { 'application/json': { schema: errorResponseSchema } },
  },
  '403': {
    description: 'Forbidden',
    content: { 'application/json': { schema: errorResponseSchema } },
  },
  '404': {
    description: 'Not Found',
    content: { 'application/json': { schema: errorResponseSchema } },
  },
};

const openApiSpec = {
  openapi: '3.1.1',
  info: {
    title: 'Angler Logbook API',
    version: '1.0.0',
    description: 'REST API for tracking fishing trips, catches, and fishing spots.',
  },
  servers: [{ url: '/' }],
  tags: [
    { name: 'Auth' },
    { name: 'Trips' },
    { name: 'Catches' },
    { name: 'Fishing Spots' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          email: { type: 'string', format: 'email', example: 'owner@example.com' },
        },
        required: ['id', 'email'],
      },
      SignupRequest: {
        type: 'object',
        properties: {
          email: { type: 'string', format: 'email', example: 'new@example.com' },
          password: { type: 'string', example: 'Password123!' },
        },
        required: ['email', 'password'],
      },
      LoginRequest: {
        type: 'object',
        properties: {
          email: { type: 'string', format: 'email', example: 'owner@example.com' },
          password: { type: 'string', example: 'Password123!' },
        },
        required: ['email', 'password'],
      },
      AuthResponse: authResponseSchema,
      TripInput: tripInputSchema,
      Trip: tripSchema,
      CatchInput: catchInputSchema,
      Catch: catchSchema,
      FishingSpotInput: spotInputSchema,
      FishingSpot: spotSchema,
      ErrorResponse: errorResponseSchema,
    },
  },
  paths: {
    '/api/auth/signup': {
      post: {
        tags: ['Auth'],
        summary: 'Create a new user account',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SignupRequest' },
              example: { email: 'new@example.com', password: 'Password123!' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Account created',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } },
          },
          '400': baseErrorResponses['400'],
          '409': {
            description: 'Email already exists',
            content: { 'application/json': { schema: errorResponseSchema } },
          },
        },
      },
    },
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Log in and receive a JWT',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginRequest' },
              example: { email: 'owner@example.com', password: 'Password123!' },
            },
          },
        },
        responses: {
          '200': {
            description: 'JWT issued',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } },
          },
          '400': baseErrorResponses['400'],
          '401': baseErrorResponses['401'],
        },
      },
    },
    '/api/trips': {
      get: {
        tags: ['Trips'],
        summary: 'List trips owned by the authenticated user',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Trips returned',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Trip' } },
              },
            },
          },
          '401': baseErrorResponses['401'],
        },
      },
      post: {
        tags: ['Trips'],
        summary: 'Create a trip',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/TripInput' },
              example: { waterBody: 'Lake Ontario', date: '2026-04-19' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Trip created',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Trip' } } },
          },
          '400': baseErrorResponses['400'],
          '401': baseErrorResponses['401'],
        },
      },
    },
    '/api/trips/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer', minimum: 1 },
          example: 1,
        },
      ],
      get: {
        tags: ['Trips'],
        summary: 'Get one trip owned by the authenticated user',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Trip returned',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Trip' } } },
          },
          '400': baseErrorResponses['400'],
          '401': baseErrorResponses['401'],
          '403': baseErrorResponses['403'],
          '404': baseErrorResponses['404'],
        },
      },
      put: {
        tags: ['Trips'],
        summary: 'Update a trip owned by the authenticated user',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/TripInput' },
              example: { waterBody: 'Erie Canal', date: '2026-04-20' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Trip updated',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Trip' } } },
          },
          '400': baseErrorResponses['400'],
          '401': baseErrorResponses['401'],
          '403': baseErrorResponses['403'],
          '404': baseErrorResponses['404'],
        },
      },
      delete: {
        tags: ['Trips'],
        summary: 'Delete a trip owned by the authenticated user',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Trip deleted',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Trip' } } },
          },
          '400': baseErrorResponses['400'],
          '401': baseErrorResponses['401'],
          '403': baseErrorResponses['403'],
          '404': baseErrorResponses['404'],
        },
      },
    },
    '/api/catches': {
      get: {
        tags: ['Catches'],
        summary: 'List catches across the authenticated user\'s trips',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Catches returned',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Catch' } },
              },
            },
          },
          '401': baseErrorResponses['401'],
        },
      },
      post: {
        tags: ['Catches'],
        summary: 'Create a catch for one of the authenticated user\'s trips',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CatchInput' },
              example: {
                tripId: 1,
                species: 'Smallmouth Bass',
                weightLbs: 4.2,
                lengthInches: 18.3,
                gender: 'male',
                timeCaught: '2026-04-19T15:30:00.000Z',
                pictureUrl: 'https://example.com/catches/bass-1.jpg',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Catch created',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Catch' } } },
          },
          '400': baseErrorResponses['400'],
          '401': baseErrorResponses['401'],
          '403': baseErrorResponses['403'],
          '404': baseErrorResponses['404'],
        },
      },
    },
    '/api/catches/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer', minimum: 1 },
          example: 1,
        },
      ],
      get: {
        tags: ['Catches'],
        summary: 'Get one catch owned by the authenticated user',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Catch returned',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Catch' } } },
          },
          '400': baseErrorResponses['400'],
          '401': baseErrorResponses['401'],
          '403': baseErrorResponses['403'],
          '404': baseErrorResponses['404'],
        },
      },
      put: {
        tags: ['Catches'],
        summary: 'Update a catch owned by the authenticated user',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CatchInput' },
              example: {
                tripId: 1,
                species: 'Smallmouth Bass',
                weightLbs: 4.8,
                lengthInches: 19.1,
                gender: 'female',
                timeCaught: '2026-04-19T16:00:00.000Z',
                pictureUrl: 'https://example.com/catches/bass-2.jpg',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Catch updated',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Catch' } } },
          },
          '400': baseErrorResponses['400'],
          '401': baseErrorResponses['401'],
          '403': baseErrorResponses['403'],
          '404': baseErrorResponses['404'],
        },
      },
      delete: {
        tags: ['Catches'],
        summary: 'Delete a catch owned by the authenticated user',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Catch deleted',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Catch' } } },
          },
          '400': baseErrorResponses['400'],
          '401': baseErrorResponses['401'],
          '403': baseErrorResponses['403'],
          '404': baseErrorResponses['404'],
        },
      },
    },
    '/api/spots': {
      get: {
        tags: ['Fishing Spots'],
        summary: 'List public spots and spots owned by the authenticated user',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Fishing spots returned',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/FishingSpot' } },
              },
            },
          },
          '401': baseErrorResponses['401'],
        },
      },
      post: {
        tags: ['Fishing Spots'],
        summary: 'Create a fishing spot',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/FishingSpotInput' },
              example: {
                name: 'Owner Public Pier',
                latitude: 43.655,
                longitude: -79.384,
                isPublic: true,
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Fishing spot created',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/FishingSpot' } } },
          },
          '400': baseErrorResponses['400'],
          '401': baseErrorResponses['401'],
        },
      },
    },
    '/api/spots/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer', minimum: 1 },
          example: 1,
        },
      ],
      get: {
        tags: ['Fishing Spots'],
        summary: 'Get one fishing spot if it is public or owned by the authenticated user',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Fishing spot returned',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/FishingSpot' } } },
          },
          '400': baseErrorResponses['400'],
          '401': baseErrorResponses['401'],
          '403': baseErrorResponses['403'],
          '404': baseErrorResponses['404'],
        },
      },
      put: {
        tags: ['Fishing Spots'],
        summary: 'Update a fishing spot owned by the authenticated user',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/FishingSpotInput' },
              example: {
                name: 'Owner Public Pier Updated',
                latitude: 43.656,
                longitude: -79.385,
                isPublic: false,
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Fishing spot updated',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/FishingSpot' } } },
          },
          '400': baseErrorResponses['400'],
          '401': baseErrorResponses['401'],
          '403': baseErrorResponses['403'],
          '404': baseErrorResponses['404'],
        },
      },
      delete: {
        tags: ['Fishing Spots'],
        summary: 'Delete a fishing spot owned by the authenticated user',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Fishing spot deleted',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/FishingSpot' } } },
          },
          '400': baseErrorResponses['400'],
          '401': baseErrorResponses['401'],
          '403': baseErrorResponses['403'],
          '404': baseErrorResponses['404'],
        },
      },
    },
  },
};

export default openApiSpec;