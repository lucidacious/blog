import React from "react"
import { rhythm } from "../utils/typography"
import Image from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"


function Logo() {
  const data = useStaticQuery(graphql`
    query LogoQuery {
      logo: file(absolutePath: { regex: "/logo.png/" }) {
        childImageSharp {
          fixed(width: 350, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          title
        }
      }
    }`)

  return <Image
    fixed={data.logo.childImageSharp.fixed}
    alt={data.site.siteMetadata.title}
    style={{
      marginRight: rhythm(1 / 2),
      marginBottom: 0,
      minWidth: 50}}
  />
}

export default Logo