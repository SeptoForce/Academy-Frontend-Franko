import { Box } from '@kuma-ui/core'
import { Footer } from './Footer'
import Header from './Header'

// page layout
export function PageLayout(props: { children: React.ReactNode }) {
  return (
    <Box w={`100%`} h={`100vh`} overflowX={'hidden'} overflowY={'auto'}>
      <Header />
      {props.children}
      <Footer />
    </Box>
  )
}

export default PageLayout
