import { HOST } from "../constants";

export function normalizeRooms(rooms){
  return rooms.map( room => {
    return {
      id: room.id || "",
      title: room.listing_name || "",
      image: `${HOST}${room.image}` || "",
      homeType: room.homeType || "",
      bedRoom: room.bedRoom || "",
      price: room.price || "",
      instant: room.instant || "",
      summary: room.summary || "",
      accommodate: room.accommodate || "",
      bathRoom: room.bathRoom || "",
      unavaliableDates: room.unavaliableDates || "",

    }
  })
}

export function normalizeRoom(room){
  return {
    id: room.id || "",
    title: room.listing_name || "",
    image: `${HOST}${room.image}` || "",
    homeType: room.homeType || "",
    bedRoom: room.bedRoom || "",
    price: room.price || "",
    address: room.address || "",
    host: room.host ? {
        email: room.host.email || "",
        fullname: room.host.fullname || "",
        phone: room.host.phone || "",
      } : {
            email: "",
            fullname: "",
            phone: ""
          }
  }
}
