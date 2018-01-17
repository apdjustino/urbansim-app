/**
 * Created by jmartinez on 1/11/18.
 */
import io from 'socket.io-client';

const socket = io('http://localhost:5000/api/datetime');

export function subscribeToTimer(){

    socket.emit('subscribeToTime');
    socket.on('timer', function(x){ console.log(x);});
}

