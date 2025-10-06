import React from 'react'
import { Button } from 'antd'

export default function App() {
  const [count, setCount] = React.useState(0);
  return (
   <>
    <Button
      type="primary"
      onClick={() => setCount(count - 1)}
    >
      -
    </Button>
    <span style={{margin: '0 20px'}}>{count}</span>
    <Button
      type="primary"
      onClick={() => setCount(count + 1)}
    >
      +
    </Button>
   </>
  )
}
