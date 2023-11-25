
import { Link, NavLink } from 'react-router-dom'
import { Fragment } from 'react'
export const ButtonNav = ({data})=>{
    return (
        <>
        {data.dropdown ==true ?
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           
            {data.name}
            </a>
            <ul className="dropdown-menu">
                {data.link.map((e,index)=>(
                    <li key={index}>
                        <Link className={'dropdown-item'} to={`/admin/feature/${e.slug}`}>
                            {e.content}
                        </Link>
                    </li>
                ))}
            </ul>
        </li>
        :
        <li className="nav-item">
            <Link className="nav-link" to={`/admin/feature/${data.link[1].slug}`} role="button">
                {data.name}
            </Link>
        </li>}
        </>
    )
}