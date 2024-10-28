import Room from "../models/Rooms.js";
import Hotel from "../models/Hotels.js";
// import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const roomId = req.params.id; // Room ID to delete

  try {
    // Delete the room
    const deletedRoom = await Room.findByIdAndDelete(roomId);
    
    // Check if room deletion was successful
    if (!deletedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    console.log(`Room deleted: ${roomId}`);

    try {
      // Remove the room reference from the hotel document
      const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: roomId },
      });

      if (!updatedHotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
      console.log(`Room removed from hotel: ${hotelId}`);

    } catch (err) {
      console.error("Error updating hotel:", err);
      return next(err); // Pass error to error-handling middleware
    }

    // If both operations succeed, send a success response
    return res.status(200).json({ message: "Room has been deleted" });

  } catch (err) {
    console.error("Error deleting room:", err);
    return next(err); // Pass error to error-handling middleware
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};