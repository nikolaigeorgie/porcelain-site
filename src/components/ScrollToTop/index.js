import { useEffect } from "react"
import { withRouter } from "react-router-dom"

const ScrollToTop = ({ children, location: { pathname } }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
    window.onpageshow = function(event) {
      console.log(event)
      if (event.persisted) {
        window.location.reload()
      }
    }
  }, [pathname])

  return children
}

export default withRouter(ScrollToTop)
