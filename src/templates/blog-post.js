import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import {FaTag} from "react-icons/fa"


const Tags=({tags})=>{
  const links=tags.map((tag)=>{return <Link style={{ boxShadow: `none`,marginRight:'5px' }} to={`/tags/${tag}`} key={tag}> <FaTag/> {tag} </Link>})
  return <div style={{
    marginBottom: rhythm(1),
  }}>{links}</div>
}

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const {title,companyName,companyUrl,contributors} = this.props.data.site.siteMetadata
    const { previous, next } = this.props.pageContext
    const timeToRead = (post.timeToRead ===1)?"1 minute":`${post.timeToRead} minutes`
    const found= contributors.find(c=>(c.name===post.frontmatter.author))
    const bio=(!!found)?found.bio:""

    return (

      <Layout  title={title} companyUrl={companyUrl} companyName={companyName}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article>
          <header>
            <h1
              style={{
                marginTop: rhythm(1),
                marginBottom: 0,
              }}
            >
              {post.frontmatter.title}
            </h1>
            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
              }}
            >
              {post.frontmatter.date} &middot; {timeToRead}
            </p>
          </header>
          <section dangerouslySetInnerHTML={{ __html: post.html }} />


          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <footer>
            <Tags  tags={post.frontmatter.tags}/>
            <Bio author={post.frontmatter.author} bio={bio}/>
          </footer>
        </article>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        companyName
        companyUrl
        contributors{
          name
          bio
        }
      }
    }
    
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        author
        tags
      }
    }
  }
`
