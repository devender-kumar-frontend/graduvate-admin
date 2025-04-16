/* eslint-disable @typescript-eslint/no-explicit-any */
import { CollectionConfig } from 'payload'

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
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
      name: 'email',
      label: 'Email',
      type: 'email',
    },
    {
      name: 'number',
      label: 'Phone Number',
      type: 'text',
    },
    {
      name: 'amount',
      label: 'Loan Amount',
      type: 'text',
    },
    {
      name: 'duration',
      label: 'Course Duration',
      type: 'text',
    },
  ],
  endpoints: [
    {
      path: '/finanace-enquiry',
      method: 'post',
      handler: async (req: any) => {
        try {
          const data = await req.json()
          const newSubmission = await req.payload.create({
            collection: 'enquiries',
            data: {
              name: data.name,
              email: data.email,
              number: data.number,
              amount: data.amount,
              duration: data.duration,
            },
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
