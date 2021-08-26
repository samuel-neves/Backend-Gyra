import Message from "../../../database/models/Message";

export default {
  Query: {
    messages: () => Message.find(),
    messagesByRoom: (_, { room }) => Message.find({ room: room }),
  },
  Mutation: {
    createMessage: (_, { data }) => Message.create(data),
  }
}
