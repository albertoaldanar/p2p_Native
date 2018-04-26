import { HOST } from "../constants";

export function normalizeRooms(rooms){
  return rooms.map( room => {
    return {
      id: room.id || "",
      title: room.listing_name || "",
      image: `${HOST}${room.image}` || "",
      homeType: room.home_type || "",
      bedRoom: room.bed_room || "",
      price: room.price || "",
      instant: room.instant || "",
      summary: room.summary || "",
      accommodate: room.accommodate || "",
      bathRoom: room.bath_room || "",
    }
  })
}

export function normalizeRoom(room){
  return {
    id: room.id || "",
    title: room.listing_name || "",
    image: `${HOST}${room.image}` || "",
    homeType: room.home_type || "",
    bedRoom: room.bed_room || "",
    summary: room.summary || "",
    bathRoom: room.bath_room || "",
    price: room.price || "",
    unavailableDates: room.unavailable_dates || "",
    address: room.address || "",
    host: room.host ? {
        email: room.host.email || "",
        fullname: room.host.fullname || "",
        avatar: room.host.avatar || "",
      } : {
            email: "",
            fullname: "",
            phone: ""
          }
  }
}
