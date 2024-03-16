import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
} from '@mui/material';
import { TokenIcon, WalletTokensWrapper } from './Styled';
import { useMediaQueryHook } from '../../hooks/use-media-query.hook';

export const TokensTable = ({ tokensRows, walletInfo }) => {
  const isMobile = useMediaQueryHook('sm')

  const currency = walletInfo.currency;
  const currencySymbol = walletInfo.symbol;

  return (
    <TableContainer component={WalletTokensWrapper}>
      {isMobile ? (
        tokensRows.map((row) => (
          <Stack key={row.name} flexDirection={'row'} gap={2} m={1} justifyContent={'space-between'} p={1}>
            <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
              <TokenIcon>
                <img src={"https://s3.deaslide.com/" + row.svgIcon} alt={row.name} />
              </TokenIcon>
              <Stack>
                <Typography>{row.name}</Typography>
                <Typography variant='gray'>
                  {currencySymbol} {row.tokenPrice}
                </Typography>
              </Stack>
            </Stack>
            <Stack alignItems={'end'}>
              <Typography>{row.amount}</Typography>
              <Typography variant='gray'>
                {currencySymbol}{row.balance}
              </Typography>
            </Stack>
          </Stack>
        ))
      ) : (
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
      )}
    </TableContainer >
  );
};
