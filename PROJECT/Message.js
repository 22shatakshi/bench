import React from 'react'

const Message = () => {
    function SK_sendChatMessage(text, recipient_id, e) {
        document.title = document_title;
        textarea_wrapper = $('.chat-textarea');
        chat_messages_wrapper = $('.chat-messages');

        if (e.keyCode == 13 && e.shiftKey == 0) {
            e.preventDefault();
            textarea_wrapper.find('textarea').val(''); chat_messages_wrapper.append('<div class="chat-text align-right temp-text" align="right"><div class="text-wrapper float-right">' + text + '<div class="marker-out"><div class="marker-in"></div></div></div><div class="float-clear"></div></div>');

            $.post(SK_source() + '?t=chat&a=send_message', { text: text, recipient_id: recipient_id }, function (data) {
                chat_messages_wrapper
                    .append(data.html)
                    .scrollTop(chat_messages_wrapper.prop('scrollHeight'))
                    .find('.temp-text')
                    .remove();
            });
        }
    }

    // upload photo chat
    function SK_uploadMessageForm() {
        document.title = document_title;
        $('chat_messages_wrapper').submit();
        SK_progressIconLoader($('.chat-textarea').find('.options-wrapper'));
    }

    function SK_sendMessageForm(e) {
        document.title = document_title;

        if (e.keyCode == 13 && e.shiftKey == 0) {
            e.preventDefault();
            $('form.send-message-form').submit();
            SK_progressIconLoader($('.textarea-container').find('.options-wrapper'));
        }
    }

    function SK_uploadMessageForm() {
        document.title = document_title;
        $('form.send-message-form').submit();
        SK_progressIconLoader($('.textarea-container').find('.options-wrapper'));
    }
    return (
        <div>

        </div>
    )
}

export default Message
