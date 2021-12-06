module.exports = {
  '/weets': {
    get: {
      tags: ['CRUD operations'],
      description: 'Get weets',
      operationId: 'getWeets',
      parameters: [
        {
          name: 'page',
          in: 'query',
          schema: {
            type: 'integer',
            default: 1
          },
          required: false
        }
      ],
      responses: {
        200: {
          description: 'Weets were obtained'
        }
      }
    }
  }
};
