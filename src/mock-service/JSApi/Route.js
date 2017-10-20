'use strict';
import apiConfig from './ApiConfig';
export default class Route {
  constructor(type, route, action){
    this.type = type;
    this.route = route;
    this.action= action;
    this.segments = route.split('/');
  }

  getURIProperties(uri){
    let baselessURI = uri.substr(apiConfig.baseUri.length,uri.length);
    const splitURI=baselessURI.split('?');
    baselessURI = splitURI[0];
    const query =splitURI[1];
    const properties = query? this.getPropertiesFromQuery(query):{};
    const uriSegments = baselessURI.split('/');
    this.segments.forEach(function(segment, index){
      if (segment.startsWith('{') && segment.endsWith('}')){
        const propName =segment.substr(1, segment.length - 2);
        properties[propName] = uriSegments[index];
      }
    });
    return properties;
  }
  getPropertiesFromQuery(query){
    const properties = {};
    const segments = query.split('&');
    segments.forEach(function(segment){
      const splitSegment = segment.split('=');
      const propName=splitSegment[0];
      const propValue=splitSegment[1];
      properties[propName]=propValue;
    });
    return properties;
  }
}
