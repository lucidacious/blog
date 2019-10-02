import React from "react"
import PropTypes from "prop-types"

// Utilities
import kebabCase from "lodash/kebabCase"
import Layout from "../components/layout"
import { rhythm, scale } from "../utils/typography"

// Components

import { Link, graphql } from "gatsby"

const TagsPage = ({
                    data: {
                      allMarkdownRemark: { group },
                      site: {
                        siteMetadata: { title,companyName,companyUrl },
                      },
                    },
                  }) => {


  let lastLetter= "";
  const toRender=[];
  group.forEach((tag)=>{
    const newLastLetter = tag.fieldValue.charAt(0)
    if (newLastLetter !== lastLetter){
      lastLetter=newLastLetter
      toRender.push(<div style={{...scale(1 / 4),marginTop:rhythm(1/4),marginBottom:rhythm(1/4)}} key ={newLastLetter}>{newLastLetter}</div>)
    }
    toRender.push(<li style={{display:"inline",listStyleType:"none" ,paddingRight: rhythm(1/2),paddingLeft: rhythm(1/2)}} key={tag.fieldValue}>
      <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
        {tag.fieldValue} ({tag.totalCount})
      </Link>
    </li>)
  })

  return (
    <Layout title={title} companyName={companyName} companyUrl={companyUrl}>

      {toRender}


    </Layout>

  )
}
TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        companyName
        companyUrl
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
