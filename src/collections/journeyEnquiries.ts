/* eslint-disable @typescript-eslint/no-explicit-any */
import { CollectionConfig } from 'payload'

export const journeyEnquiries: CollectionConfig = {
  slug: 'journeyenquiries',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
    },
    {
      name: 'countryCode',
      label: 'Country Code',
      type: 'text',
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'text',
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
    },
    {
      name: 'country',
      label: 'Country',
      type: 'relationship',
      relationTo: 'countries',
    },
    {
      name: 'pursueEdu',
      label: 'Pursuing Education Level',
      type: 'text',
    },
    {
      name: 'pursueYear',
      label: 'Target Year',
      type: 'text',
    },
    {
      name: 'courses',
      label: 'Interested Courses',
      type: 'relationship',
      relationTo: 'courses',
      hasMany: true,
    },
  ],
  endpoints: [
    {
      path: '/enquiry',
      method: 'post',
      handler: async (req: any) => {
        try {
          const data = await req.json()
          const newSubmission = await req.payload.create({
            collection: 'journeyenquiries',
            data: {
              name: data.fullName,
              countryCode: data.countryCode,
              phone: data.phone,
              email: data.email,
              country: data.country,
              pursueEdu: data.pursueEdu,
              pursueYear: data.pursueYear,
              courses: data.courses,
            },
          })

          console.log(data)

          await req.payload.sendEmail({
            to: process.env.TO_EMAIL,
            from: process.env.FROM_EMAIL,
            subject: 'New Journey Enquiry',
            html: `
              <h2>New Journey Enquiry</h2>
              <p><strong>Name:</strong> ${data?.fullName ?? ''}</p>
              <p><strong>Email:</strong> ${data?.email ?? ''}</p>
              <p><strong>Phone:</strong> ${data.phone ?? ''}</p>
              <p><strong>Country Code:</strong> ${data?.countryCode ?? ''}</p>
              <p><strong>Pursing:</strong> ${data?.pursueEdu ?? ''}</p>
              <p><strong>Pursing Year:</strong> ${data?.pursueYear ?? ''}</p>
            `,
          })

          return Response.json(
            {
              message: 'Submission saved successfully',
              enquiry: newSubmission,
            },
            { status: 201 },
          )
        } catch (error: any) {
          return Response.json({ message: 'Internal server error', error: error.message })
        }
      },
    },
  ],
}
