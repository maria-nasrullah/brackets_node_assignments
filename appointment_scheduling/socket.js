const MessageService = require("./api/services/messages.services");

function listenEvents(io) {
  let users = [];

  io.on("connection", (socket) => {
    console.log(`${socket.id} user just connected!`);

    //sends the message to all the users on the server
    socket.on("message", async (data) => {
      await MessageService.createMessage(data);
      io.emit("messageResponse", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
      //Updates the list of users when a user disconnects from the server
      users = users.filter((user) => user.socketID !== socket.id);
      // console.log(users);
      //Sends the list of users to the client
      io.emit("newUserResponse", users);
      socket.disconnect();
    });
  });
}

module.exports = { listenEvents };
