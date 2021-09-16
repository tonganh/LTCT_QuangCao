const expressions = require('angular-expressions');
import { assign } from 'lodash'
const { minify } = require('html-minifier');
import { addFilesToContainer } from './html-to-openxml/html-to-docx'

const minifyHTMLString = (htmlString) => {
  try {
    const minifiedHTMLString = minify(htmlString, {
      caseSensitive: true,
      collapseWhitespace: true,
      html5: false,
      keepClosingSlash: true,
    });

    return minifiedHTMLString;
  } catch (error) {
    return null;
  }
};
// define your filter functions here, for example, to be able to write {clientname | lower}
expressions.filters.lower = function (input) {
  // This condition should be used to make sure that if your input is
  // undefined, your output will be undefined as well and will not
  // throw an error
  if (!input) return input;
  return input.toLowerCase();
}
export function angularParser(tag) {
  if (tag === '.') {
    return {
      get: function (s) { return s; }
    };
  }
  const expr = expressions.compile(
    tag.replace(/(’|‘)/g, "'").replace(/(“|”)/g, '"')
  );
  return {
    get: function (scope, context) {
      let obj = {};
      const scopeList = context.scopeList;
      const num = context.num;
      for (let i = 0, len = num + 1; i < len; i++) {
        obj = assign(obj, scopeList[i]);
      }
      return expr(scope, obj);
    }
  };
}

export const htmlToOpenXML = (htmlString) => {
  try {
    const xmlStringWithBody = addFilesToContainer(
      minifyHTMLString(htmlString || ''),
    ).replace('<?xml version="1.0"?>', '')
    const matches = xmlStringWithBody.match(/<w:body.*?>(?<content>.*?)<\/w:body>/).groups
    return matches.content
  } catch (error) {
    return ''
  }
}
export const objectToOpenXML = (object) => {
  const res = {}
  for (const [key, value] of Object.entries(object)) {
    if (typeof value === 'string') {
      res[key] = htmlToOpenXML(value)
    } else if (typeof value === 'object' && value) {
      // Value is array
      if (Array.isArray(value)) {
        const newArr = []
        for (const [index, ele] of value.entries()) {
          newArr[index] = objectToOpenXML(ele)
        }
        res[key] = newArr
      } else {
        res[key] = objectToOpenXML(value)
      }
    } else {
      res[key] = value
    }
  }
  return res
}
