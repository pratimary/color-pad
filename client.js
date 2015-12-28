/**
 * Created by pratima on 12/26/2015.
 */
jQuery(function($)
{
    var socket;
    socket = io.connect('connection');
    var $chat= $('#chat');
    var $message=$('#message');

    $message.blur(function(e){
        e.preventDefault();
        socket.emit('send message',$message.val());
        $message.val('');
    });
    socket.on('new message', function(data){
        $chat.append(data + "<br/>");
    });
});