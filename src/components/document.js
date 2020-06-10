import React from "react"
import { Link, graphql } from "gatsby"
import { INLINES } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export default function Document(props) {
  const document = props.data.contentfulDocument
  const options = {
    renderNode: {
      [INLINES.ENTRY_HYPERLINK]: (node, children) => {
        console.log(node)
        return (
          <>
            <Link to={node.data.target.fields.slug}>{children}</Link>
            <br />
            <p>
              ^^^ This needs to link to the other document, but will 404 because
              it uses <code>slug</code> and not <code>route</code>
            </p>
            <p>
              <code>fields.route</code>, added in <code>gatsby-node.js</code>{" "}
              doesn't exist in the rich text json data, because it's the raw
              response from Contentful instead of a Gatsby node
            </p>
            <pre
              style={{
                backgroundColor: "#f1f1f1",
                padding: "2em",
                borderRadius: "4px",
                fontFamily: "Monaco, monospace",
                fontSize: ".8rem",
              }}
            >
              {JSON.stringify(node.data.target.fields, null, "  ")}
            </pre>
          </>
        )
      },
    },
  }
  return (
    <div>
      <h1>{document.title}</h1>
      {documentToReactComponents(document.body.json, options)}
    </div>
  )
}

export const query = graphql`
  query DocumentQuery($id: String) {
    contentfulDocument(id: { eq: $id }) {
      id
      title
      body {
        json
      }
      fields {
        route
      }
    }
  }
`
