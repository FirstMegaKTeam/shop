import React from "react";
import styles from './Menu.module.css'
import img from './outline_search_black_24dp.png'
import {Link} from 'react-router-dom'

function Menu() {
    return (<div className='menu'>

        <img className={styles.search} src={img} alt=""/>
    <ul className={styles.menu__ul}>
        <li><Link to="/Login">Zaloguj się</Link></li>
        <li><Link to="/Product">Produkty</Link></li>
        <li><Link to="/Registration">Rejestracja</Link></li>
        <li><Link to="/Contact">Kontakt</Link></li>
        <li><Link to="/Basket">Koszyk</Link></li>
    </ul>
    </div>);

}

export default Menu;
