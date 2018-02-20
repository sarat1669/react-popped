import React from 'react'
import PropTypes from 'prop-types'

export default function PageNotFound({ location }) {
  return (
    <p>
      Page not found - the path, <Code>{location.pathname}</Code>,
      did not match any React Router routes.
    </p>
  )
}

PageNotFound.propTypes = {
  location: PropTypes.object.isRequired
}
