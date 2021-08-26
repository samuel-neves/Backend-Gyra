import { PubSub } from 'graphql-subscriptions';

import Message from "../../../database/models/Message";
import { MESSAGE_CREATED } from './channels'

const pubsub = new PubSub();

export default {
  Query: {
    messages: async () => await Message.find().sort({ date:-1 }),
    messagesByRoom: async (_, { room }) => await Message.find({ room: room }).sort({ date:-1 }),
  },
  Mutation: {
    createMessage: async (_, { data }) => {
      const message = await Message.create(data);

      pubsub.publish(MESSAGE_CREATED, {
        messageCreated: message,
      });

      return message;
    },
  },
  Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterator(MESSAGE_CREATED),
    }
  }
}
