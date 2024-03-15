import React, { useState } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';

export const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  const tooltipText = copied ? "Скопировано" : "Скопировать адрес кошелька"
  const copyIcon = copied ? <DoneIcon fontSize='small' color='primary' /> : <ContentCopyIcon fontSize='small' color='primary' />

  return <Tooltip title={tooltipText}>
    <IconButton onClick={handleCopy}>
      {copyIcon}
    </IconButton>
  </Tooltip>
}
