/* eslint-disable @typescript-eslint/no-explicit-any */
// import type { CollectionConfig } from 'payload'

// import {
//   FixedToolbarFeature,
//   InlineToolbarFeature,
//   lexicalEditor,
// } from '@payloadcms/richtext-lexical'
// import path from 'path'
// import { fileURLToPath } from 'url'

// import { anyone } from '../access/anyone'
// import { authenticated } from '../access/authenticated'

// const filename = fileURLToPath(import.meta.url)
// const dirname = path.dirname(filename)

// export const Media: CollectionConfig = {
//   slug: 'media',
//   access: {
//     create: authenticated,
//     delete: authenticated,
//     read: anyone,
//     update: authenticated,
//   },
//   fields: [
//     {
//       name: 'alt',
//       type: 'text',
//       //required: true,
//     },
//     {
//       name: 'caption',
//       type: 'richText',
//       editor: lexicalEditor({
//         features: ({ rootFeatures }) => {
//           return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
//         },
//       }),
//     },
//   ],
//   upload: {
//     // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
//     staticDir: path.resolve(dirname, '../../public/media'),
//     adminThumbnail: 'thumbnail',
//     focalPoint: true,
//     imageSizes: [
//       {
//         name: 'thumbnail',
//         width: 300,
//       },
//       {
//         name: 'square',
//         width: 500,
//         height: 500,
//       },
//       {
//         name: 'small',
//         width: 600,
//       },
//       {
//         name: 'medium',
//         width: 900,
//       },
//       {
//         name: 'large',
//         width: 1400,
//       },
//       {
//         name: 'xlarge',
//         width: 1920,
//       },
//       {
//         name: 'og',
//         width: 1200,
//         height: 630,
//         crop: 'center',
//       },
//     ],
//   },
// }

//////////////////////////////////////////////

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { S3UploadCollectionConfig } from 'payload-s3-upload'

const Media: S3UploadCollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  upload: {
    staticURL: 'uploads',
    staticDir: 'uploads',
    disableLocalStorage: true,
    s3: {
      bucket: 'graduvate',
      prefix: 'uploads', // files will be stored in bucket folder images/xyz
      // prefix: ({ doc }) => `assets/${doc.type}`, // dynamic prefixes are possible too
      commandInput: {
        // optionally, use here any valid PutObjectCommandInput property
        // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/putobjectcommandinput.html
        ACL: 'public-read',
      },
    },
    adminThumbnail: ({ doc }: any) =>
      `https://graduvate.s3.ap-south-1.amazonaws.com/uploads/${doc.filename}`,
  },
  // create a field to access uploaded files in s3 from payload api
  fields: [
    {
      name: 'url',
      type: 'text',
      access: {
        create: () => false,
      },
      admin: {
        disabled: true,
      },
      hooks: {
        afterRead: [
          ({ data: doc }: any) =>
            `https://graduvate.s3.ap-south-1.amazonaws.com/uploads/${doc.type}/${doc.filename}`,
        ],
      },
    },
  ],
}

export default Media
