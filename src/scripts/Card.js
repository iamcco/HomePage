import React from 'react'
import Typed from './Typed.js'
import typedStyle from '../styles/typed.css'
import style from '../styles/card.css'
import avatarUrl from '../images/avatar.png'
import IconGithub from '../images/fa-github.svg'
import IconWeibo from '../images/fa-weibo.svg'
import IconMail from '../images/fa-envelope.svg'

export default class Card extends React.Component {
    hanlderClick() {
        var self = this;
        console.log(self);
    }
    render() {
        return (
            <section className={style.container}>
                <div className={style.card}>
                    <div className={style.avatar}>
                        <img src={avatarUrl} alt="年糕小豆汤" />
                    </div>
                    <Typed className={typedStyle.typed}
                           pClassName={typedStyle.placeholder}
                           sClassName={typedStyle.strong}
                           placeholder={"you can find me on"}>
                        Github,
                        Weibo,
                        Blog
                    </Typed>
                    <ul className={style.accounts}>
                        <li>
                            <IconMail />
                        </li>
                        <li>
                            <IconGithub />
                        </li>
                        <li>
                            <IconWeibo />
                        </li>
                    </ul>
                </div>
            </section>
        )
    }
};

