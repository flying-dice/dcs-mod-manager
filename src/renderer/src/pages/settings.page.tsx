import React from 'react'
import { Stack, Text, TextInput, Title } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { closeAllModals, openConfirmModal, openModal } from '@mantine/modals'
import { client } from '../client'
import { RegistryForm } from '../forms/registry.form'

export type SettingsPageProps = {
  defaultInstallationFolder: string
}
export const SettingsPage: React.FC<SettingsPageProps> = ({ defaultInstallationFolder }) => {
  const [installFolder, setInstallFolder] = useLocalStorage({
    key: 'installFolder',
    defaultValue: defaultInstallationFolder
  })

  const [registry, setRegistry] = useLocalStorage({
    key: 'registry',
    defaultValue: 'https://dcs-mod-manager-registry.pages.dev/'
  })

  const handleInstallFolderChange = async (): Promise<void> => {
    const suggested = await client.installation.getDefaultInstallFolder.query()
    openConfirmModal({
      title: 'Installation folder',
      children: (
        <Stack gap={10}>
          <Text>Do you want to use the suggested installation folder?</Text>
          <Text>{suggested.path}</Text>
        </Stack>
      ),
      confirmProps: {
        color: 'blue',
        children: 'Use Suggested'
      },
      cancelProps: {
        variant: 'subtle',
        color: 'red',
        children: 'Choose another folder'
      },
      onConfirm: () => {
        setInstallFolder(suggested.path)
        closeAllModals()
      },
      onCancel: () => {
        client.installation.getInstallFolder.query().then((folder) => {
          setInstallFolder(folder)
        })
      }
    })
  }

  const handleRegistryChange = async (): Promise<void> => {
    openModal({
      title: 'Registry',
      children: (
        <RegistryForm
          initialValues={{ url: registry }}
          onCancel={closeAllModals}
          onSubmit={(values) => {
            setRegistry(values.url)
            closeAllModals()
          }}
        />
      )
    })
  }

  return (
    <Stack>
      <Title order={3}>Settings</Title>
      <TextInput
        label="Installation folder"
        description="Where the users Mods and Scripts are installed, normally this is '%USERPROFILE%\Saved Games\DCS'"
        readOnly
        placeholder="Set Installation folder"
        value={installFolder}
        onClick={handleInstallFolderChange}
        styles={{ input: { cursor: 'pointer' } }}
        error={!installFolder && 'Invalid installation folder'}
      />
      <TextInput
        label="Registry"
        description="The registry where the Mod Manager will look for Mods"
        readOnly
        placeholder="Set Registry"
        value={registry}
        onClick={handleRegistryChange}
        styles={{ input: { cursor: 'pointer' } }}
        error={!registry && 'Invalid registry'}
      />
    </Stack>
  )
}
