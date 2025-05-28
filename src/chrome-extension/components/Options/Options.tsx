import React from 'react'
import { optionsStyles } from './styles'

export const Options: React.FC = () => {
  return (
    <div style={optionsStyles.container}>
      <div style={optionsStyles.innerContainer}>
        <h1 style={optionsStyles.title}>AI Extension Options</h1>

        <p style={optionsStyles.paragraph}>
          This is your options page. Currently, it is a placeholder.
        </p>

        <p style={optionsStyles.smallParagraph}>
          More options will be added here soon. Stay tuned for upcoming updates.
        </p>
      </div>
    </div>
  )
}
