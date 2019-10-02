import React from "react"
import PropTypes from "prop-types"

// Components
import {  graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Posts from "../components/posts"
import Bio from "../components/bio"

const Contributors = ({ pageContext, data }) => {
  const { contributor,contributorBio } = pageContext
  const { edges } = data.posts;


  const {title,companyName,companyUrl} = data.site.siteMetadata

  return (
    <Layout title={title} companyName={companyName} companyUrl={companyUrl}>
      <SEO title={`Authored by ${contributor}`}/>
      <Bio author={contributor} bio={contributorBio} header={true} />
      <Posts posts={edges}/>
    </Layout>
  )


}

Contributors.propTypes = {
  pageContext: PropTypes.shape({
    contributor: PropTypes.string.isRequired,
    contributorBio: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Contributors

export const pageQuery = graphql`

  query($contributor: String) {
  site {
      siteMetadata {
        title
        companyName
        companyUrl
      }
    }
    posts: allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { author: { eq: $contributor } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          timeToRead
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            author
          }
        }
      }
    }
  }
`