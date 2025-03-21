import { GlobalConfig } from 'payload'

export const CommonSettings: Omit<GlobalConfig, 'navItems'> = {
  slug: 'common-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'FAQ Section',
          fields: [
            {
              name: 'faqSectionHeading',
              label: 'Heading',
              type: 'text',
            },
            {
              name: 'faqSectionDescription',
              label: 'Description',
              type: 'textarea',
            },
            {
              name: 'faqSectionPhone',
              label: 'Phone',
              type: 'text',
            },
            {
              name: 'faqSectionEmail',
              label: 'Email',
              type: 'text',
            },
          ],
        },
        {
          label: 'Country Section',
          fields: [
            {
              type: 'tabs',
              tabs: [
                {
                  label: 'Country CTA Section',
                  fields: [
                    {
                      name: 'countryCtaHeading',
                      label: 'Heading',
                      type: 'text',
                    },
                    {
                      name: 'countryCtaDescription',
                      label: 'Description',
                      type: 'textarea',
                    },
                    {
                      name: 'countryCtaText',
                      label: 'CTA Text',
                      type: 'text',
                    },
                    {
                      name: 'countryCtaLink',
                      label: 'CTA Link',
                      type: 'text',
                    },
                  ],
                },
                {
                  label: 'Country Blog Section',
                  fields: [
                    {
                      name: 'countryBlogHeading',
                      label: 'Heading',
                      type: 'text',
                    },
                    {
                      name: 'countryBlogDescription',
                      label: 'Description',
                      type: 'textarea',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
