const usersSocket:any = [];


// interface userInfo {
//     id: string,
//     username: string,
//     room: string,
// }

// join user to chat
export function userJoin(id: string, username: string, room: string) {
    const user = { id, username, room };

    usersSocket.push(user);

    return user;
}

// Get current users
export function getCurrentUser(id: string) {
    return usersSocket.find((usersSocket: { id: string; }) => usersSocket.id === id);
}

// User leaves chat
export function userLeave(id:string) {
    const index = usersSocket.findIndex((usersSocket: { id: string; }) => usersSocket.id === id);
    if (index !== -1) {
        return usersSocket.splice(index, 1)[0];
    }
}

// Get room users
export function getRoomUsers(room: string) {
    return usersSocket.filter((usersSocket: { room: string; }) => usersSocket.room === room)
}
// module.export = {
//     userJoin,
//     getCurrentUser
// }

// Get Join Room Or Create Room
export function roomCreateOrJoin(room: string): string {
    if (room = '') {
        let randomNum = Math.floor(Math.random() * 9999)
        room = `${randomNum}`
        return room
    } else {
        return room
    }
}