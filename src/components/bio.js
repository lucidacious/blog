/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql,Link } from "gatsby"
import Image from "gatsby-image"
import nameToPath from '../utils/nameToPath'


import { rhythm } from "../utils/typography"


 const BioHeader=({author,bio,image})=>{
   return  (
     <div
       style={{
         display:"flex",
         alignItems: "flex-start",

         marginBottom: rhythm(2.5),
       }}
     >
       {!!image &&  <Image
         fixed={image}
         alt={author}
         style={{

           marginRight: rhythm(1/2),


           minWidth: 64,
           borderRadius: `100%`,
         }}
         imgStyle={{
           borderRadius: `50%`,
         }}
       />}


       <div style={{ flex:1}}> <div style={{ padding:0, margin:0,fontSize:rhythm(3/4)}}>{author}</div>
                                <div style={{fontSize:rhythm(1/2)}}>{bio}</div>
       </div>
     </div>)
 }
const BioFooter=({author,bio,image})=>{
  return  (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      {!!image &&  <Image
        fixed={image}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 64,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />}
      <p>
        <Link to={`contributors/${nameToPath(author)}`}>{author}</Link><br/>  <small>{bio}</small>
      </p>

    </div>)
}



const Bio = ({author,bio,header}) => {
  const data = useStaticQuery(graphql`
    query BioQuery {
       avatars:allFile(filter: {dir: {regex: "/contributors/"}}) {
    edges {
      node {
        id
        name
        childImageSharp {
          fixed(width: 64, height: 64) {
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
  const image=(imageNode)?imageNode.node.childImageSharp.fixed:null


  return (!!header)?<BioHeader author={author} bio={bio} image={image}/>
   : <BioFooter author={author} bio={bio} image={image}/>


}

export default Bio
