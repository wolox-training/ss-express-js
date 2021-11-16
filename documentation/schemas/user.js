module.exports = {
  userId: {
    type: 'integer',
    example: 7
  },
  userFirstName: {
    type: 'string',
    example: 'Tom'
  },
  userLastName: {
    type: 'string',
    example: 'Engels'
  },
  userEmail: {
    type: 'string',
    example: 'tom.engels@wolox.com.ar'
  },
  User: {
    type: 'object',
    properties: {
      id: {
        $ref: '#/components/schemas/userId'
      },
      firstName: {
        $ref: '#/components/schemas/userFirstName'
      },
      lastName: {
        $ref: '#/components/schemas/userLastName'
      },
      email: {
        $ref: '#/components/schemas/userEmail'
      }
    }
  },
  Users: {
    type: 'object',
    properties: {
      users: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/User'
        }
      }
    }
  }
};
