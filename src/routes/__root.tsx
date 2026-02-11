import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import favicon from '@/favicon.png'
import Layout from '@components/Layout'
import appCss from '../styles.css?url'
import React from 'react'

const TanStackDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : React.lazy(() =>
      import('@tanstack/react-devtools').then((res) => ({
        default: res.TanStackDevtools,
      })),
    )

const TanStackRouterDevtoolsPanel = React.lazy(() =>
  import('@tanstack/react-router-devtools').then((res) => ({
    default: res.TanStackRouterDevtoolsPanel,
  })),
)



export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'wijan.dev',
      },
      {
        name: 'description',
        content: 'Portfolio of Wijan Ruiz-Mok',
      },
      {
        name: 'keywords',
        content: 'Portfolio, Wijan, SoftwareEngineer'
      },
      {
        name: 'author',
        content: 'Wijan Ruiz-Mok'
      }
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        href: favicon,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Layout>
          {children}
        </Layout>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
