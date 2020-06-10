const {resolve} = require('path');

exports.onCreateNode = async function({node, actions}) {
    const {createNodeField} = actions;

    // only log for nodes of type 'ContentfulDocument`
    if (node.internal.type !== 'ContentfulDocument') {
        return;
    }

    // Build route to include 'category' text field
    let route = node.category + '/' + node.slug

    createNodeField({
        node,
        name: 'route',
        value: route,
    })
};

exports.createPages = async ({graphql, actions, reporter}) => {
    const {createPage} = actions;
    const result = await graphql(`
        {
            allContentfulDocument {
                nodes {
                    id
                    title
                    fields {
                        route
                    }
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild('Error while running GraphQL query');
        return;
    }

    const {nodes} = result.data.allContentfulDocument;
    nodes.forEach((node) => {
        const {route} = node.fields;

        createPage({
            path: route,
            component: resolve(
                `${__dirname}/src/components/document.js`,
            ),
            context: {
                id: node.id,
            },
        });
    });
};