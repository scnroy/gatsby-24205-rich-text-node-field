/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: 'n2gizcewizfn',
        accessToken: 'K_XwQMBrWqtlNdpZp4tD1EQWS_vI9U455-RcmPAByPg',
        richText: {resolveFieldLocales: true},
      }
    }
  ],
}
