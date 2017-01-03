import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList
} from 'graphql';

import mongooseModels from './models';
import types from './types';

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    email: types.email.findOne(id => {
      return new Promise((resolve, reject) => {
        mongooseModels.Email.findById(id, (err, email) => {
          if (err) reject(err);
          else resolve(email);
        });
      });
    }),
    emails: types.email.find(() => {
      return new Promise((resolve, reject) => {
        mongooseModels.Email.find((err, emails) => {
          if (err) reject(err);
          else resolve(emails);
        });
      });
    })
  })
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addEmail: types.email.create((root, args) => {
      let email = new mongooseModels.Email({
        title: args.title,
        content: args.content
      });
      return new Promise((resolve, reject) => {
        Promise.all([
          mongooseModels.User.findById(args.sender),
          mongooseModels.User.find({_id: {$in: args.receivers}})
        ])
        .then((sender, receivers) => {
          email.sender = sender;
          email.receivers = receivers;
          email.save((err, email) => {
            if (err) reject(err);
            else resolve(email);
          });
        })
        .catch(reject)
      });
    })
  }
});

export default new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});
