import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList
} from 'graphql';

const ReceiverType = new GraphQLObjectType({
  name: 'receiver',
  fields: () => ({
    email: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    category: { type: GraphQLString },
    isDeleted: { type: GraphQLBoolean },
    isImportant: { type: GraphQLBoolean }
  })
});

const SenderType = new GraphQLObjectType({
  name: 'sender',
  fields: () => ({
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString }
  })
});

const EmailType = new GraphQLObjectType({
  name: 'email',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    sender: { type: SenderType },
    receivers: { type: new GraphQLList(ReceiverType) }
  })
});

function find(resolve) {
  return {
    type: new GraphQLList(EmailType),
    resolve
  };
}

function findOne(resolve) {
  return {
    args: {
      id: { type: GraphQLID }
    },
    type: EmailType,
    resolve
  };
}

function create(resolve) {
  return {
    args: {
      title: {
        name: 'Todo title',
        type: new GraphQLNonNull(GraphQLString)
      },
      content: { type: GraphQLString }
    },
    type: EmailType,
    description: 'Create an email',
    resolve
  };
}

export default {
  find,
  findOne,
  create
};
