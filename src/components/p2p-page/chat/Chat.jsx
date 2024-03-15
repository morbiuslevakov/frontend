import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getChatFromApi, sendMessageChatApi } from '../../../utils/api-utils';


export const Chat = ({ deal, chatId, myRole, maker, taker, lastMessage }) => {
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');

  useEffect(() => {
    console.log('ЧАТ ОБНОВЛЯЕТСЯ');
    const fetchChat = async () => {
      const chatData = await getChatFromApi(deal.chatId);
      setMessages(chatData.messages);
    };
    fetchChat().catch(console.error);
  }, [lastMessage]);


  const handleSendMessage = () => {
    const messageData = {
      "chatId": deal.chatId,
      "type": "TEXT",
      "replyToMessage": "",
      "text": newMessageText,
      "caption": ""
    };
    // console.log(messageData);
    sendMessageChatApi(messageData)
    // sendMessageChatApi(messageData) // Раскомментируйте для реальной отправки
    setNewMessageText(''); // Очищаем поле ввода после "отправки"
  };

  return (
    <Stack spacing={2} sx={{ maxHeight: 400, overflow: 'auto' }}>
      {messages.map((msg, index) => (
        <Box
          key={index}
          sx={{
            alignSelf: msg.from === myRole.id ? 'flex-end' : 'flex-start',
            bgcolor: msg.from === myRole.id ? 'lightblue' : 'lightgreen',
            p: 1,
            borderRadius: '10px',
            maxWidth: '70%',
          }}
        >
          <Typography>{msg.text}</Typography>
        </Box>
      ))}
      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Напишите сообщение..."
          value={newMessageText}
          onChange={(e) => setNewMessageText(e.target.value)}
        />
        <Button variant="contained" onClick={handleSendMessage}>Отправить</Button>
      </Stack>
    </Stack>
  );
};