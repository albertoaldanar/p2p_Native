
export function postNames(){
  return fetch("url", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      room_id: roomId,
      cell_phone: cellPhone
    })
  })
}

