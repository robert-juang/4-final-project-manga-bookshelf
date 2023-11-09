import React, { useState } from 'react'
import "./Header.css"
import { Outlet } from "react-router-dom";

import Hamburger from "hamburger-react"
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ForumIcon from '@mui/icons-material/Forum';
import Turnstone from 'turnstone'
//TODO: add number after the profile route and manga route 

export default function Header() {
    
    const [isOpen, setOpen] = useState(false); 
    const [searchBox, setSearchBox] = useState([]) 
    //Define constant styles to use Turnstone 

    const maxItems = 10

    const listbox = [
        {
            id: 'mangas',
            name: 'Mangas',
            ratio: 6,
            displayField: 'manga',
            data: (query) =>
                fetch(`localhost:8080/search/${query}`)
                    .then(res => res.json()),
            searchType: 'startswith'
        }
        // {
        //     id: 'users',
        //     name: 'Users',
        //     ratio: 4,
        //     displayField: 'user',
        //     data: (query) =>
        //         fetch(`/api/airports?q=${encodeURIComponent(query)}&limit=10`)
        //             .then(res => res.json()),
        //     searchType: 'contains'
        // }
    ]

    return (
        <>
            <div className="Header-sidebar">
                <div>

                <div>
                    <div className="Header-navigation-sm">
                        <Hamburger toggled={isOpen} toggle={setOpen} />
                    </div>
                    <form id="search-form" role="search">
                        {/* <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                        /> */}
                            <Turnstone
                                listbox={listbox}
                            />
                    </form>
                    <form method="post">
                        <button type="submit">Submit</button>
                    </form>
                </div>

                <div className="Header-nav">
                    <nav>
                        <ul>
                            <li>
                                <a href={`/dashboard`}><DashboardIcon />Dashboard</a>
                            </li>
                            <li>
                                <a href={`/manga`}><MenuBookIcon />Mangas</a>
                            </li>
                            <li>
                                <a href={`/forum`}><ForumIcon />Forum</a>
                            </li>
                            <li>
                                <a href={`/profile/1`}> <PersonIcon />My Profile</a>
                            </li>
                            <li>
                                <a href={`/setting`}><SettingsIcon /> Setting</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                </div>
                <div className="Header-navigation-sm">
                    {isOpen ? (
                        <nav>
                            <ul>
                                <li>
                                    <a href={`/dashboard`}><DashboardIcon />Dashboard</a>
                                </li>
                                <li>
                                    <a href={`/manga`}><MenuBookIcon />Mangas</a>
                                </li>
                                <li>
                                <a href={`/forum`}><ForumIcon />Forum</a>
                                </li>
                                <li>
                                    <a href={`/profile/1`}> <PersonIcon />My Profile</a>
                                </li>
                                <li>
                                    <a href={`/setting`}><SettingsIcon /> Setting</a>
                                </li>
                            </ul>
                        </nav>
                    ) : <div></div>}
                </div>
                <h1>Manga Bookshelf for the Nerds</h1>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}