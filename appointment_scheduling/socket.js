const MessageService = require("./api/services/messages.services");

function listenEvents(io) {
  io.on("connection", (socket) => {
    console.log(`${socket.id} user just connected!`);

    //sends the message to all the users on the server
    socket.on("message", async (data) => {
      await MessageService.createMessage(data);
      io.emit("messageResponse", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");

      socket.disconnect();
    });
  });
}

module.exports = { listenEvents };
