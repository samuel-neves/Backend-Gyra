import Message from "../../../database/models/Message";

export default {
  Query: {
    messages: async () => await Message.find().sort({ date:-1 }),
    messagesByRoom: async (_, { room }) => await Message.find({ room: room }).sort({ date:-1 }),
  },
  Mutation: {
    createMessage: (_, { data }) => Message.create(data),
  }
}
