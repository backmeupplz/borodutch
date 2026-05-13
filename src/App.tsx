import { Footer } from 'components/Text'
import BlogPosts from 'components/BlogPosts'
import Intro from 'components/Intro'
import Profile from 'components/Profile'
import Projects from 'components/Projects'
import Root from 'components/Root'
import TotalNumberOfUsers from 'components/TotalNumberOfUsers'

const App = () => {
  return (
    <Root>
      <Profile />
      <TotalNumberOfUsers />
      <Intro />
      <BlogPosts />
      <Projects />
      <Footer>Thanks for scrolling!</Footer>
    </Root>
  )
}

export default App
