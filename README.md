# react-popped

React Popover on Steroids

### Examples

[Visit our project page](https://sarat1669.github.io/react-popped/)

### Installation

[![react-popped](https://nodei.co/npm/react-popped.png)](https://npmjs.org/package/react-popped)

### Usage

```js
import React, { Component } from 'react'
import { render } from 'react-dom'
import Popped from 'react-popped'

let content = (<div>Popped</div>)

render(
  <Popped position='auto' content={content}>
    <a href='#'>hover</a>
  </Popped>
, document.getElementById('app'))

```

### API

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th style="width: 100px;">Name</th>
      <th style="width: 50px;">Type</th>
      <th style="width: 50px;">Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>position</td>
      <td>string</td>
      <td>auto</td>
      <td>Positioning of the popover. Enum of 'auto', 'right', 'bottom', 'left', 'top'</td>
    </tr>
    <tr>
      <td>content</td>
      <td>React.Element</td>
      <td></td>
      <td>Content of the popover</td>
    </tr>
    <tr>
      <td>order</td>
      <td>string[]</td>
      <td>['right', 'bottom', 'left', 'top']</td>
      <td>Priority of auto positioning</td>
    </tr>
  </tbody>
</table>

### License
`react-popped` is released under the MIT license.
