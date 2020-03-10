import React from "react"
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image"

const ImageFluid = ({ props }) => (
    <StaticQuery
        query={graphql`
      query {
        allImageSharp {
          edges {
            node {
              fluid {
                ...GatsbyImageSharpFluid
                originalName
              }
            }
          }
        }
      }
    `}
        render={data => {
            const image = data.allImageSharp.edges.find(
                edge => edge.node.fluid.originalName === props.imgName
            )
            if (!image) {
                console.log("return null");
                return null
            }
            console.log("return:", props.imgAlt)
            return <Img fluid={image.node.fluid} alt={props.imgAlt} className={props.imgClass} />
        }}
    />
)
export default ImageFluid
