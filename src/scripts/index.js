import React from 'react'
import Render from 'react-dom'
import Card from './Card'
import indexStyle from '../styles/index.css'
import icon from '../images/favicon.ico'

Render.render(
    <Card />,
    document.getElementById('js-main')
);

