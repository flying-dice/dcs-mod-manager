import { Button, Group, Stack, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import React from 'react'
import { z } from 'zod'
import axios from 'axios'
import { showErrorNotification } from '../utils/notifications'
import { registryEntriesSchema } from '../schema/registryEntriesSchema'

export const RegistryFormSchema = z.object({
  url: z.string().url()
})

export type RegistryFormValues = z.infer<typeof RegistryFormSchema>

export type RegistryFormProps = {
  initialValues?: RegistryFormValues
  onSubmit: (values: RegistryFormValues) => void
  onCancel: () => void
}
export const RegistryForm: React.FC<RegistryFormProps> = ({
  initialValues,
  onSubmit,
  onCancel
}) => {
  const form = useForm<RegistryFormValues>({
    initialValues,
    validate: zodResolver(RegistryFormSchema),
    validateInputOnBlur: true
  })

  const handleSubmit = () => {
    if (!form.validate().hasErrors) {
      axios
        .get(form.values.url + '/registry.json')
        .then((response) => registryEntriesSchema.parse(response.data))
        .then(() => onSubmit(form.values))
        .catch((error) => showErrorNotification(error))
    }
  }

  return (
    <Stack>
      <TextInput
        label={'Registry RL'}
        description={'Enter a registry URL to use for mods'}
        {...form.getInputProps('url')}
      />
      <Group justify={'end'}>
        <Button variant={'default'} onClick={onCancel}>
          Cancel
        </Button>

        <Button onClick={handleSubmit} disabled={!form.isValid()}>
          Save
        </Button>
      </Group>
    </Stack>
  )
}
