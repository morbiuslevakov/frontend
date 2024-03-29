import React, { useEffect, useState } from 'react'
import { Box, IconButton, Input, Stack, Typography, styled } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import AttachmentIcon from '@mui/icons-material/Attachment';
import CloseIcon from '@mui/icons-material/Close';
import { getChatFromApi, sendMessageChatApi } from '../../../utils/api-utils';
import { Status } from '../orderDeal/Status';
import { FormInput } from '../../orderCreate-page/Styled';

const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'myMessage',
})(({ myMessage, theme }) => ({
  alignSelf: myMessage ? 'flex-end' : 'flex-start',
  background: myMessage ? theme.palette.aqua.main : theme.palette.darkBackground.main,
  color: theme.palette.common.white,
  padding: theme.spacing(1),
  borderRadius: '10px',
  maxWidth: '70%',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: theme.spacing(1),
}));

export const ChatMessage = ({ msg, isMyMessage }) => {
  return (
    <MessageBubble myMessage={isMyMessage}>
      <Typography variant="body1">{msg.text}</Typography>
    </MessageBubble>
  );
};

const FileInfo = ({ file, onRemove }) => {
  if (!file) return null;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'grey.200', p: 1, borderRadius: '4px', mb: 1 }}>
      <Typography variant="caption" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</Typography>
      <IconButton size="small" onClick={onRemove}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export const Chat = ({ footerButton, states, deal, myRole, maker, taker, lastMessage, setHasNewMessages }) => {
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    // console.log('ЧАТ ОБНОВЛЯЕТСЯ');
    const fetchChat = async () => {
      const chatData = await getChatFromApi(deal.chatId);
      setMessages(chatData.messages);
      setHasNewMessages(false)
    };
    fetchChat().catch(console.error);
  }, [deal.chatId, lastMessage, setHasNewMessages]);


  const handleSendMessage = () => {
    const messageData = {
      "chatId": deal.chatId,
      "type": "TEXT",
      "replyToMessage": "",
      "text": newMessageText,
      "caption": ""
    };
    sendMessageChatApi(messageData)
    setNewMessageText('');
    setFile(null);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  // const renderMessageContent = (msg) => {
  //   switch (msg.type) {
  //     case 'TEXT':
  //       return <Typography>{msg.text}</Typography>;
  //     case 'SVG':
  //     case 'JPEG':
  //     case 'JPG':
  //     case 'PNG':
  //       return <img src={msg.fileUrl} alt="attachment" style={{ maxWidth: '100%', borderRadius: '5px' }} />;
  //     case 'PDF':
  //       return <a href={msg.fileUrl} download>Скачать PDF</a>;
  //     default:
  //       return null;
  //   }
  // };

  const myId = myRole === 'taker' ? taker.id : maker.id

  return (
    <>
      <Stack gap={0.2}>
        <Status
          type={states.type}
          deal={deal}
          myRole={myRole}
          isChat={true}
        />
        <Box mx={2}>
          {footerButton}
        </Box>
        <Box height={20} zIndex={120} boxShadow={'0 5px 5px rgba(0,0,0,0.4)'}></Box>
      </Stack>
      <Stack spacing={2} sx={{ height: '60vh', minHeight: "50vh", bgcolor: '#262626', pb: 2, disabled: 'flex' }}>
        <Stack sx={{ flexGrow: 1, overflow: 'auto', px: 2 }}>
          {messages.length ? messages.map((msg, index) => (
            <ChatMessage key={index} msg={msg} isMyMessage={msg.from === myId} />
          )) : (
            <Typography textAlign="center">Сообщений пока нет.</Typography>
          )}
        </Stack>
        <Box sx={{ py: 1, bgcolor: 'gray' }}>
          <FileInfo file={file} onRemove={handleRemoveFile} />
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton color="primary" component="label" disabled>
              <AttachmentIcon />
              <Input sx={{ display: 'none' }} type="file" hidden onChange={handleFileChange} accept=".svg,.jpeg,.jpg,.png,.pdf" />
            </IconButton>
            <FormInput
              fullWidth
              variant="standard"
              placeholder="Напишите сообщение..."
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              color='primary'
            />
            <IconButton color="primary" onClick={handleSendMessage}>
              <SendIcon />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};