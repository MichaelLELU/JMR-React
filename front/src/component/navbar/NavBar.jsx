import style from "./NavBar.module.css"
import logo from "../../assets/cuisine.png"
import imgAp from "../../assets/livre-de-recettes.png"
import imgR from "../../assets/livre-de-recettes(1).png"

export default function NavBar () {
    return (
        <header className={style.navBox}>
            <img className={style.imgBox} src={logo} alt="book and wood spoon" />
            <ul className={style.navList}>
                <li><a>Recettes<img className={style.imgNav} src={imgR} alt="black and white book of recettes" /></a> </li>
                <li><a href="/nouvelle-recette">Nouvelles Recettes <img className={style.imgNav} src={imgAp} alt="black and white agenda" /></a> </li>
            </ul>
        </header>
    )
}