import * as React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import 'modern-normalize';
import '../styles/normalize';

import Header from '../components/gatsbyComponents/Header';
import LayoutRoot from '../components/gatsbyComponents/LayoutRoot';
import LayoutMain from '../components/gatsbyComponents/LayoutMain';

type StaticQueryProps = {
    site: {
        siteMetadata: {
            title: string;
            description: string;
        };
    };
};

const IndexLayout: React.SFC = ({ children }) => (
    <StaticQuery
        query={graphql`
            query IndexLayoutQuery {
                site {
                    siteMetadata {
                        title
                        description
                    }
                }
            }
        `}
        render={(data: StaticQueryProps) => (
            <LayoutRoot>
                <Helmet
                    title={data.site.siteMetadata.title}
                    meta={[
                        { name: 'description', content: data.site.siteMetadata.description },
                        {
                            name: 'keywords',
                            content: 'gatsbyjs, gatsby, javascript, sample, something',
                        },
                    ]}
                >
                    <link
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"
                        rel="stylesheet"
                    />
                </Helmet>
                <Header title={data.site.siteMetadata.title} />
                <LayoutMain>{children}</LayoutMain>
            </LayoutRoot>
        )}
    />
);

export default IndexLayout;
