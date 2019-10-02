import React from "react"
import { Link } from "gatsby"
import Byline from "../components/byline"
import { rhythm } from "../utils/typography"



const PostEntry=({articleID,excerpt,title,date,timeToRead,author})=>{
  return (
    <article>
      <header>
        <h3
          style={{
            marginBottom: rhythm(1 / 4),
          }}
        >
          <Link style={{ boxShadow: `none` }} to={articleID}>
            {title}
          </Link>
        </h3>

      </header>
      <section>
        <p
          dangerouslySetInnerHTML={{
            __html: excerpt,
          }}
        />
       <Byline author={author} timeToRead={timeToRead} date={date}/>
      </section>

    </article>
  )
}



const Posts =({posts})=>{

  const entries = posts.map(({ node }) => {
    console.log("Node",node)
    const title = node.frontmatter.title || node.fields.slug
    const excerpt= node.frontmatter.description || node.excerpt
    const articleID =node.fields.slug;
    return <PostEntry key={articleID} articleID={articleID}  title={title}
                       date ={node.frontmatter.date} excerpt={excerpt}
                      author={node.frontmatter.author} timeToRead={node.timeToRead}
    />
  })
  return <div>{entries}</div>
}

export default Posts;