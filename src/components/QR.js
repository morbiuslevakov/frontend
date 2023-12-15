import React, { Component, useEffect, useState, useReducer, Suspense } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate, useLocation, redirect } from "react-router-dom";
import { Button, Card, Navbar, Nav, Container, Offcanvas, Modal, InputGroup, Form as Fr, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';
import { connect } from "react-redux";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AuthService from "../services/auth.service";
import P2PService from "../services/p2p.service";
import PriceService from "../services/price.service";
import EventBus from "../common/EventBus";
import Preloader from './Preloader';
import isLoggedIn from "../common/isLoggedIn";
import { logout } from "../actions/auth";

class QR extends React.Component {

    render() {
        return (
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAAFeAQAAAADlUEq3AAAC/ElEQVR4Xu2YW6rjMBAFBVqAl+Ste0legEHTVa0kSi4M92dgSLsJQZZK+Ticfjht/D6u9rnzl7jhNW54jRte44bXuOE1bniNfw43Yu/nPuITj9sxztbPdm0jviN6JZj1ubsZ2N7hc5/HCdSBEQrpru1oyjXGEY9quKNqPTiOQivkioMNO8Vd9kvCJJHOySy7mtYqCA/TakM0BWQnLpJcP9Pq2+HUqptZPz6clYIzwjnRd0Kr7nXqjCn2On97+Fo4DBPSjSwv6hgYaUUbisW7zt8Os4Jv7nOKgCZafPNYCY5N6yod5zK/qC2MarMCl4JDtyldLNTNnGJHC2UUgkkrzZO2QUO7s+rllTowm9Fr1K1lZqWSuAglC8EUW6e1TtU9PBB2YHt4qQzsu+1wNkNGGE701Z4pVgimntBu0kgR3ao727EDbR1Y/0QbUitqy0Cx2Y6zwhSCL/oOQvnRTjZlHrk1qSKw+1Fn9mdtacoYkvKInQrBIi0B/ENaNVuSa5xWCM6i2u3CMF4PAZ/rUvCFVvtrOEGxZ5HBTpOqAQ92kGg4lU3p8BWiqVspuOGW7DXzvyBqThYZ6k8lWIydPNJXmEojkV+l4OGRm6nSweSWwxsdOakqMCVloNJwbu8ObKYV6dbfx/ivhx9JxCkuGpD8SHy7b1SBMRLDKnH5kuuCzebrnnwV+OJvQ5YpGqc6ivzCUUdSRWCLyYFoOodvziK/mhmXUQXuTO+4BQFP+w5D7A75mk+qwMNXWgyDbocCxr1Mq/boSmVg1esm0SyzplW242qwRTXaMacJmGWUGvbn71WBJ5ljCQ4isygyJhpiVoIzOvNqS8ZbpFhWmLci8+0w+lBd1Y0Xmd0htuWt9tGOvx1GGYxEHgHHdZLrwFqsherA5wvL1tMdZZsj3Kd0NeDL6R0L+Y6jqYaVB0cVhC9UwkIJZy/utKFK8CCteg4hGinN0/kX0c1KsMemFRpCNuZ5fIWXNn+tDPy7uOE1bniNG17jhte44TVueI3/Bf4DOEprPGTphAcAAAAASUVORK5CYII="/>
        )
    }
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
        isLoggedIn,
        message
    };
}
export default connect(mapStateToProps)(QR);