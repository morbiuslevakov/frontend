import React from 'react'
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import CurrencyBitcoinRoundedIcon from '@mui/icons-material/CurrencyBitcoinRounded';
import { WalletTokensWrapper } from './Styled'

export const TokensTable = ({ tokensRows, walletInfo }) => {
  const currency = walletInfo.currency;
  const currencySymbol = walletInfo.symbol;

  return (
    <TableContainer component={WalletTokensWrapper}>
      <Table aria-label="tokens table">
        <TableHead>
          <TableRow>
            <TableCell ><Typography>Токен</Typography></TableCell>
            <TableCell align="right"><Typography>Баланс</Typography></TableCell>
            <TableCell align="right"><Typography>Баланс, {currency}</Typography></TableCell>
            <TableCell align="right"><Typography>Цена токена, {currency}</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tokensRows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Stack flexDirection={'row'} gap={1}>
                  <CurrencyBitcoinRoundedIcon color="primary" />
                  <Typography>{row.name}</Typography>
                </Stack>
              </TableCell>
              <TableCell align="right"><Typography>{row.amount}</Typography></TableCell>
              <TableCell align="right"><Typography>{currencySymbol} {row.amountUsd}</Typography></TableCell>
              <TableCell align="right"><Typography>{currencySymbol} {row.priceUsd}</Typography></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
