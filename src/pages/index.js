import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Posts from "../components/posts"
import {FaTags} from 'react-icons/fa'



class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const {title,companyName,companyUrl} = data.site.siteMetadata
    return (
      <Layout title={title} companyName={companyName} companyUrl={companyUrl}>
        <SEO title="All posts" />
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,

          }}
          to={`/tags`}
        >
          <FaTags/> Tags
        </Link>
        <Posts posts={data.posts.edges}/>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        companyName
        companyUrl
      }
    }
     posts: allMarkdownRemark(
         sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          timeToRead
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
