// declare
var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);


///


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");

});

var RoomInSocket = io.of("/ROOM_IN_SOCKET");
// chỉ định namespace có tên là ROOM_IN_SOCKET

RoomInSocket.on("connection", function(socket) {
    console.log("Một người vừa kết nối!!!");


    // nhận yêu cầu vào phòng từ clients
    socket.on("join room", function(data) {
        // tham gia phòng 
        socket.join("Socket Room");

        // respone lại thông báo cho người vào phòng ;
        socket.emit("notification", "Bạn đã tham gia vào phòng!!");

        // respone lại cho những người còn trong room
        RoomInSocket.to("Socket Room").emit("notification", "Một người đã vào phòng");
    });


    // Nhận yêu cầu rời phòng từ clients
    socket.on("leave room", function(data) {
        // out room
        socket.leave("Socket Room");

        // respone lại thông báo cho người vào đã rời phòng
        socket.emit("notification", "Bạn đã rời phòng");
        RoomInSocket.to("Socket Room").emit("notification", "Một người đã rời phòng");
    });


});


http.listen(3000, function() {
    console.log("listing on *: 3000");
})