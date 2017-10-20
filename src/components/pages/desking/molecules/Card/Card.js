'use strict';
import React from 'react';
import Header from './Header';
import Content from './Content';
import PropTypes from 'prop-types';



// eslint-disable-next-line react/prefer-stateless-function
class Card extends React.PureComponent {
  getElementByType = (type)=>{
    if (!this.props.children)
      return null;
    if (!Array.isArray(this.props.children) && this.props.children.type===type){
      return this.props.children;
    }
    else {
      return this.props.children.find(element=>element.type===type);
    }
  }

  render() {
    const header = this.getElementByType(Header);
    const content = this.getElementByType(Content);
    return (
      <div id={this.props.htmlId} className={`card panel panel-default ${this.props.className}`}>
        <div className='card__header'>
          {header}
        </div>
        {content}
      </div>
    );
  }
}
Card.propTypes = {
  htmlId: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.node
  ])
};

Card.Header = Header;
Card.Content = Content;
export default Card;
