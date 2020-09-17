import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';

function ElevationScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,

    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: "3em"
    },
    logo: {
        height: "7em"
    },
    logoContainer: {
        "&:hover": {
            backgroundColor: "transparent"
        },
        padding: 0,
    },
    tabContainer: {
        marginLeft: "auto"
    },
    tab: {
        ...theme.typography.tab,
        borderRadius: '50px',
        minWidth: 10,
        marginLeft: "10px",
        marginRight: 15
    },
    button: {
        ...theme.typography.estimate,
        height: '45px',
        color: '#fff',
        fontWeight: 'normal',
        marginLeft: '30px',
        marginRight: '25px',
        borderRadius: '50px',
    }
}));

export default function Header(props) {
    const classes = useStyles()
    const [value, setValue] = useState(0)
    const handleChange = (e, value) => {
        setValue(value)
    }
    useEffect(() => {
        if (window.location.pathname === "/" && value !== 0) {
            setValue(0)
        } else if (window.location.pathname === "/services" && value !== 1) {
            setValue(1)
        } else if (window.location.pathname === "/revolution" && value !== 2) {
            setValue(2)
        } else if (window.location.pathname === "/about" && value !== 3) {
            setValue(3)
        } else if (window.location.pathname === "/contact" && value !== 4) {
            setValue(4)
        } else if (window.location.pathname === "/estimate" && value !== 5) {
            setValue(5)
        }
    }, [value])
    return (
        <>
            <ElevationScroll>
                <AppBar position="fixed" color="primary">
                    <Toolbar disableGutters >
                        <Button
                            onClick={() => {
                                setValue(0)
                            }}
                            disableRipple
                            component={Link}
                            to="/"
                            className={classes.logoContainer}>
                            <img alt="Company logo" className={classes.logo} src={logo} />
                        </Button>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            className={classes.tabContainer}
                            indicatorColor="primary">
                            <Tab className={classes.tab} disableRipple component={Link} to="/" label="Home" />
                            <Tab className={classes.tab} disableRipple component={Link} to="/services" label="Services" />
                            <Tab className={classes.tab} disableRipple component={Link} to="/revolution" label="The Revolution" />
                            <Tab className={classes.tab} disableRipple component={Link} to="/about" label="About Us" />
                            <Tab className={classes.tab} disableRipple component={Link} to="/contact" label="Contact us" />
                        </Tabs>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setValue(null)
                            }}
                            component={Link}
                            to="/estimate"
                            color="secondary"
                            className={classes.button}
                        >
                            Free Estimate
                        </Button>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
        </>
    )
}
