// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'

import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import sharp from 'sharp' // sharp-import
import { fileURLToPath } from 'url'

import { defaultLexical } from '@/fields/defaultLexical'
import { Categories } from './collections/Categories'
import { Countries } from './collections/Countries'
import { Courses } from './collections/Courses'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Universities } from './collections/Universities'
import { Users } from './collections/Users'

import { Enquiries } from './collections/enquiries'
import { Events } from './collections/Events'
import { journeyEnquiries } from './collections/journeyEnquiries'
import { Testimonials } from './collections/Testimonials'
import { CommonSettings } from './CommonSettings/config'
import { plugins } from './plugins'
import { getServerSideURL } from './utilities/getURL'

import { S3Client } from '@aws-sdk/client-s3'
import s3Upload from 'payload-s3-upload'
import { Blogs } from './collections/Blogs'
import { Centers } from './collections/Centers'
import { Faqs } from './collections/Faqs'
import Media from './collections/Media'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { AboutUs } from './WebsitePages/AbousUs/config'
import { BlogPage } from './WebsitePages/BlogPage/config'
import { CentersData } from './WebsitePages/CentersData/config'
import { ContactUs } from './WebsitePages/ContactUs/config'
import { EventPage } from './WebsitePages/EventPage/config'
import { Finance } from './WebsitePages/Finance/config'
import { Homepage } from './WebsitePages/Homepage/config'
import { Kickstart } from './WebsitePages/Kickstart/config'
import { PrivacyPolicy } from './WebsitePages/PrivacyPolicy/config'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import nodemailer from 'nodemailer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  collections: [
    Pages,
    Posts,
    Universities,
    Centers,
    Countries,
    Media,
    Categories,
    Blogs,
    Courses,
    Users,
    Events,
    Testimonials,
    Faqs,
    Enquiries,
    journeyEnquiries,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [
    AboutUs,
    BlogPage,
    CentersData,
    CommonSettings,
    ContactUs,
    EventPage,
    Finance,
    Homepage,
    Kickstart,
    PrivacyPolicy,
    Header,
    Footer,
  ],
  plugins: [
    ...plugins,
    s3Upload(
      new S3Client({
        region: process.env.S3_BUCKET_REGION || '',
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        },
      }),
    ),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
  email: nodemailerAdapter({
    defaultFromAddress: process.env.FROM_EMAIL,
    defaultFromName: process.env.FROM_NAME,
    // Any Nodemailer transport
    transport: await nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    }),
  }),
})
