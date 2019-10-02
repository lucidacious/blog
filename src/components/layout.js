import React from "react"
import * as PropTypes from "prop-types"

import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import Logo from './logo'

const Header =()=>(
  <header>
  <h1
    style={{
      ...scale(1.5),
      marginBottom: rhythm(0.5),
      marginTop: 0,
    }}
  >
    <Link
      style={{
        boxShadow: `none`,
        textDecoration: `none`,
        color: `inherit`,
      }}
      to={`/`}
    >
      <Logo/>
    </Link>
  </h1>

  </header>
)


const Footer =({companyName,companyUrl})=>{
  return <footer style={{marginTop:rhythm(2)}}>
    © {new Date().getFullYear()}
    {` `}
    <a href={companyUrl}>{companyName}</a>
  </footer>

}


const Layout=({children,companyName,companyUrl})=>{
  return (
    <div  style={{
      marginLeft: `auto`,
      marginRight: `auto`,
      maxWidth: rhythm(30),
      padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
    }}>
        <Header />
        <main>{children}</main>
        <Footer companyName={companyName} companyUrl={companyUrl}/>
    </div>)

}



Layout.propTypes = {
  location: PropTypes.string,
  children: PropTypes.node,
  companyName: PropTypes.string.isRequired,
  companyUrl: PropTypes.string.isRequired
}
export default Layout
