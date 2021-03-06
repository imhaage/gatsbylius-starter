import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "components/layout";
import Hero from "components/organisms/Hero";
import Section from "components/molecules/Section";
import CardItem from "components/molecules/CardItem";
import ListItems from "components/atoms/ListItems";
import Loader from "components/atoms/Loader";
import Seo from "components/atoms/Seo";

const IndexPage = ({ data }) => (
  <Layout
    pageTitle={`${data.site.siteMetadata.title} ${data.site.siteMetadata.subtitle}`}
  >
    <Seo
      title={`${data.site.siteMetadata.title} ${data.site.siteMetadata.subtitle}`}
    />

    <Hero
      fluidImage={data.hero.childImageSharp.fluid}
      title={data.site.siteMetadata.title}
      subtitle={data.site.siteMetadata.subtitle}
    />

    <Section title="Our latest products">
      <Loader />
      <ListItems>
        {[...data.allProduct.nodes].slice(0, 8).map((product) => (
          <CardItem
            key={product.slug}
            name={product.name}
            price={product.variants[0].price}
            to={`product/${product.slug}`}
            imageFluid={
              product.localImage && product.localImage.childImageSharp.fluid
            }
          />
        ))}
      </ListItems>
    </Section>

    <Section title="Our categories">
      <ListItems>
        {data.allCategory.nodes
          .filter((category) => category.products.length > 0)
          .map((category) => {
            return (
              <CardItem
                key={category.code}
                to={`/${category.slug}`}
                name={category.name}
                imageFluid={
                  category.thumbnail && category.thumbnail.childImageSharp.fluid
                }
              />
            );
          })}
      </ListItems>
    </Section>
  </Layout>
);

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default IndexPage;

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
    hero: file(name: { eq: "heroImage" }) {
      childImageSharp {
        fluid(maxWidth: 1500, maxHeight: 550, quality: 50) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    allCategory {
      nodes {
        ...CategoryInfos
        thumbnail: localImage {
          childImageSharp {
            fluid(maxWidth: 250, maxHeight: 250) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
    allProduct {
      nodes {
        slug
        name
        variants {
          price {
            currency
            current
          }
        }
        localImage {
          childImageSharp {
            fluid(maxWidth: 250, maxHeight: 250) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
