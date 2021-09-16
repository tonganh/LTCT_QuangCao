import { namespaces } from '../helpers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const generateDocumentTemplate = (width, height, orientation, margins) => {
  return `
    <w:body
      xmlns:a="${namespaces.a}"
      xmlns:cdr="${namespaces.cdr}"
      xmlns:o="${namespaces.o}"
      xmlns:pic="${namespaces.pic}"
      xmlns:r="${namespaces.r}"
      xmlns:v="${namespaces.v}"
      xmlns:ve="${namespaces.ve}"
      xmlns:vt="${namespaces.vt}"
      xmlns:w="${namespaces.w}"
      xmlns:w10="${namespaces.w10}"
      xmlns:wp="${namespaces.wp}"
      xmlns:wne="${namespaces.wne}"
    >
    </w:body>
  `;
};

export default generateDocumentTemplate;
