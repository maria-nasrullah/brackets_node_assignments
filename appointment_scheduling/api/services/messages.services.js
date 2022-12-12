const { default: mongoose } = require('mongoose')
const Message = require('../models/messages')

const createMessage = async message => {
  console.log('*** creating message ***')
message.senderId=mongoose.Types.ObjectId(message.senderId);
message.receiverId=mongoose.Types.ObjectId(message.receiverId);
  try {
    const newMessage = new Message(message)

    return await newMessage.save()
  } catch (error) {
    throw error
  }
}

const listMessages = async () => {
  try {
    const messages = Message.find({})

    return messages
  } catch (error) {
    throw error
  }
}

module.exports = { listMessages, createMessage }
