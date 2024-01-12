import React from 'react'
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { TokenIcon, WalletTokensWrapper } from './Styled'

export const TokensTable = ({ tokensRows, walletInfo }) => {
  const currency = walletInfo.currency;
  const currencySymbol = walletInfo.symbol;

  return (
    <TableContainer component={WalletTokensWrapper}>
      <Table aria-label="tokens table">
        <TableHead>
          <TableRow>
            <TableCell><Typography>ТОКЕН</Typography></TableCell>
            <TableCell><Typography>БАЛАНС</Typography></TableCell>
            <TableCell><Typography>БАЛАНС, {currency}</Typography></TableCell>
            <TableCell><Typography>ЦЕНА ТОКЕНА, {currency}</Typography></TableCell>
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
                  <TokenIcon>
                    <img src={"https://s3.deaslide.com/" + row.svgIcon} alt={row.name} />
                  </TokenIcon>
                  <Typography>{row.name}</Typography>
                </Stack>
              </TableCell>
              <TableCell><Typography>{row.amount}</Typography></TableCell>
              <TableCell><Typography>{currencySymbol} {row.balance}</Typography></TableCell>
              <TableCell><Typography>{currencySymbol} {row.tokenPrice}</Typography></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer >
  )
}
