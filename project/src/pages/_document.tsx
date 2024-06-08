import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { createStyleRegistry, StyleRegistry } from '@kuma-ui/core'
import nextCookies from 'next-cookies'
import { isWindowDefined } from 'swr/_internal'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const registry = createStyleRegistry()
    const originalRenderPage = ctx.renderPage
    const { theme } = nextCookies(ctx)
    const { dateFormat } = nextCookies(ctx)

    if (!theme && !isWindowDefined) {
      ctx.res?.setHeader('Set-Cookie', 'theme=light; path=/; max-age=31536000;')
    }

    if (!dateFormat && !isWindowDefined) {
      ctx.res?.setHeader('Set-Cookie', 'dateFormat=MM/dd/yyyy ; path=/; max-age=31536000;')
    }

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props =>
            (
              <StyleRegistry registry={registry}>
                <App {...props} />
              </StyleRegistry>
            ),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [initialProps.styles, registry.styles()],
        theme,
        dateFormat,
      }
    } finally {
      registry.flush()
    }
  }

  render() {
    const { theme } = this.props as { theme?: string }

    return (
      <Html className={theme === 'dark' ? 'dark' : ''}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Condensed&family=Roboto:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
