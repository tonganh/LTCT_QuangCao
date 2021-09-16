import DocxDocument from './docx-document';
import { renderDocumentFile } from './helpers';
import {
  pixelRegex,
  pixelToTWIP,
  cmRegex,
  cmToTWIP,
  inchRegex,
  inchToTWIP,
  pointRegex,
  pointToHIP,
} from './utils/unit-conversion';

const defaultDocumentOptions = {
  orientation: 'portrait',
  margins: {
    top: 1440,
    right: 1800,
    bottom: 1440,
    left: 1800,
    header: 720,
    footer: 720,
    gutter: 0,
  },
  title: '',
  subject: '',
  creator: 'html-to-docx',
  keywords: ['html-to-docx'],
  description: '',
  lastModifiedBy: 'html-to-docx',
  revision: 1,
  createdAt: new Date(),
  modifiedAt: new Date(),
  headerType: 'default',
  header: false,
  footerType: 'default',
  footer: false,
  font: 'Times New Roman',
  fontSize: 22,
  complexScriptFontSize: 22,
  table: {
    row: {
      cantSplit: false,
    },
  },
  pageNumber: false,
  skipFirstHeaderFooter: false,
};

const mergeOptions = (options, patch) => ({ ...options, ...patch });

const fixupFontSize = (fontSize) => {
  let normalizedFontSize;
  if (pointRegex.test(fontSize)) {
    const matchedParts = fontSize.match(pointRegex);

    normalizedFontSize = pointToHIP(matchedParts[1]);
  } else if (fontSize) {
    // assuming it is already in HIP
    normalizedFontSize = fontSize;
  } else {
    normalizedFontSize = null;
  }

  return normalizedFontSize;
};

const fixupMargins = (margins) => {
  let normalizedMargins = {};
  if (typeof margins === 'object' && margins !== null) {
    Object.keys(margins).forEach((key) => {
      if (pixelRegex.test(margins[key])) {
        const matchedParts = margins[key].match(pixelRegex);
        normalizedMargins[key] = pixelToTWIP(matchedParts[1]);
      } else if (cmRegex.test(margins[key])) {
        const matchedParts = margins[key].match(cmRegex);
        normalizedMargins[key] = cmToTWIP(matchedParts[1]);
      } else if (inchRegex.test(margins[key])) {
        const matchedParts = margins[key].match(inchRegex);
        normalizedMargins[key] = inchToTWIP(matchedParts[1]);
      } else if (margins[key]) {
        normalizedMargins[key] = margins[key];
      } else {
        // incase value is something like 0
        normalizedMargins[key] = defaultDocumentOptions.margins[key];
      }
    });
  } else {
    // eslint-disable-next-line no-param-reassign
    normalizedMargins = null;
  }

  return normalizedMargins;
};

const normalizeDocumentOptions = (documentOptions) => {
  const normalizedDocumentOptions = { ...documentOptions };
  Object.keys(documentOptions).forEach((key) => {
    // eslint-disable-next-line default-case
    switch (key) {
      case 'margins':
        normalizedDocumentOptions.margins = fixupMargins(documentOptions[key]);
        break;
      case 'fontSize':
      case 'complexScriptFontSize':
        normalizedDocumentOptions[key] = fixupFontSize(documentOptions[key]);
        break;
    }
  });

  return normalizedDocumentOptions;
};

export function addFilesToContainer(
  htmlString,
  suppliedDocumentOptions = {},
) {
  const normalizedDocumentOptions = normalizeDocumentOptions(suppliedDocumentOptions);
  const documentOptions = mergeOptions(defaultDocumentOptions, normalizedDocumentOptions);

  const docxDocument = new DocxDocument({ htmlString, ...documentOptions });
  // Conversion to Word XML happens here
  docxDocument.documentXML = renderDocumentFile(docxDocument);

  return docxDocument.generateDocumentXML()
}
