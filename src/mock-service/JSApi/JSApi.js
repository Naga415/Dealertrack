'use strict';
import apiConfig from './ApiConfig';
// Todo: Provide ability to return headers
export default class JSApi {
  constructor(){
    this.delay = .125;
    this.invalidRequest = 'Invalid Request';
    this.notFound = '404 Not found';
    this.routes = [];
    this.dataIsPromise = false;
  }

  get(uri, requestConfig){
    const context = this;
    return new Promise(function(resolve, reject){
      const route = context.getRoute('get', uri);
      setTimeout(function(){
        if (context.dataIsPromise){
          route.action(uri, requestConfig)
            .then(function(data){
              resolve({data});
            })
            .catch(function(error){
              reject(error);
            });
          return;
        }
        try {
          const payload = {
            data: route.action(uri, requestConfig)
          };
          resolve(payload);
        }
        catch (e){
          reject(e);
        }
      },context.delay,context);
    });
  }

  post(uri, data, requestConfig){
    const context = this;
    return new Promise(function(resolve, reject){
      const route = context.getRoute('post', uri);
      setTimeout(function(){
        if (context.dataIsPromise){
          route.action(uri, data, requestConfig)
            .then(function(data){
              resolve({data});
            })
            .catch(function(error){
              reject(error);
            });
          return;
        }
        try {
          const payload = {
            data: route.action(uri, data, requestConfig)
          };
          resolve(payload);
        }
        catch (e){
          reject(e);
        }
      },context.delay);
    });
  }

  put(uri, data, requestConfig){
    const context = this;
    return new Promise(function(resolve, reject){
      const route = context.getRoute('put', uri);
      setTimeout(function(){
        if (context.dataIsPromise){
          route.action(uri, data, requestConfig)
            .then(function(data){
              resolve({data});
            })
            .catch(function(error){
              reject(error);
            });
          return;
        }
        try {
          const payload = {
            data: route.action(uri, data, requestConfig)
          };
          resolve(payload);
        }
        catch (e){
          reject(e);
        }
      },context.delay);
    });
  }
  getRoute(type, uri){
    if (!uri.startsWith(apiConfig.baseUri)){
      throw this.invalidRequest;// change to mimic http invalidRequest
    }

    let baselessURI = uri.substr(apiConfig.baseUri.length,uri.length);
    baselessURI = baselessURI.split('?')[0];
    const uriSegments = baselessURI.split('/');
    const route = this.routes.find(function(route){
      if (route.segments.length !== uriSegments.length || route.type !== type){
        return false;
      }
      const result = route.segments.every(function(segment, index){
        if (segment.startsWith('{') && segment.endsWith('}')){// ignore placehoders
          return true;
        }
        return segment.toLowerCase() === uriSegments[index].toLowerCase();
      }
      );
      return result;
    });
    if (route){
      return route;
    }
    throw this.notFound;// change to mimic http 404
  }
}
