import { PubSub } from 'graphql-subscriptions';

import Room from "../../../database/models/Room";
import { USER_ENTERED, USER_EXITED } from './channels'

const pubsub = new PubSub();

export default {
  Query: {
    rooms: async () => await Room.find(),
  },
  Mutation: {
    userEntered: async (_, { data }) => {
      const entered = await Room.create(data);

      pubsub.publish(USER_ENTERED, {
        userEnteredSubscription: entered,
      });

      return entered;
    },
    userExited: async (_, { data }) => {
      await Room.deleteOne({ data });

      pubsub.publish(USER_EXITED, {
        userExitedSubscription: data,
      });

      return data;
    },
  },
  Subscription: {
    userEnteredSubscription: {
      subscribe: () => pubsub.asyncIterator(USER_ENTERED),
    },
    userExitedSubscription: {
      subscribe: () => pubsub.asyncIterator(USER_EXITED),
    }
  }
}
