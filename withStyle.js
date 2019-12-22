import React from 'react'
function withStyle (Comp, style) {
  return (props) => {
    if (props.staticContext) {
      props.staticContext.css.push(style._getCss())
    }
    return <Comp {...props} />
  }
}
export default withStyle
