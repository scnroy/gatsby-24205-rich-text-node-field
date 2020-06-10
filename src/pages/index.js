import React from "react"
import {graphql, Link} from 'gatsby'

export default function Home({data}) {
  return <div>
    <ul>
      {data.allSitePage.nodes.map(({path}) => (<li><Link to={path}>{path}</Link></li>))}
    </ul>
  </div>
}

export const query = graphql`
  query PageQuery {
    allSitePage(filter: {path: {ne: "/"}}) {
      nodes {
        path
      }
    }
  }
`