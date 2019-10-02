/**
 * Byline component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql,Link } from "gatsby"
import Image from "gatsby-image"
import {FiFeather} from "react-icons/fi"
import { rhythm } from "../utils/typography"
import nameToPath from "../utils/nameToPath"

const Byline = ({author,date,timeToRead}) => {
  const data = useStaticQuery(graphql`
    query BylineQuery {
       avatars:allFile(filter: {dir: {regex: "/contributors/"}}) {
    edges {
      node {
        id
        name
        childImageSharp {
          fixed(width: 32, height: 32) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
}

      `)
  const authorPicName= nameToPath(author)
  const imageNode = data.avatars.edges.find((n)=>n.node.name===authorPicName);
  const timeDescriptor=(timeToRead===1)?"minute":"minutes"

  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      {!!imageNode &&  <Image
        fixed={imageNode.node.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 32,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />}
      {!imageNode && <FiFeather style={{marginRight:"12px"}} size={"1.5em"}/>}
      <small style={{marginTop: rhythm(1/8) ,color: "#666666" }}>
        <Link to={`contributors/${nameToPath(author)}`}>{author}</Link> on {date} &middot; {timeToRead} {timeDescriptor}
      </small>

    </div>
  )
}

export default Byline
