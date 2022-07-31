
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();
app.use(cors());
// app.use(cors({
//     origin:"*"
//     // origin:"*" it allows all api requests req
// }))
app.use(bodyParser.json());
app.use(cors())
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Your app is running with ${port}`));

let rooms = [];
let roomNo = 0;
let bookings =[];


app.get("/", function (req, res) {
        res.json({
            output: "Homepage"
        });

  });

  app.get("/RoomswithBookeddata", function (req, res) {
    res.json({
        output: rooms
    });

});

app.get("/CustomerswithBookeddata", function (req, res) {
    res.json({
        output: bookings
    });

});

app.post("/createRoom", function (req, res) {
    let room = {};
    room.id=rooms.length+1;
    room.roomNo = roomNo;
    room.bookings = [];
    if(req.body.noOfSeats){
        room.noSeats = req.body.noSeats

    } else{res.status(400).json({ output: 'Enter noOfSeats '})};
    if(req.body.amenities){
        room.amenities = req.body.amenities
    
} else{res.status(400).json({ output: 'Enter amities'})};
    if(req.body.price){
        room.price = req.body.price
    
} else{res.status(400).json({ output: 'Enter price'})};
    rooms.push(room);
    roomNo++;
    res.status(200).json({ output: 'Room Created Successfully'}) 
    console.log(rooms)
});

app.post("/BookRoom", function (req, res) {
    let booking = {};
    booking.id = bookings.length+1;
    if(req.body.customerName){
        booking.customerName = req.body.customerName
    } else{res.status(400).json({ output: 'Enter customerName'})};
    if(req.body.date){
        booking.date=req.body.date
       
    } else{
        res.status(400).json({ output: 'Enter date'})
    }

    if(req.body.startTime){
            booking.startTime = req.body.startTime
    } else{
        res.status(400).json({ output: 'Enter StartTime'})
    }

    if(req.body.endTime){  
         booking.endTime = req.body.endTime
    } else{
        res.status(400).json({ output: 'Enter endTime'})
    }

    const availableRooms = rooms.filter(room => {
        if(room.bookings.length == 0){
            return true;
        } else{
            room.bookings.filter(book =>{
                if((book.date == req.body.date) ){
                    if((parseInt((book.startTime).substring(0, 1)) > parseInt((req.body.startTime).substring(0, 1)) ) && 
                    (parseInt((book.startTime).substring(0, 1)) > parseInt((req.body.endTime).substring(0, 1)) ) ){ 
                        if((parseInt((book.startTime).substring(0, 1)) < parseInt((req.body.startTime).substring(0, 1)) ) && 
                          (parseInt((book.startTime).substring(0, 1)) < parseInt((req.body.endTime).substring(0, 1)) ) ){ 
                            return true;
                        }
                    }
                }
                else{
                    return true;
                }
            })

        }
    });
    if(availableRooms.length == 0){res.status(400).json({ output: 'No Available Rooms on Selected Date and Time'})}
   else{
    roomRec = availableRooms[0];
   let count =0;
   rooms.forEach(element => {
       if(element.roomNo == roomRec.roomNo){
        rooms[count].bookings.push({
            custName: req.body.custName,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            date: req.body.date
        })
       }
       count++;
   });
   let bookingRec = req.body;
   bookingRec.roomNo = roomRec.roomNo;
   bookingRec.cost = parseInt(roomRec.price) * (parseInt((bookingRec.endTime).substring(0, 1)) - parseInt((bookingRec.startTime).substring(0, 1)));


   bookings.push(bookingRec);
   res.status(200).json({ output: 'Room Booking Successfully'}) 
}
});

// const express=require('express')
// const app=express()
// const cors=require('cors')

// app.use(express.json())
// app.use(cors({
//     origin:"*"
//     // origin:"*" it allows all api requests req
// }))

// let halls=[]
// // let rooms={
// //     nunberofseats:25,
// //     amentities:"tv,fridge,AC",
// //     priceforonehour:500
// // }
// // app.get('/room',function(req,res){
// //     res.json(rooms)
// // });

// app.post("/createroom",async function(req,res){

//         req.body.roomId=halls.length+1;
//     console.log(req.body)
   
//      halls.push(req.body)
//          res.json({
//         message:"Room created"
//     })
// })


// app.put("/bookroom/:id",function(req,res){
//     const id=req.params.id;
    
//      const roomstatus=halls.findIndex(room=>room.roomId==id)
//       halls[roomstatus].date=req.body.date

//       res.json({message:"room booked"})
//       console.log(halls[roomstatus])
//     // let a=halls[roomstatus].date
//     // let b=req.body.date
// //    const date= halls[roomstatus].date=req.body.date;
// //    const timing=halls[roomstatus].startTime=req.body.startTime;
// // if(a=b){
// //     res.json({message:"room already booked"})
// // }else{
// //     halls[roomstatus].push(req.body)
// // }
   
// })

// app.get("/rooms",function(req,res){
//     res.json(halls)
    
// })



// app.listen(3000);

// "Customername":"person1",
//    "date":"23-02-2000",
//    "startTime":9.30,
//    "endTime":12.00